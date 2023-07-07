import Meta from '../meta'
import Header from './header'
import Footer from '../footer'

export default function Layout({ preview, allMenu, children }) {
  const { headerMenu, footerMenu } = allMenu
  return (
    <>
      <Meta />
      <Header headerMenu={headerMenu} />
      <div className="page-content">
        {children}
      </div>
      <Footer  />
    </>
  )
}
