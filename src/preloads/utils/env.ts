import * as rendererProcess from "@/utils/rendererProcess";
import type * as ENV from "@/common/ENV";

const env: ENV.ContextBridge = rendererProcess.send.get("env");
export default env;
