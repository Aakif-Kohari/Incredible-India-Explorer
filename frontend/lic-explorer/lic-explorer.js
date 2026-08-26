/**
 * LIC Explorer - India's Insurance Brand Story
 *
 * A dependency-free, data-first explorer for issue #2640.
 * The module deliberately keeps the historical dataset separate from DOM
 * rendering so the chronology can be tested without a browser.
 */

export const licTimeline = [
    {
        id: 'prehistory-1818',
        year: 1818,
        title: 'Life insurance arrives in India',
        type: 'Origins',
        summary:
            'The Oriental Life Insurance Company was established in Calcutta, marking an early chapter in the development of life insurance in India.',
        details:
            'The LIC history page places the beginnings of the Indian life insurance story in the nineteenth century. This entry provides historical context before the modern nationalised corporation.',
        source: 'LIC India — History',
        sourceUrl: 'https://licindia.in/en/web/guest/history',
        icon: '🌱',
        tags: ['origins', 'calcutta', 'life insurance']
    },
    {
        id: 'insurance-act-1938',
        year: 1938,
        title: 'Insurance Act consolidates regulation',
        type: 'Regulation',
        summary:
            'The Insurance Act of 1938 consolidated earlier legislation with the stated objective of protecting the interests of the insuring public.',
        details:
            'The 1938 framework became an important regulatory foundation for the insurance sector that would later be nationalised and subsequently liberalised.',
        source: 'LIC India — History',
        sourceUrl: 'https://licindia.in/en/web/guest/history',
        icon: '⚖️',
        tags: ['regulation', 'insurance act', 'public protection']
    },
    {
        id: 'nationalisation-ordinance-1956',
        year: 1956,
        title: 'Life insurance is nationalised',
        type: 'Formation',
        summary: 'An ordinance on 19 January 1956 nationalised the life insurance business in India.',
        details:
            'IRDAI records that the nationalisation brought 154 Indian insurers, 16 non-Indian insurers and 75 provident societies into the new public structure — 245 entities in all.',
        source: 'IRDAI — Evolution of Insurance',
        sourceUrl: 'https://irdai.gov.in/evolution-of-insurance',
        icon: '🇮🇳',
        tags: ['nationalisation', '1956', 'government']
    },
    {
        id: 'lic-act-1956',
        year: 1956,
        title: 'LIC Act creates the statutory corporation',
        type: 'Formation',
        summary:
            'Parliament enacted the Life Insurance Corporation Act, 1956, providing the legal framework for transferring life insurance business to a corporation.',
        details:
            'India Code identifies the Act as Act 31 of 1956. Its long title states that it provided for nationalisation of life insurance business and establishment, regulation and control of the corporation.',
        source: 'India Code — Life Insurance Corporation Act, 1956',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/1632?view_type=search',
        icon: '📜',
        tags: ['law', 'lic act', 'parliament']
    },
    {
        id: 'lic-established-1956',
        year: 1956,
        title: 'LIC comes into existence',
        type: 'Formation',
        summary:
            'Life Insurance Corporation of India was established on 1 September 1956 with a Government of India capital contribution of ₹5 crore.',
        details:
            'LIC says the corporation was created to spread life insurance more widely, especially in rural areas, and to provide adequate financial cover at reasonable cost.',
        source: 'LIC India — History',
        sourceUrl: 'https://licindia.in/en/web/guest/history',
        icon: '🏛️',
        tags: ['formation', '1956', 'rural insurance']
    },
    {
        id: 'first-group-policy-1957',
        year: 1957,
        title: 'Group insurance services expand',
        type: 'Services',
        summary:
            'LIC issued its first master policy for a group insurance scheme and its first group superannuation policy.',
        details:
            'The 2024–25 annual report timeline also records the start of the Yogakshema corporate magazine and the Salary Savings Scheme in this period.',
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '👥',
        tags: ['group insurance', 'superannuation', 'services']
    },
    {
        id: 'yogakshema-1957',
        year: 1957,
        title: 'Yogakshema corporate magazine begins',
        type: 'Brand Identity',
        summary: 'LIC launched Yogakshema as a quarterly corporate magazine in May 1957.',
        details:
            "The publication became part of LIC's institutional communication and remains associated with the organisation's corporate identity.",
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '📰',
        tags: ['yogakshema', 'magazine', 'brand']
    },
    {
        id: 'first-investment-policy-1958',
        year: 1958,
        title: 'Investment policy enters the public record',
        type: 'Investment',
        summary: "LIC's first investment policy was placed before Parliament on 25 August 1958.",
        details:
            'The milestone illustrates how the new corporation combined insurance operations with a substantial institutional investment role.',
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '📈',
        tags: ['investment', 'parliament', '1958']
    },
    {
        id: 'uk-branch-1960',
        year: 1960,
        title: 'Overseas branch network grows',
        type: 'Expansion',
        summary: 'LIC opened a foreign branch in the United Kingdom in 1960, building on earlier overseas operations.',
        details:
            'The annual report chronology records foreign operations in Fiji and Mauritius from 1956 and the UK branch in 1960.',
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '🌍',
        tags: ['international', 'uk', 'expansion']
    },
    {
        id: 'computers-1963',
        year: 1963,
        title: 'Computerisation begins',
        type: 'Technology',
        summary: 'LIC installed its first computers, one each in Mumbai and Kolkata offices.',
        details:
            "The milestone is recorded in LIC's historical journey and marks an early step toward large-scale information processing and later digital servicing.",
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '💻',
        tags: ['technology', 'computers', '1963']
    },
    {
        id: 'yogakshema-hq-1963',
        year: 1963,
        title: 'Yogakshema headquarters is inaugurated',
        type: 'Brand Identity',
        summary: "LIC's Yogakshema corporate office was inaugurated in Mumbai in December 1963.",
        details:
            "The headquarters became a prominent physical expression of LIC's institutional identity and remains the corporation's corporate office address.",
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '🏢',
        tags: ['yogakshema', 'headquarters', 'mumbai']
    },
    {
        id: 'general-insurance-1964',
        year: 1964,
        title: 'LIC enters general insurance business',
        type: 'Services',
        summary: 'LIC began doing general insurance business in 1964.',
        details:
            "The milestone is documented in LIC's historical chronology and demonstrates the breadth of financial services handled by the corporation during its early decades.",
        source: 'LIC Annual Report 2020–21 — Historical Timeline',
        sourceUrl: 'https://www.licindia.in/documents/20121/92529/2020-21.pdf/171cb4a7-c857-3a65-ad0b-cbaf2bb47680',
        icon: '🛡️',
        tags: ['general insurance', 'services', '1964']
    },
    {
        id: 'computing-1967',
        year: 1967,
        title: 'Electronic data processing expands',
        type: 'Technology',
        summary: 'IBM 1401/1410 computers were installed at Mumbai and an EDP department began functioning.',
        details:
            'This stage of computerisation helped LIC manage information at a scale suited to a national insurer with a rapidly growing policy and branch network.',
        source: 'LIC Annual Report 2020–21 — Historical Timeline',
        sourceUrl: 'https://www.licindia.in/documents/20121/92529/2020-21.pdf/171cb4a7-c857-3a65-ad0b-cbaf2bb47680',
        icon: '🖥️',
        tags: ['edp', 'ibm', 'technology']
    },
    {
        id: 'agent-clubs-1971',
        year: 1971,
        title: 'Agent Clubs are introduced',
        type: 'Distribution',
        summary: 'LIC introduced the concept of Agents Clubs in 1971.',
        details:
            "The agency network became a central part of LIC's distribution model, helping the organisation reach customers beyond its physical offices.",
        source: 'LIC Annual Report 2020–21 — Historical Timeline',
        sourceUrl: 'https://www.licindia.in/documents/20121/92529/2020-21.pdf/171cb4a7-c857-3a65-ad0b-cbaf2bb47680',
        icon: '🤝',
        tags: ['agents', 'distribution', '1971']
    },
    {
        id: 'reorganisation-1971',
        year: 1971,
        title: 'Branch reorganisation begins',
        type: 'Operations',
        summary:
            'LIC implemented a reorganisation policy from 1971 to 1978, strengthening branches as primary servicing centres.',
        details:
            'The historical timeline describes restructuring that equipped branches to dispose of a large share of the work originating there.',
        source: 'LIC Annual Report 2020–21 — Historical Timeline',
        sourceUrl: 'https://www.licindia.in/documents/20121/92529/2020-21.pdf/171cb4a7-c857-3a65-ad0b-cbaf2bb47680',
        icon: '🧭',
        tags: ['operations', 'branches', 'reorganisation']
    },
    {
        id: 'private-sector-1999',
        year: 1999,
        title: 'Insurance sector begins liberalisation',
        type: 'Market Evolution',
        summary:
            "India reopened the insurance sector to private participation in the late 1990s, ending LIC's earlier monopoly era.",
        details:
            'IRDAI describes LIC as having had a monopoly until the late 1990s, when the insurance sector was reopened to private players.',
        source: 'IRDAI — Evolution of Insurance',
        sourceUrl: 'https://irdai.gov.in/evolution-of-insurance',
        icon: '🔓',
        tags: ['liberalisation', 'competition', '1999']
    },
    {
        id: 'irda-act-1999',
        year: 1999,
        title: 'IRDA framework reshapes the market',
        type: 'Regulation',
        summary:
            "The Insurance Regulatory and Development Authority framework helped establish an independent regulatory structure for India's insurance market.",
        details:
            "LIC's current disclosures list the Insurance Regulatory and Development Authority Act, 1999 among the laws governing the corporation.",
        source: 'LIC — Particulars of LIC',
        sourceUrl: 'https://www.licindia.in/the-particulars-of-lic',
        icon: '⚖️',
        tags: ['irdai', 'regulation', 'market']
    },
    {
        id: 'digital-2016',
        year: 2016,
        title: 'eServices launch',
        type: 'Digital Transformation',
        summary:
            'LIC launched eServices in February 2016, alongside a period of accelerated digitisation of customer records and service channels.',
        details:
            'The LIC annual report timeline also records digitisation of policy records and digital payment options in the following years.',
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '📱',
        tags: ['eservices', 'digital', '2016']
    },
    {
        id: 'digitisation-2017',
        year: 2017,
        title: 'Policy records and digital payments scale up',
        type: 'Digital Transformation',
        summary:
            'LIC completed digitisation of policy records for 29 crore customers and enabled premium payments through wallets, BHIM and UPI.',
        details:
            'The milestone illustrates the transition from a branch-heavy servicing model toward digitally supported customer journeys.',
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '☁️',
        tags: ['digitisation', 'upi', 'customer service']
    },
    {
        id: 'mobile-app-2018',
        year: 2018,
        title: 'LIC mobile app for agents',
        type: 'Digital Transformation',
        summary: 'LIC launched a mobile application for agents in 2018.',
        details:
            "The move extended digital tools to LIC's distribution network and supported more mobile-first workflows.",
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '📲',
        tags: ['mobile', 'agents', 'digital']
    },
    {
        id: 'idbi-2019',
        year: 2019,
        title: 'IDBI Bank acquisition',
        type: 'Corporate Evolution',
        summary: "LIC's 2019 historical timeline records the acquisition of IDBI Bank.",
        details:
            "The event marked a major expansion of LIC's wider financial-services footprint beyond its core life insurance operations.",
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '🏦',
        tags: ['idbi', 'acquisition', 'financial services']
    },
    {
        id: 'ananda-2020',
        year: 2020,
        title: 'ANANDA paperless policy journey',
        type: 'Digital Transformation',
        summary: 'LIC launched ANANDA, a paperless digital application for agents, on 19 November 2020.',
        details:
            'The initiative was designed to support life insurance policy issuance through a paperless module with the help of agents.',
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '🧾',
        tags: ['ananda', 'paperless', '2020']
    },
    {
        id: 'lic-mitra-2020',
        year: 2020,
        title: 'LIC Mitra chatbot launches',
        type: 'Digital Transformation',
        summary: "LIC launched the Hindi chatbot 'LIC Mitra' in 2020.",
        details:
            "The chatbot is part of the corporation's long transition toward digital customer support and self-service.",
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '💬',
        tags: ['chatbot', 'lic mitra', 'customer support']
    },
    {
        id: 'ananda-mobile-2021',
        year: 2021,
        title: 'ANANDA mobile app arrives',
        type: 'Digital Transformation',
        summary: 'LIC launched the ANANDA mobile app on 24 August 2021.',
        details: 'The app extended the digital policy-sales journey from desktop workflows to mobile usage.',
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '📱',
        tags: ['ananda', 'mobile', '2021']
    },
    {
        id: 'listed-2022',
        year: 2022,
        title: 'LIC becomes publicly listed',
        type: 'Capital Markets',
        summary: 'LIC shares were listed on Indian stock exchanges on 17 May 2022.',
        details:
            'The annual report timeline records the listing as a major corporate milestone and the first Annual General Meeting of the corporation later that year.',
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '📊',
        tags: ['ipo', 'listing', '2022']
    },
    {
        id: 'first-agm-2022',
        year: 2022,
        title: 'First Annual General Meeting',
        type: 'Capital Markets',
        summary: 'LIC held its first Annual General Meeting on 27 September 2022.',
        details:
            "The event followed LIC's transition to a listed public company and created a new shareholder-facing governance milestone.",
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '🗳️',
        tags: ['agm', 'governance', '2022']
    },
    {
        id: 'dive-2023',
        year: 2023,
        title: 'Project DIVE launches',
        type: 'Digital Transformation',
        summary: 'LIC launched Project DIVE, described as Digital Innovation and Value Enhancement.',
        details:
            "The project represents LIC's continuing effort to modernise operations and create value through technology and process transformation.",
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '🚀',
        tags: ['dive', 'innovation', '2023']
    },
    {
        id: 'bancassurance-2024',
        year: 2024,
        title: 'Bancassurance partnerships expand',
        type: 'Services',
        summary: 'LIC entered a bancassurance arrangement with IDFC FIRST Bank during 2024.',
        details:
            "The annual report timeline lists the tie-up as part of LIC's continuing evolution of distribution and financial-services partnerships.",
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '🏦',
        tags: ['bancassurance', 'idfc first bank', '2024']
    },
    {
        id: 'bima-sakhi-2024',
        year: 2024,
        title: 'Bima Sakhi Yojana is launched',
        type: 'Distribution',
        summary: "LIC's 2024 timeline records the launch of Bima Sakhi Yojana at Panipat.",
        details: 'The milestone is presented by LIC as part of its contemporary outreach and distribution story.',
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '👩‍💼',
        tags: ['bima sakhi', 'distribution', 'women']
    },
    {
        id: 'demat-2024',
        year: 2024,
        title: 'Electronic policy issuance moves forward',
        type: 'Digital Transformation',
        summary: 'LIC entered an agreement with CAMSREP for electronic issuance of policies in dematerialised form.',
        details:
            'The annual report describes the agreement as an industry milestone supporting more digital policy administration.',
        source: 'LIC Annual Report 2024–25 — LIC The Journey',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        icon: '🔐',
        tags: ['demat', 'digital policy', 'camsrep']
    },
    {
        id: 'scale-2025',
        year: 2025,
        title: 'LIC reports a nationwide scale of operations',
        type: 'Modern LIC',
        summary:
            'As of 31 March 2025, LIC reported 2,048 branch offices, 1,584 satellite offices and 1,168 mini offices, for 5,004 such offices in total.',
        details:
            "LIC's public particulars also report ₹4,88,148.17 crore in total premium income and ₹56,22,929.99 crore in total assets for 2024–25.",
        source: 'LIC — The Particulars of LIC; Annual Report 2024–25',
        sourceUrl: 'https://www.licindia.in/the-particulars-of-lic',
        icon: '🗺️',
        tags: ['scale', 'branches', '2025']
    }
];

