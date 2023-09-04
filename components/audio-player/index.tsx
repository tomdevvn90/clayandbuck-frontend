import styles from "./styles/Player.module.css";
import React, { useState, useEffect, useRef, useContext } from "react";

import PageTemplate from "./parts/PageTemplate";
import PlayerTemplate from "./parts/PlayerTemplate";
import Title from "./parts/Title";
import Time from "./parts/Time";
import Progress from "./parts/Progress";
import ButtonsBox from "./parts/ButtonsBox";
import Previous from "./parts/Previous";
import Play from "./parts/Play";
import Pause from "./parts/Pause";
import Next from "./parts/Next";
import Volume from "./parts/Volume";
import PlaylistTemplate from "./parts/PlaylistTemplate";
import PlaylistItem from "./parts/PlaylistItem";
import previousBtn from "./icons/previous.png";
import playBtn from "./icons/play.png";
import pauseBtn from "./icons/pause.png";
import nextBtn from "./icons/next.png";
import AudioImage from "./parts/AudioImage";
import StartDate from "./parts/StartDate";
import PlaylistToggle from "./parts/PlaylistToggle";
import Forward from "./parts/Forward";
import Backward from "./parts/Backward";
import { decodeLink } from "../../utils/global-functions";
import { GlobalsContext } from "../../contexts/GlobalsContext";
import Speed from "./parts/Speed";

// import LoopCurrent from "./parts/LoopCurrent";
// import loopCurrentBtn from "./icons/loop_current.png";
// import loopNoneBtn from "./icons/loop_none.png";

