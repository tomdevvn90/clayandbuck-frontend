import { useContext } from "react";
import { GlobalsContext } from "../../../contexts/GlobalsContext";

export default function RequirePopup() {
  const GlobalsCtx = useContext(GlobalsContext);
  return (
    <div id="cnb-subs-reactivate-modal" className="hide">
      <div className="modal-wrap">
        <h3>Your subscription was cancelled</h3>
        <p>Please reactivate subscription to access C&B VIP content</p>
        <button className="btn btn-submit" onClick={() => GlobalsCtx.setOpenLoginModal(true)}>
          User Preferences
        </button>
      </div>
    </div>
  );
}