export const licServices = [
    {
        id: 'insurance',
        name: 'Insurance Plans',
        icon: '🛡️',
        description:
            'Individual life insurance solutions spanning endowment, whole life, money back, term assurance and riders.',
        examples: ['New Endowment Plan', 'New Jeevan Anand', 'Jeevan Umang', 'Digi Term', 'Bima Kavach'],
        source: 'LIC India — Insurance Plans',
        sourceUrl: 'https://www.licindia.in/insurance-plan'
    },
    {
        id: 'pension',
        name: 'Pension Plans',
        icon: '🌅',
        description: 'Retirement and annuity products designed for pension income and long-term financial security.',
        examples: ['New Pension Plus', 'Jeevan Akshay-VII', 'New Jeevan Shanti', 'Saral Pension', 'Smart Pension'],
        source: 'LIC India — Pension Plans',
        sourceUrl: 'https://www.licindia.in/pension-plan'
    },
    {
        id: 'unit-linked',
        name: 'Unit Linked Plans',
        icon: '📈',
        description:
            'Market-linked life insurance products combining insurance protection with investment-linked value.',
        examples: ["LIC's unit-linked product range"],
        source: 'LIC India — Products',
        sourceUrl: 'https://www.licindia.in/en/web/guest/products'
    },
    {
        id: 'micro',
        name: 'Micro Insurance',
        icon: '🌾',
        description: 'Lower-ticket insurance products intended to extend financial protection to underserved segments.',
        examples: ['Micro Bachat', 'Jan Suraksha'],
        source: 'LIC India — Micro Insurance Plans',
        sourceUrl: 'https://www.licindia.in/en/web/guest/micro-insurance-plans'
    },
    {
        id: 'group',
        name: 'Group & Pension Services',
        icon: '👥',
        description: 'Group insurance, gratuity, superannuation, leave encashment and group credit-life solutions.',
        examples: ['Group Superannuation', 'Group Gratuity', 'Group Credit Life', 'Group Immediate Annuities'],
        source: 'LIC India — Pension & Group Schemes',
        sourceUrl: 'https://licindia.in/en/web/guest/pension-group-schemes'
    },
    {
        id: 'digital',
        name: 'Digital Customer Services',
        icon: '📲',
        description:
            'Digital policy servicing, online purchase journeys, payment channels, mobile tools and assisted digital issuance.',
        examples: ['eServices', 'ANANDA', 'LIC Mitra', 'Online purchase', 'UPI payments'],
        source: 'LIC India — Annual Reports and Buy Online',
        sourceUrl: 'https://www.licindia.in/en/buy-online'
    }
];

