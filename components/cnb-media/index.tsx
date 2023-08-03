import CnbMediaApp from "./CnbMediaApp";
import { CnbMediaProps } from "./helpers/interfaces";

export default function CnbMedia({ slugParams = null }) {
  const groupSlugP = Array.isArray(slugParams) ? slugParams[0] : null;
  const episodeSlugP = Array.isArray(slugParams) ? slugParams[1] : null;

  const mediaProps: CnbMediaProps = {
    groupSlug: groupSlugP,
    episodeSlug: episodeSlugP,
    pageSlug: "videos",
    isAuthenticated: false,
  };

  return <CnbMediaApp {...mediaProps} />;
}
