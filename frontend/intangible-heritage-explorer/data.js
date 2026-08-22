/* ==========================================================================
   UNESCO INTANGIBLE CULTURAL HERITAGE OF INDIA — DATASET

   These are living traditions held by specific communities. Each entry names
   the community that holds the practice. Nothing here is described in the
   past tense unless the practice genuinely has ceased, and inscription is
   presented as recognition — it confers no ownership, no exclusivity and no
   legal protection.
   ========================================================================== */

const ICH_DOMAINS = [
  {
    key: 'oral',
    name: 'Oral Traditions & Expressions',
    icon: '🗣️',
    blurb: 'Including language as a vehicle of intangible heritage — recitation, epic, proverb, chant.',
  },
  {
    key: 'performing',
    name: 'Performing Arts',
    icon: '🎭',
    blurb: 'Music, dance, theatre and the forms that combine them.',
  },
  {
    key: 'social',
    name: 'Social Practices, Rituals & Festive Events',
    icon: '🎉',
    blurb: 'The practices that structure community life and mark the calendar.',
  },
  {
    key: 'nature',
    name: 'Knowledge & Practices Concerning Nature',
    icon: '🌿',
    blurb: 'Knowledge of the natural world and the universe, and the practices built on it.',
  },
  {
    key: 'craft',
    name: 'Traditional Craftsmanship',
    icon: '🔨',
    blurb: 'The skill itself, not the object — the Convention safeguards the knowing-how.',
  },
];

const ICH_REGIONS = [
  { key: 'south', name: 'South India', icon: '🌴' },
  { key: 'north', name: 'North India', icon: '🏔️' },
  { key: 'east', name: 'East India', icon: '🌾' },
  { key: 'west', name: 'West India', icon: '🏜️' },
  { key: 'northeast', name: 'Northeast India', icon: '🍃' },
  { key: 'pan', name: 'Pan-Indian / Multiple States', icon: '🇮🇳' },
];

