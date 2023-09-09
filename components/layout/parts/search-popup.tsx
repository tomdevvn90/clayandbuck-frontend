import { useEffect, useRef, useState } from "react";
import useEscapeKey from "../../../hooks/useEscapeKey";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchPopup({ closeSearchPopup, toggleMenuHeader }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const outSideRef = useRef(null);

  useEscapeKey(closeSearchPopup);
  useOutsideClick(closeSearchPopup, outSideRef);

  useEffect(() => {
    document.getElementById("cnb-search-input").focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const keyword = event.target.s.value;
    router.push(`/search?s=${keyword}`, null, { shallow: true });

    if (router.pathname == "/search") closeSearchPopup();

    toggleMenuHeader();
  };
  return (
    <div className="search-modal">
      <div className="modal-wrap" ref={outSideRef}>
        <div>
          <form role="search" onSubmit={handleSubmit}>
            <input id="cnb-search-input" type="text" placeholder="Search..." name="s" />

            {isLoading ? (
              <button type="submit" className="btn-submit loading">
                <span className="cnb-spinner-loading"></span>
              </button>
            ) : (
              <button type="submit" className="btn-submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            )}
          </form>
          <button title="Close (Esc)" type="button" className="close-modal" onClick={closeSearchPopup}>
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
