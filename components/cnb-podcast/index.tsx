import Link from "next/link";
import PodcastItem from "./podcast-item";
import DatePicker from "react-datepicker";
import {parseString} from 'xml2js'
import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import styles from './styles/podcast.module.css'
import { format } from "date-fns";

export default function Podcast() {
    const [filterDate, setFilterDate] = useState(null);
    const [ allPodcasts, setAllPodcasts ] = useState(null)
    const [ podcasts, setPodcasts ] = useState(null)
    const [ podcastsNum, setPodcastsNum ] = useState(20)

    const user_email = 'luke@bigwigmonster.com'
    const user_pass = 'password'
    const author_basic = btoa(user_email +":"+ user_pass);
    let headers = { "Authorization": "Basic " + author_basic }

    useEffect( () => {
        if ( filterDate !== null ) { 
            // Filter podcasts by date
            const filterDateFm = format(filterDate, "MM/dd/yyyy")
            setPodcasts(null)
            fetch( `https://services.premierenetworks.com/podcast/${filterDateFm}/clayandbuck.xml`, { headers } )
                    .then( res => res.text())
                    .then( res => {
                        parseString(res, function (err, result) { //console.log(result)
                            const podcastsJson = (result.rss.channel[0])?.item ?? {}
                            setPodcasts(podcastsJson)
                        })
                    } ) 
                    .catch(err => console.log(err))
        } else {
            // Load all podcasts
            if ( allPodcasts === null ) {
                fetch( 'https://services.premierenetworks.com/podcast/clayandbuck.xml', { headers } )
                    .then( res => res.text())
                    .then( res => {
                        parseString(res, function (err, result) {
                            const podcastsJson = (result.rss.channel[0])?.item ?? {}
                            setAllPodcasts(podcastsJson)
                            setPodcasts(podcastsJson.slice(0, podcastsNum))
                        })
                    } ) 
                    .catch(err => console.log(err))
            } else {
                setPodcasts(allPodcasts.slice(0, podcastsNum))
            }

        }

        return () => {}
    }, [podcastsNum, filterDate])

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
                            <DatePicker
                                className={styles.podcasts_by_date}
                                selected={filterDate}
                                placeholderText="Search by date"
                                dateFormat="MM/dd/yyyy"
                                isClearable
                                onChange={(selectedDate) => setFilterDate(selectedDate) }
                            />
                        </div>
                    </div>

                    <div className={styles.vip_pc_playlist}>    
                        { podcasts && podcasts.map( (pc, index) => {
                                return <PodcastItem key={index} podItem={pc} styles={styles} />
                            })
                        }

                        { podcasts && (
                            <div className={styles.load_more__pc_wrap}>
                                <button onClick={ () => setPodcastsNum( podcastsNum + 20 ) }>Load more</button>
                            </div>
                        )}
                    </div>
                </div> 
            </div>
        </div>
    )
}