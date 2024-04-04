import type { BrowserWindowConstructorOptions } from "electron";
import type { WindowOptions } from "./types";
import type * as Win from "@/common/Win";

export const commonConfig: BrowserWindowConstructorOptions = {
  width: 1100,
  height: 800,
};

const config: Record<Win.Name, WindowOptions> = {
  main: {},
};

export default config;
