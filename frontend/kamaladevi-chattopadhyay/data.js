/* ==========================================================================
   Kamaladevi Chattopadhyay Data
   Comprehensive biographical and cultural data
   ========================================================================== */

const earlyLifeFeatures = [
    { icon: '🏡', title: 'Mangalore Roots', desc: 'Born in Mangalore to a Saraswat Brahmin family with progressive values, exposed to social reform movements from childhood.' },
    { icon: '👩', title: 'Mother\'s Influence', desc: 'Her mother Girijabai was a remarkable woman who valued independence and instilled strong principles in her children.' },
    { icon: '📚', title: 'Literary Environment', desc: 'Grew up surrounded by literature, music, and intellectual discussions that shaped her aesthetic sensibilities.' },
    { icon: '🌿', title: 'Early Widowhood', desc: 'Married at 14 and widowed soon after, which sparked her early questioning of social customs and women\'s rights.' },
    { icon: '🎭', title: 'Cultural Exposure', desc: 'Early exposure to Yakshagana and other folk traditions planted seeds for her lifelong love of Indian arts.' },
    { icon: '🌍', title: 'Nationalist Awakening', desc: 'The freedom movement\'s call reached her young mind through family discussions and public gatherings.' }
];

const educationGrid = [
    { icon: '🎓', title: 'Formal Studies', desc: 'Pursued education in Madras and later London, where she was exposed to Western feminist thought.' },
    { icon: '📖', title: 'Philosophy Studies', desc: 'Studied philosophy which shaped her intellectual approach to social and cultural questions.' },
    { icon: '🗣️', title: 'Multilingual Mastery', desc: 'Fluent in English, Hindi, Kannada, and other languages, enabling her to connect across India\'s diversity.' },
    { icon: '💭', title: 'Critical Thinking', desc: 'Education developed her ability to critically analyze both Indian traditions and Western influences.' },
    { icon: '🌐', title: 'International Perspective', desc: 'London years gave her global perspective while deepening her commitment to Indian culture.' },
    { icon: '✍️', title: 'Writing Skills', desc: 'Became a prolific writer whose works on crafts, culture, and feminism remain influential.' }
];

const freedomFeatures = [
    { icon: '🧂', title: 'Salt Satyagraha (1930)', desc: 'Became the first woman arrested in the Salt Satyagraha when she attempted to sell contraband salt at Bombay beach.' },
    { icon: '⛓️', title: 'Multiple Imprisonments', desc: 'Faced arrest and imprisonment several times for nationalist activities, demonstrating remarkable courage.' },
    { icon: '📢', title: 'Public Speaking', desc: 'Traveled extensively across India giving speeches that inspired thousands to join the freedom movement.' },
    { icon: '🎯', title: 'Congress Leadership', desc: 'Held various leadership positions in the Congress party, bringing women\'s perspectives to decision-making.' },
    { icon: '📰', title: 'Journalism', desc: 'Used journalism as a tool for nationalist propaganda, writing for various publications.' },
    { icon: '👥', title: 'Mass Mobilization', desc: 'Excelled at mobilizing women and youth for the freedom struggle across different regions.' }
];

const freedomContributions = [
    { icon: '🚩', title: 'Lahore Congress Session', desc: 'Famously grabbed the national flag from a delegate when it was being forcibly taken by British police in 1930.' },
    { icon: '🗳️', title: 'Election Campaigns', desc: 'Organized and campaigned for Congress candidates in crucial elections during the freedom struggle.' },
    { icon: '📝', title: 'Political Writing', desc: 'Authored numerous articles and pamphlets explaining Congress policies and nationalist ideology.' },
    { icon: '🤝', title: 'Unity Building', desc: 'Worked across communal and regional lines to build unity within the freedom movement.' },
    { icon: '🎭', title: 'Cultural Resistance', desc: 'Used theater and arts as forms of cultural resistance against colonial domination.' },
    { icon: '🌍', title: 'International Advocacy', desc: 'Represented Indian nationalism at international forums, building global support for independence.' }
];

