/* PIN Code Hunt — guess India by postal prefix
   Real India Post sorting-district prefixes power every question. */

const ENTRIES = [
  { code: "110", city: "Delhi",              state: "Delhi",              zone: "Northern belt (Delhi–Punjab–Haryana–HP)" },
  { code: "122", city: "Gurugram",           state: "Haryana",            zone: "Northern belt (Delhi–Punjab–Haryana–HP)" },
  { code: "141", city: "Ludhiana",           state: "Punjab",             zone: "Northern belt (Delhi–Punjab–Haryana–HP)" },
  { code: "160", city: "Chandigarh",         state: "Chandigarh",         zone: "Northern belt (Delhi–Punjab–Haryana–HP)" },
  { code: "190", city: "Srinagar",           state: "Jammu & Kashmir",    zone: "Northern belt (Delhi–Punjab–Haryana–HP)" },
  { code: "226", city: "Lucknow",            state: "Uttar Pradesh",      zone: "UP & Uttarakhand" },
  { code: "208", city: "Kanpur",             state: "Uttar Pradesh",      zone: "UP & Uttarakhand" },
  { code: "282", city: "Agra",               state: "Uttar Pradesh",      zone: "UP & Uttarakhand" },
  { code: "201", city: "Noida",              state: "Uttar Pradesh",      zone: "UP & Uttarakhand" },
  { code: "302", city: "Jaipur",             state: "Rajasthan",          zone: "Rajasthan & Gujarat" },
  { code: "342", city: "Jodhpur",            state: "Rajasthan",          zone: "Rajasthan & Gujarat" },
  { code: "380", city: "Ahmedabad",          state: "Gujarat",            zone: "Rajasthan & Gujarat" },
  { code: "395", city: "Surat",              state: "Gujarat",            zone: "Rajasthan & Gujarat" },
  { code: "400", city: "Mumbai",             state: "Maharashtra",        zone: "Maharashtra, Goa & MP" },
  { code: "411", city: "Pune",               state: "Maharashtra",        zone: "Maharashtra, Goa & MP" },
  { code: "440", city: "Nagpur",             state: "Maharashtra",        zone: "Maharashtra, Goa & MP" },
  { code: "462", city: "Bhopal",             state: "Madhya Pradesh",     zone: "Maharashtra, Goa & MP" },
  { code: "560", city: "Bengaluru",          state: "Karnataka",          zone: "Karnataka, AP & Telangana" },
  { code: "500", city: "Hyderabad",          state: "Telangana",          zone: "Karnataka, AP & Telangana" },
  { code: "530", city: "Visakhapatnam",      state: "Andhra Pradesh",     zone: "Karnataka, AP & Telangana" },
  { code: "600", city: "Chennai",            state: "Tamil Nadu",         zone: "Tamil Nadu & Kerala" },
  { code: "641", city: "Coimbatore",         state: "Tamil Nadu",         zone: "Tamil Nadu & Kerala" },
  { code: "682", city: "Kochi",              state: "Kerala",             zone: "Tamil Nadu & Kerala" },
  { code: "695", city: "Thiruvananthapuram", state: "Kerala",             zone: "Tamil Nadu & Kerala" },
  { code: "700", city: "Kolkata",            state: "West Bengal",        zone: "West Bengal, Odisha & the North-East" },
  { code: "751", city: "Bhubaneswar",        state: "Odisha",             zone: "West Bengal, Odisha & the North-East" },
  { code: "781", city: "Guwahati",           state: "Assam",              zone: "West Bengal, Odisha & the North-East" },
  { code: "800", city: "Patna",              state: "Bihar",              zone: "Bihar & Jharkhand" },
  { code: "834", city: "Ranchi",             state: "Jharkhand",          zone: "Bihar & Jharkhand" },
];

const LEVELS = [
  { n: 1, key: "zone",  label: "1 · Region",  digits: 1, points: 10, promptWord: "region"  },
  { n: 2, key: "state", label: "2 · State",   digits: 2, points: 20, promptWord: "state"   },
  { n: 3, key: "city",  label: "3 · City",    digits: 3, points: 30, promptWord: "city"    },
];
const ADVANCE_AFTER = 3; // correct answers before difficulty steps up

