
export default function HeroItem( {latestItem} ) {
    const buyUrl = latestItem.buyUrlPostBooks
    const watchUrl = latestItem.watchUrlPostBooks
    const ftImage = latestItem.ftImage
    return (
        <div className="rc-first-item">
            <div className="rc-info">
                <h2 className="page-title desk" dangerouslySetInnerHTML={{ __html: latestItem.title }} />
                <div className="rc-content" dangerouslySetInnerHTML={{ __html: latestItem.content }} />
                <div className="rc-action-btns">
                    { buyUrl && (
                        <a className="btn" href={buyUrl} target="_blank">BUY NOW</a>
                    )}
                    
                    { watchUrl && (
                        <a className="btn" href={watchUrl} target="_blank">WATCH NOW</a>
                    )}
                </div>
            </div>
            <div className="rc-image">
                <h2 className="page-title mob" dangerouslySetInnerHTML={{ __html: latestItem.title }} />
                { ftImage && (
                    <img src={ftImage} alt={latestItem.title} />
                )}
            </div>
        </div>
    )
}