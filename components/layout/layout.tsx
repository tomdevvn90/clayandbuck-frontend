import Meta from '../seo/meta'
import Header from './header'
import Footer from './footer'
import ScriptLoader from './script-loader'

export default function Layout({ headerMenu, footerMenu, children }) {
  return (
    <>
      <Meta />
      <ScriptLoader />
      <Header headerMenu={headerMenu} />
      <div className="page-content">
        {children}
      </div>
      <Footer footerMenu={footerMenu} />
    </>
  )
}
