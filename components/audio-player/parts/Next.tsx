import React from "react";
import styles from "./Next.module.css";
import Image from "next/image";

const Next = (props) => {
  return <Image className={styles.next} src={props.src.src} onClick={props.onClick} width={24} height={24} alt="" />;
};

export default Next;
