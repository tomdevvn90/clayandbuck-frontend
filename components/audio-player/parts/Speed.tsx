import styles from "./Speed.module.css";
export default function Speed(props) {
  return (
    <select className={styles.speed} onChange={props.onChange} defaultValue="1">
      <option value="0.5">0.5x</option>
      <option value="0.75">0.75x</option>
      <option value="1">1x</option>
      <option value="1.25">1.25x</option>
      <option value="1.5">1.5x</option>
      <option value="1.75">1.75x</option>
      <option value="2">2x</option>
    </select>
  );
}
