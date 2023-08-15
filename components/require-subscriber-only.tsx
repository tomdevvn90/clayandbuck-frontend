import { useContext } from "react";
import { GlobalsContext } from "../contexts/GlobalsContext";
import Link from "next/link";

export default function RequireSubscriberOnly({ requireObj }) {
  const GlobalsCtx = useContext(GlobalsContext);

  const { userEmailCk, userPassCk, userSubsCk, userCanSubsCk } = requireObj;

  if (!userEmailCk || !userPassCk) {
    return (
      <div className="require-subs-only-wrap">
        <h2>You must be a C&B VIP subscriber to access this content.</h2>
        <button className="btn" onClick={() => GlobalsCtx.setOpenLoginModal(true)}>
          Login
        </button>
        <Link className="cnb-btn" href="/cnb-sign-up/">
          Subscribe
        </Link>
      </div>
    );
  }

  if (!userSubsCk) {
    return (
      <div className="require-subs-only-wrap">
        <h2>You do not have a valid subscription.</h2>
        <p>Please subscribe to view the content.</p>
        <button className="btn" onClick={() => GlobalsCtx.setOpenLoginModal(true)}>
          Subscribe
        </button>
      </div>
    );
  }

  if (userCanSubsCk) {
    return (
      <div className="require-subs-only-wrap">
        <h2>Your subscription was cancelled.</h2>
        <p>Please reactivate subscription to view the content.</p>
        <button className="btn" onClick={() => GlobalsCtx.setOpenLoginModal(true)}>
          Reactivate
        </button>
      </div>
    );
  }
}
