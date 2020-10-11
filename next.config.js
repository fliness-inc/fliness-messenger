const withSass = require('@zeit/next-sass')

module.exports = withSass({
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
            test: /\.(js|ts)x?$/,
        },
        use: ['@svgr/webpack'],
      });
  
      return config;
    }
});