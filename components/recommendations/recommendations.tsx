import Image from "next/image";
import RecsHeaderImg from "../../public/images/recommendations-header.jpg";
import HeroItem from "./hero-item";
import AllRecs from "./all-recs";
import { recItemProps } from "../../lib/constants";

export default function Recommendations({ recsData }) {
  const latestItem: recItemProps = recsData?.latestItem ?? {};
  const allRecs: recItemProps[] = recsData?.booksMovies ?? {};
  return (
    <div className="recs-wrap">
      <section className="hero-ss">
        <Image src={RecsHeaderImg} width={1100} height={263} alt="Clay & Buck Recommendations" />
      </section>

      <section className="content-ss">
        {latestItem && <HeroItem latestItem={latestItem} />}

        {allRecs && <AllRecs allRecs={allRecs} latestItem={latestItem} />}
      </section>
    </div>
  );
}
