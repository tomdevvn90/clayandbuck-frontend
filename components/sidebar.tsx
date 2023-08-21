import useSWR from "swr";
import { WP_REST_API_URL, fetcher } from "../lib/constants";
import { ParseHtmlToReact } from "../utils/parse-html-to-react";

export default function Sidebar() {
  const { data, error } = useSWR<SidebarWidgetRes[], Error>(
    `${WP_REST_API_URL}/v2/widgets?sidebar=home-sidebar-1`,
    fetcher
  );
  if (error) return <div className="no-podcasts"></div>;
  return (
    <div className="main-sidebar">
      {Array.isArray(data) && (
        <div className="sidebar-wrap">
          {data.map((sb, index) => (
            // <div key={index} dangerouslySetInnerHTML={{ __html: sb.rendered }}></div>
            <div key={index}>{ParseHtmlToReact(sb.rendered)}</div>
          ))}
        </div>
      )}
    </div>
  );
}
type SidebarWidgetRes = {
  id: string;
  rendered: string;
};
