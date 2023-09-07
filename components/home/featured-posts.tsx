import dynamic from "next/dynamic";
import Link from "next/link";
import { isExternalLink } from "../../utils/global-functions";
const HomeMinibarAds = dynamic(() => import("../ads/home-minibar-ads"), {
  ssr: false,
});

export default function FeaturedPosts({ ftPosts }) {
  const firstPost = ftPosts ? ftPosts[0] : [];
  const restPosts = ftPosts ? ftPosts.slice(1) : [];

  return (
    firstPost && (
      <div className="featured-posts">
        <div className="row-1">
          <Link href={`posts/${firstPost.slug}`} target={firstPost.target}>
            <div className="post-wrap">
              <div className="p-thumb">
                <img src={firstPost.image_url} alt={firstPost.image_alt} />
              </div>
              <div className="p-content">
                <h6>{firstPost.post_date}</h6>
                <h4 dangerouslySetInnerHTML={{ __html: firstPost.post_title }}></h4>
                <div className="p-excerpt" dangerouslySetInnerHTML={{ __html: firstPost.post_excerpt }}></div>
              </div>
            </div>
          </Link>
        </div>

        {/* GPT AdSlot 1 for Ad unit 'prnd/prn-clayandbuck' ### Size: [[984,27],[768,27],[320,27]] */}
        <HomeMinibarAds />
        {/* End AdSlot 1 */}

        <div className="row-2">
          {restPosts &&
            restPosts.map((p) => {
              if (!isExternalLink(p.slug)) {
                return (
                  <Link href={p.slug} key={p.post_id} target={p.target}>
                    <div className="post-wrap">
                      <div className="p-thumb">
                        <img src={p.image_url} alt={p.image_alt} />
                      </div>
                      <div className="p-content">
                        <h4 dangerouslySetInnerHTML={{ __html: p.post_title }}></h4>
                      </div>
                    </div>
                  </Link>
                );
              } else {
                return (
                  <a href={p.slug} key={p.post_id} target={p.target}>
                    <div className="post-wrap">
                      <div className="p-thumb">
                        <img src={p.image_url} alt={p.image_alt} />
                      </div>
                      <div className="p-content">
                        <h4 dangerouslySetInnerHTML={{ __html: p.post_title }}></h4>
                      </div>
                    </div>
                  </a>
                );
              }
            })}
        </div>
      </div>
    )
  );
}
