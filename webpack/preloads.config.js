const fs = require("fs");
const path = require("path");
const env = require("./utils/env");

const isDev = process.env.IS_DEV;
const mode = isDev ? "development" : "production";
const stats = isDev ? "minimal" : "normal";

const entries = fs
  .readdirSync(path.resolve(env.__src, "./preloads"))
  .filter((filename) => filename.split(".").pop() === "ts")
  .map((filename) => path.resolve(env.__src, "./preloads", filename))
  .reduce((acc, cur) => {
    const key = path.basename(cur, ".ts");
    acc[key] = cur;
    return acc;
  }, {});

module.exports = {
  target: "electron-preload",
  entry: entries,
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
      "@": path.resolve(env.__src, "./preloads"),
    },
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(env.__root, "./dist/preloads"),
  },
};
