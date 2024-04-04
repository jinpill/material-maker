import fs from "fs";
import path from "path";
import type * as AppConfig from "@/common/appConfig";

/** 일렉트론 앱 프로젝트의 루트 경로 */
export const __root = path.resolve(__dirname, "../../");

/** 일렉트론 앱 프로젝트의 설정 */
export const config: AppConfig.ContextBridge = JSON.parse(
  fs.readFileSync(path.resolve(__root, "./.app.config.json"), "utf-8"),
);
