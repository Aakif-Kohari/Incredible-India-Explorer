/* ==========================================================================
   Rajkumari Amrit Kaur Data
   Comprehensive biographical and historical data
   ========================================================================== */

const earlyLifeFeatures = [
    { icon: '👑', title: 'Royal Lineage', desc: 'Born into the Kapurthala royal family as the youngest of ten children, with a Sikh prince father and English mother, giving her a unique multicultural perspective.' },
    { icon: '🌍', title: 'Multicultural Upbringing', desc: 'Raised in a household that blended Indian royal traditions with Western education and Christian values, shaping her cosmopolitan worldview.' },
    { icon: '📚', title: 'Early Education', desc: 'Received excellent education both in India and England, attending Sherborne School for Girls and later studying at Oxford University.' },
    { icon: '🎓', title: 'Academic Excellence', desc: 'Excelled in her studies, developing strong interests in social issues, healthcare, and women\'s rights during her formative years.' },
    { icon: '🏠', title: 'Family Values', desc: 'Despite royal privilege, her family emphasized service, education, and social responsibility, values that would guide her entire life.' },
    { icon: '✝️', title: 'Religious Background', desc: 'Raised as a Christian in a predominantly Hindu and Sikh environment, giving her unique insights into India\'s religious diversity.' }
];

const educationGrid = [
    { icon: '🏫', title: 'Sherborne School', desc: 'Attended this prestigious girls\' school in England, receiving a classical British education that emphasized critical thinking and leadership.' },
    { icon: '🎓', title: 'Oxford University', desc: 'Studied at Oxford, where she was exposed to progressive ideas about social reform, women\'s rights, and political activism.' },
    { icon: '📖', title: 'Self-Education', desc: 'Continued learning throughout her life, studying Indian philosophy, Gandhian principles, and public health systems.' },
    { icon: '🌐', title: 'International Exposure', desc: 'Her education in England gave her international perspective and connections that would later serve India in global forums.' },
    { icon: '🗣️', title: 'Language Skills', desc: 'Fluent in English, Hindi, Punjabi, and other Indian languages, enabling her to connect with diverse communities across India.' },
    { icon: '💡', title: 'Intellectual Development', desc: 'Developed strong analytical skills and deep understanding of social issues that would inform her policy work later.' }
];

const freedomFeatures = [
    { icon: '🤝', title: 'Meeting Gandhi (1919)', desc: 'The pivotal moment when she met Mahatma Gandhi and was deeply influenced by his philosophy of non-violence, truth, and service to the nation.' },
    { icon: '✊', title: 'Joining Freedom Struggle', desc: 'Abandoned her comfortable royal life to actively participate in the independence movement, embracing simplicity and austerity.' },
    { icon: '📝', title: 'Gandhi\'s Secretary', desc: 'Served as Gandhi\'s personal secretary for many years, managing his correspondence and accompanying him on tours across India.' },
    { icon: '🚶‍♀️', title: 'Salt Satyagraha', desc: 'Actively participated in the Salt March and other civil disobedience movements, facing imprisonment multiple times for the cause.' },
    { icon: '⛓️', title: 'Imprisonment', desc: 'Was arrested and imprisoned several times by British authorities for her participation in freedom movement activities.' },
    { icon: '🗣️', title: 'Public Speaking', desc: 'Became a powerful orator, speaking at public meetings and inspiring many, especially women, to join the freedom struggle.' }
];

const freedomContributions = [
    { icon: '🎯', title: 'Organizing Campaigns', desc: 'Played key roles in organizing various Congress campaigns, managing logistics, communications, and volunteer coordination.' },
    { icon: '👥', title: 'Mobilizing Women', desc: 'Instrumental in mobilizing women across India to participate in the freedom movement, breaking traditional barriers.' },
    { icon: '📰', title: 'Publicity Work', desc: 'Managed publicity and communications for the Congress party, ensuring the movement\'s message reached masses.' },
    { icon: '🌍', title: 'International Advocacy', desc: 'Represented the Indian freedom movement at international forums, building global support for India\'s independence.' },
    { icon: '🏥', title: 'Relief Work', desc: 'Organized relief efforts during famines, epidemics, and natural disasters, demonstrating commitment to public welfare.' },
    { icon: '🤲', title: 'Social Service', desc: 'Engaged in extensive social work, particularly in rural areas, addressing issues of poverty, health, and education.' }
];

