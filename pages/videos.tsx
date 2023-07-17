import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout/layout'
import CnbMedia from "../components/cnb-media";
import { getAllMenu } from '../lib/graphql-api'

export default function VideosPage( {allMenu} ) {
    const { headerMenu, footerMenu } = allMenu
    return (
        <Layout headerMenu={headerMenu} footerMenu={footerMenu} >
            <Head>
                <title>Videos</title>
                <meta name="description" content="Clay Travis and Buck Sexton tackle the biggest stories in news, politics and current events with intelligence and humor."></meta>
            </Head>
            <div className="main-wrap page">
                <Container>
                    <CnbMedia/>
                </Container>
            </div>
        </Layout>
    )
}

/** Server-side Rendering (SSR) */
export async function getServerSideProps() {
    const allMenu = await getAllMenu();
    return {
       props: {allMenu}
    }
 }