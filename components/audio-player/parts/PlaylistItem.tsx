import AudioImage from "./AudioImage";
import styles from "./PlaylistItem.module.css";
import React from "react";
import Title from "./Title";
import StartDate from "./StartDate";
import Duration from "./Duration";

const PlaylistItem = (props) => {
  return (
    <div
      className={props.className == "active" ? styles.active : styles.track}
      data-key={props.data_key}
      audio-src={props.src}
      title={props.title}
      onClick={props.onClick}
    >
      <AudioImage imageUrl={props.imageUrl} />
      <div className={styles.title_date_time_wrapper}>
        <Title title={props.title} />
        <div className={styles.date_time}>
          <StartDate startDate={props.startDate} />
          <Duration duration={props.duration} />
        </div>
      </div>
    </div>
  );
};

export default PlaylistItem;
