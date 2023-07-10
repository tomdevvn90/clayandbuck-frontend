import * as React from "react";

import { ZypeConfigTab, ZypeVideo, ZypeListVideosResponse } from "./ZypeMedia.types";
import { ZypeVideoComponent } from "./ZypeVideo.component";
import { ZypePagination } from "./ZypePagination.component";
import { PwsMediaService } from "../service/pws-media.service";

interface ZypeTabProps {
    setCurrentVideo: (video: ZypeVideo, nextVideo: ZypeVideo | null) => void;
    mediaService: PwsMediaService;
    isActiveTab: boolean;
    tab: ZypeConfigTab;
}

interface ZypeVideoState {
    isLoadingNext: boolean;
    resume: string | null;
    pages: ZypeVideo[][];
    totalPages: number;
    curPage: number;
}

export class ZypeTab extends React.Component<ZypeTabProps, ZypeVideoState> {
    constructor(props: ZypeTabProps) {
        super(props);

        this.state = {
            isLoadingNext: false,
            totalPages: 1,
            resume: null,
            curPage: 1,
            pages: [],
        };
    }

    componentDidMount() {
        const { tab } = this.props;
        if (tab.videos && tab.videos.length && tab.pagination) {
            this.setState({
                totalPages: tab.pagination.pages,
                pages: [tab.videos],
            }, this.getOnAirVideo);
        } else {
            this.getOnAirVideo();
        }

        if (tab.resume) {
            this.setState(
                { resume: tab.resume },
                () => this.getNextPage(),
            );
        } else if (tab.slug !== "search") {
            this.getNextPage();
        }
    }

    getOnAirVideo = async () => {
        if (!this.props.tab.hasLive) {
            return;
        }

        const res = await this.props.mediaService.getOnAirVideo();

        if (res && res.video) {
            // make sure audio (guest host) stream doesn't load onl Dittocam tab
            if (this.props.tab.slug === "dittocam" && res.video.isAudio) {
                console.debug("Skipped live stream on Dittocam tab - audio-only");
            } else {
                // set stream to audio-only for audio tab
                if (this.props.tab.slug === "audio") {
                    res.video.isAudio = true;
                }
                const firstPage = this.state.pages.length ? [res.video, ...this.state.pages[0]] : [res.video];
                this.setState({ pages: [firstPage, ...this.state.pages.slice(1)] });
                console.debug("Got live video", res);
            }
        } else {
            console.debug("No live video available");
        }
    }

    goToNextPage = () => {
        this.setState(
            { curPage: this.state.curPage + 1 },
            () => {
                if (this.state.resume) {
                    this.getNextPage();
                }
            },
        );
    }

    goToPrevPage = () => {
        this.setState({ curPage: this.state.curPage - 1 });
    }

    getNextPage = async () => {
        if (!this.props.tab.videos || this.state.resume) {
            this.setState({ isLoadingNext: true }, this.doGetNextPage);
        } else {
            console.error(`Can't get next page for tab "${this.props.tab.title}". No resume`);
        }
    }

    doGetNextPage = async () => {
        let resp: ZypeListVideosResponse | undefined;

        if (!this.props.tab.videos) {
            // resp = await this.props.mediaService.getVideos(null, { groupSlug: this.props.tab.slug });
            resp = await this.props.mediaService.getVideos(null, {
                                              categoryName: Object.keys(this.props.tab.categories)[0],
                                              categoryValue: Object.values(this.props.tab.categories)[0]
                                        });
        } else {
            resp = await this.props.mediaService.getVideos(this.state.resume);
        }

        if (resp) {
            this.setState({
                pages: [...this.state.pages, ...[resp.videos || []]],
                totalPages: resp.pagination.pages,
                resume: resp.resume,
                isLoadingNext: false,
            });
        } else {
            this.setState({ isLoadingNext: false });
        }
    }

    getNextVideo = (idx: number) => {
        const curPageVideos = this.state.pages[this.state.curPage - 1];
        const nextPageVideos = this.state.pages[this.state.curPage];

        if (curPageVideos && curPageVideos[idx + 1]) {
            return curPageVideos[idx + 1];
        }

        if (nextPageVideos && nextPageVideos[0]) {
            return nextPageVideos[0];
        }

        return null;
    }

    render() {
        const videos = this.state.pages[this.state.curPage - 1];

        return (
            <div className={`component-zype-tab ${this.props.isActiveTab ? "active" : ""}`}>
                <div className={`tab-header ${this.props.tab.slug === "search" ? "with-title" : ""}`}>
                    {this.props.tab.slug === "search" && (<h3 className="tab-title">{this.props.tab.title}</h3>)}

                    <ZypePagination
                        isLoadingNext={this.state.isLoadingNext}
                        totalPages={this.state.totalPages}
                        currentPage={this.state.curPage}
                        goToNextPage={this.goToNextPage}
                        goToPrevPage={this.goToPrevPage}
                    />
                </div>
                <div className="videos-container">
                    {
                        videos && videos.map((video, idx) => (
                            <ZypeVideoComponent
                                setCurrentVideo={this.props.setCurrentVideo}
                                nextVideo={this.getNextVideo(idx)}
                                key={video.slug}
                                video={video}
                                idx={idx}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
}