const womensRightsFeatures = [
    { icon: '👩‍🎓', title: 'Women\'s Education', desc: 'Championed women\'s access to education at all levels, from primary schools to higher education institutions.' },
    { icon: '⚖️', title: 'Legal Rights', desc: 'Advocated for women\'s legal rights, including property rights, marriage laws, and protection against discrimination.' },
    { icon: '🏥', title: 'Women\'s Health', desc: 'Focused on women\'s healthcare needs, maternal health, and access to medical services for women and children.' },
    { icon: '💼', title: 'Economic Empowerment', desc: 'Promoted women\'s economic independence through skill development, employment opportunities, and entrepreneurship.' },
    { icon: '🗳️', title: 'Political Participation', desc: 'Encouraged and facilitated women\'s participation in politics and governance at all levels.' },
    { icon: '👭', title: 'Social Reform', desc: 'Worked against social evils affecting women, including child marriage, purdah system, and gender discrimination.' }
];

const womensOrganizations = [
    { icon: '🏛️', title: 'All India Women\'s Conference', desc: 'Served as President of AIWC, one of the oldest and most influential women\'s organizations in India.' },
    { icon: '👩‍⚕️', title: 'Lady Hardinge Medical College', desc: 'Instrumental in establishing and developing this premier medical college for women in Delhi.' },
    { icon: '🎓', title: 'Women\'s Educational Society', desc: 'Founded and supported various educational institutions specifically for women and girls.' },
    { icon: '🏥', title: 'Tuberculosis Association', desc: 'Led the Indian Tuberculosis Association, focusing on women\'s and children\'s health issues.' },
    { icon: '👶', title: 'Child Welfare Organizations', desc: 'Active in organizations promoting child welfare, nutrition, and healthcare for children.' },
    { icon: '🤱', title: 'Maternal Health Initiatives', desc: 'Established programs focusing on maternal health, prenatal care, and safe childbirth practices.' }
];

const healthMinisterFeatures = [
    { icon: '🏛️', title: 'First Health Minister', desc: 'Appointed as India\'s first Health Minister in 1947, serving in Nehru\'s cabinet for a decade until 1957.' },
    { icon: '📋', title: 'Health Policy Framework', desc: 'Developed comprehensive health policies that laid the foundation for India\'s public health system.' },
    { icon: '🏥', title: 'AIIMS Establishment', desc: 'Played pivotal role in establishing the All India Institute of Medical Sciences (AIIMS) in New Delhi.' },
    { icon: '👩‍⚕️', title: 'Nursing Education', desc: 'Revolutionized nursing education in India, establishing standards and institutions for nursing training.' },
    { icon: '🌍', title: 'WHO Leadership', desc: 'Represented India at the World Health Organization and served as President of the World Health Assembly.' },
    { icon: '💊', title: 'Pharmaceutical Policy', desc: 'Developed policies for pharmaceutical industry growth and essential medicines availability.' }
];

const healthPolicies = [
    { icon: '🏥', title: 'Hospital Infrastructure', desc: 'Expanded hospital infrastructure across India, particularly in rural and underserved areas.' },
    { icon: '👨‍⚕️', title: 'Medical Education', desc: 'Reformed medical education system, establishing new medical colleges and improving standards.' },
    { icon: '💉', title: 'Disease Control Programs', desc: 'Launched major disease control programs for malaria, tuberculosis, and other infectious diseases.' },
    { icon: '🌿', title: 'Traditional Medicine', desc: 'Promoted integration of traditional Indian medicine systems (Ayurveda, Unani) with modern medicine.' },
    { icon: '👶', title: 'Child Health Programs', desc: 'Initiated comprehensive child health programs including immunization and nutrition initiatives.' },
    { icon: '🤰', title: 'Maternal Health', desc: 'Established maternal health programs to reduce maternal mortality and improve prenatal care.' }
];

