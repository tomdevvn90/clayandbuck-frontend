// import Avatar from '../avatar'
import Date from "./date";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";

export default function PostHeader({
  title,
  coverImage,
  featureImageUrl = "",
  featureImageTab = "",
  featuredVideosPost = "",
  date,
}) {
  const ftClass = featuredVideosPost ? "featured-image has-video" : "featured-image";
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className={ftClass}>
        <CoverImage
          title={title}
          coverImage={coverImage}
          featureImageUrl={featureImageUrl}
          featureImageTab={featureImageTab}
          ftVideosPost={featuredVideosPost}
        />
      </div>

      <div className="post-meta">
        <div className="create-date">
          <Date dateString={date} />
        </div>
      </div>
    </>
  );
}
