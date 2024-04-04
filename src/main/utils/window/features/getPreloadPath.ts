import path from "path";
import * as project from "@/utils/project";
import type * as Win from "@/common/Win";

const getPreloadPath = (windowName: Win.Name) => {
  const preloadPath = `./dist/preloads/${windowName}.bundle.js`;
  return path.resolve(project.__root, preloadPath);
};

export default getPreloadPath;
