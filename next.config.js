if (!process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables NEXT_PUBLIC_WORDPRESS_GRAPHQL_API_URL.
  `)
}

/** @type {import('next').NextConfig} */
const path = require('path')
module.exports = {
  images: {
    domains: [
      process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
      '0.gravatar.com',
      '1.gravatar.com',
      '2.gravatar.com',
      'secure.gravatar.com',
      'cnb-react.dev1.bwmmedia.com'
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
}
