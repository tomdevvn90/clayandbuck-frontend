import Link from "next/link";

export default function SearchItem({ title, coverImage, excerpt, slug, type }) {
  const link = type == "post" ? `/posts/${slug}` : `/${slug}`;
  return (
    <div className={coverImage ? "post-wrap" : "post-wrap no-image"}>
      <Link href={link} aria-label={title}>
        {coverImage && (
          <div className="post-featured-img">
            <img src={coverImage} alt={`Cover Image for ${title}`} />
          </div>
        )}
        <div className="post-content">
          <h3 className="post-title" dangerouslySetInnerHTML={{ __html: title }}></h3>
          <div className="post-excerpt" dangerouslySetInnerHTML={{ __html: excerpt }} />
        </div>
      </Link>
    </div>
  );
}
