import Head from 'next/head'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import Container from '../components/container'
import Layout from '../components/layout/layout'
import { getPageData } from '../lib/graphql-api'

export default function Page( {pageData, preview} ) {

	const { headerMenu, footerMenu } = pageData
	const page = pageData?.pageBy ?? {}
	const { templateName } = page.template
	const pageClass = templateName.toLowerCase().replace(' ', '-')

	const router = useRouter()
	if (!router.isFallback && !page?.slug) {
		return <ErrorPage statusCode={404} />
	}
  
	return (
	  <Layout headerMenu={headerMenu} footerMenu={footerMenu} preview={preview}>
		<Head>
		  <title>{page.title}</title>
		  <meta name="description" content="Clay Travis and Buck Sexton tackle the biggest stories in news, politics and current events with intelligence and humor."></meta>
		</Head>
		<div className={`main-wrap page ${pageClass}`}>
		  <Container>
		  	<div dangerouslySetInnerHTML={{__html: page?.content ?? {} }} ></div>
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
	 const slug = params?.slug.join( '/' )
	 const pageData = await getPageData( slug );
	 return {
		props: {pageData, preview}
	 }
  }
  