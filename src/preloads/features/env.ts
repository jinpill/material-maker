import { contextBridge } from "electron";
import env from "@/utils/env";

contextBridge.exposeInMainWorld("env", env);
