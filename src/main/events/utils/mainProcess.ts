import { app, BrowserWindow, ipcMain } from "electron";
import * as window from "@/utils/window";
import * as Win from "@/common/Win";

type Target = BrowserWindow | Electron.WebContents | Win.Name | null;

export const on = {
  app: (callback: (win: BrowserWindow) => void) => {
    app.on("browser-window-created", (_, win) => {
      callback(win);
    });
  },
  get: <T extends unknown>(
    channel: string,
    callback: (event: Electron.IpcMainEvent, arg: any) => T,
  ) => {
    ipcMain.on(`get:${channel}`, async (event, arg) => {
      const result = await callback(event, arg);
      event.returnValue = result;
    });
  },
  set: <T extends unknown>(
    channel: string,
    callback: (event: Electron.IpcMainInvokeEvent, arg: any) => T,
  ) => {
    ipcMain.handle(`set:${channel}`, callback);
  },
  run: <T extends unknown>(
    channel: string,
    callback: (event: Electron.IpcMainInvokeEvent, arg: any) => T,
  ) => {
    ipcMain.handle(`run:${channel}`, callback);
  },
};

export const send = {
  get: async <T extends unknown>(
    target: Target,
    channel: string,
    arg: any = {},
  ) => {
    return await runSendProcess<T>("get", target, channel, arg);
  },
  set: async <T extends unknown>(
    target: Target,
    channel: string,
    arg: any = {},
  ) => {
    return await runSendProcess<T>("set", target, channel, arg);
  },
  run: async <T extends unknown>(
    target: Target,
    channel: string,
    arg: any = {},
  ) => {
    return await runSendProcess<T>("run", target, channel, arg);
  },
};

const runSendProcess = async <T extends unknown>(
  type: "get" | "set" | "run",
  target: Target,
  channel: string,
  arg: any,
) => {
  if (!target) return;
  const [name, win] = await getTargetData(target);

  return new Promise<T>((resolve) => {
    ipcMain.once(`${type}:${channel}__${name}-reply`, (_, arg) => resolve(arg));
    win?.webContents.send(`${type}:${channel}`, arg);
  });
};

const getTargetData = async (
  target: BrowserWindow | Electron.WebContents | Win.Name,
) => {
  let name: Win.Name | null;
  let win: BrowserWindow | null;

  if (typeof target === "string") {
    name = target;
    win = await window.get(target);
  } else if (target instanceof BrowserWindow) {
    name = await window.getName(target);
    win = target;
  } else {
    name = await window.getName(target);
    win = name ? await window.get(name) : null;
  }

  return [name, win] as const;
};