const womensFeatures = [
    { icon: '🏛️', title: 'AIWC Presidency', desc: 'Served as President of All India Women\'s Conference, transforming it into a powerful voice for women\'s rights.' },
    { icon: '⚖️', title: 'Legal Reforms', desc: 'Advocated for reforms in marriage, inheritance, and property laws to improve women\'s legal status.' },
    { icon: '🎓', title: 'Women\'s Education', desc: 'Championed women\'s access to education at all levels, from primary schools to universities.' },
    { icon: '💼', title: 'Economic Independence', desc: 'Believed women\'s liberation required economic independence through crafts and employment.' },
    { icon: '🗳️', title: 'Political Participation', desc: 'Fought for women\'s right to vote and hold political office in independent India.' },
    { icon: '👭', title: 'Sisterhood Building', desc: 'Built networks among women across class and caste lines to create a united women\'s movement.' }
];

const womensInitiatives = [
    { icon: '🏠', title: 'Women\'s Cooperatives', desc: 'Established cooperatives where women could work together and earn independent incomes.' },
    { icon: '🎨', title: 'Craft Training', desc: 'Set up training centers teaching women traditional crafts as means of economic empowerment.' },
    { icon: '📚', title: 'Literacy Programs', desc: 'Organized adult literacy programs specifically targeting women who had been denied education.' },
    { icon: '⚕️', title: 'Healthcare Access', desc: 'Advocated for women\'s healthcare and maternal health programs across the country.' },
    { icon: '🏦', title: 'Financial Inclusion', desc: 'Worked to give women access to credit and financial services through cooperatives.' },
    { icon: '👩‍🏫', title: 'Leadership Training', desc: 'Trained women to take on leadership roles in communities and political organizations.' }
];

const handicraftsFeatures = [
    { icon: '🎨', title: 'All India Handicrafts Board', desc: 'Chaired the Board for over 25 years, transforming it into the premier institution for crafts development.' },
    { icon: '🏪', title: 'State Emporia Network', desc: 'Established network of state emporia across India to market artisans\' products directly to consumers.' },
    { icon: '🏆', title: 'National Awards', desc: 'Instituted National Awards for Master Craftspersons, giving artisans recognition and dignity.' },
    { icon: '📋', title: 'Craft Surveys', desc: 'Commissioned comprehensive surveys documenting craft traditions across all regions of India.' },
    { icon: '🎯', title: 'Quality Standards', desc: 'Established quality standards and marks of authenticity for handicraft products.' },
    { icon: '🌍', title: 'Global Markets', desc: 'Opened international markets for Indian handicrafts through exhibitions and trade missions.' }
];

const handicraftsPrograms = [
    { icon: '🧱', title: 'Terracotta Revival', desc: 'Revived dying terracotta traditions in rural Bengal, Rajasthan, and other regions.' },
    { icon: '🪵', title: 'Wood Carving', desc: 'Supported wood carving traditions in Kashmir, Karnataka, and other wood-working regions.' },
    { icon: '🧵', title: 'Embroidery Preservation', desc: 'Preserved regional embroidery traditions like Chikankari, Kantha, Phulkari, and Kasuti.' },
    { icon: '🪙', title: 'Metal Craft Support', desc: 'Supported Bidri, Dokra, and other metal craft traditions across India.' },
    { icon: '🎭', title: 'Folk Art Documentation', desc: 'Documented folk painting traditions like Madhubani, Warli, and Pattachitra.' },
    { icon: '🪨', title: 'Stone Craft', desc: 'Revived stone carving traditions particularly in Odisha and Rajasthan.' }
];

const handloomFeatures = [
    { icon: '🧵', title: 'Cooperatives Formation', desc: 'Established handloom cooperatives giving weavers collective bargaining power.' },
    { icon: '🏪', title: 'Co-optex Movement', desc: 'Helped establish Co-optex stores that marketed handloom products directly to consumers.' },
    { icon: '🎯', title: 'Design Innovation', desc: 'Encouraged design innovation while preserving traditional weaving techniques.' },
    { icon: '📊', title: 'Market Research', desc: 'Commissioned market research to understand consumer preferences and adapt accordingly.' },
    { icon: '👨‍🏫', title: 'Weaver Training', desc: 'Established training programs for new generations of weavers.' },
    { icon: '💰', title: 'Fair Pricing', desc: 'Worked to ensure weavers received fair prices for their labor-intensive work.' }
];

