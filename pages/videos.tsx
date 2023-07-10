import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout/layout'
import { getAllMenu } from '../lib/graphql-api'
import CnbMedia from "../components/cnb-media";

export default function VideosPage( {allMenu, preview} ) {
    const { headerMenu, footerMenu } = allMenu
    return (
        <Layout headerMenu={headerMenu} footerMenu={footerMenu} preview={preview} >
            <Head>
                <title>Clay and Buck</title>
                <meta name="description" content="Clay Travis and Buck Sexton tackle the biggest stories in news, politics and current events with intelligence and humor."></meta>
            </Head>
            <div className={`main-wrap page`}>
                <Container>
                    <CnbMedia/>
                </Container>
            </div>
            
        </Layout>
    )
}

/** Server-side Rendering (SSR) */
export async function getServerSideProps({ preview = false }) {
    const allMenu = await getAllMenu();
    return {
       props: {allMenu, preview}
    }
 }