(function () {
  'use strict';

  /* =======================================================================
     Dasharatha's Promise Explorer — Interactive Logic
     Handles: timeline filtering, character detail board, bookmark integration,
     and scroll-to-top behaviour.
     ======================================================================= */

  /* ---- Character Data ---- */
  var characters = {
    dasharatha: {
      eyebrow: 'The King',
      title: 'Dasharatha — King of Ayodhya',
      desc: 'Dasharatha was the noble and virtuous ruler of Ayodhya, a man whose word was his bond. When his queen Kaikeyi saved his life in battle against the demon Shambara, he granted her two boons — any wishes she might ask. Years later, on the eve of Rama\'s coronation, Kaikeyi demanded those boons: the throne for her son Bharata, and fourteen years of exile for Rama. Bound by dharma, Dasharatha fulfilled the boons and died of a broken heart.',
      verdict: 'A king destroyed by his own honour'
    },
    kaikeyi: {
      eyebrow: 'The Queen',
      title: 'Kaikeyi — The Demand Maker',
      desc: 'Kaikeyi was a warrior queen of the Kekeya kingdom who had once saved Dasharatha\'s life in battle. For this, she received two boons. Years later, coached by her jealous maid Manthara, she demanded those boons on the eve of Rama\'s coronation — the throne for her son Bharata, and exile for Rama. Her demand was not born of evil, but of fear: fear of being sidelined, fear of losing influence. She is remembered both as an antagonist and as a woman trapped by the politics of her time.',
      verdict: 'Fear turned loyalty into betrayal'
    },
    rama: {
      eyebrow: 'The Exiled Prince',
      title: 'Rama — The Ideal Son',
      desc: 'Rama, the eldest son of Dasharatha and the rightful heir to Ayodhya, accepted his father\'s boons without protest. He declared that a son\'s duty was to uphold his father\'s honour, and that he would gladly live in the forest for fourteen years to keep Dasharatha\'s word. With his wife Sita and brother Lakshmana, he walked out of Ayodhya dressed in bark, beginning the exile that would lead to the great events of the Ramayana — the battle with Ravana, and the establishment of Ram Rajya.',
      verdict: 'Dharma incarnate — duty above desire'
    },
    bharata: {
      eyebrow: 'The Reluctant King',
      title: 'Bharata — The Noble Refuser',
      desc: 'Bharata, Kaikeyi\'s son, had not asked for the throne and was furious when he learned what his mother had done. He rejected the crown, marched to the forest, and begged Rama to return. When Rama refused, Bharata accepted rule only as regent, placing Rama\'s sandals on the throne as a symbol of the true king\'s authority. He ruled from Nandigrama, outside the city, waiting fourteen years for his brother\'s return.',
      verdict: 'Legitimacy comes from righteousness, not power'
    },
    manthara: {
      eyebrow: 'The Instigator',
      title: 'Manthara — The Malicious Advisor',
      desc: 'Manthara was Kaikeyi\'s hunchbacked maid who poisoned her mind against Rama. She painted a terrifying future in which Rama\'s coronation would reduce Kaikeyi to a servant, stoking fears that had never existed before. Whether Manthara acted out of genuine loyalty to Kaikeyi, or out of her own malice, her whispered counsels were the spark that set the tragedy in motion.',
      verdict: 'Fear, once planted, grows into destruction'
    },
    sita: {
      eyebrow: 'The Devoted Companion',
      title: 'Sita — The Wife Who Chose Exile',
      desc: 'When Rama was sentenced to exile, Sita refused to remain in Ayodhya. She declared that the forest where Rama lived was her Ayodhya, and that she would rather face danger at his side than comfort without him. Her devotion, courage, and unwavering support made her the ideal companion — and her eventual abduction by Ravana would become the catalyst for the Ramayana\'s greatest battle.',
      verdict: 'Love is not comfort — it is presence'
    },
    lakshmana: {
      eyebrow: 'The Protector',
      title: 'Lakshmana — The Loyal Brother',
      desc: 'Lakshmana, Rama\'s younger brother by Sumitra, insisted on accompanying him into exile. He left behind his own wife Urmila, accepting fourteen years of separation to serve as Rama\'s protector and companion. Throughout the exile, Lakshmana built shelters, stood guard, and fought whenever danger threatened. His devotion to Rama is one of the most celebrated examples of brotherly loyalty in Indian literature.',
      verdict: 'Devilry means standing beside, not behind'
    },
    kausalya: {
      eyebrow: 'The Grieving Mother',
      title: 'Kausalya — Rama\'s Mother',
      desc: 'Kausalya, Dasharatha\'s chief queen and Rama\'s mother, was devastated by her son\'s exile. She had waited years for Rama to be crowned, and now that hope was shattered. Her grief at Rama\'s departure was among the most heartbreaking scenes in the Ramayana — a mother watching her beloved son walk into the forest, powerless to stop it. She remained in Ayodhya, mourning, until Dasharatha\'s death.',
      verdict: 'A mother\'s grief knows no bounds'
    }
  };

  /* ---- Timeline Filtering ---- */
  function initTimelineFilters() {
    var filterBar = document.querySelector('.dpe-filter-bar');
    if (!filterBar) return;

    var buttons = filterBar.querySelectorAll('.dpe-filter-btn');
    var steps = document.querySelectorAll('.dpe-timeline-step');

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
    var nodes = document.querySelectorAll('.dpe-character-node');
    var eyebrow = document.getElementById('dpe-detail-eyebrow');
    var title = document.getElementById('dpe-detail-title');
    var desc = document.getElementById('dpe-detail-desc');
    var verdict = document.getElementById('dpe-detail-verdict');

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
    var btn = document.querySelector('.dpe-bookmark-btn');
    if (!btn) return;

    var bookmarkId = btn.getAttribute('data-bookmark-id') || 'dasharatha-promise-main';
    var bookmarkData = {
      id: bookmarkId,
      title: "Dasharatha's Promise Explorer",
      description: "Explore the story of Dasharatha's fateful promises to Kaikeyi that led to Rama's exile.",
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
