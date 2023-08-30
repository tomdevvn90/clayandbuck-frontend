import Link from "next/link";
import SocialChannels from "../../social-channels";

export default function NoticeAndSocials() {
  const pacificDatetimeStr = new Date().toLocaleString("en-US", { timeZone: "US/Pacific" });
  const pacificHour = new Date(pacificDatetimeStr).getHours();
  const showOnAirBtn = pacificHour >= 9 && pacificHour <= 11 ? true : false;

  return (
    <div className="notice-and-social">
      <div className="notice">
        <span>Listen Weekdays 12pm - 3pm EST</span>
        {showOnAirBtn && (
          <Link href="/videos/24-7-full-show-audio/" className="on-air-btn">
            On Air
          </Link>
        )}
      </div>
      <SocialChannels lessItems={true}></SocialChannels>
    </div>
  );
}