/* --------------------------------------------------- the 15 inscriptions */
const ICH_ELEMENTS = [
  {
    name: 'Kutiyattam, Sanskrit Theatre',
    icon: '🎭',
    year: 2008,
    proclaimed: 2001,
    domain: 'performing',
    region: 'south',
    state: 'Kerala',
    community: 'Chakyar and Nambiar families, and the Ammannur and Kalamandalam lineages',
    tagline: 'One of the first elements UNESCO ever recognised',
    desc: 'Kutiyattam is a Sanskrit theatre form of Kerala, generally held to be around two thousand years old and among the oldest continuously performed theatre traditions anywhere. A single act can take days to perform, because the actor elaborates each moment through netrabhinaya — expression carried almost entirely by the eyes — at a pace no other theatre attempts. It was proclaimed a Masterpiece of the Oral and Intangible Heritage of Humanity in 2001 and formally inscribed in 2008.',
    status: 'Practised by a small number of families and institutions. Transmission depends heavily on a handful of teachers, and the number of trained performers is low.',
    detail: 'Historically performed only in koothambalams, the theatre halls attached to Kerala temples, and only by hereditary performer communities. Ammannur Madhava Chakyar was central to bringing it to wider audiences in the twentieth century.',
  },
  {
    name: 'Tradition of Vedic Chanting',
    icon: '📿',
    year: 2008,
    proclaimed: 2003,
    domain: 'oral',
    region: 'pan',
    state: 'Multiple states',
    community: 'Brahmin reciter lineages across several regional schools (shakhas)',
    tagline: 'A text transmitted orally with astonishing fidelity for three thousand years',
    desc: 'The Vedas have been transmitted by voice for roughly three thousand years, and the remarkable part is the accuracy. Recitation methods such as jata-patha and ghana-patha reorder the words in fixed permuted patterns, so that any error in one recitation is detectable against the others. It is, in effect, an oral error-correcting code, developed long before anyone had the vocabulary for that idea.',
    status: 'Continues in traditional schools, though the number of reciters trained in the more elaborate patha methods has fallen sharply.',
    detail: 'Different shakhas preserve different regional recitation traditions. What is safeguarded is the manner of recitation — pitch, permutation, pronunciation — rather than the text itself, which exists in written form as well.',
  },
  {
    name: 'Ramlila, the Traditional Performance of the Ramayana',
    icon: '🏹',
    year: 2008,
    proclaimed: 2005,
    domain: 'performing',
    region: 'north',
    state: 'Uttar Pradesh and across north India',
    community: 'Local Ramlila committees and whole towns, particularly Ramnagar in Varanasi',
    tagline: 'A month-long performance staged across an entire town',
    desc: 'Ramlila stages the Ramayana over days or weeks, most famously at Ramnagar near Varanasi where the performance runs for about a month and the town itself becomes the set — different neighbourhoods stand in for Ayodhya, Lanka and the forest, and the audience walks between them. It is not theatre with an audience so much as a participatory ritual that happens to have actors.',
    status: 'Widely and vigorously practised across north India, though some traditional forms compete with commercial and televised versions.',
    detail: 'Performers are frequently amateurs from the local community rather than professionals, and roles are often held for years or passed within families.',
  },
  {
    name: 'Ramman: Religious Festival and Ritual Theatre of Garhwal',
    icon: '🎭',
    year: 2009,
    proclaimed: null,
    domain: 'social',
    region: 'north',
    state: 'Uttarakhand',
    community: 'The villages of Saloor-Dungra in Chamoli district',
    tagline: 'Performed in two villages, and nowhere else',
    desc: 'Ramman is an annual festival of the twin villages of Saloor-Dungra in the Painkhanda valley, combining masked dance, ritual, recitation and historical narrative in honour of the local deity Bhumiyal Devta. Its scope is unusually narrow — this is not a regional form but the practice of a specific pair of villages, with roles assigned by caste and family.',
    status: 'Highly vulnerable. Out-migration from the villages directly threatens transmission, since specific families hold specific roles.',
    detail: 'The masks are made by a designated family, drums are played by another, and the Bhumiyal Devta mask is hosted in a different household each year. Remove one family and part of the festival cannot be performed.',
  },
  {
    name: 'Chhau Dance',
    icon: '⚔️',
    year: 2010,
    proclaimed: null,
    domain: 'performing',
    region: 'east',
    state: 'Odisha, West Bengal, Jharkhand',
    community: 'Communities of Seraikela, Purulia and Mayurbhanj',
    tagline: 'Three regional styles, and only two of them use masks',
    desc: 'Chhau is a martial-derived dance-theatre with three distinct regional styles: Seraikela in Jharkhand and Purulia in West Bengal use masks, while Mayurbhanj in Odisha does not. It draws on the Mahabharata, the Ramayana and local folklore, and its vocabulary comes visibly out of martial training — the stance and footwork are those of a fighter.',
    status: 'Actively performed, with state academies supporting training. Mask-making in Purulia and Seraikela is a related craft under its own pressure.',
    detail: 'Traditionally performed during the spring Chaitra Parva festival, over several nights, in the open and by torchlight.',
  },
  {
    name: 'Kalbelia Folk Songs and Dances of Rajasthan',
    icon: '🐍',
    year: 2010,
    proclaimed: null,
    domain: 'performing',
    region: 'west',
    state: 'Rajasthan',
    community: 'The Kalbelia community',
    tagline: 'A tradition that survived the loss of its livelihood',
    desc: 'The Kalbelia were traditionally snake handlers, and their songs and dances carry that history in their movement vocabulary. When the Wildlife Protection Act, 1972 ended snake charming as a livelihood, the community faced the loss of its economic base — and the performing tradition became both a cultural continuity and a source of income. The songs are largely improvised and composed spontaneously in performance.',
    status: 'Actively performed and internationally visible. Economic precarity within the community remains the underlying issue.',
    detail: 'The women\'s black skirts with mirror-work and silver thread are a recognisable feature, and the movement is often described as serpentine — a direct reference to the community\'s earlier occupation.',
  },
  {
    name: 'Mudiyettu, Ritual Theatre and Dance Drama of Kerala',
    icon: '🔥',
    year: 2010,
    proclaimed: null,
    domain: 'social',
    region: 'south',
    state: 'Kerala',
    community: 'Village communities of the Chalakkudy, Periyar and Moovattupuzha river basins',
    tagline: 'A ritual the whole village prepares, not a performance it watches',
    desc: 'Mudiyettu enacts the battle between the goddess Kali and the demon Darika, performed in temples after the harvest. Its distinctive feature is the kalam — a large drawing of the goddess made on the temple floor in coloured powders, which is created, worshipped and then deliberately erased. The whole village participates in preparation; the performance is a collective act rather than a staged one.',
    status: 'Performed in a limited number of temples. The number of families holding the specialised roles has declined.',
    detail: 'Roles are hereditary and specific — particular families hold the right and duty to perform particular characters.',
  },
  {
    name: 'Buddhist Chanting of Ladakh',
    icon: '🏔️',
    year: 2012,
    proclaimed: null,
    domain: 'oral',
    region: 'north',
    state: 'Ladakh',
    community: 'Monastic communities of the Nyingma, Kagyu, Gelug and Sakya orders',
    tagline: 'Recitation of the sacred texts of Mahayana and Vajrayana Buddhism',
    desc: 'Monks in the monasteries of the Ladakh Himalaya chant Buddhist texts as part of daily practice and at major ceremonies, in styles that vary between the four orders. The chanting is accompanied by hand gestures, cymbals, drums and horns, and is understood as a practice in itself rather than as accompaniment to one.',
    status: 'Continues in monasteries across Ladakh, but fewer young people are entering monastic life and some chanting styles have very few remaining transmitters.',
    detail: 'Two forms are distinguished: the daily recitation and the elaborate ceremonial chanting performed on specific dates in the monastic calendar.',
  },
  {
    name: 'Sankirtana: Ritual Singing, Drumming and Dancing of Manipur',
    icon: '🥁',
    year: 2013,
    proclaimed: null,
    domain: 'performing',
    region: 'northeast',
    state: 'Manipur',
    community: 'Vaishnava communities of the Manipuri plains',
    tagline: 'Performed in the middle of the hall, with the audience all around',
    desc: 'Sankirtana is performed in the mandap of a Vaishnava temple, with the singers and drummers in the centre and the congregation seated around them on all sides. The pung drum and the cymbals drive it. It marks the whole cycle of life events — birth, initiation, marriage, death — so it is embedded in the community\'s calendar rather than staged as a separate occasion.',
    status: 'Actively practised, and central to Manipuri Vaishnava community life.',
    detail: 'The pung cholom, a drum dance performed within the sankirtana tradition, is one of its most recognisable elements.',
  },
  {
    name: 'Traditional Brass and Copper Craft of Utensil Making, Thatheras of Jandiala Guru',
    icon: '🔨',
    year: 2014,
    proclaimed: null,
    domain: 'craft',
    region: 'north',
    state: 'Punjab',
    community: 'The Thathera community of Jandiala Guru, Amritsar district',
    tagline: 'A single town\'s craft, inscribed on its own',
    desc: 'The Thatheras of Jandiala Guru make brass and copper utensils entirely by hand, heating cakes of metal and beating them into shape with repeated hammering and annealing. What UNESCO inscribed is the skill and its transmission, not the objects — the Convention protects the knowing-how, which is precisely what disappears when a craft stops being taught.',
    status: 'Vulnerable. Competition from steel and aluminium has shrunk the market, and the number of working families has fallen substantially.',
    detail: 'The Punjab government and community organisations have run revival programmes since the inscription, including training and market linkage for younger craftspeople.',
  },
  {
    name: 'Nowruz',
    icon: '🌱',
    year: 2016,
    proclaimed: null,
    domain: 'social',
    region: 'pan',
    state: 'Multiple states (multinational inscription)',
    community: 'Parsi and Irani Zoroastrian communities in India, among many others internationally',
    tagline: 'A multinational inscription shared by twelve countries',
    desc: 'Nowruz marks the spring equinox and the start of the new year in the Persian calendar, and is celebrated across a wide region from the Balkans to South Asia. India is one of twelve states party to the inscription, through its Parsi and Irani communities — a reminder that ICH elements are not necessarily bounded by national borders, and that the Convention accommodates that.',
    status: 'Practised, though India\'s Parsi population is small and declining.',
    detail: 'The multinational format is deliberate: it lets states jointly nominate a practice that no one of them can claim exclusively.',
  },
  {
    name: 'Yoga',
    icon: '🧘',
    year: 2016,
    proclaimed: null,
    domain: 'nature',
    region: 'pan',
    state: 'Pan-Indian',
    community: 'Practitioner lineages, ashrams, gurus and institutions across India',
    tagline: 'Inscribed under knowledge concerning nature and the universe, not performing arts',
    desc: 'Yoga was inscribed in 2016 under the domain of knowledge and practices concerning nature and the universe — a categorisation worth noticing, because it reflects yoga as a system of thought about the self and the body rather than as physical exercise. The nomination covered the philosophical framework, breath and posture practice, meditation, ethical observances and the guru-shishya transmission that carries all of it.',
    status: 'Practised worldwide on an enormous scale. Commercialisation and the detachment of posture practice from its philosophical frame are the concerns most often raised.',
    detail: 'Of India\'s inscriptions this is by far the most globally visible, and the one where the gap between the inscribed element and its popular form is widest.',
  },
  {
    name: 'Kumbh Mela',
    icon: '🕉️',
    year: 2017,
    proclaimed: null,
    domain: 'social',
    region: 'north',
    state: 'Uttar Pradesh, Uttarakhand, Madhya Pradesh, Maharashtra',
    community: 'Akharas, ascetic orders, and pilgrims from across India',
    tagline: 'The largest peaceful gathering of people anywhere on earth',
    desc: 'The Kumbh Mela rotates between Prayagraj, Haridwar, Ujjain and Nashik on an astronomical cycle, and draws tens of millions of pilgrims — routinely described as the largest peaceful congregation of human beings anywhere. The akharas, the ascetic orders, process in a fixed order of precedence that is itself part of the tradition. UNESCO noted its inclusiveness: participation is not restricted by caste, creed or gender.',
    status: 'Practised at very large and growing scale. The management challenge — sanitation, crowd safety, river health — grows with it.',
    detail: 'The timing is set by the positions of Jupiter, the Sun and the Moon, which is why the cycle and the location shift together.',
  },
  {
    name: 'Durga Puja in Kolkata',
    icon: '🪔',
    year: 2021,
    proclaimed: null,
    domain: 'social',
    region: 'east',
    state: 'West Bengal',
    community: 'Neighbourhood puja committees, Kumartuli idol-makers, artists and designers of Kolkata',
    tagline: 'Inscribed for the city, not the festival in general',
    desc: 'The inscription is specifically for Durga Puja as practised in Kolkata, where the festival functions as a citywide public art event as much as a religious one. Neighbourhood committees commission elaborate temporary pandals from named artists and designers, the idols are made in the Kumartuli potters\' quarter, and the whole thing is dismantled and immersed at the end. UNESCO cited its collapsing of class, religious and ethnic boundaries in public space.',
    status: 'Enormously vigorous, with a substantial associated economy in art, design, lighting and craft.',
    detail: 'Kumartuli, the idol-makers\' quarter, is a working neighbourhood whose craft is inseparable from the festival — the inscription covers the whole ecosystem, not the ritual alone.',
  },
  {
    name: 'Garba of Gujarat',
    icon: '💃',
    year: 2023,
    proclaimed: null,
    domain: 'social',
    region: 'west',
    state: 'Gujarat',
    community: 'Communities across Gujarat and the Gujarati diaspora',
    tagline: 'India\'s most recent inscription',
    desc: 'Garba is a devotional circle dance performed during Navratri around a centrally placed earthen lamp or an image of the goddess. UNESCO\'s citation emphasised its inclusiveness — it is danced across caste, class, gender and, in many places, religious lines, and participation requires no training. It was inscribed in December 2023, the fifteenth Indian element on the Representative List.',
    status: 'Practised on a very large scale in Gujarat and throughout the Gujarati diaspora.',
    detail: 'The word derives from garbha, meaning womb — a reference to the lamp at the centre of the circle, around which the dance turns.',
  },
];

