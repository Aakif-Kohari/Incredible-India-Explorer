/* ==========================================================================
   Hansa Mehta Data
   Comprehensive biographical and constitutional data
   ========================================================================== */

const earlyLifeFeatures = [
    { icon: '🏛️', title: 'Baroda Royal Family', desc: 'Born to Manubhai Mehta, Dewan of Baroda State, giving her exposure to governance from childhood.' },
    { icon: '📚', title: 'Reformist Grandfather', desc: 'Granddaughter of Nandshankar Mehta, author of first Gujarati novel "Karan Ghelo" and noted reformer.' },
    { icon: '👩', title: 'Progressive Mother', desc: 'Her mother Kusum was an educated woman who encouraged Hansa\'s intellectual development.' },
    { icon: '🎓', title: 'Educational Heritage', desc: 'Family legacy of education reform influenced her lifelong commitment to education.' },
    { icon: '🌿', title: 'Gujarat Roots', desc: 'Grew up in Surat and Baroda, immersed in Gujarati cultural and reformist traditions.' },
    { icon: '👨‍👩‍👧', title: 'Sibling Influence', desc: 'Growing up with educated siblings fostered her competitive intellectual spirit.' }
];

const earlyInfluences = [
    { icon: '💡', title: 'Social Reform Exposure', desc: 'Early exposure to social reform movements shaped her commitment to social justice.' },
    { icon: '📖', title: 'Literary Environment', desc: 'Family\'s literary tradition cultivated her love for writing and intellectual discourse.' },
    { icon: '🗣️', title: 'Public Speaking', desc: 'Early opportunities to speak in public developed her oratory skills.' },
    { icon: '🌍', title: 'Nationalist Awakening', desc: 'The freedom movement\'s call reached her through family and social circles.' },
    { icon: '⚖️', title: 'Justice Sensibility', desc: 'Early encounters with inequality sparked her lifelong commitment to justice.' },
    { icon: '🤝', title: 'Gandhian Influence', desc: 'Meeting Gandhi profoundly shaped her political and social philosophy.' }
];

const educationFeatures = [
    { icon: '🏫', title: 'Women\'s College Baroda', desc: 'Graduated from Women\'s College in 1918 with a degree in philosophy.' },
    { icon: '🎓', title: 'London School of Economics', desc: 'Studied at LSE in 1919, exposed to Western economic and social thought.' },
    { icon: '📚', title: 'University of London', desc: 'Completed further studies at University of London, broadening her intellectual horizons.' },
    { icon: '🗣️', title: 'Journalism Training', desc: 'Received training in journalism which she later used for nationalist advocacy.' },
    { icon: '🌐', title: 'International Exposure', desc: 'London years gave her global perspective and networks she would leverage at the UN.' },
    { icon: '✍️', title: 'Writing Development', desc: 'Education honed her writing skills, making her an effective communicator.' }
];

const educationAcademic = [
    { icon: '📖', title: 'Philosophy Studies', desc: 'Philosophical training shaped her analytical approach to social problems.' },
    { icon: '📊', title: 'Economics Knowledge', desc: 'Economic studies informed her views on development and equality.' },
    { icon: '🎯', title: 'Critical Thinking', desc: 'Education developed her ability to critically analyze social structures.' },
    { icon: '💭', title: 'Interdisciplinary Approach', desc: 'Combined insights from multiple disciplines in her reform work.' },
    { icon: '🌍', title: 'Comparative Perspective', desc: 'Studied Indian issues in comparative global context.' },
    { icon: '📝', title: 'Academic Writing', desc: 'Became a prolific author of academic and popular works.' }
];

const freedomFeatures = [
    { icon: '🤝', title: 'Meeting Gandhi', desc: 'Met Gandhi in the 1920s and became deeply influenced by his philosophy.' },
    { icon: '✊', title: 'Civil Disobedience', desc: 'Actively participated in civil disobedience movements against British rule.' },
    { icon: '⛓️', title: 'Multiple Arrests', desc: 'Faced imprisonment multiple times for nationalist activities.' },
    { icon: '📢', title: 'Public Speaking', desc: 'Traveled extensively giving speeches that inspired masses to join freedom struggle.' },
    { icon: '👥', title: 'Women Mobilization', desc: 'Mobilized women across India to participate actively in freedom movement.' },
    { icon: '📰', title: 'Journalism Work', desc: 'Used journalism as a tool for nationalist propaganda.' }
];

