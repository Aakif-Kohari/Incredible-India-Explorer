const siteData = {
    Burzahom: {
        description:
            "A Kashmir Neolithic site known for pit dwellings, stone tools, pottery and evidence of early farming and animal use."
    },
    Koldihwa: {
        description:
            "A Belan Valley site associated with early rice cultivation and Neolithic settlement remains."
    },
    Chirand: {
        description:
            "A major Bihar Neolithic site known for pottery, bone tools, stone tools and evidence of food production."
    },
    "Daojali Hading": {
        description:
            "An important northeastern site associated with polished stone tools, pottery and early settled communities."
    },
    Piklihal: {
        description:
            "A southern Neolithic site in Karnataka showing evidence of pastoral communities and animal domestication."
    },
    Utnur: {
        description:
            "A southern Neolithic site in Telangana associated with pastoral activity and ash-mound traditions."
    }
};

const mapMarkers = document.querySelectorAll(".map-marker");
const siteName = document.getElementById("map-site-name");
const siteDescription = document.getElementById("map-site-description");

function showSite(site) {
    const data = siteData[site];

    if (!data) {
        return;
    }

    siteName.textContent = site;
    siteDescription.textContent = data.description;
}

mapMarkers.forEach((marker) => {
    const site = marker.dataset.site;

    marker.addEventListener("click", () => {
        showSite(site);
    });

    marker.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            showSite(site);
        }
    });
});