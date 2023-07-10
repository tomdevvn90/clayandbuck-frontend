import Meta from '../meta'
import Header from './header'
import Footer from './footer'
import Player from '../audio-player';

export default function Layout({ headerMenu, footerMenu, preview, children }) {
  const tracks = [
    {
      url: "https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3",
      title: "Madza - Chords of Life",
      tags: ["house"],
    },
    {
      url: "https://audioplayer.madza.dev/Madza-Late_Night_Drive.mp3",
      title: "Madza - Late Night Drive",
      tags: ["dnb"],
    },
    {
      url: "https://audioplayer.madza.dev/Madza-Persistence.mp3",
      title: "Madza - Persistence",
      tags: ["dubstep"],
    },
  ];

  return (
    <>
      <Meta />
      <Header headerMenu={headerMenu} />
      <div className="page-content">
        {children}
      </div>
      <Footer footerMenu={footerMenu} />
      <Player trackList={tracks} />
    </>
  )
}