const freedomContributions = [
    { icon: '🗳️', title: 'Bombay Legislative Council', desc: 'Elected to Bombay Legislative Council in 1937, one of first women legislators.' },
    { icon: '📋', title: 'Congress Committees', desc: 'Served on various Congress committees bringing women\'s perspective.' },
    { icon: '🎯', title: 'AIWC Leadership', desc: 'President of All India Women\'s Conference in 1945-46.' },
    { icon: '🌍', title: 'International Advocacy', desc: 'Represented Indian nationalism at international forums.' },
    { icon: '📝', title: 'Political Writing', desc: 'Authored numerous articles explaining Congress policies.' },
    { icon: '🤝', title: 'Unity Building', desc: 'Worked across communal and regional lines for unity.' }
];

const constituentFeatures = [
    { icon: '🏛️', title: 'Constituent Assembly Member', desc: 'One of 15 women in the Constituent Assembly drafting India\'s Constitution (1946-1950).' },
    { icon: '📜', title: 'Fundamental Rights Committee', desc: 'Served on Fundamental Rights Sub-Committee shaping constitutional guarantees.' },
    { icon: '⚖️', title: 'Equality Advocacy', desc: 'Strongly advocated for equality and non-discrimination provisions.' },
    { icon: '👩', title: 'Women\'s Rights Champion', desc: 'Championed constitutional guarantees of women\'s equality.' },
    { icon: '🗣️', title: 'Active Debates', desc: 'Participated actively in debates on various constitutional provisions.' },
    { icon: '📋', title: 'Uniform Civil Code', desc: 'Advocated for Uniform Civil Code in Directive Principles.' }
];

const constituentContributions = [
    { icon: '⚖️', title: 'Article 15 - Non-Discrimination', desc: 'Contributed to provisions prohibiting discrimination based on religion, race, caste, sex, or place of birth.' },
    { icon: '👩', title: 'Women\'s Equality', desc: 'Ensured constitutional guarantees of women\'s equality in various provisions.' },
    { icon: '📜', title: 'Fundamental Rights', desc: 'Shaped the Fundamental Rights chapter ensuring comprehensive protections.' },
    { icon: '🏛️', title: 'Directive Principles', desc: 'Contributed to Directive Principles including Uniform Civil Code provision.' },
    { icon: '⚖️', title: 'Hindu Code Bill Support', desc: 'Advocated for Hindu Code Bill reforms to give women equal rights in marriage and inheritance.' },
    { icon: '🎯', title: 'Affirmative Action', desc: 'Supported provisions for affirmative action for marginalized communities.' }
];

const womensFeatures = [
    { icon: '⚖️', title: 'Hindu Code Bill', desc: 'Strong advocate for Hindu Code Bill giving women equal rights in marriage, inheritance, and divorce.' },
    { icon: '🏛️', title: 'AIWC Presidency', desc: 'President of All India Women\'s Conference (1945-46), transforming it into powerful platform.' },
    { icon: '📋', title: 'Legal Reforms', desc: 'Advocated for comprehensive legal reforms to improve women\'s status.' },
    { icon: '🎓', title: 'Women\'s Education', desc: 'Championed women\'s access to education at all levels.' },
    { icon: '💼', title: 'Economic Rights', desc: 'Fought for women\'s economic rights including property and employment rights.' },
    { icon: '🗳️', title: 'Political Participation', desc: 'Advocated for women\'s full political participation in independent India.' }
];

const womensInitiatives = [
    { icon: '⚖️', title: 'Marriage Law Reforms', desc: 'Worked to reform marriage laws to give women equal status and rights.' },
    { icon: '💰', title: 'Property Rights', desc: 'Advocated for women\'s inheritance and property rights.' },
    { icon: '👶', title: 'Child Marriage Prevention', desc: 'Worked to prevent child marriage and promote women\'s autonomy.' },
    { icon: '💼', title: 'Employment Equality', desc: 'Fought for equal employment opportunities for women.' },
    { icon: '🎓', title: 'Educational Access', desc: 'Promoted women\'s access to higher education and professional training.' },
    { icon: '🏛️', title: 'Political Representation', desc: 'Advocated for women\'s political representation at all levels.' }
];

