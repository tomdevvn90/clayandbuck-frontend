import React from "react";

import { PwsMediaService } from "./service/pws-media.service";
import { ZypeMedia } from "./zype/ZypeMedia.component";
import { ZypeViewVideoResponse } from "./zype/ZypeMedia.types";
import { CnbMediaProps } from "./helpers/interfaces";

export interface CnbMediaState {
  isAuthenticated: boolean;
}

export default class CnbMediaApp extends React.Component<
  CnbMediaProps,
  CnbMediaState
> {
  private mediaService: PwsMediaService;

  constructor(props: CnbMediaProps) {
    super(props);

    //this.mediaService = new PwsMediaService(props.showSlug, props.pwsHost);
    this.mediaService = new PwsMediaService();

    this.state = {
      isAuthenticated: this.props.isAuthenticated || true, //document.cookie.includes('STYXKEY_ACCESS_TOKEN')
    };
  }

  render() {
    const initialVideoResponse: ZypeViewVideoResponse = {
      authenticated: this.props.isAuthenticated,
      playerApiKey: "",
      video: {
        id: null,
        title: "",
        slug: "",
        description: "",
        shortDescription: "",
        thumbnails: [],
        categories: [],
        publishedAt: "",
        subscriptionRequired: false,
        manifest: null,
        onAir: false,
        isAudio: false,
        duration: 0,
        autoplay: false,
      },
    };

    return (
      <ZypeMedia
        mediaService={this.mediaService}
        viewVideoResponse={initialVideoResponse}
        groupSlug={this.props.groupSlug}
        episodeSlug={this.props.episodeSlug}
        pageSlug={this.props.pageSlug}
        isAuthenticated={this.state.isAuthenticated}
      ></ZypeMedia>
    );
  }
}
