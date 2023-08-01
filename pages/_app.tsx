import PodcastsPlayer from "../components/podcasts-player";
import useSWR from "swr";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { PodcastsContext } from "../contexts/PodcastsContext";
import { PodcastProps, WP_REST_API_URL, fetcher } from "../lib/constants";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "../styles/main.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [podcasts, setPodcasts] = useState<PodcastProps[]>([]);
  const [curTrack, setCurTrack] = useState<number>(0);

  const { data } = useSWR<PodcastProps[], Error>(
    `${WP_REST_API_URL}/v2/podcasts-player/`,
    fetcher
  );
  useEffect(() => {
    if (data) setPodcasts(data);
  }, [data]);

  return (
    <PodcastsContext.Provider
      value={{ podcasts, setPodcasts, curTrack, setCurTrack }}
    >
      <main>
        <Component {...pageProps} />

        {podcasts.length > 0 && <PodcastsPlayer />}
      </main>
    </PodcastsContext.Provider>
  );
}