export const licBrandIdentity = [
    {
        id: 'yogakshema',
        title: 'Yogakshema',
        era: 'From the early LIC era',
        description:
            "Yogakshema is deeply associated with LIC's corporate identity: it is the name of the corporation's Mumbai headquarters and its long-running house magazine.",
        source: 'LIC Annual Report 2024–25',
        sourceUrl: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25'
    },
    {
        id: 'motto',
        title: 'Yogakshemam Vahamyaham',
        era: 'Institutional motto',
        description:
            "LIC's motto is drawn from the Bhagavad Gita and is commonly interpreted around the idea of carrying responsibility for welfare and security.",
        source: 'Insurance Institute of India — Journal; LIC publications',
        sourceUrl: 'https://www.insuranceinstituteofindia.com/downloads/Forms/III/Journal-2009-10-11/The%20Journal.pdf'
    },
    {
        id: 'trust',
        title: 'A saga of trust',
        era: 'Modern brand language',
        description:
            "LIC's official About Us page frames its decades-long relationship with policyholders around trust and responsibility for millions of lives.",
        source: 'LIC India — About Us',
        sourceUrl: 'https://www.licindia.in/en/web/guest/about-us'
    },
    {
        id: 'zindagi',
        title: 'Zindagi Ke Saath Bhi, Zindagi Ke Baad Bhi',
        era: 'Consumer-facing slogan',
        description:
            "The phrase remains displayed by LIC on its digital customer-facing properties and is strongly associated with the brand's promise of continuity and protection.",
        source: 'LIC India — Digital Customer Portal',
        sourceUrl: 'https://www.nextgen.licindia.in/'
    },
    {
        id: 'art',
        title: 'Art and institutional culture',
        era: '1960s onward',
        description:
            'LIC supported corporate art early in its history; its Yogakshema headquarters became known for a large M. F. Husain mural commissioned in 1963.',
        source: 'The Economic Times — LIC headquarters and M. F. Husain mural',
        sourceUrl: 'https://economictimes.indiatimes.com/a-hussain-work-at-rs-1000/articleshow/5846473.cms'
    }
];

