const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("./package.json");

const isProd = process.env.NODE_ENV === "production";

const port = 8081;

module.exports = {
  mode: isProd ? "production" : "development",
  devServer: {
    port,
    historyApiFallback: true,
  },
  output: {
    filename: "[name].[contenthash].js",
    publicPath: isProd ? "/market/latest" : `http://localhost:${port}/`,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "market",
      filename: "remoteEntry.js",
      remotes: {
        p2p: "p2p@http://localhost:8082/remoteEntry.js",
      },
      exposes: {
        "./MarketApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};
