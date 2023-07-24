import Image from "next/image"
import NewsLetterHeaderImg from '../../public/images/newsletter-header.jpg'
import Container from "../container"

export default function Newsletter() {
    return (
        <div>
            <section className="rushinhurry">
                <Container>
                    <Image src={NewsLetterHeaderImg} width={1200} height={314} alt="Clay & Buck In A Hurry" />
                </Container>
            </section>

            <section className="rush_show">
                <Container>
                    <h3>Did you miss any of Clay &amp; Buck this week?</h3>
                    <p>Sign up below for Clay & Buck in a Hurry. It's FREE, informative, and fun. Each Friday's email reviews top stories, must-see videos and special features. </p>

                    <iframe loading="lazy" src="https://www.e.iheart.com/rushreg/signup-page.html" width="100%" height="550px" frameBorder="0" scrolling="no" allowFullScreen={true}></iframe>
                </Container>
            </section>
        </div>
    )
}