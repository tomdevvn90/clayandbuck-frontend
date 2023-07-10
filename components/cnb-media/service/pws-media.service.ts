const REST_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL

import {
    ZypeViewVideoResponse,
    ZypeListVideosResponse,
    ZypeConfigResponse,
    ZypeIsAudioResponse,
} from "../zype/ZypeMedia.types";

export interface ListVideosConfig {
    categories?: { [category: string]: string };
    categoryValue?: string;
    categoryName?: string;
    startDate?: number;
    groupSlug?: string;
    perPage?: number;
    endDate?: number;
    query?: string;
    page?: number;
}

const doRequest = async <T = any>(url: string) => {
    try {
        const response = await fetch( url );
        return await response.json() as T;
    } catch (e) {
        console.error("Error while fetching PWS API:", e);
    }
};

export class PwsMediaService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = REST_API_URL;
    }

    getOnAirVideo() {
        // Old API Ex: https://services.premierenetworks.com/media/clay-and-buck/on-air?manifest=false
        return this.doMediaRequest<ZypeViewVideoResponse>(`v1/media/on-air/`);
    }

    getVideoBySlug(slug: string) {
        if (slug === "live") {
            // Old API Ex: https://services.premierenetworks.com/media/clay-and-buck/on-air
            return this.doMediaRequest<ZypeViewVideoResponse>(`v1/media/on-air/`);
        }
        // Old API Ex: https://services.premierenetworks.com/media/clay-and-buck/videos/slug/what-s-next-for-the-disgraced-ny-governor
        slug = encodeURIComponent( slug );
        return this.doMediaRequest<ZypeViewVideoResponse>(`v1/media/videos/slug/${slug}`);
    }

    getNextVideo(publishedAt: string) {
        // Old API Ex: //services.premierenetworks.com/media/clay-and-buck/next/64418dddf0b6de0001d66fb7
        publishedAt = encodeURIComponent( publishedAt );
        return this.doMediaRequest<ZypeViewVideoResponse>(`v1/media/next/?publishedAt=${publishedAt}`);
    }

    getConfig(includeVideos = true, perPage = 12) {
        // Old API Ex: //services.premierenetworks.com/media/clay-and-buck/config?includeVideos=true&perPage=12
        return this.doMediaRequest<ZypeConfigResponse>(
            `v1/media/config/?includeVideos=${includeVideos}&perPage=${perPage}`,
        );
    }

    getIsAudio(id: string) {
        // Old API Ex: //services.premierenetworks.com/media/clay-and-buck/is-audio/64418dddf0b6de0001d66fb7?onAir=false
        return this.doMediaRequest<ZypeIsAudioResponse>(`v1/media/is-audio/${id}`);
    }

    getVideos(resume: string | null = null, config: ListVideosConfig = {}) {
        if (resume) {
            // Old API Ex: //services.premierenetworks.com/media/clay-and-buck/videos?resume=eyJwYWdlIjoyLCJwZXJQYWdlIjoxMiwiY2F0ZWdvcmllcyI6eyJDbGF5IGFuZCBCdWNrIjoiQXVkaW8gQ2xpcHMifX0=
            resume = encodeURIComponent( resume );
            return this.doMediaRequest<ZypeListVideosResponse>(`v1/media/videos/?resume=${resume}`);
        }
        let query = Object.entries(config).reduce((acc, [key, val]) => acc + `&${key}=${encodeURIComponent(val)}`, "");
        if (query) {
            query = `?${query.slice(1)}`;
        }
        // Old API Ex: //services.premierenetworks.com/media/clay-and-buck/videos/?query=Former
        return this.doMediaRequest<ZypeListVideosResponse>(`v1/media/videos/${query}`);
    }

    private doMediaRequest<T>(url: string) {
        return doRequest<T>(`${this.baseUrl}/${url}`);
    }
}
