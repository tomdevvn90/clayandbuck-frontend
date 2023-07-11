import AudioImage from './AudioImage'
import styles from './PlaylistItem.module.css'
import React from 'react'
import Title from './Title'

const PlaylistItem = (props) => {
  return (
    <div
      className={props.className == 'active' ? styles.active : styles.track}
      data-key={props.data_key}
      audio-src={props.src}
      title={props.title}
      onClick={props.onClick}
    >
      <AudioImage imageUrl={props.imageUrl} />
      <Title title={props.title} />
    </div>
  )
}

export default PlaylistItem
