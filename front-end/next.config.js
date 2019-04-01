// next.config.js
const {parsed: localEnv} = require("dotenv").config();
const webpack = require("webpack");
const withCSS = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const withTypescript = require("@zeit/next-typescript");
const tsConfig = {};
const cssConfig = {};
const lessConfig = {};

// https://github.com/JerryCauser/next-compose
const compose = require("next-compose");

module.exports = compose([
  [withCSS, cssConfig],
  [withLess, lessConfig],
  [withTypescript, tsConfig],
  {
    webpack: config => {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
      return config;
    },
  },
]);
