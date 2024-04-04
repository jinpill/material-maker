const fs = require("fs");
const path = require("path");

const env = require("./env");
const jsonPath = path.resolve(env.__root, "./package.json");

const get = () => {
  const json = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  return json;
};

const update = (callback) => {
  const json = get();
  const nextJson = callback(json);
  if (typeof nextJson !== "object") return;

  const contents = JSON.stringify(nextJson, null, 2) + "\n";
  fs.writeFileSync(jsonPath, contents, "utf8");
};

module.exports = {
  get,
  update,
};
