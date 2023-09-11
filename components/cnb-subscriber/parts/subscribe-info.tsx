import Image from "next/image";
import LogoImg from "../../../public/images/cb-vip-247.png";
import TwoManImg from "../../../public/images/two-man.png";

export default function SubscribeInfo({ gift }) {
  return (
    <div className="cb247-subscribe">
      {gift ? <h2>Give the gift of C&B VIP</h2> : <h2>Subscribe to C&B VIP</h2>}

      <Image src={LogoImg} className="cnb-logo" alt="Clay and Buck" width={110} height={110} />

      {gift ? (
        <p>
          Give the gift of C&B VIP - the only way to listen to the show live or on-demand on your computer or mobile
          device commercial-free.
        </p>
      ) : (
        <p>
          Sign up to become a C&B VIP subscriber and listen to the show live or on-demand on your computer or mobile
          device commercial-free.
        </p>
      )}

      <div className="benefits">
        <h3>C&B VIP Members Benefits:</h3>
        <ul>
          <li>Commercial-Free Audio Stream, Live or On-Demand</li>
          <li>Commercial-Free Podcasts</li>
          <li>Exclusive VIP Invitations to C&B Events</li>
          <li>Exclusive Clay & Buck VIP Videos</li>
          <li>Exclusive email access directly to Clay & Buck</li>
        </ul>
      </div>
      <div className="two-friend">
        <Image className="two-friend-img" width={487} height={383} src={TwoManImg} alt="Clay and Buck" />
      </div>
    </div>
  );
}
