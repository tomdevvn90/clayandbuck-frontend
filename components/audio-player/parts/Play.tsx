import styles from "./Play.module.css";
import React from "react";
import Image from "next/image";

const Play = (props) => {
  return <Image className={styles.play} src={props.src.src} onClick={props.onClick} width={32} height={32} alt="" />;
};

export default Play;
