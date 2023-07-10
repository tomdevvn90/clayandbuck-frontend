import * as React from "react";
import { Skeleton } from "../shared/Skeleton.component";

const videos: React.ReactElement<HTMLElement>[] = [];
const tabHeaders: React.ReactElement<HTMLElement>[] = [];

for (let idx = 0; idx < 12; idx++) {
    videos.push(
        <figure className="component-zype-video skeleton" key={idx}>
            <div className="thumb-container">
                <Skeleton pulse={true} type="image" name="thumbnail" shape="16x9" />
            </div>
            <figcaption>
                <Skeleton pulse={true} type="text" name="thumbnail" size={5} />
            </figcaption>
        </figure>,
    );
}

for (let idx = 0; idx < 4; idx++) {
    tabHeaders.push(
        <div className={`zype-tab-header ${idx === 0 ? "active" : ""}`} key={idx} style={{ width: "14rem" }}>
            <Skeleton pulse={true} type="text" name="thumbnail" size={5} />
        </div>,
    );
}

export function ZypeTabSkeleton() {
    return (
        <div className="component-zype-tab active">
            <div className="videos-container">{videos}</div>
        </div>
    );
}

export function ZypeTabsSkeleton() {
    return (
        <div className="component-zype-tabs">
            <div className="component-zype-nav-bar">
                <div />
                <div className="tab-headers-container">{tabHeaders}</div>
            </div>

            <div className="tabs-container">
                <ZypeTabSkeleton />
            </div>
        </div>
    );
}
