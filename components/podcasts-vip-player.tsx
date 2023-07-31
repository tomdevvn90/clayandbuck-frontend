import Player from "./audio-player";

export default function PodcastsVipPlayer( {data} ) {

    let trackList: VipPodcastResponse[] = []
    if ( Array.isArray(data) ) {
        data.map( (pc) => {
            trackList.push( {
                id: pc.guid[0]._,
                title: pc.title[0],
                imageUrl: pc.image[0],
                mediaUrl: pc.enclosure[0].$.url,
                startDate: pc.pubDate[0].slice(0, 17),
                duration: '',
                description: pc.description[0]                
            } )
        })
    }
    console.log(trackList)
    return (
        <div className="__cnb-podcasts-player">
            { trackList.length > 0 && (
                <h2>test here</h2>
                // <Player trackList={data} includeTags={false} includeSearch={false} />
            )}
        </div>
    )
}
type VipPodcastResponse = {
    id: string,
    title: string,
    imageUrl: string
    startDate: string,
    duration: string
    description: string,
    mediaUrl: string,
}