(() => {
  "use strict";

  const facts = [
    { label: "Elevation", value: "~2,850 m", detail: "Triund meadow / ridge area" },
    { label: "Difficulty", value: "Moderate", detail: "A sustained uphill walk" },
    { label: "Distance", value: "~9–10 km", detail: "Common one-way estimate from McLeod Ganj area" },
    { label: "Duration", value: "1–2 days", detail: "Day outing or overnight camp-style visit" },
    { label: "Starting point", value: "Gallu Devi", detail: "Common access point above Dharamkot" },
    { label: "District", value: "Kangra", detail: "Himachal Pradesh" },
    { label: "Range", value: "Dhauladhar", detail: "Western Himalaya" },
    { label: "Trail type", value: "Out-and-back", detail: "Return by the same broad corridor for many visitors" }
  ];

  const trailStages = [
    {
      step: "01",
      title: "McLeod Ganj → Dharamkot",
      text: "Use the hill-town area as the approach to the trailhead. Dharamkot is a common base for walkers and offers cafés, guesthouses and local services.",
      tags: ["Approach", "Town-to-trail"]
    },
    {
      step: "02",
      title: "Dharamkot → Gallu Devi",
      text: "The path narrows into the forested trail system around the Gallu Devi area. Confirm local access conditions before starting.",
      tags: ["Forest", "Trailhead"]
    },
    {
      step: "03",
      title: "Gallu Devi → forest climb",
      text: "The trail gains height through mixed woodland with intermittent views. Pace yourself rather than treating the climb as a race.",
      tags: ["Pine & oak", "Steady ascent"]
    },
    {
      step: "04",
      title: "Forest → Magic View area",
      text: "A well-known stopping zone provides a useful visual break. Views open progressively as the trail leaves thicker forest.",
      tags: ["Viewpoint", "Rest"]
    },
    {
      step: "05",
      title: "Final climb → Triund meadow",
      text: "The upper trail becomes more exposed and the final bends are popularly known as the “22 Curves”. The meadow opens dramatically near the top.",
      tags: ["22 Curves", "Open ridge"]
    },
    {
      step: "06",
      title: "Triund → return",
      text: "Spend time at the ridge only while conditions remain safe. Return before darkness unless you have a permitted, properly planned overnight arrangement.",
      tags: ["Dhauladhar views", "Descent"]
    }
  ];

  const highlights = [
    ["01", "Dhauladhar wall", "The serrated Dhauladhar range rises immediately beyond the Triund meadow, creating the trail’s defining mountain backdrop."],
    ["02", "Kangra Valley panorama", "Clear conditions can reveal broad views over the Kangra landscape and distant plains."],
    ["03", "The 22 Curves", "The final sequence of bends has become one of Triund’s most recognisable trail features."],
    ["04", "Forest transition", "The walk moves from settlement and forest into increasingly open hillside, making the changing ecology easy to appreciate."],
    ["05", "Sunset and stars", "The open ridge is visually striking near dusk, but visitors should plan conservatively around daylight, weather and permitted camping arrangements."],
    ["06", "Gallu Devi", "The temple area marks a culturally meaningful part of the approach and is a reminder to travel respectfully through local communities."]
  ];

  const seasons = [
    ["Spring", "Mar–May", "Mild daytime conditions and fresh mountain vegetation can make this a rewarding period.", "Good", "Watch for rain, changing temperatures and occasional trail disruption."],
    ["Summer", "Jun", "Longer daylight can suit walkers, but pre-monsoon heat and cloud build-up are possible.", "Variable", "Start early and check the forecast."],
    ["Monsoon", "Jul–Sep", "Rain can make forest paths slippery and increase the risk of local trail problems.", "Cautious", "Avoid relying on normal dry-season conditions."],
    ["Autumn", "Oct–Nov", "Often favoured for clearer mountain visibility and cooler walking weather.", "Excellent", "Temperatures fall quickly after sunset."],
    ["Winter", "Dec–Feb", "Snow and ice can transform the upper trail and make conditions more demanding.", "Experienced only", "Check local access and snow conditions; proper equipment may be required."]
  ];

  const gallery = [
    {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/TriundTrek.jpg?width=1200",
      alt: "Trail with curves on the way to Triund",
      title: "The climb toward Triund",
      author: "Wikimedia Commons contributor",
      license: "Source: Wikimedia Commons · TriundTrek.jpg",
      source: "https://commons.wikimedia.org/wiki/File:TriundTrek.jpg"
    },
    {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Triund.jpg?width=1200",
      alt: "Triund Hill with the Dhauladhar range",
      title: "Triund Hill and Dhauladhar",
      author: "Ashish Sharma",
      license: "CC BY-SA · Wikimedia Commons",
      source: "https://commons.wikimedia.org/wiki/File:Triund.jpg"
    },
    {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/View_from_Triund_ridge_(21921981594).jpg?width=1200",
      alt: "View from the Triund ridge toward Dharamshala and the plains",
      title: "View from Triund ridge",
      author: "Ashish Gupta",
      license: "CC BY-SA · Wikimedia Commons",
      source: "https://commons.wikimedia.org/wiki/File:View_from_Triund_ridge_(21921981594).jpg"
    },
    {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/View_of_Dhauladhar_from_Triund_campsite,_McLeod_Ganj,_India_-_September_2014.jpg?width=1200",
      alt: "Dhauladhar range seen from Triund campsite",
      title: "Dhauladhar from the campsite",
      author: "Rickard Törnblad",
      license: "CC BY-SA 4.0 · Wikimedia Commons",
      source: "https://commons.wikimedia.org/wiki/File:View_of_Dhauladhar_from_Triund_campsite,_McLeod_Ganj,_India_-_September_2014.jpg"
    },
    {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Triund_hills.jpg?width=1200",
      alt: "Dhauladhar peak landscape seen from Triund",
      title: "Moon Peak from Triund",
      author: "Sumit Mathur",
      license: "CC BY-SA · Wikimedia Commons",
      source: "https://commons.wikimedia.org/wiki/File:Triund_hills.jpg"
    },
    {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Withered_tree_in_triund_trek.jpg?width=1200",
      alt: "Rhododendron tree on the Triund trail",
      title: "Mountain vegetation",
      author: "Shilpi Bhatnagar",
      license: "CC BY-SA · Wikimedia Commons",
      source: "https://commons.wikimedia.org/wiki/File:Withered_tree_in_triund_trek.jpg"
    }
  ];

  const nearby = [
    ["Bhagsu Waterfall", "A popular waterfall and walking destination close to McLeod Ganj; pair it with a town stay rather than treating it as part of the Triund trail itself.", "Waterfall"],
    ["Bhagsunag Temple", "A well-known local temple near Bhagsu, useful for adding cultural context to a Dharamshala itinerary.", "Culture"],
    ["McLeod Ganj", "A major base for visitors to the area, with Tibetan cultural institutions, cafés, accommodation and local services.", "Town"],
    ["Dharamkot", "A quieter village and common approach area for the Triund trail, with guesthouses and mountain-facing cafés.", "Village"],
    ["Dal Lake", "A small scenic lake near McLeod Ganj that can be visited separately from the trek.", "Nature"],
    ["Tsuglagkhang Complex", "A major Tibetan cultural and spiritual site in McLeod Ganj; observe local rules and visitor guidance.", "Culture"]
  ];

  const safety = [
    ["Start with a realistic pace", "The route is uphill for much of the way. Take regular breaks, hydrate and avoid comparing your speed with other trekkers."],
    ["Check live conditions", "Rain, snow, fog, rockfall or local closures can change the route. Verify the situation with local authorities, guides or accommodation providers."],
    ["Respect the ridge", "The open meadow has exposed edges and changing weather. Keep a safe distance from drop-offs and avoid unstable ground."],
    ["Carry essentials", "Water, weather-appropriate layers, sun protection, basic first aid, charged communication devices and suitable footwear are sensible basics."],
    ["Protect the ecosystem", "Carry out waste, minimise single-use plastic, stay on established paths and do not disturb wildlife or vegetation."],
    ["Plan the return", "Daylight fades quickly in mountain terrain. If you are not on a properly permitted overnight plan, leave enough time for the descent."]
  ];

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  function renderFacts() {
    const target = $("#facts-grid");
    if (!target) return;
    target.innerHTML = facts.map((fact, index) => `
      <article class="fact-card" data-index="${index}">
        <span class="fact-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="fact-label">${fact.label}</span>
        <strong>${fact.value}</strong>
        <p>${fact.detail}</p>
      </article>
    `).join("");
  }

  function renderTrail() {
    const target = $("#trail-timeline");
    if (!target) return;
    target.innerHTML = trailStages.map(stage => `
      <article class="trail-item">
        <div class="trail-marker">${stage.step}</div>
        <div class="trail-content">
          <div class="trail-title-row">
            <h3>${stage.title}</h3>
            <div class="tag-row">${stage.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
          </div>
          <p>${stage.text}</p>
        </div>
      </article>
    `).join("");
  }

  function renderHighlights() {
    const target = $("#highlight-grid");
    if (!target) return;
    target.innerHTML = highlights.map(item => `
      <article class="highlight-card">
        <span class="highlight-index">${item[0]}</span>
        <h3>${item[1]}</h3>
        <p>${item[2]}</p>
      </article>
    `).join("");
  }

  function renderSeasons() {
    const target = $("#season-grid");
    if (!target) return;
    target.innerHTML = seasons.map(season => `
      <article class="season-card">
        <div class="season-top"><span>${season[0]}</span><strong>${season[1]}</strong></div>
        <p>${season[2]}</p>
        <div class="season-rating"><span>Trail outlook</span><b>${season[3]}</b></div>
        <small>${season[4]}</small>
      </article>
    `).join("");
  }

  function renderGallery() {
    const target = $("#gallery-grid");
    if (!target) return;
    target.innerHTML = gallery.map((item, index) => `
      <figure class="gallery-card">
        <button class="gallery-button" type="button" data-gallery-index="${index}" aria-label="Open ${item.title} in image viewer">
          <img src="${item.src}" alt="${item.alt}" loading="${index === 0 ? "eager" : "lazy"}" decoding="async">
          <span class="gallery-expand" aria-hidden="true">↗</span>
        </button>
        <figcaption>
          <div><strong>${item.title}</strong><span>${item.author}</span></div>
          <a href="${item.source}" target="_blank" rel="noopener noreferrer">${item.license} ↗</a>
        </figcaption>
      </figure>
    `).join("");
  }

  function renderNearby() {
    const target = $("#nearby-grid");
    if (!target) return;
    target.innerHTML = nearby.map((place, index) => `
      <article class="nearby-card">
        <span class="nearby-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="nearby-type">${place[2]}</span>
        <h3>${place[0]}</h3>
        <p>${place[1]}</p>
      </article>
    `).join("");
  }

  function renderSafety() {
    const target = $("#safety-list");
    if (!target) return;
    target.innerHTML = safety.map((item, index) => `
      <div class="safety-item">
        <span>${index + 1}</span>
        <div><strong>${item[0]}</strong><p>${item[1]}</p></div>
      </div>
    `).join("");
  }

  function setupNavigation() {
    const toggle = $("#menu-toggle");
    const menu = $("#nav-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        const open = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      $$(".nav-link, .dropdown-item", menu).forEach(link => {
        link.addEventListener("click", () => {
          menu.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    $$(".dropdown-toggle").forEach(button => {
      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        $$(".dropdown-toggle").forEach(other => {
          other.setAttribute("aria-expanded", "false");
          other.parentElement.classList.remove("open");
        });
        button.setAttribute("aria-expanded", String(!expanded));
        button.parentElement.classList.toggle("open", !expanded);
      });
    });

    document.addEventListener("click", event => {
      if (!event.target.closest(".nav-dropdown")) {
        $$(".nav-dropdown").forEach(drop => drop.classList.remove("open"));
        $$(".dropdown-toggle").forEach(button => button.setAttribute("aria-expanded", "false"));
      }
    });
  }

  function setupLightbox() {
    const box = $("#lightbox");
    const image = $("#lightbox-image");
    const caption = $("#lightbox-caption");
    const close = $("#lightbox-close");
    if (!box || !image || !caption || !close) return;

    let activeIndex = 0;

    const open = index => {
      const item = gallery[index];
      if (!item) return;
      activeIndex = index;
      image.src = item.src;
      image.alt = item.alt;
      caption.innerHTML = `<strong>${item.title}</strong><span>${item.author} · ${item.license}</span>`;
      box.classList.add("is-open");
      box.setAttribute("aria-hidden", "false");
      close.focus();
      document.body.classList.add("modal-open");
    };

    const hide = () => {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
      image.src = "";
      document.body.classList.remove("modal-open");
    };

    $$(".gallery-button").forEach(button => {
      button.addEventListener("click", () => open(Number(button.dataset.galleryIndex)));
    });
    close.addEventListener("click", hide);
    $$("[data-close-lightbox]").forEach(element => element.addEventListener("click", hide));

    document.addEventListener("keydown", event => {
      if (!box.classList.contains("is-open")) return;
      if (event.key === "Escape") hide();
      if (event.key === "ArrowRight") open((activeIndex + 1) % gallery.length);
      if (event.key === "ArrowLeft") open((activeIndex - 1 + gallery.length) % gallery.length);
    });
  }

  function setupScrollTop() {
    const button = $("#btn-scroll-top");
    if (!button) return;
    const update = () => button.classList.toggle("visible", window.scrollY > 500);
    window.addEventListener("scroll", update, { passive: true });
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    update();
  }

  function setupReveal() {
    const elements = $$(".fact-card, .trail-item, .highlight-card, .season-card, .gallery-card, .nearby-card, .safety-item, .source-card");
    if (!("IntersectionObserver" in window)) {
      elements.forEach(element => element.classList.add("revealed"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach(element => observer.observe(element));
  }

  function setupImageFallback() {
    document.addEventListener("error", event => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied) return;
      image.dataset.fallbackApplied = "true";
      image.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Triund.jpg/960px-Triund.jpg";
    }, true);
  }

  function setupThemeBridge() {
    const button = $("#theme-toggle");
    if (!button) return;
    button.addEventListener("click", () => {
      const light = document.documentElement.getAttribute("data-theme") === "light";
      document.documentElement.setAttribute("data-theme", light ? "dark" : "light");
      localStorage.setItem("theme", light ? "dark" : "light");
      button.textContent = light ? "☀️" : "🌙";
    });
    button.textContent = document.documentElement.getAttribute("data-theme") === "light" ? "🌙" : "☀️";
  }

  function init() {
    renderFacts();
    renderTrail();
    renderHighlights();
    renderSeasons();
    renderGallery();
    renderNearby();
    renderSafety();
    setupNavigation();
    setupLightbox();
    setupScrollTop();
    setupThemeBridge();
    setupImageFallback();
    setupReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
