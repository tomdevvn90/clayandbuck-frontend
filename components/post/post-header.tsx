// import Avatar from '../avatar'
import Date from './date'
import CoverImage from './cover-image'
import Categories from '../categories'
import PostTitle from './post-title'

export default function PostHeader({
  title,
  coverImage,
  featureImageUrl,
  featureImageTab,
  featuredVideosPost,
  date,
  author,
  categories,
}) {
  return (
    <>
      <PostTitle>{title}</PostTitle>

      {/* <div className="">
        <Avatar author={author} />
      </div> */}

      <div className="featured-image">
        <CoverImage title={title} coverImage={coverImage} 
                    featureImageUrl={featureImageUrl}
                    featureImageTab={featureImageTab}
                    ftVideosPost={featuredVideosPost} />
      </div>

      <div className="post-meta">
        {/* <div className="">
          <Avatar author={author} />
        </div> */}

        <div className="create-date">
          <Date dateString={date} />

          {/* <Categories categories={categories} /> */}
          
        </div>
      </div>
    </>
  )
}