const humanRightsFeatures = [
    { icon: '🌍', title: 'UN Human Rights Commission', desc: 'Vice-Chair of UN Commission on Human Rights (1948-50) during UDHR drafting.' },
    { icon: '📜', title: 'UDHR Language Change', desc: 'Changed "all men are born free" to "all human beings are born free" in UDHR Article 1.' },
    { icon: '👥', title: 'Indian UN Delegate', desc: 'Represented India at UN General Assembly and various UN bodies.' },
    { icon: '⚖️', title: 'Gender-Neutral Language', desc: 'Advocated for gender-neutral language throughout human rights documents.' },
    { icon: '🌐', title: 'UNESCO Work', desc: 'Served on UNESCO executive board promoting education and culture.' },
    { icon: '🎯', title: 'Women\'s Rights at UN', desc: 'Championed women\'s rights in various UN forums.' }
];

const humanRightsUN = [
    { icon: '📜', title: 'UDHR Article 1', desc: 'Changed "all men" to "all human beings" - one of most consequential edits in human rights history.' },
    { icon: '⚖️', title: 'Equality Provisions', desc: 'Ensured comprehensive equality provisions throughout UDHR.' },
    { icon: '👩', title: 'Women\'s Rights', desc: 'Advocated for explicit women\'s rights in international human rights framework.' },
    { icon: '🌍', title: 'Global Perspective', desc: 'Brought Indian and Asian perspectives to Western-dominated UN discussions.' },
    { icon: '📋', title: 'Drafting Committee', desc: 'Served on key committees shaping human rights documents.' },
    { icon: '🤝', title: 'International Solidarity', desc: 'Built solidarity among women delegates from different countries.' }
];

const educationReformFeatures = [
    { icon: '🏫', title: 'MS University Baroda', desc: 'Vice-Chancellor of MS University Baroda (1949-1958), transforming it into a premier institution.' },
    { icon: '🎓', title: 'SNDT Women\'s University', desc: 'Vice-Chancellor of SNDT Women\'s University (1958-1963), India\'s first women\'s university.' },
    { icon: '📚', title: 'University Education Commission', desc: 'Member of University Education Commission (1948-49) shaping higher education policy.' },
    { icon: '🎯', title: 'Educational Reforms', desc: 'Advocated for comprehensive educational reforms at all levels.' },
    { icon: '👩', title: 'Women\'s Education', desc: 'Championed women\'s access to higher education and professional training.' },
    { icon: '🌍', title: 'International Standards', desc: 'Promoted Indian education in line with international standards.' }
];

const educationUniversities = [
    { icon: '🏛️', title: 'MS University Baroda', desc: 'Transformed MS University Baroda into a premier institution with focus on arts, sciences, and commerce.' },
    { icon: '🎓', title: 'SNDT Women\'s University', desc: 'Led India\'s first women\'s university, expanding its reach and quality.' },
    { icon: '📋', title: 'University Education Commission', desc: 'Contributed to Radhakrishnan Commission shaping higher education policy.' },
    { icon: '🎯', title: 'Academic Standards', desc: 'Raised academic standards at both universities she led.' },
    { icon: '🌐', title: 'International Collaboration', desc: 'Promoted international collaboration and exchange programs.' },
    { icon: '📚', title: 'Research Promotion', desc: 'Promoted research and innovation at universities.' }
];

const legacyFeatures = [
    { icon: '⚖️', title: 'Constitutional Legacy', desc: 'Constitutional guarantees of equality and non-discrimination she helped shape continue to protect millions.' },
    { icon: '📜', title: 'UDHR Legacy', desc: 'Gender-neutral language she advocated in UDHR is now standard in human rights documents.' },
    { icon: '🏫', title: 'Educational Legacy', desc: 'Universities she led continue to educate thousands of students.' },
    { icon: '👩', title: 'Women\'s Rights Legacy', desc: 'Legal reforms she advocated continue to protect women\'s rights.' },
    { icon: '🌍', title: 'International Legacy', desc: 'Her contributions to international human rights framework continue to shape global norms.' },
    { icon: '📚', title: 'Intellectual Legacy', desc: 'Her writings continue to inspire scholars and activists.' }
];

const legacyImpact = [
    { icon: '⚖️', title: 'Equality Jurisprudence', desc: 'Indian courts continue to cite constitutional provisions she helped shape in equality cases.' },
    { icon: '👩', title: 'Women\'s Movements', desc: 'Women\'s movements continue to draw inspiration from her advocacy.' },
    { icon: '🌍', title: 'UN Human Rights', desc: 'Her UN contributions continue to influence human rights work globally.' },
    { icon: '🏫', title: 'Higher Education', desc: 'Educational policies she shaped continue to influence Indian higher education.' },
    { icon: '📜', title: 'Legal Framework', desc: 'Legal reforms she advocated continue to form basis of women\'s rights law.' },
    { icon: '🎯', title: 'Social Reform', desc: 'Her model of connecting political, social, and legal reform continues to inspire.' }
];

