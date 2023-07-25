import Link from "next/link";

import styles from './styles/podcast.module.css'
import { useEffect, useState } from "react";

export default function Podcast() {

    const [ podcasts, setPodcasts ] = useState(null)

    useEffect( () => {

        const user_email = 'luke@bigwigmonster.com'
        const user_pass = 'password'
        const author_basic = btoa(user_email +":"+ user_pass);

        let headers = { "Authorization": "Basic " + author_basic }
        fetch( 'https://services.premierenetworks.com/podcast/clayandbuck.xml', { headers } )
            .then( res => res.text())
            .then( res => {
                console.log(res)
            } ) 

        return () => {}
    }, [])

    return (
        <div>
            <div className={styles.vip_podcast_content}>
                <h1>VIP Commercial Free Podcast</h1>
                <p>You can listen to the podcasts or download the file to your device.</p>

                <Link className={styles.podcast_feed_link} href="/podcast-feed">Podcast feed</Link>
            </div>

            <div className={styles.vip_podcast_list}>
                <div className="wrap">
                    <div className={styles.filter_block}>
                        <h2 className={styles.filter_title}>Latest Podcasts</h2>
                        <div className={styles.search_by_date}>
                            <span className="clear-filter"></span>
                            <input type="text" placeholder="Search by date" className={styles.podcasts_by_date} />
                        </div>
                    </div>

                    <div className={styles.vip_pc_playlist}>
                        <div className={styles.podcast_item} data-song-index="0">
                            <div className={styles.song_info}>
                                <div className={styles.top_row}>
                                    <img src="//i.iheart.com/v3/re/new_assets/64710750ecc8e09cf37802e4" alt="" />
                                    <div className={styles.title_box}>
                                        <h2>Daily Review With Clay and Buck</h2>
                                        <p className={styles.datetime}>Monday - Jul 24, 2023</p>
                                    </div>
                                </div>
                                <div className={styles.bot_row}>
                                    <p>Worse than Watergate.  Playing politics. Woke Disney.  Destroying history. </p>
                                </div>
                            </div>
                            <a href="https%3A%2F%2Fdts.podtrac.com%2Fredirect.mp3%2Fservices.premierenetworks.com%2Fstreamlink%2Fluke%40bigwigmonster.com%2F64c1b3801d2fa28abd5f36f20979789e816f6de9%2Fclayandbuck%2Fpodcast%2Fmedia%2Fepisode%2F64becbd8702948ad1d9a6441%2FDaily-Review-With-Clay-and-Buck-Jul-24-2023.mp3" target="_blank" 
                               className={styles.download_btn}>
                                <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 499.93">
                                    <path fillRule="nonzero" d="M114.51 278.73c-4.37-4.2-4.55-11.2-.38-15.62a10.862 10.862 0 0 1 15.46-.39l115.34 111.34V11.07C244.93 4.95 249.88 0 256 0c6.11 0 11.06 4.95 11.06 11.07v362.42L378.1 262.85c4.3-4.27 11.23-4.21 15.46.13 4.23 4.35 4.17 11.35-.13 15.62L264.71 406.85a11.015 11.015 0 0 1-8.71 4.25c-3.45 0-6.52-1.57-8.56-4.04L114.51 278.73zm375.35 110.71c0-6.11 4.96-11.07 11.07-11.07S512 383.33 512 389.44v99.42c0 6.12-4.96 11.07-11.07 11.07H11.07C4.95 499.93 0 494.98 0 488.86v-99.42c0-6.11 4.95-11.07 11.07-11.07 6.11 0 11.07 4.96 11.07 11.07v88.36h467.72v-88.36z"></path>
                                </svg>
                            </a>
                        </div>

                        <div className={styles.podcast_item} data-song-index="1">
                            <div className={styles.song_info}>
                                <div className={styles.top_row}>
                                    <img src="//i.iheart.com/v3/re/new_assets/60f1d12ba46c81f2c1885115" alt="" />
                                    <div className={styles.title_box}>
                                        <h2>Hour 3 - Disney In Trouble</h2>
                                        <p className={styles.datetime}>Monday - Jul 24, 2023</p>
                                    </div>
                                </div>
                                <div className={styles.bot_row}>
                                    <p>Disney's Snow White actress blasts original movie, touts woke version. Barbie and Oppenheimer have blockbuster box office weekends. Jason Aldean rips woke mob attempts to cancel him. Do leftist boycotts ever work? C and B close the show with a call. </p>
                                </div>
                            </div>
                            <a href="https%3A%2F%2Fdts.podtrac.com%2Fredirect.mp3%2Fservices.premierenetworks.com%2Fstreamlink%2Fluke%40bigwigmonster.com%2F64c1b3801d2fa28abd5f36f20979789e816f6de9%2Fclayandbuck%2Fpodcast%2Fmedia%2Fepisode%2F64becbd8702948ad1d9a6441%2FDaily-Review-With-Clay-and-Buck-Jul-24-2023.mp3" target="_blank" 
                               className={styles.download_btn}>
                                <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 499.93">
                                    <path fillRule="nonzero" d="M114.51 278.73c-4.37-4.2-4.55-11.2-.38-15.62a10.862 10.862 0 0 1 15.46-.39l115.34 111.34V11.07C244.93 4.95 249.88 0 256 0c6.11 0 11.06 4.95 11.06 11.07v362.42L378.1 262.85c4.3-4.27 11.23-4.21 15.46.13 4.23 4.35 4.17 11.35-.13 15.62L264.71 406.85a11.015 11.015 0 0 1-8.71 4.25c-3.45 0-6.52-1.57-8.56-4.04L114.51 278.73zm375.35 110.71c0-6.11 4.96-11.07 11.07-11.07S512 383.33 512 389.44v99.42c0 6.12-4.96 11.07-11.07 11.07H11.07C4.95 499.93 0 494.98 0 488.86v-99.42c0-6.11 4.95-11.07 11.07-11.07 6.11 0 11.07 4.96 11.07 11.07v88.36h467.72v-88.36z"></path>
                                </svg>
                            </a>
                        </div>

                        <div className={styles.podcast_item} data-song-index="1">
                            <div className={styles.song_info}>
                                <div className={styles.top_row}>
                                    <img src="//i.iheart.com/v3/re/new_assets/60f1d12ba46c81f2c1885115" alt="" />
                                    <div className={styles.title_box}>
                                        <h2>Hour 2 - Dems Are Lying About Florida and Slavery</h2>
                                        <p className={styles.datetime}>Monday - Jul 24, 2023</p>
                                    </div>
                                </div>
                                <div className={styles.bot_row}>
                                    <p>Kamala Harris goes to Florida to lie about Florida's black studies curriculum. Whoopi Goldberg on the erroneous Florida slavery story. Pelosi pokes McCarthy on expunging Trump impeachment, calls GOP a clown show. Ana Navarro on Florida and slavery.</p>
                                </div>
                            </div>
                            <a href="https%3A%2F%2Fdts.podtrac.com%2Fredirect.mp3%2Fservices.premierenetworks.com%2Fstreamlink%2Fluke%40bigwigmonster.com%2F64c1b3801d2fa28abd5f36f20979789e816f6de9%2Fclayandbuck%2Fpodcast%2Fmedia%2Fepisode%2F64becbd8702948ad1d9a6441%2FDaily-Review-With-Clay-and-Buck-Jul-24-2023.mp3" target="_blank" 
                               className={styles.download_btn}>
                                <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 499.93">
                                    <path fillRule="nonzero" d="M114.51 278.73c-4.37-4.2-4.55-11.2-.38-15.62a10.862 10.862 0 0 1 15.46-.39l115.34 111.34V11.07C244.93 4.95 249.88 0 256 0c6.11 0 11.06 4.95 11.06 11.07v362.42L378.1 262.85c4.3-4.27 11.23-4.21 15.46.13 4.23 4.35 4.17 11.35-.13 15.62L264.71 406.85a11.015 11.015 0 0 1-8.71 4.25c-3.45 0-6.52-1.57-8.56-4.04L114.51 278.73zm375.35 110.71c0-6.11 4.96-11.07 11.07-11.07S512 383.33 512 389.44v99.42c0 6.12-4.96 11.07-11.07 11.07H11.07C4.95 499.93 0 494.98 0 488.86v-99.42c0-6.11 4.95-11.07 11.07-11.07 6.11 0 11.07 4.96 11.07 11.07v88.36h467.72v-88.36z"></path>
                                </svg>
                            </a>
                        </div>

                        <div className={styles.podcast_item} data-song-index="1">
                            <div className={styles.song_info}>
                                <div className={styles.top_row}>
                                    <img src="//i.iheart.com/v3/re/new_assets/64bb377ff5ef926d82d3b14b" alt="" />
                                    <div className={styles.title_box}>
                                        <h2>Sunday Hang with Clay and Buck</h2>
                                        <p className={styles.datetime}>Sunday - Jul 23, 2023</p>
                                    </div>
                                </div>
                                <div className={styles.bot_row}>
                                    <p>The first time Clay met his father-in-law (in a speedo). Did you see the new Indiana Jones movie? Jim Caviezel on Sound of Freedom.</p>
                                </div>
                            </div>
                            <a href="https%3A%2F%2Fdts.podtrac.com%2Fredirect.mp3%2Fservices.premierenetworks.com%2Fstreamlink%2Fluke%40bigwigmonster.com%2F64c1b3801d2fa28abd5f36f20979789e816f6de9%2Fclayandbuck%2Fpodcast%2Fmedia%2Fepisode%2F64becbd8702948ad1d9a6441%2FDaily-Review-With-Clay-and-Buck-Jul-24-2023.mp3" target="_blank" 
                               className={styles.download_btn}>
                                <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 499.93">
                                    <path fillRule="nonzero" d="M114.51 278.73c-4.37-4.2-4.55-11.2-.38-15.62a10.862 10.862 0 0 1 15.46-.39l115.34 111.34V11.07C244.93 4.95 249.88 0 256 0c6.11 0 11.06 4.95 11.06 11.07v362.42L378.1 262.85c4.3-4.27 11.23-4.21 15.46.13 4.23 4.35 4.17 11.35-.13 15.62L264.71 406.85a11.015 11.015 0 0 1-8.71 4.25c-3.45 0-6.52-1.57-8.56-4.04L114.51 278.73zm375.35 110.71c0-6.11 4.96-11.07 11.07-11.07S512 383.33 512 389.44v99.42c0 6.12-4.96 11.07-11.07 11.07H11.07C4.95 499.93 0 494.98 0 488.86v-99.42c0-6.11 4.95-11.07 11.07-11.07 6.11 0 11.07 4.96 11.07 11.07v88.36h467.72v-88.36z"></path>
                                </svg>
                            </a>
                        </div>

                        <div className={styles.podcast_item} data-song-index="1">
                            <div className={styles.song_info}>
                                <div className={styles.top_row}>
                                    <img src="//i.iheart.com/v3/re/new_assets/60f1d12ba46c81f2c1885115" alt="" />
                                    <div className={styles.title_box}>
                                        <h2>Hour 3 - Disney In Trouble</h2>
                                        <p className={styles.datetime}>Monday - Jul 24, 2023</p>
                                    </div>
                                </div>
                                <div className={styles.bot_row}>
                                    <p>Disney's Snow White actress blasts original movie, touts woke version. Barbie and Oppenheimer have blockbuster box office weekends. Jason Aldean rips woke mob attempts to cancel him. Do leftist boycotts ever work? C and B close the show with a call. </p>
                                </div>
                            </div>
                            <a href="https%3A%2F%2Fdts.podtrac.com%2Fredirect.mp3%2Fservices.premierenetworks.com%2Fstreamlink%2Fluke%40bigwigmonster.com%2F64c1b3801d2fa28abd5f36f20979789e816f6de9%2Fclayandbuck%2Fpodcast%2Fmedia%2Fepisode%2F64becbd8702948ad1d9a6441%2FDaily-Review-With-Clay-and-Buck-Jul-24-2023.mp3" target="_blank" 
                               className={styles.download_btn}>
                                <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 499.93">
                                    <path fillRule="nonzero" d="M114.51 278.73c-4.37-4.2-4.55-11.2-.38-15.62a10.862 10.862 0 0 1 15.46-.39l115.34 111.34V11.07C244.93 4.95 249.88 0 256 0c6.11 0 11.06 4.95 11.06 11.07v362.42L378.1 262.85c4.3-4.27 11.23-4.21 15.46.13 4.23 4.35 4.17 11.35-.13 15.62L264.71 406.85a11.015 11.015 0 0 1-8.71 4.25c-3.45 0-6.52-1.57-8.56-4.04L114.51 278.73zm375.35 110.71c0-6.11 4.96-11.07 11.07-11.07S512 383.33 512 389.44v99.42c0 6.12-4.96 11.07-11.07 11.07H11.07C4.95 499.93 0 494.98 0 488.86v-99.42c0-6.11 4.95-11.07 11.07-11.07 6.11 0 11.07 4.96 11.07 11.07v88.36h467.72v-88.36z"></path>
                                </svg>
                            </a>
                        </div>

                        <div className={styles.podcast_item} data-song-index="1">
                            <div className={styles.song_info}>
                                <div className={styles.top_row}>
                                    <img src="//i.iheart.com/v3/re/new_assets/60f1d12ba46c81f2c1885115" alt="" />
                                    <div className={styles.title_box}>
                                        <h2>Hour 2 - Dems Are Lying About Florida and Slavery</h2>
                                        <p className={styles.datetime}>Monday - Jul 24, 2023</p>
                                    </div>
                                </div>
                                <div className={styles.bot_row}>
                                    <p>Kamala Harris goes to Florida to lie about Florida's black studies curriculum. Whoopi Goldberg on the erroneous Florida slavery story. Pelosi pokes McCarthy on expunging Trump impeachment, calls GOP a clown show. Ana Navarro on Florida and slavery.</p>
                                </div>
                            </div>
                            <a href="https%3A%2F%2Fdts.podtrac.com%2Fredirect.mp3%2Fservices.premierenetworks.com%2Fstreamlink%2Fluke%40bigwigmonster.com%2F64c1b3801d2fa28abd5f36f20979789e816f6de9%2Fclayandbuck%2Fpodcast%2Fmedia%2Fepisode%2F64becbd8702948ad1d9a6441%2FDaily-Review-With-Clay-and-Buck-Jul-24-2023.mp3" target="_blank" 
                               className={styles.download_btn}>
                                <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 499.93">
                                    <path fillRule="nonzero" d="M114.51 278.73c-4.37-4.2-4.55-11.2-.38-15.62a10.862 10.862 0 0 1 15.46-.39l115.34 111.34V11.07C244.93 4.95 249.88 0 256 0c6.11 0 11.06 4.95 11.06 11.07v362.42L378.1 262.85c4.3-4.27 11.23-4.21 15.46.13 4.23 4.35 4.17 11.35-.13 15.62L264.71 406.85a11.015 11.015 0 0 1-8.71 4.25c-3.45 0-6.52-1.57-8.56-4.04L114.51 278.73zm375.35 110.71c0-6.11 4.96-11.07 11.07-11.07S512 383.33 512 389.44v99.42c0 6.12-4.96 11.07-11.07 11.07H11.07C4.95 499.93 0 494.98 0 488.86v-99.42c0-6.11 4.95-11.07 11.07-11.07 6.11 0 11.07 4.96 11.07 11.07v88.36h467.72v-88.36z"></path>
                                </svg>
                            </a>
                        </div>

                        <div className={styles.podcast_item} data-song-index="1">
                            <div className={styles.song_info}>
                                <div className={styles.top_row}>
                                    <img src="//i.iheart.com/v3/re/new_assets/60f1d12ba46c81f2c1885115" alt="" />
                                    <div className={styles.title_box}>
                                        <h2>Hour 3 - Disney In Trouble</h2>
                                        <p className={styles.datetime}>Monday - Jul 24, 2023</p>
                                    </div>
                                </div>
                                <div className={styles.bot_row}>
                                    <p>Disney's Snow White actress blasts original movie, touts woke version. Barbie and Oppenheimer have blockbuster box office weekends. Jason Aldean rips woke mob attempts to cancel him. Do leftist boycotts ever work? C and B close the show with a call. </p>
                                </div>
                            </div>
                            <a href="https%3A%2F%2Fdts.podtrac.com%2Fredirect.mp3%2Fservices.premierenetworks.com%2Fstreamlink%2Fluke%40bigwigmonster.com%2F64c1b3801d2fa28abd5f36f20979789e816f6de9%2Fclayandbuck%2Fpodcast%2Fmedia%2Fepisode%2F64becbd8702948ad1d9a6441%2FDaily-Review-With-Clay-and-Buck-Jul-24-2023.mp3" target="_blank" 
                               className={styles.download_btn}>
                                <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 499.93">
                                    <path fillRule="nonzero" d="M114.51 278.73c-4.37-4.2-4.55-11.2-.38-15.62a10.862 10.862 0 0 1 15.46-.39l115.34 111.34V11.07C244.93 4.95 249.88 0 256 0c6.11 0 11.06 4.95 11.06 11.07v362.42L378.1 262.85c4.3-4.27 11.23-4.21 15.46.13 4.23 4.35 4.17 11.35-.13 15.62L264.71 406.85a11.015 11.015 0 0 1-8.71 4.25c-3.45 0-6.52-1.57-8.56-4.04L114.51 278.73zm375.35 110.71c0-6.11 4.96-11.07 11.07-11.07S512 383.33 512 389.44v99.42c0 6.12-4.96 11.07-11.07 11.07H11.07C4.95 499.93 0 494.98 0 488.86v-99.42c0-6.11 4.95-11.07 11.07-11.07 6.11 0 11.07 4.96 11.07 11.07v88.36h467.72v-88.36z"></path>
                                </svg>
                            </a>
                        </div>

                        <div className={styles.podcast_item} data-song-index="1">
                            <div className={styles.song_info}>
                                <div className={styles.top_row}>
                                    <img src="//i.iheart.com/v3/re/new_assets/60f1d12ba46c81f2c1885115" alt="" />
                                    <div className={styles.title_box}>
                                        <h2>Hour 2 - Dems Are Lying About Florida and Slavery</h2>
                                        <p className={styles.datetime}>Monday - Jul 24, 2023</p>
                                    </div>
                                </div>
                                <div className={styles.bot_row}>
                                    <p>Kamala Harris goes to Florida to lie about Florida's black studies curriculum. Whoopi Goldberg on the erroneous Florida slavery story. Pelosi pokes McCarthy on expunging Trump impeachment, calls GOP a clown show. Ana Navarro on Florida and slavery.</p>
                                </div>
                            </div>
                            <a href="https%3A%2F%2Fdts.podtrac.com%2Fredirect.mp3%2Fservices.premierenetworks.com%2Fstreamlink%2Fluke%40bigwigmonster.com%2F64c1b3801d2fa28abd5f36f20979789e816f6de9%2Fclayandbuck%2Fpodcast%2Fmedia%2Fepisode%2F64becbd8702948ad1d9a6441%2FDaily-Review-With-Clay-and-Buck-Jul-24-2023.mp3" target="_blank" 
                               className={styles.download_btn}>
                                <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 499.93">
                                    <path fillRule="nonzero" d="M114.51 278.73c-4.37-4.2-4.55-11.2-.38-15.62a10.862 10.862 0 0 1 15.46-.39l115.34 111.34V11.07C244.93 4.95 249.88 0 256 0c6.11 0 11.06 4.95 11.06 11.07v362.42L378.1 262.85c4.3-4.27 11.23-4.21 15.46.13 4.23 4.35 4.17 11.35-.13 15.62L264.71 406.85a11.015 11.015 0 0 1-8.71 4.25c-3.45 0-6.52-1.57-8.56-4.04L114.51 278.73zm375.35 110.71c0-6.11 4.96-11.07 11.07-11.07S512 383.33 512 389.44v99.42c0 6.12-4.96 11.07-11.07 11.07H11.07C4.95 499.93 0 494.98 0 488.86v-99.42c0-6.11 4.95-11.07 11.07-11.07 6.11 0 11.07 4.96 11.07 11.07v88.36h467.72v-88.36z"></path>
                                </svg>
                            </a>
                        </div>

                    </div>
                </div> 
            </div>
        </div>
    )
}