export const licAdvertisingHistory = [
    {
        id: 'institutional-publicity',
        period: '1950s–1970s',
        title: 'Education, publicity and mass reach',
        description:
            'LIC developed a broad public-communication operation using print, outdoor publicity, radio, exhibitions, fairs, publicity vans and its Yogakshema house magazine.',
        significance:
            'The early strategy focused on explaining life insurance and building familiarity with a newly nationalised institution.',
        source: 'Historical documentation on LIC publicity practices; LIC publications',
        sourceUrl: 'https://www.dokumen.pub/mass-media-in-india-1978.html'
    },
    {
        id: 'emotional-branding',
        period: 'Late 20th century',
        title: 'Protection becomes an emotional brand promise',
        description:
            'LIC advertising increasingly used family, security and continuity themes to make an intangible financial product emotionally legible to households.',
        significance:
            'This style helped connect long-term insurance with everyday family responsibilities rather than treating it only as a financial contract.',
        source: 'Documented analysis of LIC advertising campaigns',
        sourceUrl: 'https://www.scribd.com/doc/47900985/Advertisement'
    },
    {
        id: 'zindagi-campaign',
        period: 'Modern consumer advertising',
        title: 'Zindagi Ke Saath Bhi, Zindagi Ke Baad Bhi',
        description:
            "The campaign line positions LIC as a companion across the policyholder's life journey and continues to appear in LIC's digital customer experience.",
        significance:
            "It compresses LIC's promise into a memorable phrase that communicates continuity, family protection and long-term commitment.",
        source: 'LIC India — Digital Customer Portal',
        sourceUrl: 'https://www.nextgen.licindia.in/'
    },
    {
        id: 'digital-communication',
        period: '2016–present',
        title: 'From mass media to digital service storytelling',
        description:
            "LIC's communication environment expanded alongside eServices, mobile applications, online purchase, chatbots and digital policy issuance.",
        significance:
            'The brand story now combines institutional trust with convenience, self-service and digitally assisted policy journeys.',
        source: 'LIC Annual Report 2024–25; LIC Buy Online',
        sourceUrl: 'https://www.licindia.in/en/buy-online'
    }
];

