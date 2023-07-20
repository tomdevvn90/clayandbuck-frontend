// import { dfpConst, adDevice } from './const'

import { SITE_URL } from "../constants"

export const removeSlot = function () {
  const { googletag } = window
  googletag.cmd.push(function () {
    googletag.destroySlots()
  })
}

// export const defineSlot = function (name, id, sizes = [], params = {}) {
export const defineSlot = function ( id: string ) {
    const devSite = ! SITE_URL.includes( 'clayandbuck.com' )
    if (window) {
        // const { googletag, lotaudsList, screen } = window
        // const { dfpTargetingParams } = params
        // if (screen.width < 768 && adDevice[id] === "d") { return; }
        // if (screen.width >= 768 && adDevice[id] === "m") { return; }

        const { googletag, screen } = window
        const render = () => {
        //   googletag.defineSlot(`/${dfpConst.slot_id}/${dfpConst.prefix}_${name}`, sizes, id).addService(googletag.pubads())
        //   googletag.pubads().setTargeting('lotauds', lotaudsList).setTargeting('section', dfpTargetingParams.section).setTargeting('pos', dfpTargetingParams.pos)
        //   googletag.pubads().enableSingleRequest()
        //   googletag.pubads().collapseEmptyDivs()
        //   googletag.enableServices()
        //   googletag.display(id)

            const mapping1 = googletag.sizeMapping()
                .addSize([700, 0], [[728, 90], [984, 27], [1280, 410]])
                .addSize([0, 0], [[320, 50], [320, 27], [320, 100]])
                .build();

            if ( id == 'div-gpt-ad-minibar' ) {
                if ( devSite ) {
                    googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[984,27],[768,27],[320,27]], id)
                        .setTargeting('pos', ['minibar'])
                        .setTargeting('prnpage', ['home'])
                        .setTargeting('refresh', 'true')
                        .defineSizeMapping(mapping1)
                        .addService(googletag.pubads());
                } else {
                    googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[984,27],[768,27],[320,27]], id)
                        .setTargeting('pos', ['minibar'])
                        .setTargeting('prnpage', ['home'])
                        .setTargeting('refresh', 'true')
                        .addService(googletag.pubads());
                }
            }

            if ( id == 'div-gpt-ad-carousel' ) {
                if ( devSite ) {
                    googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[1280,410],[768,200],[320,100]], id)
                    .setTargeting('pos', ['carousel'])
                    .setTargeting('prnpage', ['home'])
                    .defineSizeMapping(mapping1)
                    .addService(googletag.pubads());
                } else {
                    googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[1280,410],[768,200],[320,100]], id)
                    .setTargeting('pos', ['carousel'])
                    .setTargeting('prnpage', ['home'])
                    .addService(googletag.pubads());
                }
            }

            if ( id == 'div-gpt-ad-medrec_300x250_top' ) {
                googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[300,250]], id)
                    .setTargeting('pos', ['medrectop'])
                    .setTargeting('prnpage', ['home'])
                    .addService(googletag.pubads());
            }

            if ( id == 'div-gpt-ad-medrec_300x250_bottom' ) {
                googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[300,250]], id)
                    .setTargeting('pos', ['medrecbottom'])
                    .setTargeting('prnpage', ['home'])
                    .addService(googletag.pubads());
            }

            if ( id == 'div-gpt-ad-leaderboard_728x90_bottom' ) {
                if ( devSite ) {
                    googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[728,90],[320,50]], id)
                        .setTargeting('pos', ['leaderboardbottom'])
                        .setTargeting('prnpage', ['home'])
                        .defineSizeMapping(mapping1)
                        .addService(googletag.pubads());
                } else {
                    googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[728,90],[320,50]], id)
                        .setTargeting('pos', ['leaderboardbottom'])
                        .setTargeting('prnpage', ['home'])
                        .addService(googletag.pubads());
                }
            }

            if ( id == 'div-gpt-ad-pixel' ) {
                googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[1,1]], id)
                    .addService(googletag.pubads());
            }


            if ( id == 'div-gpt-ad-leaderboard_728x90_top' && devSite ) {
                googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[728,90],[320,50]], id)
                    .setTargeting('pos', ['leaderboardtop'])
                    .setTargeting('prnpage', ['home'])
                    .defineSizeMapping(mapping1)
                    .addService(googletag.pubads());
            }

            googletag.pubads().enableSingleRequest();

            if ( devSite ) {
                googletag.pubads().setTargeting('prngenre', ['conservative_talk'])
                .setTargeting('prntype', ['web'])
                .setTargeting('env', ['dev']);
            } else {
                googletag.pubads().setTargeting('prngenre', ['conservative_talk'])
                .setTargeting('prntype', ['web']);
            }
                
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices();

            googletag.display(id)
        }
        
        googletag.cmd.push(function () {
        try {
            render();
        } catch(e) {
            removeSlot();
            render();
        }
        })
    }
}

// export const defineOutOfPageSlot = function (name, id, params = {}) {
//   if (window) {
//     const { googletag, lotaudsList, screen } = window
//     const { dfpTargetingParams } = params
//     if (screen.width < 768 && adDevice[id] === "d") { return; }
//     if (screen.width >= 768 && adDevice[id] === "m") { return; }

//     const render = () => {
//       googletag.defineOutOfPageSlot(`/${dfpConst.slot_id}/${dfpConst.prefix}_${name}`, id).addService(googletag.pubads())
//       googletag.pubads().setTargeting('lotauds', lotaudsList).setTargeting('section', dfpTargetingParams.section).setTargeting('pos', dfpTargetingParams.pos)
//       googletag.pubads().collapseEmptyDivs()
//       googletag.enableServices()
//       googletag.display(id)
//     }
//     googletag.cmd.push(function () {
//       try {
//         render();
//       } catch(e) {
//         removeSlot();
//         render();
//       }
//     })
//   }
// }