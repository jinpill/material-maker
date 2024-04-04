import clc from "cli-color";

type Color =
  | "white"
  | "green"
  | "yellow"
  | "red"
  | "black"
  | "blue"
  | "cyan"
  | "magenta";

type Logger = "log" | "warn" | "error";

const getLogger = (symbol: string, color: Color, logger: Logger) => {
  return (message: any, details?: any) => {
    let text = clc[color](`${symbol} ${message}`);
    if (typeof details !== "undefined") text += clc.black(`: ${details}`);
    console[logger](text);
  };
};

export const log = getLogger("📋", "white", "log");
export const info = getLogger("💡", "blue", "log");
export const success = getLogger("✅", "green", "log");
export const warn = getLogger("🚸", "yellow", "warn");
export const error = getLogger("🚨", "red", "error");
