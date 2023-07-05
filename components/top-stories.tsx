import Link from 'next/link'
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight} from "@fortawesome/free-solid-svg-icons";
import { getMoreStories } from "../lib/normal-api"

export default function TopStories({tpStories, qtSliders}) {
    const [displayStoriesNum, setDisplayStoriesNum] = useState(9);
    const [articles, setArticles] = useState(tpStories);

    const [nextPage, setNextPage] = useState(1)
    const [topStories, setTopStories] = useState(tpStories)
     
    // useEffect(() => {
    //     const _getNextPage = async () => {
    //         const moreTopStories = await getMoreStories(nextPage, 9, '123');
    //         console.log(moreTopStories)
    //         setTopStories([...topStories, ...moreTopStories]);
    //     }
    //     _getNextPage();
    // }, [nextPage])

    const quoteSliders = (
        <Swiper pagination={{ clickable: true, }} modules={[Pagination]} className="quote-carousel">
            { qtSliders && qtSliders.map( (sl, index) => {
                return (
                    <SwiperSlide key={index}>
                        <div className='slide-content' dangerouslySetInnerHTML={{ __html: sl.content}}></div>
                    </SwiperSlide>
                )
            } )}
        </Swiper>
    )
    return (
        <div className="top-stories">		
            { topStories && topStories.map( (tpStory, index) => {
                if ( index === 3 ) {
                    console.log("here")
                    return (
                        <div key={index}>
                            {quoteSliders}
                            <div className="post-item">
                                <Link href={tpStory.url}>
                                    <div className="post-wrap">
                                        <div className="post-img">
                                            <img src={tpStory.image_url} alt={tpStory.image_alt} />
                                        </div>
                                        <div className="post-content">
                                            <h6>{tpStory.post_date}</h6>
                                            <h4 title={tpStory.post_title} dangerouslySetInnerHTML={{ __html: tpStory.post_title }}></h4>
                                            <p dangerouslySetInnerHTML={{ __html: tpStory.post_excerpt }}></p>
                                        </div>
                                    </div>
                                </Link>
                            </div> 
                        </div>
                    )
                }
                return (
                    <div className="post-item" key={index}>
                        <Link href={tpStory.url}>
                            <div className="post-wrap">
                                <div className="post-img">
                                    <img src={tpStory.image_url} alt={tpStory.image_alt} />
                                </div>
                                <div className="post-content">
                                    <h6>{tpStory.post_date}</h6>
                                    <h4 title={tpStory.post_title} dangerouslySetInnerHTML={{ __html: tpStory.post_title }}></h4>
                                    <p dangerouslySetInnerHTML={{ __html: tpStory.post_excerpt }}></p>
                                </div>
                            </div>
                        </Link>
                    </div> 
                )
            } )}	

            {topStories.length > 0 ? ( 
                <div className='load-more-wrap'>
                    <button onClick={async () => {
                            //const moreTopStories = await getMoreStories(nextPage, 9, '123');
                            // setTopStories([...topStories, ...moreTopStories]);
                            setNextPage( nextPage + 1 )
                            
                            //console.log(moreTopStories);
                        }}>
                        <span>Load More</span>
                        <FontAwesomeIcon icon={faRotateRight} style={{}} />
                    </button>
                </div>
            ) : null}														

        </div>
    )
}