const handloomTraditions = [
    { icon: '🌸', title: 'Banarasi Brocades', desc: 'Preserved the magnificent brocade traditions of Varanasi with their intricate gold and silver work.' },
    { icon: '🎨', title: 'Pochampally Ikat', desc: 'Supported the unique ikat traditions of Andhra Pradesh with their geometric patterns.' },
    { icon: '🌊', title: 'Patola of Gujarat', desc: 'Worked to preserve the complex double ikat Patola weaving tradition of Patan.' },
    { icon: '🦋', title: 'Chanderi Weaves', desc: 'Revived the gossamer-fine Chanderi weaves of Madhya Pradesh.' },
    { icon: '🏵️', title: 'Kanjivaram Silks', desc: 'Supported the temple silk traditions of Tamil Nadu\'s Kanjivaram weavers.' },
    { icon: '🌿', title: 'Khadi Movement', desc: 'Integrated Gandhi\'s khadi movement with broader handloom revival efforts.' }
];

const institutionsGrid = [
    { icon: '🎭', title: 'Sangeet Natak Akademi', desc: 'Founded in 1953, India\'s national academy for music, dance, and drama, preserving performing arts traditions.' },
    { icon: '🎨', title: 'National School of Drama', desc: 'Established premier institution for theater education and training in Delhi.' },
    { icon: '🧵', title: 'Crafts Council of India', desc: 'Founded the apex body for crafts development, continuing her vision for artisan welfare.' },
    { icon: '🏛️', title: 'Central Cottage Industries Emporium', desc: 'Established the flagship emporium in Delhi that became the model for state emporia nationwide.' },
    { icon: '🏺', title: 'Calico Museum, Ahmedabad', desc: 'Helped establish this museum documenting India\'s rich textile heritage.' },
    { icon: '🎓', title: 'Theatre Unit, Mumbai', desc: 'Founded the pioneering theater group that nurtured modern Indian drama.' }
];

const timeline = [
    { year: '1903', title: 'Birth', desc: 'Born on April 3 in Mangalore to a progressive Saraswat Brahmin family.' },
    { year: '1917', title: 'Early Marriage', desc: 'Married at age 14 to Krishna Rao, widowed within two years.' },
    { year: '1923', title: 'Second Marriage', desc: 'Married freedom fighter Purushottam Trikamdas, entering nationalist circles.' },
    { year: '1926', title: 'London Studies', desc: 'Travels to London to study, exposed to feminist and socialist thought.' },
    { year: '1930', title: 'Salt Satyagraha', desc: 'Becomes first woman arrested in Salt Satyagraha at Bombay beach.' },
    { year: '1936', title: 'AIWC President', desc: 'Elected President of All India Women\'s Conference, begins major reform work.' },
    { year: '1947', title: 'Independence', desc: 'Witnesses independence and begins work on cultural reconstruction.' },
    { year: '1952', title: 'Handicrafts Board', desc: 'Becomes chairperson of All India Handicrafts Board, begins 25-year tenure.' },
    { year: '1953', title: 'Sangeet Natak Akademi', desc: 'Instrumental in establishing India\'s national academy for performing arts.' },
    { year: '1964', title: 'Crafts Council', desc: 'Helps establish Crafts Council of India to continue crafts revival work.' },
    { year: '1974', title: 'Padma Vibhushan', desc: 'Awarded Padma Vibhushan, India\'s second-highest civilian honor.' },
    { year: '1988', title: 'Passing', desc: 'Passes away on October 29, leaving behind enduring cultural legacy.' }
];

