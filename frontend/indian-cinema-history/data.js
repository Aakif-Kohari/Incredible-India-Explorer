const cinemaData = {
    eras: [
        {
            id: "silent",
            title: "Silent Film Era",
            years: "1910s–1920s",
            description: "The beginning of Indian filmmaking. Indigenous production began and cinema grew as a popular form of entertainment."
        },
        {
            id: "talkies",
            title: "Talkies & Early Sound Cinema",
            years: "1930s–1940s",
            description: "The introduction of synchronized sound changed everything, bringing musical films, major studios, and expansion of regional languages."
        },
        {
            id: "golden",
            title: "Golden Era",
            years: "1950s–1960s",
            description: "One of the most influential periods in Indian cinema. Marked by parallel and mainstream cinema, strong social themes, and international recognition."
        },
        {
            id: "parallel",
            title: "New Wave & Parallel Cinema",
            years: "1970s–1980s",
            description: "The rise of socially conscious, realistic, and experimental filmmaking alongside the massive commercial success of masala films."
        },
        {
            id: "liberalization",
            title: "Liberalization & Global Expansion",
            years: "1990s–2000s",
            description: "Economic liberalization led to multiplex culture, targeting overseas Indian audiences, large-scale productions, and new genres."
        },
        {
            id: "modern",
            title: "Modern Indian Cinema",
            years: "2010s–Present",
            description: "The growth of digital filmmaking, streaming platforms, and regional films reaching global audiences with massive VFX and scale."
        }
    ],
    films: [
        {
            title: "Raja Harishchandra",
            year: 1913,
            language: "Silent (Marathi titles)",
            industry: "Marathi Cinema",
            era: "silent",
            director: "Dadasaheb Phalke",
            genre: "Mythology",
            description: "India's first full-length indigenous feature film.",
            significance: "Laid the foundation for the Indian film industry.",
            image: "assets/raja_harishchandra.jpg"
        },
        {
            title: "Alam Ara",
            year: 1931,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "talkies",
            director: "Ardeshir Irani",
            genre: "Fantasy",
            description: "India's first sound film.",
            significance: "Brought synchronized sound and music to Indian cinema, forever changing its course.",
            image: "assets/alam_ara.jpg"
        },
        {
            title: "Devdas",
            year: 1935,
            language: "Bengali",
            industry: "Bengali Cinema",
            era: "talkies",
            director: "P.C. Barua",
            genre: "Romance/Drama",
            description: "An early, highly influential adaptation of the classic novel.",
            significance: "Pioneered the tragic romance genre in Indian cinema.",
            image: "assets/devdas.jpg"
        },
        {
            title: "Sant Tukaram",
            year: 1936,
            language: "Marathi",
            industry: "Marathi Cinema",
            era: "talkies",
            director: "Vishnupant Govind Damle, Sheikh Fattelal",
            genre: "Devotional",
            description: "A biographical film based on the life of Tukaram.",
            significance: "The first Indian film to receive international recognition at the Venice Film Festival.",
            image: "assets/sant_tukaram.jpg"
        },
        {
            title: "Pather Panchali",
            year: 1955,
            language: "Bengali",
            industry: "Bengali Cinema",
            era: "golden",
            director: "Satyajit Ray",
            genre: "Drama",
            description: "The first film in The Apu Trilogy, depicting the childhood of Apu in rural Bengal.",
            significance: "A landmark of Indian parallel cinema and international filmmaking, winning at Cannes.",
            image: "assets/pather_panchali.jpg"
        },
        {
            title: "Pyaasa",
            year: 1957,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "golden",
            director: "Guru Dutt",
            genre: "Drama/Romance",
            description: "A disillusioned poet's struggle in a hypocritical society.",
            significance: "Considered one of the greatest films ever made, known for its soulful music and cinematography.",
            image: "assets/pyaasa.jpg"
        },
        {
            title: "Mother India",
            year: 1957,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "golden",
            director: "Mehboob Khan",
            genre: "Drama",
            description: "An epic drama about a poverty-stricken village woman's struggles.",
            significance: "India's first submission for the Academy Award for Best Foreign Language Film.",
            image: "assets/mother_india.jpg"
        },
        {
            title: "Mughal-e-Azam",
            year: 1960,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "golden",
            director: "K. Asif",
            genre: "Historical Drama",
            description: "An epic historical romance between Prince Salim and Anarkali.",
            significance: "Broke box office records and is remembered for its grand sets and timeless music.",
            image: "assets/mughal_e_azam.jpg"
        },
        {
            title: "Guide",
            year: 1965,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "golden",
            director: "Vijay Anand",
            genre: "Drama",
            description: "The transformation of a freelance guide into a spiritual master.",
            significance: "Acclaimed for its progressive themes, direction, and music.",
            image: "assets/guide.jpg"
        },
        {
            title: "Ankur",
            year: 1974,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "parallel",
            director: "Shyam Benegal",
            genre: "Drama",
            description: "Focuses on the social complexities and caste discrimination in rural India.",
            significance: "Marked the rise of the parallel cinema movement in Hindi films.",
            image: "assets/ankur.jpg"
        },
        {
            title: "Sholay",
            year: 1975,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "parallel",
            director: "Ramesh Sippy",
            genre: "Action/Adventure",
            description: "Two criminals are hired by a retired police officer to capture a ruthless dacoit.",
            significance: "One of the highest-grossing and most culturally impactful films in Indian history.",
            image: "assets/sholay.jpg"
        },
        {
            title: "Deewaar",
            year: 1975,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "parallel",
            director: "Yash Chopra",
            genre: "Crime Drama",
            description: "The story of two brothers torn apart by fate and morality.",
            significance: "Solidified Amitabh Bachchan's 'Angry Young Man' persona.",
            image: "assets/deewaar.jpg"
        },
        {
            title: "Manthan",
            year: 1976,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "parallel",
            director: "Shyam Benegal",
            genre: "Drama",
            description: "Based on the pioneering milk cooperative movement in Gujarat.",
            significance: "India's first crowd-funded film, financed by 500,000 farmers.",
            image: "assets/manthan.jpg"
        },
        {
            title: "Ardh Satya",
            year: 1983,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "parallel",
            director: "Govind Nihalani",
            genre: "Crime Drama",
            description: "An honest cop struggles with the corruption around him.",
            significance: "A defining film of parallel cinema that won numerous National Film Awards.",
            image: "assets/ardh_satya.jpg"
        },
        {
            title: "Dilwale Dulhania Le Jayenge",
            year: 1995,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "liberalization",
            director: "Aditya Chopra",
            genre: "Romance",
            description: "Two NRIs fall in love during a trip across Europe.",
            significance: "The longest-running film in Indian cinema history, defining modern Bollywood romance.",
            image: "assets/ddlj.jpg"
        },
        {
            title: "Lagaan",
            year: 2001,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "liberalization",
            director: "Ashutosh Gowariker",
            genre: "Sports Drama",
            description: "Villagers in Victorian India challenge their British rulers to a game of cricket to avoid high taxes.",
            significance: "Nominated for the Academy Award for Best Foreign Language Film.",
            image: "assets/lagaan.jpg"
        },
        {
            title: "Dil Chahta Hai",
            year: 2001,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "liberalization",
            director: "Farhan Akhtar",
            genre: "Coming-of-age",
            description: "The lives and relationships of three friends in modern urban India.",
            significance: "Brought a modern, urban aesthetic and conversational dialogue to Bollywood.",
            image: "assets/dil_chahta_hai.jpg"
        },
        {
            title: "Swades",
            year: 2004,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "liberalization",
            director: "Ashutosh Gowariker",
            genre: "Drama",
            description: "An NRI NASA scientist returns to an Indian village.",
            significance: "Praised for its realistic portrayal of rural India and patriotism.",
            image: "assets/swades.jpg"
        },
        {
            title: "Rang De Basanti",
            year: 2006,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "liberalization",
            director: "Rakeysh Omprakash Mehra",
            genre: "Drama",
            description: "Students acting in a documentary on Indian freedom fighters are awakened to their own generation's struggles.",
            significance: "Had a profound cultural impact on Indian youth and political awareness.",
            image: "assets/rang_de_basanti.jpg"
        },
        {
            title: "Gangs of Wasseypur",
            year: 2012,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "modern",
            director: "Anurag Kashyap",
            genre: "Crime/Action",
            description: "A multi-generational saga of the coal mafia in Dhanbad.",
            significance: "A cult classic that redefined the Indian gangster genre.",
            image: "assets/gangs_of_wasseypur.jpg"
        },
        {
            title: "The Lunchbox",
            year: 2013,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "modern",
            director: "Ritesh Batra",
            genre: "Romance/Drama",
            description: "A mistaken delivery in Mumbai's dabbawala system connects a young housewife and an older man.",
            significance: "Achieved massive critical acclaim and box office success globally.",
            image: "assets/lunchbox.jpg"
        },
        {
            title: "Baahubali: The Beginning",
            year: 2015,
            language: "Telugu",
            industry: "Telugu Cinema",
            era: "modern",
            director: "S. S. Rajamouli",
            genre: "Epic Action",
            description: "A visual spectacle about a dispute between brothers over an ancient kingdom.",
            significance: "Shattered box office records and brought South Indian cinema to pan-Indian and global prominence.",
            image: "assets/baahubali.jpg"
        },
        {
            title: "Dangal",
            year: 2016,
            language: "Hindi",
            industry: "Hindi Cinema",
            era: "modern",
            director: "Nitesh Tiwari",
            genre: "Sports Biopic",
            description: "A former wrestler trains his daughters to win gold at the Commonwealth Games.",
            significance: "The highest-grossing Indian film of all time, with historic success in China.",
            image: "assets/dangal.jpg"
        },
        {
            title: "RRR",
            year: 2022,
            language: "Telugu",
            industry: "Telugu Cinema",
            era: "modern",
            director: "S. S. Rajamouli",
            genre: "Epic Action",
            description: "A fictional story about two legendary Indian revolutionaries.",
            significance: "A massive global phenomenon; won an Academy Award for Best Original Song ('Naatu Naatu').",
            image: "assets/rrr.jpg"
        },
        {
            title: "Kantara",
            year: 2022,
            language: "Kannada",
            industry: "Kannada Cinema",
            era: "modern",
            director: "Rishab Shetty",
            genre: "Action/Thriller",
            description: "A story deeply rooted in the folklore of coastal Karnataka.",
            significance: "A massive commercial and critical success that put Kannada cinema on the global map.",
            image: "assets/kantara.jpg"
        }
    ],
    filmmakers: [
        {
            name: "Dadasaheb Phalke",
            industry: "Hindi/Marathi",
            active: "1910s–1930s",
            contribution: "The 'Father of Indian Cinema'. He directed India's first full-length feature film.",
            notable: "Raja Harishchandra, Mohini Bhasmasur"
        },
        {
            name: "Satyajit Ray",
            industry: "Bengali",
            active: "1950s–1990s",
            contribution: "One of the greatest filmmakers of the 20th century. Brought Indian cinema to the global stage.",
            notable: "The Apu Trilogy, Charulata, Mahanagar"
        },
        {
            name: "Guru Dutt",
            industry: "Hindi",
            active: "1940s–1960s",
            contribution: "Known for his lyrical, deeply emotional, and socially critical films.",
            notable: "Pyaasa, Kaagaz Ke Phool, Sahib Bibi Aur Ghulam"
        },
        {
            name: "Raj Kapoor",
            industry: "Hindi",
            active: "1940s–1980s",
            contribution: "The 'Showman of Indian Cinema'. His films were immensely popular across the USSR and Middle East.",
            notable: "Awaara, Shree 420, Mera Naam Joker"
        },
        {
            name: "Bimal Roy",
            industry: "Hindi/Bengali",
            active: "1930s–1960s",
            contribution: "Master of realistic and socially relevant mainstream cinema.",
            notable: "Do Bigha Zamin, Devdas, Madhumati"
        },
        {
            name: "Ritwik Ghatak",
            industry: "Bengali",
            active: "1950s–1970s",
            contribution: "A pioneer of parallel cinema. His films often explored the trauma of the Partition of India.",
            notable: "Meghe Dhaka Tara, Subarnarekha"
        },
        {
            name: "Mrinal Sen",
            industry: "Bengali/Hindi",
            active: "1950s–2000s",
            contribution: "A Marxist filmmaker who deeply influenced the Indian New Wave.",
            notable: "Bhuvan Shome, Chorus, Khandhar"
        },
        {
            name: "Shyam Benegal",
            industry: "Hindi",
            active: "1970s–Present",
            contribution: "A leading figure of the Parallel Cinema movement, creating realistic stories of rural India.",
            notable: "Ankur, Manthan, Bhumika"
        },
        {
            name: "Adoor Gopalakrishnan",
            industry: "Malayalam",
            active: "1970s–Present",
            contribution: "Pioneered the new wave cinema movement in Kerala.",
            notable: "Swayamvaram, Elippathayam, Mathilukal"
        },
        {
            name: "Mani Ratnam",
            industry: "Tamil/Hindi",
            active: "1980s–Present",
            contribution: "Known for his visual flair, strong storytelling, and bridging art and commercial cinema.",
            notable: "Nayakan, Roja, Bombay"
        },
        {
            name: "S. S. Rajamouli",
            industry: "Telugu",
            active: "2000s–Present",
            contribution: "Master of grand epic cinema and visual effects, elevating Indian cinema globally.",
            notable: "Magadheera, Baahubali series, RRR"
        }
    ],
    regionalIndustries: [
        {
            name: "Hindi Cinema",
            alias: "Bollywood",
            description: "Centered primarily around Mumbai. The largest and most internationally recognized segment of Indian cinema."
        },
        {
            name: "Telugu Cinema",
            alias: "Tollywood",
            description: "Known for large-scale productions and visually grand epics. Gained massive global popularity with films like RRR and Baahubali."
        },
        {
            name: "Tamil Cinema",
            alias: "Kollywood",
            description: "Features strong storytelling traditions, social themes, and an immense international Tamil-speaking audience."
        },
        {
            name: "Bengali Cinema",
            alias: "Tollywood (Bengal)",
            description: "Historically vital for its strong contribution to art and parallel cinema, led by stalwarts like Satyajit Ray and Mrinal Sen."
        },
        {
            name: "Malayalam Cinema",
            alias: "Mollywood",
            description: "Renowned for realistic storytelling, strong screenplay-driven films, and international critical recognition."
        },
        {
            name: "Kannada Cinema",
            alias: "Sandalwood",
            description: "Has seen a massive resurgence with the growth of independent, experimental, and large-scale modern hits."
        },
        {
            name: "Marathi Cinema",
            alias: "Mollywood",
            description: "Deeply influenced by local theatre traditions, known for its socially focused and rooted storytelling."
        },
        {
            name: "Assamese Cinema",
            alias: "Jollywood",
            description: "A growing regional industry known for its sensitive portrayals of local culture and socio-political themes."
        }
    ],
    facts: [
        "India's first full-length indigenous feature film, Raja Harishchandra, was released in 1913.",
        "Alam Ara (1931) was India's first sound film, introducing song and dance into Indian cinema.",
        "India produces between 1,500 to 2,000 films every year, making it the largest film industry in the world by output.",
        "Indian films are produced in over 20 different languages annually.",
        "Satyajit Ray received an Honorary Academy Award in 1992 for his lifetime achievement in cinema.",
        "Lagaan (2001) was only the third Indian film to be nominated for the Academy Award for Best Foreign Language Film.",
        "The song 'Naatu Naatu' from RRR (2022) won the Academy Award for Best Original Song, a historic first for an Indian production."
    ]
};
