import Link from "next/link";
import Image from "next/image";

export default function SearchItem({ title, coverImage, excerpt, slug, type }) {
  let url = slug;
  if (type == "post") url = `/posts/${slug}`;
  if (type != "page" && type != "post") url = `/${type}/${slug}`;

  return (
    <div className={coverImage ? "post-wrap" : "post-wrap no-image"}>
      <Link href={url} aria-label={title}>
        {coverImage && (
          <div className="post-featured-img">
            <Image src={coverImage} alt={`Cover Image for ${title}`} width={300} height={160} />
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
