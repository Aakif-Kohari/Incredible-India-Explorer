/**
 * ACCESSIBILITY DATA
 * -------------------
 * Structured accessibility metadata for destinations, keyed by the same
 * state/UT `id` used in the main `mapData.locations` array (see /data.js).
 *
 * This is intentionally separate from data.js so that:
 *   1. Contributors can extend accessibility info without touching the
 *      core map/culture dataset.
 *   2. The scoring engine (accessibility-engine.js) can be unit tested
 *      against this data independently.
 *
 * Field guide:
 *   wheelchairAccess   : "full" | "partial" | "none" | "unknown"
 *   accessibleParking  : boolean
 *   accessibleRestrooms: boolean
 *   stepFreeEntry      : boolean
 *   brailleSignage     : boolean
 *   audioGuide         : boolean
 *   signLanguageTours  : boolean
 *   notes              : short human-readable caveat (optional)
 *
 * States not yet covered fall back to `unknown` values everywhere via
 * getAccessibilityMeta() below, and are clearly labeled "Limited data"
 * in the UI rather than silently scored as inaccessible.
 */

const accessibilityData = {
    dl: { // Delhi
        wheelchairAccess: "full",
        accessibleParking: true,
        accessibleRestrooms: true,
        stepFreeEntry: true,
        brailleSignage: true,
        audioGuide: true,
        signLanguageTours: false,
        notes: "Major monuments (Red Fort, Qutub Minar) have ramps and wheelchair loans on request."
    },
    ap: { // Andhra Pradesh
        wheelchairAccess: "partial",
        accessibleParking: true,
        accessibleRestrooms: false,
        stepFreeEntry: false,
        brailleSignage: false,
        audioGuide: false,
        signLanguageTours: false,
        notes: "Temple complexes often have steps; ramps available at newer visitor centres only."
    },
    ka: { // Karnataka
        wheelchairAccess: "partial",
        accessibleParking: true,
        accessibleRestrooms: true,
        stepFreeEntry: false,
        brailleSignage: false,
        audioGuide: true,
        signLanguageTours: false,
        notes: "Palaces such as Mysore Palace have ramped side entrances."
    },
    kl: { // Kerala
        wheelchairAccess: "full",
        accessibleParking: true,
        accessibleRestrooms: true,
        stepFreeEntry: true,
        brailleSignage: false,
        audioGuide: true,
        signLanguageTours: true,
        notes: "Houseboats offer step-free boarding at several Alleppey jetties."
    },
    rj: { // Rajasthan
        wheelchairAccess: "partial",
        accessibleParking: true,
        accessibleRestrooms: false,
        stepFreeEntry: false,
        brailleSignage: false,
        audioGuide: true,
        signLanguageTours: false,
        notes: "Hill forts (Amer, Mehrangarh) have uneven terrain; palace museums are more accessible."
    },
    mh: { // Maharashtra
        wheelchairAccess: "full",
        accessibleParking: true,
        accessibleRestrooms: true,
        stepFreeEntry: true,
        brailleSignage: true,
        audioGuide: true,
        signLanguageTours: false,
        notes: "Gateway of India and CSMT area are step-free; Ajanta/Ellora caves have partial access."
    },
    tn: { // Tamil Nadu
        wheelchairAccess: "partial",
        accessibleParking: true,
        accessibleRestrooms: true,
        stepFreeEntry: false,
        brailleSignage: false,
        audioGuide: false,
        signLanguageTours: false,
        notes: "Temple gopurams typically involve steps at the main entrance."
    },
    up: { // Uttar Pradesh
        wheelchairAccess: "full",
        accessibleParking: true,
        accessibleRestrooms: true,
        stepFreeEntry: true,
        brailleSignage: true,
        audioGuide: true,
        signLanguageTours: true,
        notes: "Taj Mahal complex offers wheelchairs, a dedicated ramp, and a tactile model for visually impaired visitors."
    },
    wb: { // West Bengal
        wheelchairAccess: "partial",
        accessibleParking: true,
        accessibleRestrooms: true,
        stepFreeEntry: false,
        brailleSignage: false,
        audioGuide: false,
        signLanguageTours: false,
        notes: "Victoria Memorial grounds are step-free; some gallery sections have stairs only."
    },
    ga: { // Goa
        wheelchairAccess: "partial",
        accessibleParking: true,
        accessibleRestrooms: false,
        stepFreeEntry: true,
        brailleSignage: false,
        audioGuide: false,
        signLanguageTours: false,
        notes: "Beach access varies widely by stretch; a few beaches offer beach wheelchairs seasonally."
    },
    jk: { // Jammu and Kashmir
        wheelchairAccess: "none",
        accessibleParking: false,
        accessibleRestrooms: false,
        stepFreeEntry: false,
        brailleSignage: false,
        audioGuide: false,
        signLanguageTours: false,
        notes: "High-altitude and mountainous terrain; accessibility infrastructure is very limited."
    },
    sk: { // Sikkim
        wheelchairAccess: "none",
        accessibleParking: false,
        accessibleRestrooms: false,
        stepFreeEntry: false,
        brailleSignage: false,
        audioGuide: false,
        signLanguageTours: false,
        notes: "Steep mountain roads and monastery steps make most sites unsuitable for wheelchair users."
    }
    // Remaining states/UTs intentionally omitted for v1 — they fall back to
    // "unknown" via getAccessibilityMeta() and are flagged as low-confidence
    // in the UI. Community reports (see accessibility-storage.js) are the
    // intended way to fill these in over time.
};

const UNKNOWN_META = Object.freeze({
    wheelchairAccess: "unknown",
    accessibleParking: false,
    accessibleRestrooms: false,
    stepFreeEntry: false,
    brailleSignage: false,
    audioGuide: false,
    signLanguageTours: false,
    notes: "No verified accessibility data yet. Be the first to submit a report!"
});

/**
 * Always returns a usable metadata object, falling back to UNKNOWN_META
 * for states that haven't been documented yet.
 */
function getAccessibilityMeta(stateId) {
    return accessibilityData[stateId] || UNKNOWN_META;
}

function hasVerifiedData(stateId) {
    return Boolean(accessibilityData[stateId]);
}

// Expose for both the browser (script tag) and Node (unit tests).
if (typeof module !== "undefined" && module.exports) {
    module.exports = { accessibilityData, getAccessibilityMeta, hasVerifiedData, UNKNOWN_META };
}
if (typeof window !== "undefined") {
    window.AccessibilityData = { accessibilityData, getAccessibilityMeta, hasVerifiedData, UNKNOWN_META };
}
