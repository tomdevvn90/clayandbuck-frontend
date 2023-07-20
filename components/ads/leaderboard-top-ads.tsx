import { useRouter } from "next/router";
import AdSlot from "./ads-slot";
import { useEffect } from "react";
import { defineSlot, removeSlot } from "../../lib/dfp";
import { SITE_URL } from "../../lib/constants";

export default function LeaderBoardTopAds() {
    const router = useRouter()
    useEffect(() => {
        defineSlot('div-gpt-ad-leaderboard_728x90_top')
        router.events.on('routeChangeComplete', removeSlot)
        return () => {
          router.events.off('routeChangeComplete', removeSlot)
        }
    }, [])
    const devSite = ! SITE_URL.includes( 'clayandbuck.com' )
    return (
        devSite &&
        <AdSlot id={'div-gpt-ad-leaderboard_728x90_top'} />
    )
}