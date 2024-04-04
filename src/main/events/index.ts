import * as app from "./app";
import * as win from "./win";
import * as common from "./common";

export const register = () => {
  app.register();
  win.register();
  common.register();
};
