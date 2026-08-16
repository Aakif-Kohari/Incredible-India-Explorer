document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Kakori Train Action Explorer";
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
          explorerPage: "frontend/kakori-train-action-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    window.Journey.registerSearchItems("frontend/kakori-train-action-explorer/index.html", [
      {
        id: "kakori-train-action-main",
        title: "Kakori Train Action Explorer",
        description: "The Kakori Train Action of 9 August 1925 — the HRA's seizure of the government treasury from the Saharanpur–Lucknow train, the Kakori Conspiracy Case, and the executions that remade the revolutionary movement.",
        link: "frontend/kakori-train-action-explorer/index.html"
      },
      {
        id: "kakori-train-action-route",
        title: "Kakori Railway Route Map",
        description: "Trace the 8 Down Saharanpur–Lucknow passenger train's route across the United Provinces and the stretch where the emergency chain was pulled near Kakori in 1925.",
        link: "frontend/kakori-train-action-explorer/index.html#route"
      },
      {
        id: "kakori-train-action-network",
        title: "The Kakori Revolutionary Network",
        description: "Ram Prasad Bismil, Ashfaqulla Khan, Chandrashekhar Azad, Rajendra Lahiri and the other revolutionaries who planned and carried out the Kakori Train Action.",
        link: "frontend/kakori-train-action-explorer/index.html#network"
      },
      {
        id: "kakori-train-action-trial",
        title: "Kakori Conspiracy Case Trial Timeline",
        description: "From the first arrests of 1925 to the verdict of 1927 — the trial, the four death sentences, the executions, and the birth of the Hindustan Socialist Republican Association.",
        link: "frontend/kakori-train-action-explorer/index.html#trial"
      }
    ]);
  }

  // --- Railway Route Map (Interactive) -------------------------------
  const routeStations = [...document.querySelectorAll(".kakori-route-station")];
  const routeEyebrow = document.getElementById("kakori-route-eyebrow");
  const routeTitle = document.getElementById("kakori-route-title");
  const routeDesc = document.getElementById("kakori-route-desc");

  const routeData = {
    saharanpur: {
      eyebrow: "Origin",
      title: "Saharanpur",
      desc: "The overnight 8 Down passenger train began its run here on the North-Western Railway. From Saharanpur the line headed south-east across Rohilkhand, through Moradabad and Bareilly."
    },
    moradabad: {
      eyebrow: "Waystation",
      title: "Moradabad",
      desc: "A junction town on the route. Revolutionaries slipped aboard at various points along the line so that no single station saw a large group board at once."
    },
    bareilly: {
      eyebrow: "Waystation",
      title: "Bareilly",
      desc: "Another staging point on the overnight run. The conspirators kept the weapons and ammunition distributed among several members to avoid suspicion."
    },
    shahjahanpur: {
      eyebrow: "Waystation",
      title: "Shahjahanpur",
      desc: "The train continued south-east through Shahjahanpur towards Awadh. The HRA's men had travelled parts of this route in advance, timing the movements of the guard's van."
    },
    hardoi: {
      eyebrow: "Approach",
      title: "Hardoi",
      desc: "Beyond Hardoi the line entered Awadh proper. It was on the open stretch approaching Kakori that the action was timed to take place — after midnight, with the carriages thinly occupied."
    },
    kakori: {
      eyebrow: "The Site ⚡",
      title: "Kakori — the Train Action",
      desc: "Just past Kakori station, around 11:40 pm on 9 August 1925, the emergency chain was pulled. The train halted, the guard was overpowered, and the treasury chest was carried off into the darkness — a strike at the very machinery of the state."
    },
    lucknow: {
      eyebrow: "Destination",
      title: "Lucknow Junction",
      desc: "The train's terminus and the seat of the conspiracy case that followed. The trial of the 28 accused was held before the Sessions Court of Lucknow from 1925 to 1927."
    }
  };

  function selectStation(station) {
    const data = routeData[station];
    if (!data) return;

    routeStations.forEach((node) => {
      const isActive = node.dataset.station === station;
      node.classList.toggle("is-active", isActive);
      node.setAttribute("aria-pressed", String(isActive));
    });

    routeEyebrow.textContent = data.eyebrow;
    routeTitle.textContent = data.title;
    routeDesc.textContent = data.desc;
  }

  routeStations.forEach((node) => {
    const activate = () => selectStation(node.dataset.station);
    node.addEventListener("click", activate);
    node.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });
  });

  // --- Revolutionary Network Board (Interactive) ---------------------
  const nodes = [...document.querySelectorAll(".kakori-node")];
  const detailEyebrow = document.getElementById("kakori-detail-eyebrow");
  const detailTitle = document.getElementById("kakori-detail-title");
  const detailDesc = document.getElementById("kakori-detail-desc");
  const detailVerdict = document.getElementById("kakori-detail-verdict");

  const personData = {
    bismil: {
      eyebrow: "HRA Founder · Leader of the Action",
      title: "Ram Prasad Bismil",
      desc: "Poet, organiser, and the chief architect of the Kakori action. Bismil co-founded the HRA in 1924 and led the party that boarded the train on 9 August 1925. Arrested in October 1925, he refused to beg for mercy and was sentenced to death.",
      verdict: "Hanged at Gorakhpur, 19 December 1927"
    },
    ashfaqulla: {
      eyebrow: "The Poet of Hindu–Muslim Unity",
      title: "Ashfaqulla Khan",
      desc: "A close friend of Bismil and a symbol of revolutionary Hindu–Muslim brotherhood. Ashfaqulla took part in the action and went into hiding, evading capture for months until he was recognised and arrested in December 1925 while disguised as an Afghan trader.",
      verdict: "Hanged at Allahabad, 19 December 1927"
    },
    azad: {
      eyebrow: "The One Who Never Fell Alive",
      title: "Chandrashekhar Azad",
      desc: "A key participant in the action who escaped the police net. After the executions, Azad rebuilt the movement, reconstituting the HRA as the Hindustan Socialist Republican Association in 1928. He vowed never to be captured alive and kept that vow at Alfred Park, Allahabad, in 1931.",
      verdict: "Escaped; died fighting, February 1931"
    },
    lahiri: {
      eyebrow: "The Volunteer",
      title: "Rajendra Lahiri",
      desc: "A young revolutionary from Banaras who took part in the train action. Arrested in November 1925, Lahiri was among the four sentenced to death and became the first of the Kakori martyrs to be hanged.",
      verdict: "Hanged at Gonda, 17 December 1927"
    },
    roshansingh: {
      eyebrow: "The Resolute",
      title: "Thakur Roshan Singh",
      desc: "A member of the HRA who played a supporting role in the plot. Roshan Singh was sentenced to death alongside Bismil, Ashfaqulla, and Lahiri, and was executed together with Ashfaqulla at Allahabad jail.",
      verdict: "Hanged at Allahabad, 19 December 1927"
    },
    bakshi: {
      eyebrow: "The Organiser",
      title: "Sachindranath Bakshi",
      desc: "A participant in the action who helped with planning and logistics. Bakshi was among those transported for life, spending years in the Cellular Jail in the Andamans before the movement's amnesty.",
      verdict: "Transportation for life"
    },
    mukundi: {
      eyebrow: "The Youngest Hands",
      title: "Mukundi Lal",
      desc: "A young conspirator who took part in the train action. Mukundi Lal was sentenced to transportation for life for his role in the conspiracy, a sentence later commuted.",
      verdict: "Transportation for life"
    },
    manmath: {
      eyebrow: "The Chronicler",
      title: "Manmath Nath Gupta",
      desc: "One of the youngest accused, later sentenced to transportation for life. After independence he wrote extensively about the revolutionary movement, becoming one of its most important memoirists.",
      verdict: "Transportation for life"
    }
  };

  function selectPerson(person) {
    const data = personData[person];
    if (!data) return;

    nodes.forEach((node) => {
      const isActive = node.dataset.person === person;
      node.classList.toggle("active", isActive);
      node.setAttribute("aria-pressed", String(isActive));
    });

    detailEyebrow.textContent = data.eyebrow;
    detailTitle.textContent = data.title;
    detailDesc.textContent = data.desc;
    detailVerdict.textContent = data.verdict;
  }

  nodes.forEach((node) => {
    node.addEventListener("click", () => selectPerson(node.dataset.person));
  });

  // --- Trial Timeline Phase Filters -----------------------------------
  const filterButtons = [...document.querySelectorAll(".kakori-filter-btn")];
  const timelineSteps = [...document.querySelectorAll(".kakori-timeline-step")];

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
