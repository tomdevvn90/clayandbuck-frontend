export interface ZypeResponseBase {
    authenticated: boolean;
    playerApiKey: string;
}

export interface ZypeViewVideoResponse extends ZypeResponseBase {
    video: ZypeVideo;
}

export interface ZypeListVideosResponse extends ZypeResponseBase {
    pagination: ZypePagination;
    videos: ZypeVideo[] | null;
    resume: string | null;
}

export interface ZypeOnAirStatusResponse extends ZypeResponseBase {
    isOnAir: boolean;
}

export interface ZypeIsAudioResponse extends ZypeResponseBase {
    isAudio: boolean;
}

export interface ZypeConfigResponse extends ZypeResponseBase {
    tabs: ZypeConfigTab[];
    message?: string;
}

export interface ZypeVideo {
    id: string | null;
    title: string;
    slug: string;
    description: string;
    shortDescription: string;
    thumbnails: ZypeThumbnail[];
    categories: ZypeCategory[];
    publishedAt: string;
    subscriptionRequired: boolean;
    manifest: string | null;
    onAir: boolean;
    duration: number;
    isAudio?: boolean | null;
    autoplay?: boolean;
}

export interface ZypeConfigTab {
    categories: { [name: string]: string };
    pagination?: ZypePagination;
    resume: string | null;
    videos?: ZypeVideo[] | null;
    hasLive: boolean;
    title: string;
    slug: string;
}

export interface ZypePagination {
    current: number;
    previous: number | null;
    next: number | null;
    per_page: number;
    pages: number;
}

export interface ZypeThumbnail {
  aspect_ratio: number;
  height: number;
  name?: any;
  url: string;
  width: number;
}

export interface ZypeCategory {
  _id: string;
  category_id: string;
  title: string;
  value: string[];
}
