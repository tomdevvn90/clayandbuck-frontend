export const truncateString = (original: string, max: number) => {
    if (original.length < max) {
        return original;
    }

    let truncated = "";
    truncated = original.substr(0, max - 4);
    truncated = truncated.substr(0, Math.min(truncated.length, truncated.lastIndexOf(" ")));
    return truncated + " ...";
};
