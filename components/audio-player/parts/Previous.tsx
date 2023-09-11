import styles from "./Previous.module.css";
import React from "react";
import Image from "next/image";

const Previous = (props) => {
  return (
    <Image className={styles.previous} src={props.src.src} onClick={props.onClick} width={24} height={24} alt="" />
  );
};

export default Previous;