const state = {
  levelIndex: 0,
  score: 0,
  best: 0,
  streak: 0,
  correctAtLevel: 0,
  current: null,       // current dataset entry
  correctText: null,   // correct answer string for current question
  answered: false,
  hintsUsedThisQ: new Set(),
  album: [],           // "correct" | "wrong" per answered question this round
};

const el = {
  zoneLabel: document.getElementById("zoneLabel"),
  scoreValue: document.getElementById("scoreValue"),
  streakValue: document.getElementById("streakValue"),
  bestValue: document.getElementById("bestValue"),
  pinDigits: document.getElementById("pinDigits"),
  promptLabel: document.getElementById("promptLabel"),
  promptCaption: document.getElementById("promptCaption"),
  postmark: document.getElementById("postmarkStamp"),
  options: document.getElementById("options"),
  feedback: document.getElementById("feedback"),
  hintEcho: document.getElementById("hintEcho"),
  album: document.getElementById("album"),
  nextBtn: document.getElementById("nextBtn"),
  resetBtn: document.getElementById("resetBtn"),
  hintRegion: document.getElementById("hintRegion"),
  hintFifty: document.getElementById("hintFifty"),
  hintLetter: document.getElementById("hintLetter"),
};

function currentLevel() { return LEVELS[state.levelIndex]; }

function pickEntry() {
  return ENTRIES[Math.floor(Math.random() * ENTRIES.length)];
}

function maskedCode(entry, digits) {
  const shown = entry.code.slice(0, digits).split("").join("—");
  const hiddenCount = entry.code.length - digits;
  const hidden = hiddenCount > 0 ? "—" + Array(hiddenCount).fill("•").join("—") : "";
  return shown + hidden;
}

function distractorsFor(level, entry) {
  const key = level.key; // "zone" | "state" | "city"
  const correct = entry[key];
  const pool = ENTRIES.filter(e => e[key] !== correct);

  // Prefer distractors that share the *zone* for extra challenge at higher levels,
  // falling back to any distinct value.
  const sameZone = pool.filter(e => e.zone === entry.zone);
  const shuffled = shuffle([...sameZone, ...shuffle(pool)]);

  const seen = new Set([correct]);
  const picks = [];
  for (const e of shuffled) {
    if (!seen.has(e[key])) {
      seen.add(e[key]);
      picks.push(e[key]);
    }
    if (picks.length === 3) break;
  }
  return picks;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function newQuestion() {
  const level = currentLevel();
  state.current = pickEntry();
  state.correctText = state.current[level.key];
  state.answered = false;
  state.hintsUsedThisQ.clear();

  el.zoneLabel.textContent = level.label;
  el.pinDigits.textContent = maskedCode(state.current, level.digits);
  el.promptLabel.textContent = `This parcel is addressed to a PIN prefix beginning`;
  el.promptCaption.textContent = level.key === "zone"
    ? "Which postal region is it entering?"
    : level.key === "state"
      ? "Which state is it headed to?"
      : "Which city will sort and deliver it?";

  el.postmark.className = "stamp-postmark";
  el.postmark.textContent = "";
  el.feedback.textContent = "\u00A0";
  el.feedback.className = "feedback";
  el.hintEcho.textContent = "";
  el.nextBtn.disabled = true;

  const options = shuffle([state.correctText, ...distractorsFor(level, state.current)]);
  el.options.innerHTML = "";
  options.forEach(text => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = text;
    btn.addEventListener("click", () => submitAnswer(text, btn));
    el.options.appendChild(btn);
  });

  [el.hintRegion, el.hintFifty, el.hintLetter].forEach(b => (b.disabled = false));
  if (level.key === "zone") el.hintRegion.disabled = true; // region hint = the answer at level 1
}

