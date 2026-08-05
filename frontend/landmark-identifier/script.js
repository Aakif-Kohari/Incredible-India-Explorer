import { LandmarkRecognitionEngine } from "../../frontend/js-modules/landmark-recognition-engine.js";

const HASH_SIZE = 8; // 8x8 -> 64-bit hash, matches js-modules/landmark-data.js
const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8 MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const HISTORY_STORAGE_KEY = "landmarkIdentifier.history.v1";

const landmarks = (window.landmarkData && window.landmarkData.landmarks) || [];
const tripDestinations = window.tripDestinations || [];

function loadStoredHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function persistHistory(engine) {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(engine.getHistory()));
  } catch (err) {
    // Storage may be unavailable (private browsing, quota); fail silently.
  }
}

const engine = new LandmarkRecognitionEngine({
  landmarks,
  history: loadStoredHistory(),
  minConfidence: 0.55
});

/**
 * Computes a 64-bit average-hash (aHash) for an <img> element using a
 * canvas: downscale to 8x8, convert to grayscale, threshold at the mean.
 * Mirrors the offline hashing used to generate js-modules/landmark-data.js.
 */
function computeImageHash(imgEl) {
  const canvas = document.createElement("canvas");
  canvas.width = HASH_SIZE;
  canvas.height = HASH_SIZE;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(imgEl, 0, 0, HASH_SIZE, HASH_SIZE);

  const { data } = ctx.getImageData(0, 0, HASH_SIZE, HASH_SIZE);
  const grays = [];
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    // Standard luma weights.
    grays.push(0.299 * r + 0.587 * g + 0.114 * b);
  }

  const avg = grays.reduce((sum, v) => sum + v, 0) / grays.length;
  return grays.map((v) => (v >= avg ? "1" : "0")).join("");
}

function fileToImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ img, url });
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read this image file."));
    };
    img.src = url;
  });
}

function confidenceLabel(confidence) {
  if (confidence >= 0.75) return "confidence-high";
  if (confidence >= 0.55) return "confidence-medium";
  return "confidence-low";
}

function renderResult(match, isConfident) {
  const { landmark, confidence } = match;
  const card = document.getElementById("best-match-card");
  const badge = document.getElementById("confidence-badge");

  document.getElementById("result-image").src = landmark.image;
  document.getElementById("result-image").alt = landmark.name;
  document.getElementById("result-name").textContent = landmark.name;
  document.getElementById("result-category").textContent = landmark.category || "";
  document.getElementById("result-location").textContent = [landmark.city, landmark.state].filter(Boolean).join(", ");
  document.getElementById("result-description").textContent = landmark.description || "";
  document.getElementById("result-built").textContent = landmark.built || "Unknown";
  document.getElementById("result-best-time").textContent = landmark.bestTimeToVisit || "Year-round";
  document.getElementById("result-significance").textContent = landmark.significance || "";

  badge.textContent = `${Math.round(confidence * 100)}% match`;
  badge.className = "confidence-badge " + confidenceLabel(confidence);

  const related = LandmarkRecognitionEngine.getRelatedDestinations(landmark, tripDestinations);
  const nearbyNames = related.length
    ? related.flatMap((r) => (r.highlights && r.highlights.length ? r.highlights : [r.name]))
    : landmark.nearbyAttractions || [];
  const nearbyList = document.getElementById("nearby-list");
  nearbyList.innerHTML = "";
  (nearbyNames.length ? nearbyNames : ["No nearby attractions on file yet"]).slice(0, 6).forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    nearbyList.appendChild(li);
  });

  card.hidden = false;
  document.getElementById("low-confidence-notice").hidden = isConfident;
}

function renderAltMatches(matches, skipId) {
  const wrap = document.getElementById("alt-matches");
  const grid = document.getElementById("alt-match-grid");
  grid.innerHTML = "";

  const alts = matches.filter((m) => m.landmark.id !== skipId).slice(0, 4);
  if (alts.length === 0) {
    wrap.hidden = true;
    return;
  }

  alts.forEach(({ landmark, confidence }) => {
    const card = document.createElement("div");
    card.className = "alt-match-card";
    card.innerHTML = `
      <img src="${landmark.image}" alt="${landmark.name}">
      <div class="alt-match-info">
        <strong>${landmark.name}</strong>
        <span>${Math.round(confidence * 100)}% match</span>
      </div>
    `;
    grid.appendChild(card);
  });

  wrap.hidden = false;
}

