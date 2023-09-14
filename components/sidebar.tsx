import useSWR from "swr";
import MedrecTopAds from "./ads/medrec-top-ads";
import MedrecBottomAds from "./ads/medrec-bottom-ads";
import { WP_REST_API_URL, fetcher } from "../lib/constants";
import { ParseHtmlToReact } from "../utils/parse-html-to-react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

export default function Sidebar() {
  const { data, error } = useSWR<SidebarWidgetRes[], Error>(
    `${WP_REST_API_URL}wp/v2/widgets?sidebar=home-sidebar-1`,
    fetcher
  );
  if (error) return <div className="no-podcasts"></div>;
  return (
    <div className="main-sidebar">
      {Array.isArray(data) && (
        <div className="sidebar-wrap">
          {/* Load Top Sidebar Ads */}
          <div>
            <section className="widget widget_text">
              <MedrecTopAds />
            </section>
          </div>

          {data.map((sb, index) => (
            // <div key={index} dangerouslySetInnerHTML={{ __html: sb.rendered }}></div>
            <div key={index}>{ParseHtmlToReact(sb.rendered, true)}</div>
          ))}

          <div>
            <section className="widget widget_text">
              <TwitterTimelineEmbed
                tweetLimit={5}
                sourceType="profile"
                screenName="clayandbuck"
                options={{ height: 600 }}
              />
            </section>
          </div>

          {/* Load Bottom Sidebar Ads */}
          <div>
            <section className="widget widget_text">
              <MedrecBottomAds />
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
type SidebarWidgetRes = {
  id: string;
  rendered: string;
};
