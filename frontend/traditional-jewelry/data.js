// data.js - Gemstones and Jewelry Data

window.jewelryData = {
    styles: [
        {
            id: "kundan",
            name: "Kundan Jewelry",
            region: "Rajasthan",
            materials: "Gold foil, precious gemstones, lac",
            gemstones: "Emerald, ruby, diamond, pearl, sapphire",
            technique: "Stone setting with highly refined gold foil.",
            significance: "Associated with Mughal and Rajput royal jewelry traditions. Known for its elaborate, majestic appearance.",
            image: "assets/kundan.jpg",
            process: [
                {
                    step: 1,
                    title: "Ghaat (Framework)",
                    description: "Artisans craft the skeletal framework (Ghaat) of the jewelry piece using thin strips of gold.",
                    tools: "Tweezers, fine pliers, chisels",
                    materials: "24-karat Gold",
                    timeRequired: "1-2 days",
                    illustration: "assets/process/ghaat.jpg"
                },
                {
                    step: 2,
                    title: "Paadh (Lac Filling)",
                    description: "The hollow gold framework is filled with a natural resin called lac, poured in a molten state to form a solid core.",
                    tools: "Heating tools, spatulas",
                    materials: "Lac resin",
                    timeRequired: "Hours",
                    illustration: "assets/process/paadh.jpg"
                },
                {
                    step: 3,
                    title: "Khudai (Gem Placement)",
                    description: "Uncut gemstones (polki) or glass are meticulously positioned onto the hardened lac within the framework.",
                    tools: "Fine tweezers, magnification lens",
                    materials: "Uncut diamonds, rubies, emeralds",
                    timeRequired: "1-3 days depending on complexity",
                    illustration: "assets/process/khudai.jpg"
                },
                {
                    step: 4,
                    title: "Jadai (Gold Foil Setting)",
                    description: "Highly refined, pure gold foil (Kundan) is pressed around the edges of the gemstones using specialized tools to wedge them securely into place without heat.",
                    tools: "Salai (burnisher), chisels",
                    materials: "Pure Gold foil (Kundan)",
                    timeRequired: "Days to Weeks",
                    illustration: "assets/process/jadai.jpg"
                },
                {
                    step: 5,
                    title: "Chillai (Polishing)",
                    description: "The completed piece is meticulously cleaned, polished, and finished to bring out the luster of the gold and gems.",
                    tools: "Polishing wheels, soft cloths, mild abrasives",
                    materials: "Polishing compounds",
                    timeRequired: "1 day",
                    illustration: "assets/process/chillai.jpg"
                }
            ]
        },
        {
            id: "meenakari",
            name: "Meenakari",
            region: "Rajasthan (Jaipur), Gujarat, Varanasi",
            materials: "Gold, silver, colored enamels",
            gemstones: "Often combined with Kundan stones",
            technique: "Fusing colored glass powder (enamel) to a metal substrate through intense heat.",
            significance: "Introduced by the Mughals, it transforms jewelry into colorful, intricate miniature paintings on metal.",
            image: "assets/meenakari.jpg",
            process: [
                {
                    step: 1,
                    title: "Ghaat (Metal Preparation)",
                    description: "The basic form of the jewelry is crafted in gold or silver by the goldsmith.",
                    tools: "Hammers, anvils, pliers",
                    materials: "Gold or Silver",
                    timeRequired: "1-2 days",
                    illustration: "assets/process/meena-ghaat.jpg"
                },
                {
                    step: 2,
                    title: "Nakashi (Engraving)",
                    description: "Intricate designs (birds, flowers, vines) are carefully engraved into the metal surface, creating depressions (champlevé) to hold the enamel.",
                    tools: "Steel chisels, engraving burins",
                    materials: "None",
                    timeRequired: "Days",
                    illustration: "assets/process/nakashi.jpg"
                },
                {
                    step: 3,
                    title: "Meenakari (Enamel Filling)",
                    description: "Finely crushed glass powder mixed with a liquid binding agent is delicately painted into the engraved depressions.",
                    tools: "Fine brushes, metal picks",
                    materials: "Colored glass powder (enamel)",
                    timeRequired: "Days",
                    illustration: "assets/process/filling.jpg"
                },
                {
                    step: 4,
                    title: "Firing",
                    description: "The piece is fired in a kiln. Different colors melt at different temperatures, requiring multiple, carefully sequenced firings from hardest to softest colors.",
                    tools: "Kiln, tongs",
                    materials: "Heat",
                    timeRequired: "Hours per firing",
                    illustration: "assets/process/firing.jpg"
                },
                {
                    step: 5,
                    title: "Filing and Polishing",
                    description: "The piece is gently filed to level the enamel with the metal walls, then polished with tamarind and wire brushes.",
                    tools: "Files, tamarind, wire brushes",
                    materials: "Tamarind water",
                    timeRequired: "1 day",
                    illustration: "assets/process/polishing.jpg"
                }
            ]
        },
        {
            id: "temple",
            name: "Temple Jewelry",
            region: "Tamil Nadu, Kerala",
            materials: "Gold, silver, precious and semi-precious stones",
            gemstones: "Rubies, emeralds, pearls, diamonds",
            technique: "Intricate metal carving, repoussé, casting, and gem setting featuring religious motifs.",
            significance: "Originally crafted to adorn deities in South Indian temples, now widely worn by classical dancers and brides.",
            image: "assets/temple-jewelry.jpg",
            process: [
                {
                    step: 1,
                    title: "Design & Wax Modeling",
                    description: "Intricate designs featuring gods, goddesses, lotuses, or peacocks are sculpted into a wax model.",
                    tools: "Wax carving tools, styluses",
                    materials: "Beeswax, resin",
                    timeRequired: "Days",
                    illustration: "assets/process/wax.jpg"
                },
                {
                    step: 2,
                    title: "Metal Casting (Lost Wax)",
                    description: "The wax model is encased in clay and heated so the wax melts away. Molten gold or silver is poured into the resulting cavity.",
                    tools: "Crucibles, kilns, clay molds",
                    materials: "Gold/Silver, Clay",
                    timeRequired: "1 day",
                    illustration: "assets/process/casting.jpg"
                },
                {
                    step: 3,
                    title: "Carving & Detailing",
                    description: "Once cast, the raw metal piece is refined. Artisans use chisels to sharpen features of the deities and motifs.",
                    tools: "Chisels, hammers",
                    materials: "None",
                    timeRequired: "Days",
                    illustration: "assets/process/carving.jpg"
                },
                {
                    step: 4,
                    title: "Gem Setting",
                    description: "Stones (often rubies and emeralds) are set into the piece using bezel or prong settings. Pearls are often strung along the edges.",
                    tools: "Tweezers, pushers, silk thread",
                    materials: "Rubies, emeralds, pearls",
                    timeRequired: "Days",
                    illustration: "assets/process/gemsetting.jpg"
                },
                {
                    step: 5,
                    title: "Gold Finishing",
                    description: "The jewelry is given a traditional matte or antique finish, typical of temple jewelry, rather than a high gloss.",
                    tools: "Polishing brushes, chemical solutions",
                    materials: "Polishing compounds",
                    timeRequired: "Hours",
                    illustration: "assets/process/finishing.jpg"
                }
            ]
        }
    ],

    gemstones: [
        { name: "Ruby", color: "Deep Red", symbolism: "Passion, vitality, power", use: "Central stones in Kundan and Temple jewelry." },
        { name: "Emerald", color: "Rich Green", symbolism: "Fertility, rebirth, prosperity", use: "Contrast stones in Kundan, beads in necklaces." },
        { name: "Sapphire", color: "Deep Blue / Yellow", symbolism: "Wisdom, divine favor", use: "Navaratna (nine-gem) settings." },
        { name: "Pearl", color: "Iridescent White", symbolism: "Purity, peace, lunar energy", use: "Fringes on necklaces, earrings (Jhumkas), and bridal wear." },
        { name: "Diamond (Polki)", color: "Clear (Uncut)", symbolism: "Invincibility, clarity", use: "Uncut diamonds (Polki) are the hallmark of authentic Kundan jewelry." },
        { name: "Coral", color: "Orange-Red", symbolism: "Courage, protection", use: "Traditional South Indian and tribal jewelry." }
    ],

    tools: [
        { name: "Salai", desc: "A smooth steel burnisher used in Kundan to press gold foil around gems." },
        { name: "Chimti", desc: "Fine tweezers used for placing microscopic gems and gold wires." },
        { name: "Thappa", desc: "Die-stamps used to punch out repeated gold shapes." },
        { name: "Chisels", desc: "Used in Nakashi (engraving) to carve depressions for enamel." },
        { name: "Enamel Brushes", desc: "Ultra-fine brushes used to paint crushed glass powder in Meenakari." },
        { name: "Blowpipe", desc: "Used traditionally to direct a small, precise flame for localized soldering." }
    ]
};
