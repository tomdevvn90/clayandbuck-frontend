import { useEffect, useRef } from "react";
import useEscapeKey from "../../../hooks/useEscapeKey";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchPopup({ closeSearchPopup, toggleMenuHeader }) {
  const router = useRouter();
  const outSideRef = useRef(null);

  useEscapeKey(closeSearchPopup);
  useOutsideClick(closeSearchPopup, outSideRef);

  useEffect(() => {
    document.getElementById("cnb-search-input").focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const keyword = event.target.s.value;

    router.push(`/search?s=${keyword}`, null, { shallow: true });

    closeSearchPopup();
    toggleMenuHeader();
  };
  return (
    <div className="search-modal">
      <div className="modal-wrap" ref={outSideRef}>
        <div>
          <form role="search" onSubmit={handleSubmit}>
            <input id="cnb-search-input" type="text" placeholder="Search..." name="s" />
            <button type="submit" className="btn-submit">
              <FontAwesomeIcon icon={faSearch} style={{}} />
            </button>
          </form>
          <button title="Close (Esc)" type="button" className="close-modal" onClick={closeSearchPopup}>
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