function submitAnswer(text, btn) {
  if (state.answered) return;
  state.answered = true;

  const isCorrect = text === state.correctText;
  const level = currentLevel();

  [...el.options.children].forEach(b => {
    b.disabled = true;
    if (b.textContent === state.correctText) b.classList.add("correct");
    else if (b === btn) b.classList.add("wrong");
  });

  const hintPenalty = state.hintsUsedThisQ.size ? 0 : 0; // costs already deducted live
  if (isCorrect) {
    state.streak += 1;
    const streakBonus = state.streak >= 3 ? 5 : 0;
    state.score += level.points + streakBonus;
    state.correctAtLevel += 1;
    el.feedback.textContent = streakBonus
      ? `Delivered! +${level.points} and a streak bonus of +${streakBonus}.`
      : `Delivered! +${level.points} points.`;
    el.feedback.classList.add("correct");
    stampPostmark("correct", "DELIVERED");
    pushAlbum("correct");
    maybeAdvanceLevel();
  } else {
    state.streak = 0;
    state.correctAtLevel = 0;
    el.feedback.textContent = `Returned to sender — it was ${state.correctText}.`;
    el.feedback.classList.add("wrong");
    stampPostmark("wrong", "RETURNED");
    pushAlbum("wrong");
  }

  if (state.score > state.best) state.best = state.score;
  updateHud();
  el.nextBtn.disabled = false;
}

function maybeAdvanceLevel() {
  if (state.correctAtLevel >= ADVANCE_AFTER && state.levelIndex < LEVELS.length - 1) {
    state.levelIndex += 1;
    state.correctAtLevel = 0;
    el.feedback.textContent += ` Difficulty rises — now sorting by ${currentLevel().promptWord}.`;
  }
}

function stampPostmark(kind, word) {
  el.postmark.textContent = word;
  el.postmark.className = `stamp-postmark show ${kind}`;
}

function pushAlbum(kind) {
  state.album.push(kind);
  const slot = document.createElement("span");
  slot.className = `slot ${kind}`;
  el.album.appendChild(slot);
}

function updateHud() {
  el.scoreValue.textContent = Math.max(0, state.score);
  el.streakValue.textContent = state.streak;
  el.bestValue.textContent = state.best;
}

function spendHint(cost) {
  state.score = Math.max(0, state.score - cost);
  updateHud();
}

/* ---------- Hints ---------- */
el.hintRegion.addEventListener("click", () => {
  if (state.answered || state.hintsUsedThisQ.has("region")) return;
  state.hintsUsedThisQ.add("region");
  spendHint(5);
  el.hintEcho.textContent = `This prefix falls in: ${state.current.zone}.`;
  el.hintRegion.disabled = true;
});

el.hintFifty.addEventListener("click", () => {
  if (state.answered || state.hintsUsedThisQ.has("fifty")) return;
  const wrongBtns = [...el.options.children].filter(b => b.textContent !== state.correctText && !b.classList.contains("eliminated"));
  const toEliminate = shuffle(wrongBtns).slice(0, 2);
  if (toEliminate.length < 2) return;
  state.hintsUsedThisQ.add("fifty");
  spendHint(10);
  toEliminate.forEach(b => { b.classList.add("eliminated"); b.disabled = true; });
  el.hintEcho.textContent = "Two wrong destinations crossed out.";
  el.hintFifty.disabled = true;
});

el.hintLetter.addEventListener("click", () => {
  if (state.answered || state.hintsUsedThisQ.has("letter")) return;
  state.hintsUsedThisQ.add("letter");
  spendHint(15);
  el.hintEcho.textContent = `The answer starts with "${state.correctText[0]}".`;
  el.hintLetter.disabled = true;
});

/* ---------- Controls ---------- */
el.nextBtn.addEventListener("click", newQuestion);

el.resetBtn.addEventListener("click", () => {
  state.levelIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.correctAtLevel = 0;
  state.album = [];
  el.album.innerHTML = "";
  updateHud();
  newQuestion();
});

/* ---------- Boot ---------- */
updateHud();
newQuestion();