import * as React from "react";

import { truncateString } from "../helpers/string";
import { ZypeVideo } from "./ZypeMedia.types";

interface ZypeVideoProps {
    setCurrentVideo: (video: ZypeVideo, nextVideo: ZypeVideo | null, idx: number) => void;
    nextVideo: ZypeVideo | null;
    video: ZypeVideo;
    idx: number;
}

const FALLBACK_THUMBNAIL = "https://i.iheart.com/v3/re/new_assets/612e55ad788a9e9d55d124e6";

export function ZypeVideoComponent({ video, nextVideo, setCurrentVideo, idx }: ZypeVideoProps) {
    return (
        <figure className="component-zype-video">
            <div className="thumb-container" onClick={() => setCurrentVideo(video, nextVideo, idx)}>
                <img className="thumbnail" alt={video.title} src={video.thumbnails[0] ? video.thumbnails[0].url : FALLBACK_THUMBNAIL} />
            </div>
            <figcaption>
                <div className="title" onClick={() => setCurrentVideo(video, nextVideo, idx)}>
                    {video.title}
                </div>
                <p className="description">{truncateString(video.description, 55)}</p>
            </figcaption>
        </figure>
    );
}