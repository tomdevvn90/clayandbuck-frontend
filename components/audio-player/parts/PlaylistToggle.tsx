import styles from './PlaylistToggle.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListDots } from "@fortawesome/free-solid-svg-icons";

export default function PlaylistToggle( props ) {
    return (
        <div className={styles.playlist_toggle} onClick={props.onClick}>
            <FontAwesomeIcon icon={faListDots} style={{}} />
            <span>Playlist</span>
        </div>
    )
}