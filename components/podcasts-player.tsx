import { useContext } from "react";
import { WP_REST_API_URL, fetcher } from "../lib/constants";
import Player from "./audio-player";
import useSWR from "swr";
import { PodcastContext } from "../contexts/Podcast";

export default function PodcastsPlayer() {
  const podcastCtx = useContext(PodcastContext);

  return (
    <div className="cnb-podcasts-player">
      {Array.isArray(podcastCtx.podcasts) && (
        <Player
          trackList={podcastCtx.podcasts}
          includeTags={false}
          includeSearch={false}
        />
      )}
    </div>
  );
}
type PodcastResponse = {
  id: string;
  endDate: string;
  podcastId: string;
  podcastSlug: string;
  title: string;
  duration: string;
  isExplicit: boolean;
  isInteractive: boolean;
  description: string;
  mediaUrl: string;
  startDate: string;
  imageUrl: string;
};