/* --------------------------------------------------------- two conventions */
const ICH_COMPARISON = [
  {
    aspect: 'Convention',
    tangible: 'World Heritage Convention, 1972',
    intangible: 'Convention for the Safeguarding of the Intangible Cultural Heritage, 2003',
  },
  {
    aspect: 'What it covers',
    tangible: 'Places — monuments, sites, natural properties',
    intangible: 'Practices — performance, ritual, knowledge, craftsmanship',
  },
  {
    aspect: 'The list',
    tangible: 'World Heritage List',
    intangible: 'Representative List, plus the Urgent Safeguarding List',
  },
  {
    aspect: 'India\'s entries',
    tangible: '40+ World Heritage Sites',
    intangible: '15 elements on the Representative List',
  },
  {
    aspect: 'Criterion',
    tangible: 'Outstanding Universal Value',
    intangible: 'Representative of the community\'s heritage; no comparative ranking',
  },
  {
    aspect: 'Who holds it',
    tangible: 'The State Party, which owns and manages the property',
    intangible: 'The community that practises it. The state nominates but does not own',
  },
  {
    aspect: 'What is protected',
    tangible: 'Physical fabric and setting, with conservation obligations',
    intangible: 'Transmission — the passing on of the practice to the next generation',
  },
  {
    aspect: 'Danger listing',
    tangible: 'List of World Heritage in Danger',
    intangible: 'List of Intangible Cultural Heritage in Need of Urgent Safeguarding',
  },
];

