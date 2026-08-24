/* ==========================================================================
   Kittur Rani Chennamma Data
   Comprehensive biographical and historical data
   ========================================================================== */

const kitturFeatures = [
    { icon: '🏛️', title: 'Princely State', desc: 'Kittur was a small princely state in the Deccan region, ruled by the Desai family as Maratha feudatories.' },
    { icon: '🗺️', title: 'Strategic Location', desc: 'Located in present-day Belagavi district, Karnataka, at a strategic crossroads between Maratha and British territories.' },
    { icon: '👑', title: 'Desai Dynasty', desc: 'Ruled by the Desai family who had considerable autonomy while acknowledging Maratha suzerainty.' },
    { icon: '🏰', title: 'Fortified Capital', desc: 'Centered around the formidable Kittur Fort which served as the seat of royal power.' },
    { icon: '🌾', title: 'Agricultural Base', desc: 'Economy based on agriculture with fertile lands supporting the kingdom\'s population.' },
    { icon: '🛡️', title: 'Military Tradition', desc: 'Strong martial traditions with a standing army trained in traditional warfare.' }
];

const kitturPolitical = [
    { icon: '⚔️', title: 'Maratha Feudatory', desc: 'Owed allegiance to the Maratha Empire while maintaining internal autonomy.' },
    { icon: '🤝', title: 'British Relations', desc: 'Initially had cordial relations with East India Company which later turned hostile.' },
    { icon: '📜', title: 'Treaty Obligations', desc: 'Bound by various treaties that the British later used as pretexts for intervention.' },
    { icon: '👥', title: 'Regional Alliances', desc: 'Maintained alliances with neighboring states for mutual security.' },
    { icon: '⚖️', title: 'Internal Administration', desc: 'Had well-organized internal administration with traditional justice systems.' },
    { icon: '💰', title: 'Treasury Wealth', desc: 'Possessed considerable treasury wealth that attracted British covetousness.' }
];

const earlyLifeFeatures = [
    { icon: '👶', title: 'Birth in Kakati', desc: 'Born on October 23, 1778, in Kakati village near Belagavi to a prominent family.' },
    { icon: '🐎', title: 'Martial Training', desc: 'Received training in horse riding, sword fighting, and archery from an early age.' },
    { icon: '📚', title: 'Statecraft Education', desc: 'Educated in matters of statecraft, administration, and military strategy.' },
    { icon: '🎯', title: 'Archery Skills', desc: 'Developed exceptional archery skills that would serve her well in battle.' },
    { icon: '⚔️', title: 'Sword Fighting', desc: 'Trained in traditional Indian sword fighting techniques and warfare.' },
    { icon: '👑', title: 'Royal Upbringing', desc: 'Raised with awareness of royal responsibilities and leadership duties.' }
];

const earlyInfluences = [
    { icon: '👨‍👩‍👧', title: 'Family Heritage', desc: 'Family\'s martial traditions shaped her warrior spirit from childhood.' },
    { icon: '🌿', title: 'Regional Culture', desc: 'The martial culture of the Deccan region influenced her development.' },
    { icon: '📖', title: 'Historical Tales', desc: 'Stories of legendary warriors and queens inspired her own aspirations.' },
    { icon: '🛡️', title: 'Mentorship', desc: 'Mentored by experienced warriors and military commanders.' },
    { icon: '🎭', title: 'Cultural Traditions', desc: 'Folk traditions celebrating warrior women shaped her identity.' },
    { icon: '⚖️', title: 'Justice Sensibility', desc: 'Early exposure to injustice sparked her commitment to defending her people.' }
];

const successionFeatures = [
    { icon: '💀', title: 'Raja Mallasarja\'s Death', desc: 'Her husband Raja Mallasarja died in 1816, leaving her as the regent of Kittur.' },
    { icon: '👑', title: 'Regency Period', desc: 'Ruled as regent for her son Shivalingappa who was the heir apparent.' },
    { icon: '💔', title: 'Son\'s Death', desc: 'Tragedy struck when her son Shivalingappa died in 1824, leaving no heir.' },
    { icon: '👶', title: 'Adoption of Heir', desc: 'Adopted a boy named Shivalingappa and declared him the new heir to Kittur.' },
    { icon: '📜', title: 'Succession Declaration', desc: 'Formally declared the adopted son as heir, challenging British claims.' },
    { icon: '🛡️', title: 'Defensive Preparations', desc: 'Began fortifying Kittur in anticipation of British aggression.' }
];

