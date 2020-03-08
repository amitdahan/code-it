const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');

const withMonaco = (nextConfig = {}) =>
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

module.exports = withMonaco();
