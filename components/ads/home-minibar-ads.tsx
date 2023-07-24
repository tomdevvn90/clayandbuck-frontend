import useGpt from "../../hooks/useGpt";
import AdSlot from "./ads-slot";

export default function HomeMinibarAds() {
  useGpt("div-gpt-ad-minibar");

  return <AdSlot id={"div-gpt-ad-minibar"} />;
}
