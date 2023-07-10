import React, { useEffect } from 'react';

declare global {
    interface Window { googletag: any; gptadslots: any; }
}

export interface ZypeAdProps {
    path: string;
    size: [number, number];
    id: string;
}  

export const ZypeAd = (props: ZypeAdProps) => {
    useEffect(() => {
        let gptadslots = window.gptadslots;
        let googletag  = window.googletag || {};

        googletag.cmd = googletag.cmd || [];

        // (function(){ 
        //     var gads = document.createElement('script');
        //     gads.async = true; gads.type = 'text/javascript';
        //     gads.src = '//www.googletagservices.com/tag/js/gpt.js';
            
        //     var node = document.getElementsByTagName('script')[0];
        //     if(node && node.parentNode) {
        //         node.parentNode.insertBefore(gads, node);
        //     }
        // })();
    
        googletag.cmd.push(function() {
            if(!gptadslots[4]) {
                // It should be already defined. If it isn't, do it here. If it is, then defining it twice breaks things
                gptadslots[4] = googletag.defineSlot(props.path, [props.size], props.id)
                    .setTargeting('prnpage', ['videos'])
                    .setTargeting('pos', ['top'])
                    .addService(googletag.pubads());
            }
    
            googletag.pubads().enableSingleRequest();
            googletag.pubads().setTargeting('prntype', ['web'])
                .setTargeting('prngenre', ['conservative_talk']);
            googletag.pubads().enableAsyncRendering();
            googletag.enableServices();
        });
    });

    return (<div id={props.id} />);
 };
