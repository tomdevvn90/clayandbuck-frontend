import styles from "./AudioImage.module.css";
import React from "react";
import Image from "next/image";

const FeaturedImage = (props) => {
  return <Image className={styles.audio_image} src={props.imageUrl} width={60} height={60} alt="" />;
};

export default FeaturedImage;
