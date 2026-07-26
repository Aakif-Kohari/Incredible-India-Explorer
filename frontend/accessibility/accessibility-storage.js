/**
 * ACCESSIBILITY STORAGE
 * ---------------------
 * This project is a static, backend-free site (see README: "no complex
 * build tools or backend frameworks"). To honor that architecture while
 * still supporting "user-contributed accessibility reports" (issue #690),
 * this module persists preferences and reports to localStorage, scoped
 * per-browser.
 *
 * NOTE: because there's no server, reports here are local to the
 * contributor's own browser and are NOT shared across users out of the
 * box. The `exportReports()` / `importReports()` helpers below exist so
 * a future backend (see "Technical Considerations" in the issue) can
 * sync this data once one exists, without changing the UI code.
 */

const PREFS_KEY = "iie_accessibility_preferences";
const REPORTS_KEY_PREFIX = "iie_accessibility_reports_";

function safeParse(json, fallback) {
    try {
        const parsed = JSON.parse(json);
        return parsed == null ? fallback : parsed;
    } catch (e) {
        return fallback;
    }
}

function getPreferences() {
    if (typeof localStorage === "undefined") return {};
    return safeParse(localStorage.getItem(PREFS_KEY), {});
}

function setPreferences(prefs) {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs || {}));
}

function getReports(stateId) {
    if (typeof localStorage === "undefined") return [];
    return safeParse(localStorage.getItem(REPORTS_KEY_PREFIX + stateId), []);
}

/**
 * @param {string} stateId
 * @param {{rating: number, category: string, comment: string}} report
 */
function submitReport(stateId, report) {
    if (typeof localStorage === "undefined") return null;
    const rating = Number(report && report.rating);
    if (!rating || rating < 1 || rating > 5) {
        throw new Error("Report rating must be a number between 1 and 5.");
    }
    const existing = getReports(stateId);
    const entry = {
        rating,
        category: (report.category || "other").trim(),
        comment: (report.comment || "").trim().slice(0, 500),
        createdAt: new Date().toISOString()
    };
    const updated = [...existing, entry];
    localStorage.setItem(REPORTS_KEY_PREFIX + stateId, JSON.stringify(updated));
    return entry;
}

function exportReports(stateId) {
    return getReports(stateId);
}

function importReports(stateId, reports) {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(REPORTS_KEY_PREFIX + stateId, JSON.stringify(reports || []));
}

const AccessibilityStorage = {
    getPreferences,
    setPreferences,
    getReports,
    submitReport,
    exportReports,
    importReports
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = AccessibilityStorage;
}
if (typeof window !== "undefined") {
    window.AccessibilityStorage = AccessibilityStorage;
}
