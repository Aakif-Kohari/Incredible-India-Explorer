/* ==========================================================================
   Sucheta Kriplani Data
   Comprehensive biographical and historical data
   ========================================================================== */

const earlyLifeFeatures = [
    { icon: '👨‍⚕️', title: 'Family Background', desc: 'Born to Surendranath Mazumdar, a medical officer in Indian Medical Service, and grew up in a family with strong nationalist traditions.' },
    { icon: '🌍', title: 'Nationalist Upbringing', desc: 'Raised in an environment steeped in nationalist values, with family members actively involved in the freedom movement.' },
    { icon: '📚', title: 'Early Education', desc: 'Received excellent education that emphasized both academic excellence and social responsibility.' },
    { icon: '🎓', title: 'Higher Studies', desc: 'Pursued higher education that prepared her for leadership roles in public life.' },
    { icon: '💪', title: 'Formative Influences', desc: 'Influenced by prominent nationalist leaders and the political atmosphere of pre-independence India.' },
    { icon: '👨‍👩‍👧', title: 'Marriage to Acharya Kriplani', desc: 'Married J.B. Kriplani, a prominent freedom fighter and Congress leader, in 1936, further strengthening her political connections.' }
];

const educationGrid = [
    { icon: '🏫', title: 'Schooling', desc: 'Completed schooling at institutions that emphasized both academic rigor and character building.' },
    { icon: '🎓', title: 'College Education', desc: 'Pursued college education that exposed her to political ideas and social issues.' },
    { icon: '📖', title: 'Intellectual Development', desc: 'Developed strong analytical skills and deep understanding of social and political issues.' },
    { icon: '🗣️', title: 'Language Skills', desc: 'Fluent in multiple languages including English, Hindi, and Bengali, enabling effective communication.' },
    { icon: '💡', title: 'Political Awareness', desc: 'Education exposed her to nationalist ideas and the need for social reform.' },
    { icon: '🌐', title: 'Broad Perspective', desc: 'Education provided her with a broad perspective on national and international issues.' }
];

const freedomFeatures = [
    { icon: '✊', title: 'Early Activism', desc: 'Began participating in Congress activities and nationalist movements from a young age.' },
    { icon: '🎯', title: 'Organizing Skills', desc: 'Demonstrated excellent organizational skills in mobilizing people for the freedom movement.' },
    { icon: '🗣️', title: 'Public Speaking', desc: 'Became known for her powerful oratory and ability to inspire masses.' },
    { icon: '👥', title: 'Women Mobilization', desc: 'Played key role in mobilizing women to participate in the freedom struggle.' },
    { icon: '📝', title: 'Congress Work', desc: 'Held various positions in the Congress organization at different levels.' },
    { icon: '⛓️', title: 'Facing Repression', desc: 'Faced British repression including arrest and imprisonment for her nationalist activities.' }
];

const freedomContributions = [
    { icon: '🎯', title: 'Civil Disobedience', desc: 'Actively participated in various civil disobedience movements against British rule.' },
    { icon: '📢', title: 'Public Campaigns', desc: 'Organized and led public campaigns to build support for independence.' },
    { icon: '👭', title: 'Women\'s Wing', desc: 'Worked extensively with the women\'s wing of Congress to increase female participation.' },
    { icon: '🌍', title: 'International Advocacy', desc: 'Represented Indian freedom movement at international forums to build global support.' },
    { icon: '🤝', title: 'Unity Building', desc: 'Worked to build unity among different communities and regions for the freedom movement.' },
    { icon: '📰', title: 'Publicity Work', desc: 'Managed publicity and communications for Congress campaigns.' }
];

const quitIndiaFeatures = [
    { icon: '🔥', title: 'Active Participation', desc: 'Played a significant role in organizing and participating in the Quit India Movement of 1942.' },
    { icon: '⛓️', title: 'Arrest & Imprisonment', desc: 'Was arrested by British authorities and imprisoned for her role in the movement.' },
    { icon: '💪', title: 'Underground Activities', desc: 'Engaged in underground activities when not imprisoned to keep the movement alive.' },
    { icon: '🗣️', title: 'Inspiring Leadership', desc: 'Inspired many, especially women, to join the Quit India Movement despite risks.' },
    { icon: '🎯', title: 'Strategic Planning', desc: 'Involved in strategic planning and coordination of movement activities.' },
    { icon: '🤲', title: 'Support Networks', desc: 'Built and maintained support networks for freedom fighters and their families.' }
];

const movementContributions = [
    { icon: '📋', title: 'Organization', desc: 'Organized protests, meetings, and demonstrations as part of the movement.' },
    { icon: '👥', title: 'Mobilization', desc: 'Mobilized large numbers of people, especially women, to participate actively.' },
    { icon: '📢', title: 'Communication', desc: 'Maintained communication networks among freedom fighters across regions.' },
    { icon: '🏥', title: 'Relief Work', desc: 'Organized relief work for families of imprisoned freedom fighters.' },
    { icon: '📝', title: 'Documentation', desc: 'Documented movement activities and maintained records for posterity.' },
    { icon: '🤝', title: 'Coordination', desc: 'Coordinated with other leaders to ensure effective movement implementation.' }
];

