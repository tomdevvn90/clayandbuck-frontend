import styles from "./styles/Player.module.css";
import React, { useState, useEffect, useRef } from "react";

import PageTemplate from "./parts/PageTemplate";
import PlayerTemplate from "./parts/PlayerTemplate";
import Title from "./parts/Title";
import Time from "./parts/Time";
import Progress from "./parts/Progress";
import ButtonsBox from "./parts/ButtonsBox";
import LoopCurrent from "./parts/LoopCurrent";
import Previous from "./parts/Previous";
import Play from "./parts/Play";
import Pause from "./parts/Pause";
import Next from "./parts/Next";
import Shuffle from "./parts/Shuffle";
import Volume from "./parts/Volume";
import PlaylistTemplate from "./parts/PlaylistTemplate";
import PlaylistItem from "./parts/PlaylistItem";
import TagsTemplate from "./parts/TagsTemplate";
import TagItem from "./parts/TagItem";
import Search from "./parts/Search";

import loopCurrentBtn from "./icons/loop_current.png";
import loopNoneBtn from "./icons/loop_none.png";
import previousBtn from "./icons/previous.png";
import playBtn from "./icons/play.png";
import pauseBtn from "./icons/pause.png";
import nextBtn from "./icons/next.png";
import shuffleAllBtn from "./icons/shuffle_all.png";
import shuffleNoneBtn from "./icons/shuffle_none.png";
import AudioImage from "./parts/AudioImage";
import StartDate from "./parts/StartDate";
import PlaylistToggle from "./parts/PlaylistToggle";

