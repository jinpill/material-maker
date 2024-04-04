import type {
  BrowserWindow,
  WebContents,
  BrowserWindowConstructorOptions,
} from "electron";
import type * as Win from "@/common/Win";

export interface WindowOptions extends BrowserWindowConstructorOptions {
  customOptions?: {
    /** 윈도우의 최근 위치를 그룹과 공유. */
    group?: string;
    /** 부모 윈도우를 설정. */
    parent?: Win.Name;
    /** 개발자 도구 자동 실행을 방지. */
    isPreventDevTools?: boolean;
    /** 윈도우를 화면 중앙에 배치. */
    isCenter?: boolean;
  };
}

export type CallbackType = "will-create" | "ready" | "will-close";

export type CallbackMap = Partial<
  Record<
    CallbackType,
    (utils: WindowUtils) => boolean | void | Promise<boolean | void>
  >
>;

export type CallbackMaps = Partial<Record<Win.Name, CallbackMap>>;

export interface SizeState {
  width: number;
  height: number;
}

export interface PositionState {
  x: number;
  y: number;
}

export interface State<I> {
  state: I;
}

export type WindowState = State<SizeState & Partial<PositionState>>;

export interface WindowUtils {
  create: (windowName: Win.Name) => Promise<BrowserWindow | null>;
  close: (windowName: Win.Name) => Promise<void>;
  destroy: (windowName: Win.Name) => Promise<void>;
  refresh: (windowName: Win.Name) => Promise<void>;
  ready: (windowName: Win.Name) => Promise<void>;
  get: (windowName: Win.Name) => Promise<BrowserWindow | null>;
  has: (windowName: Win.Name) => Promise<boolean>;
  showAll: () => Promise<void>;
  getName: (
    window: BrowserWindow | WebContents | null,
  ) => Promise<Win.Name | null>;
}
