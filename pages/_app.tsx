import useSWR from "swr";
import dynamic from "next/dynamic";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { GlobalsContext } from "../contexts/GlobalsContext";
import { PodcastProps, WP_REST_API_URL, fetcher } from "../lib/constants";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "../styles/main.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { getCookie } from "cookies-next";

// import PodcastsPlayer from "../components/podcasts-player";
const PodcastsPlayer = dynamic(() => import("../components/podcasts-player"), {
  ssr: false,
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [podcasts, setPodcasts] = useState<PodcastProps[]>([]);
  const [curTrack, setCurTrack] = useState<number>(0);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data } = useSWR<PodcastProps[], Error>(`${WP_REST_API_URL}/v2/podcasts-player/`, fetcher);
  useEffect(() => {
    if (data) setPodcasts(data);
  }, [data]);

  useEffect(() => {
    const accessToken = getCookie("STYXKEY_ACCESS_TOKEN");
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <GlobalsContext.Provider
      value={{
        podcasts,
        setPodcasts,
        curTrack,
        setCurTrack,
        openLoginModal,
        setOpenLoginModal,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <main>
        <Component {...pageProps} />

        {podcasts.length > 0 && <PodcastsPlayer />}
      </main>
    </GlobalsContext.Provider>
  );
}
