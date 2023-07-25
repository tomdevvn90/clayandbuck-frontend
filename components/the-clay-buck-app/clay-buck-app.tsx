import Image from "next/image"
import MobileApp from '../../public/images/clay-buck-app-header.jpg'
import { ParseHtmlToReact } from "../../utils/parse-html-to-react"

export default function ClayAndBuckApp( {content} ) {
    return (
        <div>
            <section className="hero-ss">
                <Image src={MobileApp} width={1150} height={274} alt="Clay & Buck App" />
            </section>

            <section className="content-ss">
                <div className="text-center">
                    { ParseHtmlToReact( content ) }
                </div>
            </section>
        </div>
    )
}