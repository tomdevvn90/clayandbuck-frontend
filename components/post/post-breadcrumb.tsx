import Link from "next/link";

export default function BreadCrumb() {
    return (
        <div className="breadcrumb-ss">
            <ul className="breadcrumbs">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li className="active">
                    <Link href='/category/top_stories/'>Stories</Link>
                </li>
            </ul>
        </div>
    )
}