const timeline = [
    { year: '1897', title: 'Birth', desc: 'Born on July 3 in Surat, Gujarat, to Manubhai Mehta, Dewan of Baroda State.' },
    { year: '1918', title: 'Graduation', desc: 'Graduates from Women\'s College Baroda with philosophy degree.' },
    { year: '1919', title: 'London Studies', desc: 'Travels to London to study at LSE and University of London.' },
    { year: '1924', title: 'Marriage', desc: 'Marries Jivraj Mehta, who later becomes first CM of Gujarat.' },
    { year: '1930s', title: 'Freedom Movement', desc: 'Becomes active in Congress and freedom movement, faces imprisonment.' },
    { year: '1937', title: 'Bombay Legislature', desc: 'Elected to Bombay Legislative Council, one of first women legislators.' },
    { year: '1945', title: 'AIWC President', desc: 'Elected President of All India Women\'s Conference.' },
    { year: '1946', title: 'Constituent Assembly', desc: 'Elected to Constituent Assembly, begins work on Constitution.' },
    { year: '1948', title: 'UN Human Rights', desc: 'Becomes Vice-Chair of UN Commission on Human Rights during UDHR drafting.' },
    { year: '1949', title: 'MS University VC', desc: 'Appointed Vice-Chancellor of MS University Baroda.' },
    { year: '1958', title: 'SNDT University VC', desc: 'Becomes Vice-Chancellor of SNDT Women\'s University.' },
    { year: '1959', title: 'Padma Bhushan', desc: 'Awarded Padma Bhushan, India\'s third-highest civilian honor.' },
    { year: '1995', title: 'Passing', desc: 'Passes away at age 98, leaving behind extraordinary legacy.' }
];

const galleryData = [
    { src: 'https://placehold.co/400x400/0D47A1/fff?text=Hansa+Mehta', alt: 'Hansa Mehta portrait', caption: 'Official portrait of Hansa Mehta' },
    { src: 'https://placehold.co/400x400/B71C1C/fff?text=Constituent+Assembly', alt: 'In Constituent Assembly', caption: 'As member of the Constituent Assembly' },
    { src: 'https://placehold.co/400x400/FFB300/0A1929?text=UN+Commission', alt: 'At UN Human Rights Commission', caption: 'Vice-Chair of UN Commission on Human Rights' },
    { src: 'https://placehold.co/400x400/0D47A1/fff?text=UDHR+Drafting', alt: 'UDHR drafting', caption: 'During drafting of Universal Declaration of Human Rights' },
    { src: 'https://placehold.co/400x400/B71C1C/fff?text=With+Gandhi', alt: 'With Mahatma Gandhi', caption: 'With Mahatma Gandhi during freedom movement' },
    { src: 'https://placehold.co/400x400/FFB300/0A1929?text=AIWC+Meeting', alt: 'AIWC meeting', caption: 'Presiding over All India Women\'s Conference' },
    { src: 'https://placehold.co/400x400/0D47A1/fff?text=MS+University', alt: 'At MS University Baroda', caption: 'As Vice-Chancellor of MS University Baroda' },
    { src: 'https://placehold.co/400x400/B71C1C/fff?text=SNDT+University', alt: 'At SNDT University', caption: 'As Vice-Chancellor of SNDT Women\'s University' },
    { src: 'https://placehold.co/400x400/FFB300/0A1929?text=UNESCO', alt: 'At UNESCO', caption: 'Representing India at UNESCO forums' },
    { src: 'https://placehold.co/400x400/0D47A1/fff?text=With+Nehru', alt: 'With Jawaharlal Nehru', caption: 'With Prime Minister Jawaharlal Nehru' },
    { src: 'https://placehold.co/400x400/B71C1C/fff?text=Padma+Bhushan', alt: 'Padma Bhushan award', caption: 'Receiving Padma Bhushan in 1959' },
    { src: 'https://placehold.co/400x400/FFB300/0A1929?text=International+Forum', alt: 'At international forum', caption: 'Representing India at international forums' }
];
