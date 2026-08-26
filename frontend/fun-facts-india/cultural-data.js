/* =========================================================
   Fun Cultural Facts of India — A to Z
   Data
========================================================= */

export const CULTURAL_DATA = {

    /* =====================================================
       ALPHABET
    ===================================================== */

    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),

    /* =====================================================
       CATEGORIES
    ===================================================== */

    categories: [
        'Food',
        'Festivals',
        'Art & Craft',
        'Traditions',
        'Languages',
        'History',
        'Nature',
        'Music & Dance',
        'Architecture',
        'Everyday Life'
    ],

    /* =====================================================
       CULTURAL FACTS
    ===================================================== */

    facts: [

        {
            id: 'a',
            letter: 'A',
            title: 'Aipan Art',
            category: 'Art & Craft',
            state: 'Uttarakhand',
            region: 'North India',

            fact: 'Aipan is a traditional decorative art from Uttarakhand, created using geometric patterns and designs on floors and walls.',

            explanation:
                'Aipan designs are traditionally made during festivals, ceremonies, and other auspicious occasions. The patterns often carry symbolic meanings and are closely connected with Kumaoni culture.',

            image:
                'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Kumaoni Culture',
                'Traditional Art',
                'Uttarakhand',
                'Folk Designs'
            ]
        },

        {
            id: 'b',
            letter: 'B',
            title: 'Bharatanatyam',
            category: 'Music & Dance',
            state: 'Tamil Nadu',
            region: 'South India',

            fact: 'Bharatanatyam is one of India’s oldest classical dance traditions and is strongly associated with Tamil Nadu.',

            explanation:
                'The dance combines expressive gestures, rhythmic footwork, storytelling, music, and elaborate costumes. Many performances draw inspiration from Indian mythology and devotional traditions.',

            image:
                'https://images.unsplash.com/photo-1597149664418-5c2a6f0e0e45?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Classical Dance',
                'Tamil Nadu',
                'Indian Music',
                'Temple Culture'
            ]
        },

        {
            id: 'c',
            letter: 'C',
            title: 'Chai',
            category: 'Everyday Life',
            state: 'Pan-India',
            region: 'Across India',

            fact: 'Chai is more than a drink in India — it is often an excuse to pause, talk, meet friends, and share stories.',

            explanation:
                'Indian tea culture includes countless regional variations. Masala chai, ginger tea, cardamom tea, and milk tea are enjoyed in homes, offices, railway stations, roadside stalls, and cafés.',

            image:
                'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Indian Tea',
                'Street Food',
                'Hospitality',
                'Daily Life'
            ]
        },

        {
            id: 'd',
            letter: 'D',
            title: 'Diwali',
            category: 'Festivals',
            state: 'Pan-India',
            region: 'Across India',

            fact: 'Diwali is one of India’s most widely celebrated festivals and is popularly known as the festival of lights.',

            explanation:
                'Homes are decorated with lamps, rangoli, flowers, and lights. Families gather together, exchange sweets and gifts, and celebrate the festival in different ways across Indias regions.',

            image:
                'https://images.unsplash.com/photo-1604608672516-f1b5f2c4b7c4?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Festivals',
                'Rangoli',
                'Indian Sweets',
                'Traditional Celebrations'
            ]
        },

        {
            id: 'e',
            letter: 'E',
            title: 'Eid Celebrations',
            category: 'Festivals',
            state: 'Pan-India',
            region: 'Across India',

            fact: 'Eid celebrations in India bring families and communities together through prayers, festive meals, sweets, and new clothes.',

            explanation:
                'Indian Eid traditions vary between regions and communities. Sharing food and visiting friends and relatives are important parts of the celebration.',

            image:
                'https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Festivals',
                'Indian Cuisine',
                'Community',
                'Mosques'
            ]
        },

        {
            id: 'f',
            letter: 'F',
            title: 'Folk Music',
            category: 'Music & Dance',
            state: 'Pan-India',
            region: 'Across India',

            fact: 'India has hundreds of folk music traditions, many of which are closely connected to local stories, occupations, festivals, and communities.',

            explanation:
                'From Rajasthani folk songs to Baul music of Bengal and Bihu songs of Assam, folk traditions reflect the everyday experiences and cultural identities of different regions.',

            image:
                'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Folk Music',
                'Regional Culture',
                'Traditional Instruments',
                'Dance'
            ]
        },

        {
            id: 'g',
            letter: 'G',
            title: 'Ghoomar',
            category: 'Music & Dance',
            state: 'Rajasthan',
            region: 'West India',

            fact: 'Ghoomar is a traditional Rajasthani folk dance known for its graceful circular movements and colourful costumes.',

            explanation:
                'Dancers traditionally move in circles while their colourful skirts create beautiful patterns as they turn. The dance is associated with celebrations and social occasions.',

            image:
                'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Rajasthan',
                'Folk Dance',
                'Traditional Clothing',
                'Music'
            ]
        },

        {
            id: 'h',
            letter: 'H',
            title: 'Handloom',
            category: 'Art & Craft',
            state: 'Pan-India',
            region: 'Across India',

            fact: 'India has a remarkable variety of handloom traditions, with different regions developing their own fabrics, weaving styles, and patterns.',

            explanation:
                'Banarasi silk, Kanchipuram silk, Assam’s muga silk, Odisha’s ikat, and many other textiles demonstrate the diversity of Indian weaving traditions.',

            image:
                'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Textiles',
                'Weaving',
                'Traditional Clothing',
                'Handicrafts'
            ]
        },

        {
            id: 'i',
            letter: 'I',
            title: 'Indian Languages',
            category: 'Languages',
            state: 'Pan-India',
            region: 'Across India',

            fact: 'India is home to a vast number of languages and dialects, making its linguistic landscape one of the most diverse in the world.',

            explanation:
                'Languages belonging to several language families are spoken across the country. Hindi, Bengali, Telugu, Marathi, Tamil, Urdu, Gujarati, Kannada, Malayalam, Punjabi, Assamese and many others have rich literary traditions.',

            image:
                'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Indian Languages',
                'Literature',
                'Scripts',
                'Regional Identity'
            ]
        },

        {
            id: 'j',
            letter: 'J',
            title: 'Jalebi',
            category: 'Food',
            state: 'Pan-India',
            region: 'Across India',

            fact: 'Jalebi is a popular Indian sweet made by frying spirals of batter and soaking them in sugar syrup.',

            explanation:
                'Jalebi is enjoyed across India and is especially popular during festivals, celebrations, weddings, and as a street-side treat.',

            image:
                'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Indian Sweets',
                'Street Food',
                'Festivals',
                'Desserts'
            ]
        },

        {
            id: 'k',
            letter: 'K',
            title: 'Kathak',
            category: 'Music & Dance',
            state: 'Uttar Pradesh',
            region: 'North India',

            fact: 'Kathak is a major Indian classical dance form famous for rhythmic footwork, spins, storytelling, and expressive gestures.',

            explanation:
                'The tradition developed through several historical influences and became associated with both temple and court traditions. Its performers use intricate rhythms and expressive storytelling.',

            image:
                'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Classical Dance',
                'Uttar Pradesh',
                'Storytelling',
                'Indian Music'
            ]
        },

        {
            id: 'l',
            letter: 'L',
            title: 'Lassi',
            category: 'Food',
            state: 'Punjab',
            region: 'North India',

            fact: 'Lassi is a traditional yogurt-based drink that is especially popular in northern India.',

            explanation:
                'It can be sweet, salty, or flavoured with ingredients such as fruit, spices, or saffron. It is particularly refreshing during hot weather.',

            image:
                'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Punjabi Food',
                'Dairy',
                'Indian Drinks',
                'Street Food'
            ]
        },

        {
            id: 'm',
            letter: 'M',
            title: 'Madhubani Painting',
            category: 'Art & Craft',
            state: 'Bihar',
            region: 'East India',

            fact: 'Madhubani painting is a colourful folk art tradition associated with the Mithila region of Bihar.',

            explanation:
                'Traditional paintings often feature nature, mythology, geometric patterns, animals, and symbolic motifs. Artists traditionally use bold outlines and vibrant colours.',

            image:
                'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Bihar',
                'Folk Art',
                'Mithila',
                'Indian Painting'
            ]
        },

        {
            id: 'n',
            letter: 'N',
            title: 'Namaste',
            category: 'Traditions',
            state: 'Pan-India',
            region: 'Across India',

            fact: 'Namaste is a traditional Indian greeting commonly performed by bringing the palms together in front of the chest.',

            explanation:
                'The gesture is used in many Indian cultural settings and can express greeting, respect, gratitude, or acknowledgement.',

            image:
                'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Indian Greetings',
                'Traditions',
                'Respect',
                'Yoga'
            ]
        },

        {
            id: 'o',
            letter: 'O',
            title: 'Onam',
            category: 'Festivals',
            state: 'Kerala',
            region: 'South India',

            fact: 'Onam is a major harvest festival of Kerala known for floral decorations, traditional meals, boat races, and cultural performances.',

            explanation:
                'The festival is celebrated over several days. The elaborate vegetarian feast known as Onam Sadya is one of its best-known culinary traditions.',

            image:
                'https://images.unsplash.com/photo-1601823984263-b87b59798b70?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Kerala',
                'Harvest Festivals',
                'Sadya',
                'Vallam Kali'
            ]
        },

        {
            id: 'p',
            letter: 'P',
            title: 'Pongal',
            category: 'Festivals',
            state: 'Tamil Nadu',
            region: 'South India',

            fact: 'Pongal is a Tamil harvest festival that celebrates nature, agriculture, cattle, and the beginning of a new agricultural cycle.',

            explanation:
                'Traditional celebrations include preparing sweet Pongal, decorating homes with kolam designs, and honouring cattle during Mattu Pongal.',

            image:
                'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Tamil Nadu',
                'Harvest Festivals',
                'Kolam',
                'Traditional Food'
            ]
        },

        {
            id: 'q',
            letter: 'Q',
            title: 'Qawwali',
            category: 'Music & Dance',
            state: 'Delhi',
            region: 'North India',

            fact: 'Qawwali is a devotional musical tradition associated with Sufi culture and is known for powerful vocals and rhythmic group performances.',

            explanation:
                'Qawwali performances often feature a lead singer, supporting singers, harmonium, and hand-clapping rhythms. The tradition has a strong presence at Sufi shrines and cultural gatherings.',

            image:
                'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Sufi Culture',
                'Music',
                'Delhi',
                'Devotional Traditions'
            ]
        },

        {
            id: 'r',
            letter: 'R',
            title: 'Rangoli',
            category: 'Art & Craft',
            state: 'Pan-India',
            region: 'Across India',

            fact: 'Rangoli is a decorative art created on floors using colourful powders, rice, flowers, or other materials.',

            explanation:
                'Rangoli designs are especially common during festivals and special occasions. Different regions have their own names and styles, including Kolam in Tamil Nadu and Alpana in Bengal.',

            image:
                'https://images.unsplash.com/photo-1604608672516-f1b5f2c4b7c4?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Diwali',
                'Kolam',
                'Folk Art',
                'Festivals'
            ]
        },

        {
            id: 's',
            letter: 'S',
            title: 'Saree',
            category: 'Traditions',
            state: 'Pan-India',
            region: 'Across India',

            fact: 'The saree is one of Indias most recognisable traditional garments and has countless regional styles.',

            explanation:
                'Different regions are known for distinctive fabrics, weaving techniques, colours, and draping styles. Examples include Banarasi, Kanjeevaram, Chanderi, Paithani, and Sambalpuri sarees.',

            image:
                'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Indian Clothing',
                'Textiles',
                'Handloom',
                'Regional Fashion'
            ]
        },

        {
            id: 't',
            letter: 'T',
            title: 'Thali',
            category: 'Food',
            state: 'Pan-India',
            region: 'Across India',

            fact: 'An Indian thali is a meal served with several dishes together, often representing the flavours and ingredients of a particular region.',

            explanation:
                'A Gujarati thali, Rajasthani thali, South Indian thali, and Bengali meal can look completely different while all following the idea of bringing several dishes together.',

            image:
                'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Indian Cuisine',
                'Regional Food',
                'Vegetarian Food',
                'Traditional Meals'
            ]
        },

        {
            id: 'u',
            letter: 'U',
            title: 'Utsav',
            category: 'Festivals',
            state: 'Pan-India',
            region: 'Across India',

            fact: 'The Sanskrit-derived word “Utsav” is associated with celebration and festival, reflecting Indias rich tradition of communal festivities.',

            explanation:
                'Across India, celebrations bring together music, food, dance, decoration, rituals, and community gatherings. Every region has its own distinctive festivals and customs.',

            image:
                'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Festivals',
                'Celebrations',
                'Community',
                'Indian Traditions'
            ]
        },

        {
            id: 'v',
            letter: 'V',
            title: 'Varanasi',
            category: 'History',
            state: 'Uttar Pradesh',
            region: 'North India',

            fact: 'Varanasi is one of Indias historic cities and is especially known for its ghats, temples, music, literature, and spiritual traditions.',

            explanation:
                'Located along the Ganges, the city has played an important role in Indian religious and cultural life for centuries and remains an important centre of music, crafts, and pilgrimage.',

            image:
                'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Ganges',
                'Ghats',
                'Banarasi Silk',
                'Indian Heritage'
            ]
        },

        {
            id: 'w',
            letter: 'W',
            title: 'Warli Art',
            category: 'Art & Craft',
            state: 'Maharashtra',
            region: 'West India',

            fact: 'Warli art is a tribal painting tradition known for simple geometric figures depicting people, animals, nature, and everyday life.',

            explanation:
                'Traditional Warli paintings use basic shapes such as circles, triangles, and squares to create scenes of farming, dancing, hunting, ceremonies, and community life.',

            image:
                'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Maharashtra',
                'Tribal Art',
                'Folk Art',
                'Traditional Painting'
            ]
        },

        {
            id: 'x',
            letter: 'X',
            title: 'Xylophone-like Folk Instruments',
            category: 'Music & Dance',
            state: 'Pan-India',
            region: 'Across India',

            fact: 'Indian folk traditions include many unusual percussion and melodic instruments, including instruments that resemble xylophones in how they produce notes.',

            explanation:
                'Indias musical heritage contains an enormous variety of traditional instruments. Different communities developed instruments suited to their local materials, celebrations, and musical traditions.',

            image:
                'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Folk Instruments',
                'Indian Music',
                'Traditional Music',
                'Regional Culture'
            ]
        },

        {
            id: 'y',
            letter: 'Y',
            title: 'Yoga',
            category: 'Traditions',
            state: 'Pan-India',
            region: 'Across India',

            fact: 'Yoga originated in ancient India and developed into a broad tradition involving physical practices, breathing techniques, meditation, and philosophical ideas.',

            explanation:
                'Today yoga is practised around the world, while India remains an important centre for its study and teaching. International Yoga Day is observed every year on June 21.',

            image:
                'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Meditation',
                'Indian Philosophy',
                'Wellness',
                'Ancient India'
            ]
        },

        {
            id: 'z',
            letter: 'Z',
            title: 'Zardozi',
            category: 'Art & Craft',
            state: 'Uttar Pradesh',
            region: 'North India',

            fact: 'Zardozi is a decorative embroidery tradition that uses metallic threads and embellishments to create elaborate designs on fabric.',

            explanation:
                'The craft has a long history in the Indian subcontinent and is commonly associated with richly decorated garments, wedding clothing, ceremonial textiles, and accessories.',

            image:
                'https://images.unsplash.com/photo-1610030469668-8e9c9c2f5f77?auto=format&fit=crop&w=900&q=80',

            relatedTopics: [
                'Embroidery',
                'Uttar Pradesh',
                'Traditional Clothing',
                'Indian Handicrafts'
            ]
        }
    ],

    /* =====================================================
       FEATURED FACTS
    ===================================================== */

    featured: [
        'd',
        'm',
        'o',
        'r',
        's',
        't'
    ],

    /* =====================================================
       STATISTICS
    ===================================================== */

    statistics: [
        {
            icon: '🔤',
            value: '26',
            label: 'Letters in the A–Z Journey'
        },
        {
            icon: '🎨',
            value: '10+',
            label: 'Cultural Categories'
        },
        {
            icon: '🗺️',
            value: '28+',
            label: 'States Represented'
        },
        {
            icon: '🇮🇳',
            value: '1',
            label: 'Incredibly Diverse India'
        }
    ],

    /* =====================================================
       SOURCES
    ===================================================== */

    sources: [
        {
            name: 'Ministry of Culture, Government of India',
            url: 'https://www.indiaculture.gov.in/'
        },
        {
            name: 'Incredible India',
            url: 'https://www.incredibleindia.gov.in/'
        },
        {
            name: 'Ministry of Textiles, Government of India',
            url: 'https://texmin.nic.in/'
        }
    ]
};