const publicHealthFeatures = [
    { icon: '🏘️', title: 'Rural Health Focus', desc: 'Emphasized rural healthcare delivery, establishing primary health centers and training rural health workers.' },
    { icon: '🔬', title: 'Research Institutions', desc: 'Established medical research institutions to address India-specific health challenges.' },
    { icon: '💧', title: 'Sanitation Programs', desc: 'Promoted sanitation and clean water initiatives to prevent waterborne diseases.' },
    { icon: '🍎', title: 'Nutrition Programs', desc: 'Developed nutrition programs to address malnutrition, particularly among children and pregnant women.' },
    { icon: '📊', title: 'Health Statistics', desc: 'Established systems for collecting and analyzing health data to inform policy decisions.' },
    { icon: '🎓', title: 'Public Health Training', desc: 'Created training programs for public health professionals and community health workers.' }
];

const healthInitiatives = [
    { icon: '🏥', title: 'Primary Health Centers', desc: 'Established network of primary health centers to provide basic healthcare in rural areas.' },
    { icon: '💉', title: 'Immunization Programs', desc: 'Launched nationwide immunization programs against major childhood diseases.' },
    { icon: '🔬', title: 'Medical Research Council', desc: 'Strengthened the Indian Council of Medical Research to promote health research.' },
    { icon: '👩‍⚕️', title: 'Nursing Council', desc: 'Established the Indian Nursing Council to standardize nursing education and practice.' },
    { icon: '💊', title: 'Drug Control', desc: 'Implemented drug control measures to ensure quality and availability of essential medicines.' },
    { icon: '🏥', title: 'Mental Health', desc: 'Initiated programs for mental health awareness and establishment of mental health facilities.' }
];

const institutionsGrid = [
    { icon: '🏥', title: 'AIIMS New Delhi', desc: 'All India Institute of Medical Sciences, established in 1956, is today one of India\'s premier medical institutions.' },
    { icon: '👩‍⚕️', title: 'Lady Hardinge Medical College', desc: 'Premier medical college for women in Delhi, expanded and modernized under her leadership.' },
    { icon: '🔬', title: 'ICMR', desc: 'Indian Council of Medical Research, strengthened to promote medical research addressing Indian health issues.' },
    { icon: '👩‍⚕️', title: 'Indian Nursing Council', desc: 'Established to regulate nursing education and maintain standards across the country.' },
    { icon: '🏥', title: 'TB Research Centers', desc: 'Established specialized tuberculosis research and treatment centers across India.' },
    { icon: '💊', title: 'Pharmacy Council', desc: 'Supported establishment of Pharmacy Council to regulate pharmaceutical education and practice.' }
];

const timeline = [
    { year: '1889', title: 'Birth', desc: 'Born on February 2 in Lucknow to Raja Harnam Singh of Kapurthala and Priscilla.' },
    { year: '1900s', title: 'Education in England', desc: 'Attends Sherborne School for Girls and later studies at Oxford University.' },
    { year: '1919', title: 'Meets Gandhi', desc: 'Life-changing meeting with Mahatma Gandhi, begins involvement in freedom movement.' },
    { year: '1930', title: 'Salt Satyagraha', desc: 'Actively participates in the Salt March and civil disobedience movements.' },
    { year: '1937', title: 'AIWC President', desc: 'Becomes President of All India Women\'s Conference, leading women\'s movement.' },
    { year: '1947', title: 'First Health Minister', desc: 'Appointed as independent India\'s first Health Minister in Nehru\'s cabinet.' },
    { year: '1948', title: 'WHO Leadership', desc: 'Represents India at WHO, later serves as President of World Health Assembly.' },
    { year: '1952', title: 'Nursing Council', desc: 'Establishes Indian Nursing Council to standardize nursing education.' },
    { year: '1956', title: 'AIIMS Established', desc: 'All India Institute of Medical Sciences inaugurated in New Delhi.' },
    { year: '1957', title: 'Retirement', desc: 'Retires from cabinet after decade of service as Health Minister.' },
    { year: '1964', title: 'Passing', desc: 'Passes away on February 6, leaving behind enduring legacy in public health.' }
];

