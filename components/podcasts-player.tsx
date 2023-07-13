import { WP_REST_API_URL, fetcher } from "../lib/constants";
import Player from "./audio-player";
import useSWR from "swr"

export default function PodcastsPlayer() {
    const { data, error } = useSWR<PodcastResponse[], Error>( `${WP_REST_API_URL}/v2/podcasts-player/`, fetcher )
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