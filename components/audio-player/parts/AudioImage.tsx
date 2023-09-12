import styles from "./AudioImage.module.css";
import React from "react";
import Image from "next/image";

const FeaturedImage = ({ imageUrl }) => {
  const pcImgUrl = !imageUrl.includes("http") ? `https:${imageUrl}` : imageUrl;
  if (!imageUrl) return <></>;
  return <Image className={styles.audio_image} src={pcImgUrl} width={60} height={60} alt="" />;
};

export default FeaturedImage;
