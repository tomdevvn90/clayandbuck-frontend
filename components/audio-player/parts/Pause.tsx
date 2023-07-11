import styles from './Pause.module.css'
import React from 'react'

const Pause = (props) => {
  return (
    <img className={styles.pause} src={props.src.src} onClick={props.onClick} />
  )
}

export default Pause
