import styles from "./Pause.module.css";
import React from "react";
import Image from "next/image";

const Pause = (props) => {
  return <Image className={styles.pause} src={props.src.src} onClick={props.onClick} width={32} height={32} alt="" />;
};

export default Pause;
