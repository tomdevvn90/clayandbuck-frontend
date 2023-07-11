import styles from './Time.module.css'
import React from 'react'

const Time = (props) => {
  return <h4 className={styles.time}>{props.time}</h4>
}

export default Time
