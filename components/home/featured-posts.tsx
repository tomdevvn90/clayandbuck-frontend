import Link from 'next/link'
import {sanitize} from '../../utils/miscellaneous';

export default function FeaturedPosts( {ftPosts} ) {
    const firstPost = ftPosts ? ftPosts[0] : []
    const restPosts = ftPosts ? ftPosts.slice(1): []
    return firstPost && (
        <div className="featured-posts">
            <div className="row-1">
                <Link href={`posts/${firstPost.slug}`} target={firstPost.target}>
                    <div className="post-wrap">
                        <div className="p-thumb">
                            <img src={firstPost.image_url} alt={firstPost.image_alt} />
                        </div>
                        <div className="p-content">
                            <h6>{firstPost.post_date}</h6>
                            <h4 dangerouslySetInnerHTML={{ __html: sanitize( firstPost.post_title ) }}></h4>
                            <div className="p-excerpt" dangerouslySetInnerHTML={{ __html: sanitize( firstPost.post_excerpt ) }}></div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* GPT AdSlot 1 for Ad unit 'prnd/prn-clayandbuck' ### Size: [[984,27],[768,27],[320,27]] */}
            {/* <div id="div-gpt-ad-minibar" data-google-query-id="CJfkgKOo7P8CFVjHlgod2_MDLA">
                <div id="google_ads_iframe_/6663/prnd/prn-clayandbuck_0__container__" style="border: 0pt none;"><iframe id="google_ads_iframe_/6663/prnd/prn-clayandbuck_0" name="google_ads_iframe_/6663/prnd/prn-clayandbuck_0" title="3rd party ad content" width="768" height="27" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" role="region" aria-label="Advertisement" tabindex="0" style="border: 0px; vertical-align: bottom;" data-google-container-id="1" data-load-complete="true"></iframe></div>
            </div> */}
            {/* End AdSlot 1 */}

            <div className="row-2">
                { restPosts && restPosts.map( p => {
                    if ( !p.slug.includes('http') ) { 
                        return (
                            <Link href={p.slug} key={p.post_id} target={p.target}>
                                <div className="post-wrap">
                                    <div className="p-thumb">
                                        <img src={p.image_url} alt={p.image_alt}/>
                                    </div>
                                    <div className="p-content">
                                        <h4 dangerouslySetInnerHTML={{ __html: sanitize( p.post_title ) }}></h4>
                                    </div>
                                </div>
                            </Link>
                        )
                    } else {
                        return (
                            <a href={p.slug} key={p.post_id} target={p.target}>
                                <div className="post-wrap">
                                    <div className="p-thumb">
                                        <img src={p.image_url} alt={p.image_alt}/>
                                    </div>
                                    <div className="p-content">
                                        <h4 dangerouslySetInnerHTML={{ __html: sanitize( p.post_title ) }}></h4>
                                    </div>
                                </div>
                            </a>
                        )
                    }
                } )}
            </div>
		</div>
    )
}