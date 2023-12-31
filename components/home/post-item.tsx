import Link from "next/link";
import Image from "next/image";
import { sanitize } from "../../utils/miscellaneous";

export default function PostItem({ postData }) {
  return (
    <div className={postData.image_url ? "post-item" : "post-item no-image"}>
      <Link href={`posts/${postData.slug}`}>
        <div className="post-wrap">
          {postData.image_url && (
            <div className="post-img">
              <Image src={postData.image_url} width={346} height={153} alt={postData.image_alt} />
            </div>
          )}
          <div className="post-content">
            <h6>{postData.post_date}</h6>
            <h4 title={postData.post_title} dangerouslySetInnerHTML={{ __html: sanitize(postData.post_title) }}></h4>
            <p dangerouslySetInnerHTML={{ __html: sanitize(postData.post_excerpt) }}></p>
          </div>
        </div>
      </Link>
    </div>
  );
}