const successionEvents = [
    { icon: '1816', title: 'Husband\'s Death', desc: 'Raja Mallasarja dies, leaving Chennamma as regent.' },
    { icon: '1824', title: 'Son\'s Death', desc: 'Her son and heir Shivalingappa dies, creating succession crisis.' },
    { icon: '1824', title: 'Adoption', desc: 'Adopts a boy named Shivalingappa as new heir to Kittur throne.' },
    { icon: '1824', title: 'British Objection', desc: 'East India Company refuses to recognize the adoption under Doctrine of Lapse.' },
    { icon: '1824', title: 'British Demands', desc: 'British demand surrender of Kittur treasury and submission to their authority.' },
    { icon: '1824', title: 'Defiance', desc: 'Chennamma refuses to submit, preparing for armed resistance.' }
];

const eicFeatures = [
    { icon: '🏛️', title: 'Doctrine of Lapse', desc: 'British invoked the Doctrine of Lapse to claim Kittur had "lapsed" due to lack of male heir.' },
    { icon: '👤', title: 'St. John Thackeray', desc: 'Collector and Political Agent of Dharwad who led the British assault on Kittur.' },
    { icon: '💰', title: 'Treasury Demands', desc: 'British demanded surrender of Kittur\'s substantial treasury wealth.' },
    { icon: '⚖️', title: 'Legal Pretexts', desc: 'Used various legal pretexts to justify annexation of the small kingdom.' },
    { icon: '⚔️', title: 'Military Force', desc: 'Assembled a force of British and Indian troops to march on Kittur.' },
    { icon: '📢', title: 'Ultimatums', desc: 'Issued ultimatums demanding surrender before launching military assault.' }
];

const eicDemands = [
    { icon: '👑', title: 'Submit to British Authority', desc: 'Demanded that Kittur formally submit to East India Company authority.' },
    { icon: '💰', title: 'Surrender Treasury', desc: 'Demanded surrender of Kittur\'s treasury to British control.' },
    { icon: '🚫', title: 'Reject Adoption', desc: 'Refused to recognize Chennamma\'s adoption of an heir.' },
    { icon: '🏰', title: 'Surrender Fort', desc: 'Demanded surrender of Kittur Fort and all military installations.' },
    { icon: '⚔️', title: 'Disarm Forces', desc: 'Demanded disarmament of Kittur\'s military forces.' },
    { icon: '📋', title: 'Accept Annexation', desc: 'Demanded acceptance of British annexation of the kingdom.' }
];

const resistanceFeatures = [
    { icon: '⚔️', title: 'Armed Resistance', desc: 'Chennamma organized armed resistance with her loyal commanders including Sangolli Rayanna.' },
    { icon: '🛡️', title: 'Fort Defense', desc: 'Strengthened Kittur Fort defenses and prepared for siege warfare.' },
    { icon: '👥', title: 'Loyal Forces', desc: 'Commanded loyal troops including many who had served her family for generations.' },
    { icon: '🎯', title: 'Strategic Planning', desc: 'Developed strategic plans for defending against superior British forces.' },
    { icon: '🗡️', title: 'Personal Leadership', desc: 'Personally led troops in battle, inspiring them with her courage.' },
    { icon: '🤝', title: 'Regional Support', desc: 'Received support from neighboring rulers sympathetic to her cause.' }
];

const resistanceBattles = [
    { icon: '⚔️', title: 'First Battle (Oct 1824)', desc: 'Chennamma\'s forces defeated St. John Thackeray\'s army in the first battle. Thackeray was killed in action, a major victory for Kittur.' },
    { icon: '💀', title: 'Thackeray\'s Death', desc: 'St. John Thackeray, the British commander, was killed in the first battle, a significant British defeat.' },
    { icon: '🔁', title: 'British Reinforcements', desc: 'British brought much larger forces for the second assault on Kittur.' },
    { icon: '🏰', title: 'Second Battle (Dec 1824)', desc: 'Despite valiant resistance, Kittur fell to overwhelming British forces in the second battle.' },
    { icon: '💔', title: 'Treachery', desc: 'British used treachery, including bribing some defenders, to overcome Kittur\'s defenses.' },
    { icon: '⛓️', title: 'Capture', desc: 'Chennamma was captured after the fall of Kittur Fort in December 1824.' }
];

