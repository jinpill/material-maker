import { ipcRenderer } from "electron";

export const on = {
  get: async <T extends unknown>(
    channel: string,
    callback: (event: Electron.IpcRendererEvent, arg: any) => T,
  ) => {
    addListener<T>("get", channel, callback);
  },
  set: async <T extends unknown>(
    channel: string,
    callback: (event: Electron.IpcRendererEvent, arg: any) => T,
  ) => {
    addListener<T>("set", channel, callback);
  },
  run: async <T extends unknown>(
    channel: string,
    callback: (event: Electron.IpcRendererEvent, arg: any) => T,
  ) => {
    addListener<T>("run", channel, callback);
  },
};

export const send = {
  get: <T extends unknown>(channel: string, arg: any = {}): T => {
    const result = ipcRenderer.sendSync(`get:${channel}`, arg);
    return result;
  },
  set: async <T extends unknown>(channel: string, arg: any): Promise<T> => {
    return await ipcRenderer.invoke(`set:${channel}`, arg);
  },
  run: async <T extends unknown>(
    channel: string,
    arg: any = {},
  ): Promise<T> => {
    return await ipcRenderer.invoke(`run:${channel}`, arg);
  },
};

const addListener = <T extends unknown>(
  type: "get" | "set" | "run",
  channel: string,
  callback: (event: Electron.IpcRendererEvent, arg: any) => T,
) => {
  ipcRenderer.on(`${type}:${channel}`, async (event, arg) => {
    const name = send.get<string>("window-config");
    const result = await callback(event, arg);
    ipcRenderer.send(`${type}:${channel}__${name}-reply`, result);
  });
};
