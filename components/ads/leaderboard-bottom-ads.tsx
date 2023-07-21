import AdSlot from "./ads-slot";
import { useGpt } from "../../hooks/useGpt";

export default function LeaderBoardBottomAds() {
    useGpt('div-gpt-ad-leaderboard_728x90_bottom')

    return (
        <AdSlot id={'div-gpt-ad-leaderboard_728x90_bottom'} />
    )
}