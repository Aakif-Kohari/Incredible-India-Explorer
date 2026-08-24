const cinemaData = {
  eras: [
    {
      id: "all",
      name: "All Eras",
      icon: "🎬"
    },
    {
      id: "silent",
      name: "Silent Era (1910s–1920s)",
      icon: "🎞️",
      description: "The beginning of Indian filmmaking. Focus on mythological and historical epics. Dadasaheb Phalke laid the foundation with India's first full-length feature film."
    },
    {
      id: "talkies",
      name: "Early Talkies (1930s–1940s)",
      icon: "🔊",
      description: "The introduction of synchronized sound revolutionized Indian cinema, bringing music and songs to the forefront and leading to the expansion of regional language films."
    },
    {
      id: "golden",
      name: "Golden Era (1950s–1960s)",
      icon: "⭐",
      description: "A period of unparalleled creativity. Filmmakers tackled social issues, produced cinematic masterpieces, and garnered international acclaim at major film festivals."
    },
    {
      id: "parallel",
      name: "Parallel Cinema (1970s–1980s)",
      icon: "🎥",
      description: "An alternative to mainstream cinema emerged, focusing on realism, socio-political themes, and naturalistic acting, challenging the conventions of commercial films."
    },
    {
      id: "liberalization",
      name: "Global Expansion (1990s–2000s)",
      icon: "🌍",
      description: "Economic liberalization transformed the industry. High-budget productions, the rise of multiplexes, and stories catering to the global Indian diaspora became prominent."
    },
    {
      id: "modern",
      name: "Modern Cinema (2010s–Present)",
      icon: "🚀",
      description: "The digital revolution. Streaming platforms, Pan-India films, independent cinema, and ground-breaking VFX have pushed Indian cinema to global dominance."
    }
  ],
  films: [
    {
      title: "Raja Harishchandra",
      year: 1913,
      language: "Silent (Marathi intertitles)",
      industry: "Marathi",
      era: "silent",
      director: "Dadasaheb Phalke",
      genre: "Mythological",
      description: "The first full-length Indian feature film. It tells the story of the righteous King Harishchandra.",
      significance: "Laid the foundation for the entire Indian film industry.",
      icon: "👑"
    },
    {
      title: "Alam Ara",
      year: 1931,
      language: "Hindi-Urdu",
      industry: "Hindi",
      era: "talkies",
      director: "Ardeshir Irani",
      genre: "Fantasy / Romance",
      description: "A love story between a prince and a gypsy girl.",
      significance: "India's first sound film (talkie), which introduced music and singing to Indian cinema.",
      icon: "🎤"
    },
    {
      title: "Devdas",
      year: 1935,
      language: "Bengali",
      industry: "Bengali",
      era: "talkies",
      director: "P.C. Barua",
      genre: "Romantic Drama",
      description: "Based on Sarat Chandra Chattopadhyay's novel about a tragic lover.",
      significance: "Set the template for tragic romance in Indian cinema and featured naturalistic acting by K.L. Saigal.",
      icon: "💔"
    },
    {
      title: "Sant Tukaram",
      year: 1936,
      language: "Marathi",
      industry: "Marathi",
      era: "talkies",
      director: "Vishnupant Govind Damle, Sheikh Fattelal",
      genre: "Biographical",
      description: "The life of Tukaram, a prominent Varkari saint and spiritual poet of the Bhakti.",
      significance: "First Indian film to receive international recognition, winning an award at the Venice Film Festival.",
      icon: "🙏"
    },
    {
      title: "Pather Panchali",
      year: 1955,
      language: "Bengali",
      industry: "Bengali",
      era: "golden",
      director: "Satyajit Ray",
      genre: "Drama",
      description: "The story of a young boy, Apu, and his life in a poor Indian village.",
      significance: "A landmark of world cinema that pioneered the Parallel Cinema movement and won Best Human Document at Cannes.",
      icon: "🚂"
    },
    {
      title: "Mother India",
      year: 1957,
      language: "Hindi",
      industry: "Hindi",
      era: "golden",
      director: "Mehboob Khan",
      genre: "Epic Drama",
      description: "A poverty-stricken village woman struggles to raise her sons against the backdrop of a greedy moneylender.",
      significance: "India's first submission for the Academy Award for Best International Feature Film, losing by a single vote.",
      icon: "🌾"
    },
    {
      title: "Pyaasa",
      year: 1957,
      language: "Hindi",
      industry: "Hindi",
      era: "golden",
      director: "Guru Dutt",
      genre: "Romantic Drama",
      description: "A struggling poet tries to make his mark in a hypocritical and materialistic world.",
      significance: "Considered one of the greatest films ever made, noted for its brilliant music, cinematography, and social critique.",
      icon: "🖋️"
    },
    {
      title: "Mughal-e-Azam",
      year: 1960,
      language: "Hindi-Urdu",
      industry: "Hindi",
      era: "golden",
      director: "K. Asif",
      genre: "Historical Epic",
      description: "The doomed love affair between Prince Salim and the court dancer Anarkali.",
      significance: "Broke box office records and remains a milestone for its grandiose sets, unforgettable music, and scale.",
      icon: "🏰"
    },
    {
      title: "Ankur",
      year: 1974,
      language: "Hindi",
      industry: "Hindi",
      era: "parallel",
      director: "Shyam Benegal",
      genre: "Drama",
      description: "Explores the complex dynamics of caste, class, and gender in rural India.",
      significance: "Marked the beginning of Shyam Benegal's career and was a major success of the Parallel Cinema movement.",
      icon: "🌱"
    },
    {
      title: "Sholay",
      year: 1975,
      language: "Hindi",
      industry: "Hindi",
      era: "parallel",
      director: "Ramesh Sippy",
      genre: "Action / Curry Western",
      description: "Two small-time crooks are hired by a retired police officer to capture a ruthless dacoit.",
      significance: "The quintessential Indian blockbuster. Redefined the masala genre and is considered a cultural phenomenon.",
      icon: "🔫"
    },
    {
      title: "Manthan",
      year: 1976,
      language: "Hindi",
      industry: "Hindi",
      era: "parallel",
      director: "Shyam Benegal",
      genre: "Drama",
      description: "Inspired by the pioneering milk cooperative movement of Verghese Kurien.",
      significance: "Funded entirely by 500,000 rural farmers who donated 2 rupees each, a unique instance of crowdfunding.",
      icon: "🥛"
    },
    {
      title: "Dilwale Dulhania Le Jayenge",
      year: 1995,
      language: "Hindi",
      industry: "Hindi",
      era: "liberalization",
      director: "Aditya Chopra",
      genre: "Romance",
      description: "Two NRIs meet in Europe and fall in love, but must win over her strict father in India.",
      significance: "The longest-running film in Indian cinema history, cementing the global appeal of Bollywood romance.",
      icon: "🎸"
    },
    {
      title: "Lagaan",
      year: 2001,
      language: "Hindi",
      industry: "Hindi",
      era: "liberalization",
      director: "Ashutosh Gowariker",
      genre: "Sports Drama / Epic",
      description: "Villagers in Victorian India stake their future on a game of cricket against their British rulers.",
      significance: "Nominated for the Academy Award for Best Foreign Language Film and achieved massive international success.",
      icon: "🏏"
    },
    {
      title: "Dil Chahta Hai",
      year: 2001,
      language: "Hindi",
      industry: "Hindi",
      era: "liberalization",
      director: "Farhan Akhtar",
      genre: "Coming-of-age",
      description: "The story of three young friends navigating love, life, and relationships in modern urban India.",
      significance: "Revolutionized Hindi cinema with its contemporary, realistic portrayal of urban youth.",
      icon: "🚗"
    },
    {
      title: "Gangs of Wasseypur",
      year: 2012,
      language: "Hindi",
      industry: "Hindi",
      era: "modern",
      director: "Anurag Kashyap",
      genre: "Crime Thriller",
      description: "A dark, violent multi-generational saga of the coal mafia in Dhanbad.",
      significance: "Redefined independent cinema in India and gained a massive cult following and critical acclaim worldwide.",
      icon: "⚔️"
    },
    {
      title: "The Lunchbox",
      year: 2013,
      language: "Hindi",
      industry: "Hindi",
      era: "modern",
      director: "Ritesh Batra",
      genre: "Romance / Drama",
      description: "A mistaken delivery in Mumbai's famously efficient dabbawala system connects a young housewife and an older man.",
      significance: "A globally acclaimed indie hit that demonstrated the international appetite for intimate Indian stories.",
      icon: "🍱"
    },
    {
      title: "Baahubali: The Beginning",
      year: 2015,
      language: "Telugu",
      industry: "Telugu",
      era: "modern",
      director: "S. S. Rajamouli",
      genre: "Epic Action",
      description: "A young man discovers his royal heritage and sets out to rescue a captive queen.",
      significance: "Broke language barriers, establishing the 'Pan-India' film trend and setting new benchmarks for Indian VFX.",
      icon: "👑"
    },
    {
      title: "RRR",
      year: 2022,
      language: "Telugu",
      industry: "Telugu",
      era: "modern",
      director: "S. S. Rajamouli",
      genre: "Epic Action",
      description: "A fictional story about two legendary Indian revolutionaries and their journey away from home before they started fighting for their country.",
      significance: "Achieved massive global popularity, winning the Academy Award for Best Original Song ('Naatu Naatu').",
      icon: "🔥"
    },
    {
      title: "Kantara",
      year: 2022,
      language: "Kannada",
      industry: "Kannada",
      era: "modern",
      director: "Rishab Shetty",
      genre: "Action Thriller / Folk",
      description: "Set in a coastal Karnataka village, it explores the conflict between nature and human greed rooted in local folklore.",
      significance: "A massive commercial and critical success that showcased the power of deeply rooted, regional cultural storytelling.",
      icon: "🐗"
    }
  ],
  regionalIndustries: [
    {
      name: "Hindi Cinema",
      alias: "Bollywood",
      description: "Based in Mumbai, it is one of the largest film producers globally. Known for its music, dance, and wide reach across the Indian diaspora."
    },
    {
      name: "Telugu Cinema",
      alias: "Tollywood",
      description: "Based in Hyderabad, known for its massive scale, highly technical productions, and recently leading the 'Pan-India' phenomenon with epics like Baahubali and RRR."
    },
    {
      name: "Tamil Cinema",
      alias: "Kollywood",
      description: "Based in Chennai, it is celebrated for its strong technical standards, socially conscious storytelling, and massive global audience."
    },
    {
      name: "Bengali Cinema",
      alias: "Tollywood (Bengal)",
      description: "Historically central to the Parallel Cinema movement. Produced world-renowned filmmakers like Satyajit Ray, Mrinal Sen, and Ritwik Ghatak."
    },
    {
      name: "Malayalam Cinema",
      alias: "Mollywood",
      description: "Known for its highly realistic, screenplay-driven, and critically acclaimed films with strong psychological and social themes."
    },
    {
      name: "Kannada Cinema",
      alias: "Sandalwood",
      description: "Rapidly expanding its global footprint with highly original, visually stunning, and culturally rooted films like K.G.F and Kantara."
    },
    {
      name: "Marathi Cinema",
      alias: "Mollywood / Marathi Chitrapat",
      description: "The pioneer of Indian cinema (Phalke). Known for its strong theatrical roots and profound social and progressive themes."
    }
  ],
  facts: [
    "India's first full-length indigenous feature film, Raja Harishchandra, was released in 1913.",
    "Alam Ara (1931) was India's first sound film, introducing the song-and-dance formula that defines much of Indian cinema.",
    "India produces more films annually than any other country in the world, with over 1,500 to 2,000 films released each year.",
    "Bhanu Athaiya was the first Indian to win an Academy Award, for designing the costumes for Richard Attenborough's 'Gandhi' (1982).",
    "The song 'Naatu Naatu' from the Telugu film RRR was the first song from an Indian production to win an Oscar.",
    "Satyajit Ray was awarded an Honorary Academy Award in 1992 in recognition of his rare mastery of the art of motion pictures."
  ]
};

export default cinemaData;
