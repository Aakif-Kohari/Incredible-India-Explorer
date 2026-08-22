document.addEventListener('app:route-changed', () => {
  const filterBar = document.getElementById('filter-bar');
  const championsGrid = document.getElementById('champions-grid');
  const noResults = document.getElementById('no-results');
  const modal = document.getElementById('badminton-modal');
  const modalClose = document.getElementById('badminton-modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalHeading = document.getElementById('modal-heading');
  const modalDescription = document.getElementById('modal-description');
  const scrollTopBtn = document.getElementById('btn-scroll-top');

  const champions = [
    { name: 'Saina Nehwal', category: 'ws', discipline: "Women's Singles", titles: '3 (2010, 2015, 2017)', highlight: 'Olympic Bronze (London 2012), Career-high World No. 1' },
    { name: 'Kidambi Srikanth', category: 'ms', discipline: "Men's Singles", titles: '2 (2017, 2018)', highlight: 'Career-high World No. 1, 4 Super Series titles in 2017' },
    { name: 'Lakshya Sen', category: 'ms', discipline: "Men's Singles", titles: '2 (2022, 2023)', highlight: 'Career-high World No. 6, Thomas Cup 2022 champion' },
    { name: 'P.V. Sindhu', category: 'ws', discipline: "Women's Singles", titles: '1 (2017)', highlight: 'Olympic Silver (Rio 2016), Bronze (Tokyo 2020), World Champion (2019)' },
    { name: 'Satwiksairaj Rankireddy & Chirag Shetty', category: 'md', discipline: "Men's Doubles", titles: '2 (2022, 2024)', highlight: 'World No. 1 ranking, Asian Games Gold (2023)' },
    { name: 'Treesa Jolly & Gayatri Gopichand', category: 'wd', discipline: "Women's Doubles", titles: '1 (2023)', highlight: "First Indian women's doubles pair to win India Open" },
    { name: 'Viktor Axelsen', category: 'ms', discipline: "Men's Singles", titles: '1 (2019)', highlight: 'Olympic Gold (Tokyo 2020), 3x World Champion' },
    { name: 'Tai Tzu-ying', category: 'ws', discipline: "Women's Singles", titles: '3 (2017, 2019, 2023)', highlight: 'No. 1 for 200+ weeks, Olympic Silver (Tokyo 2020)' },
    { name: 'Carolina Marin', category: 'ws', discipline: "Women's Singles", titles: '1 (2019)', highlight: 'Olympic Gold (Rio 2016), 3x World Champion' },
    { name: 'Zheng Siwei & Huang Yaqiong', category: 'xd', discipline: "Mixed Doubles", titles: '2 (2018, 2023)', highlight: 'Olympic Gold (Paris 2024), World No. 1 (2018-2024)' },
    { name: 'Yuta Watanabe & Arisa Higashino', category: 'xd', discipline: "Mixed Doubles", titles: '1 (2022)', highlight: 'Olympic Bronze (Tokyo 2020)' },
    { name: 'Fajar Alfian & Muhammad Rian', category: 'md', discipline: "Men's Doubles", titles: '1 (2023)', highlight: 'Asian Games Gold (2023)' },
    { name: 'Lee Yong-dae & Yoo Yeon-seong', category: 'md', discipline: "Men's Doubles", titles: '2 (2014, 2015)', highlight: 'Olympic Gold (London 2012, Lee), World No. 1' },
    { name: 'Kunlavut Vitidsarn', category: 'ms', discipline: "Men's Singles", titles: '2 (2023, 2024)', highlight: 'World Champion (2023), Olympic Gold (Paris 2024)' },
    { name: 'An Se-young', category: 'ws', discipline: "Women's Singles", titles: '1 (2024)', highlight: 'Olympic Gold (Paris 2024), World No. 1' },
  ];

  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.badminton-section, .badminton-card, .badminton-timeline-step, ' +
      '.badminton-gallery-item, .badminton-history-img-pair figure, ' +
      '.badminton-section-header, .badminton-card-grid > *, .badminton-legacy-grid > *, .badminton-milestone-card'
    );
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    animatedElements.forEach((el) => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  }

  function initScrollToTop() {
    if (!scrollTopBtn) return;
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function initParallax() {
    const heroImage = document.querySelector('.badminton-hero-image img');
    if (!heroImage) return;
    window.addEventListener('scroll', () => {
      heroImage.style.transform = 'scale(1.05) translateY(' + (window.scrollY * 0.3) + 'px)';
    });
  }

  function renderChampions(filter) {
    const filtered = filter === 'all' ? champions : champions.filter(c => c.category === filter);
    if (filtered.length === 0) {
      championsGrid.innerHTML = '';
      noResults.style.display = 'block';
      return;
    }
    noResults.style.display = 'none';
    championsGrid.innerHTML = filtered.map(c =>
      '<div class="badminton-card badminton-card-champion" data-title="' + c.name + '" data-discipline="' + c.discipline + '" data-titles="' + c.titles + '" data-highlight="' + c.highlight + '">' +
      '<span class="badminton-card-icon">🏸</span>' +
      '<h3>' + c.name + '</h3>' +
      '<ul>' +
      '<li><strong>Discipline</strong> — ' + c.discipline + '</li>' +
      '<li><strong>India Open Titles</strong> — ' + c.titles + '</li>' +
      '<li><strong>Highlight</strong> — ' + c.highlight + '</li>' +
      '</ul>' +
      '</div>'
    ).join('');
  }

  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.badminton-filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.badminton-filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderChampions(btn.dataset.filter);
    });
  }

  function showWelcomeToast() {
    if (document.getElementById('badminton-welcome-toast')) return;
    const toast = document.createElement('div');
    toast.id = 'badminton-welcome-toast';
    toast.className = 'badminton-welcome-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = '<strong>🏸 India Open Badminton Archive</strong> — Explore 16+ years of India\'s premier BWF Super 750 badminton tournament, champions, and iconic matches.';
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    setTimeout(() => {
      toast.classList.remove('is-visible');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }
  showWelcomeToast();

  function initJourney() {
    if (!window.Journey) return;
    window.Journey.registerSearchItems('frontend/india-open-badminton-explorer/index.html', [
      { id: 'badminton-main', title: 'India Open Badminton Archive', description: "Explore India's premier BWF Super 750 badminton tournament from 2008 to present.", link: 'frontend/india-open-badminton-explorer/index.html' },
      { id: 'badminton-history', title: 'Tournament History', description: 'From 2008 Grand Prix to Super 750 — the rise of the India Open.', link: 'frontend/india-open-badminton-explorer/index.html#history' },
      { id: 'badminton-champions', title: 'Champions by Category', description: 'Filter MS, WS, MD, WD, XD champions across all editions.', link: 'frontend/india-open-badminton-explorer/index.html#champions' },
      { id: 'badminton-venues', title: 'Historic Venues', description: "India's premier indoor badminton facilities that hosted the tournament.", link: 'frontend/india-open-badminton-explorer/index.html#venues' },
    ]);
  }

  let lastFocusedElement = null;

  function openModal(item) {
    lastFocusedElement = item;
    modalTitle.textContent = item.dataset.title;
    modalHeading.textContent = item.dataset.category === 'legend' ? 'Legendary Champion' :
                              item.dataset.category === 'current' ? 'Current Star' : 'Championship Event';
    modalDescription.textContent = item.dataset.desc;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  const galleryItems = [...document.querySelectorAll('.badminton-gallery-item')];
  galleryItems.forEach((item) => {
    item.setAttribute('tabindex', '0');
    item.addEventListener('click', () => openModal(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(item); }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeModal();
  });

  initJourney();
  renderChampions('all');
  initScrollAnimations();
  initScrollToTop();
  initParallax();
});