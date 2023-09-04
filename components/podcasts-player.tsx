import { useContext } from "react";
import { GlobalsContext } from "../contexts/GlobalsContext";
import Player from "./audio-player";

export default function PodcastsPlayer() {
  const GlobalsCtx = useContext(GlobalsContext);

  return (
    <div className="cnb-podcasts-player">
      {GlobalsCtx.podcasts.length > 0 && <Player trackList={GlobalsCtx.podcasts} />}
    </div>
  );
}
