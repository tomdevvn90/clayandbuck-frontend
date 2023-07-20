import classnames from "classnames";
import * as React from "react";

interface SkeletonProps {
    type: "image" | "text";
    shape?: "auto" | "circle" | "square" | "16x9" | "tall";
    pulse?: boolean;
    width?: string;
    height?: string;
    size?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    name?: string;
}

export const Skeleton = ({
    type,
    shape = "auto",
    pulse = false,
    width = "",
    height = "",
    size = 0,
    name = "",
}: SkeletonProps) => {
    const skeletonClass = classnames(
        "component-skeleton",
        `type-${type}`,
        `shape-${shape}`,
        // this is ugly, but computed property names aren't supported with current packages =(
        [
            ...(type === "text" && size ? [`size-${size}`] : []),
            ...(pulse ? ["with-pulse"] : []),
        ],
    );

    if (shape === "square" || shape === "circle") {
        height = width;
    }
    const styles: React.CSSProperties = {};
    if (width) {
        styles.width = width;
    }
    if (height) {
        styles.height = height;
    }

    return (<div className={skeletonClass} style={styles} data-name={name || null} />);
};
