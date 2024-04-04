import { BrowserWindow, screen } from "electron";

import getStore from "./getStore";
import getPreloadPath from "./getPreloadPath";
import getWindowURL from "./getWindowURL";

import * as env from "@/utils/env";
import type * as Win from "@/common/Win";
import type { WindowOptions, WindowUtils } from "../types";

const createWindow = async (
  windowName: Win.Name,
  { customOptions, ...options }: WindowOptions,
  windowUtils: WindowUtils,
) => {
  // 윈도우 크기와 위치를 갖는 스토어를 생성.
  const store = getStore({
    windowName,
    groupName: customOptions?.group,
    width: options.width,
    height: options.height,
  });

  // 윈도우의 저장된 최근 크기와 위치를 얻음.
  const state = store.get();
  const preloadPath = getPreloadPath(windowName);

  const bounds = {
    width: state.width ?? options.width,
    height: state.height ?? options.height,
    x: state.x ?? options.x,
    y: state.y ?? options.y,
  };

  // resizable 옵션이 false인 경우, width와 height를 고정.
  if (options.resizable === false) {
    bounds.width = options.width ?? state.width;
    bounds.height = options.height ?? state.height;
  }

  // isCenter 옵션이 true인 경우, 윈도우를 화면 중앙에 배치.
  if (
    customOptions?.isCenter &&
    typeof bounds.x === "number" &&
    typeof bounds.y === "number"
  ) {
    const displays = screen.getAllDisplays();
    const display = displays.find((display) => {
      const { workArea } = display;

      if (workArea.x > bounds.x!) return false;
      if (workArea.y > bounds.y!) return false;
      if (workArea.x + workArea.width < bounds.x!) return false;
      if (workArea.y + workArea.height < bounds.y!) return false;

      return true;
    });

    if (display) {
      const { workArea } = display;
      bounds.x = workArea.x + (workArea.width - bounds.width) / 2;
      bounds.y = workArea.y + (workArea.height - bounds.height) / 2;
      bounds.x = Math.round(bounds.x);
      bounds.y = Math.round(bounds.y);
    }
  }

  // customOptions.parent 옵션이 있는 경우, 부모를 설정.
  const parentName = customOptions?.parent;
  const parent = (parentName && (await windowUtils.get(parentName))) ?? null;

  // BrowserWindow 인스턴스를 생성.
  const window = new BrowserWindow({
    ...options,
    ...state,
    ...bounds,

    parent: parent || undefined,
    webPreferences: {
      nodeIntegration: true,
      preload: preloadPath,
      ...options.webPreferences,
    },
  });
  window.accessibleTitle = windowName;

  // 윈도우를 이동 또는 크기를 조절할 때, 스테이트 업데이트를 예약.
  window.on("moved", store.getReservation(window, 1000));
  window.on("resized", store.getReservation(window, 1000));

  const loadWindowURL = async () => {
    // 윈도우 화면을 렌더링.
    const windowURL = getWindowURL(windowName);
    await window.loadURL(windowURL, {});

    // isPreventDevTools 옵션을 설정하지 않은 경우, 개발자 도구를 자동 활성화.
    if (
      (env.mode === "development" || env.stage === "alpha") &&
      !customOptions?.isPreventDevTools
    ) {
      window.webContents.openDevTools();
    }
  };

  return {
    window,
    loadWindowURL,
  };
};

export default createWindow;
