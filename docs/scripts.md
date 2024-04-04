# Script List

[이전 페이지로 돌아가기](../README.md)

## For Development

개발 단계에서 사용하게 될 스크립트 목록입니다.

| Script       | Description                               |
| ------------ | ----------------------------------------- |
| ci           | 노드 모듈을 설치                          |
| start        | 일렉트론 실행                             |
| dev:render   | Next.js 개발모드 실행                     |
| dev:main     | 일렉트론 개발모드 실행                    |
| compile:test | 전체 컴파일을 실행하여 문제가 없는지 확인 |

**참고사항**

- `pnpm dev:main` 스크립트의 경우, 컴파일을 거치기 때문에 실행 시간이 오래 걸립니다.<br />
  메인 프로세스와 프리로드 소스코드의 변경이 없는 경우, `pnpm start` 스크립트를 사용하면 더욱 빠르게 실행할 수 있습니다.

---

## For Deployment

배포 단계에서 사용하게 될 스크립트 목록입니다.

| Script | Description            |
| ------ | ---------------------- |
| build  | 일렉트론 패키지를 빌드 |

---

## For Others

다른 스크립트에서 사용하기 위해 작성된 스크립트 목록입니다.

일반적인 상황에서는 직접 사용하게 될 일은 없습니다.

| Script           | Description                                       |
| ---------------- | ------------------------------------------------- |
| compile:render   | Next.js를 컴파일                                  |
| compile:preloads | 프리로드 소스코드를 컴파일                        |
| compile:main     | 메인 프로세스 소스코드를 컴파일                   |
| build:clean      | 이전 빌드 결과물을 삭제                           |
| build:script     | 빌드 스크립트(scripts/build/index.js) 파일을 실행 |
| setup:app        | 셋업 스크립트(scripts/setup/index.js) 파일을 실행 |
