import styles from "./Speed.module.css";
export default function Speed(props) {
  return (
    <select className={styles.speed} onChange={props.onChange} defaultValue="1">
      <option value="0.5">0.5x</option>
      <option value="0.8">0.8x</option>
      <option value="1">1x</option>
      <option value="1.2">1.2x</option>
      <option value="1.5">1.5x</option>
      <option value="1.8">1.8x</option>
      <option value="2">2x</option>
    </select>
  );
}
