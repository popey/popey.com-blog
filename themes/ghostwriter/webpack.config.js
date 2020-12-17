const path = require('path');
const perfectionist = require('perfectionist');
const discardComments = require('postcss-discard-comments');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    site: path.join(__dirname, 'static', 'styles', 'site'),
    syntax: path.join(__dirname, 'static', 'styles', 'syntax'),
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.scss'],
  },
  output: {
    path: path.join(__dirname, 'static', 'dist'),
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: discardComments,
      canPrint: false
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: perfectionist,
      cssProcessorOptions: {
        format: 'compact'
      },
      canPrint: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      }
    ]
  }
};