const Player = ({
    trackList,
    includeTags = true,
    includeSearch = true,
    showPlaylist = true,
    autoPlayNextTrack = true,
}) => {
    let playlist = [];
    const [query, updateQuery] = useState("");
    const [audio, setAudio] = useState(null);
    const [active, setActive] = useState(false);
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [startDate, setStartDate] = useState("");
    const [length, setLength] = useState(0);
    const [time, setTime] = useState(0);
    const [playlistShowing, setPlaylistShowing] = useState(false)
    const [slider, setSlider] = useState(1);
    const [drag, setDrag] = useState(0);
    const [volume, setVolume] = useState(0.8);
    let [end, setEnd] = useState(0);
    const [shuffled, setShuffled] = useState(false);
    const [looped, setLooped] = useState(false);
    const [filter, setFilter] = useState([]);
    let [curTrack, setCurTrack] = useState(0);

    // const fmtMMSS = (s) => new Date(1000 * s).toISOString().substr(11, 8);
    const fmtMMSS = (s) => new Date(1000 * s).toISOString().substr(14, 5);

  useEffect(() => {
    const audio = new Audio(trackList[curTrack].mediaUrl);

    const setAudioData = () => {
      setLength(audio.duration);
      setTime(audio.currentTime);
    };

    const setAudioTime = () => {
      const curTime = audio.currentTime;
      setTime(curTime);
      setSlider(curTime ? parseFloat( ( (curTime * 100) / audio.duration).toFixed(1) ) : 0);
    };

    const setAudioVolume = () => setVolume(audio.volume);
    const setAudioEnd = () => setEnd((end += 1));

    // events on audio object
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("volumechange", setAudioVolume);
    audio.addEventListener("ended", setAudioEnd);

    setAudio(audio);
    setTitle(trackList[curTrack].title);
    setImageUrl(trackList[curTrack].imageUrl);
    setStartDate(trackList[curTrack].startDate);

    return () => {
      audio.pause();
    };
  }, []);

  const tags = [];
  if ( includeTags ) {
    trackList.forEach((track) => {
      track.tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });
  }
  
  const shufflePlaylist = (arr) => {
    if (arr.length === 1) return arr;
    const rand = Math.floor(Math.random() * arr.length);
    return [arr[rand], ...shufflePlaylist(arr.filter((_, i) => i != rand))];
  };

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (shuffled) {
        playlist = shufflePlaylist(playlist);
      }
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
      audio.src = trackList[curTrack].mediaUrl;
      setTitle(trackList[curTrack].title);
      setImageUrl(trackList[curTrack].imageUrl);
      setStartDate(trackList[curTrack].startDate);
      play();
    }
  }, [curTrack]);

  const previous = () => {
    const index = playlist.indexOf(curTrack);
    index !== 0
      ? setCurTrack((curTrack = playlist[index - 1]))
      : setCurTrack((curTrack = playlist[playlist.length - 1]));
  };

  const next = () => {
    const index = playlist.indexOf(curTrack);
    index !== playlist.length - 1
      ? setCurTrack((curTrack = playlist[index + 1]))
      : setCurTrack((curTrack = playlist[0]));
  };

  const shuffle = () => {
    setShuffled(!shuffled);
  };

  const togglePlaylist = () => {
    setPlaylistShowing( !playlistShowing )
  }

  const playlistItemClickHandler = (e) => {
    const num = Number(e.currentTarget.getAttribute("data-key"));
    const index = playlist.indexOf(num);
    setCurTrack((curTrack = playlist[index]));
    play();
  };

  const isInitialFilter = useRef(true);
  useEffect(() => {
    if (isInitialFilter.current) {
      isInitialFilter.current = false;
    } else {
      if (!playlist.includes(curTrack)) {
        setCurTrack((curTrack = playlist[0]));
      }
    }
  }, [filter]);

  const tagClickHandler = (e) => {
    const tag = e.currentTarget.innerHTML;
    if (!filter.includes(tag)) {
      setFilter([...filter, tag]);
    } else {
      const filteredArray = filter.filter((item) => item !== tag);
      setFilter([...filteredArray]);
    }
  };

  return (
    <PageTemplate>

      {includeTags && (
        <TagsTemplate>
          {tags.map((tag, index) => {
            return (
              <TagItem
                key={index}
                className={ filter.length !== 0 && filter.includes(tag) ? "active" : "" }
                tag={tag}
                onClick={tagClickHandler}
              />
            );
          })}
        </TagsTemplate>
      )}

      {includeSearch && (
        <Search
          value={query}
          onChange={(e) => updateQuery(e.target.value.toLowerCase())}
          placeholder={`Search ${trackList.length} tracks...`}
        />
      )}

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
              <LoopCurrent
                src={looped ? loopCurrentBtn : loopNoneBtn}
                onClick={loop}
              />
              <Previous src={previousBtn} onClick={previous} />
              {active ? (
                <Pause src={pauseBtn} onClick={pause} />
              ) : (
                <Play src={playBtn} onClick={play} />
              )}
              <Next src={nextBtn} onClick={next} />
              <Shuffle
                src={shuffled ? shuffleAllBtn : shuffleNoneBtn}
                onClick={shuffle}
              />
            </ButtonsBox>
          </div>

          <div className={styles.progress_wrapper}>
            <Time
              time={`${!time ? "00:00" : fmtMMSS(time)}/${
                !length ? "00:00" : fmtMMSS(length)
              }`}
            />
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
          {trackList
            // .sort((a, b) => (a.title > b.title ? 1 : -1))
            .map((el, index) => {
              if (
                filter.length === 0 ||
                filter.some((filter) => el.tags.includes(filter))
              ) {
                if (el.title.toLowerCase().includes(query.toLowerCase())) {
                  playlist.push(index);
                  return (
                    <PlaylistItem
                      className={curTrack === index ? "active" : ""}
                      key={index}
                      data_key={index}
                      title={el.title}
                      imageUrl={el.imageUrl}
                      src={el.mediaUrl}
                      startDate={el.startDate}
                      duration={el.duration}
                      onClick={playlistItemClickHandler}
                    />
                  );
                }
              }
            })}
        </PlaylistTemplate>
      )}
    </PageTemplate>
  );
};

export default Player;
