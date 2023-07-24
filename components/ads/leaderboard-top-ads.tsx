import useGpt from "../../hooks/useGpt";
import AdSlot from "./ads-slot";

export default function LeaderBoardTopAds() {
  useGpt("div-gpt-ad-leaderboard_728x90_top");

  return <AdSlot id={"div-gpt-ad-leaderboard_728x90_top"} />;
}
