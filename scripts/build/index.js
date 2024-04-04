"use strict";

/*
NOTES:
일렉트론 프로젝트를 빌드하기 위한 스크립트를 실행하는 파일입니다.
* 핵심 실행만 보고 싶을 경우, build 함수를 실행하는 부분을 확인해주세요.
*/

const builder = require("electron-builder");
const clc = require("cli-color");
const path = require("path");

const env = require("../utils/env");
const builderConfig = require("../../.builder.config");
const preProcessor = require("./pre-processor");
const postProcessor = require("./post-processor");

/**
 * electron-builder를 실행하는 함수입니다.
 */
const build = async () => {
  const targets = getTargets();
  const config = await getConfig();

  return builder.build({
    targets,
    config,
  });
};

/**
 * electron-builder의 Platform 객체에서 현재 플랫폼에 맞는 타겟을 반환하는 함수입니다.
 * @returns {import('electron-builder').Target[]}
 */
const getTargets = () => {
  const { Platform } = builder;
  const keys = Object.keys(Platform);

  for (const key of keys) {
    const platform = Platform[key].nodeName;
    if (process.platform !== platform) continue;
    return Platform[key].createTarget();
  }

  throw new Error(`Unknown platform: ${process.platform}`);
};

/**
 * electron-builder 실행에 필요한 설정을 반환하는 함수입니다.
 * @returns {Promise<import('electron-builder').Configuration>}
 */
const getConfig = async () => {
  if (typeof builderConfig !== "function") return builderConfig;
  return await builderConfig(env);
};

// 일렉트론 프로젝트 빌드 시작.
console.log(clc.blue("🚀 Build Started!"));
console.time(clc.yellow("⏰ Build Time:"));

// 빌드 전처리 실행.
preProcessor();
build()
  .then(() => {
    // 일렉트론 프로젝트 빌드 성공.
    const distPath = path.resolve(env.__root, "./build");
    console.log(clc.green("✅ Build Success!"));
    console.log(clc.blue(`👉 "${distPath}"`));
  })
  .catch((err) => {
    // 일렉트론 프로젝트 빌드 실패.
    console.log(clc.red("🚨 Build Failed!"));
    console.error(err);
  })
  .finally(() => {
    // 빌드 후처리 실행.
    postProcessor();

    // 일렉트론 프로젝트 빌드 종료.
    console.timeEnd(clc.yellow("⏰ Build Time:"));
  });
