// ---------- National Days Data ----------
const allDays = [
  {
    id: "republic-day",
    name: "Republic Day",
    icon: "🇮🇳",
    date: "26 January",
    month: "january",
    dateNum: "26",
    monthLabel: "Jan",
    description: "Marks the day the Constitution of India came into force, transforming the country into a sovereign, democratic republic.",
    history: "On 26 January 1950, the Constitution of India replaced the Government of India Act of 1935 as the country's supreme legal framework. The date was chosen to honour 26 January 1930, when the Indian National Congress had declared Purna Swaraj — complete independence — years before actual independence was achieved.",
    why: "The day celebrates India's transition from a British dominion to a fully sovereign republic, where power rests with the people through their elected representatives rather than a monarch or colonial authority.",
    timeline: [
      "26 January 1930 — Purna Swaraj (complete independence) declared by the Indian National Congress.",
      "15 August 1947 — India gains independence from British rule.",
      "26 January 1950 — The Constitution of India comes into force."
    ]
  },
  {
    id: "independence-day",
    name: "Independence Day",
    icon: "🎉",
    date: "15 August",
    month: "august",
    dateNum: "15",
    monthLabel: "Aug",
    description: "Commemorates India's independence from British colonial rule after nearly two centuries.",
    history: "India gained independence on 15 August 1947, ending nearly 200 years of British rule. The transition also involved the partition of British India into the independent nations of India and Pakistan.",
    why: "The day honours the sacrifices of countless freedom fighters and marks the birth of India as an independent nation, celebrated with flag hoisting, parades, and patriotic events nationwide.",
    timeline: [
      "1857 — The First War of Independence begins.",
      "1920s–1940s — Mass movements led by Mahatma Gandhi and other leaders intensify the freedom struggle.",
      "15 August 1947 — India officially gains independence from British rule."
    ]
  },
  {
    id: "constitution-day",
    name: "Constitution Day",
    icon: "📖",
    date: "26 November",
    month: "november",
    dateNum: "26",
    monthLabel: "Nov",
    description: "Also known as Samvidhan Divas or National Law Day, this day commemorates the formal adoption of India's Constitution.",
    history: "On 26 November 1949, the Constituent Assembly of India formally adopted the Constitution, though it would not come into force until 26 January 1950. Constitution Day itself was first officially observed in 2015.",
    why: "The day is a reminder of the values enshrined in the Constitution and is often marked with reading sessions of the Preamble, awareness programmes, and educational activities in schools and colleges.",
    timeline: [
      "1946–1949 — The Constituent Assembly drafts the Constitution over nearly three years.",
      "26 November 1949 — The Constitution is formally adopted by the Constituent Assembly.",
      "2015 — Constitution Day is officially instituted for the first time."
    ]
  },
  {
    id: "national-unity-day",
    name: "National Unity Day",
    icon: "🗿",
    date: "31 October",
    month: "october",
    dateNum: "31",
    monthLabel: "Oct",
    description: "Known as Rashtriya Ekta Diwas, this day marks the birth anniversary of Sardar Vallabhbhai Patel, honouring his role in unifying India.",
    history: "Introduced by the Government of India in 2014, National Unity Day falls on the birth anniversary of Sardar Vallabhbhai Patel, who played a central role in integrating over 560 princely states into the newly independent Union of India.",
    why: "The day celebrates the spirit of national integration and unity, values Patel worked tirelessly to uphold during India's formative years as an independent nation.",
    timeline: [
      "31 October 1875 — Sardar Vallabhbhai Patel is born.",
      "1947–1949 — Patel leads the political integration of princely states into India.",
      "2014 — National Unity Day is instituted to mark his birth anniversary."
    ]
  },
  {
    id: "gandhi-jayanti",
    name: "Gandhi Jayanti",
    icon: "🕊️",
    date: "2 October",
    month: "october",
    dateNum: "2",
    monthLabel: "Oct",
    description: "Honours the birth anniversary of Mahatma Gandhi, the Father of the Nation and a central figure of India's independence movement.",
    history: "Mahatma Gandhi was born on 2 October 1869 and led India's freedom struggle through his philosophy of non-violence and truth. In 2007, the United Nations also declared this date the International Day of Non-Violence.",
    why: "The day is one of India's three official national holidays and honours Gandhi's enduring legacy of peaceful resistance, truth, and moral courage.",
    timeline: [
      "2 October 1869 — Mahatma Gandhi is born.",
      "1915–1947 — Gandhi leads major movements in India's independence struggle.",
      "2007 — The United Nations declares 2 October the International Day of Non-Violence."
    ]
  },
  {
    id: "armed-forces-flag-day",
    name: "Armed Forces Flag Day",
    icon: "🎖️",
    date: "7 December",
    month: "december",
    dateNum: "7",
    monthLabel: "Dec",
    description: "A day dedicated to honouring and supporting the members of India's armed forces and their families.",
    history: "Armed Forces Flag Day has been observed annually since 1949, established shortly after independence to recognise the sacrifices of soldiers who serve and have served the nation.",
    why: "The day raises funds and awareness for the welfare of servicemen, war widows, and their dependents, through the distribution of small paper flags in a nationwide collection drive.",
    timeline: [
      "1947 — India gains independence and establishes its own armed forces structure.",
      "1949 — Armed Forces Flag Day is instituted for the first time.",
      "Present day — Continues as an annual nationwide tribute and fundraising observance."
    ]
  },
  {
    id: "national-science-day",
    name: "National Science Day",
    icon: "🔬",
    date: "28 February",
    month: "february",
    dateNum: "28",
    monthLabel: "Feb",
    description: "Celebrates the discovery of the Raman Effect by physicist Sir C. V. Raman, a landmark moment in Indian scientific history.",
    history: "On 28 February 1928, Sir C. V. Raman discovered the phenomenon now known as the Raman Effect, describing how light changes wavelength when it passes through a transparent material. This discovery later earned him the Nobel Prize in Physics in 1930.",
    why: "The day promotes scientific temperament and honours India's contributions to global science, with events, exhibitions, and lectures held in schools and research institutions nationwide.",
    timeline: [
      "28 February 1928 — Sir C. V. Raman discovers the Raman Effect.",
      "1930 — Raman is awarded the Nobel Prize in Physics for this discovery.",
      "1986 — National Science Day is instituted to commemorate the discovery."
    ]
  },
  {
    id: "teachers-day",
    name: "Teachers' Day",
    icon: "🍎",
    date: "5 September",
    month: "september",
    dateNum: "5",
    monthLabel: "Sep",
    description: "Celebrates the birth anniversary of Dr. Sarvepalli Radhakrishnan, a renowned teacher, philosopher, and India's second President.",
    history: "Dr. Sarvepalli Radhakrishnan was born on 5 September 1888 and went on to become one of India's most respected academicians and statesmen. When his students requested to celebrate his birthday, he asked that the day instead be observed as Teachers' Day.",
    why: "The day honours the contributions of teachers across the country, with students often organising cultural events and expressing gratitude to their educators.",
    timeline: [
      "5 September 1888 — Dr. Sarvepalli Radhakrishnan is born.",
      "1962 — He becomes the second President of India.",
      "Since 1962 — His birthday is observed annually as Teachers' Day."
    ]
  },
  {
    id: "childrens-day",
    name: "Children's Day",
    icon: "🎈",
    date: "14 November",
    month: "november",
    dateNum: "14",
    monthLabel: "Nov",
    description: "Marks the birth anniversary of Jawaharlal Nehru, India's first Prime Minister, who was known for his deep affection for children.",
    history: "Jawaharlal Nehru was born on 14 November 1889 and served as India's first Prime Minister. Known affectionately as 'Chacha Nehru,' his fondness for children led to his birthday being observed as Children's Day in India.",
    why: "The day celebrates childhood and children's rights, with schools organising cultural programmes, competitions, and celebrations across the country.",
    timeline: [
      "14 November 1889 — Jawaharlal Nehru is born.",
      "1947–1964 — Nehru serves as India's first Prime Minister.",
      "Since 1964 — His birthday is observed annually as Children's Day."
    ]
  },
  {
    id: "national-sports-day",
    name: "National Sports Day",
    icon: "🏑",
    date: "29 August",
    month: "august",
    dateNum: "29",
    monthLabel: "Aug",
    description: "Celebrates the birth anniversary of hockey legend Major Dhyan Chand, honouring India's sporting achievements.",
    history: "Major Dhyan Chand, widely regarded as one of the greatest hockey players in history, was born on 29 August 1905. His extraordinary skill helped India win multiple Olympic gold medals in field hockey.",
    why: "The day promotes sports and fitness across the country, with major sporting awards and honours traditionally announced or presented around this date.",
    timeline: [
      "29 August 1905 — Major Dhyan Chand is born.",
      "1928, 1932, 1936 — India wins consecutive Olympic gold medals in hockey during his era.",
      "2012 — National Sports Day is instituted in his honour."
    ]
  }
];

