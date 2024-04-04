import { contextBridge } from "electron";
import appConfig from "@/utils/appConfig";

contextBridge.exposeInMainWorld("appConfig", appConfig);
