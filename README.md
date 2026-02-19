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