export const licSources = [
    {
        title: 'LIC — Official History',
        url: 'https://licindia.in/en/web/guest/history',
        category: 'Primary source',
        note: 'Nationalisation, formation and institutional history.'
    },
    {
        title: 'LIC — Annual Report 2024–25',
        url: 'https://licindia.in/documents/d/guest/annual-report-of-the-corporation-for-fy-2024-25',
        category: 'Primary source',
        note: 'Historical timeline and recent milestones.'
    },
    {
        title: 'LIC — Particulars of LIC',
        url: 'https://www.licindia.in/the-particulars-of-lic',
        category: 'Primary source',
        note: 'Current operational scale and statutory background.'
    },
    {
        title: 'LIC — Insurance Plans',
        url: 'https://www.licindia.in/insurance-plan',
        category: 'Primary source',
        note: 'Current product categories and examples.'
    },
    {
        title: 'LIC — Pension Plans',
        url: 'https://www.licindia.in/pension-plan',
        category: 'Primary source',
        note: 'Current pension and annuity products.'
    },
    {
        title: 'LIC — Micro Insurance',
        url: 'https://www.licindia.in/en/web/guest/micro-insurance-plans',
        category: 'Primary source',
        note: 'Micro-insurance products.'
    },
    {
        title: 'IRDAI — Evolution of Insurance',
        url: 'https://irdai.gov.in/evolution-of-insurance',
        category: 'Regulator',
        note: 'Nationalisation and liberalisation context.'
    },
    {
        title: 'India Code — LIC Act, 1956',
        url: 'https://www.indiacode.nic.in/handle/123456789/1632?view_type=search',
        category: 'Government source',
        note: "Primary legal record for the corporation's enabling Act."
    }
];

