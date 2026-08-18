document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const boxerSelect = document.getElementById("boxer-select");
  const timelineContainer = document.getElementById("achievement-timeline-container");
  const boxerProfile = document.getElementById("boxer-profile");
  const boxerProfileImg = document.getElementById("boxer-profile-img");
  const boxerProfileName = document.getElementById("boxer-profile-name");
  const boxerProfileCategory = document.getElementById("boxer-profile-category");
  const modal = document.getElementById("boxing-modal");
  const modalClose = document.getElementById("boxing-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");
  const galleryItems = [...document.querySelectorAll(".boxing-gallery-item")];
  const scrollTopBtn = document.getElementById("btn-scroll-top");

  // --- Scroll Animations (IntersectionObserver) ---
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.boxing-section, .boxing-card, .boxing-legacy-card, .boxing-timeline-step, ' +
      '.boxing-gallery-item, .boxing-history-img-pair figure, .boxing-achievement-item, ' +
      '.boxing-section-header, .boxing-card-grid > *, .boxing-legacy-grid > *'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach((el) => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  }

  // --- Scroll to Top Button ---
  function initScrollToTop() {
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Parallax Effect on Hero ---
  function initParallax() {
    const heroImage = document.querySelector('.boxing-hero-image img');
    if (!heroImage) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      heroImage.style.transform = `scale(1.05) translateY(${rate}px)`;
    });
  }

  // --- Boxer Achievement Data ---
  const boxerAchievements = {
    "mary-kom": {
      name: "M. C. Mary Kom",
      nickname: "Magnificent Mary",
      category: "48–51 kg (Light Flyweight / Flyweight)",
      achievements: [
        { year: 2001, title: "First National Title", details: "Won 46 kg title at inaugural Women's Nationals in Chennai", category: "national" },
        { year: 2002, title: "First World Championship Gold", details: "Won 45 kg gold at Antalya World Championships — India's first women's world title", category: "world" },
        { year: 2003, title: "Asian Championships Gold", details: "Won 46 kg gold at Hissar Asian Championships", category: "asian" },
        { year: 2005, title: "Third World Gold", details: "Won 46 kg gold at Podolsk World Championships", category: "world" },
        { year: 2006, title: "Fourth World Gold", details: "Won 46 kg gold at New Delhi World Championships (home soil)", category: "world" },
        { year: 2008, title: "Fifth World Gold", details: "Won 46 kg gold at Ningbo World Championships", category: "world" },
        { year: 2010, title: "Sixth World Gold", details: "Won 48 kg gold at Bridgetown World Championships", category: "world" },
        { year: 2010, title: "Asian Games Gold", details: "Won 51 kg gold at Guangzhou Asian Games", category: "asian" },
        { year: 2012, title: "Olympic Bronze Medal", details: "Won bronze in 51 kg at London Olympics — India's first women's boxing medal", category: "olympic" },
        { year: 2014, title: "Asian Games Gold", details: "Won 51 kg gold at Incheon Asian Games", category: "asian" },
        { year: 2018, title: "Commonwealth Games Gold", details: "Won 48 kg gold at Gold Coast CWG — first Indian woman boxer to win CWG gold", category: "commonwealth" },
        { year: 2018, title: "Sixth World Gold (48 kg)", details: "Won 48 kg gold at New Delhi World Championships — record 6th world title", category: "world" },
      ]
    },
    "vijender-singh": {
      name: "Vijender Singh",
      nickname: "The Haryana Hurricane",
      category: "75 kg (Middleweight)",
      achievements: [
        { year: 2003, title: "First National Title", details: "Won middleweight title at Senior Nationals", category: "national" },
        { year: 2006, title: "Asian Games Bronze", details: "Won middleweight bronze at Doha Asian Games", category: "asian" },
        { year: 2008, title: "Olympic Bronze Medal", details: "Historic bronze at Beijing Olympics — India's first ever Olympic boxing medal", category: "olympic" },
        { year: 2009, title: "World Championships Bronze", details: "Won middleweight bronze at Milan World Championships", category: "world" },
        { year: 2010, title: "Commonwealth Games Gold", details: "Won middleweight gold at New Delhi CWG", category: "commonwealth" },
        { year: 2010, title: "Asian Games Gold", details: "Won middleweight gold at Guangzhou Asian Games", category: "asian" },
        { year: 2014, title: "Commonwealth Games Silver", details: "Won middleweight silver at Glasgow CWG", category: "commonwealth" },
        { year: 2015, title: "Turned Professional", details: "Signed professional contract; won WBO Asia Pacific & Oriental titles", category: "national" },
      ]
    },
    "nikhat-zareen": {
      name: "Nikhat Zareen",
      nickname: "The Nizam's Pride",
      category: "50–52 kg (Light Flyweight / Flyweight)",
      achievements: [
        { year: 2011, title: "Youth National Title", details: "Won gold at Junior/Youth Nationals", category: "national" },
        { year: 2019, title: "First Senior National Title", details: "Won 51 kg title at Senior Nationals", category: "national" },
        { year: 2019, title: "Asian Championships Bronze", details: "Won 51 kg bronze at Bangkok Asian Championships", category: "asian" },
        { year: 2022, title: "Strandja Memorial Gold", details: "Won 52 kg gold at Sofia Strandja Tournament", category: "national" },
        { year: 2022, title: "World Championship Gold", details: "Won 52 kg gold at Istanbul World Championships — 5th Indian woman world champion", category: "world" },
        { year: 2022, title: "Commonwealth Games Gold", details: "Won 50 kg gold at Birmingham CWG", category: "commonwealth" },
        { year: 2023, title: "Second World Championship Gold", details: "Defended 50 kg title at New Delhi World Championships — 2nd world gold", category: "world" },
        { year: 2023, title: "Asian Games Bronze", details: "Won 50 kg bronze at Hangzhou Asian Games", category: "asian" },
        { year: 2024, title: "Paris Olympics Qualification", details: "Qualified for Paris 2024 in 50 kg category", category: "olympic" },
      ]
    },
    "lovlina-borgohain": {
      name: "Lovlina Borgohain",
      nickname: "Assam's Golden Girl",
      category: "69–75 kg (Welterweight / Middleweight)",
      achievements: [
        { year: 2017, title: "First National Title", details: "Won 69 kg title at Senior Nationals", category: "national" },
        { year: 2018, title: "World Championships Bronze", details: "Won 69 kg bronze at New Delhi World Championships", category: "world" },
        { year: 2019, title: "World Championships Bronze", details: "Won 69 kg bronze at Ulan-Ude World Championships", category: "world" },
        { year: 2020, title: "Olympic Bronze Medal", details: "Won 69 kg bronze at Tokyo Olympics — India's 2nd Olympic boxing medal", category: "olympic" },
        { year: 2022, title: "Commonwealth Games Bronze", details: "Won 70 kg bronze at Birmingham CWG", category: "commonwealth" },
        { year: 2022, title: "Asian Championships Gold", details: "Won 75 kg gold at Amman Asian Championships", category: "asian" },
        { year: 2023, title: "Asian Games Silver", details: "Won 75 kg silver at Hangzhou Asian Games", category: "asian" },
        { year: 2024, title: "Paris Olympics", details: "Competing in 75 kg at Paris Olympics", category: "olympic" },
      ]
    },
    "amit-panghal": {
      name: "Amit Panghal",
      nickname: "The Rohtak Rock",
      category: "51–52 kg (Flyweight)",
      achievements: [
        { year: 2017, title: "First National Title", details: "Won 49 kg title at Senior Nationals", category: "national" },
        { year: 2018, title: "Asian Games Gold", details: "Won 49 kg gold at Jakarta Asian Games — defeated Olympic champion Hasanboy Dusmatov", category: "asian" },
        { year: 2018, title: "Commonwealth Games Silver", details: "Won 49 kg silver at Gold Coast CWG", category: "commonwealth" },
        { year: 2019, title: "World Championships Silver", details: "Won 52 kg silver at Yekaterinburg World Championships — first Indian male world silver", category: "world" },
        { year: 2021, title: "Olympic Debut", details: "Competed at Tokyo Olympics in 52 kg", category: "olympic" },
        { year: 2022, title: "Commonwealth Games Gold", details: "Won 51 kg gold at Birmingham CWG", category: "commonwealth" },
        { year: 2022, title: "Asian Championships Gold", details: "Won 52 kg gold at Amman Asian Championships", category: "asian" },
      ]
    },
    "shiva-thapa": {
      name: "Shiva Thapa",
      nickname: "Assam's Flash",
      category: "54–57 kg (Bantamweight / Featherweight)",
      achievements: [
        { year: 2012, title: "First National Title", details: "Won 56 kg title at Senior Nationals", category: "national" },
        { year: 2013, title: "Asian Championships Gold", details: "Won 56 kg gold at Amman Asian Championships", category: "asian" },
        { year: 2014, title: "Asian Games Gold", details: "Won 56 kg gold at Incheon Asian Games", category: "asian" },
        { year: 2015, title: "World Championships Bronze", details: "Won 56 kg bronze at Doha World Championships", category: "world" },
        { year: 2018, title: "Asian Games Silver", details: "Won 60 kg silver at Jakarta Asian Games", category: "asian" },
        { year: 2018, title: "Commonwealth Games Silver", details: "Won 60 kg silver at Gold Coast CWG", category: "commonwealth" },
        { year: 2021, title: "Asian Championships Silver", details: "Won 64 kg silver at Dubai Asian Championships", category: "asian" },
        { year: 2022, title: "Multiple National Titles", details: "5+ Senior National titles across weight categories", category: "national" },
      ]
    },
    "sarita-devi": {
      name: "L. Sarita Devi",
      nickname: "Manipur's Iron Lady",
      category: "60 kg (Lightweight)",
      achievements: [
        { year: 2001, title: "Early National Title", details: "Won at inaugural Women's Nationals", category: "national" },
        { year: 2006, title: "World Championship Gold", details: "Won 60 kg gold at New Delhi World Championships", category: "world" },
        { year: 2014, title: "Asian Games Gold", details: "Won 60 kg gold at Incheon Asian Games", category: "asian" },
        { year: 2014, title: "Commonwealth Games Silver", details: "Won 60 kg silver at Glasgow CWG (controversial decision)", category: "commonwealth" },
        { year: 2018, title: "Multiple National Titles", details: "6+ Senior National titles in 60 kg category", category: "national" },
        { year: 2018, title: "Asian Championships Bronze", details: "Won 60 kg bronze at Bangkok Asian Championships", category: "asian" },
      ]
    },
    "manish-kaushik": {
      name: "Manish Kaushik",
      nickname: "The Bhiwani Boxer",
      category: "60–63.5 kg (Lightweight / Light Welterweight)",
      achievements: [
        { year: 2018, title: "First National Title", details: "Won 60 kg title at Senior Nationals", category: "national" },
        { year: 2018, title: "Commonwealth Games Silver", details: "Won 60 kg silver at Gold Coast CWG", category: "commonwealth" },
        { year: 2019, title: "Asian Championships Silver", details: "Won 63 kg silver at Bangkok Asian Championships", category: "asian" },
        { year: 2021, title: "Olympic Debut", details: "Competed at Tokyo Olympics in 63 kg", category: "olympic" },
        { year: 2022, title: "National Title (63.5 kg)", details: "Won 63.5 kg title at Senior Nationals", category: "national" },
        { year: 2023, title: "Asian Games Bronze", details: "Won 63.5 kg bronze at Hangzhou Asian Games", category: "asian" },
      ]
    }
  };
  // --- Boxer Image Mapping ---
  const boxerImages = {
    "mary-kom": "../assets/sports/boxing/mary-kom.jpg",
    "vijender-singh": "../assets/sports/boxing/vijender-singh.jpg",
    "nikhat-zareen": "../assets/sports/boxing/nikhat-zareen.jpg",
    "lovlina-borgohain": "../assets/sports/boxing/lovlina-borgohain.jpg",
    "amit-panghal": "../assets/sports/boxing/amit-panghal.jpg",
    "shiva-thapa": "../assets/sports/boxing/shiva-thapa.jpg",
    "sarita-devi": "../assets/sports/boxing/sarita-devi.jpg",
    "manish-kaushik": "../assets/sports/boxing/vijender-singh.jpg"
  };

  // --- Welcome Toast ---
  function showWelcomeToast() {
    if (document.getElementById("boxing-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "boxing-welcome-toast";
    toast.className = "boxing-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>🥊 National Boxing Championships</strong> — Explore 70+ years of Indian boxing history, champions, and Olympic glory.";
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("is-visible"));

    setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.addEventListener("transitionend", () => toast.remove(), { once: true });
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }

  showWelcomeToast();

  // --- Journey Integration (Bookmarks & Global Search) ---
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "National Boxing Championships Explorer";
      const thumbnail = "frontend/assets/boxing_hero.jpg";
      const category = "sports";

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
          explorerPage: "frontend/national-boxing-championships-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/national-boxing-championships-explorer/index.html", [
      {
        id: "boxing-main",
        title: "National Boxing Championships Explorer",
        description: "Explore India's boxing heritage from 1950 to present — champions, categories, women's boxing, Olympic medallists, and interactive achievement timelines.",
        link: "frontend/national-boxing-championships-explorer/index.html"
      },
      {
        id: "boxing-history",
        title: "Championship History",
        description: "Seven decades of the ring — from the 1950 Bombay nationals to modern BFI era, Services dominance, and the rise of Haryana/Punjab boxing.",
        link: "frontend/national-boxing-championships-explorer/index.html#history"
      },
      {
        id: "boxing-categories",
        title: "Weight Categories",
        description: "12 men's and 12 women's Olympic-aligned weight categories — from Minimumweight to Super Heavyweight.",
        link: "frontend/national-boxing-championships-explorer/index.html#categories"
      },
      {
        id: "boxing-champions-men",
        title: "Men's Champions",
        description: "Vijender Singh, Shiva Thapa, Amit Panghal, Manish Kaushik, Hussamuddin Mohammed, Naman Tanwar — national titles and international medals.",
        link: "frontend/national-boxing-championships-explorer/index.html#champions-men"
      },
      {
        id: "boxing-womens",
        title: "Women's Boxing",
        description: "Mary Kom, Nikhat Zareen, Lovlina Borgohain, Sarita Devi, Simranjit Kaur, Jaismine Lamboria — pioneers and champions since 2001.",
        link: "frontend/national-boxing-championships-explorer/index.html#womens-boxing"
      },
      {
        id: "boxing-olympic",
        title: "Olympic Connections",
        description: "From Barcelona 1992 to Paris 2024 — how national champions became Olympic medallists: Vijender, Mary Kom, Lovlina, and the Tokyo/Paris squads.",
        link: "frontend/national-boxing-championships-explorer/index.html#olympic"
      },
      {
        id: "boxing-milestones",
        title: "Important Milestones",
        description: "Timeline of defining moments: 1950 inaugural nationals, 2001 women's nationals, 2008 Vijender's bronze, 2012 Mary Kom's bronze, 2016 BFI formation, 2022/2023 Nikhat's world golds.",
        link: "frontend/national-boxing-championships-explorer/index.html#milestones"
      },
      {
        id: "boxing-achievement-timeline",
        title: "Interactive Boxer Achievement Timeline",
        description: "Select a boxer to explore their career trajectory — national titles, Asian/Commonwealth/World/Olympic medals on an interactive timeline.",
        link: "frontend/national-boxing-championships-explorer/index.html#achievement-timeline"
      }
    ]);
  }

  // --- Achievement Timeline Interactive Feature ---
  function renderAchievementTimeline(boxerKey) {
    const data = boxerAchievements[boxerKey];
    if (!data) {
      timelineContainer.innerHTML = `
        <div class="boxing-timeline-placeholder">
          <p>Select a boxer from the dropdown above to view their interactive achievement timeline.</p>
        </div>
      `;
      if (boxerProfile) boxerProfile.style.display = 'none';
      return;
    }

    // Show boxer profile
    if (boxerProfile && boxerProfileImg && boxerProfileName && boxerProfileCategory) {
      const imgSrc = boxerImages[boxerKey];
      boxerProfileImg.src = imgSrc;
      boxerProfileImg.alt = data.name;
      boxerProfileName.textContent = data.name;
      boxerProfileCategory.textContent = `${data.nickname} · ${data.category}`;
      boxerProfile.style.display = 'flex';
    }

    // Sort achievements by year
    const sortedAchievements = [...data.achievements].sort((a, b) => a.year - b.year);

    let html = `
      <div class="boxing-achievement-header" style="margin-bottom: 30px; padding: 20px; background: var(--boxing-glass); border: 1px solid var(--boxing-border); border-radius: 12px;">
        <h3 style="margin: 0 0 8px; font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--boxing-gold-light);">${data.name}</h3>
        <p style="margin: 0; color: var(--boxing-text-muted);"><em>${data.nickname}</em> · ${data.category}</p>
      </div>
      <div class="boxing-achievement-timeline-content" role="list" aria-label="${data.name}'s career achievements">
    `;

    sortedAchievements.forEach((achievement, index) => {
      html += `
        <div class="boxing-achievement-item" role="listitem">
          <div class="boxing-achievement-marker ${achievement.category}" aria-hidden="true">${getMarkerIcon(achievement.category)}</div>
          <div class="boxing-achievement-card">
            <div class="boxing-achievement-year">${achievement.year}</div>
            <div class="boxing-achievement-title">${achievement.title}</div>
            <div class="boxing-achievement-details">${achievement.details}</div>
            <span class="boxing-achievement-category ${achievement.category}">${formatCategory(achievement.category)}</span>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    timelineContainer.innerHTML = html;
  }

  function getMarkerIcon(category) {
    const icons = {
      national: "🏆",
      asian: "🥈",
      commonwealth: "🥉",
      olympic: "🏅",
      world: "🌍"
    };
    return icons[category] || "⭐";
  }

  function formatCategory(category) {
    const labels = {
      national: "National Championships",
      asian: "Asian Games / Championships",
      commonwealth: "Commonwealth Games",
      olympic: "Olympic Games",
      world: "World Championships"
    };
    return labels[category] || category;
  }

  // Event listener for boxer select
  if (boxerSelect) {
    boxerSelect.addEventListener("change", (e) => {
      renderAchievementTimeline(e.target.value);
    });
  }

  // --- Gallery Modal Logic ---
  let lastFocusedElement = null;

  function openModal(item) {
    lastFocusedElement = item;

    modalTitle.textContent = item.dataset.title;
    modalHeading.textContent = item.dataset.category === "legend" ? "Legendary Champion" : 
                              item.dataset.category === "current" ? "Current Star" : "Championship Event";
    modalDescription.textContent = item.dataset.desc;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // Bind gallery click events
  galleryItems.forEach((item) => {
    item.setAttribute("tabindex", "0");
    item.addEventListener("click", () => openModal(item));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(item);
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // --- Run initialization ---
  initJourney();
  renderAchievementTimeline(""); // Show placeholder initially
  initScrollAnimations();
  initScrollToTop();
  initParallax();
});