import styles from './Volume.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp} from "@fortawesome/free-solid-svg-icons";

const Volume = (props) => {
  return (
    <div className={styles.wrapper}>
      <FontAwesomeIcon icon={faVolumeUp} style={{}} />
      <input
        type='range'
        min='1'
        max='100'
        defaultValue='80'
        className={styles.slider}
        id='myRange'
        onChange={props.onChange}
        style={{
          background: `linear-gradient(90deg, #b28e2a ${
            props.value * 100
          }%, #AAAFB3 ${props.value * 100}%)`
        }}
      />
    </div>
  )
}

export default Volume