export const LIC_TYPES = [
    'All',
    'Origins',
    'Regulation',
    'Formation',
    'Services',
    'Brand Identity',
    'Investment',
    'Expansion',
    'Technology',
    'Distribution',
    'Operations',
    'Market Evolution',
    'Digital Transformation',
    'Corporate Evolution',
    'Capital Markets',
    'Modern LIC'
];

export function getSortedTimeline(items = licTimeline) {
    if (!Array.isArray(items)) return [];
    return [...items].sort((a, b) => a.year - b.year || a.id.localeCompare(b.id));
}

export function getTimelineTypes(items = licTimeline) {
    const types = new Set();
    getSortedTimeline(items).forEach(item => types.add(item.type));
    return ['All', ...types];
}

export function filterTimeline(type = 'All', items = licTimeline) {
    const sorted = getSortedTimeline(items);
    if (!type || type.toLowerCase() === 'all') return sorted;
    return sorted.filter(item => item.type.toLowerCase() === type.toLowerCase());
}

export function searchTimeline(query = '', items = licTimeline) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return getSortedTimeline(items);
    return getSortedTimeline(items).filter(item => {
        const haystack = [item.title, item.type, item.summary, item.details, item.year, ...(item.tags || [])]
            .join(' ')
            .toLowerCase();
        return haystack.includes(normalized);
    });
}

export function getTimelineStats(items = licTimeline) {
    const sorted = getSortedTimeline(items);
    const years = sorted.map(item => item.year);
    const types = new Set(sorted.map(item => item.type));
    return {
        count: sorted.length,
        firstYear: years.length ? Math.min(...years) : null,
        lastYear: years.length ? Math.max(...years) : null,
        typeCount: types.size,
        digitalMilestones: sorted.filter(item => item.type === 'Digital Transformation').length
    };
}

export function getYearGroups(items = licTimeline) {
    return getSortedTimeline(items).reduce((groups, item) => {
        const key = String(item.year);
        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
        return groups;
    }, {});
}

