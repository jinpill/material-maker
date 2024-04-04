"use strict";

const clc = require("cli-color");
const env = require("../utils/env");
const packageJson = require("../utils/packageJson");

packageJson.update((json) => {
  json.name = env.config.project;
  json.scripts["dev:render"] = `next dev src/renderer -p ${env.config.port}`;
  json.version = "1.0.0";
  return json;
});
console.log(clc.green("✅ Setup Success!"));
