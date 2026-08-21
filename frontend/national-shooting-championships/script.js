document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const shooterSelect = document.getElementById("shooter-select");
  const timelineContainer = document.getElementById("achievement-timeline-container");
  const shooterProfile = document.getElementById("shooter-profile");
  const shooterProfileImg = document.getElementById("shooter-profile-img");
  const shooterProfileName = document.getElementById("shooter-profile-name");
  const shooterProfileCategory = document.getElementById("shooter-profile-category");
  const modal = document.getElementById("shooting-modal");
  const modalClose = document.getElementById("shooting-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");
  const galleryItems = [...document.querySelectorAll(".shooting-gallery-item")];
  const scrollTopBtn = document.getElementById("btn-scroll-top");

  // --- Scroll Animations (IntersectionObserver) ---
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.shooting-section, .shooting-card, .shooting-legacy-card, .shooting-timeline-step, ' +
      '.shooting-gallery-item, .shooting-history-img-pair figure, .shooting-achievement-item, ' +
      '.shooting-section-header, .shooting-card-grid > *, .shooting-legacy-grid > *'
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
    const heroImage = document.querySelector('.shooting-hero-image img');
    if (!heroImage) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      heroImage.style.transform = `scale(1.05) translateY(${rate}px)`;
    });
  }

  // --- Shooter Achievement Data ---
  const shooterAchievements = {
    "abhinav-bindra": {
      name: "Abhinav Bindra",
      nickname: "India's Golden Boy",
      category: "Rifle · 10m Air Rifle",
      achievements: [
        { year: 1998, title: "First National Title", details: "Won 10m Air Rifle at Junior Nationals, aged 15", category: "national" },
        { year: 2000, title: "Youth Olympic Silver", details: "Won silver at inaugural Youth Olympics in Sydney", category: "national" },
        { year: 2001, title: "Senior National Title", details: "Won first senior 10m Air Rifle title at age 18", category: "national" },
        { year: 2002, title: "Commonwealth Games Gold", details: "Won 10m Air Rifle gold at Manchester CWG — first senior international gold", category: "commonwealth" },
        { year: 2004, title: "Olympic Debut", details: "Competed at Athens Olympics, finished 7th in 10m Air Rifle", category: "olympic" },
        { year: 2006, title: "World Championship Gold", details: "Won 10m Air Rifle gold at Zagreb — first Indian to win World Championship", category: "world" },
        { year: 2006, title: "Commonwealth Games Double", details: "Won 10m Air Rifle gold + pairs gold at Melbourne CWG", category: "commonwealth" },
        { year: 2008, title: "Historic Olympic Gold — Beijing", details: "Won 10m Air Rifle gold — India's first-ever individual Olympic gold medal", category: "olympic" },
        { year: 2010, title: "Commonwealth Games Double", details: "Won 10m Air Rifle gold + pairs gold at Delhi CWG on home soil", category: "commonwealth" },
        { year: 2012, title: "Olympic Final — London", details: "Finished 4th in 10m Air Rifle, narrowly missing medal", category: "olympic" },
        { year: 2014, title: "Retirement", details: "Retired after Glasgow CWG, ending 16-year competitive career", category: "national" },
      ]
    },
    "manu-bhaker": {
      name: "Manu Bhaker",
      nickname: "The Jhajjar Prodigy",
      category: "Pistol · 10m Air Pistol / 25m Sport Pistol",
      achievements: [
        { year: 2017, title: "First National Title", details: "Won 10m Air Pistol at Junior Nationals, aged 15", category: "national" },
        { year: 2018, title: "Youth Olympic Gold", details: "Won 10m Air Pistol gold at Buenos Aires Youth Olympics", category: "national" },
        { year: 2018, title: "World Cup Gold Debut", details: "Won 10m Air Pistol gold at Guadalajara World Cup, aged 16", category: "world" },
        { year: 2018, title: "Asian Games Mixed Team Gold", details: "Won 10m Air Pistol Mixed Team gold at Jakarta Asian Games with Saurabh Chaudhary", category: "asian" },
        { year: 2019, title: "World Cup Gold Munich", details: "Won 10m Air Pistol gold at Munich World Cup", category: "world" },
        { year: 2021, title: "Olympic Debut — Tokyo", details: "Competed in 10m Air Pistol and Mixed Team, equipment malfunction in individual", category: "olympic" },
        { year: 2022, title: "CWG Gold — Birmingham", details: "Won 25m Sport Pistol gold at Birmingham CWG", category: "commonwealth" },
        { year: 2023, title: "World Championship Silver", details: "Won 25m Sport Pistol silver at Baku World Championships", category: "world" },
        { year: 2024, title: "Historic Double Bronze — Paris", details: "Won bronze in 10m Air Pistol + Mixed Team 10m Air Pistol (with Sarabjot Singh)", category: "olympic" },
      ]
    },
    "gagan-narang": {
      name: "Gagan Narang",
      nickname: "The Rifle Maestro",
      category: "Rifle · 10m Air Rifle / 50m Rifle 3P",
      achievements: [
        { year: 2003, title: "First National Title", details: "Won 10m Air Rifle at Senior Nationals", category: "national" },
        { year: 2006, title: "Commonwealth Games Double", details: "Won 10m Air Rifle gold + pairs gold at Melbourne CWG", category: "commonwealth" },
        { year: 2006, title: "World Cup Final Gold", details: "Won World Cup Final 10m Air Rifle in Granada", category: "world" },
        { year: 2008, title: "Olympic Debut — Beijing", details: "Competed in 10m Air Rifle and 50m Rifle 3P", category: "olympic" },
        { year: 2010, title: "Commonwealth Games Triple", details: "Won 3 golds at Delhi CWG (10m Air Rifle individual + pairs, 50m Rifle 3P pairs)", category: "commonwealth" },
        { year: 2012, title: "Olympic Bronze — London", details: "Won bronze in 10m Air Rifle — India's first London 2012 medal", category: "olympic" },
        { year: 2014, title: "Commonwealth Games Gold", details: "Won 50m Rifle 3P pairs gold at Glasgow CWG", category: "commonwealth" },
        { year: 2016, title: "Final Olympics — Rio", details: "Competed in 10m Air Rifle and 50m Rifle 3P at Rio", category: "olympic" },
      ]
    },
    "rajyavardhan-rathore": {
      name: "Rajyavardhan Singh Rathore",
      nickname: "Colonel Rathore",
      category: "Shotgun · Double Trap",
      achievements: [
        { year: 1995, title: "First National Title", details: "Won Double Trap at Senior Nationals", category: "national" },
        { year: 2002, title: "Asian Games Gold — Busan", details: "Won Double Trap gold at Busan Asian Games", category: "asian" },
        { year: 2003, title: "World Cup Gold — Sydney", details: "Won Double Trap gold at Sydney World Cup", category: "world" },
        { year: 2004, title: "Historic Olympic Silver — Athens", details: "Won silver in Double Trap — India's first individual Olympic medal since 1952", category: "olympic" },
        { year: 2006, title: "Commonwealth Games Gold", details: "Won Double Trap gold at Melbourne CWG", category: "commonwealth" },
        { year: 2006, title: "World Cup Gold — Cairo", details: "Won Double Trap gold at Cairo World Cup", category: "world" },
        { year: 2008, title: "Olympic Final — Beijing", details: "Competed in Double Trap, finished 5th", category: "olympic" },
        { year: 2014, title: "Politics & Sports Administration", details: "Elected MP, served as Minister of State for Youth Affairs & Sports", category: "national" },
      ]
    },
    "avani-lekhara": {
      name: "Avani Lekhara",
      nickname: "India's Golden Girl",
      category: "Para Rifle · R2 10m Air Rifle Standing SH1 / R8 50m Rifle 3P SH1",
      achievements: [
        { year: 2015, title: "Car Accident", details: "Spinal cord injury at age 11, leading to paraplegia", category: "national" },
        { year: 2017, title: "First National Para Title", details: "Won R2 10m Air Rifle Standing SH1 at National Para Championships", category: "national" },
        { year: 2018, title: "World Cup Debut", details: "Won silver at Al Ain World Cup in R2 10m Air Rifle Standing SH1", category: "world" },
        { year: 2019, title: "World Cup Gold — Al Ain", details: "Won R2 10m Air Rifle Standing SH1 gold at Al Ain World Cup", category: "world" },
        { year: 2021, title: "Historic Paralympic Gold — Tokyo", details: "Won R2 10m Air Rifle Standing SH1 gold — India's first woman Paralympic gold", category: "olympic" },
        { year: 2021, title: "Paralympic Bronze — Tokyo", details: "Won R8 50m Rifle 3 Positions SH1 bronze — double medal at Tokyo", category: "olympic" },
        { year: 2022, title: "World Record — Chateauroux", details: "Set world record in R2 10m Air Rifle Standing SH1 (250.6)", category: "world" },
        { year: 2022, title: "Asian Para Games Gold", details: "Won R2 10m Air Rifle Standing SH1 gold at Hangzhou Asian Para Games", category: "asian" },
        { year: 2024, title: "Paris Paralympics", details: "Competed in R2 and R8 events at Paris Paralympics", category: "olympic" },
      ]
    },
    "rahi-sarnobat": {
      name: "Rahi Sarnobat",
      nickname: "Pune's Pistol Queen",
      category: "Pistol · 25m Sport Pistol",
      achievements: [
        { year: 2008, title: "First National Title", details: "Won 25m Sport Pistol at Junior Nationals", category: "national" },
        { year: 2010, title: "Senior National Title", details: "Won 25m Sport Pistol at Senior Nationals", category: "national" },
        { year: 2013, title: "World Cup Gold — Granada", details: "Won 25m Sport Pistol gold at Granada World Cup", category: "world" },
        { year: 2014, title: "Asian Games Silver — Incheon", details: "Won 25m Sport Pistol silver at Incheon Asian Games", category: "asian" },
        { year: 2018, title: "Historic Asian Games Gold — Jakarta", details: "Won 25m Sport Pistol gold — first Indian woman pistol shooter to win Asian Games gold", category: "asian" },
        { year: 2018, title: "Commonwealth Games Gold — Gold Coast", details: "Won 25m Sport Pistol gold at Gold Coast CWG", category: "commonwealth" },
        { year: 2019, title: "World Cup Gold — Munich", details: "Won 25m Sport Pistol gold at Munich World Cup", category: "world" },
        { year: 2021, title: "Olympic Debut — Tokyo", details: "Competed in 25m Sport Pistol at Tokyo Olympics", category: "olympic" },
        { year: 2022, title: "CWG Gold — Birmingham", details: "Won 25m Sport Pistol gold at Birmingham CWG", category: "commonwealth" },
      ]
    },
    "swapnil-kusale": {
      name: "Swapnil Kusale",
      nickname: "Kolhapur's Calm Marksman",
      category: "Rifle · 50m Rifle 3 Positions",
      achievements: [
        { year: 2015, title: "First National Title", details: "Won 50m Rifle 3P at Junior Nationals", category: "national" },
        { year: 2017, title: "Senior National Title", details: "Won 50m Rifle 3P at Senior Nationals", category: "national" },
        { year: 2019, title: "Asian Championships Silver", details: "Won 50m Rifle 3P silver at Doha Asian Championships", category: "asian" },
        { year: 2021, title: "Olympic Debut — Tokyo", details: "Competed in 50m Rifle 3P, finished 15th", category: "olympic" },
        { year: 2022, title: "World Cup Gold — Cairo", details: "Won 50m Rifle 3P gold at Cairo World Cup", category: "world" },
        { year: 2022, title: "Asian Games Silver — Hangzhou", details: "Won 50m Rifle 3P silver at Hangzhou Asian Games", category: "asian" },
        { year: 2023, title: "World Cup Gold — Baku", details: "Won 50m Rifle 3P gold at Baku World Cup", category: "world" },
        { year: 2024, title: "Olympic Bronze — Paris", details: "Won 50m Rifle 3P bronze — India's third shooting medal at Paris 2024", category: "olympic" },
      ]
    },
    "sarabjot-singh": {
      name: "Sarabjot Singh",
      nickname: "The Ambala Ace",
      category: "Pistol · 10m Air Pistol",
      achievements: [
        { year: 2019, title: "First National Title", details: "Won 10m Air Pistol at Senior Nationals", category: "national" },
        { year: 2021, title: "World Cup Silver — New Delhi", details: "Won 10m Air Pistol silver at New Delhi World Cup", category: "world" },
        { year: 2022, title: "Asian Games Gold — Hangzhou", details: "Won 10m Air Pistol Mixed Team gold with Manu Bhaker at Hangzhou Asian Games", category: "asian" },
        { year: 2023, title: "Asian Championships Gold", details: "Won 10m Air Pistol gold at Changwon Asian Championships", category: "asian" },
        { year: 2024, title: "Olympic Bronze — Paris (Mixed Team)", details: "Won 10m Air Pistol Mixed Team bronze with Manu Bhaker at Paris 2024", category: "olympic" },
        { year: 2024, title: "National Title (10m Air Pistol)", details: "Won 10m Air Pistol title at Senior Nationals", category: "national" },
      ]
    },
    "anjali-bhagwat": {
      name: "Anjali Bhagwat",
      nickname: "Pune's Rifle Pioneer",
      category: "Rifle · 10m Air Rifle / 50m Rifle 3P",
      achievements: [
        { year: 1995, title: "First National Title", details: "Won 10m Air Rifle at Senior Nationals, aged 26", category: "national" },
        { year: 1999, title: "World Cup Gold — Milan", details: "Won 10m Air Rifle gold at Milan World Cup — first Indian woman to win World Cup gold", category: "world" },
        { year: 2000, title: "Olympic Final — Sydney", details: "Reached 10m Air Rifle final at Sydney Olympics — first Indian woman in Olympic shooting final", category: "olympic" },
        { year: 2002, title: "Commonwealth Games Gold — Manchester", details: "Won 10m Air Rifle gold at Manchester CWG", category: "commonwealth" },
        { year: 2002, title: "World Cup Final Gold — Munich", details: "Won 10m Air Rifle gold at Munich World Cup Final", category: "world" },
        { year: 2003, title: "Asian Championships Gold", details: "Won 10m Air Rifle gold at Kuala Lumpur Asian Championships", category: "asian" },
        { year: 2003, title: "World Cup Gold — Changwon", details: "Won 10m Air Rifle gold at Changwon World Cup", category: "world" },
        { year: 2004, title: "Olympic Final — Athens", details: "Reached 10m Air Rifle final at Athens Olympics", category: "olympic" },
      ]
    }
  };

  // --- Shooter Image Mapping ---
  const shooterImages = {
    "abhinav-bindra": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Abhinav_Bindra_and_Mary_Kom_-_British_High_Commission%2C_Delhi%2C_27_July_2011_%28cropped%29.jpg/330px-Abhinav_Bindra_and_Mary_Kom_-_British_High_Commission%2C_Delhi%2C_27_July_2011_%28cropped%29.jpg",
    "manu-bhaker": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Paris_Olympics_double_bronze_medalist_Manu_Bhaker_in_August_2024.jpg",
    "gagan-narang": "https://upload.wikimedia.org/wikipedia/commons/1/11/XIX_Commonwealth_Games-2010_Delhi_Gagan_Narang_won_the_Gold_medal_in_%28Men%E2%80%99s%29_Shooting_Rifle_50m_pairs_%28cropped%29.jpg",
    "rajyavardhan-rathore": "https://upload.wikimedia.org/wikipedia/commons/0/09/The_Minister_of_State_for_Youth_Affairs_and_Sports_%28IC%29_and_Information_%26_Broadcasting%2C_Col._Rajyavardhan_Singh_Rathore_addressing_after_felicitating_the_winners_of_the_World_Youth_Boxing_Championship_2017%2C_at_a_function_%28cropped%29.jpg",
    "avani-lekhara": "https://upload.wikimedia.org/wikipedia/commons/8/8a/Avani_Lekhara_in_2022.jpg",
    "rahi-sarnobat": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Rahi_Sarnobat.jpg",
    "swapnil-kusale": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Swapnil_Kusale_in_August_2024_with_his_Paris_Olympics_bronze_medal.jpg",
    "sarabjot-singh": "https://upload.wikimedia.org/wikipedia/commons/7/79/Sarabjot_Singh_in_August_2024_with_his_Paris_Olympics_bronze_medal.jpg",
    "anjali-bhagwat": "../assets/sports/shooting/anjali-bhagwat.jpg"
  };

  // --- Welcome Toast ---
  function showWelcomeToast() {
    if (document.getElementById("shooting-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "shooting-welcome-toast";
    toast.className = "shooting-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>🎯 National Shooting Championships</strong> — Explore 70+ years of Indian shooting history, champions, and Olympic glory.";
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
      const title = "National Shooting Championships Explorer";
      const thumbnail = "frontend/assets/sports/shooting/hero-shooting-range.jpg";
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
          explorerPage: "frontend/national-shooting-championships/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/national-shooting-championships/index.html", [
      {
        id: "shooting-main",
        title: "National Shooting Championships Explorer",
        description: "Explore India's shooting heritage from 1957 to present — champions, disciplines, Olympic medallists, Paralympic heroes, and interactive achievement timelines.",
        link: "frontend/national-shooting-championships/index.html"
      },
      {
        id: "shooting-history",
        title: "Championship History",
        description: "Seven decades of the range — from the 1957 Delhi nationals to modern NRAI era, Services/Railways dominance, and the rise of Haryana/Punjab shooting.",
        link: "frontend/national-shooting-championships/index.html#history"
      },
      {
        id: "shooting-categories",
        title: "Shooting Disciplines",
        description: "Four ISSF disciplines — Rifle, Pistol, Shotgun, and Para Shooting — each with Olympic and Paralympic events.",
        link: "frontend/national-shooting-championships/index.html#categories"
      },
      {
        id: "shooting-champions",
        title: "Major Shooters",
        description: "Abhinav Bindra, Manu Bhaker, Gagan Narang, Rajyavardhan Rathore, Avani Lekhara, Rahi Sarnobat, Swapnil Kusale, Sarabjot Singh, Anjali Bhagwat — national titles and international medals.",
        link: "frontend/national-shooting-championships/index.html#champions"
      },
      {
        id: "shooting-olympic",
        title: "Olympic Connections",
        description: "From LA 1984 to Paris 2024 — how national champions became Olympic medallists: Rathore, Bindra, Narang, Manu Bhaker, Sarabjot, Swapnil, and Paralympic heroes Avani, Manish, Singhraj.",
        link: "frontend/national-shooting-championships/index.html#olympic"
      },
      {
        id: "shooting-milestones",
        title: "Important Milestones",
        description: "Timeline of defining moments: 1957 inaugural nationals, 1961 ISSF affiliation, 2004 Rathore's silver, 2008 Bindra's gold, 2012 double medal, 2020 Paralympic breakthrough, 2024 triple medal.",
        link: "frontend/national-shooting-championships/index.html#milestones"
      },
      {
        id: "shooting-achievement-timeline",
        title: "Interactive Shooter Achievement Timeline",
        description: "Select a shooter to explore their career trajectory — national titles, Asian/Commonwealth/World/Olympic/Paralympic medals on an interactive timeline.",
        link: "frontend/national-shooting-championships/index.html#achievement-timeline"
      }
    ]);
  }

  // --- Achievement Timeline Interactive Feature ---
  function renderAchievementTimeline(shooterKey) {
    const data = shooterAchievements[shooterKey];
    if (!data) {
      timelineContainer.innerHTML = `
        <div class="shooting-timeline-placeholder">
          <p>Select a shooter from the dropdown above to view their interactive achievement timeline.</p>
        </div>
      `;
      if (shooterProfile) shooterProfile.style.display = 'none';
      return;
    }

    // Show shooter profile
    if (shooterProfile && shooterProfileImg && shooterProfileName && shooterProfileCategory) {
      const imgSrc = shooterImages[shooterKey];
      shooterProfileImg.src = imgSrc;
      shooterProfileImg.alt = data.name;
      shooterProfileName.textContent = data.name;
      shooterProfileCategory.textContent = `${data.nickname} · ${data.category}`;
      shooterProfile.style.display = 'flex';
    }

    // Sort achievements by year
    const sortedAchievements = [...data.achievements].sort((a, b) => a.year - b.year);

    let html = `
      <div class="shooting-achievement-header" style="margin-bottom: 30px; padding: 20px; background: var(--shooting-glass); border: 1px solid var(--shooting-border); border-radius: 12px;">
        <h3 style="margin: 0 0 8px; font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--shooting-gold-light);">${data.name}</h3>
        <p style="margin: 0; color: var(--shooting-text-muted);"><em>${data.nickname}</em> · ${data.category}</p>
      </div>
      <div class="shooting-achievement-timeline-content" role="list" aria-label="${data.name}'s career achievements">
    `;

    sortedAchievements.forEach((achievement, index) => {
      html += `
        <div class="shooting-achievement-item" role="listitem">
          <div class="shooting-achievement-marker ${achievement.category}" aria-hidden="true">${getMarkerIcon(achievement.category)}</div>
          <div class="shooting-achievement-card">
            <div class="shooting-achievement-year">${achievement.year}</div>
            <div class="shooting-achievement-title">${achievement.title}</div>
            <div class="shooting-achievement-details">${achievement.details}</div>
            <span class="shooting-achievement-category ${achievement.category}">${formatCategory(achievement.category)}</span>
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
      olympic: "Olympic / Paralympic Games",
      world: "World Championships / World Cup"
    };
    return labels[category] || category;
  }

  // Event listener for shooter select
  if (shooterSelect) {
    shooterSelect.addEventListener("change", (e) => {
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