/* ------------------------------------------------------------- nomination */
const ICH_PROCESS = [
  { step: '1', icon: '👥', title: 'Community consent', desc: 'A nomination requires the free, prior and informed consent of the community that practises the element. This is not a formality — a nomination made over a community\'s head does not meet the Convention\'s requirements.' },
  { step: '2', icon: '📋', title: 'National inventory', desc: 'The element must already appear in the State Party\'s own inventory of intangible heritage. India\'s National ICH Inventory is maintained by the Sangeet Natak Akademi, the nodal agency.' },
  { step: '3', icon: '📝', title: 'Nomination file', desc: 'The file documents what the element is, who practises it, how it is transmitted, its current viability, and the safeguarding measures proposed. Video and photographic documentation are required.' },
  { step: '4', icon: '🔍', title: 'Evaluation', desc: 'The Evaluation Body reviews the file against the criteria and recommends inscription, referral or rejection. Files are routinely referred back for more information.' },
  { step: '5', icon: '🗳️', title: 'Committee decision', desc: 'The Intergovernmental Committee, meeting annually, takes the final decision. States are limited in how many files they may submit per cycle, which is why the list grows slowly.' },
  { step: '6', icon: '📅', title: 'Periodic reporting', desc: 'Inscription is not the end. States report periodically on the status of inscribed elements and on the safeguarding measures actually implemented.' },
];