export function getServiceById(id, services = licServices) {
    return services.find(service => service.id === id) || null;
}

export function searchServices(query = '', services = licServices) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [...services];
    return services.filter(service =>
        [service.name, service.description, ...(service.examples || [])].join(' ').toLowerCase().includes(normalized)
    );
}

export function getBrandIdentityById(id, items = licBrandIdentity) {
    return items.find(item => item.id === id) || null;
}

export function getAdvertisingByPeriod(period, items = licAdvertisingHistory) {
    if (!period) return [...items];
    return items.filter(item => item.period.toLowerCase().includes(period.toLowerCase()));
}

export function createShareUrl(locationLike, itemId) {
    const base = locationLike?.origin || '';
    const pathname = locationLike?.pathname || '/';
    const hash = itemId ? `#milestone-${encodeURIComponent(itemId)}` : '';
    return `${base}${pathname}${hash}`;
}

export function formatYearRange(items = licTimeline) {
    const stats = getTimelineStats(items);
    if (stats.firstYear === null) return 'No timeline data';
    return stats.firstYear === stats.lastYear ? String(stats.firstYear) : `${stats.firstYear}–${stats.lastYear}`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function renderSource(source, sourceUrl) {
    if (!sourceUrl) return `<span class="lic-source-text">${escapeHtml(source)}</span>`;
    return `<a class="lic-source-link" href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source)}</a>`;
}

function renderTimeline(items, selectedId = '') {
    const container = document.getElementById('lic-timeline');
    if (!container) return;
    container.innerHTML = '';

    if (!items.length) {
        container.innerHTML = `
      <div class="lic-empty" role="status">
        <span class="lic-empty-icon">🔎</span>
        <h3>No milestones match your search</h3>
        <p>Try another year, category or keyword.</p>
      </div>`;
        return;
    }

    items.forEach((item, index) => {
        const article = document.createElement('article');
        article.className = `lic-milestone ${item.id === selectedId ? 'is-selected' : ''}`;
        article.id = `milestone-${item.id}`;
        article.dataset.year = String(item.year);
        article.innerHTML = `
      <div class="lic-milestone-marker" aria-hidden="true">${escapeHtml(item.icon)}</div>
      <div class="lic-milestone-year">${escapeHtml(item.year)}</div>
      <div class="lic-milestone-card">
        <div class="lic-card-topline">
          <span class="lic-category-badge">${escapeHtml(item.type)}</span>
          <span class="lic-card-index">${String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="lic-summary">${escapeHtml(item.summary)}</p>
        <details>
          <summary>Read the historical context</summary>
          <p>${escapeHtml(item.details)}</p>
        </details>
        <div class="lic-card-footer">
          ${renderSource(item.source, item.sourceUrl)}
          <button type="button" class="lic-share-btn" data-share-id="${escapeHtml(item.id)}" aria-label="Copy link to ${escapeHtml(item.title)}">🔗 Share</button>
        </div>
      </div>`;
        container.appendChild(article);
    });
}

function renderStats(items) {
    const stats = getTimelineStats(items);
    const count = document.getElementById('lic-stat-milestones');
    const range = document.getElementById('lic-stat-range');
    const types = document.getElementById('lic-stat-types');
    const digital = document.getElementById('lic-stat-digital');
    if (count) count.textContent = String(stats.count);
    if (range) range.textContent = formatYearRange(items);
    if (types) types.textContent = String(stats.typeCount);
    if (digital) digital.textContent = String(stats.digitalMilestones);
}

function renderTypeFilters(activeType) {
    const container = document.getElementById('lic-type-filters');
    if (!container) return;
    container.innerHTML = '';
    getTimelineTypes().forEach(type => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `lic-filter ${type === activeType ? 'is-active' : ''}`;
        button.dataset.type = type;
        button.textContent = type;
        button.setAttribute('aria-pressed', String(type === activeType));
        container.appendChild(button);
    });
}

function renderServices(items = licServices) {
    const container = document.getElementById('lic-services-grid');
    if (!container) return;
    container.innerHTML = items
        .map(
            service => `
    <article class="lic-service-card" data-service-id="${escapeHtml(service.id)}">
      <div class="lic-service-icon" aria-hidden="true">${escapeHtml(service.icon)}</div>
      <h3>${escapeHtml(service.name)}</h3>
      <p>${escapeHtml(service.description)}</p>
      <ul>${service.examples.map(example => `<li>${escapeHtml(example)}</li>`).join('')}</ul>
      <a href="${escapeHtml(service.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(service.source)}</a>
    </article>`
        )
        .join('');
}

