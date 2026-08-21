/**
 * Smart Travel Expense Tracker
 * Issue #3104
 *
 * Client-side travel expense and budget management system.
 * Data is persisted through localStorage.
 */

(function (root) {
    "use strict";

    const TRIPS_KEY = "iieTravelExpenseTrips";
    const ACTIVE_TRIP_KEY = "iieTravelExpenseActiveTrip";

    const WARNING_THRESHOLD = 0.85;
    const EXCEEDED_THRESHOLD = 1;

    const CATEGORIES = [
        {
            id: "accommodation",
            label: "Accommodation",
            icon: "🏨"
        },
        {
            id: "food",
            label: "Food",
            icon: "🍛"
        },
        {
            id: "transportation",
            label: "Transportation",
            icon: "🚆"
        },
        {
            id: "attractions",
            label: "Attractions",
            icon: "🎟️"
        },
        {
            id: "shopping",
            label: "Shopping",
            icon: "🛍️"
        },
        {
            id: "entertainment",
            label: "Entertainment",
            icon: "🎭"
        },
        {
            id: "emergency",
            label: "Emergency",
            icon: "🚨"
        },
        {
            id: "other",
            label: "Other",
            icon: "📦"
        }
    ];

    const CURRENCIES = {
        INR: {
            symbol: "₹",
            locale: "en-IN"
        },
        USD: {
            symbol: "$",
            locale: "en-US"
        },
        EUR: {
            symbol: "€",
            locale: "de-DE"
        },
        GBP: {
            symbol: "£",
            locale: "en-GB"
        },
        AED: {
            symbol: "د.إ",
            locale: "en-AE"
        },
        SGD: {
            symbol: "S$",
            locale: "en-SG"
        }
    };

    function generateId(prefix) {
        return (
            prefix +
            "_" +
            Date.now() +
            "_" +
            Math.random().toString(36).slice(2, 9)
        );
    }

    function safeNumber(value, fallback = 0) {
        const number = Number(value);

        return Number.isFinite(number)
            ? number
            : fallback;
    }

    function normalizeAmount(value) {
        return Math.round(
            Math.max(0, safeNumber(value, 0)) * 100
        ) / 100;
    }

    function todayISO() {
        return new Date().toISOString().slice(0, 10);
    }

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function readTrips(storage) {
        try {
            const raw = storage.getItem(TRIPS_KEY);

            if (!raw) {
                return [];
            }

            const parsed = JSON.parse(raw);

            return Array.isArray(parsed)
                ? parsed
                : [];
        } catch (error) {
            console.error(
                "[ExpenseTracker] Failed to read trips:",
                error
            );

            return [];
        }
    }

    function writeTrips(trips, storage) {
        storage.setItem(
            TRIPS_KEY,
            JSON.stringify(trips)
        );
    }

    function createTrip(input, storage = root.localStorage) {
        const name = String(input.name || "").trim();

        if (!name) {
            throw new Error("Trip name is required.");
        }

        const budget = normalizeAmount(input.budget);

        if (budget <= 0) {
            throw new Error(
                "Trip budget must be greater than zero."
            );
        }

        if (
            input.startDate &&
            input.endDate &&
            input.endDate < input.startDate
        ) {
            throw new Error(
                "End date cannot be before start date."
            );
        }

        const trip = {
            id: generateId("trip"),
            name,
            destination: String(
                input.destination || ""
            ).trim(),
            currency: CURRENCIES[input.currency]
                ? input.currency
                : "INR",
            budget,
            startDate: input.startDate || "",
            endDate: input.endDate || "",
            notes: String(input.notes || "").trim(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            expenses: []
        };

        const trips = readTrips(storage);

        trips.push(trip);

        writeTrips(trips, storage);

        return trip;
    }

    function updateTrip(tripId, updates, storage = root.localStorage) {
        const trips = readTrips(storage);

        const index = trips.findIndex(
            trip => trip.id === tripId
        );

        if (index === -1) {
            throw new Error("Trip not found.");
        }

        const current = trips[index];

        const name = String(
            updates.name ?? current.name
        ).trim();

        const budget = normalizeAmount(
            updates.budget ?? current.budget
        );

        if (!name) {
            throw new Error("Trip name is required.");
        }

        if (budget <= 0) {
            throw new Error(
                "Trip budget must be greater than zero."
            );
        }

        const startDate =
            updates.startDate ?? current.startDate;

        const endDate =
            updates.endDate ?? current.endDate;

        if (
            startDate &&
            endDate &&
            endDate < startDate
        ) {
            throw new Error(
                "End date cannot be before start date."
            );
        }

        trips[index] = {
            ...current,
            ...updates,
            name,
            budget,
            startDate,
            endDate,
            currency: CURRENCIES[updates.currency]
                ? updates.currency
                : current.currency,
            updatedAt: new Date().toISOString()
        };

        writeTrips(trips, storage);

        return trips[index];
    }

    function deleteTrip(tripId, storage = root.localStorage) {
        const trips = readTrips(storage);

        const exists = trips.some(
            trip => trip.id === tripId
        );

        if (!exists) {
            return false;
        }

        const filtered = trips.filter(
            trip => trip.id !== tripId
        );

        writeTrips(filtered, storage);

        const active =
            storage.getItem(ACTIVE_TRIP_KEY);

        if (active === tripId) {
            storage.removeItem(ACTIVE_TRIP_KEY);
        }

        return true;
    }

    function getTrip(tripId, storage = root.localStorage) {
        return readTrips(storage).find(
            trip => trip.id === tripId
        ) || null;
    }

    function addExpense(
        tripId,
        input,
        storage = root.localStorage
    ) {
        const trips = readTrips(storage);

        const trip = trips.find(
            item => item.id === tripId
        );

        if (!trip) {
            throw new Error("Trip not found.");
        }

        const description = String(
            input.description || ""
        ).trim();

        if (!description) {
            throw new Error(
                "Expense description is required."
            );
        }

        const amount = normalizeAmount(input.amount);

        if (amount <= 0) {
            throw new Error(
                "Expense amount must be greater than zero."
            );
        }

        const category = CATEGORIES.some(
            item => item.id === input.category
        )
            ? input.category
            : "other";

        const expense = {
            id: generateId("expense"),
            description,
            amount,
            category,
            date: input.date || todayISO(),
            plannedAmount:
                input.plannedAmount === "" ||
                input.plannedAmount === undefined
                    ? null
                    : normalizeAmount(
                        input.plannedAmount
                    ),
            note: String(
                input.note || ""
            ).trim(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        trip.expenses.push(expense);

        trip.updatedAt = new Date().toISOString();

        writeTrips(trips, storage);

        return expense;
    }

    function updateExpense(
        tripId,
        expenseId,
        updates,
        storage = root.localStorage
    ) {
        const trips = readTrips(storage);

        const trip = trips.find(
            item => item.id === tripId
        );

        if (!trip) {
            throw new Error("Trip not found.");
        }

        const index = trip.expenses.findIndex(
            expense => expense.id === expenseId
        );

        if (index === -1) {
            throw new Error("Expense not found.");
        }

        const current = trip.expenses[index];

        const description = String(
            updates.description ??
            current.description
        ).trim();

        const amount = normalizeAmount(
            updates.amount ?? current.amount
        );

        if (!description) {
            throw new Error(
                "Expense description is required."
            );
        }

        if (amount <= 0) {
            throw new Error(
                "Expense amount must be greater than zero."
            );
        }

        const category = CATEGORIES.some(
            item => item.id === updates.category
        )
            ? updates.category
            : current.category;

        let plannedAmount =
            current.plannedAmount;

        if (
            Object.prototype.hasOwnProperty.call(
                updates,
                "plannedAmount"
            )
        ) {
            plannedAmount =
                updates.plannedAmount === "" ||
                updates.plannedAmount === null ||
                updates.plannedAmount === undefined
                    ? null
                    : normalizeAmount(
                        updates.plannedAmount
                    );
        }

        trip.expenses[index] = {
            ...current,
            ...updates,
            description,
            amount,
            category,
            plannedAmount,
            updatedAt: new Date().toISOString()
        };

        trip.updatedAt = new Date().toISOString();

        writeTrips(trips, storage);

        return trip.expenses[index];
    }

    function deleteExpense(
        tripId,
        expenseId,
        storage = root.localStorage
    ) {
        const trips = readTrips(storage);

        const trip = trips.find(
            item => item.id === tripId
        );

        if (!trip) {
            throw new Error("Trip not found.");
        }

        const originalLength =
            trip.expenses.length;

        trip.expenses =
            trip.expenses.filter(
                expense =>
                    expense.id !== expenseId
            );

        if (
            trip.expenses.length ===
            originalLength
        ) {
            return false;
        }

        trip.updatedAt =
            new Date().toISOString();

        writeTrips(trips, storage);

        return true;
    }

    function calculateSummary(trip) {
        const expenses =
            Array.isArray(trip.expenses)
                ? trip.expenses
                : [];

        const totalSpent = expenses.reduce(
            (sum, expense) =>
                sum + normalizeAmount(expense.amount),
            0
        );

        const remaining =
            normalizeAmount(trip.budget) -
            totalSpent;

        const utilization =
            trip.budget > 0
                ? (totalSpent / trip.budget) * 100
                : 0;

        let status = "healthy";

        if (utilization >= 100) {
            status = "exceeded";
        } else if (
            utilization >= WARNING_THRESHOLD * 100
        ) {
            status = "warning";
        }

        return {
            budget: normalizeAmount(trip.budget),
            totalSpent: normalizeAmount(totalSpent),
            remaining: normalizeAmount(remaining),
            utilization: Math.round(
                utilization * 100
            ) / 100,
            status
        };
    }

    function calculateCategoryTotals(trip) {
        const totals = {};

        CATEGORIES.forEach(category => {
            totals[category.id] = 0;
        });

        (trip.expenses || []).forEach(expense => {
            const category =
                totals[expense.category] !== undefined
                    ? expense.category
                    : "other";

            totals[category] +=
                normalizeAmount(expense.amount);
        });

        Object.keys(totals).forEach(key => {
            totals[key] =
                normalizeAmount(totals[key]);
        });

        return totals;
    }

    function calculatePlannedActual(trip) {
        const result = {};

        CATEGORIES.forEach(category => {
            result[category.id] = {
                planned: 0,
                actual: 0
            };
        });

        (trip.expenses || []).forEach(expense => {
            const category =
                result[expense.category]
                    ? expense.category
                    : "other";

            result[category].actual +=
                normalizeAmount(expense.amount);

            if (
                expense.plannedAmount !== null &&
                expense.plannedAmount !== undefined
            ) {
                result[category].planned +=
                    normalizeAmount(
                        expense.plannedAmount
                    );
            }
        });

        Object.values(result).forEach(item => {
            item.planned =
                normalizeAmount(item.planned);

            item.actual =
                normalizeAmount(item.actual);
        });

        return result;
    }

    function filterExpenses(
        expenses,
        filters = {}
    ) {
        const category =
            filters.category || "all";

        const from =
            filters.from || "";

        const to =
            filters.to || "";

        const search =
            String(
                filters.search || ""
            ).trim().toLowerCase();

        return (expenses || [])
            .filter(expense => {

                if (
                    category !== "all" &&
                    expense.category !== category
                ) {
                    return false;
                }

                if (
                    from &&
                    expense.date < from
                ) {
                    return false;
                }

                if (
                    to &&
                    expense.date > to
                ) {
                    return false;
                }

                if (search) {
                    const haystack =
                        `${expense.description} ${expense.note || ""} ${expense.category}`
                            .toLowerCase();

                    if (
                        !haystack.includes(search)
                    ) {
                        return false;
                    }
                }

                return true;
            })
            .sort(
                (a, b) =>
                    String(b.date).localeCompare(
                        String(a.date)
                    )
            );
    }

    function getDailySummary(trip) {
        const days = {};

        (trip.expenses || []).forEach(expense => {
            if (!days[expense.date]) {
                days[expense.date] = {
                    date: expense.date,
                    total: 0,
                    count: 0
                };
            }

            days[expense.date].total +=
                normalizeAmount(expense.amount);

            days[expense.date].count += 1;
        });

        return Object.values(days)
            .map(day => ({
                ...day,
                total: normalizeAmount(day.total)
            }))
            .sort(
                (a, b) =>
                    a.date.localeCompare(b.date)
            );
    }

    function getBudgetAlert(trip) {
        const summary =
            calculateSummary(trip);

        if (summary.status === "exceeded") {
            return {
                status: "exceeded",
                title: "Budget exceeded",
                message:
                    `You have exceeded your planned budget by ${formatMoney(
                        Math.abs(summary.remaining),
                        trip.currency
                    )}.`
            };
        }

        if (summary.status === "warning") {
            return {
                status: "warning",
                title: "Approaching budget limit",
                message:
                    `You have used ${summary.utilization.toFixed(
                        1
                    )}% of your trip budget.`
            };
        }

        return {
            status: "healthy",
            title: "Budget is healthy",
            message:
                `You still have ${formatMoney(
                    summary.remaining,
                    trip.currency
                )} available.`
        };
    }

    function formatMoney(amount, currency = "INR") {
        const config =
            CURRENCIES[currency] ||
            CURRENCIES.INR;

        try {
            return new Intl.NumberFormat(
                config.locale,
                {
                    style: "currency",
                    currency,
                    maximumFractionDigits: 2
                }
            ).format(amount);
        } catch {
            return `${config.symbol}${Number(
                amount || 0
            ).toFixed(2)}`;
        }
    }

    function buildCSV(trip, expenses = trip.expenses) {
        const header = [
            "Date",
            "Description",
            "Category",
            "Amount",
            "Planned Amount",
            "Notes"
        ];

        const rows = [
            header,
            ...(expenses || []).map(expense => [
                expense.date,
                expense.description,
                getCategoryLabel(expense.category),
                expense.amount,
                expense.plannedAmount ?? "",
                expense.note || ""
            ])
        ];

        return rows
            .map(row =>
                row
                    .map(value => {
                        const text =
                            String(value ?? "");

                        return `"${text.replace(
                            /"/g,
                            '""'
                        )}"`;
                    })
                    .join(",")
            )
            .join("\n");
    }

    function buildReport(trip) {
        const summary =
            calculateSummary(trip);

        const categories =
            calculateCategoryTotals(trip);

        const lines = [];

        lines.push(
            "INCREDIBLE INDIA EXPLORER"
        );

        lines.push(
            "SMART TRAVEL EXPENSE REPORT"
        );

        lines.push("");

        lines.push(
            `Trip: ${trip.name}`
        );

        lines.push(
            `Destination: ${trip.destination || "Not specified"}`
        );

        lines.push(
            `Currency: ${trip.currency}`
        );

        lines.push(
            `Start Date: ${trip.startDate || "Not specified"}`
        );

        lines.push(
            `End Date: ${trip.endDate || "Not specified"}`
        );

        lines.push("");

        lines.push("BUDGET SUMMARY");

        lines.push(
            `Planned Budget: ${formatMoney(
                summary.budget,
                trip.currency
            )}`
        );

        lines.push(
            `Total Spent: ${formatMoney(
                summary.totalSpent,
                trip.currency
            )}`
        );

        lines.push(
            `Remaining: ${formatMoney(
                summary.remaining,
                trip.currency
            )}`
        );

        lines.push(
            `Utilization: ${summary.utilization.toFixed(
                1
            )}%`
        );

        lines.push("");

        lines.push("CATEGORY BREAKDOWN");

        CATEGORIES.forEach(category => {
            lines.push(
                `${category.label}: ${formatMoney(
                    categories[category.id],
                    trip.currency
                )}`
            );
        });

        lines.push("");

        lines.push("EXPENSE HISTORY");

        (trip.expenses || []).forEach(expense => {
            lines.push(
                `${expense.date} | ${expense.description} | ${getCategoryLabel(
                    expense.category
                )} | ${formatMoney(
                    expense.amount,
                    trip.currency
                )}`
            );
        });

        return lines.join("\n");
    }

    function getCategoryLabel(categoryId) {
        const category =
            CATEGORIES.find(
                item => item.id === categoryId
            );

        return category
            ? category.label
            : "Other";
    }

    function getCategoryIcon(categoryId) {
        const category =
            CATEGORIES.find(
                item => item.id === categoryId
            );

        return category
            ? category.icon
            : "📦";
    }

    function getAllTrips(storage = root.localStorage) {
        return readTrips(storage);
    }

    function getActiveTrip(storage = root.localStorage) {
        const activeId =
            storage.getItem(ACTIVE_TRIP_KEY);

        if (!activeId) {
            return null;
        }

        return getTrip(
            activeId,
            storage
        );
    }

    function setActiveTrip(
        tripId,
        storage = root.localStorage
    ) {
        if (!getTrip(tripId, storage)) {
            throw new Error(
                "Cannot select unknown trip."
            );
        }

        storage.setItem(
            ACTIVE_TRIP_KEY,
            tripId
        );
    }

    // ------------------------------------------------------------
    // DOM APPLICATION
    // ------------------------------------------------------------

    let currentTripId = null;
    let toastTimer = null;

    function qs(selector) {
        return document.querySelector(selector);
    }

    function qsa(selector) {
        return Array.from(
            document.querySelectorAll(selector)
        );
    }

    function showToast(message, type = "success") {
        const toast = qs("#expense-toast");

        if (!toast) return;

        toast.textContent = message;

        toast.className =
            `expense-toast show ${type}`;

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2800);
    }

    function openModal(id) {
        const modal = qs(`#${id}`);

        if (!modal) return;

        modal.hidden = false;
        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";
    }

    function closeModals() {
        qsa(".expense-modal").forEach(
            modal => {
                modal.hidden = true;
                modal.setAttribute(
                    "aria-hidden",
                    "true"
                );
            }
        );

        document.body.style.overflow = "";
    }

    function populateCategories() {
        const select =
            qs("#expense-category");

        const filter =
            qs("#filter-category");

        if (select) {
            select.innerHTML =
                CATEGORIES.map(category =>
                    `<option value="${category.id}">
                        ${category.icon} ${category.label}
                    </option>`
                ).join("");
        }

        if (filter) {
            filter.innerHTML =
                `<option value="all">All Categories</option>` +
                CATEGORIES.map(category =>
                    `<option value="${category.id}">
                        ${category.icon} ${category.label}
                    </option>`
                ).join("");
        }
    }

    function renderTripSelect() {
        const select =
            qs("#active-trip");

        if (!select) return;

        const trips = getAllTrips();

        const selected =
            currentTripId ||
            localStorage.getItem(
                ACTIVE_TRIP_KEY
            );

        select.innerHTML =
            `<option value="">Select a trip</option>` +
            trips.map(trip =>
                `<option value="${escapeHTML(trip.id)}"
                    ${trip.id === selected ? "selected" : ""}>
                    ${escapeHTML(trip.name)}
                    ${trip.destination
                        ? ` — ${escapeHTML(trip.destination)}`
                        : ""}
                </option>`
            ).join("");
    }

    function renderDashboard() {
        const empty =
            qs("#dashboard-empty");

        const content =
            qs("#dashboard-content");

        const trip =
            currentTripId
                ? getTrip(currentTripId)
                : getActiveTrip();

        if (!trip) {
            if (empty) empty.hidden = false;
            if (content) content.hidden = true;
            return;
        }

        currentTripId = trip.id;

        if (empty) empty.hidden = true;
        if (content) content.hidden = false;

        const summary =
            calculateSummary(trip);

        const categories =
            calculateCategoryTotals(trip);

        qs("#summary-budget").textContent =
            formatMoney(
                summary.budget,
                trip.currency
            );

        qs("#summary-spent").textContent =
            formatMoney(
                summary.totalSpent,
                trip.currency
            );

        qs("#summary-remaining").textContent =
            formatMoney(
                summary.remaining,
                trip.currency
            );

        qs("#summary-utilization").textContent =
            `${summary.utilization.toFixed(1)}%`;

        qs("#progress-text").textContent =
            `${formatMoney(
                summary.totalSpent,
                trip.currency
            )} of ${formatMoney(
                summary.budget,
                trip.currency
            )}`;

        qs("#progress-percent").textContent =
            `${summary.utilization.toFixed(1)}%`;

        const progress =
            qs("#budget-progress");

        progress.style.width =
            `${Math.min(
                100,
                Math.max(
                    0,
                    summary.utilization
                )
            )}%`;

        progress.className =
            "progress-fill";

        if (summary.status === "warning") {
            progress.classList.add("warning");
        }

        if (summary.status === "exceeded") {
            progress.classList.add("danger");
        }

        renderAlert(trip);
        renderCategoryChart(trip, categories);
        renderPlannedActual(trip);
        renderDailySummary(trip);
    }

    function renderAlert(trip) {
        const alert =
            qs("#budget-alert");

        if (!alert) return;

        const data =
            getBudgetAlert(trip);

        alert.hidden = false;

        alert.className =
            "budget-alert";

        if (data.status === "exceeded") {
            alert.classList.add(
                "alert-danger"
            );
        }

        qs("#budget-alert-title").textContent =
            data.title;

        qs("#budget-alert-message").textContent =
            data.message;
    }

    function renderCategoryChart(
        trip,
        totals
    ) {
        const container =
            qs("#category-chart");

        if (!container) return;

        const summary =
            calculateSummary(trip);

        const max =
            Math.max(
                1,
                ...Object.values(totals)
            );

        container.innerHTML =
            CATEGORIES.map(category => {

                const amount =
                    totals[category.id] || 0;

                const percentage =
                    summary.totalSpent > 0
                        ? amount /
                            summary.totalSpent *
                            100
                        : 0;

                return `
                    <div class="category-row">
                        <div class="category-row-header">
                            <span>
                                ${category.icon}
                                ${category.label}
                            </span>

                            <span>
                                ${formatMoney(
                                    amount,
                                    trip.currency
                                )}
                                ·
                                ${percentage.toFixed(1)}%
                            </span>
                        </div>

                        <div class="category-bar">
                            <div
                                class="category-bar-fill"
                                style="width:${Math.min(
                                    100,
                                    amount / max * 100
                                )}%"
                            ></div>
                        </div>
                    </div>
                `;
            }).join("");
    }

    function renderPlannedActual(trip) {
        const container =
            qs("#planned-actual");

        if (!container) return;

        const data =
            calculatePlannedActual(trip);

        const entries =
            Object.entries(data)
                .filter(
                    ([, item]) =>
                        item.planned > 0 ||
                        item.actual > 0
                );

        if (!entries.length) {
            container.innerHTML = `
                <div class="table-empty">
                    <span>📊</span>
                    <p>
                        Add planned amounts to expenses
                        to compare planned vs actual spending.
                    </p>
                </div>
            `;

            return;
        }

        container.innerHTML =
            entries.map(
                ([categoryId, item]) => {

                    const max =
                        Math.max(
                            1,
                            item.planned,
                            item.actual
                        );

                    return `
                        <div class="planned-row">

                            <div class="planned-row-header">
                                <span>
                                    ${getCategoryIcon(
                                        categoryId
                                    )}
                                    ${getCategoryLabel(
                                        categoryId
                                    )}
                                </span>

                                <strong>
                                    ${formatMoney(
                                        item.actual,
                                        trip.currency
                                    )}
                                </strong>
                            </div>

                            <div class="planned-bar">
                                <div
                                    class="planned-bar-fill"
                                    style="width:${Math.min(
                                        100,
                                        item.actual /
                                            max *
                                            100
                                    )}%"
                                ></div>
                            </div>

                            <small>
                                Planned:
                                ${formatMoney(
                                    item.planned,
                                    trip.currency
                                )}
                            </small>

                        </div>
                    `;
                }
            ).join("");
    }

    function renderDailySummary(trip) {
        const container =
            qs("#daily-summary");

        if (!container) return;

        const daily =
            getDailySummary(trip);

        if (!daily.length) {
            container.innerHTML = `
                <div class="table-empty">
                    <span>📅</span>
                    <p>
                        Daily spending will appear
                        after you add expenses.
                    </p>
                </div>
            `;

            return;
        }

        container.innerHTML =
            daily.map(day => `
                <div class="daily-summary-row">

                    <div class="daily-date">
                        ${formatDate(day.date)}
                    </div>

                    <div class="daily-expense-count">
                        ${day.count}
                        ${day.count === 1
                            ? "expense"
                            : "expenses"}
                    </div>

                    <div class="daily-total">
                        ${formatMoney(
                            day.total,
                            trip.currency
                        )}
                    </div>

                </div>
            `).join("");
    }

    function renderExpenseTable() {
        const body =
            qs("#expense-table-body");

        const empty =
            qs("#table-empty");

        const trip =
            currentTripId
                ? getTrip(currentTripId)
                : null;

        if (!body || !empty) return;

        if (!trip) {
            body.innerHTML = "";
            empty.hidden = false;
            return;
        }

        const filters = {
            category:
                qs("#filter-category")?.value ||
                "all",

            from:
                qs("#filter-from")?.value ||
                "",

            to:
                qs("#filter-to")?.value ||
                "",

            search:
                qs("#filter-search")?.value ||
                ""
        };

        const expenses =
            filterExpenses(
                trip.expenses,
                filters
            );

        empty.hidden =
            expenses.length !== 0;

        body.innerHTML =
            expenses.map(expense => `
                <tr>

                    <td>
                        ${formatDate(
                            expense.date
                        )}
                    </td>

                    <td>
                        <strong>
                            ${escapeHTML(
                                expense.description
                            )}
                        </strong>

                        ${
                            expense.note
                                ? `<br>
                                   <small>
                                       ${escapeHTML(
                                           expense.note
                                       )}
                                   </small>`
                                : ""
                        }
                    </td>

                    <td>
                        <span class="category-pill">
                            ${getCategoryIcon(
                                expense.category
                            )}
                            ${getCategoryLabel(
                                expense.category
                            )}
                        </span>
                    </td>

                    <td class="amount-cell">
                        ${formatMoney(
                            expense.amount,
                            trip.currency
                        )}
                    </td>

                    <td>
                        <div class="table-actions">

                            <button
                                type="button"
                                class="table-action"
                                data-edit-expense="${escapeHTML(
                                    expense.id
                                )}"
                            >
                                ✏️
                            </button>

                            <button
                                type="button"
                                class="table-action delete"
                                data-delete-expense="${escapeHTML(
                                    expense.id
                                )}"
                            >
                                🗑️
                            </button>

                        </div>
                    </td>

                </tr>
            `).join("");
    }

    function renderTrips() {
        const container =
            qs("#trip-grid");

        if (!container) return;

        const trips =
            getAllTrips();

        if (!trips.length) {
            container.innerHTML = `
                <div class="expense-empty-state">
                    <div class="empty-icon">🗺️</div>
                    <h3>No trips yet</h3>
                    <p>Create a trip to begin tracking expenses.</p>
                </div>
            `;

            return;
        }

        container.innerHTML =
            trips.map(trip => {

                const summary =
                    calculateSummary(trip);

                const active =
                    trip.id === currentTripId;

                return `
                    <article
                        class="trip-card ${active ? "active" : ""}"
                    >

                        <span class="expense-section-label">
                            ${active ? "Active Trip" : "Trip"}
                        </span>

                        <h3>
                            ${escapeHTML(trip.name)}
                        </h3>

                        <div class="trip-destination">
                            ${
                                trip.destination
                                    ? escapeHTML(
                                        trip.destination
                                    )
                                    : "Destination not specified"
                            }
                        </div>

                        <div class="trip-card-stats">

                            <div class="trip-stat">
                                <span>Budget</span>
                                <strong>
                                    ${formatMoney(
                                        summary.budget,
                                        trip.currency
                                    )}
                                </strong>
                            </div>

                            <div class="trip-stat">
                                <span>Spent</span>
                                <strong>
                                    ${formatMoney(
                                        summary.totalSpent,
                                        trip.currency
                                    )}
                                </strong>
                            </div>

                            <div class="trip-stat">
                                <span>Remaining</span>
                                <strong>
                                    ${formatMoney(
                                        summary.remaining,
                                        trip.currency
                                    )}
                                </strong>
                            </div>

                            <div class="trip-stat">
                                <span>Expenses</span>
                                <strong>
                                    ${
                                        trip.expenses.length
                                    }
                                </strong>
                            </div>

                        </div>

                        <div class="trip-card-actions">

                            <button
                                type="button"
                                class="expense-btn expense-btn-outline"
                                data-select-trip="${escapeHTML(
                                    trip.id
                                )}"
                            >
                                ${active
                                    ? "Selected"
                                    : "Open"}
                            </button>

                            <button
                                type="button"
                                class="expense-btn expense-btn-outline"
                                data-edit-trip="${escapeHTML(
                                    trip.id
                                )}"
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                class="expense-btn expense-btn-outline"
                                data-delete-trip="${escapeHTML(
                                    trip.id
                                )}"
                            >
                                Delete
                            </button>

                        </div>

                    </article>
                `;
            }).join("");
    }

    function formatDate(date) {
        if (!date) return "—";

        try {
            return new Intl.DateTimeFormat(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            ).format(
                new Date(`${date}T00:00:00`)
            );
        } catch {
            return date;
        }
    }

    function refreshUI() {
        renderTripSelect();
        renderDashboard();
        renderExpenseTable();
        renderTrips();
    }

    function resetTripForm() {
        qs("#trip-form")?.reset();

        qs("#trip-id").value = "";

        qs("#trip-currency").value =
            "INR";

        qs("#trip-form-error").hidden =
            true;
    }

    function populateTripForm(trip) {
        qs("#trip-id").value =
            trip.id;

        qs("#trip-name").value =
            trip.name;

        qs("#trip-destination").value =
            trip.destination || "";

        qs("#trip-currency").value =
            trip.currency || "INR";

        qs("#trip-budget").value =
            trip.budget;

        qs("#trip-start").value =
            trip.startDate || "";

        qs("#trip-end").value =
            trip.endDate || "";

        qs("#trip-notes").value =
            trip.notes || "";
    }

    function openTripModal(trip = null) {
        resetTripForm();

        qs("#trip-modal-title").textContent =
            trip
                ? "Edit Trip"
                : "Create a Trip";

        if (trip) {
            populateTripForm(trip);
        }

        openModal("trip-modal");
    }

    function resetExpenseForm() {
        qs("#expense-form")?.reset();

        qs("#expense-id").value = "";

        qs("#expense-date").value =
            todayISO();

        qs("#expense-category").value =
            "other";

        qs("#expense-form-error").hidden =
            true;
    }

    function openExpenseModal(expense = null) {
        if (!currentTripId) {
            showToast(
                "Please create or select a trip first.",
                "error"
            );

            return;
        }

        resetExpenseForm();

        qs("#expense-modal-title").textContent =
            expense
                ? "Edit Expense"
                : "Add Expense";

        if (expense) {
            qs("#expense-id").value =
                expense.id;

            qs("#expense-description").value =
                expense.description;

            qs("#expense-amount").value =
                expense.amount;

            qs("#expense-category").value =
                expense.category;

            qs("#expense-date").value =
                expense.date;

            qs("#expense-planned").value =
                expense.plannedAmount ?? "";

            qs("#expense-note").value =
                expense.note || "";
        }

        openModal("expense-modal");
    }

    function handleTripSubmit(event) {
        event.preventDefault();

        const error =
            qs("#trip-form-error");

        error.hidden = true;

        try {
            const tripId =
                qs("#trip-id").value;

            const data = {
                name:
                    qs("#trip-name").value,

                destination:
                    qs("#trip-destination").value,

                currency:
                    qs("#trip-currency").value,

                budget:
                    qs("#trip-budget").value,

                startDate:
                    qs("#trip-start").value,

                endDate:
                    qs("#trip-end").value,

                notes:
                    qs("#trip-notes").value
            };

            let trip;

            if (tripId) {
                trip =
                    updateTrip(
                        tripId,
                        data
                    );
            } else {
                trip =
                    createTrip(data);

                setActiveTrip(
                    trip.id
                );
            }

            currentTripId =
                trip.id;

            setActiveTrip(
                trip.id
            );

            closeModals();
            refreshUI();

            showToast(
                tripId
                    ? "Trip updated successfully."
                    : "Trip created successfully."
            );

        } catch (err) {
            error.textContent =
                err.message;

            error.hidden = false;
        }
    }

    function handleExpenseSubmit(event) {
        event.preventDefault();

        const error =
            qs("#expense-form-error");

        error.hidden = true;

        if (!currentTripId) {
            error.textContent =
                "Please select a trip.";

            error.hidden = false;

            return;
        }

        try {
            const expenseId =
                qs("#expense-id").value;

            const data = {
                description:
                    qs("#expense-description").value,

                amount:
                    qs("#expense-amount").value,

                category:
                    qs("#expense-category").value,

                date:
                    qs("#expense-date").value,

                plannedAmount:
                    qs("#expense-planned").value,

                note:
                    qs("#expense-note").value
            };

            if (expenseId) {
                updateExpense(
                    currentTripId,
                    expenseId,
                    data
                );

                showToast(
                    "Expense updated successfully."
                );
            } else {
                addExpense(
                    currentTripId,
                    data
                );

                showToast(
                    "Expense added successfully."
                );
            }

            closeModals();
            refreshUI();

        } catch (err) {
            error.textContent =
                err.message;

            error.hidden = false;
        }
    }

    function handleTableClick(event) {
        const editButton =
            event.target.closest(
                "[data-edit-expense]"
            );

        const deleteButton =
            event.target.closest(
                "[data-delete-expense]"
            );

        if (editButton) {
            const expense =
                getTrip(
                    currentTripId
                )?.expenses.find(
                    item =>
                        item.id ===
                        editButton.dataset
                            .editExpense
                );

            if (expense) {
                openExpenseModal(
                    expense
                );
            }

            return;
        }

        if (deleteButton) {
            const expenseId =
                deleteButton.dataset
                    .deleteExpense;

            if (
                !window.confirm(
                    "Delete this expense?"
                )
            ) {
                return;
            }

            deleteExpense(
                currentTripId,
                expenseId
            );

            refreshUI();

            showToast(
                "Expense deleted."
            );
        }
    }

    function handleTripGridClick(event) {
        const select =
            event.target.closest(
                "[data-select-trip]"
            );

        const edit =
            event.target.closest(
                "[data-edit-trip]"
            );

        const remove =
            event.target.closest(
                "[data-delete-trip]"
            );

        if (select) {
            selectTrip(
                select.dataset.selectTrip
            );

            return;
        }

        if (edit) {
            const trip =
                getTrip(
                    edit.dataset.editTrip
                );

            if (trip) {
                openTripModal(trip);
            }

            return;
        }

        if (remove) {
            const tripId =
                remove.dataset.deleteTrip;

            const trip =
                getTrip(tripId);

            if (!trip) return;

            if (
                !window.confirm(
                    `Delete "${trip.name}" and all its expenses?`
                )
            ) {
                return;
            }

            deleteTrip(tripId);

            const trips =
                getAllTrips();

            currentTripId =
                trips.length
                    ? trips[0].id
                    : null;

            if (currentTripId) {
                setActiveTrip(
                    currentTripId
                );
            }

            refreshUI();

            showToast(
                "Trip deleted."
            );
        }
    }

    function selectTrip(tripId) {
        const trip =
            getTrip(tripId);

        if (!trip) {
            showToast(
                "Trip not found.",
                "error"
            );

            return;
        }

        currentTripId =
            trip.id;

        setActiveTrip(
            trip.id
        );

        refreshUI();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        showToast(
            `${trip.name} is now active.`
        );
    }

    function exportCSV() {
        const trip =
            currentTripId
                ? getTrip(currentTripId)
                : null;

        if (!trip) {
            showToast(
                "Please select a trip first.",
                "error"
            );

            return;
        }

        const csv =
            buildCSV(trip);

        downloadFile(
            `${slugify(trip.name)}-expenses.csv`,
            csv,
            "text/csv;charset=utf-8"
        );

        showToast(
            "CSV report exported."
        );
    }

    function printReport() {
        const trip =
            currentTripId
                ? getTrip(currentTripId)
                : null;

        if (!trip) {
            showToast(
                "Please select a trip first.",
                "error"
            );

            return;
        }

        window.print();
    }

    function downloadFile(
        filename,
        content,
        type
    ) {
        const blob =
            new Blob(
                [content],
                { type }
            );

        const url =
            URL.createObjectURL(blob);

        const anchor =
            document.createElement("a");

        anchor.href = url;
        anchor.download = filename;

        document.body.appendChild(
            anchor
        );

        anchor.click();

        anchor.remove();

        URL.revokeObjectURL(url);
    }

    function slugify(value) {
        return String(value)
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") ||
            "trip";
    }

    function bindEvents() {

        qs("#trip-form")
            ?.addEventListener(
                "submit",
                handleTripSubmit
            );

        qs("#expense-form")
            ?.addEventListener(
                "submit",
                handleExpenseSubmit
            );

        qs("#active-trip")
            ?.addEventListener(
                "change",
                event => {
                    if (event.target.value) {
                        selectTrip(
                            event.target.value
                        );
                    }
                }
            );

        qs("#add-expense-btn")
            ?.addEventListener(
                "click",
                () => openExpenseModal()
            );

        qs("#hero-add-expense")
            ?.addEventListener(
                "click",
                () => openExpenseModal()
            );

        qs("#create-trip-btn")
            ?.addEventListener(
                "click",
                () => openTripModal()
            );

        qs("#hero-create-trip")
            ?.addEventListener(
                "click",
                () => openTripModal()
            );

        qs("#empty-create-trip")
            ?.addEventListener(
                "click",
                () => openTripModal()
            );

        qs("#manage-trips-btn")
            ?.addEventListener(
                "click",
                () => {
                    document
                        .querySelector(
                            ".trip-management-section"
                        )
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });
                }
            );

        qs("#expense-table-body")
            ?.addEventListener(
                "click",
                handleTableClick
            );

        qs("#trip-grid")
            ?.addEventListener(
                "click",
                handleTripGridClick
            );

        qs("#export-csv-btn")
            ?.addEventListener(
                "click",
                exportCSV
            );

        qs("#print-report-btn")
            ?.addEventListener(
                "click",
                printReport
            );

        [
            "#filter-category",
            "#filter-from",
            "#filter-to",
            "#filter-search"
        ].forEach(selector => {
            qs(selector)?.addEventListener(
                "input",
                renderExpenseTable
            );

            qs(selector)?.addEventListener(
                "change",
                renderExpenseTable
            );
        });

        qs("#reset-filters")
            ?.addEventListener(
                "click",
                () => {
                    qs("#filter-category").value =
                        "all";

                    qs("#filter-from").value =
                        "";

                    qs("#filter-to").value =
                        "";

                    qs("#filter-search").value =
                        "";

                    renderExpenseTable();
                }
            );

        qsa("[data-close-modal]")
            .forEach(element => {
                element.addEventListener(
                    "click",
                    closeModals
                );
            });

        document.addEventListener(
            "keydown",
            event => {
                if (event.key === "Escape") {
                    closeModals();
                }
            }
        );
    }

    function initialize() {
        if (
            window.__IIE_EXPENSE_TRACKER_INITIALIZED__
        ) {
            return;
        }

        window.__IIE_EXPENSE_TRACKER_INITIALIZED__ =
            true;

        populateCategories();
        bindEvents();

        const trips =
            getAllTrips();

        const savedActive =
            localStorage.getItem(
                ACTIVE_TRIP_KEY
            );

        if (
            savedActive &&
            trips.some(
                trip =>
                    trip.id === savedActive
            )
        ) {
            currentTripId =
                savedActive;
        } else if (trips.length) {
            currentTripId =
                trips[0].id;

            setActiveTrip(
                currentTripId
            );
        }

        refreshUI();
    }

    // ------------------------------------------------------------
    // Public API
    // ------------------------------------------------------------

    root.TravelExpenseTracker = {
        CATEGORIES,
        CURRENCIES,
        WARNING_THRESHOLD,

        createTrip,
        updateTrip,
        deleteTrip,
        getTrip,
        getAllTrips,

        addExpense,
        updateExpense,
        deleteExpense,

        calculateSummary,
        calculateCategoryTotals,
        calculatePlannedActual,
        filterExpenses,
        getDailySummary,
        getBudgetAlert,

        buildCSV,
        buildReport,

        formatMoney,
        getCategoryLabel,

        setActiveTrip,
        getActiveTrip,

        initialize
    };

    root.initTravelExpenseTrackerPage =
        initialize;

    if (
        document.readyState === "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            { once: true }
        );
    } else {
        initialize();
    }

})(window);