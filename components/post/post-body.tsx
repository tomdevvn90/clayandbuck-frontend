import { ParseHtmlToReact } from "../../utils/parse-html-to-react";

export default function PostBody({ content }) {
  return <div className="post-content">{ParseHtmlToReact(content)}</div>;
}
