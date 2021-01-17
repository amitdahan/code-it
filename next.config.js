const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');

const withMonaco = (nextConfig) =>
  withFonts(
    withCSS({
      ...nextConfig,
      webpack(config) {
        config.plugins.push(
          new MonacoWebpackPlugin({
            filename: 'static/[name].worker.js'
          })
        );

        return config;
      }
    })
  );
module.exports = withMonaco({
  redirects() {
    return [
      {
        source: '/',
        destination: '/1337',
        permanent: true,
      }
    ]
  }
});
