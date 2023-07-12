import styles from './Time.module.css'
import React from 'react'

const Time = (props) => {
  const timeArr: string[] = props.time.split('/')
  return (
      <div className={styles.time}>
        <span className={styles.cr_time}>{timeArr[0]}</span>
        <span className={styles.duration}>{timeArr[1]}</span>
      </div>
  )
}

export default Time
