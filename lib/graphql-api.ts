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

export async function getPageData(uri) {
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