/* ---------------------------------------------------------- myth-busting */
const ICH_MYTHS = [
  {
    myth: 'Inscription protects the tradition',
    reality: 'It does not. Inscription is recognition, not protection. It carries no legal force in Indian law, imposes no restriction on anyone, and does not by itself fund anything. What safeguards a tradition is transmission — someone teaching it to someone younger.',
    icon: '🛡️',
  },
  {
    myth: 'It gives India ownership of the practice',
    reality: 'It gives no ownership to anyone. The heritage belongs to the communities that practise it, not to the state that nominated it. Nowruz is inscribed jointly by twelve countries precisely because no one of them can claim it.',
    icon: '🔓',
  },
  {
    myth: 'It means the tradition is the best of its kind',
    reality: 'The Representative List makes no comparative judgment at all. There is no ranking, no "better than", and an element not on the list is not thereby less significant. This is a deliberate difference from the World Heritage criterion of Outstanding Universal Value.',
    icon: '⚖️',
  },
  {
    myth: 'Only inscribed elements are protected traditions',
    reality: 'India\'s National ICH Inventory lists hundreds of elements. UNESCO inscription covers fifteen because states may submit only a limited number of files per cycle — the list reflects nomination capacity as much as cultural significance.',
    icon: '📚',
  },
  {
    myth: 'It restricts who may perform',
    reality: 'It restricts nobody. Inscription does not create a licence, a monopoly or a certification. Anyone the community\'s own norms permit may continue to practise exactly as before.',
    icon: '🚪',
  },
  {
    myth: 'The tradition is now frozen in its inscribed form',
    reality: 'The Convention explicitly recognises that living heritage changes. An element is expected to be recreated by its community in response to its environment. Freezing a practice at its documented state would defeat the purpose.',
    icon: '🔄',
  },
];

