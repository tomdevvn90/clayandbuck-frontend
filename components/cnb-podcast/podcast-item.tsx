import { decodeLink } from "../../utils/global-functions";
import Image from "next/image";

export default function PodcastItem({ podItem, styles, ...rest }) {
  const pcImgUrl = !podItem.imageUrl.includes("http") ? `https:${podItem.imageUrl}` : podItem.imageUrl;
  return (
    <div className={styles.podcast_item} {...rest}>
      <div className={styles.song_info}>
        <div className={styles.top_row}>
          <Image src={pcImgUrl} width={60} height={60} alt="" />
          <div className={styles.title_box}>
            <h2>{podItem.title}</h2>
            <p className={styles.date_time}>{podItem.startDate}</p>
          </div>
        </div>

        <div className={styles.bot_row}>
          <p>{podItem.description}</p>
        </div>
      </div>

      <a href={decodeLink(podItem.mediaUrl)} target="_blank" className={styles.download_btn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 512 499.93"
        >
          <path
            fillRule="nonzero"
            d="M114.51 278.73c-4.37-4.2-4.55-11.2-.38-15.62a10.862 10.862 0 0 1 15.46-.39l115.34 111.34V11.07C244.93 4.95 249.88 0 256 0c6.11 0 11.06 4.95 11.06 11.07v362.42L378.1 262.85c4.3-4.27 11.23-4.21 15.46.13 4.23 4.35 4.17 11.35-.13 15.62L264.71 406.85a11.015 11.015 0 0 1-8.71 4.25c-3.45 0-6.52-1.57-8.56-4.04L114.51 278.73zm375.35 110.71c0-6.11 4.96-11.07 11.07-11.07S512 383.33 512 389.44v99.42c0 6.12-4.96 11.07-11.07 11.07H11.07C4.95 499.93 0 494.98 0 488.86v-99.42c0-6.11 4.95-11.07 11.07-11.07 6.11 0 11.07 4.96 11.07 11.07v88.36h467.72v-88.36z"
          ></path>
        </svg>
      </a>
    </div>
  );
}
