import CnbMediaApp from "./CnbMediaApp";
import { CnbMediaProps } from "./helpers/interfaces";
import RequireActiveSubsPopup from "./zype/require-active-subs-popup";
import RequireSubsPopup from "./zype/require-subs-popup";

export default function CnbMedia({ slugParams = null }) {
  const groupSlugP = Array.isArray(slugParams) ? slugParams[0] : null;
  const episodeSlugP = Array.isArray(slugParams) ? slugParams[1] : null;

  const mediaProps: CnbMediaProps = {
    groupSlug: groupSlugP,
    episodeSlug: episodeSlugP,
    pageSlug: "videos",
  };

  return (
    <>
      <CnbMediaApp {...mediaProps} />

      <RequireSubsPopup />
      <RequireActiveSubsPopup />
    </>
  );
}
