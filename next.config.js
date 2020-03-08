const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');

module.exports = withFonts(
  withCSS({
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
