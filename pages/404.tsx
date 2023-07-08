import Link from 'next/link'
import Layout from '../components/layout/layout'
import Head from 'next/head'
import Container from '../components/container'
import { GetStaticProps } from 'next'
import { getAllMenu } from '../lib/graphql-api'

export default function FourZeroFourPage( allMenu ) {
    return (
    <Layout preview={false} allMenu={allMenu}>
            <div className='main-wrap page-404'>
                <Container>
                    <h1>Sorry No result found</h1>
                    <Link href="/">Back to Home</Link>
                </Container>
            </div>
        </Layout>
      )
}

export const getStaticProps: GetStaticProps = async () => {
    const allMenu = await getAllMenu()
    return {
        props: allMenu,
        revalidate: 10
    }
}