import Player from "./audio-player";
import useSWR from "swr"

export async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<JSON> {
    const res = await fetch(input, init)
    return res.json()
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

export default function PodcastsPlayer() {
    const REST_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL
    const { data, error } = useSWR<PodcastResponse[], Error>( `${REST_API_URL}/v2/podcasts-player/`, fetcher )

    if (error) return (
        <div className="no-podcasts"></div>
    )

    let podcastsData = []
    if ( typeof data != 'undefined' ) {
        data.forEach( ( pc ) => {
            podcastsData.push({
                title: pc.title,
                url: pc.mediaUrl,
                date: pc.startDate,
                imageUrl: pc.imageUrl,
                id: pc.id
            })
        })
    }
    podcastsData.sort( (a, b) => a.id - b.id )

    return (
        <div className="cnb-podcasts-player">
            { podcastsData.length > 0 && (
                <Player trackList={podcastsData} includeTags={false} includeSearch={false} />
            )}
        </div>
    )
}