const Player = ({ trackList, showPlaylist = true, autoPlayNextTrack = true }) => {
  let playlist = [];
  const [query, updateQuery] = useState("");
  const [audio, setAudio] = useState(null);
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [length, setLength] = useState(0);
  const [time, setTime] = useState(0);
  const [playlistShowing, setPlaylistShowing] = useState(false);
  const [slider, setSlider] = useState(1);
  const [drag, setDrag] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [looped, setLooped] = useState(false);
  const [filter, setFilter] = useState([]);
  let [end, setEnd] = useState(0);
  // let [curTrack, setCurTrack] = useState(0);

  const GlobalsCtx = useContext(GlobalsContext);

  // const fmtMMSS = (s) => new Date(1000 * s).toISOString().substr(11, 8);
  const fmtMMSS = (s) => new Date(1000 * s).toISOString().substr(14, 5);

  useEffect(() => {
    const audio = new Audio(decodeLink(trackList[GlobalsCtx.curTrack].mediaUrl));

    const setAudioData = () => {
      setLength(audio.duration);
      setTime(audio.currentTime);
    };

    const setAudioTime = () => {
      const curTime = audio.currentTime;
      setTime(curTime);
      setSlider(curTime ? parseFloat(((curTime * 100) / audio.duration).toFixed(1)) : 0);
    };

    const setAudioVolume = () => setVolume(audio.volume);
    const setAudioEnd = () => setEnd((end += 1));

    // events on audio object
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("volumechange", setAudioVolume);
    audio.addEventListener("ended", setAudioEnd);

    setAudio(audio);
    setTitle(trackList[GlobalsCtx.curTrack].title);
    setImageUrl(trackList[GlobalsCtx.curTrack].imageUrl);
    setStartDate(trackList[GlobalsCtx.curTrack].startDate);

    return () => {
      audio.pause();
    };
  }, []);

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      !looped && autoPlayNextTrack ? next() : play();
    }
  }, [end]);

  useEffect(() => {
    if (audio != null) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audio != null) {
      pause();
      const val = Math.round((drag * audio.duration) / 100);
      audio.currentTime = val;
    }
  }, [drag]);

  const play = () => {
    setActive(true);
    audio.play();
  };

  const pause = () => {
    setActive(false);
    audio.pause();
  };

  const loop = () => {
    setLooped(!looped);
  };

  useEffect(() => {
    if (audio != null) {
      audio.src = decodeLink(trackList[GlobalsCtx.curTrack].mediaUrl);
      setTitle(trackList[GlobalsCtx.curTrack].title);
      setImageUrl(trackList[GlobalsCtx.curTrack].imageUrl);
      setStartDate(trackList[GlobalsCtx.curTrack].startDate);
      play();
    }
  }, [GlobalsCtx.curTrack]);

  const previous = () => {
    const index = playlist.indexOf(GlobalsCtx.curTrack);
    index !== 0
      ? GlobalsCtx.setCurTrack((GlobalsCtx.curTrack = playlist[index - 1]))
      : GlobalsCtx.setCurTrack((GlobalsCtx.curTrack = playlist[playlist.length - 1]));
  };

  const next = () => {
    const index = playlist.indexOf(GlobalsCtx.curTrack);
    index !== playlist.length - 1
      ? GlobalsCtx.setCurTrack((GlobalsCtx.curTrack = playlist[index + 1]))
      : GlobalsCtx.setCurTrack((GlobalsCtx.curTrack = playlist[0]));
  };

  const speed = (playbackRate) => {
    audio.playbackRate = playbackRate;
  };

  const backward = () => {
    const currentTime = audio.currentTime;
    audio.currentTime = currentTime - 15;
  };

  const forward = () => {
    const currentTime = audio.currentTime;
    audio.currentTime = currentTime + 30;
  };

  const togglePlaylist = () => {
    setPlaylistShowing(!playlistShowing);
  };

  const playlistItemClickHandler = (e) => {
    const num = Number(e.currentTarget.getAttribute("data-key"));
    const index = playlist.indexOf(num);
    GlobalsCtx.setCurTrack((GlobalsCtx.curTrack = playlist[index]));
    play();
  };

  return (
    <PageTemplate>
      <PlayerTemplate>
        <div className={styles.image_title_time_wrapper}>
          <AudioImage imageUrl={imageUrl} />

          <div className={styles.title_time}>
            <Title title={title} />
            <StartDate startDate={startDate} />
          </div>
        </div>

        <div className={styles.buttons_progress_wrapper}>
          <div className={styles.buttons_wrapper}>
            <ButtonsBox>
              <Speed onChange={(e) => speed(e.target.value)} />
              <Previous src={previousBtn} onClick={previous} />
              <Backward onClick={backward} />
              {active ? <Pause src={pauseBtn} onClick={pause} /> : <Play src={playBtn} onClick={play} />}
              <Forward onClick={forward} />
              <Next src={nextBtn} onClick={next} />
              <div></div>
              {/* <LoopCurrent src={looped ? loopCurrentBtn : loopNoneBtn} onClick={loop} /> */}
            </ButtonsBox>
          </div>

          <div className={styles.progress_wrapper}>
            <Time time={`${!time ? "00:00" : fmtMMSS(time)}/${!length ? "00:00" : fmtMMSS(length)}`} />
            <Progress
              value={slider}
              onChange={(e) => {
                setSlider(e.target.value);
                setDrag(e.target.value);
              }}
              onMouseUp={play}
              onTouchEnd={play}
            />
          </div>
        </div>

        <div className={styles.playlist_wrapper}>
          <Volume
            value={volume}
            onChange={(e) => {
              setVolume(e.target.value / 100);
            }}
          />
          <PlaylistToggle onClick={togglePlaylist} />
        </div>
      </PlayerTemplate>

      {showPlaylist && (
        <PlaylistTemplate playlistShowing={playlistShowing}>
          {trackList.map((el, index) => {
            playlist.push(index);
            return (
              <PlaylistItem
                className={GlobalsCtx.curTrack === index ? "active" : ""}
                key={index}
                data_key={index}
                title={el.title}
                imageUrl={el.imageUrl}
                src={decodeLink(el.mediaUrl)}
                startDate={el.startDate}
                duration={el.duration}
                onClick={playlistItemClickHandler}
              />
            );
          })}
        </PlaylistTemplate>
      )}
    </PageTemplate>
  );
};

export default Player;
