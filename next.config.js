const { withAxiom } = require('next-axiom');

module.exports = withAxiom(
  {
    setupFilesAfterEnv: ['./jest.setup.js'], // Add this line

    env: {
      serverURL: "http://103.136.36.27",
      port: "5555",
      NEXT_PUBLIC_ANALYTICS_WRITE_KEY: "p6FoooEYSlUjNAbGxlJA2SSrtJUM3ezM",
      RAZORPAY_API_KEY: "rzp_test_82GrH63KameXRd",
      RAZORPAY_API_SECRET: "whjPiJlK5pmvlg7a1tpqaUZV"
    },

    webpack: (config) => {
      config.resolve.fallback = { crypto: require.resolve("crypto-browserify") };
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
    browser: {
      "assert": false,
    },

    publicRuntimeConfig: '12.1.4',

    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://103.136.36.27:5555/:path*' // Proxy to Backend
        }
      ];
    },
    i18n: {
      locales: ['en', 'fr', 'ar'],
      defaultLocale: 'en',
    },

    future: {
      webpack5: true,
    },
    webpack: (config) => {
      config.resolve.fallback = { fs: false };
      return config;
    }
  }
);
