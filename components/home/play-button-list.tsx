import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faMicrophone, faPlayCircle} from "@fortawesome/free-solid-svg-icons";

export default function PlayButtonList() {
    return (
        <div className="play_btn_list">
            <Link href="/listen-live">
                <FontAwesomeIcon icon={faPlay} style={{}} />
                <span>Listen Live</span>
            </Link>

            <Link href="/free-podcast">
                <FontAwesomeIcon icon={faMicrophone} style={{}} />
                <span>Podcasts</span>
            </Link>

            <Link href="/videos">
                <FontAwesomeIcon icon={faPlayCircle} style={{}} />
                <span>Audio / Video</span>
            </Link>
        </div>
    )
}