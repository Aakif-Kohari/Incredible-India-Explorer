/* ==========================================================================
   CONSTITUTION AMENDMENTS EXPLORER — ANIMATED ENGINE
   ========================================================================== */

const AMENDMENTS = [
  { num: 1, year: 1951, title: "First Amendment", govt: "Jawaharlal Nehru (INC)", changes: "Validated land acquisition laws; added Ninth Schedule; empowered states for socially & educationally backward classes." },
  { num: 2, year: 1951, title: "Second Amendment", govt: "Jawaharlal Nehru (INC)", changes: "Allowed a person to be elected to both a House of Parliament and a State Legislature simultaneously." },
  { num: 3, year: 1954, title: "Third Amendment", govt: "Jawaharlal Nehru (INC)", changes: "Empowered Parliament to authorise states to regulate trade and commerce between states." },
  { num: 4, year: 1955, title: "Fourth Amendment", govt: "Jawaharlal Nehru (INC)", changes: "Curtailed right to property; allowed state to acquire property without compensation." },
  { num: 5, year: 1955, title: "Fifth Amendment", govt: "Jawaharlal Nehru (INC)", changes: "Fixed time limit for governors to reserve bills for Presidential consideration." },
  { num: 6, year: 1956, title: "Sixth Amendment", govt: "Jawaharlal Nehru (INC)", changes: "Made Tamil, Telugu, Kannada, Malayalam and Gujarati official languages." },
  { num: 7, year: 1956, title: "Seventh Amendment", govt: "Jawaharlal Nehru (INC)", changes: "Reorganisation of states on linguistic basis; abolished existing states and created new ones." },
  { num: 8, year: 1959, title: "Eighth Amendment", govt: "Jawaharlal Nehru (INC)", changes: "Extended reservation for SCs/STs in Lok Sabha and state assemblies for first 10 years." },
  { num: 9, year: 1960, title: "Ninth Amendment", govt: "Jawaharlal Nehru (INC)", changes: "Transferred territories from India to Pakistan as per Inter-Ministerial agreement." },
  { num: 10, year: 1961, title: "Tenth Amendment", govt: "Jawaharlal Nehru (INC)", changes: "Incorporated Dadra and Nagar Haveli into the Union of India." },
  { num: 11, year: 1961, title: "Eleventh Amendment", govt: "Jawaharlal Nehru (INC)", changes: "Changed the procedure for election of Vice-President." },
  { num: 12, year: 1962, title: "Twelfth Amendment", govt: "Jawaharlal Nehru (INC)", changes: "Incorporated Goa, Daman and Diu as Union Territories." },
  { num: 13, year: 1962, title: "Thirteenth Amendment", govt: "Jawaharlal Nehru (INC)", changes: "Created Nagaland as a separate state." },
  { num: 14, year: 1962, title: "Fourteenth Amendment", govt: "Jawaharlal Nehru (INC)", changes: "Incorporated Pondicherry into the Union; created legislative assemblies for Union Territories." },
  { num: 15, year: 1963, title: "Fifteenth Amendment", govt: "Jawaharlal Nehru (INC)", changes: "Extended reservation for SCs/STs in Lok Sabha and state assemblies for another 10 years." },
  { num: 16, year: 1963, title: "Sixteenth Amendment", govt: "Jawaharlal Nehru (INC)", changes: "Made it obligatory for members of state legislatures to take oath of allegiance to the Constitution." },
  { num: 17, year: 1964, title: "Seventeenth Amendment", govt: "Lal Bahadur Shastri (INC)", changes: "Empowered Parliament to acquire property for agrarian reforms; added land reform acts to Ninth Schedule." },
  { num: 18, year: 1966, title: "Eighteenth Amendment", govt: "Lal Bahadur Shastri (INC)", changes: "Empowered Parliament to form new states by uniting two or more states or parts of states." },
  { num: 19, year: 1966, title: "Nineteenth Amendment", govt: "Indira Gandhi (INC)", changes: "Empowered the President to return Bills to Parliament for reconsideration." },
  { num: 20, year: 1966, title: "Twentieth Amendment", govt: "Indira Gandhi (INC)", changes: "Provided for direct elections to state legislative assemblies." },
  { num: 21, year: 1967, title: "Twenty-first Amendment", govt: "Indira Gandhi (INC)", changes: "Added Sindhi as an official language in the Eighth Schedule." },
  { num: 22, year: 1969, title: "Twenty-second Amendment", govt: "Indira Gandhi (INC)", changes: "Created a new Hill State of Meghalaya within the state of Assam." },
  { num: 23, year: 1969, title: "Twenty-third Amendment", govt: "Indira Gandhi (INC)", changes: "Extended reservation for SCs/STs in Lok Sabha and state assemblies for another 10 years." },
  { num: 24, year: 1971, title: "Twenty-fourth Amendment", govt: "Indira Gandhi (INC)", changes: "Parliament has the power to amend any part of the Constitution including fundamental rights." },
  { num: 25, year: 1971, title: "Twenty-fifth Amendment", govt: "Indira Gandhi (INC)", changes: "Right to property curtailed; compensation determined by Parliament." },
  { num: 26, year: 1971, title: "Twenty-sixth Amendment", govt: "Indira Gandhi (INC)", changes: "Abolished the Privy Purses and privileges of former rulers of Indian princely states." },
  { num: 27, year: 1971, title: "Twenty-seventh Amendment", govt: "Indira Gandhi (INC)", changes: "Empowered the administration of new Union Territories." },
  { num: 28, year: 1972, title: "Twenty-eighth Amendment", govt: "Indira Gandhi (INC)", changes: "Removed immunity of government servants from legal proceedings when transferred." },
  { num: 29, year: 1972, title: "Twenty-ninth Amendment", govt: "Indira Gandhi (INC)", changes: "Added two land reform acts to the Ninth Schedule." },
  { num: 30, year: 1972, title: "Thirtieth Amendment", govt: "Indira Gandhi (INC)", changes: "Expanded the Supreme Court's appellate jurisdiction." },
  { num: 31, year: 1973, title: "Thirty-first Amendment", govt: "Indira Gandhi (INC)", changes: "Increased the number of Lok Sabha seats from 525 to 545." },
  { num: 32, year: 1973, title: "Thirty-second Amendment", govt: "Indira Gandhi (INC)", changes: "Parliament can amend the Constitution to reverse Supreme Court decisions." },
  { num: 33, year: 1974, title: "Thirty-third Amendment", govt: "Indira Gandhi (INC)", changes: "Made it more difficult to disqualify defecting MLAs." },
  { num: 34, year: 1975, title: "Thirty-fourth Amendment", govt: "Indira Gandhi (INC)", changes: "Added more land reform acts to the Ninth Schedule." },
  { num: 35, year: 1974, title: "Thirty-fifth Amendment", govt: "Indira Gandhi (INC)", changes: "Provided for Sikkim becoming an associate state of India." },
  { num: 36, year: 1975, title: "Thirty-sixth Amendment", govt: "Indira Gandhi (INC)", changes: "Made Sikkim a full state of the Indian Union." },
  { num: 37, year: 1975, title: "Thirty-seventh Amendment", govt: "Indira Gandhi (INC)", changes: "Created Arunachal Pradesh as a Union Territory." },
  { num: 38, year: 1975, title: "Thirty-eighth Amendment", govt: "Indira Gandhi (INC)", changes: "Excluded judicial review of certain proclamations and ordinances by the President." },
  { num: 39, year: 1975, title: "Thirty-ninth Amendment", govt: "Indira Gandhi (INC)", changes: "Excluded elections of President, PM, Speaker and judges from judicial review." },
  { num: 40, year: 1976, title: "Fortieth Amendment", govt: "Indira Gandhi (INC)", changes: "Added more land reform acts to the Ninth Schedule." },
  { num: 41, year: 1976, title: "Forty-first Amendment", govt: "Indira Gandhi (INC)", changes: "Governors exempted from legal proceedings for their official acts." },
  { num: 42, year: 1976, title: "Forty-second Amendment (Mini Constitution)", govt: "Indira Gandhi (INC)", changes: "Massive overhaul: added Socialist & Secular to Preamble; curtailed judicial review; added Fundamental Duties." },
  { num: 43, year: 1977, title: "Forty-third Amendment", govt: "Morarji Desai (Janata)", changes: "Restored judicial review powers curtailed by the 42nd Amendment." },
  { num: 44, year: 1978, title: "Forty-fourth Amendment", govt: "Morarji Desai (Janata)", changes: "Repealed controversial provisions of 42nd Amendment; restored judicial review; right to property deleted." },
  { num: 45, year: 1980, title: "Forty-fifth Amendment", govt: "Indira Gandhi (INC)", changes: "Extended reservation for SCs/STs in Lok Sabha and state assemblies for another 10 years." },
  { num: 46, year: 1982, title: "Forty-sixth Amendment", govt: "Indira Gandhi (INC)", changes: "Introduced a uniform system of indirect taxes." },
  { num: 47, year: 1982, title: "Forty-seventh Amendment", govt: "Indira Gandhi (INC)", changes: "Added land reform acts to the Ninth Schedule." },
  { num: 48, year: 1984, title: "Forty-eighth Amendment", govt: "Indira Gandhi (INC)", changes: "President's Rule in a state to be extended beyond one year under special circumstances." },
  { num: 49, year: 1984, title: "Forty-ninth Amendment", govt: "Rajiv Gandhi (INC)", changes: "Added Manipuri, Konkani, and Nepali to the Eighth Schedule of official languages." },
  { num: 50, year: 1984, title: "Fiftieth Amendment", govt: "Rajiv Gandhi (INC)", changes: "Government employees exempted from anti-defection law." },
  { num: 51, year: 1984, title: "Fifty-first Amendment", govt: "Rajiv Gandhi (INC)", changes: "Extended reservation for STs in state legislatures for 10 years." },
  { num: 52, year: 1985, title: "Fifty-second Amendment (Anti-Defection Law)", govt: "Rajiv Gandhi (INC)", changes: "Members of Parliament and state legislatures must follow party whip or face disqualification." },
  { num: 53, year: 1986, title: "Fifty-third Amendment", govt: "Rajiv Gandhi (INC)", changes: "Mizoram became a state of the Indian Union." },
  { num: 54, year: 1987, title: "Fifty-fourth Amendment", govt: "Rajiv Gandhi (INC)", changes: "Goa became a full state of the Indian Union." },
  { num: 55, year: 1987, title: "Fifty-fifth Amendment", govt: "Rajiv Gandhi (INC)", changes: "Arunachal Pradesh became a full state." },
  { num: 56, year: 1987, title: "Fifty-sixth Amendment", govt: "Rajiv Gandhi (INC)", changes: "Administration of Union Territories reorganised." },
  { num: 57, year: 1987, title: "Fifty-seventh Amendment", govt: "Rajiv Gandhi (INC)", changes: "Reserved seats for Anglo-Indians in state legislatures." },
  { num: 58, year: 1988, title: "Fifty-eighth Amendment", govt: "Rajiv Gandhi (INC)", changes: "President's emergency powers extended." },
  { num: 59, year: 1988, title: "Fifty-ninth Amendment", govt: "Rajiv Gandhi (INC)", changes: "Special powers given to the President regarding Punjab." },
  { num: 60, year: 1988, title: "Sixtieth Amendment", govt: "Rajiv Gandhi (INC)", changes: "Professional tax ceiling increased." },
  { num: 61, year: 1989, title: "Sixty-first Amendment", govt: "Rajiv Gandhi (INC)", changes: "Voting age reduced from 21 to 18 years — empowering India's youth." },
  { num: 62, year: 1990, title: "Sixty-second Amendment", govt: "V.P. Singh (JD/NDA)", changes: "Extended reservation for STs in Lok Sabha and state assemblies for another 10 years." },
  { num: 63, year: 1990, title: "Sixty-third Amendment", govt: "V.P. Singh (JD/NDA)", changes: "Repealed special provisions for Punjab introduced by the 59th Amendment." },
  { num: 64, year: 1990, title: "Sixty-fourth Amendment", govt: "V.P. Singh (JD/NDA)", changes: "Reserved seats for Scheduled Castes in Panchayati Raj institutions." },
  { num: 65, year: 1990, title: "Sixty-fifth Amendment", govt: "V.P. Singh (JD/NDA)", changes: "National Commission for SCs and National Commission for STs established." },
  { num: 66, year: 1990, title: "Sixty-sixth Amendment", govt: "V.P. Singh (JD/NDA)", changes: "Added land reform acts to the Ninth Schedule." },
  { num: 67, year: 1991, title: "Sixty-seventh Amendment", govt: "P.V. Narasimha Rao (INC)", changes: "Reserved seats for backward classes in Panchayats." },
  { num: 68, year: 1991, title: "Sixty-eighth Amendment", govt: "P.V. Narasimha Rao (INC)", changes: "Land reform laws placed beyond judicial review." },
  { num: 69, year: 1991, title: "Sixty-ninth Amendment", govt: "P.V. Narasimha Rao (INC)", changes: "Special status given to National Capital Territory of Delhi." },
  { num: 70, year: 1992, title: "Seventieth Amendment", govt: "P.V. Narasimha Rao (INC)", changes: "Fundamental duties extended to state governments." },
  { num: 71, year: 1992, title: "Seventy-first Amendment", govt: "P.V. Narasimha Rao (INC)", changes: "Added Manipuri, Bodo, and Dogri to the Eighth Schedule." },
  { num: 72, year: 1992, title: "Seventy-second Amendment", govt: "P.V. Narasimha Rao (INC)", changes: "Reserved seats for Scheduled Tribes in state legislatures." },
  { num: 73, year: 1992, title: "Seventy-third Amendment (Panchayati Raj)", govt: "P.V. Narasimha Rao (INC)", changes: "Constitutional status to Panchayati Raj institutions; regular elections; reserved seats for SCs, STs and women." },
  { num: 74, year: 1992, title: "Seventy-fourth Amendment", govt: "P.V. Narasimha Rao (INC)", changes: "Constitutional status to urban local bodies and municipal corporations." },
  { num: 75, year: 1994, title: "Seventy-fifth Amendment", govt: "P.V. Narasimha Rao (INC)", changes: "Urban local bodies given constitutional status." },
  { num: 76, year: 1994, title: "Seventy-sixth Amendment", govt: "P.V. Narasimha Rao (INC)", changes: "More land reform acts added to the Ninth Schedule." },
  { num: 77, year: 1995, title: "Seventy-seventh Amendment", govt: "P.V. Narasimha Rao (INC)", changes: "Reservation for OBCs in educational institutions." },
  { num: 78, year: 2000, title: "Seventy-eighth Amendment", govt: "Atal Bihari Vajpayee (NDA)", changes: "More land reform acts added to the Ninth Schedule." },
  { num: 79, year: 2000, title: "Seventy-ninth Amendment", govt: "Atal Bihari Vajpayee (NDA)", changes: "Extended reservation for SCs and STs for another 10 years." },
  { num: 80, year: 2000, title: "Eightieth Amendment", govt: "Atal Bihari Vajpayee (NDA)", changes: "Delimitation of constituencies adjusted." },
  { num: 81, year: 2000, title: "Eighty-first Amendment", govt: "Atal Bihari Vajpayee (NDA)", changes: "Backlog vacancies for SCs and STs reserved." },
  { num: 82, year: 2001, title: "Eighty-second Amendment", govt: "Atal Bihari Vajpayee (NDA)", changes: "Reservation for backward classes in educational institutions." },
  { num: 83, year: 2001, title: "Eighty-third Amendment", govt: "Atal Bihari Vajpayee (NDA)", changes: "Anti-defection law modified for municipal officers." },
  { num: 84, year: 2002, title: "Eighty-fourth Amendment", govt: "Atal Bihari Vajpayee (NDA)", changes: "Delimitation of parliamentary constituencies postponed." },
  { num: 85, year: 2002, title: "Eighty-fifth Amendment", govt: "Atal Bihari Vajpayee (NDA)", changes: "Extended reservation for SCs and STs for another 10 years." },
  { num: 86, year: 2002, title: "Eighty-sixth Amendment (Right to Education)", govt: "Atal Bihari Vajpayee (NDA)", changes: "Made education a fundamental right for children aged 6-14 years; added Article 21A." },
  { num: 87, year: 2003, title: "Eighty-seventh Amendment", govt: "Atal Bihari Vajpayee (NDA)", changes: "More land reform acts added to the Ninth Schedule." },
  { num: 88, year: 2003, title: "Eighty-eighth Amendment", govt: "Atal Bihari Vajpayee (NDA)", changes: "National Commission for Minorities established." },
  { num: 89, year: 2003, title: "Eighty-ninth Amendment", govt: "Atal Bihari Vajpayee (NDA)", changes: "National Commission for Scheduled Castes separated." },
  { num: 90, year: 2003, title: "Ninetieth Amendment", govt: "Atal Bihari Vajpayee (NDA)", changes: "Reserved seats for STs in Rajya Sabha." },
  { num: 91, year: 2003, title: "Ninety-first Amendment", govt: "Atal Bihari Vajpayee (NDA)", changes: "Limit on size of Council of Ministers in Centre and states." },
  { num: 92, year: 2004, title: "Ninety-second Amendment", govt: "Atal Bihari Vajpayee (NDA)", changes: "Added Bodo, Dogri, Maithili, and Santhali to the Eighth Schedule." },
  { num: 93, year: 2005, title: "Ninety-third Amendment", govt: "Manmohan Singh (UPA)", changes: "Reservation for SCs and STs in private educational institutions." },
  { num: 94, year: 2006, title: "Ninety-fourth Amendment", govt: "Manmohan Singh (UPA)", changes: "Extended reservation for STs in Rajya Sabha for 10 years." },
  { num: 95, year: 2009, title: "Ninety-fifth Amendment", govt: "Manmohan Singh (UPA)", changes: "Extended reservation for SCs and STs for another 10 years." },
  { num: 96, year: 2011, title: "Ninety-sixth Amendment", govt: "Manmohan Singh (UPA)", changes: "Added Maithili to the Eighth Schedule." },
  { num: 97, year: 2012, title: "Ninety-seventh Amendment", govt: "Manmohan Singh (UPA)", changes: "Gave constitutional status to cooperative societies." },
  { num: 98, year: 2014, title: "Ninety-eighth Amendment", govt: "Manmohan Singh (UPA)", changes: "Reservations for OBCs in local bodies." },
  { num: 99, year: 2014, title: "Ninety-ninth Amendment", govt: "Narendra Modi (NDA)", changes: "Established the National Judicial Appointments Commission (NJAC)." },
  { num: 100, year: 2015, title: "Hundredth Amendment", govt: "Narendra Modi (NDA)", changes: "Ratified land boundary agreement with Bangladesh." },
  { num: 101, year: 2016, title: "101st Amendment (GST)", govt: "Narendra Modi (NDA)", changes: "Introduced the Goods and Services Tax (GST) replacing multiple indirect taxes." },
  { num: 102, year: 2016, title: "102nd Amendment", govt: "Narendra Modi (NDA)", changes: "Constitutional status to National Commission for Backward Classes." },
  { num: 103, year: 2019, title: "103rd Amendment (EWS)", govt: "Narendra Modi (NDA)", changes: "10% reservation for Economically Weaker Sections in education and government jobs." },
  { num: 104, year: 2020, title: "104th Amendment", govt: "Narendra Modi (NDA)", changes: "Extended reservation for SCs/STs for 10 years; removed Anglo-Indian reserved seats." },
  { num: 105, year: 2021, title: "105th Amendment", govt: "Narendra Modi (NDA)", changes: "Restored state governments' power to identify Other Backward Classes." },
  { num: 106, year: 2023, title: "106th Amendment (Nari Shakti)", govt: "Narendra Modi (NDA)", changes: "One-third reservation for women in Lok Sabha and state legislative assemblies." }
];

