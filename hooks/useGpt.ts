import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';
import { SITE_URL } from '../lib/constants';

export function useGpt(id: string) {
  const isMounted = useIsMounted();

  const devSite = ! SITE_URL.includes( 'clayandbuck.com' )
  useEffect(() => {
    let slot
    if (isMounted()) {
      const { googletag } = window
      const mapping = googletag.sizeMapping()
            .addSize([700, 0], [[728, 90], [984, 27], [1280, 410]])
            .addSize([0, 0], [[320, 50], [320, 27], [320, 100]])
            .build();

      window.googletag.cmd.push(function () {

        if ( id == 'div-gpt-ad-minibar' ) {
            if ( devSite ) {
              slot = googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[984,27],[768,27],[320,27]], id)
                    .setTargeting('pos', ['minibar'])
                    .setTargeting('prnpage', ['home'])
                    .setTargeting('refresh', 'true')
                    .defineSizeMapping(mapping)
                    .addService(googletag.pubads());
            } else {
              slot = googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[984,27],[768,27],[320,27]], id)
                    .setTargeting('pos', ['minibar'])
                    .setTargeting('prnpage', ['home'])
                    .setTargeting('refresh', 'true')
                    .addService(googletag.pubads());
            }
        }

        if ( id == 'div-gpt-ad-carousel' ) {
            if ( devSite ) {
              slot = googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[1280,410],[768,200],[320,100]], id)
                    .setTargeting('pos', ['carousel'])
                    .setTargeting('prnpage', ['home'])
                    .defineSizeMapping(mapping)
                    .addService(googletag.pubads());
            } else {
              slot = googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[1280,410],[768,200],[320,100]], id)
                  .setTargeting('pos', ['carousel'])
                  .setTargeting('prnpage', ['home'])
                  .addService(googletag.pubads());
            }
        }

        if ( id == 'div-gpt-ad-medrec_300x250_top' ) {
          slot = googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[300,250]], id)
                .setTargeting('pos', ['medrectop'])
                .setTargeting('prnpage', ['home'])
                .addService(googletag.pubads());
        }

        if ( id == 'div-gpt-ad-medrec_300x250_bottom' ) {
          slot = googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[300,250]], id)
                .setTargeting('pos', ['medrecbottom'])
                .setTargeting('prnpage', ['home'])
                .addService(googletag.pubads());
        }

        if ( id == 'div-gpt-ad-leaderboard_728x90_bottom' ) {
            if ( devSite ) {
              slot = googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[728,90],[320,50]], id)
                    .setTargeting('pos', ['leaderboardbottom'])
                    .setTargeting('prnpage', ['home'])
                    .defineSizeMapping(mapping)
                    .addService(googletag.pubads());
            } else {
              slot = googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[728,90],[320,50]], id)
                    .setTargeting('pos', ['leaderboardbottom'])
                    .setTargeting('prnpage', ['home'])
                    .addService(googletag.pubads());
            }
        }

        if ( id == 'div-gpt-ad-pixel' ) {
          slot = googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[1,1]], id)
                .addService(googletag.pubads());
        }

        if ( id == 'div-gpt-ad-leaderboard_728x90_top' ) {
          slot = googletag.defineSlot('/6663/prnd/prn-clayandbuck', [[728,90],[320,50]], id)
                .setTargeting('pos', ['leaderboardtop'])
                .setTargeting('prnpage', ['home'])
                .defineSizeMapping(mapping)
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
      });
    }
    // console.log("🚀 ~ useEffect ~ slot:", slot)

    return () => {
      if (!slot) return

      const { googletag } = window
      googletag.cmd.push(function () {
        const destroyed = googletag.destroySlots([slot])
        //console.log("🚀 ~ slot:", slot)
        //console.log("🚀 ~ destroyed:", id, destroyed)
      })
    }
  }, [id]);
}
