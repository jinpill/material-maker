import { app } from "electron";
import * as mainProcess from "@/events/utils/mainProcess";

import * as env from "@/utils/env";
import * as window from "@/utils/window";
import type * as Win from "@/common/Win";

export const register = () => {
  app.on("window-all-closed", () => {
    if (env.os === "mac") return;
    app.quit();
  });

  mainProcess.on.app((win) => {
    let name: Win.Name | null = null;

    win.on("ready-to-show", async () => {
      name = await window.getName(win);
    });

    win.on("closed", async () => {
      if (!name) return;
      win.removeAllListeners();
      await window.destroy(name);
    });
  });
};
