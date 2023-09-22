import Layout from "../components/layout/layout";
import Container from "../components/container";
import Head from "next/head";
import { GetStaticProps } from "next";
import { getAllMenu } from "../lib/graphql-api";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function FourZeroFourPage(allMenu) {
  const [isLoading, setIsLoading] = useState(false);

  const { headerMenu, footerMenu } = allMenu;

  const router = useRouter();
  const handleSearchOther = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const keyword = event.target.s.value;
    router.push(`/search?s=${keyword}`, null, { shallow: true });
  };
  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Head>
        <title>Page not found - The Clay Travis &amp; Buck Sexton Show</title>
        <meta
          name="description"
          content="Clay Travis and Buck Sexton tackle the biggest stories in news, politics and current events with intelligence and humor."
        />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="The Clay Travis & Buck Sexton Show" />
      </Head>
      <div className="main-wrap page-404 white-background">
        <Container>
          <div className="page-content">
            <h1>Not Found</h1>
            <h2>This is somewhat embarrassing, isn’t it?</h2>
            <p>It looks like nothing was found at this location. Maybe try a search?</p>

            <form className="search-form" role="search" onSubmit={handleSearchOther}>
              <input type="text" placeholder="Search..." name="s" />
              {isLoading ? (
                <button type="submit" className="btn-submit loading">
                  <span className="cnb-spinner-loading"></span>
                </button>
              ) : (
                <button type="submit" className="btn-submit">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              )}
            </form>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

/** Static Site Generation (SSG) */
export const getStaticProps: GetStaticProps = async () => {
  const allMenu = await getAllMenu();
  return {
    props: allMenu,
    revalidate: 30,
  };
};
