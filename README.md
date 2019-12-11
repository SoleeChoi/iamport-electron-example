# iamport-electron-example

[ ![alt text](https://img.shields.io/badge/electron-v6-orange.svg?longCache=true&style=flat-square) ](https://github.com/electron/electron)
[ ![alt text](https://img.shields.io/badge/react-v16.12.0-yellow.svg?longCache=true&style=flat-square) ](https://github.com/sindresorhus/query-string)

일렉트론 환경에서 아임포트 일반/정기결제 및 휴대폰 본인인증을 테스트 해볼 수 있는 예제 프로젝트입니다.

## 지원정보

아임포트 캐패시터 모듈은 `일반결제`, `정기결제` 그리고 `휴대폰 본인인증` 기능을 모두 제공합니다. 단, BC카드 계열(우리카드 등)은 팝업 차단 문제로 테스트가 제한됩니다.

## 실행하기

아래 명령어를 통해 프로젝트를 클론 받습니다.

```
$ git clone https://github.com/SoleeChoi/iamport-electorn-example.git
```

프로젝트 폴더로 이동 후, 필요한 모듈을 설치합니다.

```
$ cd ./iamport-electron-example
$ yarn
```

OS 환경에 맞게 프로젝트를 빌드합니다.

```
$ yarn dev          // 개발 모드 빌드
$ yarn package      // 현재 OS에 맞는 실행파일을 빌드
$ yarn package-all  // 모든 OS에 대한 실행파일 빌드
```

빌드된 파일은 `iamport-electron-example/resources`에 위치합니다.
