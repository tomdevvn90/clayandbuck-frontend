import * as React from "react";

import { ZypeConfigTab, ZypeVideo, ZypeCategory, ZypeViewVideoResponse } from "./ZypeMedia.types";
import { ZypeTabsSkeleton } from "./ZypeTabsSkeleton.component";
import { PwsMediaService } from "../service/pws-media.service";
import { ZypePlayer } from "./ZypePlayer.component";
import { ZypeTabs } from "./ZypeTabs.component";
import { getCookie } from "cookies-next";
// import { ZypeAd } from "./ZypeAd.component";

interface ZypeMediaProps {
  viewVideoResponse: ZypeViewVideoResponse;
  episodeSlug: string | null;
  groupSlug: string | null;
  mediaService: PwsMediaService;
  pageSlug: string;
}

interface ZypeMediaState {
  tabs: ZypeConfigTab[] | null;
  playerApiKey: string | null;
  nextVideo: ZypeVideo | null;
  curVideo: ZypeVideo | null;
  loadingTabs: boolean;
  activeTab: number;
}

export class ZypeMedia extends React.Component<ZypeMediaProps, ZypeMediaState> {
  constructor(props: ZypeMediaProps) {
    super(props);

    this.state = {
      playerApiKey: null,
      loadingTabs: true,
      nextVideo: null,
      curVideo: null,
      activeTab: 0,
      tabs: null,
    };
  }

  componentDidMount() {
    this.loadVideo(this.props.episodeSlug);
    this.handleHistoryTravel();
  }

  loadVideo = async (slug: string | null) => {
    if (!slug) {
      return this.initializeTabs();
    }

    let resp: ZypeViewVideoResponse | undefined = await this.props.mediaService.getVideoBySlug(slug);

    if (!resp || !resp.video) {
      return this.initializeTabs();
    }

    let isAuthenticated = getCookie("STYXKEY_ACCESS_TOKEN");

    // Require login before view content
    if (!isAuthenticated && resp.video.subscriptionRequired) {
      let loginLinkEl = document.querySelector("button.login-btn");
      if (loginLinkEl instanceof HTMLElement) {
        loginLinkEl.click();
      }
      return;
    }

    // Show subscription require modal if user not yet subscription
    let userSubscribed = getCookie("STYXKEY_USER_SUBSCRIBED");
    if (!userSubscribed && isAuthenticated && resp.video.subscriptionRequired) {
      let subsModal = document.getElementById("require-subs-modal");
      subsModal.classList.remove("hide");
      return;
    }

    // Show subscription reactivate modal if user cancelled subscription
    let userCancelledSubs = getCookie("STYXKEY_USER_CANCELLED_SUBS");
    if (userCancelledSubs && isAuthenticated && resp.video.subscriptionRequired) {
      let subsModal = document.getElementById("cnb-subs-reactivate-modal");
      subsModal.classList.remove("hide");
      return;
    }

    this.pushVideoToHistory(resp.video, this.props.groupSlug);

    this.setState({ playerApiKey: resp.playerApiKey, curVideo: resp.video }, this.initializeTabs);
  };

  initializeTabs = async () => {
    const resp = await this.props.mediaService.getConfig();

    this.setState({ loadingTabs: false });
    if (resp) {
      const activeTabIdx = resp.tabs.findIndex((tab) => tab.slug === this.props.groupSlug);

      let curTabVideos: ZypeVideo[] = [];

      if (activeTabIdx >= 0 && resp.tabs[activeTabIdx].videos) {
        curTabVideos = resp.tabs[activeTabIdx].videos!;
      } else if (resp.tabs[0] && resp.tabs[0].videos) {
        curTabVideos = resp.tabs[0].videos!;
      }

      this.setState({
        loadingTabs: false,
        tabs: resp.tabs,
        nextVideo: curTabVideos ? curTabVideos[0] : null,
        activeTab: activeTabIdx >= 0 ? activeTabIdx : 0,
        playerApiKey: resp.playerApiKey,
      });

      // fallback in case if wasn't able to load initial video id
      if (!this.state.curVideo && curTabVideos) {
        this.setCurrentVideo(curTabVideos[0]);
      }
    }
  };

  setActiveTab = (activeTab: number) => {
    this.setState({ activeTab });
  };

  setCurrentVideo = (curVideo: ZypeVideo | null, nextVideo: ZypeVideo | null = null) => {
    if (!curVideo) {
      return console.warn("Can't set curVideo to null");
    }

    let isAuthenticated = getCookie("STYXKEY_ACCESS_TOKEN");

    // Require login before view content
    if (!isAuthenticated && curVideo.subscriptionRequired) {
      let loginLinkEl = document.querySelector("button.login-btn");
      if (loginLinkEl instanceof HTMLElement) {
        loginLinkEl.click();
      }
      return;
    }

    // Show subscription require modal if user not yet subscription
    let userSubscribed = getCookie("STYXKEY_USER_SUBSCRIBED");
    if (!userSubscribed && isAuthenticated && curVideo.subscriptionRequired) {
      let subsModal = document.getElementById("require-subs-modal");
      subsModal.classList.remove("hide");
      return;
    }

    // Show subscription reactivate modal if user cancelled subscription
    let userCancelledSubs = getCookie("STYXKEY_USER_CANCELLED_SUBS");
    if (userCancelledSubs && isAuthenticated && curVideo.subscriptionRequired) {
      let subsModal = document.getElementById("cnb-subs-reactivate-modal");
      subsModal.classList.remove("hide");
      return;
    }

    this.pushVideoToHistory(curVideo);
    this.setState({ curVideo }, () => this.setNextVideo(nextVideo));
  };

