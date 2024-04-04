# How to use PNPM

[이전 페이지로 돌아가기](../README.md)

pnpm은 npm, yarn과 같은 패키지 매니저의 한 종류입니다.

우리 프로젝트에서는 패키지 호환성, 모듈 설치 속도, 그리고 패키지 매니저 버전 관리 등의 목적을 위해, npm이 아닌 pnpm과 corepack을 함께 사용하고 있습니다.

## Installation

### Set NVM

**Windows**

```bash
nvm install 18.15.0
nvm use 18
```

**MacOS**

```bash
nvm install 18.15.0
nvm alias default 18
nvm use default
```

### Set Corepack

```bash
corepack enable
```

이처럼 Copreack을 활성화 한 이후에는, 프로젝트 내에 설정된 버전에 맞는 pnpm 버전을 사용하도록 자동 설정되기 때문에, 이후에는 설정이 필요가 없습니다.

---

## Usage

아래 내용은 주로 사용되는 pnpm 명령어 테이블입니다.

대중적으로 사용하는 npm과 비교할 수 있도록, 같이 표기하였습니다.

\* npm과 pnpm의 명령어가 서로 다를 경우, `*`로 표기.

\* 아래 모든 커맨드에서 `install`은 `i`로 축약할 수 있음.

| \*  | pnpm                            | npm                              | example                             |
| --- | ------------------------------- | -------------------------------- | ----------------------------------- |
|     | npm install                     | pnpm install                     | pnpm install                        |
| \*  | npm install \<package>          | pnpm add \<package>              | pnpm add threejs                    |
| \*  | npm install -D \<package>       | pnpm add -D \<package>           | obon add -D @types/threejs          |
|     | npm ci                          | pnpm install --frozen-lockfile   | pnpm install --frozen-lockfile      |
|     | npm install -P                  | pnpm install -P                  | pnpm install -P                     |
| \*  | npm uninstall \<package>        | pnpm remove \<package>           | pnpm remove threejs @types/threejs  |
| \*  | npm run \<script>               | pnpm \<script>                   | pnpm dev:render                     |
|     | npm update \<package>@<version> | pnpm update \<package>@<version> | pnpm update @metamorp/engine@latest |
|     | npx \<package>                  | pnpx \<package>                  | pnpx ts-node some-feature.ts        |
| \*  | npx create-next-app             | pnpm create next-app             | pnpm create next-app ./my-app       |
