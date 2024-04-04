import { app } from "electron";
import serve from "next-electron-server";
import path from "path";
import fs from "fs";

import * as project from "@/utils/project";
import type * as ENV from "@/common/ENV";

let initialized = false;
let scheme = "";
let port = 8888;

export const language: ENV.Language = (() => {
  const localeCountryCode = app.getLocaleCountryCode();
  if (localeCountryCode === "KR") return "ko";
  return "en";
})();

export const mode: ENV.Mode = (() => {
  if (!app.isPackaged) return "development";
  else return "packaged";
})();

export const version: ENV.Version = (() => {
  return {
    app: app.getVersion(),
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  };
})();

export const stage: ENV.Stage = (() => {
  const postfix = version.app.split("-")[1] ?? "";
  if (postfix.includes("alpha")) return "alpha";
  if (postfix.includes("beta")) return "beta";
  return "stable";
})();

export const isProduction = mode === "packaged" && stage !== "alpha";
export const isDevelopment = !isProduction;

export const alphaVars: ENV.AlphaVars | undefined = (() => {
  const jsonPath = path.resolve(project.__root, ".alpha-vars.json");
  const isExists = fs.existsSync(jsonPath);
  if (!isExists) return;

  const contents = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  return contents as ENV.AlphaVars;
})();

export const os: ENV.OS = (() => {
  if (process.platform === "darwin") return "mac";
  if (process.platform === "win32") return "windows";
  return "unknown";
})();

export const getScheme = () => scheme;
export const getPort = () => port;

export const initialize = () => {
  if (initialized) return;
  initialized = true;
  scheme = project.config.scheme;
  port = project.config.port;

  if (stage === "alpha") {
    // 실행 모드에 따라 userData 폴더의 경로를 변경하여 파일을 구분.
    const userDataPath = `${app.getPath("userData")} (${stage})`;
    app.setPath("userData", userDataPath);

    // 스키마 뒤에 실행 모드를 추가하여 요청 헤더의 오리진을 설정.
    scheme += `-${stage}`;
  }

  // 패키지 앱인 경우, 렌더러 프로세스 서버를 실행.
  if (mode === "packaged") {
    serve(`${scheme}://app`, {
      port: port,
      outputDir: "src/renderer/out",
      dev: false,
    });
  }

  // 메모리 할당량을 4GB로 설정.
  app.commandLine.appendSwitch("js-flags", "--max-old-space-size=4096");
};