const LANDMARK_NUMS = [1, 7, 24, 42, 44, 52, 61, 73, 86, 101, 106];

const GOVT_COLORS = {
  INC: "#138813",
  Janata: "#e67e22",
  "JD/NDA": "#884ea0",
  NDA: "#2471a3"
};

function getDecade(y) { return Math.floor(y / 10) * 10; }
function govColor(g) {
  for (const [k, c] of Object.entries(GOVT_COLORS)) { if (g.includes(k)) return c; }
  return "#6c3483";
}
function isLandmark(a) { return LANDMARK_NUMS.includes(a.num); }

/* ==========================================================================
   MAIN INIT
   ========================================================================== */
function initConstitutionAmendmentsPage() {

  /* ---------- HERO CANVAS ---------- */
  const canvas = document.getElementById("ca-hero-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let W, H, particles = [];
    function resizeCanvas() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        o: Math.random() * 0.4 + 0.1
      });
    }
    (function drawParticles() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,162,39,${p.o})`;
        ctx.fill();
      });
      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(201,162,39,${0.08 * (1 - d / 120)})`;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(drawParticles);
    })();
  }

  /* ---------- TYPING EFFECT ---------- */
  const typed = document.getElementById("ca-typed-text");
  if (typed) {
    const phrases = ["Amendments Explorer", "Living Document", "People's Charter", "Rule of Law"];
    let pi = 0, ci = 0, deleting = false;
    function typeLoop() {
      const full = phrases[pi];
      typed.textContent = deleting ? full.slice(0, ci--) : full.slice(0, ci++);
      if (!deleting && ci > full.length + 1) { deleting = true; setTimeout(typeLoop, 1500); return; }
      if (deleting && ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; }
      setTimeout(typeLoop, deleting ? 50 : 90);
    }
    setTimeout(typeLoop, 800);
  }

  /* ---------- COUNTER ANIMATION ---------- */
  document.querySelectorAll(".ca-stat-num").forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 60);
    const iv = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(iv);
    }, 25);
  });

  /* ---------- SCROLL REVEALS ---------- */
  const revealEls = document.querySelectorAll(".ca-reveal, .ca-card");
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("ca-visible");
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach(el => revealObs.observe(el));

  /* ---------- FILTER BAR ---------- */
  const filterBar = document.getElementById("ca-filter-bar");
  if (filterBar) {
    window.addEventListener("scroll", () => {
      filterBar.classList.toggle("ca-stuck", window.scrollY > filterBar.offsetTop - 10);
    });
  }

  /* ---------- DECADE PILLS ---------- */
  const pillsContainer = document.getElementById("ca-decade-pills");
  const decades = ["all", ...new Set(AMENDMENTS.map(a => getDecade(a.year)))].sort((a, b) => a === "all" ? -1 : b === "all" ? 1 : a - b);
  if (pillsContainer) {
    pillsContainer.innerHTML = decades.map(d =>
      `<button class="ca-pill${d === 'all' ? ' active' : ''}" data-decade="${d}">${d === 'all' ? 'All' : d + 's'}</button>`
    ).join("");
  }

  /* ---------- RENDER CARDS ---------- */
  const grid = document.getElementById("ca-timeline-grid");
  const searchInput = document.getElementById("ca-search");
  const showingEl = document.getElementById("ca-showing");
  let filtered = [...AMENDMENTS];
  let quizState = null;

  function renderCards() {
    if (!grid) return;
    if (filtered.length === 0) {
      grid.innerHTML = `<p class="ca-empty">No amendments match your search. Try different keywords.</p>`;
      return;
    }
    grid.innerHTML = filtered.map((a, i) => {
      const gc = govColor(a.govt);
      const lm = isLandmark(a);
      const side = i % 2 === 0 ? "left" : "right";
      return `
      <div class="ca-card ca-card-${side}${lm ? ' ca-card-landmark' : ''}"
           data-num="${a.num}" style="--gc:${gc};--delay:${Math.min(i * 0.04, 0.6)}s">
        <div class="ca-card-dot" style="background:${gc}"></div>
        <div class="ca-card-inner">
          <div class="ca-card-top">
            <span class="ca-card-num">${a.num}</span>
            <span class="ca-card-year">${a.year}</span>
            ${lm ? '<span class="ca-card-star"><i class="fa-solid fa-star"></i></span>' : ''}
          </div>
          <h3 class="ca-card-title">${a.title}</h3>
          <div class="ca-card-govt">
            <span class="ca-card-dot-sm" style="background:${gc}"></span>
            ${a.govt}
          </div>
          <p class="ca-card-desc">${a.changes}</p>
          <span class="ca-card-decade">${getDecade(a.year)}s</span>
          <button class="ca-card-expand">View Details <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>`;
    }).join("");
    if (showingEl) showingEl.textContent = filtered.length;

    /* observe new cards */
    grid.querySelectorAll(".ca-card").forEach(c => {
      revealObs.observe(c);
      c.addEventListener("click", (e) => {
        if (e.target.closest(".ca-card-expand") || e.target.closest(".ca-card-inner")) {
          openDetail(parseInt(c.dataset.num));
        }
      });
    });
  }

  /* ---------- FILTER ---------- */
  function applyFilters() {
    const q = (searchInput?.value || "").trim().toLowerCase();
    const decade = document.querySelector(".ca-pill.active")?.dataset.decade || "all";
    filtered = AMENDMENTS.filter(a => {
      const md = decade === "all" || getDecade(a.year).toString() === decade;
      const mq = !q || a.title.toLowerCase().includes(q) || a.govt.toLowerCase().includes(q) || a.changes.toLowerCase().includes(q) || a.num.toString() === q;
      return md && mq;
    });
    renderCards();
  }

  searchInput?.addEventListener("input", applyFilters);
  pillsContainer?.addEventListener("click", (e) => {
    const pill = e.target.closest(".ca-pill");
    if (!pill) return;
    pillsContainer.querySelectorAll(".ca-pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    applyFilters();
  });

  /* ---------- DETAIL PANEL ---------- */
  function openDetail(num) {
    const a = AMENDMENTS.find(am => am.num === num);
    if (!a) return;
    const panel = document.getElementById("ca-detail-panel");
    const backdrop = document.getElementById("ca-panel-backdrop");
    if (!panel || !backdrop) return;
    const gc = govColor(a.govt);
    const lm = isLandmark(a);

    panel.innerHTML = `
      <div class="ca-panel-inner">
        <button class="ca-panel-close" id="ca-panel-close"><i class="fa-solid fa-xmark"></i></button>
        <div class="ca-panel-head">
          <div class="ca-panel-num" style="border-color:${gc}">${a.num}</div>
          <div>
            <h2>${a.title}</h2>
            <span class="ca-panel-year">${a.year}</span>
          </div>
        </div>
        <div class="ca-panel-govt">
          <span class="ca-card-dot-sm" style="background:${gc}"></span>
          Government: <strong>${a.govt}</strong>
        </div>
        ${lm ? '<div class="ca-panel-landmark"><i class="fa-solid fa-star"></i> Landmark Amendment</div>' : ''}
        <div class="ca-panel-body">
          <h4>Major Changes</h4>
          <p>${a.changes}</p>
        </div>
        <div class="ca-panel-timeline-mini">
          <div class="ca-panel-timeline-bar">
            <div class="ca-panel-timeline-fill" style="width:${(num / 106) * 100}%"></div>
            <div class="ca-panel-timeline-marker" style="left:${(num / 106) * 100}%"></div>
          </div>
          <span class="ca-panel-timeline-label">Amendment ${num} of 106</span>
        </div>
        <div class="ca-panel-nav">
          ${num > 1 ? `<button class="ca-panel-nav-btn" data-goto="${num - 1}"><i class="fa-solid fa-chevron-left"></i> #${num - 1}</button>` : '<span></span>'}
          ${num < 106 ? `<button class="ca-panel-nav-btn" data-goto="${num + 1}">#${num + 1} <i class="fa-solid fa-chevron-right"></i></button>` : '<span></span>'}
        </div>
      </div>`;

    panel.querySelectorAll(".ca-panel-nav-btn").forEach(b => {
      b.addEventListener("click", () => openDetail(parseInt(b.dataset.goto)));
    });
    document.getElementById("ca-panel-close")?.addEventListener("click", closeDetail);
    backdrop.classList.add("open");
    panel.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDetail() {
    document.getElementById("ca-panel-backdrop")?.classList.remove("open");
    document.getElementById("ca-detail-panel")?.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.getElementById("ca-panel-backdrop")?.addEventListener("click", closeDetail);
  document.addEventListener("keydown", function caEsc(e) {
    if (e.key === "Escape") closeDetail();
  });

  /* ---------- LANDMARKS ---------- */
  const landmarksRow = document.getElementById("ca-landmarks-row");
  if (landmarksRow) {
    const lms = AMENDMENTS.filter(a => isLandmark(a));
    landmarksRow.innerHTML = lms.map(a => {
      const gc = govColor(a.govt);
      return `
      <div class="ca-landmark-card" data-num="${a.num}" style="--gc:${gc}">
        <div class="ca-landmark-num">${a.num}</div>
        <h4>${a.title}</h4>
        <span class="ca-landmark-year">${a.year}</span>
        <p>${a.changes.split(".")[0]}.</p>
      </div>`;
    }).join("");
    landmarksRow.querySelectorAll(".ca-landmark-card").forEach(c => {
      c.addEventListener("click", () => openDetail(parseInt(c.dataset.num)));
      revealObs.observe(c);
    });
  }

  /* ---------- QUIZ ---------- */
  const quizBody = document.getElementById("ca-quiz-body");
  document.getElementById("ca-quiz-start")?.addEventListener("click", startQuiz);

  function startQuiz() {
    const pool = [...AMENDMENTS].sort(() => Math.random() - 0.5).slice(0, 10);
    const questions = pool.map(a => {
      const type = Math.random();
      if (type < 0.4) {
        const opts = AMENDMENTS.filter(o => o.num !== a.num).sort(() => Math.random() - 0.5).slice(0, 3).map(o => o.num);
        opts.push(a.num); opts.sort(() => Math.random() - 0.5);
        return { q: `Which amendment dealt with: "${a.changes.split(";")[0]}"?`, opts: opts.map(o => `Amendment ${o}`), ans: opts.indexOf(a.num), a };
      } else if (type < 0.7) {
        const wrong = [1955, 1971, 1985, 2002, 2016].filter(y => y !== a.year).sort(() => Math.random() - 0.5).slice(0, 3);
        const opts = [...wrong, a.year].sort(() => Math.random() - 0.5);
        return { q: `In which year was the ${a.title} enacted?`, opts: opts.map(String), ans: opts.indexOf(String(a.year)), a };
      } else {
        const govts = new Set([a.govt]);
        while (govts.size < 4) govts.add(AMENDMENTS[Math.floor(Math.random() * AMENDMENTS.length)].govt);
        const opts = Array.from(govts).sort(() => Math.random() - 0.5);
        return { q: `Which government passed the ${a.title}?`, opts, ans: opts.indexOf(a.govt), a };
      }
    });
    quizState = { qs: questions, cur: 0, score: 0 };
    showQuizQ();
  }

  function showQuizQ() {
    const { qs, cur, score } = quizState;
    if (cur >= qs.length) { showQuizResult(); return; }
    const q = qs[cur];
    quizBody.innerHTML = `
      <div class="ca-quiz-progress">
        <div class="ca-quiz-progress-bar"><div style="width:${(cur / qs.length) * 100}%"></div></div>
        <span>${cur + 1} / ${qs.length}</span>
      </div>
      <div class="ca-quiz-q">${q.q}</div>
      <div class="ca-quiz-opts">
        ${q.opts.map((o, i) => `<button class="ca-quiz-opt" data-i="${i}">${o}</button>`).join("")}
      </div>
      <div class="ca-quiz-feedback" id="ca-quiz-fb"></div>`;
    quizBody.querySelectorAll(".ca-quiz-opt").forEach(b => {
      b.addEventListener("click", () => handleQuizAns(parseInt(b.dataset.i)));
    });
  }

  function handleQuizAns(idx) {
    if (quizState.answered) return;
    quizState.answered = true;
    const q = quizState.qs[quizState.cur];
    const correct = idx === q.ans;
    if (correct) quizState.score++;
    quizBody.querySelectorAll(".ca-quiz-opt").forEach((b, i) => {
      b.style.pointerEvents = "none";
      if (i === q.ans) b.classList.add("correct");
      if (i === idx && !correct) b.classList.add("wrong");
    });
    document.getElementById("ca-quiz-fb").innerHTML = correct
      ? `<span class="ca-fb-ok">Correct!</span> ${q.a.title} (${q.a.year})`
      : `<span class="ca-fb-no">Incorrect.</span> Answer: ${q.opts[q.ans]}`;
    setTimeout(() => {
      quizState.cur++; quizState.answered = false;
      showQuizQ();
    }, 1800);
  }

  function showQuizResult() {
    const { qs, score } = quizState;
    const pct = Math.round((score / qs.length) * 100);
    quizBody.innerHTML = `
      <div class="ca-quiz-result">
        <div class="ca-quiz-score-anim" data-target="${pct}">0</div>
        <div class="ca-quiz-score-label">${score} / ${qs.length} correct</div>
        <p class="ca-quiz-verdict">${pct >= 80 ? "Excellent! You're a constitutional expert!" : pct >= 50 ? "Good effort! Keep exploring!" : "Keep learning — every amendment tells a story!"}</p>
        <button class="ca-btn ca-btn-primary" id="ca-quiz-retry"><i class="fa-solid fa-rotate-right"></i> Try Again</button>
      </div>`;
    /* animate score */
    const scoreEl = quizBody.querySelector(".ca-quiz-score-anim");
    if (scoreEl) {
      let c = 0;
      const s = Math.ceil(pct / 40);
      const iv = setInterval(() => {
        c = Math.min(c + s, pct);
        scoreEl.textContent = c + "%";
        if (c >= pct) clearInterval(iv);
      }, 25);
    }
    document.getElementById("ca-quiz-retry")?.addEventListener("click", startQuiz);
  }

  /* ---------- SCROLL PROGRESS LINE ---------- */
  const timelineLine = document.getElementById("ca-timeline-line");
  if (timelineLine) {
    window.addEventListener("scroll", () => {
      const section = document.getElementById("ca-timeline");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const pct = Math.max(0, Math.min(100, (-rect.top / total) * 100));
      timelineLine.style.height = pct + "%";
    });
  }

  /* ---------- BOOT ---------- */
  applyFilters();
}

window.initConstitutionAmendmentsPage = initConstitutionAmendmentsPage;
