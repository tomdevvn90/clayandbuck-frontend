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