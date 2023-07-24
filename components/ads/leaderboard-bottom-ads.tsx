import useGpt from "../../hooks/useGpt";
import AdSlot from "./ads-slot";

export default function LeaderBoardBottomAds() {
  useGpt("div-gpt-ad-leaderboard_728x90_bottom");

  return <AdSlot id={"div-gpt-ad-leaderboard_728x90_bottom"} />;
}