const constituentFeatures = [
    { icon: '🏛️', title: 'Constituent Assembly Member', desc: 'One of only 15 women members in the Constituent Assembly that drafted India\'s Constitution.' },
    { icon: '📜', title: 'Constitution Drafting', desc: 'Participated actively in debates and discussions during constitution drafting process.' },
    { icon: '⚖️', title: 'Rights Advocacy', desc: 'Advocated for fundamental rights and equality provisions in the Constitution.' },
    { icon: '👥', title: 'Women\'s Perspective', desc: 'Brought women\'s perspective to constitutional debates and discussions.' },
    { icon: '🗣️', title: 'Active Debates', desc: 'Participated actively in debates on various constitutional provisions.' },
    { icon: '🎯', title: 'Committee Work', desc: 'Served on various committees of the Constituent Assembly.' }
];

const constituentContributions = [
    { icon: '⚖️', title: 'Fundamental Rights', desc: 'Contributed to discussions on fundamental rights chapter of the Constitution.' },
    { icon: '👩', title: 'Women\'s Rights', desc: 'Advocated for provisions ensuring women\'s equality and rights.' },
    { icon: '🏛️', title: 'Governance Structure', desc: 'Participated in debates on the structure of governance in independent India.' },
    { icon: '📋', title: 'Directive Principles', desc: 'Contributed to discussions on Directive Principles of State Policy.' },
    { icon: '⚖️', title: 'Judicial Provisions', desc: 'Participated in debates on judicial provisions and separation of powers.' },
    { icon: '🎯', title: 'Federal Structure', desc: 'Contributed to discussions on federal structure and center-state relations.' }
];

const politicalFeatures = [
    { icon: '🗳️', title: 'Parliamentary Elections', desc: 'Contested and won multiple parliamentary elections, serving several terms in Lok Sabha.' },
    { icon: '🏛️', title: 'Ministerial Roles', desc: 'Held various ministerial positions in the central government before becoming Chief Minister.' },
    { icon: '🌍', title: 'International Representation', desc: 'Represented India at United Nations and other international forums.' },
    { icon: '👥', title: 'Party Leadership', desc: 'Held leadership positions within the Congress party organization.' },
    { icon: '📋', title: 'Policy Development', desc: 'Contributed to policy development in various ministries she served in.' },
    { icon: '🤝', title: 'Diplomatic Work', desc: 'Engaged in diplomatic work representing India internationally.' }
];

const politicalContributions = [
    { icon: '🏛️', title: 'Lok Sabha Member', desc: 'Served multiple terms as Member of Parliament in the Lok Sabha.' },
    { icon: '📋', title: 'Minister of State', desc: 'Served as Minister of State in various ministries gaining administrative experience.' },
    { icon: '🌍', title: 'UN Delegate', desc: 'Represented India at United Nations General Assembly and other UN forums.' },
    { icon: '👥', title: 'Congress Working Committee', desc: 'Member of Congress Working Committee, the party\'s highest decision-making body.' },
    { icon: '📢', title: 'Parliamentary Debates', desc: 'Active participant in parliamentary debates on important national issues.' },
    { icon: '🎯', title: 'Committee Memberships', desc: 'Served on various parliamentary committees examining legislation and policies.' }
];

const cmFeatures = [
    { icon: '👩‍💼', title: 'Historic Appointment', desc: 'Became India\'s first woman Chief Minister when appointed as CM of Uttar Pradesh in 1963.' },
    { icon: '🏛️', title: 'State Administration', desc: 'Led the administration of India\'s most populous state with competence and dedication.' },
    { icon: '📋', title: 'Policy Implementation', desc: 'Implemented various development policies and welfare programs in the state.' },
    { icon: '👥', title: 'People\'s Leader', desc: 'Maintained close connection with people, understanding their needs and aspirations.' },
    { icon: '⚖️', title: 'Law & Order', desc: 'Maintained law and order in the state during a challenging period.' },
    { icon: '🎯', title: 'Development Focus', desc: 'Focused on development initiatives in education, health, and infrastructure.' }
];

const cmInitiatives = [
    { icon: '🎓', title: 'Education Expansion', desc: 'Expanded educational infrastructure and improved access to education across the state.' },
    { icon: '🏥', title: 'Healthcare Initiatives', desc: 'Initiated healthcare programs to improve medical facilities and access.' },
    { icon: '🛣️', title: 'Infrastructure Development', desc: 'Focused on infrastructure development including roads and public facilities.' },
    { icon: '👩', title: 'Women\'s Welfare', desc: 'Implemented programs specifically focused on women\'s welfare and empowerment.' },
    { icon: '🌾', title: 'Agricultural Development', desc: 'Initiated programs to support agricultural development and farmer welfare.' },
    { icon: '🏘️', title: 'Rural Development', desc: 'Focused on rural development programs to improve rural infrastructure and livelihoods.' }
];

