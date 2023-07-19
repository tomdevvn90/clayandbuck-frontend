import Image from "next/image"
import AppStoreLogo from "../../public/images/app-store-logo.png"
import { useState } from "react"

export default function DownloadApp() {
    let downloadLink = 'https://play.google.com/store/apps/details?id=com.premiereradio.branded.clayandbuck&pli=1'
    if ( typeof window !== 'undefined') {
      const isIosDevice = /iP(ad|od|hone)/i.test(window.navigator.userAgent)
      if ( isIosDevice ) downloadLink = 'https://apps.apple.com/in/app/clay-and-buck/id1634396102'
    }

    const [showDownloadApp, setShowDownloadApp] = useState(true)
    const toggleDownloadApp = () => {
        setShowDownloadApp(!showDownloadApp)
      }

    return showDownloadApp ?  (
            <div className="cnb-download-app-at-mobile">
                <div className="cnb-download-app-inner">
                    <span onClick={ toggleDownloadApp }>×</span>
                    <div className="left-col">
                        <Image src={AppStoreLogo} width={48} height={48} alt="app store logo" />
                        <div>
                            <h2>Clay and Buck</h2>
                            <p>For a better experience, <br/>download and use our app!</p>
                        </div>
                    </div>
                    <div className="right-col">
                        <a href={downloadLink}>
                            <h2>Download<br/>Now</h2>
                        </a>
                    </div>
                </div>
            </div>
        ) : null
}