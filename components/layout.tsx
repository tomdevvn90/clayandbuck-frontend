// import Alert from './alert'
import Meta from './meta'
import { barlow } from '../pages/_app'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        {/* <Alert preview={preview} /> */}
        {children}
      </div>
    </>
  )
}
