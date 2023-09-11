import { useScript } from "usehooks-ts";
import { useEffect } from "react";
import { SITE_URL } from "../../lib/constants";

declare const ihrAffiliatesMap: any;
interface afMapObj {
  show_name: string;
}

export default function AffiliatesMap() {
  const afMap: afMapObj = {
    show_name: "clay-travis-buck-sexton",
  };
  const status = useScript(`${SITE_URL}/lib/static-stations-map.js`);
  useEffect(() => {
    if (typeof ihrAffiliatesMap !== "undefined") {
      if (status === "ready") {
        ihrAffiliatesMap().initAffiliatesMap(afMap);
      }
    }
    return () => {};
  }, [status]);

  return (
    <div>
      <div className="heading_ss">
        <h1>Where To Listen</h1>
        <ul className="breadcrumbs">
          <li>
            <a href="/">Home</a>
          </li>
          <li className="active">Stations</li>
        </ul>
      </div>

      <div id="ihrAffiliatesMapContainer">
        <div className="">
          <div className="cnb-spinner-loading"></div>
        </div>
      </div>
    </div>
  );
}
