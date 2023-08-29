import Link from "next/link";

export default function PostPreview({ title, coverImage, excerpt, slug }) {
  return (
    <div className="post-wrap">
      <Link href={`/posts/${slug}`} aria-label={title}>
        <div className="post-featured-img">
          {coverImage && <img src={coverImage?.node.sourceUrl} alt={`Cover Image for ${title}`} />}
        </div>
        <h3 className="post-title" dangerouslySetInnerHTML={{ __html: title }}></h3>
        <div className="post-excerpt" dangerouslySetInnerHTML={{ __html: excerpt }} />
      </Link>
    </div>
  );
}