const legacyFeatures = [
    { icon: '👩‍💼', title: 'Women in Politics', desc: 'Paved the way for women to hold highest political offices in India.' },
    { icon: '🏛️', title: 'Democratic Values', desc: 'Strengthened democratic values through her conduct in public office.' },
    { icon: '📚', title: 'Inspirational Example', desc: 'Served as inspirational example for generations of women leaders.' },
    { icon: '⚖️', title: 'Equality Advocacy', desc: 'Continued advocacy for equality and social justice throughout her career.' },
    { icon: '🎯', title: 'Public Service', desc: 'Exemplified dedication to public service and national development.' },
    { icon: '🤝', title: 'Unity Building', desc: 'Worked to build unity among different communities and regions.' }
];

const legacyImpact = [
    { icon: '👩‍💼', title: 'Women Chief Ministers', desc: 'Inspired many women to become Chief Ministers and hold high political offices.' },
    { icon: '🏛️', title: 'Political Participation', desc: 'Increased women\'s participation in politics at all levels.' },
    { icon: '📚', title: 'Educational Legacy', desc: 'Her emphasis on education continues to influence policy.' },
    { icon: '⚖️', title: 'Equality Principles', desc: 'Her advocacy for equality influenced subsequent legislation and policies.' },
    { icon: '🎯', title: 'Public Service Standards', desc: 'Set high standards for public service that continue to inspire.' },
    { icon: '🌍', title: 'International Recognition', desc: 'India\'s reputation for women\'s political participation enhanced by her example.' }
];

const timeline = [
    { year: '1908', title: 'Birth', desc: 'Born on June 25 in Ambala, Punjab to Surendranath Mazumdar.' },
    { year: '1920s', title: 'Early Activism', desc: 'Begins participating in nationalist activities during her student days.' },
    { year: '1936', title: 'Marriage', desc: 'Marries J.B. Kriplani, prominent freedom fighter and Congress leader.' },
    { year: '1942', title: 'Quit India Movement', desc: 'Actively participates in Quit India Movement, faces arrest and imprisonment.' },
    { year: '1946', title: 'Constituent Assembly', desc: 'Elected to Constituent Assembly, one of only 15 women members.' },
    { year: '1947', title: 'Independence', desc: 'Witnesses India\'s independence and sings Vande Mataram at historic moment.' },
    { year: '1952', title: 'First Lok Sabha', desc: 'Elected to first Lok Sabha, begins parliamentary career.' },
    { year: '1963', title: 'Chief Minister', desc: 'Becomes first woman Chief Minister of Uttar Pradesh, making history.' },
    { year: '1967', title: 'CM Tenure Ends', desc: 'Completes tenure as Chief Minister after four years of service.' },
    { year: '1974', title: 'Passing', desc: 'Passes away on December 1, leaving behind inspiring legacy.' }
];

const galleryData = [
    { src: 'https://placehold.co/400x400/0D1B2A/fff?text=Sucheta+Kriplani', alt: 'Sucheta Kriplani portrait', caption: 'Official portrait of Sucheta Kriplani, India\'s first woman Chief Minister' },
    { src: 'https://placehold.co/400x400/FF9933/fff?text=Freedom+Movement', alt: 'In freedom movement', caption: 'Active participation in India\'s freedom struggle' },
    { src: 'https://placehold.co/400x400/138808/fff?text=Constituent+Assembly', alt: 'In Constituent Assembly', caption: 'As member of the Constituent Assembly drafting India\'s Constitution' },
    { src: 'https://placehold.co/400x400/0D1B2A/fff?text=Chief+Minister', alt: 'As Chief Minister', caption: 'Serving as Chief Minister of Uttar Pradesh' },
    { src: 'https://placehold.co/400x400/FF9933/fff?text=Parliament', alt: 'In Parliament', caption: 'As Member of Parliament in Lok Sabha' },
    { src: 'https://placehold.co/400x400/138808/fff?text=UN+Delegate', alt: 'At United Nations', caption: 'Representing India at the United Nations' },
    { src: 'https://placehold.co/400x400/0D1B2A/fff?text=With+Gandhi', alt: 'With Mahatma Gandhi', caption: 'With Mahatma Gandhi during freedom movement' },
    { src: 'https://placehold.co/400x400/FF9933/fff?text=Public+Meeting', alt: 'At public meeting', caption: 'Addressing public meeting during election campaign' },
    { src: 'https://placehold.co/400x400/138808/fff?text=Women+Leaders', alt: 'With women leaders', caption: 'With other prominent women leaders of the era' },
    { src: 'https://placehold.co/400x400/0D1B2A/fff?text=Official+Function', alt: 'At official function', caption: 'At official function as Chief Minister' },
    { src: 'https://placehold.co/400x400/FF9933/fff?text=Independence+Day', alt: 'Independence Day', caption: 'At Independence Day celebrations in 1947' },
    { src: 'https://placehold.co/400x400/138808/fff?text=International+Forum', alt: 'At international forum', caption: 'Representing India at international forum' }
];
