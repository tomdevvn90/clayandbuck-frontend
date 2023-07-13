import style from './Duration.module.css'

export default function Duration( props ) {
    let duration: string = "";
    const seconds: number = parseInt(props.duration);
    const secs: number = Math.round(seconds % 60);
    const hrs: number = Math.round(seconds / 60);
    const mins: number = Math.round(hrs % 60);
    const hours = Math.floor(hrs / 60);

    const minsStr: string = (mins < 10) ? `0${mins}` : mins.toString()
    const secsStr: string = (secs < 10) ? `0${secs}` : secs.toString()
    if ( hours > 0 ) duration = `${hours} : ${mins} : ${secs}`;
    else duration = `${minsStr} : ${secsStr}`;

    return (
            <p className={style.duration}>{duration}</p>
        )
}