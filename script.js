// Renders the project cards and wires up the status filters.
(function () {
  const projectsEl = document.getElementById("projects");
  const filtersEl = document.getElementById("filters");
  const socialsEl = document.getElementById("socials");
  const yearEl = document.getElementById("year");

  yearEl.textContent = new Date().getFullYear();

  const STATUS_LABELS = { live: "Live", building: "Building" };

  const ICONS = {
    github: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
    email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  };

  function cardTemplate(p, index) {
    const statusLabel = STATUS_LABELS[p.status] || p.status;
    const tags = p.tags.map((t) => `<span class="tag">${t}</span>`).join("");
    const link = p.link
      ? `<button type="button" class="card-link" data-link="${p.link}">view project →</button>`
      : `<button type="button" class="card-link disabled" disabled>coming soon</button>`;

    const imagePos = p.imagePosition || "center top";
    const imageBanner = p.image
      ? `<div class="card-image" style="--project-image: url('${p.image}'); --image-position: ${imagePos}"></div>`
      : `<div class="card-image"></div>`;

    return `
      <article class="card" style="animation-delay:${index * 60}ms">
        ${imageBanner}
        <div class="card-content">
          <div class="card-top">
            <div class="card-icon">${p.icon}</div>
            <span class="card-status ${p.status}">${statusLabel}</span>
          </div>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="tags">${tags}</div>
          ${link}
        </div>
      </article>`;
  }

  function render(filter) {
    const visible = PROJECTS.filter((p) => !p.hide);
    const list = filter === "all" ? visible : visible.filter((p) => p.status === filter);
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

  projectsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".card-link[data-link]");
    if (!btn) return;
    window.open(btn.dataset.link, "_blank", "noopener");
  });

  function buildSocials() {
    const active = SOCIALS.filter((s) => s.url);
    socialsEl.innerHTML = active
      .map((s) => {
        const icon = ICONS[s.platform] || ICONS.link;
        const label = s.platform.charAt(0).toUpperCase() + s.platform.slice(1);
        return `<a class="social-btn" href="${s.url}" target="_blank" rel="noopener" aria-label="${label}">${icon}</a>`;
      })
      .join("");
  }

  buildSocials();
  buildFilters();
  render("all");
})();
