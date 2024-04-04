import * as mainProcess from "@/events/utils/mainProcess";
import * as project from "@/utils/project";
import * as env from "@/utils/env";
import type * as ENV from "@/common/ENV";

export const register = () => {
  mainProcess.on.get("app-config", () => {
    return project.config;
  });

  mainProcess.on.get("env", () => {
    const environments: ENV.ContextBridge = {
      language: env.language,
      mode: env.mode,
      stage: env.stage,
      isProduction: env.isProduction,
      isDevelopment: env.isDevelopment,
      alphaVars: env.alphaVars,
      os: env.os,
      version: env.version,
    };

    return environments;
  });
};
