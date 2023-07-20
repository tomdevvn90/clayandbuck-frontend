import Script from "next/script";

export default function ScriptLoader() {
    return (
        <>
            <Script id="gpt-lib" 
                src='https://securepubads.g.doubleclick.net/tag/js/gpt.js' 
                strategy="beforeInteractive" />
                
            <Script id="cnb-gpt" 
                dangerouslySetInnerHTML={{
                    __html: `var googletag = googletag || {}; googletag.cmd = googletag.cmd || [];`,
                }}
                strategy="beforeInteractive"
            />
        </>
    )
}