/* ------------------------------------------------------------- timeline */
const ICH_TIMELINE = [
  { year: '2001', title: 'Kutiyattam proclaimed', desc: 'Kutiyattam is proclaimed a Masterpiece of the Oral and Intangible Heritage of Humanity in the first-ever round, before the 2003 Convention exists.' },
  { year: '2003', title: 'Vedic chanting proclaimed', desc: 'The tradition of Vedic chanting is proclaimed in the second round of Masterpieces.' },
  { year: '2003', title: 'The Convention is adopted', desc: 'UNESCO adopts the Convention for the Safeguarding of the Intangible Cultural Heritage, creating a framework separate from the 1972 World Heritage Convention.' },
  { year: '2005', title: 'Ramlila proclaimed', desc: 'Ramlila is proclaimed in the third and final round of Masterpieces.' },
  { year: '2008', title: 'Three elements inscribed', desc: 'The three earlier Masterpieces — Kutiyattam, Vedic chanting and Ramlila — are incorporated into the new Representative List.' },
  { year: '2009', title: 'Ramman', desc: 'The ritual theatre of two Garhwal villages is inscribed — the narrowest in geographic scope of India\'s elements.' },
  { year: '2010', title: 'Three inscriptions', desc: 'Chhau Dance, Kalbelia folk songs and dances, and Mudiyettu are inscribed together.' },
  { year: '2012', title: 'Buddhist Chanting of Ladakh', desc: 'The recitation traditions of the Ladakhi monasteries are inscribed.' },
  { year: '2013', title: 'Sankirtana of Manipur', desc: 'The ritual singing, drumming and dancing of the Manipuri Vaishnava tradition is inscribed.' },
  { year: '2014', title: 'Thatheras of Jandiala Guru', desc: 'India\'s only craft inscription, and the only one covering a single town\'s community.' },
  { year: '2016', title: 'Nowruz and Yoga', desc: 'India joins the multinational Nowruz inscription, and Yoga is inscribed under knowledge concerning nature and the universe.' },
  { year: '2017', title: 'Kumbh Mela', desc: 'The largest peaceful gathering on earth is inscribed, with UNESCO noting its inclusiveness across caste, creed and gender.' },
  { year: '2021', title: 'Durga Puja in Kolkata', desc: 'Inscribed specifically as practised in Kolkata, for its function as citywide public art and its collapsing of social boundaries.' },
  { year: '2023', title: 'Garba of Gujarat', desc: 'India\'s fifteenth inscription, in December 2023.' },
];

/* ----------------------------------------------------------- safeguarding */
const ICH_SAFEGUARD = [
  { icon: '👨‍👩‍👧', title: 'Transmission is the whole point', desc: 'The Convention defines safeguarding as ensuring viability — identification, documentation, research, preservation, promotion, and above all transmission through formal and non-formal education. A tradition nobody is learning is not safeguarded, however well documented it is.' },
  { icon: '📉', title: 'Where the pressure is', desc: 'Out-migration is the most common threat on this list. Ramman needs specific families in specific villages; Kutiyattam needs a small number of teachers; the Thatheras need a market for hand-beaten utensils. In each case the practice depends on people staying and continuing.' },
  { icon: '🏛️', title: 'Sangeet Natak Akademi', desc: 'India\'s nodal agency for intangible cultural heritage. It maintains the National ICH Inventory, prepares nomination files, and runs the guru-shishya parampara scheme that funds masters to teach students directly.' },
  { icon: '💰', title: 'Scheme support', desc: 'The Ministry of Culture runs schemes for safeguarding intangible heritage, supporting documentation, training and performance. Inscription itself brings no automatic funding — the money comes from national schemes, not from UNESCO.' },
  { icon: '⚠️', title: 'The commercialisation problem', desc: 'Visibility cuts both ways. It can create livelihoods, as with Kalbelia performance after snake charming ended, and it can hollow a practice out into a version shaped for audiences rather than for the community. Both happen, sometimes to the same tradition.' },
  { icon: '📼', title: 'Documentation is not preservation', desc: 'Recording a practice preserves a record of it. It does not preserve the practice. This distinction is central to the 2003 Convention and is the main way it differs in spirit from the 1972 one.' },
];

