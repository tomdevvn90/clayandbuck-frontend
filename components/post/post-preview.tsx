// import Avatar from '../avatar'
// import Date from './date'
import Link from "next/link";

export default function PostPreview({ title, coverImage, date, excerpt, author, slug }) {
  return (
    <div className="post-wrap">
      <Link href={`/posts/${slug}`} aria-label={title}>
        <div className="post-featured-img">
          {coverImage && <img src={coverImage?.node.sourceUrl} alt={`Cover Image for ${title}`} />}
        </div>
        <h3 className="post-title" dangerouslySetInnerHTML={{ __html: title }}></h3>
        {/* <div className="post-date">
          <Date dateString={date} />
        </div> */}
        <div className="post-excerpt" dangerouslySetInnerHTML={{ __html: excerpt }} />
        {/* <Avatar author={author} /> */}
      </Link>
    </div>
  );
}
