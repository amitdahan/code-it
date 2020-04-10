const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');

const withMonaco = () =>
  withFonts(
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
module.exports = withMonaco();