/* -------------------------------------------------------------- gallery */
const ICH_GALLERY = [
  { icon: '👁️', title: 'Netrabhinaya', caption: 'In Kutiyattam, a whole scene can be carried by the eyes alone.' },
  { icon: '📿', title: 'Ghana-patha', caption: 'Permuted recitation that makes an oral text self-checking.' },
  { icon: '🏘️', title: 'Ramnagar Ramlila', caption: 'A month long, with the town itself as the set.' },
  { icon: '🎭', title: 'Chhau Masks', caption: 'Seraikela and Purulia use them; Mayurbhanj does not.' },
  { icon: '🎨', title: 'The Kalam', caption: 'In Mudiyettu the goddess is drawn on the floor, worshipped, and erased.' },
  { icon: '🥁', title: 'Pung Cholom', caption: 'The drum dance at the centre of Manipuri sankirtana.' },
  { icon: '🔨', title: 'Hand-beaten Brass', caption: 'The Thatheras of Jandiala Guru — one town, one craft, one inscription.' },
  { icon: '🪔', title: 'Kumartuli', caption: 'The idol-makers\' quarter that Durga Puja in Kolkata runs on.' },
  { icon: '🕉️', title: 'Kumbh', caption: 'Tens of millions of people, timed by the positions of the planets.' },
  { icon: '💃', title: 'Garba', caption: 'A circle around a lamp — garbha, the womb.' },
];

/* ---------------------------------------------------------------- facts */
const ICH_FACTS = [
  'UNESCO runs two entirely separate conventions. The 1972 one covers World Heritage Sites — places. The 2003 one covers intangible cultural heritage — practices. India has 40+ of the first and 15 of the second, and they are routinely confused.',
  'Kutiyattam was among the very first elements UNESCO recognised anywhere, proclaimed a Masterpiece in 2001 — two years before the Convention that now governs the list existed.',
  'Vedic chanting methods such as jata-patha and ghana-patha recite the text in fixed permuted orders, so an error in one recitation shows up against the others. It is an oral error-correcting code, three thousand years old.',
  'Ramman is practised in two villages — Saloor-Dungra in Chamoli district — and nowhere else. Specific families hold specific roles, so out-migration is an existential threat rather than a general one.',
  'Chhau has three regional styles. Seraikela and Purulia use masks; Mayurbhanj does not.',
  'The Kalbelia were snake handlers until the Wildlife Protection Act, 1972 ended that livelihood. Their songs and dances became both a cultural continuity and an economic one.',
  'The Thatheras of Jandiala Guru are India\'s only craft inscription — and what is inscribed is the skill and its transmission, not the utensils.',
  'Yoga was inscribed under "knowledge and practices concerning nature and the universe", not under performing arts. The category reflects what was actually nominated.',
  'Nowruz is a multinational inscription shared by twelve countries. ICH elements are not required to stop at borders, and the Convention has a mechanism for that.',
  'Durga Puja is inscribed specifically as practised in Kolkata, not as a general festival — for its function as citywide public art and its collapsing of class and religious boundaries in public space.',
  'Garba, inscribed in December 2023, is India\'s most recent element. The name comes from garbha, meaning womb, referring to the lamp at the centre of the circle.',
  'Inscription confers no legal protection, no funding by default, no ownership and no exclusivity. It is recognition. What actually safeguards a tradition is somebody teaching it to somebody younger.',
];

