document.addEventListener("DOMContentLoaded", () => {
  const allIndiaData = [
    { year: 1951, population: 361088090, growth: 13.31, literacy: 18.33, genderRatio: 946, rural: 82.68, urban: 17.32 },
    { year: 1961, population: 439234771, growth: 21.64, literacy: 28.3, genderRatio: 941, rural: 81.96, urban: 18.04 },
    { year: 1971, population: 548159652, growth: 24.80, literacy: 34.47, genderRatio: 930, rural: 80.09, urban: 19.91 },
    { year: 1981, population: 683329097, growth: 24.66, literacy: 43.57, genderRatio: 934, rural: 76.68, urban: 23.32 },
    { year: 1991, population: 846421039, growth: 23.87, literacy: 52.21, genderRatio: 927, rural: 74.25, urban: 25.75 },
    { year: 2001, population: 1028737436, growth: 21.54, literacy: 64.84, genderRatio: 933, rural: 72.19, urban: 27.81 },
    { year: 2011, population: 1210854977, growth: 17.64, literacy: 74.04, genderRatio: 943, rural: 68.84, urban: 31.16 }
  ];

  const stateData = [
    { name: "Uttar Pradesh", 1951: 63215724, 1961: 70146263, 1971: 83849923, 1981: 110858102, 1991: 139112287, 2001: 166197921, 2011: 199812341, literacy2011: 67.68, gender2011: 912 },
    { name: "Maharashtra", 1951: 32965814, 1961: 39331619, 1971: 48964949, 1981: 62783409, 1991: 78937187, 2001: 96752283, 2011: 112374333, literacy2011: 82.34, gender2011: 929 },
    { name: "Bihar", 1951: 29080754, 1961: 34866019, 1971: 42126223, 1981: 52293792, 1991: 64530698, 2001: 82878586, 2011: 104099452, literacy2011: 61.80, gender2011: 918 },
    { name: "West Bengal", 1951: 26300762, 1961: 34926279, 1971: 44312011, 1981: 54580647, 1991: 68077965, 2001: 80176197, 2011: 91276115, literacy2011: 76.26, gender2011: 950 },
    { name: "Tamil Nadu", 1951: 30119046, 1961: 33686954, 1971: 41199438, 1981: 48408249, 1991: 55850410, 2001: 62110910, 2011: 72138958, literacy2011: 80.09, gender2011: 996 },
    { name: "Rajasthan", 1951: 15970732, 1961: 20155602, 1971: 25765612, 1981: 34260745, 1991: 44005990, 2001: 56507188, 2011: 68548437, literacy2011: 66.11, gender2011: 928 },
    { name: "Karnataka", 1951: 19403880, 1961: 23584528, 1971: 29299552, 1981: 37043704, 1991: 44817707, 2001: 52854352, 2011: 61095297, literacy2011: 75.36, gender2011: 973 },
    { name: "Madhya Pradesh", 1951: 18615213, 1961: 23662488, 1971: 30016625, 1981: 41435085, 1991: 60308296, 2001: 72597565, 2011: 85358965, literacy2011: 69.32, gender2011: 931 },
    { name: "Gujarat", 1951: 16462895, 1961: 20406048, 1971: 26693046, 1981: 34010571, 1991: 41303379, 2001: 50596946, 2011: 60383628, literacy2011: 78.03, gender2011: 919 },
    { name: "Andhra Pradesh", 1951: 21153444, 1961: 25963625, 1971: 32840951, 1981: 42583834, 1991: 53549864, 2001: 66508008, 2011: 76210007, literacy2011: 66.46, gender2011: 983 },
    { name: "Odisha", 1951: 14750115, 1961: 17561562, 1971: 21977413, 1981: 26583539, 1991: 31659693, 2001: 36804660, 2011: 41974218, literacy2011: 72.87, gender2011: 979 },
    { name: "Kerala", 1951: 13514096, 1961: 16903715, 1971: 21353370, 1981: 25453680, 1991: 29098513, 2001: 31841251, 2011: 33387677, literacy2011: 93.91, gender2011: 1084 },
    { name: "Jharkhand", 1951: 9472000, 1961: 11836000, 1971: 14341000, 1981: 17758000, 1991: 21843000, 2001: 26945829, 2011: 32988134, literacy2011: 66.41, gender2011: 948 },
    { name: "Assam", 1951: 8029035, 1961: 10837072, 1971: 14625152, 1981: 18041251, 1991: 22414322, 2001: 26655520, 2011: 31205576, literacy2011: 72.19, gender2011: 958 },
    { name: "Punjab", 1951: 12710402, 1961: 15566027, 1971: 17605894, 1981: 20281468, 1991: 24289232, 2001: 24358514, 2011: 27743338, literacy2011: 75.84, gender2011: 895 },
    { name: "Chhattisgarh", 1951: 7418000, 1961: 9173000, 1971: 11571000, 1981: 15561000, 1991: 18619000, 2001: 20833803, 2011: 25545198, literacy2011: 70.28, gender2011: 991 },
    { name: "Haryana", 1951: 5674045, 1961: 7594003, 1971: 10036034, 1981: 12922156, 1991: 16463648, 2001: 21144564, 2011: 25351462, literacy2011: 75.55, gender2011: 879 },
    { name: "Delhi", 1951: 1752000, 1961: 2658000, 1971: 4065000, 1981: 6216000, 1991: 9420000, 2001: 13850507, 2011: 16787941, literacy2011: 86.21, gender2011: 868 },
    { name: "Jammu & Kashmir", 1951: 4361000, 1961: 5051000, 1971: 6298000, 1981: 7730000, 1991: 10069000, 2001: 10143544, 2011: 12541302, literacy2011: 67.16, gender2011: 883 },
    { name: "Uttarakhand", 1951: 2943000, 1961: 3492000, 1971: 4451000, 1981: 5690000, 1991: 7341000, 2001: 8489349, 2011: 10086292, literacy2011: 78.82, gender2011: 963 },
    { name: "Himachal Pradesh", 1951: 2387000, 1961: 2812000, 1971: 3460000, 1981: 4263000, 1991: 5170000, 2001: 6077900, 2011: 6864602, literacy2011: 82.80, gender2011: 972 },
    { name: "Goa", 1951: 546000, 1961: 590000, 1971: 745000, 1981: 1016000, 1991: 1169000, 2001: 1347668, 2011: 1458545, literacy2011: 88.70, gender2011: 973 },
    { name: "Meghalaya", 1951: 610000, 1961: 772000, 1971: 1016000, 1981: 1334000, 1991: 1774000, 2001: 2318822, 2011: 2966889, literacy2011: 74.43, gender2011: 986 },
    { name: "Manipur", 1951: 578000, 1961: 740000, 1971: 1071000, 1981: 1421000, 1991: 1837000, 2001: 2293896, 2011: 2855794, literacy2011: 76.94, gender2011: 992 },
    { name: "Nagaland", 1951: 213000, 1961: 369000, 1971: 516000, 1981: 775000, 1991: 1210000, 2001: 1990036, 2011: 1978502, literacy2011: 79.55, gender2011: 931 },
    { name: "Mizoram", 1951: 196000, 1961: 266000, 1971: 372000, 1981: 494000, 1991: 690000, 2001: 888573, 2011: 1097206, literacy2011: 91.58, gender2011: 970 },
    { name: "Tripura", 1951: 639000, 1961: 1142000, 1971: 1556000, 1981: 2053000, 1991: 2757000, 2001: 3199341, 2011: 3673917, literacy2011: 87.75, gender2011: 960 },
    { name: "Arunachal Pradesh", 1951: 337000, 1961: 488000, 1971: 632000, 1981: 898000, 1991: 1098000, 2001: 1097968, 2011: 1383727, literacy2011: 65.38, gender2011: 938 },
    { name: "Sikkim", 1951: 138000, 1961: 163000, 1971: 210000, 1981: 315000, 1991: 406000, 2001: 540851, 2011: 610577, literacy2011: 81.42, gender2011: 890 },
    { name: "Chandigarh", 1951: 122000, 1961: 203000, 1971: 257000, 1981: 452000, 1991: 642000, 2001: 900914, 2011: 1055450, literacy2011: 86.43, gender2011: 818 }
  ];

  const COLORS = ["#ff9933", "#4f8cff", "#138808", "#e84393", "#6c5ce7", "#fdcb6e", "#00cec9", "#d63031", "#0984e3", "#e17055"];

  function drawRoundedTop(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
  }

  let currentMetric = "population";
  let selectedStates = ["Uttar Pradesh", "Maharashtra", "Bihar", "Tamil Nadu", "Kerala"];

  const decadeSelect = document.getElementById("decade-select");
  const stateSelect = document.getElementById("state-select");
  const stateFilterGroup = document.getElementById("state-filter-group");
  const compareStatesGroup = document.getElementById("compare-states-group");
  const stateCheckboxes = document.getElementById("state-checkboxes");
  const mainCanvas = document.getElementById("main-chart");
  const legend = document.getElementById("chart-legend");
  const downloadBtn = document.getElementById("download-csv");
  const scrollBtn = document.getElementById("btn-scroll-top");

  function formatNumber(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
    if (n >= 1e7) return (n / 1e7).toFixed(1) + "Cr";
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return n.toString();
  }

  function escapeHtml(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function init() {
    stateData.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.name;
      opt.textContent = s.name;
      stateSelect.appendChild(opt);
    });

    stateData.slice(0, 20).forEach(s => {
      const lbl = document.createElement("label");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.value = s.name;
      cb.checked = selectedStates.includes(s.name);
      cb.addEventListener("change", onStateCheckboxChange);
      lbl.appendChild(cb);
      lbl.appendChild(document.createTextNode(" " + s.name));
      stateCheckboxes.appendChild(lbl);
    });

    document.querySelectorAll(".metric-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".metric-tab").forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        currentMetric = tab.dataset.metric;
        updateControls();
        renderChart();
        updateInfoCards();
        updateTable();
      });
    });

    decadeSelect.addEventListener("change", () => { renderChart(); updateInfoCards(); });
    stateSelect.addEventListener("change", () => { renderChart(); updateInfoCards(); });
    downloadBtn.addEventListener("click", downloadCSV);

    window.addEventListener("scroll", () => {
      scrollBtn.classList.toggle("visible", window.scrollY > 400);
    });
    scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    updateControls();
    renderChart();
    updateInfoCards();
    updateTable();
  }

  function onStateCheckboxChange() {
    selectedStates = Array.from(stateCheckboxes.querySelectorAll("input:checked")).map(cb => cb.value);
    renderChart();
    updateInfoCards();
  }

  function updateControls() {
    stateFilterGroup.style.display = (currentMetric === "state-compare") ? "none" : (currentMetric === "population" || currentMetric === "literacy" || currentMetric === "gender" ? "" : "none");
    compareStatesGroup.style.display = (currentMetric === "state-compare") ? "" : "none";
    stateFilterGroup.style.display = "none";
  }

  /* ============ CHART DRAWING (Pure Canvas) ============ */

  function clearCanvas() {
    const ctx = mainCanvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = mainCanvas.parentElement.getBoundingClientRect();
    mainCanvas.width = rect.width * dpr;
    mainCanvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    return { ctx, w: rect.width, h: rect.height };
  }

  function renderChart() {
    switch (currentMetric) {
      case "population": renderBarChart(); break;
      case "literacy": renderLineChart("literacy", "%"); break;
      case "gender": renderBarChartGender(); break;
      case "rural-urban": renderStackedBar(); break;
      case "state-compare": renderStateCompare(); break;
    }
  }

  function renderBarChart() {
    const { ctx, w, h } = clearCanvas();
    const selectedDecade = decadeSelect.value;
    const data = selectedDecade === "all" ? allIndiaData : allIndiaData.filter(d => d.year === parseInt(selectedDecade));
    const maxPop = Math.max(...allIndiaData.map(d => d.population));

    const pad = { top: 40, bottom: 50, left: 80, right: 30 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const barW = Math.min(60, (chartW / data.length) * 0.6);
    const gap = (chartW - barW * data.length) / (data.length + 1);

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--census-muted").trim() || "#cbd5e1";
    ctx.font = "12px Outfit, sans-serif";
    ctx.textAlign = "right";

    for (let i = 0; i <= 5; i++) {
      const val = (maxPop / 5) * i;
      const y = pad.top + chartH - (val / maxPop) * chartH;
      ctx.fillText(formatNumber(val), pad.left - 10, y + 4);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
    }

    ctx.textAlign = "center";
    data.forEach((d, i) => {
      const x = pad.left + gap + i * (barW + gap);
      const barH = (d.population / maxPop) * chartH;
      const y = pad.top + chartH - barH;

      const grad = ctx.createLinearGradient(x, y, x, pad.top + chartH);
      grad.addColorStop(0, COLORS[i % COLORS.length]);
      grad.addColorStop(1, "rgba(0,0,0,0.3)");
      ctx.fillStyle = grad;

      drawRoundedTop(ctx, x, y, barW, barH, 6);
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px Outfit, sans-serif";
      ctx.fillText(formatNumber(d.population), x + barW / 2, y - 8);

      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--census-muted").trim() || "#cbd5e1";
      ctx.font = "12px Outfit, sans-serif";
      ctx.fillText(d.year, x + barW / 2, pad.top + chartH + 20);
    });

    legend.innerHTML = `<span><span class="legend-dot" style="background:#ff9933"></span> All-India Population by Census Decade</span>`;
  }

  function renderLineChart(metric, unit) {
    const { ctx, w, h } = clearCanvas();
    const pad = { top: 40, bottom: 50, left: 80, right: 30 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;

    const values = allIndiaData.map(d => d[metric]);
    const maxVal = Math.max(...values);
    const minVal = Math.min(...values);
    const range = maxVal - minVal || 1;

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--census-muted").trim() || "#cbd5e1";
    ctx.font = "12px Outfit, sans-serif";
    ctx.textAlign = "right";

    for (let i = 0; i <= 5; i++) {
      const val = minVal + (range / 5) * i;
      const y = pad.top + chartH - ((val - minVal) / range) * chartH;
      ctx.fillText(val.toFixed(1) + unit, pad.left - 10, y + 4);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
    }

    const points = allIndiaData.map((d, i) => {
      const x = pad.left + (i / (allIndiaData.length - 1)) * chartW;
      const y = pad.top + chartH - ((d[metric] - minVal) / range) * chartH;
      return { x, y, d };
    });

    ctx.strokeStyle = "#ff9933";
    ctx.lineWidth = 3;
    ctx.beginPath();
    points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.stroke();

    const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    grad.addColorStop(0, "rgba(255,153,51,0.25)");
    grad.addColorStop(1, "rgba(255,153,51,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(points[0].x, pad.top + chartH);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, pad.top + chartH);
    ctx.closePath();
    ctx.fill();

    points.forEach(p => {
      ctx.fillStyle = "#ff9933";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px Outfit, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(p.d[metric] + unit, p.x, p.y - 14);

      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--census-muted").trim() || "#cbd5e1";
      ctx.font = "12px Outfit, sans-serif";
      ctx.fillText(p.d.year, p.x, pad.top + chartH + 20);
    });

    const label = metric === "literacy" ? "All-India Literacy Rate" : "Gender Ratio (Females per 1000 Males)";
    legend.innerHTML = `<span><span class="legend-dot" style="background:#ff9933"></span> ${label}</span>`;
  }

  function renderBarChartGender() {
    const { ctx, w, h } = clearCanvas();
    const pad = { top: 40, bottom: 50, left: 80, right: 30 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;

    const values = allIndiaData.map(d => d.genderRatio);
    const minVal = Math.min(...values) - 20;
    const maxVal = Math.max(...values) + 20;
    const range = maxVal - minVal;

    const barW = Math.min(50, (chartW / allIndiaData.length) * 0.55);
    const gap = (chartW - barW * allIndiaData.length) / (allIndiaData.length + 1);

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--census-muted").trim() || "#cbd5e1";
    ctx.font = "12px Outfit, sans-serif";
    ctx.textAlign = "right";

    for (let i = 0; i <= 5; i++) {
      const val = minVal + (range / 5) * i;
      const y = pad.top + chartH - ((val - minVal) / range) * chartH;
      ctx.fillText(val.toFixed(0), pad.left - 10, y + 4);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
    }

    ctx.textAlign = "center";
    allIndiaData.forEach((d, i) => {
      const x = pad.left + gap + i * (barW + gap);
      const barH = ((d.genderRatio - minVal) / range) * chartH;
      const y = pad.top + chartH - barH;

      const grad = ctx.createLinearGradient(x, y, x, pad.top + chartH);
      grad.addColorStop(0, d.genderRatio >= 940 ? "#e84393" : "#d63031");
      grad.addColorStop(1, "rgba(0,0,0,0.3)");
      ctx.fillStyle = grad;

      drawRoundedTop(ctx, x, y, barW, barH, 6);
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px Outfit, sans-serif";
      ctx.fillText(d.genderRatio, x + barW / 2, y - 8);

      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--census-muted").trim() || "#cbd5e1";
      ctx.font = "12px Outfit, sans-serif";
      ctx.fillText(d.year, x + barW / 2, pad.top + chartH + 20);
    });

    legend.innerHTML = `<span><span class="legend-dot" style="background:#e84393"></span> Gender Ratio (Females per 1000 Males)</span>`;
  }

  function renderStackedBar() {
    const { ctx, w, h } = clearCanvas();
    const pad = { top: 40, bottom: 50, left: 80, right: 30 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;

    const barW = Math.min(55, (chartW / allIndiaData.length) * 0.55);
    const gap = (chartW - barW * allIndiaData.length) / (allIndiaData.length + 1);

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--census-muted").trim() || "#cbd5e1";
    ctx.font = "12px Outfit, sans-serif";
    ctx.textAlign = "right";

    for (let i = 0; i <= 5; i++) {
      const val = i * 20;
      const y = pad.top + chartH - (val / 100) * chartH;
      ctx.fillText(val + "%", pad.left - 10, y + 4);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
    }

    ctx.textAlign = "center";
    allIndiaData.forEach((d, i) => {
      const x = pad.left + gap + i * (barW + gap);
      const ruralH = (d.rural / 100) * chartH;
      const urbanH = (d.urban / 100) * chartH;

      ctx.fillStyle = "#138808";
      drawRoundedTop(ctx, x, pad.top + chartH - ruralH - urbanH, barW, ruralH, 6);
      ctx.fill();

      ctx.fillStyle = "#4f8cff";
      ctx.beginPath();
      ctx.rect(x, pad.top + chartH - urbanH, barW, urbanH);
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.font = "bold 10px Outfit, sans-serif";
      ctx.fillText(d.rural + "%", x + barW / 2, pad.top + chartH - ruralH - urbanH - 6);
      ctx.fillText(d.urban + "%", x + barW / 2, pad.top + chartH - 8);

      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--census-muted").trim() || "#cbd5e1";
      ctx.font = "12px Outfit, sans-serif";
      ctx.fillText(d.year, x + barW / 2, pad.top + chartH + 20);
    });

    legend.innerHTML = `
      <span><span class="legend-dot" style="background:#138808"></span> Rural</span>
      <span><span class="legend-dot" style="background:#4f8cff"></span> Urban</span>
    `;
  }

  function renderStateCompare() {
    const { ctx, w, h } = clearCanvas();
    const pad = { top: 40, bottom: 50, left: 80, right: 30 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;

    const filtered = stateData.filter(s => selectedStates.includes(s.name));
    if (filtered.length === 0) {
      const ctx2 = mainCanvas.getContext("2d");
      ctx2.fillStyle = "#cbd5e1";
      ctx2.font = "16px Outfit, sans-serif";
      ctx2.textAlign = "center";
      ctx2.fillText("Select states from the checkboxes above to compare.", w / 2, h / 2);
      legend.innerHTML = "";
      return;
    }

    const years = [1951, 1961, 1971, 1981, 1991, 2001, 2011];
    const allVals = filtered.flatMap(s => years.map(y => s[y]));
    const maxVal = Math.max(...allVals);
    const minVal = Math.min(...allVals);
    const range = maxVal - minVal || 1;

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--census-muted").trim() || "#cbd5e1";
    ctx.font = "12px Outfit, sans-serif";
    ctx.textAlign = "right";

    for (let i = 0; i <= 5; i++) {
      const val = minVal + (range / 5) * i;
      const y = pad.top + chartH - ((val - minVal) / range) * chartH;
      ctx.fillText(formatNumber(val), pad.left - 10, y + 4);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
    }

    years.forEach((yr, i) => {
      const x = pad.left + (i / (years.length - 1)) * chartW;
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--census-muted").trim() || "#cbd5e1";
      ctx.font = "12px Outfit, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(yr, x, pad.top + chartH + 20);
    });

    filtered.forEach((state, si) => {
      const color = COLORS[si % COLORS.length];
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      years.forEach((yr, i) => {
        const x = pad.left + (i / (years.length - 1)) * chartW;
        const y = pad.top + chartH - ((state[yr] - minVal) / range) * chartH;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();

      years.forEach((yr, i) => {
        const x = pad.left + (i / (years.length - 1)) * chartW;
        const y = pad.top + chartH - ((state[yr] - minVal) / range) * chartH;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    legend.innerHTML = filtered.map((s, i) =>
      `<span><span class="legend-dot" style="background:${COLORS[i % COLORS.length]}"></span> ${escapeHtml(s.name)}</span>`
    ).join("");
  }

  /* ============ INFO CARDS ============ */

  function updateInfoCards() {
    const latest = allIndiaData[allIndiaData.length - 1];
    const prev = allIndiaData[allIndiaData.length - 2];

    switch (currentMetric) {
      case "population":
        document.getElementById("info-primary-label").textContent = "Total Population";
        document.getElementById("info-primary-value").textContent = latest.population.toLocaleString("en-IN");
        document.getElementById("info-primary-desc").textContent = "As of 2011 Census";
        document.getElementById("info-secondary-label").textContent = "Decadal Growth";
        document.getElementById("info-secondary-value").textContent = latest.growth + "%";
        document.getElementById("info-secondary-desc").textContent = "2001-2011";
        const maxGrowthState = stateData.reduce((a, b) => (b[2011] / b[2001]) > (a[2011] / a[2001]) ? b : a);
        document.getElementById("info-tertiary-label").textContent = "Largest State by Pop.";
        document.getElementById("info-tertiary-value").textContent = "Uttar Pradesh";
        document.getElementById("info-tertiary-desc").textContent = formatNumber(199812341) + " (2011)";
        break;
      case "literacy":
        document.getElementById("info-primary-label").textContent = "Literacy Rate";
        document.getElementById("info-primary-value").textContent = latest.literacy + "%";
        document.getElementById("info-primary-desc").textContent = "All-India (2011)";
        document.getElementById("info-secondary-label").textContent = "Highest Literacy";
        document.getElementById("info-secondary-value").textContent = "Kerala 93.91%";
        document.getElementById("info-secondary-desc").textContent = "Highest among all states";
        document.getElementById("info-tertiary-label").textContent = "Growth Since 1951";
        document.getElementById("info-tertiary-value").textContent = "+" + (latest.literacy - allIndiaData[0].literacy).toFixed(1) + "%";
        document.getElementById("info-tertiary-desc").textContent = "60-year improvement";
        break;
      case "gender":
        document.getElementById("info-primary-label").textContent = "Gender Ratio";
        document.getElementById("info-primary-value").textContent = latest.genderRatio + " ♀/1000♂";
        document.getElementById("info-primary-desc").textContent = "All-India (2011)";
        document.getElementById("info-secondary-label").textContent = "Best Ratio";
        document.getElementById("info-secondary-value").textContent = "Kerala 1084";
        document.getElementById("info-secondary-desc").textContent = "Highest female ratio";
        document.getElementById("info-tertiary-label").textContent = "Lowest Ratio";
        document.getElementById("info-tertiary-value").textContent = "Haryana 879";
        document.getElementById("info-tertiary-desc").textContent = "Lowest among major states";
        break;
      case "rural-urban":
        document.getElementById("info-primary-label").textContent = "Urban Population";
        document.getElementById("info-primary-value").textContent = latest.urban + "%";
        document.getElementById("info-primary-desc").textContent = "All-India (2011)";
        document.getElementById("info-secondary-label").textContent = "Rural Population";
        document.getElementById("info-secondary-value").textContent = latest.rural + "%";
        document.getElementById("info-secondary-desc").textContent = "All-India (2011)";
        document.getElementById("info-tertiary-label").textContent = "Urbanization Shift";
        document.getElementById("info-tertiary-value").textContent = "+" + (latest.urban - allIndiaData[0].urban).toFixed(1) + "%";
        document.getElementById("info-tertiary-desc").textContent = "Since 1951";
        break;
      case "state-compare":
        document.getElementById("info-primary-label").textContent = "States Compared";
        document.getElementById("info-primary-value").textContent = selectedStates.length;
        document.getElementById("info-primary-desc").textContent = "Selected for comparison";
        document.getElementById("info-secondary-label").textContent = "Most Populous (2011)";
        document.getElementById("info-secondary-value").textContent = "Uttar Pradesh";
        document.getElementById("info-secondary-desc").textContent = formatNumber(199812341);
        document.getElementById("info-tertiary-label").textContent = "Fastest Growing";
        document.getElementById("info-tertiary-value").textContent = "Meghalaya";
        document.getElementById("info-tertiary-desc").textContent = "Highest growth 2001-2011";
        break;
    }
  }

  /* ============ DATA TABLE ============ */

  function updateTable() {
    const head = document.getElementById("table-head");
    const body = document.getElementById("table-body");

    if (currentMetric === "rural-urban") {
      head.innerHTML = `<tr><th>Year</th><th>Population</th><th>Rural %</th><th>Urban %</th><th>Growth %</th></tr>`;
      body.innerHTML = allIndiaData.map(d =>
        `<tr><td>${d.year}</td><td>${d.population.toLocaleString("en-IN")}</td><td>${d.rural}%</td><td>${d.urban}%</td><td>${d.growth}%</td></tr>`
      ).join("");
    } else if (currentMetric === "literacy") {
      head.innerHTML = `<tr><th>Year</th><th>Literacy Rate %</th><th>Growth from Previous</th></tr>`;
      body.innerHTML = allIndiaData.map((d, i) => {
        const prev = i > 0 ? (d.literacy - allIndiaData[i - 1].literacy).toFixed(2) : "—";
        return `<tr><td>${d.year}</td><td>${d.literacy}%</td><td>${prev === "—" ? prev : "+" + prev + "%"}</td></tr>`;
      }).join("");
    } else if (currentMetric === "gender") {
      head.innerHTML = `<tr><th>Year</th><th>Gender Ratio</th><th>Change</th></tr>`;
      body.innerHTML = allIndiaData.map((d, i) => {
        const prev = i > 0 ? d.genderRatio - allIndiaData[i - 1].genderRatio : 0;
        return `<tr><td>${d.year}</td><td>${d.genderRatio}</td><td>${i === 0 ? "—" : (prev >= 0 ? "+" : "") + prev}</td></tr>`;
      }).join("");
    } else if (currentMetric === "state-compare") {
      head.innerHTML = `<tr><th>State</th><th>1951</th><th>1971</th><th>1991</th><th>2011</th><th>Literacy 2011</th></tr>`;
      body.innerHTML = stateData.filter(s => selectedStates.length === 0 || selectedStates.includes(s.name)).map(s =>
        `<tr><td>${escapeHtml(s.name)}</td><td>${formatNumber(s[1951])}</td><td>${formatNumber(s[1971])}</td><td>${formatNumber(s[1991])}</td><td>${formatNumber(s[2011])}</td><td>${s.literacy2011}%</td></tr>`
      ).join("");
    } else {
      head.innerHTML = `<tr><th>Year</th><th>Population</th><th>Growth %</th></tr>`;
      body.innerHTML = allIndiaData.map(d =>
        `<tr><td>${d.year}</td><td>${d.population.toLocaleString("en-IN")}</td><td>${d.growth}%</td></tr>`
      ).join("");
    }
  }

  function downloadCSV() {
    let csv = "";
    if (currentMetric === "state-compare") {
      csv = "State,1951,1961,1971,1981,1991,2001,2011,Literacy2011,GenderRatio2011\n";
      stateData.forEach(s => {
        csv += `"${s.name}",${s[1951]},${s[1961]},${s[1971]},${s[1981]},${s[1991]},${s[2001]},${s[2011]},${s.literacy2011},${s.gender2011}\n`;
      });
    } else {
      csv = "Year,Population,GrowthPercent,LiteracyPercent,GenderRatio,RuralPercent,UrbanPercent\n";
      allIndiaData.forEach(d => {
        csv += `${d.year},${d.population},${d.growth},${d.literacy},${d.genderRatio},${d.rural},${d.urban}\n`;
      });
    }
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `census-india-${currentMetric}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  init();
});
