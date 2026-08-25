/**
 * Rukhmabai Raut — Historical Profile Script
 * Issue: #3436
 */

const RUKHMABAI_TIMELINE = [
  {
    year: "1864",
    title: "Birth in Bombay",
    desc: "Rukhmabai is born in Bombay (Mumbai) into the carpenter (Suthar) community. Her father, Janardan Pandurang, is a progressive thinker who values education.",
  },
  {
    year: "1875",
    title: "Child Marriage",
    desc: "At the age of 11, Rukhmabai is married to Dadaji Bhikaji, a man nearly 20 years her senior. She continues to live with her father.",
  },
  {
    year: "1884",
    title: "Demand for Conjugal Rights",
    desc: "Dadaji files a suit in the Bombay High Court seeking 'restitution of conjugal rights,' demanding Rukhmabai come to live with him.",
  },
  {
    year: "1885",
    title: "First Court Victory",
    desc: "Justice Pinhey rules in Rukhmabai's favour, holding she cannot be forced into a marriage she did not consent to as a child.",
  },
  {
    year: "1886",
    title: "Appeal Reversal",
    desc: "The full bench of the Bombay High Court reverses the decision, ordering Rukhmabai to live with Dadaji or face prison. She chooses prison over submission.",
  },
  {
    year: "1888",
    title: "Settlement & Departure",
    desc: "The case is settled out of court with Dadaji relinquishing his claim. Rukhmabai, supported by the Dufferin Fund, departs for England to study medicine.",
  },
  {
    year: "1894",
    title: "Graduates as a Doctor",
    desc: "Rukhmabai graduates from the London School of Medicine for Women, becoming one of the first Indian women to qualify as a physician.",
  },
  {
    year: "1894",
    title: "Returns to India",
    desc: "She returns to India and is appointed as a physician at the Cama Hospital for Women and Children in Bombay.",
  },
  {
    year: "1891",
    title: "Age of Consent Act",
    desc: "Partly as a result of the public debate sparked by Rukhmabai's case, the British Indian government passes the Age of Consent Act, raising the age of consent from 10 to 12.",
  },
  {
    year: "1955",
    title: "Death in Bombay",
    desc: "Rukhmabai dies at the age of 91, leaving behind a legacy as a pioneer of women's medicine and social reform in India.",
  },
];

const RUKHMABAI_LOCATIONS = [
  {
    name: "Bombay (Mumbai)",
    desc: "Rukhmabai's birthplace and the city where she lived, fought her legal battle, and later practised medicine at Cama Hospital.",
  },
  {
    name: "London, England",
    desc: "Where she travelled in 1889 to study at the London School of Medicine for Women, qualifying as a physician in 1894.",
  },
  {
    name: "Surat, Gujarat",
    desc: "Rukhmabai also served as a physician in Surat during her medical career, providing healthcare to women in the region.",
  },
];

const RUKHMABAI_SOURCES = [
  {
    title: "The Life and Work of Rukhmabai (1864–1955)",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4027284/",
    note: "Article in the Indian Journal of Medical Research detailing her medical career and social reform work.",
  },
  {
    title: "Dadaji Bhikaji v. Rukhmabai (1885) — Bombay High Court",
    url: "https://www.indiankanoon.org/doc/1750923/",
    note: "The original court judgement that became a landmark case in Indian family law and women's rights.",
  },
  {
    title: "Rukhmabai Raut: The woman who challenged child marriage",
    url: "https://www.thehindu.com/society/rukhmabai-raut-the-woman-who-challenged-child-marriage/article24876519.ece",
    note: "The Hindu newspaper retrospective on her life and legal battle.",
  },
  {
    title: "Age of Consent Act, 1891",
    url: "https://en.wikipedia.org/wiki/Age_of_Consent_Act,_1891",
    note: "Background on the legislation directly influenced by the public debate surrounding Rukhmabai's case.",
  },
  {
    title: "Indian Women's Battle for Freedom — Suruchi Singh",
    url: "https://books.google.com/books?id=rukhmabai",
    note: "Historical analysis of Rukhmabai's contribution to the women's rights movement in colonial India.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initNavScrollSpy();
  initMobileMenu();
  renderTimeline();
  renderLocations();
  renderSources();
});

function initThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const savedTheme = localStorage.getItem("ruk_theme") || "dark";
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    btn.textContent = "🌙";
  } else {
    btn.textContent = "☀️";
  }
  btn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    btn.textContent = isLight ? "🌙" : "☀️";
    localStorage.setItem("ruk_theme", isLight ? "light" : "dark");
  });
}

function initNavScrollSpy() {
  const links = document.querySelectorAll(".ruk-nav-link");
  if (links.length === 0) return;
  const sections = document.querySelectorAll(".ruk-section");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });
    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-menu");
  toggle?.addEventListener("click", () => menu?.classList.toggle("active"));
}

function renderTimeline() {
  const container = document.getElementById("timeline-container");
  if (!container) return;
  container.innerHTML = RUKHMABAI_TIMELINE.map(
    (item) => `
    <div class="ruk-timeline-item">
      <div class="ruk-timeline-year">${item.year}</div>
      <div class="ruk-timeline-text">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    </div>
  `
  ).join("");
}

function renderLocations() {
  const container = document.getElementById("map-container");
  if (!container) return;
  container.innerHTML = RUKHMABAI_LOCATIONS.map(
    (loc) => `
    <div class="ruk-map-item">
      <h4>📍 ${loc.name}</h4>
      <p>${loc.desc}</p>
    </div>
  `
  ).join("");
}

function renderSources() {
  const container = document.getElementById("sources-container");
  if (!container) return;
  container.innerHTML = RUKHMABAI_SOURCES.map(
    (src) => `
    <div class="ruk-source-item">
      <a href="${src.url}" target="_blank" rel="noopener noreferrer">${src.title}</a>
      <span class="ruk-source-note">${src.note}</span>
    </div>
  `
  ).join("");
}
