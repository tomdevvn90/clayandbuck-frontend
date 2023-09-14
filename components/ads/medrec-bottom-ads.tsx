import useGpt from "../../hooks/useGpt";
import AdSlot from "./ads-slot";

export default function MedrecBottomAds() {
  useGpt("div-gpt-ad-medrec_300x250_bottom");

  return <AdSlot id={"div-gpt-ad-medrec_300x250_bottom"} />;
}