const monthOrder = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const monthDisplayNames = {
  january: "January", february: "February", march: "March", april: "April",
  may: "May", june: "June", july: "July", august: "August",
  september: "September", october: "October", november: "November", december: "December"
};

// ---------- State ----------
let activeMonth = "all";

// ---------- DOM References ----------
const monthFilter = document.getElementById("monthFilter");
const calendarGrid = document.getElementById("calendarGrid");

const dayModalOverlay = document.getElementById("dayModalOverlay");
const dayModalClose = document.getElementById("dayModalClose");
const modalDayDate = document.getElementById("modalDayDate");
const modalDayIcon = document.getElementById("modalDayIcon");
const modalDayTitle = document.getElementById("modalDayTitle");
const modalDayDesc = document.getElementById("modalDayDesc");
const modalDayHistory = document.getElementById("modalDayHistory");
const modalDayWhy = document.getElementById("modalDayWhy");
const modalDayTimeline = document.getElementById("modalDayTimeline");

let lastFocusedElement = null;

// ---------- Build Month Filter ----------
function buildMonthFilter() {
  const usedMonths = [...new Set(allDays.map(d => d.month))]
    .sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));

  usedMonths.forEach(month => {
    const btn = document.createElement("button");
    btn.className = "month-chip";
    btn.dataset.month = month;
    btn.textContent = monthDisplayNames[month];
    monthFilter.appendChild(btn);
  });
}

