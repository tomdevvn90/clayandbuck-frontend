
/**
 * Check external link
 * @param path 
 * @returns 
 */
export const isExternalLink = ( path: string) => {
    return ( path.includes('http') || path.includes('www') ) ? true : false;
}

/**
 * Check background page template
 * @param pageTemplate 
 * @returns 
 */
export const getBackgroundClass = ( pageTemplate: string ) => {
    const whiteBgListPage = [ 
		'special-offer-template', 
		'terms-conditions-single-post',
        'eib-in-a-hurry'
	]
	return ( whiteBgListPage.includes(pageTemplate) ) ? 'white-background' : ''
}