/* ----------------------------------------------------------------- quiz */
const ICH_QUIZ = [
  {
    q: 'What is the difference between a UNESCO World Heritage Site and an intangible cultural heritage element?',
    options: [
      'One is natural and the other is cultural',
      'They fall under two different conventions — 1972 covers places, 2003 covers practices',
      'One is permanent and the other is reviewed every ten years',
      'There is no difference; they are two names for the same list',
    ],
    answer: 1,
    explain: 'Two separate conventions with separate lists and separate criteria. The 1972 Convention covers monuments, sites and natural properties; the 2003 Convention covers living practices.',
  },
  {
    q: 'How many Indian elements are on the UNESCO Representative List of Intangible Cultural Heritage?',
    options: ['10', '15', '25', '40'],
    answer: 1,
    explain: 'Fifteen, from Kutiyattam in 2008 to Garba of Gujarat in 2023.',
  },
  {
    q: 'What does inscription on the Representative List actually do?',
    options: [
      'It legally protects the tradition under Indian law',
      'It provides recognition and visibility — no legal force, no automatic funding, no exclusivity',
      'It grants India ownership of the practice',
      'It requires the tradition to be performed in its documented form',
    ],
    answer: 1,
    explain: 'Inscription is recognition. It carries no legal force, no default funding and no ownership. What safeguards a tradition is transmission.',
  },
  {
    q: 'Which Indian element is practised in only two villages?',
    options: ['Mudiyettu', 'Ramman', 'Chhau', 'Sankirtana'],
    answer: 1,
    explain: 'Ramman, in the twin villages of Saloor-Dungra in Chamoli district, Uttarakhand. Specific families hold specific roles.',
  },
  {
    q: 'Under which ICH domain was Yoga inscribed?',
    options: [
      'Performing arts',
      'Knowledge and practices concerning nature and the universe',
      'Social practices, rituals and festive events',
      'Traditional craftsmanship',
    ],
    answer: 1,
    explain: 'Knowledge and practices concerning nature and the universe — reflecting yoga as a system of thought rather than as physical exercise.',
  },
  {
    q: 'What makes Vedic chanting methods such as ghana-patha remarkable?',
    options: [
      'They are sung to a fixed melody preserved unchanged',
      'They recite words in permuted orders so that errors become detectable',
      'They are performed only by a single family',
      'They were written down in the second century BCE',
    ],
    answer: 1,
    explain: 'The permutation acts as an oral error-correcting mechanism — an error in one recitation is exposed by comparison with the others.',
  },
  {
    q: 'Which is India\'s only inscribed traditional craft?',
    options: [
      'Kalbelia embroidery',
      'The brass and copper utensil craft of the Thatheras of Jandiala Guru',
      'Kumartuli idol-making',
      'Chhau mask-making',
    ],
    answer: 1,
    explain: 'The Thatheras of Jandiala Guru in Punjab, inscribed in 2014 — and what is inscribed is the skill and its transmission, not the objects.',
  },
  {
    q: 'Why is Nowruz a multinational inscription?',
    options: [
      'Because it is celebrated on the same date everywhere',
      'Because it is practised across many countries and no single state can claim it',
      'Because UNESCO requires all festivals to be jointly nominated',
      'Because India nominated it on behalf of the region',
    ],
    answer: 1,
    explain: 'Twelve countries are party to it. The multinational format exists precisely so that shared practices need not be claimed by one state.',
  },
  {
    q: 'What is the kalam in Mudiyettu?',
    options: [
      'A ritual drum',
      'A large drawing of the goddess made on the temple floor in coloured powders',
      'The mask worn by the performer playing Kali',
      'The temple hall where the performance takes place',
    ],
    answer: 1,
    explain: 'It is created, worshipped and then deliberately erased as part of the ritual.',
  },
  {
    q: 'Which body is India\'s nodal agency for intangible cultural heritage?',
    options: [
      'Archaeological Survey of India',
      'Sangeet Natak Akademi',
      'Indira Gandhi National Centre for the Arts',
      'National Museum',
    ],
    answer: 1,
    explain: 'The Sangeet Natak Akademi maintains the National ICH Inventory and prepares nomination files. The ASI handles tangible heritage.',
  },
  {
    q: 'Why must a nomination have community consent?',
    options: [
      'To confirm the tradition is old enough to qualify',
      'Because the heritage belongs to the community, and free prior informed consent is a Convention requirement',
      'To establish who owns the copyright',
      'It is recommended but not required',
    ],
    answer: 1,
    explain: 'The Convention requires free, prior and informed consent. A nomination made over a community\'s head does not meet its requirements.',
  },
  {
    q: 'Which is India\'s most recent inscription?',
    options: ['Durga Puja in Kolkata (2021)', 'Garba of Gujarat (2023)', 'Kumbh Mela (2017)', 'Yoga (2016)'],
    answer: 1,
    explain: 'Garba of Gujarat, inscribed in December 2023 — the fifteenth Indian element on the Representative List.',
  },
];
