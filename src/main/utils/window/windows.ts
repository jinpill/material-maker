import { BrowserWindow } from "electron";
import type * as Win from "@/common/Win";

/**
 * BrowserWindow 인스턴스를 각 이름으로 저장하기 위한 맵.
 */
const windows = new Map<Win.Name, BrowserWindow>();

export default windows;
