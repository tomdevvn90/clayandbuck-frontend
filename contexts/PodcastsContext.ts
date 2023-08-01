import { Dispatch, SetStateAction, createContext } from "react";
import { PodcastProps } from "../lib/constants";

export const PodcastsContext = createContext<{
  podcasts: PodcastProps[];
  setPodcasts: Dispatch<SetStateAction<PodcastProps[]>>;
  curTrack: number;
  setCurTrack: Dispatch<SetStateAction<number>>;
}>({
  podcasts: [],
  setPodcasts: () => {},
  curTrack: 0,
  setCurTrack: () => {},
});
