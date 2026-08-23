(function () {
  "use strict";

  /* ---------------------------------------------------------
     Data: locations + associated people
     --------------------------------------------------------- */
  var LOCATIONS = {
    gowalia: {
      title: "Gowalia Tank Maidan",
      date: "8 August 1942",
      body: "Mahatma Gandhi delivers the \"Do or Die\" call, launching the Quit India Movement. Within hours almost the entire Congress leadership is arrested, leaving the movement without a public voice — the gap Congress Radio was built to fill.",
      people: "Context for the entire station's founding."
    },
    seaview: {
      title: "Sea-View Building, Chowpatty",
      date: "27 August 1942",
      body: "From a rented flat here, the station's first broadcast goes out: \"This is the Congress radio calling on 42.34 meters from somewhere in India.\" Technical adviser Nariman Printer helped set up the transmitter at this address.",
      people: "Usha Mehta · Nariman A. Printer"
    },
    chicago: {
      title: "Chicago Radio",
      date: "August 1942",
      body: "A radio equipment shop owned by Nanka Motwani, who quietly supplied the parts needed to assemble the transmitter — equipment that would otherwise have been impossible to source without drawing suspicion.",
      people: "Nanka Motwani"
    },
    wilson: {
      title: "Wilson College",
      date: "1942",
      body: "Usha Mehta was a student here when she conceived the idea for an underground radio station to carry the movement's news after its leaders were jailed.",
      people: "Usha Mehta"
    },
    hideouts: {
      title: "The Moving Hideouts",
      date: "August – November 1942",
      body: "To stay ahead of British Special Branch, CID, Military Intelligence, the Naval Department and the Air Force — all jointly hunting the signal — the station shifted location almost daily across Bombay, broadcasting in English, Hindustani, Marathi and Gujarati.",
      people: "Ram Manohar Lohia · Achyutrao Patwardhan · Moinuddin Harris · Coomi Dastur · Vithalbhai Jhaveri"
    },
    parekh: {
      title: "Parekh Wadi, Girgaon Back Road",
      date: "12 November 1942",
      body: "Room 106, fifth floor. Acting on information after Nariman Printer's cooperation with investigators, police raid the station's final location. Usha Mehta and Chandrakant Jhaveri are arrested and the broadcasts end.",
      people: "Usha Mehta · Chandrakant Jhaveri"
    }
  };

  var galleryData = [];

  /* ---------------------------------------------------------
     Map + detail panel
     --------------------------------------------------------- */
  var pins = Array.prototype.slice.call(document.querySelectorAll(".cr-pin"));
  var profileCards = Array.prototype.slice.call(document.querySelectorAll(".cr-profile-card"));
  var panel = document.getElementById("detailPanel");

  function renderLocation(key) {
    var data = LOCATIONS[key];
    if (!data || !panel) return;

    panel.innerHTML =
      '<h3 class="cr-detail-title">' + escapeHTML(data.title) + '</h3>' +
      '<span class="cr-detail-date">' + escapeHTML(data.date) + '</span>' +
      '<p class="cr-detail-body">' + escapeHTML(data.body) + '</p>' +
      '<div class="cr-detail-people">' + escapeHTML(data.people) + '</div>';

    pins.forEach(function (p) {
      p.setAttribute("aria-pressed", p.dataset.loc === key ? "true" : "false");
    });
    profileCards.forEach(function (c) {
      c.classList.toggle("is-active", c.dataset.loc === key);
    });
  }

  function escapeHTML(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  pins.forEach(function (pin) {
    pin.setAttribute("aria-pressed", "false");
    pin.addEventListener("click", function () {
      renderLocation(pin.dataset.loc);
    });
  });

  profileCards.forEach(function (card) {
    card.addEventListener("click", function () {
      renderLocation(card.dataset.loc);
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  var btnListen = document.getElementById("btnListen");
  if (btnListen) {
    btnListen.addEventListener("click", function () {
      var mapSection = document.getElementById("mapHeading");
      if (mapSection) mapSection.scrollIntoView({ behavior: "smooth", block: "start" });
      renderLocation("seaview");
    });
  }

  /* ---------------------------------------------------------
     Gallery modal with focus trap
     --------------------------------------------------------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".cr-gallery-item"));
  var modal = document.getElementById("galleryModal");
  var modalImg = document.getElementById("modalImg");
  var modalCaption = document.getElementById("modalCaption");
  var modalClose = document.getElementById("modalClose");
  var modalBackdrop = document.getElementById("modalBackdrop");
  var modalPrev = document.getElementById("modalPrev");
  var modalNext = document.getElementById("modalNext");
  var currentIndex = 0;
  var lastFocused = null;

  galleryItems.forEach(function (item, i) {
    galleryData.push({
      full: item.dataset.full,
      caption: item.dataset.caption
    });
    item.addEventListener("click", function () {
      openModal(i);
    });
  });

  function openModal(index) {
    if (!modal) return;
    currentIndex = index;
    updateModalContent();
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modalClose.focus();
    document.addEventListener("keydown", onModalKeydown);
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onModalKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function updateModalContent() {
    var data = galleryData[currentIndex];
    if (!data) return;
    modalImg.src = data.full;
    modalImg.alt = data.caption || "";
    modalCaption.textContent = data.caption || "";
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateModalContent();
  }
  function showNext() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateModalContent();
  }

  function getFocusable() {
    return Array.prototype.slice.call(
      modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) { return !el.disabled && el.offsetParent !== null; });
  }

  function onModalKeydown(e) {
    if (e.key === "Escape") {
      closeModal();
      return;
    }
    if (e.key === "ArrowLeft") { showPrev(); return; }
    if (e.key === "ArrowRight") { showNext(); return; }

    if (e.key === "Tab") {
      var focusable = getFocusable();
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  if (modalPrev) modalPrev.addEventListener("click", showPrev);
  if (modalNext) modalNext.addEventListener("click", showNext);

  /* ---------------------------------------------------------
     Journey bookmark
     --------------------------------------------------------- */
  var BOOKMARK_KEY = "journey-bookmarks";
  var PAGE_ID = "congress-radio-explorer";
  var btnBookmark = document.getElementById("btnBookmark");

  function getBookmarks() {
    try {
      return JSON.parse(localStorage.getItem(BOOKMARK_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function setBookmarks(list) {
    try {
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(list));
    } catch (e) { /* storage unavailable, ignore */ }
  }

  function refreshBookmarkButton() {
    if (!btnBookmark) return;
    var isSaved = getBookmarks().indexOf(PAGE_ID) !== -1;
    btnBookmark.setAttribute("aria-pressed", isSaved ? "true" : "false");
    var icon = btnBookmark.querySelector(".cr-bookmark-icon");
    var label = btnBookmark.querySelector(".cr-bookmark-label");
    if (icon) icon.textContent = isSaved ? "★" : "☆";
    if (label) label.textContent = isSaved ? "Saved to Journey" : "Save to Journey";
  }

  if (btnBookmark) {
    btnBookmark.addEventListener("click", function () {
      var list = getBookmarks();
      var idx = list.indexOf(PAGE_ID);
      if (idx === -1) {
        list.push(PAGE_ID);
      } else {
        list.splice(idx, 1);
      }
      setBookmarks(list);
      refreshBookmarkButton();
    });
    refreshBookmarkButton();
  }

  /* ---------------------------------------------------------
     Global search registration
     (Consumed by frontend/search-index.js if present)
     --------------------------------------------------------- */
  window.crSearchEntries = [
    {
      title: "Congress Radio",
      keywords: "congress radio underground quit india usha mehta 1942 42.34 metres secret transmitter",
      url: "frontend/congress-radio-explorer/index.html"
    },
    {
      title: "Usha Mehta",
      keywords: "usha mehta wilson college congress radio broadcaster hindustani newsreader",
      url: "frontend/congress-radio-explorer/index.html#profilesHeading"
    }
  ];

})();