import style from './StartDate.module.css'

export default function StartDate( props ) {
    if ( ! props.startDate ) return <></>

    const stDateTS: number = parseInt(props.startDate)
    const stDate: Date = new Date(stDateTS)
    const day: string = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(stDate)
    const month: string = new Intl.DateTimeFormat("en-US", { month: "long" }).format(stDate)
    return (
        <p className={style.start_date}>{day} - {month} {stDate.getDate()}, {stDate.getFullYear()}</p>
    )
}