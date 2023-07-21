import AdSlot from "./ads-slot";
import { SITE_URL } from "../../lib/constants";
import { useGpt } from "../../hooks/useGpt";

export default function LeaderBoardTopAds() {
    const devSite = ! SITE_URL.includes( 'clayandbuck.com' )
    if (devSite) useGpt('div-gpt-ad-leaderboard_728x90_top')
    
    return (
        devSite &&
        <AdSlot id={'div-gpt-ad-leaderboard_728x90_top'} />
    )
}