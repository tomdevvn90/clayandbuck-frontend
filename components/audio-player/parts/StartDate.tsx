import style from "./StartDate.module.css";

export default function StartDate(props) {
  const stDate = props.startDate;
  if (!stDate) return <></>;

  let stDateText = stDate;
  if (!isNaN(stDate) && !isNaN(parseFloat(stDate))) {
    const stDate: Date = new Date(parseInt(props.startDate));
    const day: string = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(stDate);
    const month: string = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(stDate);

    stDateText = `${day} - ${month} ${stDate.getDate()}, ${stDate.getFullYear()}`;
  }

  return <p className={style.start_date}>{stDateText}</p>;
}
