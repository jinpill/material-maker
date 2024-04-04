import type { CallbackMaps, CallbackType } from "./types";
import type * as Win from "@/common/Win";

const callbacks: CallbackMaps = {};

export default {
  run: (windowName: Win.Name, type: CallbackType) => {
    const callback = callbacks[windowName]?.[type];
    return callback ?? (() => {});
  },
};
