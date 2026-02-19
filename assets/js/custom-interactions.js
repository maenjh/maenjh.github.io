(function() {
  "use strict";

  var root = document.documentElement;
  var body = document.body;

  if (!root || !body) {
    return;
  }

  var scrollProgress = document.createElement("div");
  scrollProgress.className = "scroll-progress";
  body.appendChild(scrollProgress);

  var getScrollTop = function() {
    return window.pageYOffset || root.scrollTop || 0;
  };

  var updateScrollProgress = function() {
    var maxScroll = root.scrollHeight - root.clientHeight;
    var progress = maxScroll > 0 ? getScrollTop() / maxScroll : 0;
    scrollProgress.style.transform = "scaleX(" + progress + ")";
  };

  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress);

  var topButton = document.querySelector(".sidebar__top");
  if (topButton) {
    var toggleTopButton = function() {
      topButton.classList.toggle("is-visible", getScrollTop() > 320);
    };

    toggleTopButton();
    window.addEventListener("scroll", toggleTopButton, { passive: true });
  }

  var revealItems = Array.prototype.slice.call(
    document.querySelectorAll(".archive .list__item, .archive .grid__item")
  );

  if (revealItems.length > 0) {
    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(
        function(entries, observer) {
          entries.forEach(function(entry) {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          rootMargin: "0px 0px -8% 0px",
          threshold: 0.12
        }
      );

      revealItems.forEach(function(item, index) {
        item.classList.add("reveal-ready");
        item.style.transitionDelay = Math.min(index * 45, 220) + "ms";
        revealObserver.observe(item);
      });
    } else {
      revealItems.forEach(function(item) {
        item.classList.add("is-visible");
      });
    }
  }

  var filterRoot = document.querySelector("[data-post-filter]");
  if (filterRoot) {
    var filterButtons = Array.prototype.slice.call(
      filterRoot.querySelectorAll("[data-filter-category]")
    );
    var filterItems = Array.prototype.slice.call(
      document.querySelectorAll("[data-filter-target] > .list__item, [data-filter-target] > .grid__item")
    );
    var filterStatus = document.querySelector("[data-filter-status]");

    var updateStatus = function(categorySlug, matchedCount) {
      if (!filterStatus) {
        return;
      }

      if (categorySlug === "all") {
        filterStatus.textContent = "현재 페이지의 포스트 " + matchedCount + "개를 보고 있어요.";
        return;
      }

      var activeButton = filterRoot.querySelector("[data-filter-category='" + categorySlug + "']");
      var label = activeButton ? activeButton.getAttribute("data-filter-label") : categorySlug;
      filterStatus.textContent = label + " 카테고리 포스트 " + matchedCount + "개";
    };

    var applyFilter = function(categorySlug) {
      var matchedCount = 0;

      filterItems.forEach(function(item) {
        var categoryList = (item.dataset.postCategories || "").split(" ").filter(Boolean);
        var matched = categorySlug === "all" || categoryList.indexOf(categorySlug) !== -1;
        item.classList.toggle("is-filtered-out", !matched);

        if (matched) {
          matchedCount += 1;
        }
      });

      filterButtons.forEach(function(button) {
        button.classList.toggle("is-active", button.dataset.filterCategory === categorySlug);
      });

      updateStatus(categorySlug, matchedCount);
    };

    filterButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        applyFilter(button.dataset.filterCategory);
      });
    });

    applyFilter("all");
  }

  var heroPanel = document.querySelector(".home-hero__panel");
  if (heroPanel && window.matchMedia("(pointer: fine)").matches) {
    heroPanel.addEventListener("pointermove", function(event) {
      var rect = heroPanel.getBoundingClientRect();
      var x = ((event.clientX - rect.left) / rect.width) * 100;
      var y = ((event.clientY - rect.top) / rect.height) * 100;

      heroPanel.style.setProperty("--glow-x", x.toFixed(2) + "%");
      heroPanel.style.setProperty("--glow-y", y.toFixed(2) + "%");
    });

    heroPanel.addEventListener("pointerleave", function() {
      heroPanel.style.removeProperty("--glow-x");
      heroPanel.style.removeProperty("--glow-y");
    });
  }
})();
