import * as mainProcess from "@/events/utils/mainProcess";
import * as window from "@/utils/window";
import type * as Win from "@/common/Win";

export const register = () => {
  mainProcess.on.get("window-config", async (event) => {
    const config: Win.Config = {
      name: "unknown",
      isClosable: true,
      isMinimizable: true,
      isMaximizable: true,
      isMaximized: false,
    };

    const windowName = await window.getName(event.sender);
    if (!windowName) return config;
    config.name = windowName;

    const win = await window.get(windowName);
    if (!win) return config;

    config.isClosable = win.closable;
    config.isMinimizable = win.minimizable;
    config.isMaximizable = win.maximizable;
    config.isMaximized = win.isMaximized();

    return config;
  });

  mainProcess.on.run(
    "control-window",
    async (event, action: Win.ControlAction) => {
      if (!action.target) {
        const windowName = await window.getName(event.sender);
        if (!windowName) return;
        action.target = windowName;
      }

      const win = await window.get(action.target);
      switch (action.type) {
        case "minimize":
          win?.minimize();
          break;
        case "maximize":
          win?.maximize();
          break;
        case "unmaximize":
          win?.unmaximize();
          break;
        case "open":
          await window.create(action.target);
          break;
        case "close":
          await window.close(action.target);
          break;
      }
    },
  );

  mainProcess.on.app((win) => {
    win.on("maximize", async () => {
      const data: Win.Event.Set.Maximized = {
        isMaximized: true,
      };
      mainProcess.send.set(win, "window-config", data);
    });

    win.on("unmaximize", async () => {
      const data: Win.Event.Set.Maximized = {
        isMaximized: false,
      };
      mainProcess.send.set(win, "window-config", data);
    });
  });
};
