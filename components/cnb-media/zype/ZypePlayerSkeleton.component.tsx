import * as React from "react";
import { Skeleton } from "../shared/Skeleton.component";

export function ZypePlayerSkeleton() {
    return (
        <figure className="component-zype-player-skeleton">
            <div className="player-container">
                <Skeleton pulse={true} type="image" name="main image" shape="16x9" />
            </div>
            <figcaption>
                <Skeleton pulse={true} type="text" name="Title" size={3} />
            </figcaption>
        </figure>
    );
}
