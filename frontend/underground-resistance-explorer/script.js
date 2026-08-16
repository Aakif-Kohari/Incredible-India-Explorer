document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("ur-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "ur-welcome-toast";
    toast.className = "ur-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>🕸️ Underground Resistance, 1942–44</strong> — After the arrests of 9 August 1942, Congress Radio, illegal presses and student couriers kept the movement alive from hiding.";
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("is-visible"));

    setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.addEventListener("transitionend", () => toast.remove(), { once: true });
      setTimeout(() => toast.remove(), 500);
    }, 3200);
  }

  showWelcomeToast();

  // --- Hero parallax -------------------------------------------------
  function initParallax() {
    const hero = document.querySelector(".ur-hero");
    const orbs = document.querySelector(".ur-hero-orbs");
    if (!hero || !orbs || prefersReducedMotion) return;

    const applyParallax = () => {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const offset = window.scrollY;
      const maxShift = 70;
      const shift = Math.min(Math.max(offset * 0.28, 0), maxShift);
      orbs.style.transform = `translateY(${shift}px)`;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        applyParallax();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    applyParallax();
  }

  initParallax();

  // --- Scroll-reveal -------------------------------------------------
  let revealObserver = null;

  function initReveal() {
    const revealEls = [...document.querySelectorAll(".reveal")];

    if (prefersReducedMotion) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    if (revealObserver) revealObserver.disconnect();

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  initReveal();

  // --- Sticky section nav active state --------------------------------
  let navObserver = null;

  function initSectionNav() {
    const nav = document.getElementById("ur-section-nav");
    const navLinks = [...document.querySelectorAll(".ur-section-nav-link")];
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    if (!nav || !sections.length) return;

    if (navObserver) navObserver.disconnect();

    const setActive = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.navTarget === id);
      });
    };

    navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { rootMargin: "-35% 0px -60% 0px", threshold: 0 });

    sections.forEach((section) => navObserver.observe(section));
  }

  initSectionNav();

  // --- Interactive Network Graph --------------------------------------
  const NODE_COLORS = {
    person: "#ff9933",
    group: "#7fd68a",
    publication: "#8ab4f8",
    radio: "#e8846b"
  };

  const NETWORK_NODES = {
    aruna: {
      type: "person",
      title: "Aruna Asaf Ali",
      body: "The heroine of 9 August 1942. With a warrant out for her arrest, she spent nearly four years underground, moving between safe houses in Delhi, Calcutta, Bombay and Allahabad while editing the underground monthly Inquilab.",
      tags: ["Underground Organiser", "Editor of Inquilab", "1942–46"],
      x: 130, y: 60
    },
    lohia: {
      type: "person",
      title: "Ram Manohar Lohia",
      body: "Co-edited Inquilab and the Congress Bulletin with Aruna, broadcast on Congress Radio, and mobilised the underground across northern India until jailed again in 1944.",
      tags: ["Inquilab", "Congress Radio", "Coordinator"],
      x: 130, y: 130
    },
    yusuf: {
      type: "person",
      title: "Yusuf Meherally",
      body: "The young socialist who coined the slogan \"Quit India\" and helped coordinate the underground in Bombay before his arrest in September 1942.",
      tags: ["Bombay", "\"Quit India\" Slogan"],
      x: 130, y: 200
    },
    chhotu: {
      type: "person",
      title: "Chhotubhai Puranik",
      body: "A Bombay Congress worker who organised underground cells and kept the city's networks fed with information and funds during the leaderless years.",
      tags: ["Bombay", "Underground Cells"],
      x: 130, y: 270
    },
    usha: {
      type: "person",
      title: "Usha Mehta",
      body: "The 22-year-old Wilson College student who conceived and ran the Congress Radio. Arrested at its final location on 12 November 1942 and jailed in the Radio Conspiracy Case.",
      tags: ["Congress Radio", "Student", "Arrested Nov 1942"],
      x: 130, y: 340
    },
    vithalbhai: {
      type: "person",
      title: "Vithalbhai Jhaveri",
      body: "A Congress leader who worked with Usha Mehta to find the amateur radio operators and organise the station that broadcast from Bombay between August and November 1942.",
      tags: ["Congress Radio", "Co-organiser"],
      x: 130, y: 410
    },
    achyut: {
      type: "person",
      title: "Achyutrao Patwardhan",
      body: "Worked underground in Bombay and Maharashtra, broadcasting on Congress Radio and feeding the networks that grew into the Satara Prati Sarkar.",
      tags: ["Congress Radio", "Satara"],
      x: 330, y: 60
    },
    sucheta: {
      type: "person",
      title: "Sucheta Kripalani",
      body: "Organised underground resistance and women's networks in the United Provinces while her husband J. B. Kripalani was in prison — the future first woman Chief Minister of Uttar Pradesh.",
      tags: ["United Provinces", "Women's Networks"],
      x: 330, y: 130
    },
    jp: {
      type: "person",
      title: "Jayaprakash Narayan",
      body: "Escaped Hazaribagh jail on 9 November 1942 and crossed into the underground, building the Azad Dasta guerrilla units of Bihar from the Nepal border until his re-arrest in December 1943.",
      tags: ["Escapee", "Azad Dastas", "Bihar"],
      x: 330, y: 200
    },
    tarkeshwari: {
      type: "person",
      title: "Tarkeshwari Sinha",
      body: "A Patna University student leader who organised the student underground in Bihar and helped distribute illegal literature for JP's networks.",
      tags: ["Student", "Bihar", "Courier"],
      x: 330, y: 270
    },
    nana: {
      type: "person",
      title: "Nana Patil",
      body: "\"Krantisinh\" of the longest-running parallel government (1943–46), which raised the Toofan Sena, ran people's courts and collected its own revenue across the Satara countryside.",
      tags: ["Satara Prati Sarkar", "Toofan Sena"],
      x: 330, y: 340
    },
    biju: {
      type: "person",
      title: "Biju Patnaik",
      body: "The young pilot and industrialist who used his aircraft and industrial network to move money and supplies to Jayaprakash Narayan's underground in Bihar.",
      tags: ["Aviation", "Logistics"],
      x: 330, y: 410
    },
    "congress-radio": {
      type: "radio",
      title: "Congress Radio",
      body: "Broadcasting from hidden Bombay rooms from 27 August 1942, this clandestine station announced itself \"on 42.34 metres from somewhere in India\". It was silenced by a police raid on 12 November 1942.",
      tags: ["42.34 m", "Silenced Nov 1942"],
      x: 560, y: 70
    },
    inquilab: {
      type: "publication",
      title: "Inquilab",
      body: "The monthly organ of the underground, edited from hiding by Aruna Asaf Ali with Ram Manohar Lohia. It published news of local uprisings and police atrocities; a reward of ₹5,000 was offered for Aruna's capture.",
      tags: ["Bombay", "1942–46"],
      x: 560, y: 160
    },
    "congress-bulletin": {
      type: "publication",
      title: "Congress Bulletin",
      body: "The underground news bulletin distributed illegally to keep workers and villagers informed of strikes, arrests and resistance when the government press carried only the official story.",
      tags: ["Delhi · Bombay", "1942–43"],
      x: 560, y: 250
    },
    patrikas: {
      type: "publication",
      title: "Patrikas & Cyclostyled Leaflets",
      body: "Single-sheet patrikas and cyclostyled bulletins — the underground's fastest weapon, written by students, duplicated on hand-cranked machines and passed hand-to-hand in marketplaces, mills and schools.",
      tags: ["Everywhere", "1942–44"],
      x: 560, y: 340
    },
    biplabi: {
      type: "publication",
      title: "Biplabi",
      body: "The weekly paper of the Tamluk Jatiya Sarkar in Midnapore. Printed while the British still claimed to control the area, it chronicled the sarkar's courts, relief work and volunteer corps.",
      tags: ["Tamluk", "1942–44"],
      x: 560, y: 430
    },
    "student-networks": {
      type: "group",
      title: "Student Courier Networks",
      body: "India's students were the underground's connective tissue — walking couriers, printers of patrikas and safekeepers of equipment whose youth and mobility defied suspicion.",
      tags: ["Colleges", "Couriers"],
      x: 800, y: 70
    },
    "azad-dastas": {
      type: "group",
      title: "Azad Dastas (Bihar)",
      body: "The guerrilla squads built by Jayaprakash Narayan after his jail escape. Operating from the Nepal border, they struck at communications, government offices and collaborators.",
      tags: ["Bihar", "1942–43"],
      x: 800, y: 190
    },
    "satara-prati-sarkar": {
      type: "group",
      title: "Satara Prati Sarkar",
      body: "The longest-running parallel government of the movement (1943–46) — people's courts, revenue collection and the Toofan Sena across hundreds of Maharashtra villages.",
      tags: ["Satara", "1943–46"],
      x: 800, y: 310
    },
    "tamluk-jatiya-sarkar": {
      type: "group",
      title: "Tamluk Jatiya Sarkar",
      body: "Midnapore's parallel government (December 1942 – September 1944) ran courts, schools and cyclone and famine relief through its volunteer corps, the Bidyut Vahini.",
      tags: ["Midnapore", "1942–44"],
      x: 800, y: 430
    }
  };

  const NETWORK_LINKS = [
    ["aruna", "congress-radio"],
    ["aruna", "inquilab"],
    ["aruna", "congress-bulletin"],
    ["aruna", "student-networks"],
    ["lohia", "inquilab"],
    ["lohia", "congress-bulletin"],
    ["lohia", "congress-radio"],
    ["yusuf", "inquilab"],
    ["yusuf", "congress-bulletin"],
    ["chhotu", "congress-radio"],
    ["chhotu", "patrikas"],
    ["usha", "congress-radio"],
    ["usha", "student-networks"],
    ["vithalbhai", "congress-radio"],
    ["achyut", "congress-radio"],
    ["achyut", "satara-prati-sarkar"],
    ["sucheta", "congress-bulletin"],
    ["sucheta", "patrikas"],
    ["sucheta", "student-networks"],
    ["jp", "azad-dastas"],
    ["jp", "student-networks"],
    ["tarkeshwari", "student-networks"],
    ["tarkeshwari", "patrikas"],
    ["tarkeshwari", "azad-dastas"],
    ["nana", "satara-prati-sarkar"],
    ["biju", "azad-dastas"],
    ["tamluk-jatiya-sarkar", "biplabi"]
  ];

  const networkBoard = document.getElementById("ur-network");
  const networkDetailTitle = document.getElementById("ur-network-detail-title");
  const networkDetailBody = document.getElementById("ur-network-detail-body");
  const networkDetailTags = document.getElementById("ur-network-detail-tags");

  let networkNodeEls = {};
  let networkLinkEls = [];

  function renderNetwork() {
    if (!networkBoard) return;
    if (networkBoard.querySelector("svg")) return;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 960 560");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Network graph of the underground resistance");

    const linksLayer = document.createElementNS(svgNS, "g");
    const nodesLayer = document.createElementNS(svgNS, "g");

    NETWORK_LINKS.forEach(([a, b]) => {
      const na = NETWORK_NODES[a];
      const nb = NETWORK_NODES[b];
      if (!na || !nb) return;
      const line = document.createElementNS(svgNS, "line");
      line.classList.add("ur-link");
      line.setAttribute("x1", na.x);
      line.setAttribute("y1", na.y);
      line.setAttribute("x2", nb.x);
      line.setAttribute("y2", nb.y);
      linksLayer.appendChild(line);
      networkLinkEls.push({ a, b, el: line });
    });

    Object.entries(NETWORK_NODES).forEach(([id, node]) => {
      const g = document.createElementNS(svgNS, "g");
      g.classList.add("ur-node");
      g.setAttribute("data-node-id", id);
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "button");
      g.setAttribute("aria-label", `Show details about ${node.title}`);

      const dot = document.createElementNS(svgNS, "circle");
      dot.classList.add("ur-node-dot");
      dot.setAttribute("cx", node.x);
      dot.setAttribute("cy", node.y);
      dot.setAttribute("r", 7);
      dot.setAttribute("fill", NODE_COLORS[node.type]);
      dot.setAttribute("stroke", "rgba(0,0,0,0.35)");
      dot.setAttribute("stroke-width", "1");

      const label = document.createElementNS(svgNS, "text");
      label.classList.add("ur-node-label");
      label.textContent = node.title.length > 22 ? node.title.slice(0, 21) + "…" : node.title;

      if (node.x < 480) {
        label.setAttribute("x", node.x + 14);
        label.setAttribute("y", node.y + 4);
        label.setAttribute("text-anchor", "start");
      } else if (node.x > 640) {
        label.setAttribute("x", node.x - 14);
        label.setAttribute("y", node.y + 4);
        label.setAttribute("text-anchor", "end");
      } else {
        label.setAttribute("x", node.x);
        label.setAttribute("y", node.y + 22);
        label.setAttribute("text-anchor", "middle");
      }

      g.appendChild(dot);
      g.appendChild(label);
      nodesLayer.appendChild(g);
      networkNodeEls[id] = g;

      g.addEventListener("click", () => selectNetworkNode(id));
      g.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectNetworkNode(id);
        }
      });
    });

    svg.appendChild(linksLayer);
    svg.appendChild(nodesLayer);
    networkBoard.appendChild(svg);
  }

  function showNetworkDetail(id) {
    const node = NETWORK_NODES[id];
    if (!node) return;
    if (networkDetailTitle) networkDetailTitle.textContent = node.title;
    if (networkDetailBody) networkDetailBody.textContent = node.body;
    if (networkDetailTags) {
      networkDetailTags.innerHTML = node.tags
        .map((t) => `<span class="ur-network-tag">${t}</span>`)
        .join("");
    }
  }

  function selectNetworkNode(id) {
    if (!NETWORK_NODES[id]) return;
    showNetworkDetail(id);

    const connected = new Set();
    NETWORK_LINKS.forEach(([a, b]) => {
      if (a === id) connected.add(b);
      if (b === id) connected.add(a);
    });

    Object.entries(networkNodeEls).forEach(([nid, el]) => {
      el.classList.remove("is-active", "is-connected", "is-dimmed");
      if (nid === id) el.classList.add("is-active");
      else if (connected.has(nid)) el.classList.add("is-connected");
      else el.classList.add("is-dimmed");
    });

    networkLinkEls.forEach(({ a, b, el }) => {
      el.classList.remove("is-connected", "is-dimmed");
      if (a === id || b === id) el.classList.add("is-connected");
      else el.classList.add("is-dimmed");
    });

    [...document.querySelectorAll(".ur-participant-card")].forEach((card) => {
      card.classList.toggle("is-active", card.dataset.node === id);
    });
  }

  renderNetwork();
  showNetworkDetail("aruna");

  // --- Interactive India Map (Leaflet) --------------------------------
  const MAP_POINTS = {
    bombay: {
      title: "Bombay",
      tag: "🎙️ Underground Hub",
      body: "The nerve centre of the underground. Congress Radio broadcast from hidden rooms here, Inquilab was printed in secret, and organisers like Yusuf Meherally and Chhotubhai Puranik coordinated the city's cells.",
      coords: [19.076, 72.8777],
      category: "hub"
    },
    delhi: {
      title: "Delhi",
      tag: "🏛️ Underground Hub",
      body: "Home of Aruna Asaf Ali's safe houses and Sucheta Kripalani's women's networks; the Congress Bulletin was distributed from here while the city was under close police watch.",
      coords: [28.6139, 77.209],
      category: "hub"
    },
    calcutta: {
      title: "Calcutta",
      tag: "🌐 Underground Hub",
      body: "A key base for Aruna Asaf Ali and a printing and courier centre feeding the eastern underground, linked by rail to Patna and the Tamluk parallel government.",
      coords: [22.5726, 88.3639],
      category: "hub"
    },
    satara: {
      title: "Satara",
      tag: "🏛️ Parallel Government",
      body: "The Satara Prati Sarkar (1943–46) ran people's courts, collected revenue and raised the Toofan Sena across hundreds of villages under Nana Patil — the longest-running parallel government of the movement.",
      coords: [17.6805, 73.9911],
      category: "parallel"
    },
    tamluk: {
      title: "Tamluk, Midnapore",
      tag: "🏛️ Parallel Government",
      body: "The Tamluk Jatiya Sarkar (Dec 1942 – Sep 1944) ran courts, schools and cyclone and famine relief through its volunteer corps, the Bidyut Vahini, and printed its weekly, Biplabi.",
      coords: [22.2947, 87.9203],
      category: "parallel"
    },
    ballia: {
      title: "Ballia, UP",
      tag: "🏛️ Parallel Government",
      body: "In August 1942 Ballia briefly overthrew its district administration under Chittu Pandey — India's first parallel government of the movement.",
      coords: [25.7605, 84.1475],
      category: "parallel"
    },
    allahabad: {
      title: "Allahabad",
      tag: "📍 Activity & Safe Houses",
      body: "One of Aruna Asaf Ali's refuges; students carried the Congress Bulletin and the messages of the imprisoned leadership through its colleges.",
      coords: [25.4358, 81.8463],
      category: "underground"
    },
    patna: {
      title: "Patna",
      tag: "🔥 Activity",
      body: "Centre of the Bihar underground around JP's Azad Dastas; Patna University's student organisers distributed illegal patrikas across the province.",
      coords: [25.5941, 85.1376],
      category: "underground"
    },
    ahmedabad: {
      title: "Ahmedabad",
      tag: "⚡ Activity",
      body: "Ran its own underground \"Azad Government\" ward by ward, printing and circulating patrikas that kept Gujarat inside the movement.",
      coords: [23.0225, 72.5714],
      category: "underground"
    },
    dharwad: {
      title: "Dharwad",
      tag: "🌾 Activity",
      body: "Sustained guerrilla action well into 1943 — one of the last southern strongholds of the underground.",
      coords: [15.4589, 75.0078],
      category: "underground"
    },
    madras: {
      title: "Madras",
      tag: "📍 Activity",
      body: "Printed and circulated patrikas that kept the southern provinces inside the movement when the official press denied it existed.",
      coords: [13.0827, 80.2707],
      category: "underground"
    },
    nagpur: {
      title: "Nagpur",
      tag: "📍 Activity",
      body: "A central-province centre for underground printing and distribution, linking the Bombay and eastern networks.",
      coords: [21.1458, 79.0882],
      category: "underground"
    },
    hazaribagh: {
      title: "Hazaribagh Central Jail",
      tag: "🗝️ Jail & Escape",
      body: "Jayaprakash Narayan broke out of this jail on 9 November 1942 with his comrades to build the Bihar underground.",
      coords: [23.9933, 85.3443],
      category: "jail"
    },
    "aga-khan-palace": {
      title: "Aga Khan Palace, Poona",
      tag: "⛓️ Imprisonment",
      body: "Gandhi, Nehru, Patel and the arrested Working Committee were interned here from 9 August 1942 until their release in 1944–45.",
      coords: [18.5569, 73.9026],
      category: "jail"
    }
  };

  const PUB_POINTS = {
    "inquilab-press": {
      title: "Inquilab Press (Bombay)",
      tag: "📰 Underground Publication",
      body: "The monthly organ of the underground, edited from hiding by Aruna Asaf Ali with Ram Manohar Lohia, printed secretly in Bombay between 1942 and 1946.",
      coords: [18.999, 72.84],
      category: "publication"
    },
    "congress-bulletin-press": {
      title: "Congress Bulletin (Delhi)",
      tag: "📰 Underground Publication",
      body: "The underground news bulletin was duplicated in Delhi and Bombay and distributed illegally from 1942 to 1943.",
      coords: [28.67, 77.24],
      category: "publication"
    },
    "biplabi-press": {
      title: "Biplabi Press (Tamluk)",
      tag: "📰 Underground Publication",
      body: "The weekly paper of the Tamluk Jatiya Sarkar was printed here from December 1942 to September 1944 while the British still claimed control of Midnapore.",
      coords: [22.33, 87.95],
      category: "publication"
    },
    "patrikas-madras": {
      title: "Patrika Networks (Madras)",
      tag: "📰 Underground Publication",
      body: "Madras-based student editors cyclostyled and distributed single-sheet patrikas that kept the southern provinces inside the movement.",
      coords: [13.1, 80.31],
      category: "publication"
    }
  };

  const ROUTES = [
    ["bombay", "delhi"],
    ["bombay", "calcutta"],
    ["bombay", "satara"],
    ["bombay", "allahabad"],
    ["delhi", "allahabad"],
    ["delhi", "patna"],
    ["patna", "hazaribagh"],
    ["patna", "calcutta"],
    ["calcutta", "tamluk"]
  ];

  const mapDetailTitle = document.getElementById("ur-map-detail-title");
  const mapDetailBody = document.getElementById("ur-map-detail-body");
  const mapDetailTag = document.getElementById("ur-map-detail-tag");
  const mapContainer = document.getElementById("ur-india-map");

  let indiaMap = null;
  let indiaMarkers = {};

  function showMapPoint(pointId, { flyTo = false, openPopup = false } = {}) {
    const point = MAP_POINTS[pointId] || PUB_POINTS[pointId];
    if (!point) return;

    if (mapDetailTitle) mapDetailTitle.textContent = point.title;
    if (mapDetailBody) mapDetailBody.textContent = point.body;
    if (mapDetailTag) {
      mapDetailTag.textContent = point.tag;
      mapDetailTag.style.color = "var(--ur-gold)";
    }

    if (indiaMap && point.coords) {
      if (flyTo) indiaMap.flyTo(point.coords, Math.max(indiaMap.getZoom(), 7), { duration: 0.9 });
      const marker = indiaMarkers[pointId];
      if (openPopup && marker) marker.openPopup();
    }
  }

  function initIndiaMap() {
    if (!mapContainer || indiaMap) return;
    if (typeof L === "undefined") return;

    indiaMap = L.map(mapContainer, {
      center: [23.4, 80.5],
      zoom: 5,
      minZoom: 4,
      scrollWheelZoom: false,
      attributionControl: true,
      zoomControl: false
    });

    L.control.zoom({ position: "bottomleft" }).addTo(indiaMap);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 18,
      attribution: "© OpenStreetMap contributors © CARTO"
    }).addTo(indiaMap);

    const letterFor = {};
    let index = 0;
    Object.keys(MAP_POINTS).forEach((id) => {
      letterFor[id] = String.fromCharCode(65 + index);
      index += 1;
    });

    Object.entries(MAP_POINTS).forEach(([id, point]) => {
      const icon = L.divIcon({
        className: `ur-map-marker is-${point.category}`,
        html: `<span aria-hidden="true">${letterFor[id]}</span>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
        popupAnchor: [0, -12]
      });

      const marker = L.marker(point.coords, { icon, title: point.title, alt: point.title, keyboard: true }).addTo(indiaMap);
      marker.bindTooltip(point.title, { direction: "top", offset: [0, -10], className: "ur-map-tooltip" });

      const popupContent = document.createElement("div");
      popupContent.innerHTML = `<p class="ur-popup-title">${point.title}</p><p class="ur-popup-desc">${point.body}</p><span class="ur-popup-tag">${point.tag}</span>`;
      marker.bindPopup(popupContent, { className: "ur-map-popup", closeButton: true, maxWidth: 280 });

      marker.on("click", () => showMapPoint(id));
      marker.on("keydown", (e) => {
        if (e.originalEvent.key === "Enter" || e.originalEvent.key === " ") {
          e.originalEvent.preventDefault();
          showMapPoint(id, { openPopup: true });
        }
      });

      indiaMarkers[id] = marker;
    });

    Object.entries(PUB_POINTS).forEach(([id, point]) => {
      const icon = L.divIcon({
        className: "ur-pub-marker",
        html: "<span aria-hidden=\"true\">📰</span>",
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        popupAnchor: [0, -14]
      });

      const marker = L.marker(point.coords, { icon, title: point.title, alt: point.title, keyboard: true }).addTo(indiaMap);
      marker.bindTooltip(point.title, { direction: "top", offset: [0, -10], className: "ur-map-tooltip" });

      const popupContent = document.createElement("div");
      popupContent.innerHTML = `<p class="ur-popup-title">${point.title}</p><p class="ur-popup-desc">${point.body}</p><span class="ur-popup-tag">${point.tag}</span>`;
      marker.bindPopup(popupContent, { className: "ur-map-popup", closeButton: true, maxWidth: 280 });

      marker.on("click", () => showMapPoint(id));
      marker.on("keydown", (e) => {
        if (e.originalEvent.key === "Enter" || e.originalEvent.key === " ") {
          e.originalEvent.preventDefault();
          showMapPoint(id, { openPopup: true });
        }
      });

      indiaMarkers[id] = marker;
    });

    ROUTES.forEach(([a, b]) => {
      const pa = MAP_POINTS[a];
      const pb = MAP_POINTS[b];
      if (!pa || !pb) return;
      L.polyline([pa.coords, pb.coords], {
        color: "#f5c36b",
        weight: 2,
        dashArray: "5 5",
        opacity: 0.7,
        className: "ur-route",
        interactive: false
      }).addTo(indiaMap);
    });

    showMapPoint("bombay");

    requestAnimationFrame(() => indiaMap.invalidateSize());
    setTimeout(() => indiaMap.invalidateSize(), 400);

    const canvas = mapContainer.closest(".ur-map-canvas");
    if (canvas && "IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) indiaMap.invalidateSize();
        });
      }, { threshold: 0.05 });
      revealObserver.observe(canvas);
    }
  }

  initIndiaMap();

  // --- Participant cards → network + map ------------------------------
  function initParticipantCards() {
    const cards = [...document.querySelectorAll(".ur-participant-card")];

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const nodeId = card.dataset.node;
        const mapId = card.dataset.map;

        if (nodeId) selectNetworkNode(nodeId);
        if (mapId) showMapPoint(mapId, { flyTo: true, openPopup: true });

        const networkSection = document.getElementById("network");
        if (networkSection) networkSection.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  initParticipantCards();

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Underground Resistance Networks — 1942–44";
      const thumbnail = "https://placehold.co/100/0f0c07/f5c36b?text=Underground";
      const category = "history";

      const updateBookmarkUI = () => {
        const isSaved = window.Journey.isSaved(id);
        btn.classList.toggle("is-saved", isSaved);
        btn.setAttribute("aria-pressed", String(isSaved));
        btn.innerHTML = isSaved ? "♥ Saved to Journey" : "♡ Save to Journey";
      };

      updateBookmarkUI();

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.Journey.toggle({
          id,
          explorerPage: "frontend/underground-resistance-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems(
      "frontend/underground-resistance-explorer/index.html",
      [
        {
          id: "underground-resistance-main",
          title: "Underground Resistance Networks — 1942–44",
          description: "Explore the underground networks that kept the Quit India Movement alive after the mass arrests of 9 August 1942: Congress Radio, illegal publications, student couriers, regional organisers and the parallel governments of Satara and Tamluk.",
          link: "frontend/underground-resistance-explorer/index.html"
        },
        {
          id: "underground-resistance-overview",
          title: "A Movement Without a Leadership",
          description: "How Operation Zero Hour — the pre-dawn arrests of 9 August 1942 — removed the Congress leadership and gave birth to the underground resistance.",
          link: "frontend/underground-resistance-explorer/index.html#overview"
        },
        {
          id: "underground-resistance-network",
          title: "The Web Beneath the Empire",
          description: "Interactive network graph of the underground: participants, organisations, publications and the Congress Radio and how they were wired together.",
          link: "frontend/underground-resistance-explorer/index.html#network"
        },
        {
          id: "underground-resistance-map",
          title: "Across India, in Hiding",
          description: "Interactive map of underground hubs, activity centres, parallel governments, jails, underground publications and the communication routes of 1942–44.",
          link: "frontend/underground-resistance-explorer/index.html#map"
        },
        {
          id: "underground-resistance-publications",
          title: "Printers That Defied the Ban",
          description: "The underground press: Inquilab, the Congress Bulletin, Biplabi and the cyclostyled patrikas that bypassed a censored press.",
          link: "frontend/underground-resistance-explorer/index.html#publications"
        },
        {
          id: "underground-resistance-communication",
          title: "Messages That Could Not Be Traced",
          description: "How the underground talked to itself — coded broadcasts on 42.34 metres, couriers, safe houses, cyclostyled bulletins and the railways.",
          link: "frontend/underground-resistance-explorer/index.html#communication"
        },
        {
          id: "underground-resistance-students",
          title: "The Youth Who Ran the Wires",
          description: "Student networks from Wilson College, Bombay and Patna University: Usha Mehta, Tarkeshwari Sinha and the courier cadres.",
          link: "frontend/underground-resistance-explorer/index.html#students"
        },
        {
          id: "underground-resistance-regional",
          title: "Many Fronts, One Underground",
          description: "Regional organisers: JP and the Azad Dastas of Bihar, Bombay's cells, the Satara Prati Sarkar, the Tamluk Jatiya Sarkar and more.",
          link: "frontend/underground-resistance-explorer/index.html#regional"
        },
        {
          id: "underground-resistance-timeline",
          title: "1942–1944, Month by Month",
          description: "From the arrests that created the underground to the suppression that broke it — the full chronology of the leaderless years.",
          link: "frontend/underground-resistance-explorer/index.html#timeline"
        },
        {
          id: "underground-resistance-participants",
          title: "The Faces of the Underground",
          description: "The major participants of the underground: Aruna Asaf Ali, Jayaprakash Narayan, Ram Manohar Lohia, Usha Mehta, Nana Patil and more.",
          link: "frontend/underground-resistance-explorer/index.html#participants"
        },
        {
          id: "underground-resistance-surveillance",
          title: "Hunting the Underground",
          description: "Special Branch, CID and informers: how the Empire hunted the networks, silenced Congress Radio and finally broke the resistance.",
          link: "frontend/underground-resistance-explorer/index.html#surveillance"
        },
        {
          id: "underground-resistance-significance",
          title: "What the Underground Left Behind",
          description: "Why the leaderless years mattered — and the generation of leaders and parallel governments they forged for independent India.",
          link: "frontend/underground-resistance-explorer/index.html#significance"
        }
      ]
    );
  }

  // Run initialization
  initJourney();
});
