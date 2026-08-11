/**
 * Indian Lacquerware Explorer JavaScript Logic
 */
(function() {
  'use strict';

  // Detailed descriptions for each process step, keyed by data-step
  const processDetails = {
    'wood': {
      title: 'Wood Selection & Seasoning',
      medium: 'Ivory-wood, rubber wood & local softwoods',
      description: 'Craftspeople choose soft, fine-grained, easily turned woods ? ivory-wood (hale mara) in Karnataka, and comparable local softwoods elsewhere. Logs are cut to size and seasoned for weeks so the finished piece resists cracking and warping.'
    },
    'turning': {
      title: 'Lathe Turning',
      medium: 'Hand-driven or power-driven wood lathe',
      description: 'The seasoned wood block is mounted on a lathe and spun at speed while the artisan uses a variety of chisels to carve it into the desired form ? a doll, spinning top, bangle core, or bowl ? entirely by eye and feel.'
    },
    'lac-prep': {
      title: 'Lac Preparation',
      medium: 'Raw lac resin, natural & mineral pigments, beroza',
      description: 'Raw lac harvested from host trees is cleaned of bark and impurities, then melted and kneaded with vegetable or mineral pigments and a binding resin such as beroza, producing rods of vividly coloured lac.'
    },
    'application': {
      title: 'Lac Application',
      medium: 'Coloured lac sticks pressed on a spinning surface',
      description: 'While the wood continues spinning on the lathe, the artisan presses a coloured lac stick directly against it. Friction generates enough heat to melt the resin, which spreads into a thin, even, glossy coat across the surface.'
    },
    'polish': {
      title: 'Polishing',
      medium: 'Dried palm leaf, wood shaving or wax cloth',
      description: 'A dried palm leaf or soft shaving is held against the still-rotating, lac-coated piece. The friction smooths and buffs the resin into the glassy, jewel-like sheen that lacquerware is prized for.'
    },
    'finishing': {
      title: 'Detailing & Finishing',
      medium: 'Hand tools, and in some traditions, gold leaf',
      description: 'Once removed from the lathe, pieces are hand-finished, inspected, and ? in styles such as Nirmal ? further decorated with fine gold-leaf motifs or painted detail before they are ready for use.'
    }
  };

  // Lacquerware Product Gallery Data
  const lacProducts = [
    {
      id: 'channapatna-toys',
      title: 'Channapatna Wooden Toys',
      region: 'Channapatna, Karnataka',
      medium: 'Ivory-wood turned on a lathe, coloured with lac & vegetable dyes',
      description: 'Rounded, brightly coloured dolls, animals, spinning tops, and stacking toys, valued for their smooth, child-safe, non-toxic finish. GI-tagged since 2005 and rooted in a craft tradition that dates back over two centuries.'
    },
    {
      id: 'etikoppaka-toys',
      title: 'Etikoppaka "Tharani" Toys',
      region: 'Etikoppaka, Andhra Pradesh',
      medium: 'Softwood, natural vegetable-dye lac colours',
      description: 'Turned-wood toys, spinning tops, and boxes ("Baranis") known for eco-friendly, entirely natural colouring, revived from near-extinction in the late 1980s and now protected by its own GI tag.'
    },
    {
      id: 'nirmal-toys',
      title: 'Nirmal Gilded Wooden Figures',
      region: 'Nirmal, Telangana',
      medium: 'Poniki softwood, lac finish with gold-leaf detailing',
      description: 'Wooden toys and decorative figures finished with lac and further embellished with delicate gold-leaf motifs, a technique with roots in Mughal-era craftsmanship in the Deccan.'
    },
    {
      id: 'jaipur-lac-bangles',
      title: 'Jaipur Lac Bangles',
      region: 'Maniharon ka Rasta, Jaipur, Rajasthan',
      medium: 'Molten lac core, embedded mirrors, stones & meenakari enamel',
      description: 'Bangles shaped from pliable lac and encrusted with mirrors, kundan stones, or enamel work. Worn by brides and considered auspicious for festivals such as Teej, Gangaur, and Karva Chauth.'
    },
    {
      id: 'lac-furniture-inlay',
      title: 'Lac-Turned Furniture Legs & Fittings',
      region: 'Punjab & Gujarat traditions',
      medium: 'Turned wood with coloured lac coating',
      description: 'Beyond toys and bangles, lac-turnery is used to finish furniture legs, bedposts, and decorative fittings, giving traditional wooden furniture a durable, brightly coloured lustre.'
    },
    {
      id: 'lac-decor-items',
      title: 'Lacquered Boxes, Bowls & Idols',
      region: 'Multiple regions',
      medium: 'Turned wood, coloured lac finish',
      description: 'Utility and devotional objects ? boxes, bowls, spice jars, and small idols ? have long been produced using the same lac-turnery techniques as toys and jewellery, prized for both use and display.'
    }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTabs();
    initProcessModal();
    initGallery();
    initBookmark();
  });

  function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeBtn.textContent = isLight ? '??' : '??';
    });
  }

  function initTabs() {
    const tabLinks = document.querySelectorAll('.lac-tab-link');
    tabLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        tabLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const targetId = link.getAttribute('href');
        const targetSec = document.querySelector(targetId);
        if (targetSec) {
          targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function initProcessModal() {
    const processCards = document.querySelectorAll('.process-card');
    const modal = document.getElementById('lac-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');

    processCards.forEach(card => {
      card.addEventListener('click', () => {
        const step = card.getAttribute('data-step');
        const detail = processDetails[step];
        if (!detail) return;

        modalBody.innerHTML = `
          <span class="lac-badge">Lacquering Process</span>
          <h2 id="modal-title" style="font-family: 'Playfair Display', serif; font-size: 1.8rem; margin: 0.5rem 0;">${detail.title}</h2>
          <p style="color: var(--lac-gold); font-weight: 600; margin-bottom: 1rem;">Medium: ${detail.medium}</p>
          <p style="line-height: 1.6; color: var(--lac-text);">${detail.description}</p>
        `;
        modal.classList.remove('hidden');
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => modal.classList.add('hidden'));
    }

    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) modal.classList.add('hidden');
    });
  }

  function initGallery() {
    const gallery = document.getElementById('lac-gallery');
    const modal = document.getElementById('lac-modal');
    const modalBody = document.getElementById('modal-body');

    if (!gallery) return;

    lacProducts.forEach(product => {
      const card = document.createElement('div');
      card.className = 'lac-art-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View details for ${product.title}`);

      card.innerHTML = `
        <span class="lac-badge">${product.region}</span>
        <h3>${product.title}</h3>
        <p>${product.description.substring(0, 110)}...</p>
      `;

      card.addEventListener('click', () => openModal(product));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(product);
        }
      });

      gallery.appendChild(card);
    });

    function openModal(product) {
      modalBody.innerHTML = `
        <span class="lac-badge">${product.region}</span>
        <h2 id="modal-title" style="font-family: 'Playfair Display', serif; font-size: 1.8rem; margin: 0.5rem 0;">${product.title}</h2>
        <p style="color: var(--lac-gold); font-weight: 600; margin-bottom: 1rem;">Medium: ${product.medium}</p>
        <p style="line-height: 1.6;">${product.description}</p>
      `;
      modal.classList.remove('hidden');
    }
  }

  function initBookmark() {
    const bookmarkBtn = document.querySelector('.lac-bookmark-btn');
    if (!bookmarkBtn) return;

    const id = bookmarkBtn.getAttribute('data-bookmark-id');
    let saved = JSON.parse(localStorage.getItem('user_bookmarks') || '[]');
    let isBookmarked = saved.includes(id);

    updateBtnState();

    bookmarkBtn.addEventListener('click', () => {
      saved = JSON.parse(localStorage.getItem('user_bookmarks') || '[]');
      if (saved.includes(id)) {
        saved = saved.filter(b => b !== id);
        isBookmarked = false;
      } else {
        saved.push(id);
        isBookmarked = true;
      }
      localStorage.setItem('user_bookmarks', JSON.stringify(saved));
      updateBtnState();
    });

    function updateBtnState() {
      if (isBookmarked) {
        bookmarkBtn.textContent = '? Saved to Journey';
        bookmarkBtn.style.background = 'var(--lac-gold)';
        bookmarkBtn.style.color = '#0f172a';
      } else {
        bookmarkBtn.textContent = '? Save to Journey';
        bookmarkBtn.style.background = 'transparent';
        bookmarkBtn.style.color = 'var(--lac-gold)';
      }
    }
  }
})();