// ---------- Render Calendar ----------
function renderCalendar() {
  const filtered = activeMonth === "all"
    ? [...allDays].sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month))
    : allDays.filter(d => d.month === activeMonth);

  calendarGrid.innerHTML = "";

  if (filtered.length === 0) {
    calendarGrid.innerHTML = `<div class="no-results">No national days found for this month.</div>`;
    return;
  }

  filtered.forEach(day => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "day-card";
    card.setAttribute("aria-label", `View details about ${day.name}`);
    card.innerHTML = `
      <div class="day-card-date-badge">
        <span class="day-card-date-num">${day.dateNum}</span>
        <span class="day-card-date-month">${day.monthLabel}</span>
      </div>
      <span class="day-card-icon">${day.icon}</span>
      <h3 class="day-card-name">${day.name}</h3>
      <p class="day-card-desc">${day.description}</p>
      <span class="day-card-cta">Tap to explore &rarr;</span>
    `;
    card.addEventListener("click", () => openModal(day, card));
    calendarGrid.appendChild(card);
  });
}

// ---------- Modal ----------
function openModal(day, triggerEl) {
  lastFocusedElement = triggerEl;

  modalDayDate.textContent = day.date;
  modalDayIcon.textContent = day.icon;
  modalDayTitle.textContent = day.name;
  modalDayDesc.textContent = day.description;
  modalDayHistory.textContent = day.history;
  modalDayWhy.textContent = day.why;

  modalDayTimeline.innerHTML = "";
  day.timeline.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    modalDayTimeline.appendChild(li);
  });

  dayModalOverlay.classList.add("active");
  dayModalClose.focus();
}

function closeModal() {
  dayModalOverlay.classList.remove("active");
  if (lastFocusedElement) lastFocusedElement.focus();
}

dayModalClose.addEventListener("click", closeModal);
dayModalOverlay.addEventListener("click", (e) => {
  if (e.target === dayModalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && dayModalOverlay.classList.contains("active")) closeModal();
});

// ---------- Month Filter Clicks ----------
monthFilter.addEventListener("click", (e) => {
  const btn = e.target.closest(".month-chip");
  if (!btn) return;
  monthFilter.querySelectorAll(".month-chip").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeMonth = btn.dataset.month;
  renderCalendar();
});

// ---------- Init ----------
buildMonthFilter();
renderCalendar();