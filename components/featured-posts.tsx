import Link from 'next/link'

export interface FeaturedPostsProps{

}

export default function FeaturedPosts() {
    return (
        <div className="featured-posts">
            <div className="row-1">
                <Link href="/backup-multiple-pcs-macs-and-mobile-devices-into-one-account">
                    <div className="post-wrap">
                        <div className="p-thumb">
                            <img src="https://www.clayandbuck.com/wp-content/uploads/2023/06/FT-860-x-380-062123-idrive-1.jpg" alt="Backup Multiple PCs, Macs and Mobile Devices Into ONE Account!" />
                        </div>
                        <div className="p-content">
                            <h6>30 June, 2023</h6>
                            <h4>Backup Multiple PCs, Macs and Mobile Devices Into ONE Account!</h4>
                            <div className="p-excerpt"></div>
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
                <Link href="/listen-live">
                    <div className="post-wrap">
                        <div className="p-thumb">
                            <img src="https://www.clayandbuck.com/wp-content/uploads/2023/06/FT-860-x-380-independence-day-2.jpg" alt="Inspired by Rush - The Clay Travis &amp; Buck Sexton Show" title="SLIDER CnB INSPIRED Clay and Buck" />
                        </div>
                        <div className="p-content">
                            <h4>Wishing Everyone a Fabulous 4th!</h4>
                        </div>
                    </div>
                </Link>

                <Link href="/listen-live">
                    <div className="post-wrap">
                        <div className="p-thumb">
                            <img src="https://www.clayandbuck.com/wp-content/uploads/2023/06/FT-860-x-380-GUEST-HOST-Michael-Berry.jpg" alt="Inspired by Rush - The Clay Travis &amp; Buck Sexton Show" title="SLIDER CnB INSPIRED Clay and Buck"/>
                        </div>
                        <div className="p-content">
                            <h4>Tune in Monday for Guest Host Michael Berry, and a Best of C&amp;B on July 4th.</h4>
                        </div>
                    </div>
                </Link>

                <Link href="/frank-siller">
                    <div className="post-wrap">
                        <div className="p-thumb">
                            <img src="https://www.clayandbuck.com/wp-content/uploads/2023/06/FT-860-x-380-063023-1.jpg" alt="Tunnel to Towers CEO Frank Siller Makes a Big Independence Day Announcement" />
                        </div>
                        <div className="p-content">
                            <h4>Tunnel to Towers CEO Frank Siller Makes a Big Independence Day Announcement</h4>
                        </div>
                    </div>
                </Link>
            </div>
		</div>
    )
}