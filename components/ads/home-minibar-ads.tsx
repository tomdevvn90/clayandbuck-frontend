import AdSlot from "./ads-slot";
import { useGpt } from "../../hooks/useGpt";

export default function HomeMinibarAds() {
    useGpt('div-gpt-ad-minibar')
    
    return (
        <AdSlot id={'div-gpt-ad-minibar'} />
    )
}