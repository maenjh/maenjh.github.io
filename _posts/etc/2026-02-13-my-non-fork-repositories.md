---
title: "[GitHub] Fork 제외 내 레포 모아보기"
excerpt: "내 GitHub 레포 중 fork가 아닌 프로젝트만 자동으로 정리"
toc: true
toc_sticky: true
categories:
  - etc
tags: [github, repository, portfolio]
last_modified_at: 2026-02-13T10:00:00+09:00
classes: wide
---

내 GitHub 레포 중에서 **fork한 레포를 제외**하고, 직접 관리하는 레포만 모아보는 페이지입니다.

- 기준: `fork === false`
- 정렬: 최근 업데이트 순
- 데이터 소스: GitHub REST API

## Non-fork Repository List

<div id="repo-summary">불러오는 중...</div>
<ul id="repo-list"></ul>

<script>
  (function () {
    var username = "maenjh";
    var apiUrl = "https://api.github.com/users/" + username + "/repos?per_page=100&type=owner&sort=updated";
    var summaryEl = document.getElementById("repo-summary");
    var listEl = document.getElementById("repo-list");

    function escapeHtml(text) {
      return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    fetch(apiUrl)
      .then(function (res) {
        if (!res.ok) throw new Error("GitHub API 요청 실패: " + res.status);
        return res.json();
      })
      .then(function (repos) {
        var nonForkRepos = repos.filter(function (repo) { return !repo.fork; });
        summaryEl.textContent = "총 " + nonForkRepos.length + "개의 non-fork 레포";

        if (nonForkRepos.length === 0) {
          listEl.innerHTML = "<li>표시할 레포가 없습니다.</li>";
          return;
        }

        var items = nonForkRepos.map(function (repo) {
          var desc = repo.description ? " - " + escapeHtml(repo.description) : "";
          var language = repo.language ? " | " + escapeHtml(repo.language) : "";
          return (
            '<li><a href="' + repo.html_url + '" target="_blank" rel="noopener noreferrer">' +
            escapeHtml(repo.name) +
            "</a>" +
            language +
            desc +
            "</li>"
          );
        });

        listEl.innerHTML = items.join("");
      })
      .catch(function () {
        summaryEl.textContent = "레포 정보를 불러오지 못했습니다.";
        listEl.innerHTML = "<li>잠시 후 다시 시도해 주세요. (API rate limit 또는 네트워크 이슈)</li>";
      });
  })();
</script>
