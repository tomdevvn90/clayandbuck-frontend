export const fraHeaderFooter = `headerMenu: menuItems(where: {location: HEADER_MENU_FOR_REACT}) {
    edges {
      node {
        id
        label
        path
        url
        order
        target
      }
    }
  }
  footerMenu: menuItems(where: {location: FOOTER_MENU_FOR_REACT}) {
    edges {
      node {
        id
        label
        path
        url
        order
        target
      }
    }
  }`

  export const fraAuthorFields = `fragment AuthorFields on User {
    name
    firstName
    lastName
    avatar {
      url
    }
  }`

  export const fraPostFields = `fragment PostFields on Post {
    title
    excerpt
    slug
    date
    featuredImage {
      node {
        sourceUrl
      }
    }
    author {
      node {
        ...AuthorFields
      }
    }
    categories {
      edges {
        node {
          name
        }
      }
    }
    tags {
      edges {
        node {
          name
        }
      }
    }
  }`