import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout/layout'
import { getAllMenu } from '../lib/graphql-api'
import AffiliatesMap from '../components/stations/AffiliatesMap'

export default function StationsPage( {allMenu} ) {
    const { headerMenu, footerMenu } = allMenu

    return (
        <Layout headerMenu={headerMenu} footerMenu={footerMenu} >
            <Head>
                <title>Where To Listen</title>
                <meta name="description" content="Clay Travis and Buck Sexton tackle the biggest stories in news, politics and current events with intelligence and humor."></meta>
            </Head>
            <div className="main-wrap page">
                <Container>
                    <div className="heading_ss">
                        <h1>Where To Listen</h1>
                        <ul className="breadcrumbs">
                            <li><a href="/">Home</a></li>
                            <li className="active">Stations</li>
                        </ul>
                    </div>
                    
                    <AffiliatesMap />
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