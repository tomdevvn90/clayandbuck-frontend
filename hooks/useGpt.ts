import { useEffect, useState } from "react";
import { useScript } from "usehooks-ts";
import { SITE_URL } from "../lib/constants";

export default function useGpt(id: string) {
  const devSite = !SITE_URL.includes("clayandbuck.com");

  const status = useScript(
    "https://securepubads.g.doubleclick.net/tag/js/gpt.js"
  );
  const [intervalCount, setIntervalCount] = useState(0);

  const initAds = () => {
    let slot;

    const mapping = window.googletag
      .sizeMapping()
      .addSize(
        [700, 0],
        [
          [728, 90],
          [984, 27],
          [1280, 410],
        ]
      )
      .addSize(
        [0, 0],
        [
          [320, 50],
          [320, 27],
          [320, 100],
        ]
      )
      .build();

    window.googletag.cmd.push(function () {
      if (id == "div-gpt-ad-minibar") {
        if (devSite) {
          slot = window.googletag
            .defineSlot(
              "/6663/prnd/prn-clayandbuck",
              [
                [984, 27],
                [768, 27],
                [320, 27],
              ],
              id
            )
            .setTargeting("pos", ["minibar"])
            .setTargeting("prnpage", ["home"])
            .setTargeting("refresh", "true")
            .defineSizeMapping(mapping)
            .addService(window.googletag.pubads());
        } else {
          slot = window.googletag
            .defineSlot(
              "/6663/prnd/prn-clayandbuck",
              [
                [984, 27],
                [768, 27],
                [320, 27],
              ],
              id
            )
            .setTargeting("pos", ["minibar"])
            .setTargeting("prnpage", ["home"])
            .setTargeting("refresh", "true")
            .addService(window.googletag.pubads());
        }
      }

      if (id == "div-gpt-ad-carousel") {
        if (devSite) {
          slot = window.googletag
            .defineSlot(
              "/6663/prnd/prn-clayandbuck",
              [
                [1280, 410],
                [768, 200],
                [320, 100],
              ],
              id
            )
            .setTargeting("pos", ["carousel"])
            .setTargeting("prnpage", ["home"])
            .defineSizeMapping(mapping)
            .addService(window.googletag.pubads());
        } else {
          slot = window.googletag
            .defineSlot(
              "/6663/prnd/prn-clayandbuck",
              [
                [1280, 410],
                [768, 200],
                [320, 100],
              ],
              id
            )
            .setTargeting("pos", ["carousel"])
            .setTargeting("prnpage", ["home"])
            .addService(window.googletag.pubads());
        }
      }

      if (id == "div-gpt-ad-medrec_300x250_top") {
        slot = window.googletag
          .defineSlot("/6663/prnd/prn-clayandbuck", [[300, 250]], id)
          .setTargeting("pos", ["medrectop"])
          .setTargeting("prnpage", ["home"])
          .addService(window.googletag.pubads());
      }

      if (id == "div-gpt-ad-medrec_300x250_bottom") {
        slot = window.googletag
          .defineSlot("/6663/prnd/prn-clayandbuck", [[300, 250]], id)
          .setTargeting("pos", ["medrecbottom"])
          .setTargeting("prnpage", ["home"])
          .addService(window.googletag.pubads());
      }

      if (id == "div-gpt-ad-leaderboard_728x90_bottom") {
        if (devSite) {
          slot = window.googletag
            .defineSlot(
              "/6663/prnd/prn-clayandbuck",
              [
                [728, 90],
                [320, 50],
              ],
              id
            )
            .setTargeting("pos", ["leaderboardbottom"])
            .setTargeting("prnpage", ["home"])
            .defineSizeMapping(mapping)
            .addService(window.googletag.pubads());
        } else {
          slot = window.googletag
            .defineSlot(
              "/6663/prnd/prn-clayandbuck",
              [
                [728, 90],
                [320, 50],
              ],
              id
            )
            .setTargeting("pos", ["leaderboardbottom"])
            .setTargeting("prnpage", ["home"])
            .addService(window.googletag.pubads());
        }
      }

      if (id == "div-gpt-ad-pixel") {
        slot = window.googletag
          .defineSlot("/6663/prnd/prn-clayandbuck", [[1, 1]], id)
          .addService(window.googletag.pubads());
      }

      if (id == "div-gpt-ad-leaderboard_728x90_top") {
        if (devSite) {
          slot = window.googletag
            .defineSlot(
              "/6663/prnd/prn-clayandbuck",
              [
                [728, 90],
                [320, 50],
              ],
              id
            )
            .setTargeting("pos", ["leaderboardtop"])
            .setTargeting("prnpage", ["home"])
            .defineSizeMapping(mapping)
            .addService(window.googletag.pubads());
        }
      }

      window.googletag.pubads().enableSingleRequest();

      if (devSite) {
        window.googletag
          .pubads()
          .setTargeting("prngenre", ["conservative_talk"])
          .setTargeting("prntype", ["web"])
          .setTargeting("env", ["dev"]);
      } else {
        window.googletag
          .pubads()
          .setTargeting("prngenre", ["conservative_talk"])
          .setTargeting("prntype", ["web"]);
      }

      window.googletag.pubads().collapseEmptyDivs();
      window.googletag.enableServices();
      window.googletag.display(id);
    });

    return slot;
  };

  useEffect(() => {
    let slot;

    if (status === "ready") {
      if (!!window.googletag?.sizeMapping) {
        slot = initAds();
      } else {
        setTimeout(() => {
          setIntervalCount((p) => ++p);
        }, 100);
      }
    }

    return () => {
      if (!slot) return;

      window.googletag.cmd.push(function () {
        const destroyed = window.googletag.destroySlots([slot]);
        // console.log("🚀 ~ slot:", slot);
        // console.log("🚀 ~ destroyed:", id, destroyed);
      });
    };
  }, [id, status, intervalCount]);
}
