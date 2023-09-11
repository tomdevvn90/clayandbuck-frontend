import Link from "next/link";
import Image from "next/image";

export default function PostPreview({ title, coverImage, excerpt, slug }) {
  return (
    <div className={coverImage ? "post-wrap" : "post-wrap no-image"}>
      <Link href={`/posts/${slug}`} aria-label={title}>
        {coverImage && (
          <div className="post-featured-img">
            <Image src={coverImage?.node.sourceUrl} alt={`Cover Image for ${title}`} width={300} height={160} />
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
