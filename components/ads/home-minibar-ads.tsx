import { useRouter } from "next/router";
import AdSlot from "./ads-slot";
import { useEffect } from "react";
import { defineSlot, removeSlot } from "../../lib/dfp";

export default function HomeMinibarAds() {
    const router = useRouter()
    useEffect(() => {
        // const dfpTargetingParams = { section: ['Homepage'], pos: 'about' }
        // defineSlot('Leaderboard', 'div-gpt-ad-12345678901234-0', [300, 250], { dfpTargetingParams})
        defineSlot('div-gpt-ad-minibar')
        router.events.on('routeChangeComplete', removeSlot)
        return () => {
          router.events.off('routeChangeComplete', removeSlot)
        }
    }, [])
    
    return (
        <AdSlot id={'div-gpt-ad-minibar'} />
    )
}