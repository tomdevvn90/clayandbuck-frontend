import Head from 'next/head'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import Container from '../components/container'
import Layout from '../components/layout/layout'
import { getPageData } from '../lib/graphql-api'

export default function Page( {pageData, preview} ) {

	console.log(pageData)

	const router = useRouter()

	// if (!router.isFallback && !pageData?.slug) {
	// 	return <ErrorPage statusCode={404} />
	// }
  
	return (
	  <Layout preview={preview} allMenu={{}}>
		<Head>
		  <title>The Clay Travis  & Buck Sexton Show</title>
		  <meta name="description" content="Clay Travis and Buck Sexton tackle the biggest stories in news, politics and current events with intelligence and humor."></meta>
		</Head>
		<div className='main-wrap index-page'>
		  <Container>
			 <div>Here is content</div>
		  </Container>
		</div>
		
	  </Layout>
	)
  }
  
  /** Server-side Rendering (SSR) */
  export async function getServerSideProps( {
	params,
	preview = false,
	previewData,
  } ) {
	 console.log(params.slug[0])
	 const pageData = {}//await getPageData(params.slug);
	 return {
		props: {pageData, preview}
	 }
  }
  