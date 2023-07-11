import styles from './AudioImage.module.css'
import React from 'react'

const Image = (props) => {
  return <img className={styles.audio_image} src={props.imageUrl} />
}

export default Image
