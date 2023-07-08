import Meta from '../meta'
import Header from './header'
import Footer from './footer'

export default function Layout({ headerMenu, footerMenu, preview, children }) {
  return (
    <>
      <Meta />
      <Header headerMenu={headerMenu} />
      <div className="page-content">
        {children}
      </div>
      <Footer footerMenu={footerMenu} />
    </>
  )
}
