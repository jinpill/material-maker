"use strict";

const env = require("../utils/env");
const packageJson = require("../utils/packageJson");
const alphaVariables = require("../utils/alphaVariables");

/**
 * @type {import('./BuildConfig').Processor}
 */
const preProcessor = () => {
  packageJson.update((json) => {
    if (env.stage !== "alpha") return json;
    json.name = `${json.name}-alpha`;
    return json;
  });
  alphaVariables.create();
};

module.exports = preProcessor;
