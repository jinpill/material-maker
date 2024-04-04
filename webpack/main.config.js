const path = require("path");
const env = require("./utils/env");

const isDev = process.env.IS_DEV;
const mode = isDev ? "development" : "production";
const stats = isDev ? "minimal" : "normal";

module.exports = {
  target: "electron-main",
  entry: path.resolve(env.__src, "./main/index.ts"),
  mode: mode,
  stats: stats,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@/common": path.resolve(env.__src, "./renderer/common"),
      "@": path.resolve(env.__src, "./main"),
    },
  },
  output: {
    filename: "index.bundle.js",
    path: path.resolve(env.__root, "./dist/main"),
  },
  externals: {},
};
