import { fraAuthorFields, fraHeaderFooter, fraPostFields } from "./graphql-fragements";

const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_API_URL;

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(GRAPHQL_API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getAllMenu() {
  const data = await fetchAPI(
    `query GetMenu {
      ${fraHeaderFooter}
    }`,
    {}
  );
  return data;
}

export async function getPageData(uri: string) {
  const data = await fetchAPI(
    `query PageData($uri: String) {
      ${fraHeaderFooter}
      pageBy(uri: $uri) {
        id
        title
        content
        slug
        uri
        featuredImage {
          node {
            sourceUrl
          }
        }
        seo {
          metaDesc
          fullHead
          title
        }
        seoTwitterThumb
        template {
          templateName
        }
        homeData
        recsData
      }
    }`,
    {
      variables: { uri },
    }
  );
  return data;
}
export async function getPreviewPost(id, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `query PreviewPost($id: ID!, $idType: PostIdType!) {
      ${fraHeaderFooter}
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  );
  return data.post;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(
    `{
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `
  );
  return data?.posts;
}

export async function getPostAndMorePosts(slug) {
  const data = await fetchAPI(
    `
    ${fraAuthorFields}
    ${fraPostFields}
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      ${fraHeaderFooter}
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        seo {
          metaDesc
          fullHead
          title
        }
        seoTwitterThumb
        featureImageUrl
        featureImageTab
        featuredVideosPost
        subscriberOnly
      }
      posts(first: 6, where: {orderby: {field: DATE, order: DESC}, categoryIn: ["4", "5"]}) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: slug,
        idType: "SLUG",
      },
    }
  );

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 5 posts, remove the last one
  if (data.posts.edges.length > 5) data.posts.edges.pop();

  return data;
}

export async function getCategoryBySlug(slug: string) {
  const data = await fetchAPI(
    `
    query CategoryBySlug($slug: ID!) {
      ${fraHeaderFooter}
      category(id: $slug, idType: SLUG) {
        databaseId
        description
        id
        name
        slug
        seo {
          fullHead
        }
        posts(
          first: 10, where: {orderby: {field: DATE, order: DESC}}
        ) {
          edges {
            node {
              featuredImage {
                node {
                  sourceUrl
                }
              }
              slug
              title
              postId
              excerpt
            }
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
        }
      }
    }
  `,
    {
      variables: {
        slug: slug,
      },
    }
  );

  return data;
}

export async function getPostsByCategoryId(categoryId: number, after: string) {
  const data = await fetchAPI(
    `
    query PostsByCategoryId($after: String = "", $categoryId: Int) {
      posts(
        first: 10,
        where: {categoryId: $categoryId, orderby: {field: DATE, order: DESC}},
        after: $after
      ) {
        edges {
          node {
            featuredImage {
              node {
                sourceUrl
              }
            }
            slug
            title
            postId
            excerpt
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `,
    {
      variables: {
        categoryId: categoryId,
        after: after,
      },
    }
  );

  return data;
}

export async function getAllPosts(uri: string) {
  const data = await fetchAPI(
    `
    query AllPosts($uri: String) {
      ${fraHeaderFooter}
      pageBy(uri: $uri) {
        id
        title
        content
        slug
        uri
        featuredImage {
          node {
            sourceUrl
          }
        }
        seo {
          metaDesc
          fullHead
          title
        }
        seoTwitterThumb
        template {
          templateName
        }
      }
      posts(
        first: 10
        where: {orderby: {field: DATE, order: DESC}}
      ) {
        edges {
          node {
            featuredImage {
              node {
                sourceUrl
              }
            }
            slug
            title
            postId
            excerpt
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `,
    {
      variables: { uri },
    }
  );

  return data;
}
export async function getAllPostsByPage(after: string) {
  const data = await fetchAPI(
    `
    query AllPostsByPage($after: String = "") {
      posts(
        first: 10,
        where: {orderby: {field: DATE, order: DESC}},
        after: $after
      ) {
        edges {
          node {
            featuredImage {
              node {
                sourceUrl
              }
            }
            slug
            title
            postId
            excerpt
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `,
    {
      variables: {
        after: after,
      },
    }
  );

  return data;
}

export async function getBookMovieBySlug(slug: string) {
  const data = await fetchAPI(
    `
    query BookmovieBySlug($id: ID!) {
      ${fraHeaderFooter}
      bookmovie(id: $id, idType: SLUG) {
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        date
        excerpt
        title
        slug
        seo {
          fullHead
        }
      }
    }
  `,
    {
      variables: {
        id: slug,
      },
    }
  );

  return data;
}

export async function getTranscriptBySlug(slug) {
  const data = await fetchAPI(
    `
    query TranscripttemplateBySlug($id: ID!) {
      ${fraHeaderFooter}
      transcripttemplate(id: $id, idType: SLUG) {
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        date
        excerpt
        title
        slug
        seo {
          fullHead
        }
      }
    }
  `,
    {
      variables: {
        id: slug,
      },
    }
  );

  return data;
}
