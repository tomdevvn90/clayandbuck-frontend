import Container from "../container";
import SocialChannels from "../social-channels";
import MenuItem from "../menu-item";
import dynamic from "next/dynamic";
// import LeaderBoardBottomAds from '../ads/leaderboard-bottom-ads'
const LeaderBoardBottomAds = dynamic(
  () => import("../ads/leaderboard-bottom-ads"),
  {
    ssr: false,
  }
);

export default function Footer({ footerMenu }) {
  const currentYear = new Date().getFullYear();

  const menuList = footerMenu?.edges;
  if (menuList) menuList.sort((a, b) => a.node.order - b.node.order);

  return (
    <>
      <LeaderBoardBottomAds />
      <footer className="site-footer">
        <Container>
          <section className="social-ss">
            <SocialChannels lessItems={false}></SocialChannels>
          </section>

          <section className="copy-right-ss">
            <p>
              The Clay Travis &amp; Buck Sexton Show - Copyright ©{" "}
              <span className="year_copyright">{currentYear}</span> -{" "}
              <a
                href="https://www.premierenetworks.com/"
                target="_blank"
                rel="noopener"
              >
                Premiere Networks, Inc
              </a>
            </p>
          </section>

          <section className="bottom-menu-ss">
            <ul className="menu">
              {menuList &&
                menuList.map(({ node }, index) => (
                  <MenuItem key={index} item={node}></MenuItem>
                ))}
            </ul>
          </section>
        </Container>
      </footer>
    </>
  );
}
