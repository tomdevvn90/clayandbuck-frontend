import { useRouter } from "next/router";
import AdSlot from "./ads-slot";
import { useEffect } from "react";
import { defineSlot, removeSlot } from "../../lib/dfp";

export default function LeaderBoardBottomAds() {
    const router = useRouter()
    useEffect(() => {
        defineSlot('div-gpt-ad-leaderboard_728x90_bottom')
        router.events.on('routeChangeComplete', removeSlot)
        return () => {
          router.events.off('routeChangeComplete', removeSlot)
        }
    }, [])

    return (
        <AdSlot id={'div-gpt-ad-leaderboard_728x90_bottom'} />
    )
}