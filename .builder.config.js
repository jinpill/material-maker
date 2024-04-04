// ref: https://www.electron.build/configuration/configuration
module.exports = async (env) => {
  let appId = env.config.appId;
  let productName = env.config.productName;
  const compression = env.isStaging ? "store" : "maximum";

  if (env.stage === "alpha") {
    appId = appId.replace("App", "Alpha");
    productName += " alpha";
  } else if (env.stage === "beta") {
    appId = appId.replace("App", "Beta");
    productName += " beta";
  }

  /**
   * @type {import('electron-builder').Configuration)}
   */
  const config = {
    appId: appId,
    productName: productName,
    artifactName: "${name}-${version}-${arch}.${ext}",
    directories: {
      output: "build",
      buildResources: "buildSrc",
    },
    asar: true,
    compression: compression,
    files: [
      "dist/**/*",
      "src/renderer/build/**/*",
      "src/renderer/out/**/*",
      ".alpha-vars.json",
      ".app.config.json",
      "package.json",
    ],
    win: {
      target: "nsis",
    },
    nsis: {
      uninstallDisplayName: "${productName} ${version}",
    },
    mac: {
      target: "dmg",
    },
    dmg: {
      title: "${productName} ${version}",
    },
  };

  return config;
};
