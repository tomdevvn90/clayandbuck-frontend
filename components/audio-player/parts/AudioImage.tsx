import styles from "./AudioImage.module.css";
import React from "react";
import Image from "next/image";

const FeaturedImage = ({ imageUrl }) => {
  if (!imageUrl) return <></>;
  return <Image className={styles.audio_image} src={imageUrl} width={60} height={60} alt="" />;
};

export default FeaturedImage;
