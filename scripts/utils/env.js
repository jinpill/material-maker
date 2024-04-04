const path = require("path");
const fs = require("fs");

const __root = path.resolve(__dirname, "../../");

const stage = (() => {
  const jsonPath = path.resolve(__root, "./package.json");
  const version = require(jsonPath).version;
  const postfix = version.split("-")[1] ?? "";

  if (postfix.includes("alpha")) return "alpha";
  if (postfix.includes("beta")) return "beta";
  return "stable";
})();

const config = (() => {
  const appConfigPath = path.resolve(__root, "./.app.config.json");
  const appConfig = JSON.parse(fs.readFileSync(appConfigPath, "utf8"));
  return appConfig;
})();

const env = {
  __root,
  stage,
  config,
};

module.exports = env;
