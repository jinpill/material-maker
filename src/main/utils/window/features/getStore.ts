import { screen, BrowserWindow, Display } from "electron";
import Store from "electron-store";
import type { State, SizeState, PositionState, WindowState } from "../types";
import type * as Win from "@/common/Win";

interface StoreOptions {
  windowName: Win.Name;
  groupName?: string;
  width?: number;
  height?: number;
}

const getStore = (options: StoreOptions) => {
  const { windowName, groupName } = options;

  const defaultSizeState: State<SizeState> = {
    state: {
      width: options.width ?? 800,
      height: options.height ?? 600,
    },
  };

  // 각각 크기와 위치를 가지는 스토어를 생성.
  const sizeStore = new Store<State<SizeState>>({
    name: `size-state-${windowName}`,
    defaults: defaultSizeState,
  });
  const positionStore = new Store<State<PositionState>>({
    name: `position-state-${groupName ?? windowName}`,
  });

  // 크기와 위치를 합쳐서 반환.
  const get = (): WindowState["state"] => {
    const sizeState = sizeStore.get("state");
    const positionState = positionStore.get("state");

    const x = Math.round(positionState?.x - sizeState.width / 2);
    const y = Math.round(positionState?.y - sizeState.height / 2);

    const state = {
      state: {
        ...sizeState,
        x: positionState ? x : undefined,
        y: positionState ? y : undefined,
      },
    };

    const isWithinBounds = checkBounds(state);
    if (isWithinBounds) return state.state;

    const defaultState = getDefaults(state).state;
    return defaultState;
  };

  // 윈도우의 위치가 화면 안에 전부 표시되는지를 확인.
  const checkBounds = ({ state }: WindowState) => {
    const displays = screen.getAllDisplays();
    let result = false;

    for (const display of displays) {
      const bounds = display.bounds;

      const { width, height } = state;
      if (width > bounds.width) continue;
      if (height > bounds.height) continue;

      const x = state.x ?? bounds.x + (bounds.width - width) / 2;
      const y = state.y ?? bounds.y + (bounds.height - height) / 2;

      if (x < bounds.x) continue;
      if (y < bounds.y) continue;
      if (x + width > bounds.x + bounds.width) continue;
      if (y + height > bounds.y + bounds.height) continue;

      result = true;
      break;
    }

    return result;
  };

  // 윈도우의 기본 크기와 위치를 반환.
  const getDefaults = ({ state }: WindowState) => {
    const displays = screen.getAllDisplays();

    const getDefaultState = (bounds: Display["bounds"]) => {
      const { width, height } = defaultSizeState.state;
      const x = Math.round(bounds.x + (bounds.width - width) / 2);
      const y = Math.round(bounds.y + (bounds.height - height) / 2);

      const defaultState = { width, height, x, y };
      return defaultState;
    };

    // 바운더리 안에 위치하는 디스플레이를 찾은 뒤,
    // 해당 디스플레이의 중앙에 위치하도록 기본 크기와 위치를 반환.
    if (typeof state.x === "number" && typeof state.y === "number") {
      for (const display of displays) {
        const { bounds } = display;
        const { width, height, x, y } = bounds;

        if (state.x < x || state.x > x + width) continue;
        if (state.y < y || state.y > y + height) continue;

        const defaultState = getDefaultState(bounds);
        return { state: defaultState };
      }
    }

    // 바운더리 안에 위치하지 않는 경우,
    // 메인 디스플레이 중앙에 위치하도록 기본 크기와 위치를 반환.
    const bounds = screen.getPrimaryDisplay().bounds;
    const defaultState = getDefaultState(bounds);
    return { state: defaultState };
  };

  // 스테이트를 업데이트.
  const update = (win: BrowserWindow) => {
    const [width, height] = win.getSize();
    const [x, y] = win.getPosition();

    sizeStore.set("state", { width, height });
    positionStore.set("state", {
      x: x + width / 2,
      y: y + height / 2,
    });
  };

  // 스테이트 업데이트를 예약하는 함수.
  let timerId: NodeJS.Timeout | null = null;
  const getReservation = (win: BrowserWindow, timer: number) => {
    return () => {
      if (timerId !== null) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(() => {
        update(win);
        timerId = null;
      }, timer);
    };
  };

  return {
    get,
    update,
    getReservation,
  };
};

export default getStore;
