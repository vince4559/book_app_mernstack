/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    images: {
        domains: [ 'https://new-book-storez.onrender.com','localhost',]
      },
    images:{
      remotePatterns:[
        {
          protocol:'https',
          hostname:'new-book-storez.onrender.com',
          port:'',
          pathname:'/*'
        }
      ]
    }
}
module.exports = nextConfig
