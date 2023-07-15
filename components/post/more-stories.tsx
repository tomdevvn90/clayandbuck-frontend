import PostPreview from './post-preview';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

export default function MoreStories({ posts }) {
  return (
    <section className='more-stories-ss'>
      <h2>RECENT STORIES</h2>
      <div className="stories-wrapper">
        <Swiper className="stories-carousel" 
              navigation={true} modules={[Navigation]}
              slidesPerView={3} spaceBetween={30}
          >
              {posts.map(({ node }, index) => (
                <SwiperSlide key={index}>
                  <PostPreview
                    key={node.slug}
                    title={node.title}
                    coverImage={node.featuredImage}
                    date={node.date}
                    author={node.author}
                    slug={node.slug}
                    excerpt={node.excerpt}
                  />
                </SwiperSlide>
              ))}
        </Swiper>
        
      </div>
    </section>
  )
}
