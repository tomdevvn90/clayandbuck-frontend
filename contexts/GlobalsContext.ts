import { Dispatch, SetStateAction, createContext } from "react";
import { PodcastProps } from "../lib/constants";

export const GlobalsContext = createContext<{
  podcasts: PodcastProps[];
  setPodcasts: Dispatch<SetStateAction<PodcastProps[]>>;
  curTrack: number;
  setCurTrack: Dispatch<SetStateAction<number>>;
  openLoginModal: boolean;
  setOpenLoginModal: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}>({
  podcasts: [],
  setPodcasts: () => {},
  curTrack: 0,
  setCurTrack: () => {},
  openLoginModal: false,
  setOpenLoginModal: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
