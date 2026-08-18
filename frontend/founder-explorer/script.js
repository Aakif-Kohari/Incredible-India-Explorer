const founderData = [
    {
        id: "jamsetji-tata",
        founder: "Jamsetji Tata",
        brand: "Tata Group",
        foundingYear: 1868,
        city: "Mumbai",
        region: "Maharashtra",
        industry: "Conglomerate",
        founderStory: "Regarded as the 'Father of Indian Industry', Jamsetji Tata began his entrepreneurial journey with a trading company in 1868 and later set up the Empress Mill in Nagpur in 1874. He laid the foundation for India's industrialization by conceptualizing the Taj Mahal Hotel, the Indian Institute of Science, and the Tata Iron and Steel Company (now Tata Steel), fundamentally shaping modern India's economy.",
        milestones: [
            {
                year: 1868,
                title: "Trading Company Founded",
                description: "Jamsetji started a trading company in Bombay with a capital of ₹21,000."
            },
            {
                year: 1874,
                title: "Empress Mill",
                description: "Established the Central India Spinning, Weaving, and Manufacturing Company in Nagpur."
            },
            {
                year: 1903,
                title: "Taj Mahal Palace Hotel",
                description: "The iconic Taj Mahal Hotel was opened in Mumbai, becoming the first building in the city to use electricity."
            }
        ],
        sources: [
            {
                title: "Tata Group Official History",
                url: "https://www.tata.com/about-us/tata-group-history"
            },
            {
                title: "Biography of Jamsetji Tata",
                url: "#"
            }
        ]
    },
    {
        id: "dhirubhai-ambani",
        founder: "Dhirubhai Ambani",
        brand: "Reliance Industries",
        foundingYear: 1958,
        city: "Mumbai",
        region: "Maharashtra",
        industry: "Conglomerate",
        founderStory: "Dhirubhai Ambani started his business career trading spices and yarn in Aden, Yemen before returning to India to found Reliance Commercial Corporation in 1958. Through aggressive backwards integration and pioneering the equity cult in India by taking his company public in 1977, he built Reliance into a petrochemicals and textiles giant.",
        milestones: [
            {
                year: 1958,
                title: "Reliance Commercial Corporation",
                description: "Started trading spices and polyester yarn in Masjid Bunder, Mumbai."
            },
            {
                year: 1966,
                title: "Naroda Mill",
                description: "Set up a textile mill in Naroda, Gujarat, launching the brand 'Vimal'."
            },
            {
                year: 1977,
                title: "IPO & Equity Cult",
                description: "Reliance went public, introducing thousands of middle-class Indians to the stock market."
            }
        ],
        sources: [
            {
                title: "Reliance Industries Heritage",
                url: "https://www.ril.com/"
            }
        ]
    },
    {
        id: "nr-narayana-murthy",
        founder: "N. R. Narayana Murthy (and co-founders)",
        brand: "Infosys",
        foundingYear: 1981,
        city: "Pune",
        region: "Maharashtra",
        industry: "Technology",
        founderStory: "Founded by N. R. Narayana Murthy and six other software engineers (including Nandan Nilekani and S. Gopalakrishnan) in Pune with a capital of just $250 (Rs 10,000) borrowed from Murthy's wife, Sudha Murty. Infosys pioneered the Global Delivery Model for IT services and became the first Indian company listed on the NASDAQ.",
        milestones: [
            {
                year: 1981,
                title: "Infosys Consultants Founded",
                description: "Established in Pune before moving its headquarters to Bengaluru in 1983."
            },
            {
                year: 1993,
                title: "Indian IPO",
                description: "Infosys went public in India, sharing wealth with employees through ESOPs."
            },
            {
                year: 1999,
                title: "NASDAQ Listing",
                description: "Became the first Indian-registered company to be listed on NASDAQ."
            }
        ],
        sources: [
            {
                title: "Infosys Company History",
                url: "https://www.infosys.com/about/history.html"
            }
        ]
    },
    {
        id: "karsanbhai-patel",
        founder: "Karsanbhai Patel",
        brand: "Nirma",
        foundingYear: 1969,
        city: "Ahmedabad",
        region: "Gujarat",
        industry: "Consumer Goods",
        founderStory: "While working as a lab technician in the geology department of the Gujarat government, Karsanbhai Patel started manufacturing phosphate-free synthetic detergent powder in the backyard of his house. Selling it door-to-door on his bicycle at a fraction of the cost of multinational brands, Nirma democratized detergent for the Indian middle class.",
        milestones: [
            {
                year: 1969,
                title: "Backyard Production",
                description: "Started mixing detergent by hand and selling it on a bicycle."
            },
            {
                year: 1985,
                title: "Market Leader",
                description: "Nirma overtook Surf to become the top-selling detergent in India."
            },
            {
                year: 2004,
                title: "Diversification",
                description: "Expanded into cement, soda ash, and healthcare."
            }
        ],
        sources: [
            {
                title: "Nirma Corporate Story",
                url: "https://www.nirma.co.in/our-story/"
            }
        ]
    },
    {
        id: "kiran-mazumdar-shaw",
        founder: "Kiran Mazumdar-Shaw",
        brand: "Biocon",
        foundingYear: 1978,
        city: "Bengaluru",
        region: "Karnataka",
        industry: "Healthcare",
        founderStory: "Unable to find a job as a master brewer in India due to gender bias, Kiran Mazumdar-Shaw started Biocon out of the garage of her rented house in Bengaluru with ₹10,000. It began as a joint venture extracting enzymes for brewing and evolved into India's premier biopharmaceutical enterprise.",
        milestones: [
            {
                year: 1978,
                title: "Garage Startup",
                description: "Started extracting papain and isinglass for the brewing industry."
            },
            {
                year: 1989,
                title: "US FDA Approval",
                description: "Became the first Indian company to receive US FDA funding for proprietary technologies."
            },
            {
                year: 2004,
                title: "IPO & Evolution",
                description: "Listed on the stock exchange as it pivoted heavily into biopharmaceuticals and insulin."
            }
        ],
        sources: [
            {
                title: "Biocon Heritage",
                url: "https://www.biocon.com/about-us/heritage/"
            }
        ]
    },
    {
        id: "dr-verghese-kurien",
        founder: "Dr. Verghese Kurien (and Tribhuvandas Patel)",
        brand: "Amul",
        foundingYear: 1946,
        city: "Anand",
        region: "Gujarat",
        industry: "Food & Beverage",
        founderStory: "While Tribhuvandas Patel founded the cooperative to stop the exploitation of marginal milk producers, it was Dr. Verghese Kurien who managed and scaled it. Known as the 'Father of the White Revolution', Kurien transformed Amul into a global cooperative model that made India the world's largest milk producer.",
        milestones: [
            {
                year: 1946,
                title: "Kaira District Co-operative",
                description: "Formed in response to unfair trade practices by milk cartels."
            },
            {
                year: 1955,
                title: "Buffalo Milk Powder",
                description: "Pioneered the technology to produce milk powder from buffalo milk instead of cow milk."
            },
            {
                year: 1970,
                title: "Operation Flood",
                description: "Sparked the White Revolution, replicating the Anand pattern across India."
            }
        ],
        sources: [
            {
                title: "Amul Origin Story",
                url: "https://amul.com/m/about-us"
            }
        ]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const grid = document.getElementById("founder-grid");
    const searchInput = document.getElementById("search-input");
    const industryFilter = document.getElementById("industry-filter");
    const regionFilter = document.getElementById("region-filter");
    const noResults = document.getElementById("no-results");
    
    const detailsView = document.getElementById("founder-details");
    const detailsPlaceholder = document.getElementById("details-placeholder");

    // Populate Filters
    const industries = [...new Set(founderData.map(f => f.industry))].sort();
    const regions = [...new Set(founderData.map(f => f.region))].sort();

    industries.forEach(ind => {
        const opt = document.createElement("option");
        opt.value = ind;
        opt.textContent = ind;
        industryFilter.appendChild(opt);
    });

    regions.forEach(reg => {
        const opt = document.createElement("option");
        opt.value = reg;
        opt.textContent = reg;
        regionFilter.appendChild(opt);
    });

    // Render Grid
    function renderGrid() {
        const query = searchInput.value.toLowerCase();
        const industry = industryFilter.value;
        const region = regionFilter.value;

        const filtered = founderData.filter(item => {
            const matchesSearch = item.founder.toLowerCase().includes(query) || item.brand.toLowerCase().includes(query);
            const matchesIndustry = industry === "all" || item.industry === industry;
            const matchesRegion = region === "all" || item.region === region;
            return matchesSearch && matchesIndustry && matchesRegion;
        });

        grid.innerHTML = "";
        
        if (filtered.length === 0) {
            noResults.classList.remove("hidden");
        } else {
            noResults.classList.add("hidden");
            
            filtered.forEach(f => {
                const card = document.createElement("div");
                card.className = "founder-card";
                card.setAttribute("data-id", f.id);
                
                card.innerHTML = `
                    <h3 class="fc-name">${f.founder}</h3>
                    <p class="fc-brand">${f.brand}</p>
                    
                    <div class="fc-meta">
                        <div><span>📍</span> ${f.city}, ${f.region}</div>
                        <div><span>📅</span> Founded: ${f.foundingYear}</div>
                        <div><span>🏷️</span> ${f.industry}</div>
                    </div>
                    
                    <div class="fc-action">View Details &rarr;</div>
                `;
                
                card.addEventListener("click", () => {
                    document.querySelectorAll(".founder-card").forEach(c => c.classList.remove("active"));
                    card.classList.add("active");
                    renderDetails(f);
                });
                
                grid.appendChild(card);
            });
        }
    }

    // Render Detailed View
    function renderDetails(founder) {
        detailsPlaceholder.classList.add("hidden");
        detailsView.classList.remove("hidden");
        
        let milestonesHtml = founder.milestones.map(m => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-year">${m.year}</div>
                <h4 class="timeline-title">${m.title}</h4>
                <p class="timeline-desc">${m.description}</p>
            </div>
        `).join('');

        let sourcesHtml = founder.sources.map(s => `
            <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="source-item">${s.title}</a>
        `).join('');

        detailsView.innerHTML = `
            <div class="fd-header">
                <h2 class="fd-name">${founder.founder}</h2>
                <div class="fd-brand-container">
                    <span class="fd-brand">${founder.brand}</span>
                    <span class="fd-industry-tag">${founder.industry}</span>
                </div>
                <div class="fd-meta">
                    <span>📍 ${founder.city}, ${founder.region}</span>
                    <span>📅 Established: ${founder.foundingYear}</span>
                </div>
            </div>
            
            <h3 class="fd-section-title">The Founder's Story</h3>
            <p class="fd-story">${founder.founderStory}</p>
            
            <h3 class="fd-section-title">Timeline & Milestones</h3>
            <div class="timeline-container">
                <div class="timeline">
                    ${milestonesHtml}
                </div>
            </div>
            
            <h3 class="fd-section-title">Verified Sources</h3>
            <div class="sources-container">
                ${sourcesHtml}
            </div>
        `;
    }

    // Event Listeners for Filters
    searchInput.addEventListener("input", renderGrid);
    industryFilter.addEventListener("change", renderGrid);
    regionFilter.addEventListener("change", renderGrid);

    // Initial render
    renderGrid();
});
