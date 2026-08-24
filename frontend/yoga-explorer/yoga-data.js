/**
 * Yoga — India's Global Cultural Heritage — Dataset
 * Defines YOGA_DATA used by yoga.js
 *
 * Issue #2939: Y: Yoga — India's Global Cultural Heritage
 */

const YOGA_DATA = {

  meta: {
    title: 'Yoga — India\'s Global Cultural Heritage',
    subtitle: 'An ancient Indian tradition of mind, body, and spiritual harmony celebrated worldwide',
    totalTraditions: 5,
    coreTexts: 5,
    historicalEpochs: 8,
    globalMilestones: 4,
    unescoYear: '2016',
    unDayOfYoga: 'June 21',
    description: 'Inscribed in 2016 on the UNESCO Representative List of Intangible Cultural Heritage of Humanity, Yoga is a mind-body discipline that originated in ancient India. Encompassing physical postures (asana), breath regulation (pranayama), meditation (dhyana), and ethical principles (yama/niyama), Yoga evolved through distinct historical epochs — from Vedic chant and Upanishadic self-inquiry to Patanjali\'s classical synthesis, medieval Hatha subtle-body science, and its 19th–21st century global renaissance.'
  },

  historyOverview: {
    summary: 'The history of Yoga is not the story of a single founder or text, but a multi-millennial evolutionary stream of Indian thought and practice. Rooted in Vedic ritual symbolism, Yoga crystallized into philosophical systems in the Upanishads and Shramana traditions, received systematic classical codification in Patanjali\'s Yoga Sutras, expanded into physical and energetic practices under medieval Nath Siddhas, and evolved into a globally practiced heritage of physical and mental well-being.',
    epochsList: [
      'Pre-Vedic & Vedic Foundations (c. 2500 BCE – 800 BCE)',
      'Upanishadic & Shramana Era (c. 800 BCE – 200 BCE)',
      'Bhagavad Gita & Epic Synthesis (c. 200 BCE – 200 CE)',
      'Patanjali\'s Classical Codification (c. 400 CE)',
      'Medieval Hatha Yoga & Nath Siddhas (c. 10th – 15th Century CE)',
      '19th Century Modern Revival (1893 CE)',
      '20th Century Global Transmission (1930s – 1970s)',
      'UN International Day of Yoga & UNESCO Recognition (2014 – Present)'
    ]
  },

  traditions: [
    {
      id: 'raja-yoga',
      name: 'Raja Yoga',
      sanskritName: 'राजयोग (Royal Path of Meditation)',
      icon: '🧘‍♂️',
      period: 'Classical Period (c. 400 CE)',
      focus: 'Mind control, single-pointed concentration (Dharana), and meditative absorption (Samadhi)',
      description: 'Codified by Sage Patanjali in the Yoga Sutras, Raja Yoga is known as the "Royal Path." It prescribes an Eight-Limbed system (Ashtanga) designed to quiet mental fluctuations and achieve spiritual liberation.',
      coreTexts: 'Yoga Sutras of Patanjali',
      practices: 'Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi',
      significance: 'Established the foundational psychological and meditative framework of classical Indian yoga philosophy.'
    },
    {
      id: 'hatha-yoga',
      name: 'Hatha Yoga',
      sanskritName: 'हठयोग (Path of Force & Subtle Energy)',
      icon: '☀️',
      period: 'Medieval Period (c. 10th – 15th Century CE)',
      focus: 'Physical postures (Asana), breath control (Pranayama), mudras, and subtle-body energy channels (Nadis/Chakras)',
      description: 'Developed by Nath Siddha yogis such as Gorakhnath and Swatmarama, Hatha Yoga uses physical discipline and energetic cleansing to balance the solar (Ha) and lunar (Tha) energies of the body.',
      coreTexts: 'Hatha Yoga Pradipika, Gheranda Samhita, Shiva Samhita',
      practices: 'Shatkarma (Cleansing), Asanas, Pranayama, Mudras, Bandhas (Energy locks)',
      significance: 'Formed the direct historical structural foundation for most 20th-century physical postures and modern global posture practice.'
    },
    {
      id: 'bhakti-yoga',
      name: 'Bhakti Yoga',
      sanskritName: 'भक्तियोग (Path of Devotion & Love)',
      icon: '💖',
      period: 'Epic & Medieval Periods (c. 200 BCE – 17th Century CE)',
      focus: 'Unconditional love, surrender (Ishvara Pranidhana), devotional singing (Kirtan), and emotional cultivation',
      description: 'Elaborated in the Bhagavad Gita and Bhagavata Purana, Bhakti Yoga transforms human emotions into transcendent love directed toward the Divine through chanting, remembrance, and selfless surrender.',
      coreTexts: 'Bhagavad Gita, Narada Bhakti Sutras',
      practices: 'Sravana (Listening), Kirtan (Chanting), Smarana (Remembrance), Vandana (Adoration)',
      significance: 'Democratized spiritual practice across India, emphasizing that devotion is accessible to all regardless of caste, gender, or academic learning.'
    },
    {
      id: 'jnana-yoga',
      name: 'Jnana Yoga',
      sanskritName: 'ज्ञानयोग (Path of Wisdom & Self-Inquiry)',
      icon: '🧠',
      period: 'Upanishadic & Classical Periods (c. 800 BCE – 800 CE)',
      focus: 'Intellectual discernment (Viveka), detachment (Vairagya), and self-inquiry (Atma-Vichara)',
      description: 'Rooted in the Upanishads and Advaita Vedanta, Jnana Yoga utilizes rigorous inquiry to pierce through illusions (Maya) and realize the ultimate non-dual unity of the Individual Self (Atman) and Supreme Reality (Brahman).',
      coreTexts: 'Principal Upanishads, Bhagavad Gita, Brahma Sutras',
      practices: 'Sravana (Hearing truths), Manana (Contemplation), Nididhyasana (Deep meditation on non-duality)',
      significance: 'Represents the philosophical apex of Vedantic inquiry and non-dual meditative insight.'
    },
    {
      id: 'karma-yoga',
      name: 'Karma Yoga',
      sanskritName: 'कर्मयोग (Path of Selfless Action)',
      icon: '🤝',
      period: 'Epic Period (c. 200 BCE – 200 CE)',
      focus: 'Duty (Dharma), selfless service (Seva), and action performed without attachment to personal rewards',
      description: 'Articulated by Krishna in the Bhagavad Gita, Karma Yoga teaches how to live actively in the world without being bound by the karmic consequences of actions by dedicating all work to the greater good.',
      coreTexts: 'Bhagavad Gita',
      practices: 'Nishkama Karma (Action without selfish desire), Seva (Selfless service), Svadharmacharana (Fulfilling duty)',
      significance: 'Transformed daily work and social service into a potent spiritual discipline, inspiring modern social movements including Mahatma Gandhi\'s philosophy.'
    }
  ],

  philosophyConcepts: [
    {
      title: 'Citta-Vritti-Nirodha',
      sanskrit: 'योगश्चित्तवृत्तिनिरोधः (Yoga Sutra 1.2)',
      description: 'Patanjali\'s definitive description of Yoga: "Yoga is the calming of the fluctuations (vrittis) of the mind-field (citta)." When mental turbulence ceases, the inner observer rests in its true nature.',
      category: 'Psychology of Mind'
    },
    {
      title: 'Abhyasa & Vairagya',
      sanskrit: 'अभ्यासवैराग्याभ्यां तन्निरोधः (Yoga Sutra 1.12)',
      description: 'The twin pillars of practice: Abhyasa is persistent, continuous effort made over a long period; Vairagya is non-attachment or freedom from craving for material outcomes.',
      category: 'Core Disciplines'
    },
    {
      title: 'Ashtanga (Eight Limbs of Yoga)',
      sanskrit: 'अष्टाङ्ग (Eightfold Path)',
      description: 'Patanjali\'s progressive framework: 1. Yama (Social Ethics), 2. Niyama (Personal Observances), 3. Asana (Postures), 4. Pranayama (Breath Regulation), 5. Pratyahara (Sense Withdrawal), 6. Dharana (Concentration), 7. Dhyana (Meditation), 8. Samadhi (Absorption).',
      category: 'Systemic Path'
    },
    {
      title: 'Yamas & Niyamas',
      sanskrit: 'यम नियम (Ethical Principles)',
      description: 'Yamas: Ahimsa (Non-violence), Satya (Truthfulness), Asteya (Non-stealing), Brahmacharya (Moderation), Aparigraha (Non-possessiveness). Niyamas: Saucha (Purity), Santosha (Contentment), Tapas (Discipline), Svadhyaya (Self-study), Ishvarapranidhana (Surrender).',
      category: 'Ethical Foundation'
    },
    {
      title: 'Moksha & Kaivalya',
      sanskrit: 'मोक्ष / कैवल्य (Ultimate Freedom)',
      description: 'The ultimate aim of classical yoga — complete liberation from cyclic suffering (Samsara), self-realization, and abiding in pure consciousness.',
      category: 'Ultimate Purpose'
    }
  ],

  practices: [
    {
      name: 'Asana',
      sanskrit: 'आसन (Postures)',
      icon: '🧘',
      summary: 'Physical postures designed to build steady stability (Sthira) and ease (Sukha), creating a physical vessel capable of prolonged quiet meditation.',
      historicalContext: 'In early classical texts like the Yoga Sutras, asana referred primarily to seated meditation poses. In medieval Hatha Yoga, dozens of physical postures were developed to strengthen the body and free subtle energetic pathways.',
      keyAspects: ['Steady & Comfortable (Sthiram Sukham Asanam)', 'Spinal alignment', 'Muscular balance', 'Preparation for pranayama']
    },
    {
      name: 'Pranayama',
      sanskrit: 'प्राणायाम (Breath & Life-Force Control)',
      icon: '🌬️',
      summary: 'Techniques for extending and regulating the breath (Prana), bridging the physical body and conscious mind.',
      historicalContext: 'Documented in the Upanishads and codified in Hatha Yoga texts as a method to regulate the autonomic nervous system, calm mental chatter, and cleanse subtle channels (nadis).',
      keyAspects: ['Inhalation (Puraka)', 'Retention (Kumbhaka)', 'Exhalation (Rechaka)', 'Nadi Shodhana & Ujjayi']
    },
    {
      name: 'Dhyana & Dharana',
      sanskrit: 'ध्यान धारणा (Concentration & Meditation)',
      icon: '🕯️',
      summary: 'Dharana is focusing attention on a single point or object; Dhyana is an unbroken, effortless flow of awareness toward that object.',
      historicalContext: 'The core meditative heart of Classical Yoga. Modern neuroscience confirms that regular Dhyana practice alters brain structure, enhancing focus, emotional resilience, and stress reduction.',
      keyAspects: ['Single-pointed focus (Ekagrata)', 'Mindful observation', 'Unbroken attention', 'Gateway to Samadhi']
    },
    {
      name: 'Shatkarma & Kriyas',
      sanskrit: 'षट्कर्म (Six Cleansing Actions)',
      icon: '💧',
      summary: 'Traditional Hatha Yoga internal purification techniques used to balance the three bodily humors (doshas) prior to pranayama.',
      historicalContext: 'Detailed in the Hatha Yoga Pradipika and Gheranda Samhita, including Neti (nasal rinse), Trataka (gazing), Kapalabhati (skull-shining breath), and Nauli (abdominal massage).',
      keyAspects: ['Internal hygiene', 'Dosha balance', 'Respiratory clearing', 'Mental alertness']
    }
  ],

  texts: [
    {
      id: 'yoga-sutras',
      title: 'Yoga Sutras of Patanjali',
      sanskrit: 'योगसूत्र',
      dateLabel: 'c. 400 CE (Scholarly estimate)',
      author: 'Sage Patanjali',
      significance: 'The foundational text of Classical Raja Yoga. Consists of 196 terse aphorisms (sutras) divided into four chapters (Pada): Samadhi, Sadhana, Vibhuti, and Kaivalya.',
      summary: 'Codified the Eight-Limbed Path (Ashtanga Yoga), defined the nature of mind fluctuations (vrittis), and outlined meditative techniques leading to Kaivalya (liberation).',
      keyQuote: 'योगश्चित्तवृत्तिनिरोधः (Yoga is the restriction of the fluctuations of consciousness)'
    },
    {
      id: 'bhagavad-gita',
      title: 'Bhagavad Gita',
      sanskrit: 'श्रीमद्भगवद्गीता',
      dateLabel: 'c. 200 BCE – 200 CE',
      author: 'Attributed to Sage Vyasa (Epic Mahabharata)',
      significance: 'A 700-verse philosophical masterpiece embedded in the Mahabharata. Synthesizes Karma, Bhakti, and Jnana Yoga into a harmonious guide for living with spiritual integrity.',
      summary: 'Presents Krishna\'s teachings to Prince Arjuna on the battlefield, explaining how to act selflessly without attachment, maintain equanimity in adversity, and cultivate devotion.',
      keyQuote: 'योगस्थः कुरु कर्माणि संग त्यक्त्वा धनंजय (Perform your duty poised in yoga, relinquishing all attachment)'
    },
    {
      id: 'hatha-yoga-pradipika',
      title: 'Hatha Yoga Pradipika',
      sanskrit: 'हठयोगप्रदीपिका',
      dateLabel: 'c. 15th Century CE',
      author: 'Swami Swatmarama',
      significance: 'The premier classic manual of Hatha Yoga. Connects physical bodily disciplines (asanas, pranayama, mudras) to the ultimate goal of Raja Yoga meditation.',
      summary: 'Details 15 asanas, 8 pranayama techniques, 10 mudras, and Nadanusandhana (meditation on inner sound), shifting emphasis toward somatic energy work.',
      keyQuote: 'हठं विना राजयोगो राजयोगं विना हठः । न सिद्ध्यति ततो युग्ममानिष्पत्तेः समभ्यसेत् ॥ (Hatha without Raja Yoga, or Raja without Hatha, cannot achieve perfection; both must be practiced together)'
    },
    {
      id: 'gheranda-samhita',
      title: 'Gheranda Samhita',
      sanskrit: 'घेरण्डसंहिता',
      dateLabel: 'c. 17th Century CE',
      author: 'Sage Gheranda',
      significance: 'A major manual of Saptanga (Seven-fold) Hatha Yoga formatted as a dialogue between Sage Gheranda and Chanda Kapali.',
      summary: 'Focuses on 32 asanas, 21 mudras, and 6 shatkarma cleansing practices, viewing the physical body as a vessel (ghata) to be purified through disciplined practice.',
      keyQuote: 'नस्ति मायासमः पाशो नस्ति योगात् परं बलम् (There is no snare like illusion, and no strength greater than Yoga)'
    },
    {
      id: 'principal-upanishads',
      title: 'Principal Upanishads (Katha, Shvetashvatara, Maitri)',
      sanskrit: 'उपनिषद्',
      dateLabel: 'c. 800 BCE – 400 BCE',
      author: 'Vedic Rishis (Sages)',
      significance: 'Contain the earliest textual occurrences of the word "Yoga" defined as disciplined control of the senses, mind, and breath.',
      summary: 'The Katha Upanishad uses the metaphor of a chariot: the body is the chariot, the intellect the driver, the mind the reins, and the senses the horses — with Yoga being the steady control of the reins.',
      keyQuote: 'तां योगमिति मन्यन्ते स्थिरामिन्द्रियधारणाम् (They consider Yoga to be the firm, steady control of the senses)'
    }
  ],

  timelineEntries: [
    {
      id: 'epoch-1',
      periodLabel: 'c. 2500 BCE – 800 BCE',
      epochCategory: 'Ancient Roots',
      title: 'Pre-Vedic & Vedic Foundations',
      description: 'Archeological finds such as the Pashupati Seal from the Indus Valley Civilization depict figures seated in meditative posture. Early Vedic hymns (Rigveda) invoke the concept of Yuj (yoking/union) in the context of meditative discipline and sacred ritual breath.',
      significance: 'Establishes the antiquity of seated meditative iconography and breath regulation in early Indian civilization.',
      sources: 'Archaeological Survey of India / Ministry of Culture Archives'
    },
    {
      id: 'epoch-2',
      periodLabel: 'c. 800 BCE – 200 BCE',
      epochCategory: 'Ancient Roots',
      title: 'Upanishadic & Shramana Era',
      description: 'The Katha, Shvetashvatara, and Maitri Upanishads formally define Yoga as sensory withdrawal and meditative stillness. Simultaneously, Shramana movements (Jainism and Buddhism) develop parallel contemplative, ascetic, and mindfulness systems.',
      significance: 'Transitions Yoga from sacrificial ritual symbolism into an inward science of self-inquiry, ethics (Ahimsa), and mental liberation.',
      sources: 'Oxford Centre for Hindu Studies / IGNCA'
    },
    {
      id: 'epoch-3',
      periodLabel: 'c. 200 BCE – 200 CE',
      epochCategory: 'Classical Era',
      title: 'Bhagavad Gita & Epic Synthesis',
      description: 'The Bhagavad Gita integrates diverse streams of practice into three primary paths: Karma Yoga (Selfless Action), Bhakti Yoga (Devotion), and Jnana Yoga (Self-Knowledge), establishing Yoga as an active path for householders in society.',
      significance: 'Broadened Yoga beyond renunciate ascetics into everyday social and moral life.',
      sources: 'Bhandarkar Oriental Research Institute'
    },
    {
      id: 'epoch-4',
      periodLabel: 'c. 400 CE',
      epochCategory: 'Classical Era',
      title: 'Patanjali\'s Classical Codification',
      description: 'Sage Patanjali synthesizes centuries of oral teachings into 196 Yoga Sutras, establishing Samkhya-Yoga metaphysics and the Eight-Limbed Path (Ashtanga Yoga). This creates the definitive classical text of Indian yoga philosophy.',
      significance: 'Formulated the standard organological and psychological framework for classical Indian meditation.',
      sources: 'Sangeet Natak Akademi / Indian Council of Philosophical Research'
    },
    {
      id: 'epoch-5',
      periodLabel: 'c. 10th – 15th Century CE',
      epochCategory: 'Medieval Synthesis',
      title: 'Medieval Hatha Yoga & Nath Siddhas',
      description: 'Nath Siddha masters like Gorakhnath, Matsyendranath, and Swami Swatmarama author core Hatha manuals (Hatha Yoga Pradipika, Shiva Samhita). Focus shifts to physical postures (asanas), breath retention (pranayama), and subtle energy channels (nadis/chakras).',
      significance: 'Pioneered systematic somatic physical postures and subtle-body energetic disciplines.',
      sources: 'IGNCA / Rashtriya Sanskrit Sansthan'
    },
    {
      id: 'epoch-6',
      periodLabel: '1893 CE',
      epochCategory: 'Modern & Global Era',
      title: 'Swami Vivekananda & 1893 Chicago Parliament',
      description: 'Swami Vivekananda delivers his landmark addresses at the Parliament of the World\'s Religions in Chicago, introducing Raja Yoga and Vedantic philosophy to Western audiences. His 1896 book "Raja Yoga" becomes a global bestseller.',
      significance: 'Initiated the modern international appreciation of Yoga as a universal philosophy of human potential.',
      sources: 'Ramakrishna Mission Archives / Art Institute of Chicago'
    },
    {
      id: 'epoch-7',
      periodLabel: '1930s – 1970s',
      epochCategory: 'Modern & Global Era',
      title: '20th Century Global Transmission & Pioneers',
      description: 'Pioneering masters like T. Krishnamacharya, Swami Kuvalayananda, B.K.S. Iyengar, K. Pattabhi Jois, and Swami Sivananda combine classical yoga with anatomy, establishing yoga research centers (Kaivalyadhama 1924) and introducing structured posture practices worldwide.',
      significance: 'Bridged traditional Indian yoga traditions with modern physical culture, biomechanics, and medical wellness.',
      sources: 'Ministry of AYUSH / Kaivalyadhama Yoga Institute'
    },
    {
      id: 'epoch-8',
      periodLabel: '2014 – Present',
      epochCategory: 'Modern & Global Era',
      title: 'UN International Day of Yoga & UNESCO Recognition',
      description: 'On December 11, 2014, the United Nations General Assembly adopted Resolution 69/131 (co-sponsored by 177 nations) proclaiming June 21 as International Day of Yoga. In 2016, UNESCO officially inscribed Yoga on the Representative List of Intangible Cultural Heritage of Humanity.',
      significance: 'Global formal recognition of Yoga as a priceless cultural gift from India to humanity for health, harmony, and peace.',
      sources: 'United Nations / UNESCO Official Records (2016)'
    }
  ],

  modernGlobal: {
    unescoTitle: 'UNESCO Intangible Cultural Heritage of Humanity (2016)',
    unescoDescription: 'In 2016, UNESCO inscribed Yoga on the Representative List of Intangible Cultural Heritage of Humanity (Decision 11.COM 10.b.17), acknowledging:',
    unescoPoints: [
      'Yoga is based on unifying the mind with the body and soul to achieve greater mental, spiritual, and physical well-being.',
      'Values of non-violence, peace, tolerance, and compassion embedded in yoga play a vital role in community harmony.',
      'Transmission continues traditional Guru-Shishya (teacher-student) learning as well as educational institutions, ashrams, and community spaces across India and the globe.'
    ],
    unDayTitle: 'International Day of Yoga (June 21)',
    unDayDescription: 'Established by UN General Assembly Resolution 69/131 in 2014, celebrated annually by millions in over 190 countries on the Summer Solstice.',
    ayushNote: 'The Ministry of AYUSH (Government of India) publishes the Common Yoga Protocol (CYP) to promote standardized, accessible practice worldwide.'
  },

  sources: [
    {
      title: 'UNESCO — Intangible Cultural Heritage: Yoga (Inscribed 2016, 11.COM 10.b.17)',
      url: 'https://ich.unesco.org/en/RL/yoga-01163'
    },
    {
      title: 'United Nations — International Day of Yoga (UN General Assembly Resolution 69/131)',
      url: 'https://www.un.org/en/observances/yoga-day'
    },
    {
      title: 'Ministry of AYUSH (Government of India) — Common Yoga Protocol & Heritage',
      url: 'https://ayush.gov.in/'
    },
    {
      title: 'Archaeological Survey of India / IGNCA — Ancient Indian Iconography & Vedic Traditions',
      url: 'https://ignca.gov.in/'
    },
    {
      title: 'Bhandarkar Oriental Research Institute — Critical Texts of Indian Philosophy',
      url: 'https://bori.ac.in/'
    },
    {
      title: 'Kaivalyadhama Yoga Research Institute — Scientific & Historical Yoga Studies',
      url: 'https://kdham.com/'
    }
  ]
};
