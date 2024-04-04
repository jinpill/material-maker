"use strict";

const env = require("../utils/env");
const packageJson = require("../utils/packageJson");
const alphaVariables = require("../utils/alphaVariables");

/**
 * @type {import('./BuildConfig').Processor}
 */
const postProcessor = () => {
  packageJson.update((json) => {
    if (env.stage !== "alpha") return json;
    json.name = json.name.replace("-alpha", "");
    return json;
  });
  alphaVariables.remove();
};

module.exports = postProcessor;
