# maenjh.github.io

개인 기술 블로그 저장소입니다.  
주로 **개발 기록**, **학습 정리**, **문제 해결 과정**을 Jekyll + Minimal Mistakes 테마로 정리합니다.

## 프로젝트 개요

- 블로그 주소: https://maenjh.github.io
- 작성 언어: Markdown (`_posts` 폴더)
- 배포 플랫폼: GitHub Pages
- 테마: Minimal Mistakes
- 주요 목적: 공부 내용의 기록, 복기, 검색 가능한 개인 지식 베이스 구축

## 로컬 개발 방법

### 1) 의존성 설치

```bash
bundle install
npm install
```
※ 로컬 설치는 기존대로 `npm install`이 가능하지만, CI는 `package-lock.json` 기준의 `npm ci`로 고정합니다.
※ Node.js는 **18 이상 21 미만**, Ruby는 **3.2.x** 권장됩니다.

### 2) 빌드 및 로컬 실행

```bash
bundle exec jekyll serve --livereload
```

브라우저에서 `http://127.0.0.1:4000`로 확인합니다.

로컬 실행 시 브라우저 반영이 느릴 경우:

```bash
bundle exec jekyll serve --trace
```

### 3) 자바스크립트 번들 갱신(필요 시)

```bash
npm run build:js
```

## 글 작성 가이드

- 포스트는 `_posts/YYYY-MM-DD-제목.md` 형식으로 작성합니다.
- Jekyll front matter에 최소한 아래 항목을 지정합니다.

```yaml
---
title: "포스트 제목"
date: 2026-02-19 10:00:00 +0900
categories: [category]
tags: [tag1, tag2]
---
```

### 글 작성 팁

- 이미지 첨부는 `assets/images/`를 사용하고, 가능하면 게시일자 기반 폴더를 만들어 관리합니다.
- 코드 블록에 ` ```java` / ` ```kotlin` / ` ```javascript` 같은 언어 태그를 붙여 가독성을 높입니다.
- 카테고리/태그는 검색 노출용으로 통일된 네이밍을 권장합니다.

## 저장소 구조

- `_posts`: 포스트 원본
- `_pages`: 정적 페이지(About, archive 등)
- `_includes` / `_layouts`: 공통 레이아웃 및 템플릿
- `assets`: 스타일, 스크립트, 이미지 등 정적 자산

## 참고

이 저장소는 Minimal Mistakes 테마를 기반으로 하며, 사이트 설정과 레이아웃은 `_config.yml`에서 관리합니다.

### 운영 설정 위치

- Google Analytics(GA) 추적 ID: `_config.yml > analytics.google.tracking_id`
- IP 익명화: `_config.yml > analytics.google.anonymize_ip`
- Google AdSense 클라이언트 ID: `_config.yml > adsense.client_id`
- 광고 스크립트 로딩 여부: `_config.yml > adsense.enabled`

### 배포 전 점검 체크리스트

- [ ] `_config.yml`의 `url`, `baseurl`이 실제 배포 경로와 일치하는지 확인
- [ ] `analytics.provider`와 `analytics.google.tracking_id` 값이 배포용 ID인지 확인
- [ ] `analytics.google.anonymize_ip`가 `true`인지 확인
- [ ] `adsense.enabled`와 `adsense.client_id` 설정이 필요한 경우 정확히 들어가 있는지 확인
- [ ] `comments.provider`와 해당 댓글 공급자 설정 값이 정상인지 확인
- [ ] `search: true` 사용 시 검색 방식(`search_provider`)이 실제 사용 환경에 맞는지 확인
- [ ] 최근 게시글은 `bundle exec jekyll build`로 로컬에서 성공 빌드되는지 확인
- [ ] `npm ci`와 `bundle exec jekyll build`가 CI와 동일한 Node(20)/Ruby(3.2.2)/Bundler(2.5.9) 환경에서 통과되는지 확인

### 버전 동기화 포인트

- Node lock: `package-lock.json` 기준으로 의존성 고정
- Bundler lock: `Gemfile.lock`(BUNDLED WITH: `2.5.9`) 기준 고정
- 루트 버전 명시 파일: `.nvmrc`(`20`), `.ruby-version`(`3.2.2`)

---

## English (Short)

This repository hosts a personal developer blog built with Jekyll and the Minimal Mistakes theme.

- Site: https://maenjh.github.io
- Run locally:
  - `bundle install`
  - `npm install`
  - `bundle exec jekyll serve --livereload`
- Posts are written in Korean and organized under `_posts`.

---

## 문의/운영

- 이슈: https://github.com/maenjh/maenjh.github.io/issues
- 라이선스: MIT
