(function () {
  'use strict';

  /* =======================================================================
     Gajendra Moksha Explorer — Interactive Logic
     Handles: timeline filtering, character detail board, bookmark integration,
     and scroll-to-top behaviour.
     ======================================================================= */

  /* ---- Character Data ---- */
  const characters = {
    gajendra: {
      eyebrow: 'The Devotee',
      title: 'Gajendra — Elephant King',
      desc: 'Gajendra was King Indradyumna reborn as an elephant after being cursed by sage Agastya. Despite his animal form, he retained his devotion to Vishnu and ruled a vast herd on the slopes of Mount Mandara. After a thousand years of suffering in the crocodile\'s grip, he finally surrendered his ego and offered a lotus to the sky, calling upon Vishnu with the mantra "Om Namo Bhagavate Vasudevaya."',
      verdict: 'Symbol of the surrendered soul'
    },
    huhu: {
      eyebrow: 'The Adversary',
      title: 'Huhu — The Crocodile',
      desc: 'Huhu was a Gandharva (celestial musician) cursed by sage Devala to be born as a crocodile. He became the instrument of Gajendra\'s suffering — seizing the elephant\'s leg in the sacred Lake Padma and holding on for a thousand years. Though an antagonist, Huhu also achieved liberation: upon being slain by Vishnu\'s Sudarshana Chakra, he was freed from his curse and restored to his Gandharva form.',
      verdict: 'Cursed instrument of divine plan'
    },
    vishnu: {
      eyebrow: 'The Liberator',
      title: 'Lord Vishnu — The Protector',
      desc: 'Vishnu, the preserver deity of the Hindu trinity, descended from his eternal abode Vaikuntha upon hearing Gajendra\'s sincere prayer. Riding his mount Garuda, he arrived in a blaze of divine light, held Gajendra\'s trunk, and slew the crocodile with his Sudarshana Chakra. His arrival represents the theological core of the story: God never abandons a devotee who surrenders completely.',
      verdict: 'He who responds to every sincere call'
    },
    sridevi: {
      eyebrow: 'The Divine Mother',
      title: 'Sridevi (Lakshmi) — Vishnu\'s Consort',
      desc: 'Sridevi, or Lakshmi, accompanied Vishnu when he descended to rescue Gajendra. She is the goddess of prosperity, fortune, and divine grace. Her presence in the narrative underscores that divine compassion is not singular but multifaceted — she embodies the nurturing, protective aspect of grace that accompanies Vishnu\'s decisive action.',
      verdict: 'Grace that accompanies liberation'
    },
    indradyumna: {
      eyebrow: 'The Past Life',
      title: 'King Indradyumna — The Original Devotee',
      desc: 'Indradyumna was a righteous king and devoted worshipper of Vishnu in a previous life. When he failed to properly honour sage Agastya, the sage cursed him to be reborn as an elephant. Despite the curse, his devotion was undiminished — and this devotion persisted through his incarnation as Gajendra, ultimately leading to his liberation and restoration to his divine form in Vaikuntha.',
      verdict: 'Devotion outlasts any incarnation'
    }
  };

  /* ---- Timeline Filtering ---- */
  function initTimelineFilters() {
    var filterBar = document.querySelector('.gme-filter-bar');
    if (!filterBar) return;

    var buttons = filterBar.querySelectorAll('.gme-filter-btn');
    var steps = document.querySelectorAll('.gme-timeline-step');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var phase = this.getAttribute('data-phase');

        buttons.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');

        steps.forEach(function (step) {
          if (phase === 'all' || step.getAttribute('data-phase') === phase) {
            step.classList.remove('is-filtered-out');
          } else {
            step.classList.add('is-filtered-out');
          }
        });
      });
    });
  }

  /* ---- Character Board ---- */
  function initCharacterBoard() {
    var nodes = document.querySelectorAll('.gme-character-node');
    var eyebrow = document.getElementById('gme-detail-eyebrow');
    var title = document.getElementById('gme-detail-title');
    var desc = document.getElementById('gme-detail-desc');
    var verdict = document.getElementById('gme-detail-verdict');

    if (!nodes.length || !title) return;

    nodes.forEach(function (node) {
      node.addEventListener('click', function () {
        var key = this.getAttribute('data-character');
        var data = characters[key];
        if (!data) return;

        nodes.forEach(function (n) {
          n.classList.remove('active');
          n.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');

        if (eyebrow) eyebrow.textContent = data.eyebrow;
        title.textContent = data.title;
        desc.textContent = data.desc;
        if (verdict) verdict.textContent = data.verdict;
      });
    });
  }

  /* ---- Bookmark Integration ---- */
  function initBookmark() {
    var btn = document.querySelector('.gme-bookmark-btn');
    if (!btn) return;

    var bookmarkId = btn.getAttribute('data-bookmark-id') || 'gajendra-moksha-main';
    var bookmarkData = {
      id: bookmarkId,
      title: 'Gajendra Moksha Explorer',
      description: 'Explore the story of Gajendra\'s call for divine help from Lord Vishnu.',
      category: 'Culture & Mythology',
      image: '',
      link: window.location.href
    };

    function updateButtonState() {
      var saved = window.Journey && typeof window.Journey.isSaved === 'function'
        ? window.Journey.isSaved(bookmarkId)
        : false;
      btn.classList.toggle('is-saved', saved);
      btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
      btn.innerHTML = saved
        ? '&#10084; Saved to Journey'
        : '&#9825; Save to Journey';
    }

    updateButtonState();

    btn.addEventListener('click', function () {
      if (!window.Journey || typeof window.Journey.toggle !== 'function') {
        btn.textContent = 'Journey not loaded';
        setTimeout(updateButtonState, 1500);
        return;
      }
      window.Journey.toggle(bookmarkData);
      updateButtonState();
    });
  }

  /* ---- Scroll-to-Top ---- */
  function initScrollTop() {
    var scrollBtn = document.getElementById('btn-scroll-top');
    if (!scrollBtn) return;

    window.addEventListener('scroll', function () {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Init ---- */
  document.addEventListener('DOMContentLoaded', function () {
    initTimelineFilters();
    initCharacterBoard();
    initBookmark();
    initScrollTop();
  });
})();
