// Renders the project cards and wires up the status filters.
(function () {
  const projectsEl = document.getElementById("projects");
  const filtersEl = document.getElementById("filters");
  const yearEl = document.getElementById("year");

  yearEl.textContent = new Date().getFullYear();

  const STATUS_LABELS = { live: "Live", building: "Building", prototype: "Prototype", idea: "Idea" };

  function cardTemplate(p, index) {
    const statusLabel = STATUS_LABELS[p.status] || p.status;
    const tags = p.tags.map((t) => `<span class="tag">${t}</span>`).join("");
    const link = p.link
      ? `<a class="card-link" href="${p.link}" target="_blank" rel="noopener">view project →</a>`
      : `<span class="card-link disabled">coming soon</span>`;

    return `
      <article class="card" style="animation-delay:${index * 60}ms">
        <div class="card-top">
          <div class="card-icon">${p.icon}</div>
          <span class="card-status ${p.status}">${statusLabel}</span>
        </div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="tags">${tags}</div>
        ${link}
      </article>`;
  }

  function render(filter) {
    const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.status === filter);
    projectsEl.innerHTML = list.map(cardTemplate).join("");
  }

  function buildFilters() {
    const statuses = ["all", ...new Set(PROJECTS.map((p) => p.status))];
    filtersEl.innerHTML = statuses
      .map((s, i) => {
        const label = s === "all" ? "All" : STATUS_LABELS[s] || s;
        return `<button class="filter-btn ${i === 0 ? "active" : ""}" data-filter="${s}">${label}</button>`;
      })
      .join("");

    filtersEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filtersEl.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.filter);
    });
  }

  buildFilters();
  render("all");
})();
