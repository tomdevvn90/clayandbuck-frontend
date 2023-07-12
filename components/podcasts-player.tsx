import Player from "./audio-player";
import useSWR from "swr"

export async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<JSON> {
    const res = await fetch(input, init)
    return res.json()
}

export default function PodcastsPlayer() {
    const REST_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL
    const { data, error } = useSWR<PodcastResponse[], Error>( `${REST_API_URL}/v2/podcasts-player/`, fetcher )
    
    if (error) return (
        <div className="no-podcasts"></div>
    )
    return (
        <div className="cnb-podcasts-player">
            { Array.isArray(data) && (
                <Player trackList={data} includeTags={false} includeSearch={false} />
            )}
        </div>
    )
}

type PodcastResponse = {
    id: string,
    endDate: string,
    podcastId: string,
    podcastSlug: string,
    title: string,
    duration: string,
    isExplicit: boolean,
    isInteractive: boolean,
    description: string,
    mediaUrl: string,
    startDate: string,
    imageUrl: string
}