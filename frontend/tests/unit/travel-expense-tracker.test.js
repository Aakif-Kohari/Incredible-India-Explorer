import { describe, expect, it, beforeEach } from "vitest";

function createStorage() {
    let data = {};

    return {
        getItem(key) {
            return Object.prototype.hasOwnProperty.call(
                data,
                key
            )
                ? data[key]
                : null;
        },

        setItem(key, value) {
            data[key] = String(value);
        },

        removeItem(key) {
            delete data[key];
        },

        clear() {
            data = {};
        }
    };
}

function loadModule(storage) {
    globalThis.localStorage = storage;

    globalThis.window = globalThis;

    delete globalThis.TravelExpenseTracker;

    return import(
        `../../js-modules/travel-expense-tracker.js?test=${Date.now()}-${Math.random()}`
    );
}

describe("Travel Expense Tracker", () => {

    let storage;
    let tracker;

    beforeEach(async () => {
        storage = createStorage();

        await loadModule(storage);

        tracker =
            globalThis.TravelExpenseTracker;
    });


    it("creates a trip with an empty expense list", () => {

        const trip =
            tracker.createTrip(
                {
                    name: "Goa Trip",
                    destination: "Goa",
                    currency: "INR",
                    budget: 50000
                },
                storage
            );

        expect(trip.name).toBe(
            "Goa Trip"
        );

        expect(trip.destination).toBe(
            "Goa"
        );

        expect(trip.budget).toBe(
            50000
        );

        expect(trip.expenses).toEqual([]);
    });


    it("rejects a trip without a valid budget", () => {

        expect(() =>
            tracker.createTrip(
                {
                    name: "Invalid Trip",
                    budget: 0
                },
                storage
            )
        ).toThrow(
            "Trip budget must be greater than zero."
        );
    });


    it("adds an expense to a trip", () => {

        const trip =
            tracker.createTrip(
                {
                    name: "Delhi Trip",
                    budget: 20000
                },
                storage
            );

        const expense =
            tracker.addExpense(
                trip.id,
                {
                    description: "Hotel",
                    amount: 3000,
                    category: "accommodation",
                    date: "2026-08-20"
                },
                storage
            );

        expect(expense.description).toBe(
            "Hotel"
        );

        expect(expense.amount).toBe(
            3000
        );

        const updated =
            tracker.getTrip(
                trip.id,
                storage
            );

        expect(
            updated.expenses
        ).toHaveLength(1);
    });


    it("calculates total spent correctly", () => {

        const trip =
            tracker.createTrip(
                {
                    name: "Jaipur Trip",
                    budget: 30000
                },
                storage
            );

        tracker.addExpense(
            trip.id,
            {
                description: "Hotel",
                amount: 5000,
                category: "accommodation",
                date: "2026-08-20"
            },
            storage
        );

        tracker.addExpense(
            trip.id,
            {
                description: "Food",
                amount: 1500,
                category: "food",
                date: "2026-08-20"
            },
            storage
        );

        const updated =
            tracker.getTrip(
                trip.id,
                storage
            );

        const summary =
            tracker.calculateSummary(
                updated
            );

        expect(
            summary.totalSpent
        ).toBe(6500);

        expect(
            summary.remaining
        ).toBe(23500);
    });


    it("calculates budget utilization", () => {

        const trip =
            tracker.createTrip(
                {
                    name: "Mumbai Trip",
                    budget: 10000
                },
                storage
            );

        tracker.addExpense(
            trip.id,
            {
                description: "Food",
                amount: 2500,
                category: "food"
            },
            storage
        );

        const updated =
            tracker.getTrip(
                trip.id,
                storage
            );

        const summary =
            tracker.calculateSummary(
                updated
            );

        expect(
            summary.utilization
        ).toBe(25);
    });


    it("returns warning at 85 percent budget usage", () => {

        const trip =
            tracker.createTrip(
                {
                    name: "Warning Trip",
                    budget: 10000
                },
                storage
            );

        tracker.addExpense(
            trip.id,
            {
                description: "Expense",
                amount: 8500,
                category: "other"
            },
            storage
        );

        const updated =
            tracker.getTrip(
                trip.id,
                storage
            );

        const alert =
            tracker.getBudgetAlert(
                updated
            );

        expect(
            alert.status
        ).toBe("warning");
    });


    it("returns exceeded when spending goes above budget", () => {

        const trip =
            tracker.createTrip(
                {
                    name: "Over Budget",
                    budget: 10000
                },
                storage
            );

        tracker.addExpense(
            trip.id,
            {
                description: "Emergency",
                amount: 12000,
                category: "emergency"
            },
            storage
        );

        const updated =
            tracker.getTrip(
                trip.id,
                storage
            );

        const alert =
            tracker.getBudgetAlert(
                updated
            );

        expect(
            alert.status
        ).toBe("exceeded");

        expect(
            tracker.calculateSummary(
                updated
            ).remaining
        ).toBe(-2000);
    });


    it("calculates category-wise totals", () => {

        const trip =
            tracker.createTrip(
                {
                    name: "Kerala Trip",
                    budget: 50000
                },
                storage
            );

        tracker.addExpense(
            trip.id,
            {
                description: "Hotel",
                amount: 7000,
                category: "accommodation"
            },
            storage
        );

        tracker.addExpense(
            trip.id,
            {
                description: "Breakfast",
                amount: 500,
                category: "food"
            },
            storage
        );

        tracker.addExpense(
            trip.id,
            {
                description: "Dinner",
                amount: 1000,
                category: "food"
            },
            storage
        );

        const updated =
            tracker.getTrip(
                trip.id,
                storage
            );

        const totals =
            tracker.calculateCategoryTotals(
                updated
            );

        expect(
            totals.accommodation
        ).toBe(7000);

        expect(
            totals.food
        ).toBe(1500);

        expect(
            totals.shopping
        ).toBe(0);
    });


    it("filters expenses by category", () => {

        const trip =
            tracker.createTrip(
                {
                    name: "Filter Trip",
                    budget: 20000
                },
                storage
            );

        tracker.addExpense(
            trip.id,
            {
                description: "Hotel",
                amount: 3000,
                category: "accommodation"
            },
            storage
        );

        tracker.addExpense(
            trip.id,
            {
                description: "Lunch",
                amount: 500,
                category: "food"
            },
            storage
        );

        const updated =
            tracker.getTrip(
                trip.id,
                storage
            );

        const result =
            tracker.filterExpenses(
                updated.expenses,
                {
                    category:
                        "accommodation"
                }
            );

        expect(result).toHaveLength(1);

        expect(
            result[0].description
        ).toBe("Hotel");
    });


    it("filters expenses by date range", () => {

        const trip =
            tracker.createTrip(
                {
                    name: "Date Trip",
                    budget: 20000
                },
                storage
            );

        tracker.addExpense(
            trip.id,
            {
                description: "Old",
                amount: 100,
                category: "food",
                date: "2026-08-01"
            },
            storage
        );

        tracker.addExpense(
            trip.id,
            {
                description: "Current",
                amount: 200,
                category: "food",
                date: "2026-08-20"
            },
            storage
        );

        const updated =
            tracker.getTrip(
                trip.id,
                storage
            );

        const result =
            tracker.filterExpenses(
                updated.expenses,
                {
                    from: "2026-08-15",
                    to: "2026-08-25"
                }
            );

        expect(result).toHaveLength(1);

        expect(
            result[0].description
        ).toBe("Current");
    });


    it("filters expenses by search text", () => {

        const trip =
            tracker.createTrip(
                {
                    name: "Search Trip",
                    budget: 20000
                },
                storage
            );

        tracker.addExpense(
            trip.id,
            {
                description: "Airport Taxi",
                amount: 700,
                category: "transportation"
            },
            storage
        );

        tracker.addExpense(
            trip.id,
            {
                description: "Restaurant",
                amount: 1200,
                category: "food"
            },
            storage
        );

        const updated =
            tracker.getTrip(
                trip.id,
                storage
            );

        const result =
            tracker.filterExpenses(
                updated.expenses,
                {
                    search: "taxi"
                }
            );

        expect(result).toHaveLength(1);

        expect(
            result[0].description
        ).toBe("Airport Taxi");
    });


    it("updates an existing expense", () => {

        const trip =
            tracker.createTrip(
                {
                    name: "Update Trip",
                    budget: 20000
                },
                storage
            );

        const expense =
            tracker.addExpense(
                trip.id,
                {
                    description: "Lunch",
                    amount: 500,
                    category: "food"
                },
                storage
            );

        tracker.updateExpense(
            trip.id,
            expense.id,
            {
                description: "Dinner",
                amount: 1000,
                category: "food"
            },
            storage
        );

        const updated =
            tracker.getTrip(
                trip.id,
                storage
            );

        expect(
            updated.expenses[0].description
        ).toBe("Dinner");

        expect(
            updated.expenses[0].amount
        ).toBe(1000);
    });


    it("deletes an expense", () => {

        const trip =
            tracker.createTrip(
                {
                    name: "Delete Trip",
                    budget: 20000
                },
                storage
            );

        const expense =
            tracker.addExpense(
                trip.id,
                {
                    description: "Snack",
                    amount: 200,
                    category: "food"
                },
                storage
            );

        expect(
            tracker.deleteExpense(
                trip.id,
                expense.id,
                storage
            )
        ).toBe(true);

        const updated =
            tracker.getTrip(
                trip.id,
                storage
            );

        expect(
            updated.expenses
        ).toHaveLength(0);
    });


    it("calculates daily summaries", () => {

        const trip =
            tracker.createTrip(
                {
                    name: "Daily Trip",
                    budget: 20000
                },
                storage
            );

        tracker.addExpense(
            trip.id,
            {
                description: "Breakfast",
                amount: 300,
                category: "food",
                date: "2026-08-20"
            },
            storage
        );

        tracker.addExpense(
            trip.id,
            {
                description: "Lunch",
                amount: 500,
                category: "food",
                date: "2026-08-20"
            },
            storage
        );

        const updated =
            tracker.getTrip(
                trip.id,
                storage
            );

        const daily =
            tracker.getDailySummary(
                updated
            );

        expect(daily).toHaveLength(1);

        expect(
            daily[0].total
        ).toBe(800);

        expect(
            daily[0].count
        ).toBe(2);
    });


    it("generates CSV expense reports", () => {

        const trip =
            tracker.createTrip(
                {
                    name: "CSV Trip",
                    budget: 20000
                },
                storage
            );

        tracker.addExpense(
            trip.id,
            {
                description: "Hotel",
                amount: 3000,
                category: "accommodation",
                date: "2026-08-20"
            },
            storage
        );

        const updated =
            tracker.getTrip(
                trip.id,
                storage
            );

        const csv =
            tracker.buildCSV(
                updated
            );

        expect(csv).toContain(
            "Date,Description,Category"
        );

        expect(csv).toContain(
            "Hotel"
        );

        expect(csv).toContain(
            "Accommodation"
        );
    });


    it("generates a readable expense report", () => {

        const trip =
            tracker.createTrip(
                {
                    name: "Report Trip",
                    destination: "Delhi",
                    budget: 30000
                },
                storage
            );

        tracker.addExpense(
            trip.id,
            {
                description: "Metro",
                amount: 200,
                category: "transportation"
            },
            storage
        );

        const updated =
            tracker.getTrip(
                trip.id,
                storage
            );

        const report =
            tracker.buildReport(
                updated
            );

        expect(report).toContain(
            "SMART TRAVEL EXPENSE REPORT"
        );

        expect(report).toContain(
            "Report Trip"
        );

        expect(report).toContain(
            "Delhi"
        );

        expect(report).toContain(
            "Metro"
        );

        expect(report).toContain(
            "Transportation"
        );
    });


    it("persists trips across reads", () => {

        const trip =
            tracker.createTrip(
                {
                    name: "Persistent Trip",
                    budget: 25000
                },
                storage
            );

        const trips =
            tracker.getAllTrips(
                storage
            );

        expect(trips).toHaveLength(1);

        expect(
            trips[0].id
        ).toBe(trip.id);
    });


    it("supports multiple independent trips", () => {

        const first =
            tracker.createTrip(
                {
                    name: "Trip One",
                    budget: 10000
                },
                storage
            );

        const second =
            tracker.createTrip(
                {
                    name: "Trip Two",
                    budget: 20000
                },
                storage
            );

        tracker.addExpense(
            first.id,
            {
                description: "Food",
                amount: 1000,
                category: "food"
            },
            storage
        );

        tracker.addExpense(
            second.id,
            {
                description: "Hotel",
                amount: 5000,
                category: "accommodation"
            },
            storage
        );

        expect(
            tracker.getTrip(
                first.id,
                storage
            ).expenses
        ).toHaveLength(1);

        expect(
            tracker.getTrip(
                second.id,
                storage
            ).expenses
        ).toHaveLength(1);
    });

});