const legacyFeatures = [
    { icon: '🏥', title: 'Healthcare System', desc: 'The public healthcare system she built continues to serve millions of Indians through AIIMS, medical colleges, and health centers.' },
    { icon: '👩‍⚕️', title: 'Nursing Profession', desc: 'Her reforms transformed nursing into a respected profession with standardized education and practice.' },
    { icon: '🌍', title: 'Global Health Leadership', desc: 'India\'s active role in global health forums traces back to her pioneering international engagement.' },
    { icon: '📚', title: 'Medical Education', desc: 'The medical education system she established continues to produce quality healthcare professionals.' },
    { icon: '🔬', title: 'Research Infrastructure', desc: 'Medical research institutions she strengthened continue to address India\'s health challenges.' },
    { icon: '👥', title: 'Women in Medicine', desc: 'Her advocacy opened doors for generations of women to enter medical and healthcare professions.' }
];

const legacyImpact = [
    { icon: '🏥', title: 'AIIMS Network', desc: 'The AIIMS model she pioneered has expanded to multiple cities, providing premier medical education and care.' },
    { icon: '👩‍⚕️', title: 'Nursing Standards', desc: 'Nursing standards and education system she established continue to guide the profession today.' },
    { icon: '💊', title: 'Health Policies', desc: 'Many health policies and programs she initiated remain cornerstones of India\'s health system.' },
    { icon: '🌍', title: 'International Recognition', desc: 'India\'s reputation in global health governance builds on foundations she laid.' },
    { icon: '📊', title: 'Health Data Systems', desc: 'Health statistics and surveillance systems she established continue to inform policy.' },
    { icon: '🎓', title: 'Educational Legacy', desc: 'Medical and nursing institutions she built continue to train healthcare professionals.' }
];

const galleryData = [
    { src: 'https://placehold.co/400x400/6A4C93/fff?text=Rajkumari+Amrit+Kaur', alt: 'Rajkumari Amrit Kaur portrait', caption: 'Official portrait of Rajkumari Amrit Kaur, India\'s first Health Minister' },
    { src: 'https://placehold.co/400x400/D4AF37/1A0F2E?text=With+Gandhi', alt: 'Amrit Kaur with Mahatma Gandhi', caption: 'Rajkumari Amrit Kaur with Mahatma Gandhi during freedom movement' },
    { src: 'https://placehold.co/400x400/008080/fff?text=Health+Minister', alt: 'As Health Minister', caption: 'Rajkumari Amrit Kaur serving as India\'s first Health Minister' },
    { src: 'https://placehold.co/400x400/6A4C93/fff?text=AIIMS+Inauguration', alt: 'AIIMS inauguration', caption: 'Inauguration of AIIMS New Delhi, one of her greatest achievements' },
    { src: 'https://placehold.co/400x400/D4AF37/1A0F2E?text=WHO+Assembly', alt: 'At World Health Assembly', caption: 'Representing India at the World Health Assembly' },
    { src: 'https://placehold.co/400x400/008080/fff?text=Nursing+Education', alt: 'Promoting nursing education', caption: 'Championing nursing education and professional development' },
    { src: 'https://placehold.co/400x400/6A4C93/fff?text=Freedom+Movement', alt: 'In freedom movement', caption: 'Active participation in India\'s freedom struggle' },
    { src: 'https://placehold.co/400x400/D4AF37/1A0F2E?text=Womens+Rights', alt: 'Advocating women\'s rights', caption: 'Leading advocacy for women\'s rights and empowerment' },
    { src: 'https://placehold.co/400x400/008080/fff?text=Rural+Health', alt: 'Promoting rural health', caption: 'Visiting rural health centers to promote healthcare access' },
    { src: 'https://placehold.co/400x400/6A4C93/fff?text=International+Forum', alt: 'At international forum', caption: 'Representing India at international health forums' },
    { src: 'https://placehold.co/400x400/D4AF37/1A0F2E?text=Medical+College', alt: 'At medical college', caption: 'Supporting medical education and institution building' },
    { src: 'https://placehold.co/400x400/008080/fff?text=Public+Health', alt: 'Public health initiatives', caption: 'Leading public health initiatives across India' }
];
