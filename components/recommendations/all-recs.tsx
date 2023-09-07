import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { getRecsData } from "../../lib/normal-api";
import { recItemProps } from "../../lib/constants";
import RecItem from "./rec-item";

export default function AllRecs({ allRecs, latestItem }) {
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [recs, setRecs] = useState(allRecs);
  const [crPage, setCrPage] = useState(2);
  const [recTypeS, setRecType] = useState("");
  const [activeType, setActiveType] = useState("");
  const [showLoadMoreBtn, setLoadMoreBtn] = useState(true);
  const excludeId = latestItem?.id ?? "";

  // Filter by type
  const getRecsByType = async (recType: string) => {
    setActiveType(recType);

    setIsFilterLoading(true);
    const recsData = await getRecsData(1, 6, excludeId, recType);
    const recsByType = recsData?.booksMovies ?? {};
    if (recsByType.length > 5) {
      setLoadMoreBtn(true);
    } else {
      setLoadMoreBtn(false);
    }
    setIsFilterLoading(false);
    setRecType(recType);
    setCrPage(2);
    setRecs(recsByType);
  };

  // Load more Recs
  const loadMoreRecs = async () => {
    setIsMoreLoading(true);
    const recsData = await getRecsData(crPage, 6, excludeId, recTypeS);
    const moreRecs = recsData?.booksMovies ?? {};
    if (moreRecs.length < 1) {
      setLoadMoreBtn(false);
    } else {
      setRecs([...recs, ...moreRecs]);
      setCrPage(crPage + 1);
    }
    setIsMoreLoading(false);
  };

  const booksClAt = activeType == "Books" ? "btn active" : "btn";
  const moviesClAt = activeType == "Movies" ? "btn active" : "btn";
  const tvShowsClAt = activeType == "TV Shows" ? "btn active" : "btn";
  const guestBkClAt = activeType == "Guest Books" ? "btn active" : "btn";
  return (
    <div className="">
      <div className="rc-filter-block">
        <div className="left-col">
          <h2 className="page-title">RECOMMENDATIONS</h2>
        </div>
        <div className="right-col">
          <div className="rc-filter-btns">
            <button className={booksClAt} onClick={() => getRecsByType("Books")}>
              Books
            </button>
            <button className={moviesClAt} onClick={() => getRecsByType("Movies")}>
              Movies
            </button>
            <button className={tvShowsClAt} onClick={() => getRecsByType("TV Shows")}>
              TV Shows
            </button>
            <button className={guestBkClAt} onClick={() => getRecsByType("Guest Books")}>
              Guest Books
            </button>
          </div>
        </div>
      </div>

      <div className="rc-result-lst">
        {isFilterLoading && (
          <div className="rc-loading-wrap">
            <div className="cnb-spinner-loading"></div>
          </div>
        )}

        {!isFilterLoading &&
          recs.length > 0 &&
          recs.map((rec: recItemProps, index: number) => {
            return <RecItem key={index} recItem={rec} />;
          })}

        {!isFilterLoading && showLoadMoreBtn && (
          <div className="load-more-wrap">
            {isMoreLoading ? (
              <div className="cnb-spinner-loading"></div>
            ) : (
              <button className="btn" onClick={loadMoreRecs}>
                <span>Load More</span>
                <FontAwesomeIcon icon={faRotateRight} style={{}} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