const fortFeatures = [
    { icon: '🏰', title: 'Medieval Fort', desc: 'Kittur Fort was built in medieval times with massive walls and defensive features.' },
    { icon: '🧱', title: 'Stone Construction', desc: 'Built with massive stone blocks and traditional defensive architecture.' },
    { icon: '🔫', title: 'Cannon Emplacements', desc: 'Equipped with cannon emplacements and defensive artillery positions.' },
    { icon: '🚪', title: 'Fortified Gates', desc: 'Had massive fortified gates that could withstand prolonged sieges.' },
    { icon: '🏛️', title: 'Palace Complex', desc: 'Contained a palace complex within the fort walls for royal residence.' },
    { icon: '💧', title: 'Water Systems', desc: 'Had sophisticated water storage systems to sustain sieges.' }
];

const fortArchitecture = [
    { icon: '🧱', title: 'Massive Walls', desc: 'Fort walls were massive, several meters thick, built to withstand cannon fire.' },
    { icon: '🗼', title: 'Bastions', desc: 'Equipped with bastions at strategic points for defensive fire.' },
    { icon: '🏰', title: 'Moat System', desc: 'Had defensive moats around portions of the fort for added protection.' },
    { icon: '🚪', title: 'Gate Defenses', desc: 'Gates had multiple defensive features including portcullises and murder holes.' },
    { icon: '🏛️', title: 'Internal Layout', desc: 'Complex internal layout designed to confuse attackers who breached outer defenses.' },
    { icon: '💧', title: 'Water Storage', desc: 'Large water tanks and wells within fort for prolonged sieges.' }
];

const captureFeatures = [
    { icon: '⛓️', title: 'Capture in Battle', desc: 'Captured after the fall of Kittur Fort in December 1824 by overwhelming British forces.' },
    { icon: '🏛️', title: 'Dharwad Prison', desc: 'Imprisoned at Dharwad prison where she spent her final years.' },
    { icon: '💔', title: 'Harsh Treatment', desc: 'Subjected to harsh treatment in prison despite her royal status.' },
    { icon: '🙏', title: 'Spiritual Strength', desc: 'Maintained her spiritual strength and dignity throughout imprisonment.' },
    { icon: '📅', title: 'Years in Prison', desc: 'Spent nearly 5 years in prison from 1824 until her death in 1829.' },
    { icon: '💀', title: 'Death in Prison', desc: 'Died in Dharwad prison on February 2, 1829, at the age of 50.' }
];

const captureImprisonment = [
    { icon: '⛓️', title: 'Initial Imprisonment', desc: 'Initially held in Kittur before being transferred to Dharwad prison.' },
    { icon: '🏛️', title: 'Dharwad Prison', desc: 'Spent most of her imprisonment at the prison in Dharwad.' },
    { icon: '💔', title: 'Family Separation', desc: 'Separated from her family and supporters throughout imprisonment.' },
    { icon: '🙏', title: 'Maintained Dignity', desc: 'Maintained her royal dignity and spiritual strength throughout.' },
    { icon: '📅', title: 'Years 1824-1829', desc: 'Spent nearly 5 years in prison from capture to death.' },
    { icon: '💀', title: 'Death February 1829', desc: 'Died in prison on February 2, 1829, at age 50.' }
];

const legacyFeatures = [
    { icon: '⚔️', title: 'Pioneer of Resistance', desc: 'Recognized as one of the first Indian rulers to lead armed resistance against British colonial rule.' },
    { icon: '👩', title: 'Women\'s Icon', desc: 'Became an enduring icon of women\'s courage and leadership in Karnataka and India.' },
    { icon: '🎭', title: 'Folk Traditions', desc: 'Her story has been kept alive through folk songs, ballads, and theatrical performances.' },
    { icon: '📚', title: 'Literary Legacy', desc: 'Inspired numerous literary works including novels, plays, and poems.' },
    { icon: '🏛️', title: 'Official Recognition', desc: 'Officially recognized by Karnataka government as a freedom fighter and state icon.' },
    { icon: '🗿', title: 'Monuments', desc: 'Commemorated through statues, memorials, and institutions across Karnataka.' }
];

