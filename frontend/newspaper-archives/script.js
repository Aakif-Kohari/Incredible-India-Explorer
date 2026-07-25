const headlines = [
  { text: "Jallianwala Bagh Massacre Shocks the Nation", date: 1919, category: "Freedom Movement" },
  { text: "Mahatma Gandhi Launches Quit India Movement", date: 1942, category: "Freedom Movement" },
  { text: "India Achieves Independence from British Rule", date: 1947, category: "Historical Event" },
  { text: "India Adopts Its Constitution", date: 1950, category: "Historical Event" },
  { text: "India Wins First Cricket World Cup", date: 1983, category: "Sports Milestone" },
  { text: "Aryabhata: India's First Satellite Launched", date: 1975, category: "Scientific Achievement" },
  { text: "India Conducts First Nuclear Test (Smiling Buddha)", date: 1974, category: "Scientific Achievement" },
  { text: "Rakesh Sharma Becomes First Indian in Space", date: 1984, category: "Scientific Achievement" },
  { text: "India Wins T20 Cricket World Cup", date: 2007, category: "Sports Milestone" },
  { text: "Chandrayaan-3 Lands Near Moon's South Pole", date: 2023, category: "Scientific Achievement" }
];

let currentOrder = [];
let score = 0;
let draggedIndex = null;
let hasScored = false;

const timelineEl = document.getElementById("timeline");
const shuffleBtn = document.getElementById("shuffleBtn");
const checkBtn = document.getElementById("checkBtn");
const scoreDisplay = document.getElementById("scoreDisplay");
const resultMessage = document.getElementById("resultMessage");

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderTimeline() {
  timelineEl.innerHTML = "";
  currentOrder.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "headline-card";
    card.draggable = true;
    card.dataset.index = index;
    card.dataset.category = item.category;

    card.innerHTML = `
      <div class="headline-text">${item.text}</div>
      <span class="headline-category">${item.category}</span>
    `;

    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragover", handleDragOver);
    card.addEventListener("drop", handleDrop);
    card.addEventListener("dragend", handleDragEnd);

    timelineEl.appendChild(card);
  });
}

function handleDragStart(e) {
  draggedIndex = Number(e.currentTarget.dataset.index);
  e.currentTarget.classList.add("dragging");
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  const targetIndex = Number(e.currentTarget.dataset.index);
  if (draggedIndex === null || draggedIndex === targetIndex) return;

  const temp = currentOrder[draggedIndex];
  currentOrder.splice(draggedIndex, 1);
  const adjustedIndex = draggedIndex < targetIndex ? targetIndex - 1 : targetIndex;
  currentOrder.splice(adjustedIndex, 0, temp);

  hasScored = false;
  renderTimeline();
}

function handleDragEnd(e) {
  e.currentTarget.classList.remove("dragging");
}

function checkOrder() {
  const cards = document.querySelectorAll(".headline-card");
  const sortedByDate = [...currentOrder].sort((a, b) => a.date - b.date);
  let correctCount = 0;

  currentOrder.forEach((item, index) => {
    if (item.date === sortedByDate[index].date) {
      cards[index].classList.add("correct");
      cards[index].classList.remove("wrong");
      correctCount++;
    } else {
      cards[index].classList.add("wrong");
      cards[index].classList.remove("correct");
    }
  });

  if (correctCount === currentOrder.length) {
    if (!hasScored) {
      score += 10;
      hasScored = true;
    }
    resultMessage.textContent = "🎉 Perfect! All headlines are in correct chronological order!";
    resultMessage.className = "result-message success";
  } else {
    resultMessage.textContent = `Not quite right — ${correctCount}/${currentOrder.length} correctly placed. Try again!`;
    resultMessage.className = "result-message fail";
  }

  scoreDisplay.textContent = `Score: ${score}`;
}

shuffleBtn.addEventListener("click", () => {
  currentOrder = shuffleArray(headlines);
  hasScored = false;
  resultMessage.textContent = "";
  resultMessage.className = "result-message";
  renderTimeline();
});

checkBtn.addEventListener("click", checkOrder);

currentOrder = shuffleArray(headlines);
renderTimeline();