function renderHistory() {
  const list = document.getElementById("history-list");
  const empty = document.getElementById("history-empty");
  const history = engine.getHistory();

  list.innerHTML = "";
  if (history.length === 0) {
    empty.hidden = false;
    list.hidden = true;
    return;
  }

  empty.hidden = true;
  list.hidden = false;
  history.forEach((entry) => {
    const li = document.createElement("li");
    const date = new Date(entry.timestamp);
    const confidenceText = typeof entry.confidence === "number" ? `${Math.round(entry.confidence * 100)}%` : "--";
    li.innerHTML = `
      <span>${entry.landmarkName}</span>
      <span class="history-confidence">${confidenceText} · ${date.toLocaleDateString()}</span>
    `;
    list.appendChild(li);
  });
}

function renderLibrary() {
  const grid = document.getElementById("library-grid");
  grid.innerHTML = "";
  landmarks.forEach((landmark) => {
    const card = document.createElement("div");
    card.className = "library-card";
    card.innerHTML = `
      <img src="${landmark.image}" alt="${landmark.name}" loading="lazy">
      <div class="library-info">
        <strong>${landmark.name}</strong>
        <span>${landmark.state}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function setStatus(message, isError = false) {
  const status = document.getElementById("upload-status");
  status.textContent = message;
  status.classList.toggle("is-error", isError);
}

function validateFile(file) {
  if (!file) return "Please choose an image file.";
  if (!ACCEPTED_TYPES.includes(file.type)) return "Unsupported format. Please upload a JPG, PNG, or WEBP image.";
  if (file.size > MAX_FILE_BYTES) return "That image is larger than 8 MB. Please choose a smaller file.";
  return null;
}

function init() {
  renderLibrary();
  renderHistory();

  const fileInput = document.getElementById("landmark-file");
  const dropZone = document.getElementById("drop-zone");
  const dropZoneInner = document.getElementById("drop-zone-inner");
  const previewImage = document.getElementById("preview-image");
  const identifyBtn = document.getElementById("identify-btn");
  const clearBtn = document.getElementById("clear-btn");
  const form = document.getElementById("upload-form");
  const resultsSection = document.getElementById("results-section");

  let currentFile = null;
  let currentObjectUrl = null;

  function resetUpload() {
    currentFile = null;
    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
    fileInput.value = "";
    previewImage.hidden = true;
    previewImage.src = "";
    dropZoneInner.hidden = false;
    identifyBtn.disabled = true;
    clearBtn.hidden = true;
    setStatus("");
  }

  function handleFile(file) {
    const error = validateFile(file);
    if (error) {
      setStatus(error, true);
      return;
    }
    currentFile = file;
    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = URL.createObjectURL(file);
    previewImage.src = currentObjectUrl;
    previewImage.hidden = false;
    dropZoneInner.hidden = true;
    identifyBtn.disabled = false;
    clearBtn.hidden = false;
    setStatus(`Ready to identify "${file.name}".`);
  }

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) handleFile(file);
  });

  ["dragenter", "dragover"].forEach((evt) => {
    dropZone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropZone.classList.add("drag-active");
    });
  });

  ["dragleave", "drop"].forEach((evt) => {
    dropZone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropZone.classList.remove("drag-active");
    });
  });

  dropZone.addEventListener("drop", (e) => {
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  clearBtn.addEventListener("click", resetUpload);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentFile) return;

    identifyBtn.disabled = true;
    setStatus("Analyzing image…");

    try {
      const { img } = await fileToImage(currentFile);
      const hash = computeImageHash(img);
      const { matches, best, isConfident } = engine.identify(hash, { topN: 5 });

      if (!best) {
        setStatus("No landmarks in our database could be compared to this image.", true);
        resultsSection.hidden = true;
        return;
      }

      renderResult(best, isConfident);
      renderAltMatches(matches, best.landmark.id);

      engine.addToHistory({
        landmarkId: best.landmark.id,
        landmarkName: best.landmark.name,
        confidence: best.confidence
      });
      persistHistory(engine);
      renderHistory();

      resultsSection.hidden = false;
      resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      setStatus(isConfident ? "Match found!" : "Best-effort match shown below (low confidence).");
    } catch (err) {
      setStatus(err.message || "Something went wrong while analyzing the image.", true);
    } finally {
      identifyBtn.disabled = false;
    }
  });

  document.getElementById("clear-history-btn").addEventListener("click", () => {
    engine.clearHistory();
    persistHistory(engine);
    renderHistory();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
