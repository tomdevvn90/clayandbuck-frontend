import Link from "next/link";

export default function BreadCrumb({ endLink, endText }) {
  return (
    <div className="breadcrumb-ss">
      <ul className="breadcrumbs">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li className="active">
          <Link href={endLink}>{endText}</Link>
        </li>
      </ul>
    </div>
  );
}
