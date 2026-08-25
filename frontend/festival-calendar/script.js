(function () {
  const festivals = window.festivalData || [];

  let currentDate = new Date();
  let selectedDay = null;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const shortMonthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const categoryColors = {
    Religious: "#FF6B6B",
    Harvest: "#FF8C42",
    Cultural: "#4ECDC4",
    National: "#45B7D1"
  };

  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  function getCurrentMonth() {
    return currentDate.getMonth();
  }

  function getCurrentYear() {
    return currentDate.getFullYear();
  }

  function getMonthName(monthIndex) {
    return monthNames[monthIndex];
  }

  function getMonthDays(month, year) {
    const daysInMonth = monthDays[month];
    return daysInMonth;
  }

  function getStartingDay(month, year) {
    const date = new Date(year, month, 1);
    return date.getDay();
  }

  function isFestivalDay(month, day) {
    return festivals.some(f => f.month === month && f.day === day);
  }

  function getFestivalByDate(month, day) {
    return festivals.find(f => f.month === month && f.day === day);
  }

  function getUpcomingFestivals() {
    const today = new Date();
    const upcoming = [];
    for (const f of festivals) {
      const festivalDate = new Date();
      festivalDate.setMonth(f.month - 1);
      festivalDate.setDate(f.day);
      if (festivalDate > today) {
        upcoming.push(f);
      }
    }
    upcoming.sort((a, b) => {
      const aDate = new Date(); aDate.setMonth(a.month - 1); aDate.setDate(a.day);
      const bDate = new Date(); bDate.setMonth(b.month - 1); bDate.setDate(b.day);
      return aDate - bDate;
    });
    return upcoming.slice(0, 6);
  }

  function renderCalendar(month, year) {
    const firstDay = getStartingDay(month, year);
    const daysInMonth = getMonthDays(month, year);
    const currentMonth = getCurrentMonth();
    const currentYear = getCurrentYear();

    const calendarGrid = document.getElementById("calendar-grid");
    if (!calendarGrid) return;

    calendarGrid.innerHTML = "";

    const headerTitle = document.getElementById("calendar-month-year");
    if (headerTitle) {
      headerTitle.textContent = `${getMonthName(month)} ${year}`;
    }

    const monthLabels = document.querySelectorAll(".month-label");
    monthLabels.forEach((label, idx) => {
      label.textContent = getMonthName(idx);
    });

    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.className = "calendar-cell empty";
      calendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement("div");
      cell.className = "calendar-cell";
      cell.textContent = day;

      const date = new Date(year, month, day);
      const isCurrentMonth = month === currentMonth && year === currentYear;
      const isSelected = selectedDay && selectedDay.month === month && selectedDay.day === day;
      const isFestival = isFestivalDay(month, day);
      const festival = getFestivalByDate(month, day);
      const isUpcoming = upcomingFestivalDates().some(f => f.month === month && f.day === day);

      if (isCurrentMonth && day === currentDate.getDate() && year === currentYear) {
        cell.classList.add("today");
      }

      if (isSelected) {
        cell.classList.add("selected");
      }

      if (isFestival) {
        cell.classList.add("festival");
        cell.setAttribute("data-festival-name", festival ? festival.name : "");
        cell.setAttribute("role", "gridcell");
        cell.setAttribute("aria-label", (festival ? festival.name : "") + " festival, Day " + day + " of " + getMonthName(month));
      }

      if (isUpcoming) {
        cell.classList.add("upcoming");
      }

      cell.addEventListener("click", () => {
        selectDay(month, day);
      });

      calendarGrid.appendChild(cell);
    }
  }

  function selectDay(month, day) {
    selectedDay = { month, day };
    updateFestivalPanel(selectedDay);

    const cells = document.querySelectorAll(".calendar-cell");
    cells.forEach(cell => {
      cell.classList.remove("selected");
    });

    const selectedCell = Array.from(cells).find(
      cell => parseInt(cell.textContent) === day && cell.getAttribute("data-festival-name")
    );
    if (selectedCell) {
      selectedCell.classList.add("selected");
    }
  }

  function updateFestivalPanel(dayData) {
    const panel = document.getElementById("festival-info-panel");
    if (!panel) return;

    if (dayData) {
      const festival = getFestivalByDate(dayData.month, dayData.day);
      if (festival) {
        panel.innerHTML = `
          <h3>${festival.name}</h3>
          <p><strong>Date:</strong> ${dayData.day} ${monthNames[dayData.month]}</p>
          <p><strong>Region:</strong> ${festival.region}</p>
          <p><strong>Category:</strong> ${festival.category}</p>
          <p>${festival.description}</p>
          <p><strong>Traditional Foods:</strong> ${festival.foods.join(", ")}</p>
          <p><strong>Celebration Highlights:</strong> ${getHighlights(festival)}</p>
        `;
      }
    } else {
      panel.innerHTML = `
        <h3>No Festival Selected</h3>
        <p>Click on a festival date to learn more.</p>
      `;
    }
  }

  function getHighlights(festival) {
    const highlights = {
      Diwali: "Lamps, fireworks, rangoli",
      Holi: "Colour throwing, music, dance",
      Onam: "Pookalam, boat races, sadya",
      DurgaPuja: "Puja, dhunuchi, sindoor",
      Bihu: "Bihu dance, pitha",
      Pongal: "Pongal cooking, kolam",
      RakshaBandhan: "Rakhi tying, exchange of gifts",
      Janmashtami: "Dahi handi, bhajans",
      GaneshChaturthi: "Ganesh idol, immersion",
      Navratri: "Garba, dandiya, fasting",
      Christmas: "Midnight mass, tree, carols",
      "Eid al-Fitr": "Eid prayer, feasting",
      BasantPanchami: "Yellow attire, Saraswati puja",
      RathYatra: "Chariot pulling, bhajans"
    };
    return highlights[festival.name] || "";
  }

  function upcomingFestivalDates() {
    const today = new Date();
    const dates = [];
    for (const f of festivals) {
      const fd = new Date();
      fd.setMonth(f.month - 1);
      fd.setDate(f.day);
      if (fd >= today) {
        dates.push(f);
      }
    }
    return dates;
  }

  function renderUpcoming() {
    const upcoming = getUpcomingFestivals();
    const container = document.getElementById("upcoming-festivals");
    if (!container) return;

    container.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = "Coming This Month";
    container.appendChild(heading);

    upcoming.slice(0, 5).forEach(festival => {
      const div = document.createElement("div");
      div.className = "upcoming-festival";
      div.innerHTML = `<span>${festival.name}</span>`;
      container.appendChild(div);
    });
  }

  function initMonthNavigation() {
    const prevBtn = document.getElementById("prev-month");
    const nextBtn = document.getElementById("next-month");
    const currentBtn = document.getElementById("current-month");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(getCurrentMonth(), getCurrentYear());
        renderUpcoming();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(getCurrentMonth(), getCurrentYear());
        renderUpcoming();
      });
    }

    if (currentBtn) {
      currentBtn.addEventListener("click", () => {
        currentDate = new Date();
        renderCalendar(getCurrentMonth(), getCurrentYear());
        renderUpcoming();
      });
    }
  }

  function initKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      const focused = document.activeElement;
      const cells = document.querySelectorAll(".calendar-cell:not(.empty)");

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const idx = Array.from(cells).indexOf(focused);
        if (idx < cells.length - 1) {
          cells[idx + 1].focus();
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const idx = Array.from(cells).indexOf(focused);
        if (idx > 0) {
          cells[idx - 1].focus();
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const idx = Array.from(cells).indexOf(focused);
        const rowStart = Math.floor(idx / 7);
        if (rowStart < cells.length / 7 - 1) {
          cells[idx + 7].focus();
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const idx = Array.from(cells).indexOf(focused);
        const rowStart = Math.floor(idx / 7);
        if (rowStart > 0) {
          cells[idx - 7].focus();
        }
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (focused.classList.contains("festival")) {
          const day = parseInt(focused.textContent);
          selectDay(focused.getAttribute("data-month") ? parseInt(focused.getAttribute("data-month")) : getCurrentMonth(), day);
          updateFestivalPanel({ month: getCurrentMonth(), day });
        }
      }
    });
  }

  function init() {
    const calendarGrid = document.getElementById("calendar-grid");
    if (!calendarGrid) return;

    renderCalendar(getCurrentMonth(), getCurrentYear());
    renderUpcoming();
    initMonthNavigation();
    initKeyboardNavigation();
    updateFestivalPanel(null);
  }

  window.addEventListener("load", init);
})();