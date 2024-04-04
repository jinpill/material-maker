import { app } from "electron";

import * as project from "@/utils/project";
import * as env from "@/utils/env";
import * as window from "@/utils/window";
import * as logger from "@/utils/logger";

import * as events from "@/events";

const bootstrap = async () => {
  logger.log("Bootstrap");
  events.register();
  await app.whenReady();

  logger.info(`${project.config.productName} is ready!`);
  await window.create("main");
};

env.initialize();
bootstrap();
