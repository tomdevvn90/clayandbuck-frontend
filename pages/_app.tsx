import { AppProps } from "next/app";
import PodcastsPlayer from "../components/podcasts-player";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "../styles/main.scss";
import { useEffect, useState } from "react";
import { PodcastContext } from "../contexts/Podcast";

import { WP_REST_API_URL, fetcher } from "../lib/constants";
import useSWR from "swr";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [podcasts, setPodcasts] = useState<any[]>([]);

  const { data } = useSWR<any[], Error>(
    `${WP_REST_API_URL}/v2/podcasts-player/`,
    fetcher
  );

  useEffect(() => {
    if (data) setPodcasts(data);
  }, [data]);

  return (
    <PodcastContext.Provider value={{ podcasts, setPodcasts }}>
      <main>
        <Component {...pageProps} />

        {/* <pre>{JSON.stringify(podcasts, null, 4)}</pre> */}

        {podcasts.length > 0 && <PodcastsPlayer />}
      </main>
    </PodcastContext.Provider>
  );
}
