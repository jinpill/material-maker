import * as rendererProcess from "@/utils/rendererProcess";
import type * as AppConfig from "@/common/AppConfig";

const appConfig: AppConfig.ContextBridge =
  rendererProcess.send.get("app-config");
export default appConfig;
