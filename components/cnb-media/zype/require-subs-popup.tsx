import { useContext, useRef, useState } from "react";
import { GlobalsContext } from "../../../contexts/GlobalsContext";
import useEscapeKey from "../../../hooks/useEscapeKey";
import useOutsideClick from "../../../hooks/useOutsideClick";

export default function RequireSubsPopup() {
  const GlobalsCtx = useContext(GlobalsContext);
  const outSideRef = useRef(null);

  const handleCloseModal = () => {
    let subsModal = document.getElementById("require-subs-modal");
    subsModal.classList.add("hide");
  };

  const handleSubmit = () => {
    GlobalsCtx.setOpenLoginModal(true);
    handleCloseModal();
  };

  useEscapeKey(handleCloseModal);
  useOutsideClick(handleCloseModal, outSideRef);

  return (
    <div id="require-subs-modal" className="subs-modal hide">
      <div className="modal-wrap" ref={outSideRef}>
        <h3>You don't have a valid subscription</h3>
        <p>Please subscribe to access C&B VIP content</p>
        <button className="btn-submit" onClick={handleSubmit}>
          User Preferences
        </button>
        <button title="Close (Esc)" type="button" className="close-modal" onClick={handleCloseModal}>
          ×
        </button>
      </div>
    </div>
  );
}
