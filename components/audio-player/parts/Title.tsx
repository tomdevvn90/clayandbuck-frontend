import styles from './Title.module.css'
import React from 'react'

const Title = (props) => {
  return <h3 className={styles.title}>{props.title}</h3>
}

export default Title
