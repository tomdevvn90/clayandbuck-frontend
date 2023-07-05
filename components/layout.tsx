// import Alert from './alert'
import Meta from './meta'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="page-content">
        {/* <Alert preview={preview} /> */}
        {children}
      </div>
    </>
  )
}
