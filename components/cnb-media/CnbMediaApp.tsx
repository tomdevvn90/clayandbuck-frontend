import React from "react";
import { PwsMediaService } from "./service/pws-media.service";
import { ZypeMedia } from "./zype/ZypeMedia.component";
import { ZypeViewVideoResponse } from "./zype/ZypeMedia.types";
import { CnbMediaProps } from "./helpers/interfaces";

export default class CnbMediaApp extends React.Component<CnbMediaProps> {
  private mediaService: PwsMediaService;

  constructor(props: CnbMediaProps) {
    super(props);
    this.mediaService = new PwsMediaService();
  }

  render() {
    const initialVideoResponse: ZypeViewVideoResponse = {
      authenticated: false,
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
      ></ZypeMedia>
    );
  }
}
