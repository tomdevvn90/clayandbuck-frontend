
/**
 * Check external link
 * @param path 
 * @returns 
 */
export const isExternalLink = ( path: string) => {
    return ( path.includes('http') || path.includes('www') ) ? true : false;
}