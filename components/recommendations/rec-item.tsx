
export default function RecItem( {recItem} ) {
    const buyUrl = recItem.buyUrlPostBooks
    const watchUrl = recItem.watchUrlPostBooks
    const ftImage = recItem.ftImage
    const recClass = ( buyUrl || watchUrl ) ? 'has-btn' : '';
    return (
        <div className={`rc-item ${recClass}`}>
            <div className="rc-image">
            <img src={ftImage} alt={recItem.title} />
            </div>
            <div className="rc-info">
                <h3 dangerouslySetInnerHTML={{ __html: recItem.title }} />
                <div className="rc-content" dangerouslySetInnerHTML={{ __html: recItem.content }} />
                <div className="rc-action-btns">
                    { buyUrl && (
                        <a className="btn" href={buyUrl} target="_blank">BUY NOW</a>
                    )}
                    { watchUrl && (
                        <a className="btn" href={watchUrl} target="_blank">WATCH NOW</a>
                    )}
                </div>
            </div>
        </div>
    )
}