import styles from './PlaylistTemplate.module.css'
import React from 'react'

const PlaylistTemplate = ({ playlistShowing, children }) => {
  return <div className={ !playlistShowing ? styles.wrapper : styles.wrapper_active }>{children}</div>
}

export default PlaylistTemplate
