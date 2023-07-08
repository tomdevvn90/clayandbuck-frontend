import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight} from "@fortawesome/free-solid-svg-icons";
import { getTopStories } from "../lib/normal-api"
import { sanitize } from '../utils/miscellaneous';
import PostItem from './post/post-item';


export default function TopStories({tpStories, exTopStories, qtSliders}) {
    const [nextPage, setNextPage] = useState(2)
    const [topStories, setTopStories] = useState(tpStories)
    const [showLoadMoreBtn, setLoadMoreBtn] = useState(true)
     
    // useEffect(() => {
    //     const _getNextPage = async () => {
    //         const moreTopStories = await getTopStories(nextPage, 9, '123');
    //         console.log(moreTopStories)
    //         setTopStories([...topStories, ...moreTopStories]);
    //     }
    //     _getNextPage();
    // }, [nextPage])

    async function loadMoreTopStories () {
        const moreTopStories = await getTopStories(nextPage, 9, exTopStories);
        if ( moreTopStories.length < 1 ) {
            setLoadMoreBtn(false);
        } else {
            setTopStories([...topStories, ...moreTopStories]);
            setNextPage( nextPage + 1 )
        }
    }

    const quoteSliders = (
        <Swiper pagination={{ clickable: true, }} modules={[Pagination]} className="quote-carousel">
            { qtSliders && qtSliders.map( (sl, index) => {
                return (
                    <SwiperSlide key={index}>
                        <div className='slide-content' dangerouslySetInnerHTML={{ __html: sanitize(sl.content) }}></div>
                    </SwiperSlide>
                )
            } )}
        </Swiper>
    )
    return (
        <div className="top-stories">		
            { topStories && topStories.map( (tpStory, index) => {
                if ( index === 3 ) {
                    return (
                        <div key={index}>
                            {quoteSliders}
                            <PostItem postData={tpStory}></PostItem>
                        </div>
                    )
                }
                return (
                    <PostItem key={index} postData={tpStory}></PostItem>
                )
            } )}	
            { showLoadMoreBtn ? ( 
                <div className='load-more-wrap'>
                    <button onClick={ loadMoreTopStories }>
                        <span>Load More</span>
                        <FontAwesomeIcon icon={faRotateRight} style={{}} />
                    </button>
                </div>
            ) : null}														
        </div>
    )
}