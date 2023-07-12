import style from './Duration.module.css'

export default function Duration( props ) {
    let duration: string = "";
    const seconds: number = parseInt(props.duration);
    const secs: number = Math.round(seconds % 60);
    const hrs: number = Math.round(seconds / 60);
    const mins: number = Math.round(hrs % 60);
    const hours = Math.floor(hrs / 60);
    if ( hours > 0 ) duration = `${hours} : ${mins} : ${secs}`;
    else duration = `${mins} : ${secs}`;

    return (
            <p className={style.duration}>{duration}</p>
        )
}