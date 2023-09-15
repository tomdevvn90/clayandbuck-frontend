import Meta from "../seo/meta";

export default function LayoutNoHeadFoot({ children }) {
  return (
    <>
      <Meta />
      <div className="page-content no-head-foot">{children}</div>
    </>
  );
}