const legacyImpact = [
    { icon: '⚔️', title: 'Resistance Tradition', desc: 'Inspired generations of freedom fighters with her example of armed resistance.' },
    { icon: '👩', title: 'Women\'s Empowerment', desc: 'Continues to inspire women in Karnataka and beyond with her example of leadership.' },
    { icon: '🎭', title: 'Cultural Memory', desc: 'Her story remains vibrant in Karnataka\'s cultural memory through various art forms.' },
    { icon: '🏫', title: 'Educational Legacy', desc: 'Taught in schools across Karnataka as an example of courage and patriotism.' },
    { icon: '🗓️', title: 'Annual Commemorations', desc: 'Annual commemorations held in Kittur and across Karnataka.' },
    { icon: '🏛️', title: 'Institutional Names', desc: 'Many institutions and landmarks named after her across Karnataka.' }
];

const timeline = [
    { year: '1778', title: 'Birth', desc: 'Born on October 23 in Kakati village near Belagavi, Karnataka.' },
    { year: '1790s', title: 'Marriage', desc: 'Marries Raja Mallasarja, the ruler of Kittur, becoming queen.' },
    { year: '1816', title: 'Husband\'s Death', desc: 'Raja Mallasarja dies, leaving Chennamma as regent for their son.' },
    { year: '1824', title: 'Son\'s Death', desc: 'Her son Shivalingappa dies, creating succession crisis in Kittur.' },
    { year: '1824', title: 'Adoption of Heir', desc: 'Adopts boy named Shivalingappa as heir, defying British Doctrine of Lapse.' },
    { year: 'Oct 1824', title: 'First Battle Victory', desc: 'Defeats British forces led by St. John Thackeray, who is killed in battle.' },
    { year: 'Dec 1824', title: 'Second Battle', desc: 'British return with overwhelming forces, Kittur Fort falls after fierce resistance.' },
    { year: '1824', title: 'Capture', desc: 'Captured by British after fall of Kittur Fort and imprisoned.' },
    { year: '1824-29', title: 'Imprisonment', desc: 'Spends nearly 5 years imprisoned in Dharwad prison.' },
    { year: 'Feb 1829', title: 'Death', desc: 'Dies in Dharwad prison on February 2, 1829, at age 50.' },
    { year: '1829+', title: 'Legend Grows', desc: 'Her legend grows through folk traditions, becoming Karnataka icon.' }
];

const galleryData = [
    { src: 'https://placehold.co/400x400/8B2500/fff?text=Rani+Chennamma', alt: 'Kittur Rani Chennamma portrait', caption: 'Traditional portrait of Kittur Rani Chennamma' },
    { src: 'https://placehold.co/400x400/DAA520/1C1410?text=Kittur+Fort', alt: 'Kittur Fort ruins', caption: 'Ruins of the historic Kittur Fort' },
    { src: 'https://placehold.co/400x400/8B7355/fff?text=Battle+Scene', alt: 'Battle of Kittur', caption: 'Artistic depiction of the Battle of Kittur' },
    { src: 'https://placehold.co/400x400/8B2500/fff?text=Warrior+Queen', alt: 'Chennamma as warrior', caption: 'Rani Chennamma depicted as warrior queen' },
    { src: 'https://placehold.co/400x400/DAA520/1C1410?text=Fort+Walls', alt: 'Fort walls', caption: 'Massive walls of Kittur Fort' },
    { src: 'https://placehold.co/400x400/8B7355/fff?text=Sangolli+Rayanna', alt: 'Sangolli Rayanna', caption: 'Sangolli Rayanna, loyal commander of Chennamma' },
    { src: 'https://placehold.co/400x400/8B2500/fff?text=Memorial', alt: 'Chennamma memorial', caption: 'Memorial statue of Rani Chennamma in Kittur' },
    { src: 'https://placehold.co/400x400/DAA520/1C1410?text=Palace+Ruins', alt: 'Palace ruins', caption: 'Ruins of the palace within Kittur Fort' },
    { src: 'https://placehold.co/400x400/8B7355/fff?text=Artifacts', alt: 'Historical artifacts', caption: 'Artifacts from the Kittur period' },
    { src: 'https://placehold.co/400x400/8B2500/fff?text=Statue+Belagavi', alt: 'Statue in Belagavi', caption: 'Statue of Rani Chennamma in Belagavi' },
    { src: 'https://placehold.co/400x400/DAA520/1C1410?text=Kakati+Village', alt: 'Kakati village', caption: 'Kakati village, birthplace of Rani Chennamma' },
    { src: 'https://placehold.co/400x400/8B7355/fff?text=Dharwad+Prison', alt: 'Dharwad prison', caption: 'Site of Dharwad prison where Chennamma was held' }
];
