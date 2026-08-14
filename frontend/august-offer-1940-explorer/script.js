document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "August Offer 1940 Explorer";
      const thumbnail = "frontend/assets/travel_deserts.png";
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
          explorerPage: "frontend/august-offer-1940-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    window.Journey.registerSearchItems("frontend/august-offer-1940-explorer/index.html", [
      {
        id: "august-offer-1940-main",
        title: "August Offer 1940 Explorer",
        description: "The August Offer of 8 August 1940 — Britain's wartime promise of Dominion Status, the Congress rejection, the Muslim League's welcome, and the launch of Individual Satyagraha.",
        link: "frontend/august-offer-1940-explorer/index.html"
      },
      {
        id: "august-offer-1940-proposals",
        title: "The Main Proposals of the August Offer",
        description: "Dominion Status as the objective, a future constitution-making body, an expanded Executive Council, and a minority veto — the four clauses of the August Offer of 1940.",
        link: "frontend/august-offer-1940-explorer/index.html#proposals"
      },
      {
        id: "august-offer-1940-responses",
        title: "Responses to the August Offer",
        description: "Congress rejected the offer, the Muslim League welcomed it, and Gandhi called for Individual Satyagraha — the responses that followed the August Offer of 1940.",
        link: "frontend/august-offer-1940-explorer/index.html#responses"
      },
      {
        id: "august-offer-1940-timeline",
        title: "August Offer 1940 Political Timeline",
        description: "From the outbreak of the Second World War and the Lahore Resolution to the August Offer, the Congress rejection, and Individual Satyagraha.",
        link: "frontend/august-offer-1940-explorer/index.html#timeline"
      }
    ]);
  }

  // --- Response Board (Interactive) ----------------------------------
  const nodes = [...document.querySelectorAll(".augustoffer-node")];
  const detailEyebrow = document.getElementById("augustoffer-detail-eyebrow");
  const detailTitle = document.getElementById("augustoffer-detail-title");
  const detailDesc = document.getElementById("augustoffer-detail-desc");
  const detailVerdict = document.getElementById("augustoffer-detail-verdict");

  const responseData = {
    congress: {
      eyebrow: "Indian National Congress",
      title: "Congress Rejects the Offer",
      desc: "Meeting in September 1940, the Congress Working Committee rejected the August Offer. It conceded no real power during the war, offered Dominion Status rather than complete independence, and the enlarged Executive Council remained an advisory body with the Viceroy still controlling defence, finance, and foreign affairs. For Congress, the offer was a promise of freedom without any of its substance.",
      verdict: "Rejected — a promise of freedom, not freedom"
    },
    league: {
      eyebrow: "All-India Muslim League",
      title: "The League Welcomes It",
      desc: "Jinnah and the Muslim League welcomed the August Offer. The clause giving 'full weight' to minority interests was read as official recognition that Muslims were a separate political nation, and the constitution-making body's qualification of 'principal elements' seemed to protect the League's veto over any settlement. The offer legitimised the League's claim — though it still fell short of an explicit commitment to Pakistan.",
      verdict: "Welcomed — recognition of the League's claims"
    },
    gandhi: {
      eyebrow: "Mahatma Gandhi",
      title: "Gandhi's Objection",
      desc: "Gandhi saw the offer as widening the gulf between Congress and Britain rather than closing it. Since it transferred no real responsibility to Indians during the war, it was, in effect, no offer at all. He counselled Congress against acceptance, and after the rejection he designed Individual Satyagraha — a limited, symbolic assertion of free speech against war participation that kept the struggle alive without imperilling Britain under Axis attack.",
      verdict: "Objected — the offer gave nothing real"
    },
    british: {
      eyebrow: "London & New Delhi",
      title: "Britain's Aims",
      desc: "The British government's political objectives were practical: secure India's full cooperation in a war Britain was losing in 1940, reassure Allied opinion (especially the United States), and keep the Muslim League onside by protecting minority interests. The offer was designed to concede a future goal while preserving all immediate power in the Viceroy's hands.",
      verdict: "Offered a goal, kept the power"
    }
  };

  function selectNode(party) {
    const data = responseData[party];
    if (!data) return;

    nodes.forEach((node) => {
      const isActive = node.dataset.party === party;
      node.classList.toggle("active", isActive);
      node.setAttribute("aria-pressed", String(isActive));
    });

    detailEyebrow.textContent = data.eyebrow;
    detailTitle.textContent = data.title;
    detailDesc.textContent = data.desc;
    detailVerdict.textContent = data.verdict;
  }

  nodes.forEach((node) => {
    node.addEventListener("click", () => selectNode(node.dataset.party));
  });

  // --- Timeline Phase Filters -------------------------------------------
  const filterButtons = [...document.querySelectorAll(".augustoffer-filter-btn")];
  const timelineSteps = [...document.querySelectorAll(".augustoffer-timeline-step")];

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const phase = btn.dataset.phase;

      filterButtons.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle("active", isActive);
        b.setAttribute("aria-pressed", String(isActive));
      });

      timelineSteps.forEach((step) => {
        const matches = phase === "all" || step.dataset.phase === phase;
        step.classList.toggle("is-filtered-out", !matches);
      });
    });
  });

  // Run initialization
  initJourney();
});
