import React from 'react'
import styles from './LoopCurrent.module.css'

const LoopCurrent = (props) => {
  return (
    <img
      className={styles.loop_current}
      src={props.src.src}
      onClick={props.onClick}
    />
  )
}

export default LoopCurrent
