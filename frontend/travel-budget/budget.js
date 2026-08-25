/*
 * Smart Indian Travel Budget Estimator
 * Handles:
 * - Destination selection
 * - Budget calculation
 * - Expense breakdown
 * - Input validation
 * - Reset
 * - LocalStorage
 * - Saved budget indicator
 */

document.addEventListener("DOMContentLoaded", () => {
    const destinationSelect = document.getElementById("destination");
    const travelersInput = document.getElementById("travelers");
    const daysInput = document.getElementById("days");
    const travelStyleSelect = document.getElementById("travelStyle");

    const calculateBtn = document.getElementById("calculateBtn");
    const resetBtn = document.getElementById("resetBtn");
    const saveBtn = document.getElementById("saveBtn");

    const resultSection = document.getElementById("resultSection");
    const emptyState = document.getElementById("emptyState");
    const errorMessage = document.getElementById("errorMessage");

    const resultDestination = document.getElementById("resultDestination");
    const resultStyle = document.getElementById("resultStyle");

    const totalCost = document.getElementById("totalCost");
    const perPerson = document.getElementById("perPerson");
    const perDay = document.getElementById("perDay");
    const perPersonDay = document.getElementById("perPersonDay");

    const tripSummary = document.getElementById("tripSummary");
    const expenseList = document.getElementById("expenseList");
    const travelTip = document.getElementById("travelTip");

    const toast = document.getElementById("toast");

    const STORAGE_KEY = "incredibleIndiaTravelBudget";

    const expenseConfig = [
        {
            key: "accommodation",
            label: "Accommodation",
            icon: "🏨"
        },
        {
            key: "food",
            label: "Food",
            icon: "🍛"
        },
        {
            key: "localTransport",
            label: "Local Transportation",
            icon: "🚌"
        },
        {
            key: "activities",
            label: "Activities & Sightseeing",
            icon: "🎟️"
        },
        {
            key: "miscellaneous",
            label: "Miscellaneous",
            icon: "🧳"
        }
    ];


    /* =========================
       INITIALIZATION
    ========================= */

    populateDestinations();
    restoreSavedBudget();


    /* =========================
       POPULATE DESTINATIONS
    ========================= */

    function populateDestinations() {
        if (!Array.isArray(window.travelBudgetData)) {
            showError(
                "Travel budget data could not be loaded. Please refresh the page."
            );
            return;
        }

        const sortedDestinations = [...window.travelBudgetData].sort(
            (a, b) => a.name.localeCompare(b.name)
        );

        sortedDestinations.forEach((destination) => {
            const option = document.createElement("option");

            option.value = destination.id;

            option.textContent =
                `${destination.name}, ${destination.state}`;

            destinationSelect.appendChild(option);
        });
    }


    /* =========================
       CALCULATE BUDGET
    ========================= */

    calculateBtn.addEventListener("click", calculateBudget);

    function calculateBudget() {
        clearError();

        const destinationId = destinationSelect.value;

        const travelers = Number(
            travelersInput.value
        );

        const days = Number(
            daysInput.value
        );

        const travelStyle = travelStyleSelect.value;


        // Validation

        if (!destinationId) {
            showError(
                "Please select a destination."
            );
            destinationSelect.focus();
            return;
        }

        if (
            !Number.isInteger(travelers) ||
            travelers < 1 ||
            travelers > 50
        ) {
            showError(
                "Number of travelers must be between 1 and 50."
            );
            travelersInput.focus();
            return;
        }

        if (
            !Number.isInteger(days) ||
            days < 1 ||
            days > 365
        ) {
            showError(
                "Trip duration must be between 1 and 365 days."
            );
            daysInput.focus();
            return;
        }

        if (
            !["budget", "standard", "premium"]
                .includes(travelStyle)
        ) {
            showError(
                "Please select a valid travel style."
            );
            return;
        }


        const destination =
            window.travelBudgetData.find(
                item => item.id === destinationId
            );

        if (!destination) {
            showError(
                "The selected destination is currently unavailable."
            );
            return;
        }


        const dailyRates =
            destination[travelStyle];

        if (!dailyRates) {
            showError(
                "Budget information is unavailable for this travel style."
            );
            return;
        }


        /*
         * Calculate expenses.
         *
         * Dataset values are daily estimates
         * per person.
         */

        const expenses = {};

        let dailyPerPersonTotal = 0;

        expenseConfig.forEach((expense) => {

            const dailyRate =
                Number(
                    dailyRates[expense.key]
                ) || 0;

            const total =
                dailyRate *
                days *
                travelers;

            expenses[expense.key] = total;

            dailyPerPersonTotal += dailyRate;
        });


        const total =
            dailyPerPersonTotal *
            days *
            travelers;

        const calculatedPerPerson =
            total / travelers;

        const calculatedPerDay =
            total / days;

        const calculatedPerPersonDay =
            total /
            travelers /
            days;


        renderResults({
            destination,
            travelStyle,
            travelers,
            days,
            expenses,
            total,
            perPerson: calculatedPerPerson,
            perDay: calculatedPerDay,
            perPersonDay: calculatedPerPersonDay
        });


        saveCurrentBudget({
            destinationId,
            travelers,
            days,
            travelStyle
        });
    }


    /* =========================
       RENDER RESULTS
    ========================= */

    function renderResults(data) {

        resultDestination.textContent =
            `${data.destination.name}, ${data.destination.state}`;

        resultStyle.textContent =
            getStyleLabel(data.travelStyle);

        totalCost.textContent =
            formatCurrency(data.total);

        perPerson.textContent =
            formatCurrency(data.perPerson);

        perDay.textContent =
            formatCurrency(data.perDay);

        perPersonDay.textContent =
            formatCurrency(data.perPersonDay);

        tripSummary.textContent =
            `${data.travelers} traveler${data.travelers === 1 ? "" : "s"} · ` +
            `${data.days} day${data.days === 1 ? "" : "s"}`;


        travelTip.textContent =
            data.destination.tip ||
            "Plan ahead and compare prices before booking.";


        renderExpenseBreakdown(
            data.expenses,
            data.total
        );


        emptyState.classList.add("hidden");

        resultSection.classList.remove("hidden");


        resultSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }


    /* =========================
       EXPENSE BREAKDOWN
    ========================= */

    function renderExpenseBreakdown(
        expenses,
        total
    ) {
        expenseList.innerHTML = "";

        expenseConfig.forEach((expense) => {

            const amount =
                Number(
                    expenses[expense.key]
                ) || 0;

            const percentage =
                total > 0
                    ? (amount / total) * 100
                    : 0;


            const item =
                document.createElement("div");

            item.className =
                "expense-item";


            item.innerHTML = `
                <div class="expense-top">

                    <div class="expense-name">

                        <span class="expense-icon">
                            ${expense.icon}
                        </span>

                        <span>
                            ${escapeHTML(expense.label)}
                        </span>

                    </div>

                    <span class="expense-value">
                        ${formatCurrency(amount)}
                    </span>

                </div>

                <div class="progress-track">

                    <div
                        class="progress-bar"
                        style="width: ${Math.min(percentage, 100)}%"
                        aria-label="${Math.round(percentage)}% of total budget"
                    ></div>

                </div>
            `;


            expenseList.appendChild(item);
        });
    }


    /* =========================
       RESET
    ========================= */

    resetBtn.addEventListener("click", resetCalculator);

    function resetCalculator() {

        destinationSelect.value = "";

        travelersInput.value = 2;

        daysInput.value = 4;

        travelStyleSelect.value = "standard";


        resultSection.classList.add("hidden");

        emptyState.classList.remove("hidden");

        clearError();

        localStorage.removeItem(STORAGE_KEY);

        saveBtn.textContent =
            "☆ Save Budget";
    }


    /* =========================
       SAVE BUDGET
    ========================= */

    saveBtn.addEventListener("click", () => {

        const destinationId =
            destinationSelect.value;

        const travelers =
            Number(travelersInput.value);

        const days =
            Number(daysInput.value);

        const travelStyle =
            travelStyleSelect.value;


        if (!destinationId) {
            showError(
                "Calculate a budget before saving it."
            );
            return;
        }


        const savedBudget = {
            destinationId,
            travelers,
            days,
            travelStyle,
            savedAt: new Date().toISOString()
        };


        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(savedBudget)
        );


        saveBtn.textContent =
            "★ Budget Saved";

        showToast(
            "Your travel budget has been saved."
        );
    });


    /* =========================
       RESTORE SAVED BUDGET
    ========================= */

    function restoreSavedBudget() {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return;
        }


        try {

            const data =
                JSON.parse(saved);


            if (
                !data ||
                typeof data !== "object"
            ) {
                return;
            }


            if (data.destinationId) {
                destinationSelect.value =
                    data.destinationId;
            }

            if (
                Number.isInteger(
                    data.travelers
                )
            ) {
                travelersInput.value =
                    data.travelers;
            }

            if (
                Number.isInteger(
                    data.days
                )
            ) {
                daysInput.value =
                    data.days;
            }

            if (
                ["budget", "standard", "premium"]
                    .includes(data.travelStyle)
            ) {
                travelStyleSelect.value =
                    data.travelStyle;
            }


            /*
             * Don't automatically display results.
             * User can press Calculate Budget.
             */

            saveBtn.textContent =
                "★ Saved Budget Loaded";

        } catch (error) {

            console.warn(
                "Could not restore saved budget:",
                error
            );

            localStorage.removeItem(
                STORAGE_KEY
            );
        }
    }


    /* =========================
       HELPERS
    ========================= */

    function getStyleLabel(style) {

        const labels = {
            budget: "💰 Budget",
            standard: "⭐ Standard",
            premium: "👑 Premium"
        };

        return labels[style] || "Standard";
    }


    function formatCurrency(value) {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(
            Math.round(value)
        );
    }


    function showError(message) {

        errorMessage.textContent =
            message;

        errorMessage.classList.remove(
            "hidden"
        );
    }


    function clearError() {

        errorMessage.textContent = "";

        errorMessage.classList.add(
            "hidden"
        );
    }


    function showToast(message) {

        toast.textContent =
            message;

        toast.classList.add(
            "show"
        );


        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2800);
    }


    /*
     * Prevent dataset values from being
     * interpreted as HTML.
     */

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    /* =========================
       KEYBOARD SUPPORT
    ========================= */

    [
        destinationSelect,
        travelersInput,
        daysInput,
        travelStyleSelect
    ].forEach((element) => {

        element.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter"
                ) {
                    calculateBudget();
                }

            }
        );
    });

});