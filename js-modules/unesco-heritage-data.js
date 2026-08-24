/**
 * unesco-heritage-data.js
 * Heritage Site Taxonomy & Historical Metadata Repository
 * Standardized pure Vanilla JavaScript data exports for UNESCO sites in India.
 */

export const HERITAGE_ZONE_REGIONS = {
    "Northern Zone": ["Delhi", "Uttar Pradesh", "Himachal Pradesh", "Punjab"],
    "Western Zone": ["Maharashtra", "Gujarat", "Rajasthan", "Goa"],
    "Southern Zone": ["Karnataka", "Tamil Nadu", "Kerala", "Telangana"],
    "Eastern Zone": ["West Bengal", "Odisha", "Assam", "Bihar"]
};

export const UN_HERITAGE_PROTECTION_ACTS = [
    {
        actName: "Ancient Monuments and Archaeological Sites and Remains Act",
        year: 1958,
        authority: "Archaeological Survey of India (ASI)"
    },
    {
        actName: "UNESCO World Heritage Convention",
        year: 1972,
        authority: "United Nations Educational, Scientific and Cultural Organization"
    }
];
