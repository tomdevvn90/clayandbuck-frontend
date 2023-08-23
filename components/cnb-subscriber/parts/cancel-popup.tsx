import { useRef } from "react";
import useEscapeKey from "../../../hooks/useEscapeKey";
import useOutsideClick from "../../../hooks/useOutsideClick";
import Link from "next/link";

export default function CancelPopup({ closeCancelPopup }) {
  const outSideRef = useRef(null);

  useEscapeKey(closeCancelPopup);
  useOutsideClick(closeCancelPopup, outSideRef);

  return (
    <div id="cnb-sign-up-cancel-modal" className="sign-up-cancel-modal">
      <div className="modal-wrap" ref={outSideRef}>
        <h3>Are you sure you want to leave this page?</h3>
        <p>The changes you made will not be saved</p>
        <Link href="/" className="btn-submit">
          Continue
        </Link>
        <button title="Close (Esc)" type="button" className="close-modal" onClick={closeCancelPopup}>
          ×
        </button>
      </div>
    </div>
  );
}