  // needed if video was originally fetched while unauthenticated
  reFetchCurVideo = async () => {
    if (!this.state.curVideo) {
      return console.error("No current video to re-fetch");
    }

    const res = await this.props.mediaService.getVideoBySlug(this.state.curVideo.slug);

    let isAuthenticated = getCookie("STYXKEY_ACCESS_TOKEN");

    // Require login before view content
    if (!isAuthenticated && res?.video.subscriptionRequired) {
      let loginLinkEl = document.querySelector("button.login-btn");
      if (loginLinkEl instanceof HTMLElement) {
        loginLinkEl.click();
      }
      return;
    }

    // Show subscription require modal if user not yet subscription
    let userSubscribed = getCookie("STYXKEY_USER_SUBSCRIBED");
    if (!userSubscribed && isAuthenticated && res?.video.subscriptionRequired) {
      let subsModal = document.getElementById("require-subs-modal");
      subsModal.classList.remove("hide");
      return;
    }

    // Show subscription reactivate modal if user cancelled subscription
    let userCancelledSubs = getCookie("STYXKEY_USER_CANCELLED_SUBS");
    if (userCancelledSubs && isAuthenticated && res?.video.subscriptionRequired) {
      let subsModal = document.getElementById("cnb-subs-reactivate-modal");
      subsModal.classList.remove("hide");
      return;
    }

    if (res) {
      this.setState({ curVideo: res.video });
    }
  };

  getNextVideo = async () => {
    if (!this.state.curVideo) {
      console.warn("Can't get next video - current video is not set");
      return null;
    }

    if (!this.state.curVideo.id) {
      console.warn("Can't get next video - current video doesn't have an id");
      return null;
    }

    // const res = await this.props.mediaService.getNextVideo(this.state.curVideo.id);
    const res = await this.props.mediaService.getNextVideo(this.state.curVideo.publishedAt);

    if (res) {
      return res.video;
    } else {
      console.warn("No next video found");
      return null;
    }
  };

  setNextVideo = async (nextVideo: ZypeVideo | null) => {
    if (nextVideo) {
      return this.setState({ nextVideo });
    }

    nextVideo = await this.getNextVideo();

    if (nextVideo) {
      this.setState({ nextVideo });
    }
  };

  playNextVideo = async () => {
    console.debug("Play next video");
    if (this.state.nextVideo) {
      this.setCurrentVideo(this.state.nextVideo);
    } else {
      this.setCurrentVideo(await this.getNextVideo());
    }
  };

  getTabByCategories = (categories: ZypeCategory[]) =>
    this.state.tabs
      ? this.state.tabs.find((tab) =>
          categories.some((c) => !!tab.categories[c.title] && c.value.some((v) => tab.categories[c.title] === v))
        )
      : null;

  pushVideoToHistory = (video: ZypeVideo, groupSlug?: string | null) => {
    if (!groupSlug) {
      const tab = this.getTabByCategories(video.categories);
      if (tab) {
        groupSlug = tab.slug;
      } else {
        groupSlug = this.state.tabs ? this.state.tabs[this.state.activeTab].slug : null;
      }
    }

    if (!groupSlug) {
      return console.debug("Can't add video to history - couldn't figure out the tab");
    }

    window.history.pushState({ video }, video.title, `/${this.props.pageSlug}/${groupSlug}/${video.slug}/`);
  };

  handleHistoryTravel() {
    // handle user clicking back/forth in browser navigation
    window.onpopstate = (e: PopStateEvent) => {
      if (e.state && e.state.video) {
        this.setState({ curVideo: e.state.video, nextVideo: null });
      }
    };
  }

  render() {
    return (
      <div className="component-zype-media">
        <ZypePlayer
          reFetchCurVideo={this.reFetchCurVideo}
          playNextVideo={this.playNextVideo}
          apiKey={this.state.playerApiKey}
          video={this.state.curVideo}
          mediaService={this.props.mediaService}
        />
        {this.state.loadingTabs ? (
          <ZypeTabsSkeleton />
        ) : (
          <ZypeTabs
            setCurrentVideo={this.setCurrentVideo}
            loadingTabs={this.state.loadingTabs}
            setActiveTab={this.setActiveTab}
            mediaService={this.props.mediaService}
            activeTab={this.state.activeTab}
            tabs={this.state.tabs}
          />
        )}
        <section className="ads">
          {/* <ZypeAd
                        path="/6663/prnd/prn-rush"
                        size={[300,250]}
                        id="div-gpt-ad-Midrec_300x250_Top"
                    /> */}
        </section>
      </div>
    );
  }
}