const legacyFeatures = [
    { icon: '🎨', title: 'Living Crafts', desc: 'Indian handicrafts today are vibrant industries sustaining millions of artisans, thanks to her foundational work.' },
    { icon: '🧵', title: 'Handloom Survival', desc: 'Handloom weaving survived industrialization through the cooperatives and institutions she established.' },
    { icon: '🏛️', title: 'Cultural Institutions', desc: 'The institutions she founded continue to nurture India\'s artistic traditions and talent.' },
    { icon: '👩', title: 'Women\'s Empowerment', desc: 'Her model of connecting crafts with women\'s economic independence continues to inspire programs.' },
    { icon: '🌍', title: 'Global Recognition', desc: 'Indian crafts have gained global prestige due to the foundations she laid.' },
    { icon: '📚', title: 'Intellectual Legacy', desc: 'Her writings on culture, crafts, and feminism remain essential reading.' }
];

const legacyImpact = [
    { icon: '👩‍🎨', title: 'Women Artisans', desc: 'Millions of women artisans earn dignified livelihoods through crafts she helped preserve.' },
    { icon: '🏪', title: 'Emporia Network', desc: 'State emporia across India continue to market traditional crafts using her model.' },
    { icon: '🏆', title: 'National Awards', desc: 'National Awards for Master Craftspersons continue to recognize artisan excellence.' },
    { icon: '🎭', title: 'Performing Arts', desc: 'Sangeet Natak Akademi continues to nurture India\'s music, dance, and drama traditions.' },
    { icon: '🎨', title: 'Craft Education', desc: 'Craft education programs across India follow principles she established.' },
    { icon: '🌐', title: 'UNESCO Recognition', desc: 'Many Indian crafts now have UNESCO recognition, building on her advocacy.' }
];

const galleryData = [
    { src: 'https://placehold.co/400x400/C1440E/fff?text=Kamaladevi+Portrait', alt: 'Kamaladevi Chattopadhyay portrait', caption: 'Official portrait of Kamaladevi Chattopadhyay' },
    { src: 'https://placehold.co/400x400/F9A825/2C1810?text=Salt+Satyagraha', alt: 'At Salt Satyagraha', caption: 'First woman arrested in the Salt Satyagraha movement' },
    { src: 'https://placehold.co/400x400/3F51B5/fff?text=With+Artisans', alt: 'With artisans', caption: 'Working with traditional artisans to revive crafts' },
    { src: 'https://placehold.co/400x400/C1440E/fff?text=Handicrafts+Board', alt: 'At Handicrafts Board', caption: 'Chairing the All India Handicrafts Board' },
    { src: 'https://placehold.co/400x400/F9A825/2C1810?text=Craft+Exhibition', alt: 'At craft exhibition', caption: 'Inaugurating a handicrafts exhibition' },
    { src: 'https://placehold.co/400x400/3F51B5/fff?text=AIWC+Meeting', alt: 'AIWC meeting', caption: 'Presiding over All India Women\'s Conference meeting' },
    { src: 'https://placehold.co/400x400/C1440E/fff?text=With+Gandhi', alt: 'With Mahatma Gandhi', caption: 'With Mahatma Gandhi during freedom movement' },
    { src: 'https://placehold.co/400x400/F9A825/2C1810?text=Weavers+Visit', alt: 'Visiting weavers', caption: 'Visiting handloom weavers in rural India' },
    { src: 'https://placehold.co/400x400/3F51B5/fff?text=Cottage+Emporium', alt: 'At Cottage Emporium', caption: 'At the Central Cottage Industries Emporium in Delhi' },
    { src: 'https://placehold.co/400x400/C1440E/fff?text=UNESCO+Forum', alt: 'At UNESCO forum', caption: 'Representing India at UNESCO cultural forums' },
    { src: 'https://placehold.co/400x400/F9A825/2C1810?text=Award+Ceremony', alt: 'At award ceremony', caption: 'Presenting National Award to a master craftsperson' },
    { src: 'https://placehold.co/400x400/3F51B5/fff?text=Theater+Unit', alt: 'With Theater Unit', caption: 'With members of the pioneering Theatre Unit in Mumbai' }
];
