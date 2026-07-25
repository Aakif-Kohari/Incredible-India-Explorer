document.addEventListener("DOMContentLoaded", () => {

  // ---------------------------------------------------------------------
  // Contributor data below is a static snapshot taken from the repo's
  // GitHub "Contributors" insights chart. The project does not yet call
  // the live GitHub API from the frontend, so — like the contributor
  // checklist page — this renders from a local data set rather than a
  // live fetch. Update this snapshot periodically as the roster changes.
  // Showcase/path/activity sections below remain illustrative placeholders.
  // ---------------------------------------------------------------------

  const topContributors = [
    { name: "Jidnyasa-P", initials: "JP", role: "Top Contributor", meta: "57 commits", url: "https://github.com/Jidnyasa-P" },
    { name: "Pratyush-Panda-2006", initials: "PP", role: "Top Contributor", meta: "36 commits", url: "https://github.com/Pratyush-Panda-2006" },
    { name: "Babin123456", initials: "BA", role: "Top Contributor", meta: "32 commits", url: "https://github.com/Babin123456" },
    { name: "ubanand36", initials: "UB", role: "Top Contributor", meta: "29 commits", url: "https://github.com/ubanand36" }
  ];

  const maintainers = [
    { name: "Eshajha19", initials: "ES", role: "Maintainer", meta: "165 commits · Project Owner", url: "https://github.com/Eshajha19" }
  ];

  const recentContributors = [
    { name: "arnavgoel17", initials: "AR", role: "Contributor", meta: "1 commit", url: "https://github.com/arnavgoel17" },
    { name: "ishhwarrii", initials: "IS", role: "Contributor", meta: "1 commit", url: "https://github.com/ishhwarrii" },
    { name: "paramjeet-dev", initials: "PD", role: "Contributor", meta: "1 commit", url: "https://github.com/paramjeet-dev" },
    { name: "jenam16", initials: "JE", role: "Contributor", meta: "1 commit", url: "https://github.com/jenam16" }
  ];

  const showcaseItems = [
    {
      icon: "fa-solid fa-puzzle-piece",
      tag: "Community Feature",
      title: "State Jigsaw Puzzle Game",
      description: "A drag-and-drop puzzle module built by a contributor to teach India's state geography.",
      linkText: "View feature",
      url: "#"
    },
    {
      icon: "fa-solid fa-image",
      tag: "Screenshot",
      title: "Redesigned Cuisine Explorer",
      description: "A community-submitted UI refresh for the regional cuisine discovery page.",
      linkText: "See showcase",
      url: "#"
    },
    {
      icon: "fa-solid fa-star",
      tag: "Success Story",
      title: "First PR to First Merge in 48 Hours",
      description: "How a first-time open-source contributor shipped the Heritage Trail game end to end.",
      linkText: "Read the story",
      url: "#"
    },
    {
      icon: "fa-solid fa-code-pull-request",
      tag: "Featured Pull Request",
      title: "Accessibility Pass on the Map Module",
      description: "A widely praised PR that added keyboard navigation and ARIA labels across the interactive map.",
      linkText: "View pull request",
      url: "https://github.com/Eshajha19/Incredible-India-Explorer/pulls"
    }
  ];

  const contributionPath = [
    { title: "Fork & Clone", description: "Fork the repository and clone it locally — no build tools required." },
    { title: "Pick an Issue", description: "Choose an open issue, especially ones labeled for ECSoC 2026, and ask to be assigned." },
    { title: "Build Your Feature", description: "Follow the project's frontend folder structure and coding standards." },
    { title: "Open a Pull Request", description: "Submit a small, focused PR and respond to review feedback." }
  ];

  const activityFeed = [
    { icon: "fa-solid fa-code-pull-request", title: "PR merged: Fix responsive layout on Wildlife Explorer", meta: "2 hours ago" },
    { icon: "fa-solid fa-bug", title: "Issue opened: Broken image on Textiles page", meta: "5 hours ago" },
    { icon: "fa-solid fa-circle-check", title: "PR merged: Add keyboard shortcuts to Command Palette", meta: "1 day ago" },
    { icon: "fa-solid fa-user-plus", title: "New contributor joined: Meera Pillai", meta: "2 days ago" },
    { icon: "fa-solid fa-code-pull-request", title: "PR merged: Improve empty state on Search results", meta: "3 days ago" }
  ];

  // ---------------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------------

  function renderContributorCard(person) {
    return `
      <div class="contributor-card">
        <div class="contributor-avatar">${person.initials}</div>
        <h4>${person.name}</h4>
        <span class="contributor-role">${person.role}</span>
        <span class="contributor-meta">${person.meta}</span>
        <a class="contributor-link" href="${person.url}" target="_blank" rel="noopener">View profile →</a>
      </div>
    `;
  }

  function renderContributorGroup(containerId, people) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = people.map(renderContributorCard).join("");
  }

  function renderShowcaseCard(item) {
    return `
      <article class="showcase-card">
        <span class="showcase-icon"><i class="${item.icon}" aria-hidden="true"></i></span>
        <div class="showcase-body">
          <span class="showcase-tag">${item.tag}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <a class="showcase-link" href="${item.url}" target="_blank" rel="noopener">${item.linkText} →</a>
        </div>
      </article>
    `;
  }

  function renderShowcase() {
    const container = document.getElementById("showcase-grid");
    if (!container) return;
    container.innerHTML = showcaseItems.map(renderShowcaseCard).join("");
  }

  function renderPathStep(step) {
    return `
      <li>
        <h4>${step.title}</h4>
        <p>${step.description}</p>
      </li>
    `;
  }

  function renderContributionPath() {
    const list = document.getElementById("path-list");
    if (!list) return;
    list.innerHTML = contributionPath.map(renderPathStep).join("");
  }

  function renderActivityItem(entry) {
    return `
      <li>
        <span class="activity-icon"><i class="${entry.icon}" aria-hidden="true"></i></span>
        <div class="activity-text">
          <strong>${entry.title}</strong>
          <p>${entry.meta}</p>
        </div>
      </li>
    `;
  }

  function renderActivity() {
    const list = document.getElementById("activity-list");
    if (!list) return;
    list.innerHTML = activityFeed.map(renderActivityItem).join("");
  }

  // ---------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------

  try {
    renderContributorGroup("top-contributors-grid", topContributors);
    renderContributorGroup("maintainers-grid", maintainers);
    renderContributorGroup("recent-contributors-grid", recentContributors);
    renderShowcase();
    renderContributionPath();
    renderActivity();
  } catch (error) {
    console.error("Community Hub failed to render:", error);
  }

});