
/** @type {import('next').NextConfig} */
const { withAxiom } = require('next-axiom');

const nextConfig = {
  reactStrictMode: true,
}


module.exports = withAxiom(
 
  // jest.config.js

 { setupFilesAfterEnv: ['./jest.setup.js'],

 env:{
      serverURL:"http://103.136.36.27",
      port:"5555"
    }
  , 

 
  webpack: (config) => {
    config.resolve.fallback = { crypto: 
    require.resolve("crypto-browserify")}; 
    return config;
  },

 resolve: {
    fallback: {
     "os": require.resolve("os-browserify/browser"),
      "assert": require.resolve("assert"),
      "stream": require.resolve("stream"),
      "zlib": require.resolve("browserify-zlib")
    }
  },
  "browser": {
    // "zlib":false,
    "assert": false,
  },
 
   // Will be available on both server and client
  publicRuntimeConfig:'12.1.4',
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://103.136.36.27:5555/:path*' // Proxy to Backend
      },
      {
        source: '/api2/:path*',
        destination: 'https://places.hasura.app/api/rest/:path*' // Proxy to Backend
      }
    ]
  },
  i18n:{
    locales:['en', 'fr', 'ar'],
    defaultLocale:'en',
   
  },

 
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  }
}
)

