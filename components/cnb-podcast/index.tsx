import Link from "next/link";
import PodcastItem from "./podcast-item";
import DatePicker from "react-datepicker";
import {parseString} from 'xml2js'
import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import styles from './styles/podcast.module.css'
import PodcastsVipPlayer from "../podcasts-vip-player";

export default function Podcast() {
    const [filterDate, setFilterDate] = useState(null);
    const [ allPodcasts, setAllPodcasts ] = useState(null)
    const [ podcasts, setPodcasts ] = useState(null)
    const [ podcastsNum, setPodcastsNum ] = useState(20)
    const [ showLoadMoreBtn, setLoadMoreBtn ] = useState(true)
    const [ headingText, setHeadingText ] = useState('Latest Podcasts')
    const [ messageText, setMessageText ] = useState('')
    const [ cnbLoading, setCnbLoading ] = useState(true)

    const user_email = 'luke@bigwigmonster.com'
    const user_pass = 'password'
    const author_basic = btoa(user_email +":"+ user_pass);
    let headers = { "Authorization": "Basic " + author_basic }

    useEffect( () => {
        setCnbLoading(true)

        if ( filterDate !== null ) { 
            setLoadMoreBtn(false)
            setPodcasts(null)

            // Filter podcasts by date
            const fDate = new Date(filterDate)
            let fDay = (fDate.getDate() < 10) ? `0${fDate.getDate()}` : fDate.getDate()
            let fMonth = (fDate.getMonth() < 10) ? `0${fDate.getMonth()+1}` : fDate.getMonth()
            let fYear = fDate.getFullYear();
            const filterDateFm = `${fYear}/${fMonth}/${fDay}`

            setHeadingText(`Podcasts on ${fMonth}/${fDay}/${fYear}`)
            fetch( `https://services.premierenetworks.com/podcast/${filterDateFm}/clayandbuck.xml`, { headers } )
                .then( res => res.text())
                .then( res => { 
                    if ( res.includes('"status":"ERROR"') ) {
                        setMessageText ( JSON.parse(res).data.message )
                    } else {
                        parseString(res, function (err, result) {
                            const podcastsJson = (result.rss.channel[0])?.item ?? {}
                            if ( podcastsJson && podcastsJson.length > 0 ) {
                                setPodcasts(podcastsJson)
                            } else {
                                setMessageText('There were no podcast episodes available for this date.')
                            }
                        })
                    }
                    setCnbLoading(false)
                } ) 
                .catch(err => {
                    console.log(err)
                    setMessageText('Something went wrong! Please try again.')
                    setCnbLoading(false)
                })
        } else {
            // Load all podcasts
            setHeadingText('Latest Podcasts')
            setLoadMoreBtn(true)
            if ( allPodcasts === null ) {
                fetch( 'https://services.premierenetworks.com/podcast/clayandbuck.xml', { headers } )
                    .then( res => res.text())
                    .then( res => {
                        if ( res.includes('"status":"ERROR"') ) {
                            setPodcasts(null)
                            setMessageText ( JSON.parse(res).data.message )
                        } else {
                            parseString(res, function (err, result) {
                                const podcastsJson = (result.rss.channel[0])?.item ?? {}
                                if ( podcastsJson && podcastsJson.length > 0 ) {
                                    setAllPodcasts(podcastsJson)
                                    setPodcasts(podcastsJson.slice(0, podcastsNum))
                                } else {
                                    setMessageText('Something went wrong! Please try again.')
                                    setPodcasts(null)
                                    setLoadMoreBtn(false)
                                }
                            })
                        }
                        setCnbLoading(false)
                    } ) 
                    .catch(err => {
                        console.log(err)
                        setMessageText('Something went wrong! Please try again.')
                        setPodcasts(null)
                        setLoadMoreBtn(false)
                        setCnbLoading(false)
                    })
            } else {
                setPodcasts(allPodcasts.slice(0, podcastsNum))
                setCnbLoading(false)
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

                <div className={styles.filter_block}>
                    <h2 className={styles.filter_title}>{headingText}</h2>
                    <div className={styles.search_by_date}>
                        <DatePicker
                            popperPlacement="bottom-end"
                            className={styles.podcasts_by_date}
                            selected={filterDate}
                            placeholderText="Search by date"
                            dateFormat="MM/dd/yyyy"
                            isClearable
                            onChange={ (slDate) => setFilterDate(slDate) }
                        />
                    </div>
                </div>

                <div className={styles.vip_pc_playlist}>    
                    { cnbLoading && (
                        <div className="cnb-spinner-loading"></div>
                    )}

                    { (! podcasts) && (
                        <h2 className={styles.error_msg}>{messageText}</h2>
                    )}

                    { podcasts && podcasts.length > 0 && podcasts.map( (pc, index) => {
                            return <PodcastItem key={index} podItem={pc} styles={styles} />
                        })
                    }

                    { podcasts && podcasts.length > 0 && showLoadMoreBtn && (
                        <div className={styles.load_more__pc_wrap}>
                            <button onClick={ () => setPodcastsNum( podcastsNum + 20 ) }>Load more</button>
                        </div>
                    )}
                </div>
            </div>

            {/* { podcasts && podcasts.length > 0 && (
                <PodcastsVipPlayer data={podcasts} />
            )} */}
        </div>
    )
}