import useGpt from "../../hooks/useGpt";
import AdSlot from "./ads-slot";

export default function MedrecTopAds() {
  useGpt("div-gpt-ad-medrec_300x250_top");

  return <AdSlot id={"div-gpt-ad-medrec_300x250_top"} />;
}
