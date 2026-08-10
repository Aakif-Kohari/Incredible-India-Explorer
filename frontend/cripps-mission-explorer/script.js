document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "The Cripps Mission";
      const thumbnail = "frontend/assets/cripps_mission_hero.svg";
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
          explorerPage: "frontend/cripps-mission-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    window.Journey.registerSearchItems("frontend/cripps-mission-explorer/index.html", [
      {
        id: "cripps-mission-main",
        title: "The Cripps Mission",
        description: "Proposals, negotiations, and the failure that preceded the Quit India Movement — explore the Cripps Mission of 1942.",
        link: "frontend/cripps-mission-explorer/index.html"
      },
      {
        id: "cripps-mission-timeline",
        title: "Cause, Negotiation, Failure, Consequence",
        description: "A phase-filterable chronology from the fall of Singapore to the launch of the Quit India Movement.",
        link: "frontend/cripps-mission-explorer/index.html#timeline"
      },
      {
        id: "cripps-mission-stakeholders",
        title: "Where Each Side Stood",
        description: "The British Government, Indian National Congress, Muslim League, and Gandhi's positions on the Cripps proposals.",
        link: "frontend/cripps-mission-explorer/index.html#stakeholders"
      }
    ]);
  }

  // --- Stakeholder Viewpoints -----------------------------------------
  const nodes = [...document.querySelectorAll(".cripps-node")];
  const detailEyebrow = document.getElementById("cripps-detail-eyebrow");
  const detailTitle = document.getElementById("cripps-detail-title");
  const detailDesc = document.getElementById("cripps-detail-desc");
  const detailVerdict = document.getElementById("cripps-detail-verdict");

  const stakeholderData = {
    british: {
      eyebrow: "London & New Delhi",
      title: "The British Government",
      desc: "Facing a Japanese advance and Allied pressure to secure Indian cooperation, Churchill's War Cabinet sent Cripps to offer Dominion Status after the war, in exchange for full Indian support of the war effort. Britain was not willing to hand over immediate control of defence.",
      verdict: "Offered a future promise, not present power"
    },
    congress: {
      eyebrow: "Indian National Congress",
      title: "Congress's Position",
      desc: "Congress wanted genuine, immediate self-government, not a deferred promise of Dominion Status. It objected to Britain retaining control over defence during the war, and feared the provincial opt-out clause would fracture Indian unity.",
      verdict: "Rejected — vague and incomplete"
    },
    league: {
      eyebrow: "All-India Muslim League",
      title: "The Muslim League's Position",
      desc: "The League, led by Muhammad Ali Jinnah, wanted an explicit guarantee of a separate Muslim state. While the opt-out clause indirectly opened that door, the League felt the proposals stopped short of the firm commitment it demanded.",
      verdict: "Rejected — no explicit Pakistan guarantee"
    },
    gandhi: {
      eyebrow: "Mahatma Gandhi",
      title: "Gandhi's Reaction",
      desc: "Gandhi viewed the offer as hollow, since it promised nothing until after a war of uncertain length and outcome. He is widely remembered for dismissing it as a post-dated cheque on a crashing bank — a line that captured Congress's broader disillusionment with London's promises.",
      verdict: "Dismissed as an empty promise"
    }
  };

  function selectStakeholder(party) {
    const data = stakeholderData[party];
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
    node.addEventListener("click", () => selectStakeholder(node.dataset.party));
  });

  // --- Timeline Phase Filters -------------------------------------------
  const filterButtons = [...document.querySelectorAll(".cripps-filter-btn")];
  const timelineSteps = [...document.querySelectorAll(".cripps-timeline-step")];

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