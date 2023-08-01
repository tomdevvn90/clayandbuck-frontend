import { useContext } from "react";
import { PodcastsContext } from "../contexts/PodcastsContext";
import Player from "./audio-player";

export default function PodcastsPlayer() {
  const PodcastsCtx = useContext(PodcastsContext);

  return (
    <div className="cnb-podcasts-player">
      {PodcastsCtx.podcasts.length > 0 && (
        <Player
          trackList={PodcastsCtx.podcasts}
          includeTags={false}
          includeSearch={false}
        />
      )}
    </div>
  );
}