function renderBrandIdentity() {
    const container = document.getElementById('lic-brand-grid');
    if (!container) return;
    container.innerHTML = licBrandIdentity
        .map(
            item => `
    <article class="lic-brand-card">
      <span class="lic-brand-era">${escapeHtml(item.era)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
      ${renderSource(item.source, item.sourceUrl)}
    </article>`
        )
        .join('');
}

function renderAdvertising() {
    const container = document.getElementById('lic-advertising-list');
    if (!container) return;
    container.innerHTML = licAdvertisingHistory
        .map(
            (item, index) => `
    <article class="lic-ad-card">
      <div class="lic-ad-number">${String(index + 1).padStart(2, '0')}</div>
      <div>
        <span class="lic-ad-period">${escapeHtml(item.period)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <p class="lic-ad-significance"><strong>Why it matters:</strong> ${escapeHtml(item.significance)}</p>
        ${renderSource(item.source, item.sourceUrl)}
      </div>
    </article>`
        )
        .join('');
}

function activateSection(sectionId) {
    document.querySelectorAll('.lic-view-panel').forEach(panel => {
        panel.hidden = panel.id !== sectionId;
    });
    document.querySelectorAll('.lic-nav-btn').forEach(button => {
        const active = button.dataset.section === sectionId;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-current', active ? 'page' : 'false');
    });
}

function copyShareLink(itemId) {
    const url = createShareUrl(window.location, itemId);
    if (navigator.clipboard?.writeText) {
        return navigator.clipboard.writeText(url).then(() => url);
    }
    const input = document.createElement('input');
    input.value = url;
    input.setAttribute('readonly', 'true');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
    return Promise.resolve(url);
}

function showToast(message) {
    const toast = document.getElementById('lic-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

function setupTheme() {
    const button = document.getElementById('lic-theme-toggle');
    const saved = localStorage.getItem('lic-theme');
    if (saved) document.documentElement.dataset.theme = saved;
    button?.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        localStorage.setItem('lic-theme', next);
        button.setAttribute('aria-label', `Switch to ${next === 'dark' ? 'light' : 'dark'} theme`);
    });
}

function scrollToHash() {
    const raw = window.location.hash.replace(/^#milestone-/, '');
    if (!raw) return;
    const target = document.getElementById(`milestone-${decodeURIComponent(raw)}`);
    if (!target) return;
    activateSection('lic-view-timeline');
    window.requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }));
}

export function initializeLicExplorer() {
    if (typeof document === 'undefined') return;

    let activeType = 'All';
    let query = '';
    let selectedId = '';

    renderTypeFilters(activeType);
    renderStats(licTimeline);
    renderTimeline(licTimeline);
    renderServices();
    renderBrandIdentity();
    renderAdvertising();
    setupTheme();

    document.getElementById('lic-type-filters')?.addEventListener('click', event => {
        const button = event.target.closest('button[data-type]');
        if (!button) return;
        activeType = button.dataset.type || 'All';
        renderTypeFilters(activeType);
        const filtered = searchTimeline(query, filterTimeline(activeType));
        renderStats(filtered);
        renderTimeline(filtered, selectedId);
    });

    document.getElementById('lic-search')?.addEventListener('input', event => {
        query = event.target.value;
        const filtered = searchTimeline(query, filterTimeline(activeType));
        renderStats(filtered);
        renderTimeline(filtered, selectedId);
    });

    document.querySelectorAll('.lic-nav-btn').forEach(button => {
        button.addEventListener('click', () => activateSection(button.dataset.section));
    });

    document.getElementById('lic-timeline')?.addEventListener('click', event => {
        const share = event.target.closest('button[data-share-id]');
        if (!share) return;
        selectedId = share.dataset.shareId || '';
        copyShareLink(selectedId)
            .then(() => showToast('Milestone link copied'))
            .catch(() => showToast('Copy failed — use the page URL'));
    });

    document.getElementById('lic-clear-search')?.addEventListener('click', () => {
        const input = document.getElementById('lic-search');
        if (input) input.value = '';
        query = '';
        renderStats(filterTimeline(activeType));
        renderTimeline(filterTimeline(activeType), selectedId);
    });

    window.addEventListener('hashchange', scrollToHash);
    scrollToHash();
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeLicExplorer);
}
