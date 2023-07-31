import { Dispatch, SetStateAction, createContext } from "react";

export const PodcastContext = createContext<{
  podcasts: any[];
  setPodcasts: Dispatch<SetStateAction<any[]>>;
}>({
  podcasts: [],
  setPodcasts: () => {},
});

PodcastContext.displayName = "PodcastContext";
