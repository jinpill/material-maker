import { contextBridge } from "electron";
import * as rendererProcess from "@/utils/rendererProcess";
import type * as Win from "@/common/Win";

const listeners: Win.Listener = {
  "change-config": null,
};

const win: Win.ContextBridge = {
  getConfig: () => {
    return rendererProcess.send.get("window-config");
  },
  control: async (action) => {
    await rendererProcess.send.run("control-window", action);
  },
  addListener: (event, listener) => {
    listeners[event] = listener;
  },
  removeAllListeners: () => {
    for (const event in listeners) {
      listeners[event as keyof Win.Listener] = null;
    }
  },
};

const config: Win.Config = rendererProcess.send.get("window-config");
rendererProcess.on.set("window-config", (_, data: Win.Event.Set.Maximized) => {
  listeners["change-config"]?.({
    ...config,
    ...data,
  });
});

contextBridge.exposeInMainWorld("win", win);
