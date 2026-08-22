(function () {
    "use strict";

    const heritageSites = [
        {
            id: "taj-mahal",
            name: "Taj Mahal",
            city: "Agra",
            state: "Uttar Pradesh",
            latitude: 27.1751,
            longitude: 78.0421,
            distanceRadius: 50000,
            period: "1632–1653",
            category: "Mughal Heritage",
            description:
                "The Taj Mahal is one of India's most celebrated monuments and a UNESCO World Heritage Site. It was commissioned by Shah Jahan as a mausoleum for Mumtaz Mahal.",
            facts: [
                "Built during the Mughal period.",
                "Constructed primarily from white marble.",
                "The complex includes gardens, a mosque and a guest house.",
                "Its architectural design combines several artistic traditions."
            ],
            architecture: [
                {
                    title: "Main Dome",
                    description:
                        "The large central dome forms the visual centerpiece of the mausoleum."
                },
                {
                    title: "Minarets",
                    description:
                        "Four minarets surround the main structure and create a balanced composition."
                },
                {
                    title: "Pietra Dura",
                    description:
                        "Decorative stone inlay work creates floral and geometric patterns."
                }
            ],
            timeline: [
                {
                    year: "1631",
                    text: "Mumtaz Mahal died in Burhanpur."
                },
                {
                    year: "1632",
                    text: "Construction of the Taj Mahal complex began."
                },
                {
                    year: "1648",
                    text: "The main mausoleum was substantially completed."
                },
                {
                    year: "1653",
                    text: "The wider complex reached completion."
                }
            ],
            points: [
                {
                    title: "Main Dome",
                    description: "Central architectural feature",
                    x: 50,
                    y: 32
                },
                {
                    title: "Minarets",
                    description: "Four corner towers",
                    x: 24,
                    y: 50
                },
                {
                    title: "Pietra Dura",
                    description: "Decorative stone inlay",
                    x: 72,
                    y: 56
                }
            ],
            quiz: [
                {
                    question:
                        "Which material is strongly associated with the Taj Mahal?",
                    options: [
                        "White marble",
                        "Red sandstone",
                        "Granite",
                        "Wood"
                    ],
                    answer: 0
                },
                {
                    question:
                        "Who commissioned the Taj Mahal?",
                    options: [
                        "Akbar",
                        "Shah Jahan",
                        "Aurangzeb",
                        "Humayun"
                    ],
                    answer: 1
                }
            ]
        },

        {
            id: "qutub-minar",
            name: "Qutub Minar",
            city: "New Delhi",
            state: "Delhi",
            latitude: 28.5244,
            longitude: 77.1855,
            distanceRadius: 50000,
            period: "12th–13th century",
            category: "Delhi Sultanate",
            description:
                "Qutub Minar is a historic minaret complex in Delhi and one of the city's most recognizable heritage landmarks.",
            facts: [
                "The complex represents several phases of medieval Indian architecture.",
                "The tower is decorated with inscriptions and architectural bands.",
                "The surrounding Qutub complex contains several historic structures."
            ],
            architecture: [
                {
                    title: "Fluted Shaft",
                    description:
                        "The tower features alternating angular and rounded fluting."
                },
                {
                    title: "Decorative Bands",
                    description:
                        "Inscription and ornamental bands run around different sections."
                },
                {
                    title: "Qutub Complex",
                    description:
                        "The wider complex contains gateways, tombs and other historic structures."
                }
            ],
            timeline: [
                {
                    year: "1199",
                    text: "Construction of the minaret was initiated during the early Delhi Sultanate."
                },
                {
                    year: "13th century",
                    text: "Later rulers continued work on the complex."
                },
                {
                    year: "Modern era",
                    text: "The monument became an important protected heritage site."
                }
            ],
            points: [
                {
                    title: "Minaret Shaft",
                    description: "Fluted architectural tower",
                    x: 50,
                    y: 25
                },
                {
                    title: "Inscription Bands",
                    description: "Decorative inscriptions",
                    x: 68,
                    y: 48
                },
                {
                    title: "Qutub Complex",
                    description: "Historic surrounding structures",
                    x: 30,
                    y: 60
                }
            ],
            quiz: [
                {
                    question:
                        "Qutub Minar is located in which city?",
                    options: [
                        "Jaipur",
                        "Delhi",
                        "Agra",
                        "Lucknow"
                    ],
                    answer: 1
                },
                {
                    question:
                        "Qutub Minar is associated with which historical period?",
                    options: [
                        "Delhi Sultanate",
                        "Mauryan Empire",
                        "Gupta Empire",
                        "Chola Empire"
                    ],
                    answer: 0
                }
            ]
        },

        {
            id: "hawa-mahal",
            name: "Hawa Mahal",
            city: "Jaipur",
            state: "Rajasthan",
            latitude: 26.9239,
            longitude: 75.8267,
            distanceRadius: 50000,
            period: "1799",
            category: "Rajput Heritage",
            description:
                "Hawa Mahal is an iconic Jaipur landmark known for its distinctive façade filled with small windows and ornamental details.",
            facts: [
                "The monument is located in Jaipur's historic city area.",
                "Its façade contains numerous small openings.",
                "The design helped air circulate through the building."
            ],
            architecture: [
                {
                    title: "Jharokhas",
                    description:
                        "Small projecting windows form the most recognizable feature of the façade."
                },
                {
                    title: "Honeycomb Façade",
                    description:
                        "The repeated windows create a distinctive honeycomb appearance."
                },
                {
                    title: "Ventilation",
                    description:
                        "The openings help create airflow through the structure."
                }
            ],
            timeline: [
                {
                    year: "1799",
                    text: "Hawa Mahal was constructed during the reign of Sawai Pratap Singh."
                },
                {
                    year: "18th–19th century",
                    text: "The structure became an important part of Jaipur's royal urban landscape."
                },
                {
                    year: "Modern era",
                    text: "It became one of Jaipur's most recognizable tourist landmarks."
                }
            ],
            points: [
                {
                    title: "Jharokhas",
                    description: "Decorative windows",
                    x: 52,
                    y: 35
                },
                {
                    title: "Honeycomb Façade",
                    description: "Repeated architectural openings",
                    x: 30,
                    y: 55
                },
                {
                    title: "Ventilation",
                    description: "Natural airflow design",
                    x: 72,
                    y: 52
                }
            ],
            quiz: [
                {
                    question:
                        "Hawa Mahal is located in which city?",
                    options: [
                        "Udaipur",
                        "Jaipur",
                        "Jodhpur",
                        "Bikaner"
                    ],
                    answer: 1
                },
                {
                    question:
                        "What is a distinctive feature of Hawa Mahal?",
                    options: [
                        "Large minarets",
                        "Jharokha windows",
                        "Underground tunnels",
                        "Stone bridges"
                    ],
                    answer: 1
                }
            ]
        }
    ];


    const state = {
        activeSite: null,
        cameraStream: null,
        location: null,
        narrationEnabled: true,
        modelRotation: 0
    };


    const arView =
        document.getElementById("ar-view");

    const cameraFeed =
        document.getElementById("camera-feed");

    const heritageGrid =
        document.getElementById("heritage-grid");

    const locationStatus =
        document.getElementById("location-status");

    const activeLocation =
        document.getElementById("active-location");

    const arPoints =
        document.getElementById("ar-points");

    const infoCard =
        document.getElementById("ar-info-card");

    const infoTitle =
        document.getElementById("info-title");

    const infoDescription =
        document.getElementById("info-description");

    const infoCategory =
        document.getElementById("info-category");

    const infoFacts =
        document.getElementById("info-facts");

    const detailsSection =
        document.getElementById("details-section");

    const detailsTitle =
        document.getElementById("details-title");

    const detailsLocation =
        document.getElementById("details-location");

    const detailsDescription =
        document.getElementById("details-description");

    const timeline =
        document.getElementById("timeline");

    const architectureList =
        document.getElementById("architecture-list");

    const factsList =
        document.getElementById("facts-list");

    const toast =
        document.getElementById("toast");

    const heritageModel =
        document.getElementById("heritage-model");


    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(showToast.timer);

        showToast.timer =
            setTimeout(function () {
                toast.classList.remove("show");
            }, 2600);
    }


    function calculateDistance(
        lat1,
        lon1,
        lat2,
        lon2
    ) {
        const earthRadius = 6371;

        const dLat =
            (lat2 - lat1) *
            Math.PI /
            180;

        const dLon =
            (lon2 - lon1) *
            Math.PI /
            180;

        const a =
            Math.sin(dLat / 2) *
            Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c =
            2 *
            Math.atan2(
                Math.sqrt(a),
                Math.sqrt(1 - a)
            );

        return earthRadius * c;
    }


    function renderHeritageCards() {

        heritageGrid.innerHTML =
            heritageSites
                .map(function (site) {

                    return `
                        <article class="heritage-card">

                            <div class="heritage-card-content">

                                <span class="section-badge">
                                    ${site.category}
                                </span>

                                <h3>
                                    ${site.name}
                                </h3>

                                <p class="heritage-location">
                                    ${site.city}, ${site.state}
                                </p>

                                <p>
                                    ${site.description}
                                </p>

                                <div class="heritage-meta">

                                    <span class="meta-pill">
                                        ${site.period}
                                    </span>

                                    <span class="meta-pill">
                                        ${site.points.length} AR Points
                                    </span>

                                </div>

                                <div class="card-actions">

                                    <button
                                        type="button"
                                        class="primary-button"
                                        data-action="launch"
                                        data-id="${site.id}"
                                    >
                                        Launch AR
                                    </button>

                                    <button
                                        type="button"
                                        class="secondary-button"
                                        data-action="details"
                                        data-id="${site.id}"
                                    >
                                        Explore History
                                    </button>

                                </div>

                            </div>

                        </article>
                    `;
                })
                .join("");


        document
            .querySelectorAll("[data-action]")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const site =
                            heritageSites.find(
                                function (item) {
                                    return item.id ===
                                        button.dataset.id;
                                }
                            );

                        if (!site) {
                            return;
                        }

                        if (
                            button.dataset.action ===
                            "launch"
                        ) {
                            launchAR(site);
                        }

                        if (
                            button.dataset.action ===
                            "details"
                        ) {
                            showDetails(site);
                        }
                    }
                );

            });
    }


    async function startCamera() {

        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {

            showToast(
                "Camera access is not supported by this browser."
            );

            return false;
        }


        try {

            state.cameraStream =
                await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: {
                            ideal: "environment"
                        }
                    },
                    audio: false
                });


            cameraFeed.srcObject =
                state.cameraStream;


            return true;

        } catch (error) {

            console.error(
                "Camera error:",
                error
            );

            showToast(
                "Camera permission was denied or unavailable."
            );

            return false;
        }
    }


    function stopCamera() {

        if (!state.cameraStream) {
            return;
        }


        state.cameraStream
            .getTracks()
            .forEach(function (track) {
                track.stop();
            });


        state.cameraStream = null;
        cameraFeed.srcObject = null;
    }


    async function launchAR(site) {

        state.activeSite = site;

        activeLocation.textContent =
            `${site.name} • ${site.city}`;


        arView.hidden = false;

        document.body.style.overflow =
            "hidden";


        const cameraStarted =
            await startCamera();


        if (!cameraStarted) {

            arView.hidden = true;

            document.body.style.overflow =
                "";

            return;
        }


        renderARPoints(site);

        showToast(
            `${site.name} AR experience started.`
        );


        if (
            "XRSystem" in window &&
            navigator.xr
        ) {

            showToast(
                "WebXR is available on this device."
            );
        }
    }


    function closeAR() {

        stopCamera();

        arView.hidden = true;

        infoCard.hidden = true;

        document.body.style.overflow =
            "";

        state.activeSite = null;
    }


    function renderARPoints(site) {

        arPoints.innerHTML =
            site.points
                .map(function (point) {

                    return `
                        <button
                            type="button"
                            class="ar-point"
                            style="
                                left:${point.x}%;
                                top:${point.y}%;
                            "
                            data-point-title="${point.title}"
                            data-point-description="${point.description}"
                        >
                            <strong>
                                ${point.title}
                            </strong>

                            <small>
                                ${point.description}
                            </small>
                        </button>
                    `;
                })
                .join("");


        arPoints
            .querySelectorAll(".ar-point")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        showInfo(
                            site,
                            button.dataset.pointTitle,
                            button.dataset.pointDescription
                        );

                    }
                );

            });
    }


    function showInfo(
        site,
        pointTitle,
        pointDescription
    ) {

        infoCategory.textContent =
            pointTitle;

        infoTitle.textContent =
            site.name;

        infoDescription.textContent =
            pointDescription;


        infoFacts.innerHTML =
            site.facts
                .slice(0, 3)
                .map(function (fact) {

                    return `
                        <span class="info-fact">
                            ${fact}
                        </span>
                    `;
                })
                .join("");


        infoCard.hidden = false;
    }


    function hideInfo() {
        infoCard.hidden = true;
    }


    function showDetails(site) {

        state.activeSite = site;

        detailsSection.hidden =
            false;


        detailsTitle.textContent =
            site.name;

        detailsLocation.textContent =
            `${site.city}, ${site.state} • ${site.period}`;

        detailsDescription.textContent =
            site.description;


        timeline.innerHTML =
            site.timeline
                .map(function (event) {

                    return `
                        <div class="timeline-item">

                            <strong>
                                ${event.year}
                            </strong>

                            <span>
                                ${event.text}
                            </span>

                        </div>
                    `;
                })
                .join("");


        architectureList.innerHTML =
            site.architecture
                .map(function (item) {

                    return `
                        <div class="architecture-item">

                            <strong>
                                ${item.title}
                            </strong>

                            <span>
                                ${item.description}
                            </span>

                        </div>
                    `;
                })
                .join("");


        factsList.innerHTML =
            site.facts
                .map(function (fact) {
                    return `<li>${fact}</li>`;
                })
                .join("");


        renderQuiz(site);


        detailsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }


    function renderQuiz(site) {

        const quizContainer =
            document.getElementById(
                "quiz-container"
            );


        quizContainer.innerHTML =
            site.quiz
                .map(function (question, index) {

                    return `
                        <div
                            class="quiz-question"
                            data-question="${index}"
                        >

                            <h4>
                                ${index + 1}.
                                ${question.question}
                            </h4>

                            ${question.options
                                .map(
                                    function (
                                        option,
                                        optionIndex
                                    ) {

                                        return `
                                            <button
                                                type="button"
                                                class="quiz-option"
                                                data-question="${index}"
                                                data-option="${optionIndex}"
                                            >
                                                ${option}
                                            </button>
                                        `;
                                    }
                                )
                                .join("")}

                        </div>
                    `;
                })
                .join("") +
            `<div
                id="quiz-result"
                class="quiz-result"
            ></div>`;


        quizContainer
            .querySelectorAll(".quiz-option")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const questionIndex =
                            Number(
                                button.dataset.question
                            );

                        const optionIndex =
                            Number(
                                button.dataset.option
                            );

                        const question =
                            site.quiz[
                                questionIndex
                            ];


                        const allOptions =
                            quizContainer.querySelectorAll(
                                `[data-question="${questionIndex}"].quiz-option`
                            );


                        allOptions.forEach(
                            function (option) {
                                option.disabled = true;
                            }
                        );


                        if (
                            optionIndex ===
                            question.answer
                        ) {

                            button.classList.add(
                                "correct"
                            );

                            showToast(
                                "Correct answer."
                            );

                        } else {

                            button.classList.add(
                                "incorrect"
                            );

                            allOptions[
                                question.answer
                            ].classList.add(
                                "correct"
                            );

                            showToast(
                                "Not quite. The correct answer is highlighted."
                            );
                        }


                        updateQuizResult(site);
                    }
                );

            });
    }


    function updateQuizResult(site) {

        const answered =
            document.querySelectorAll(
                ".quiz-option:disabled"
            ).length;


        const total =
            site.quiz.length;


        const result =
            document.getElementById(
                "quiz-result"
            );


        const questionsAnswered =
            Math.min(
                total,
                Math.floor(answered / 4)
            );


        if (
            questionsAnswered >= total
        ) {

            const correct =
                document.querySelectorAll(
                    ".quiz-option.correct"
                ).length;


            result.textContent =
                `Quiz complete. You answered ${correct} question(s) correctly.`;
        }
    }


    function narrateSite() {

        if (
            !state.activeSite ||
            !("speechSynthesis" in window)
        ) {

            showToast(
                "Audio narration is not supported."
            );

            return;
        }


        if (
            speechSynthesis.speaking
        ) {

            speechSynthesis.cancel();

            return;
        }


        const text =
            `${state.activeSite.name}. ${state.activeSite.description}. ` +
            `Historical period: ${state.activeSite.period}. ` +
            state.activeSite.facts.join(" ");


        const utterance =
            new SpeechSynthesisUtterance(text);


        utterance.rate = 0.92;
        utterance.pitch = 1;


        speechSynthesis.speak(
            utterance
        );
    }


    function toggleFavorite() {

        if (
            !state.activeSite ||
            !window.Journey
        ) {

            showToast(
                "My Journey is unavailable."
            );

            return;
        }


        const site =
            state.activeSite;


        const saved =
            window.Journey.toggle({

                id:
                    `ar-${site.id}`,

                explorerPage:
                    "ar-heritage-explorer",

                title:
                    `${site.name} AR Experience`,

                category:
                    "AR Heritage",

                description:
                    site.description,

                thumbnail:
                    "",

                link:
                    `index.html#${site.id}`
            });


        const favoriteButton =
            document.getElementById(
                "favorite-button"
            );


        const detailsFavorite =
            document.getElementById(
                "details-favorite"
            );


        favoriteButton.textContent =
            saved ? "★" : "☆";


        favoriteButton.classList.toggle(
            "saved",
            saved
        );


        detailsFavorite.textContent =
            saved
                ? "★ Saved to My Journey"
                : "☆ Save Experience";


        showToast(
            saved
                ? "Heritage experience saved."
                : "Heritage experience removed."
        );
    }


    function detectLocation() {

        if (
            !navigator.geolocation
        ) {

            locationStatus.textContent =
                "Geolocation is not supported.";

            return;
        }


        locationStatus.textContent =
            "Detecting your location...";


        navigator.geolocation.getCurrentPosition(
            function (position) {

                state.location = {
                    latitude:
                        position.coords.latitude,

                    longitude:
                        position.coords.longitude
                };


                const nearest =
                    heritageSites
                        .map(function (site) {

                            return {
                                site: site,

                                distance:
                                    calculateDistance(
                                        state.location.latitude,
                                        state.location.longitude,
                                        site.latitude,
                                        site.longitude
                                    )
                            };
                        })
                        .sort(
                            function (a, b) {
                                return (
                                    a.distance -
                                    b.distance
                                );
                            }
                        )[0];


                if (!nearest) {
                    return;
                }


                locationStatus.textContent =
                    `Nearest supported heritage site: ${nearest.site.name} (${nearest.distance.toFixed(1)} km away)`;


                if (
                    nearest.distance <=
                    nearest.site.distanceRadius / 1000
                ) {

                    showToast(
                        `${nearest.site.name} is supported. You can launch the AR experience.`
                    );
                }

            },

            function (error) {

                console.error(
                    "Location error:",
                    error
                );


                locationStatus.textContent =
                    "Unable to access your location.";

                showToast(
                    "Please allow location access to use location-aware heritage discovery."
                );
            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 30000
            }
        );
    }


    function scanHeritage() {

        if (!state.activeSite) {
            return;
        }


        const firstPoint =
            state.activeSite.points[0];


        showInfo(
            state.activeSite,
            firstPoint.title,
            firstPoint.description
        );


        showToast(
            `Heritage point detected: ${firstPoint.title}`
        );
    }


    function rotateModel(amount) {

        state.modelRotation +=
            amount;


        heritageModel.style.transform =
            `rotateY(${state.modelRotation}deg)`;
    }


    function initializeTheme() {

        const themeToggle =
            document.getElementById(
                "theme-toggle"
            );


        if (!themeToggle) {
            return;
        }


        themeToggle.addEventListener(
            "click",
            function () {

                document.body.classList.toggle(
                    "light-theme"
                );

            }
        );
    }


    function initializeNavigation() {

        const menuToggle =
            document.getElementById(
                "menu-toggle"
            );

        const navMenu =
            document.getElementById(
                "nav-menu"
            );


        if (
            !menuToggle ||
            !navMenu
        ) {
            return;
        }


        menuToggle.addEventListener(
            "click",
            function () {

                const expanded =
                    menuToggle.getAttribute(
                        "aria-expanded"
                    ) === "true";


                menuToggle.setAttribute(
                    "aria-expanded",
                    String(!expanded)
                );


                navMenu.classList.toggle(
                    "active"
                );

            }
        );
    }


    function initializeEvents() {

        document
            .getElementById("start-ar")
            .addEventListener(
                "click",
                function () {

                    if (
                        !state.activeSite
                    ) {

                        state.activeSite =
                            heritageSites[0];
                    }


                    launchAR(
                        state.activeSite
                    );
                }
            );


        document
            .getElementById("detect-location")
            .addEventListener(
                "click",
                detectLocation
            );


        document
            .getElementById("close-ar")
            .addEventListener(
                "click",
                closeAR
            );


        document
            .getElementById("close-info")
            .addEventListener(
                "click",
                hideInfo
            );


        document
            .getElementById("scan-button")
            .addEventListener(
                "click",
                scanHeritage
            );


        document
            .getElementById("narrate-button")
            .addEventListener(
                "click",
                narrateSite
            );


        document
            .getElementById("toggle-sound")
            .addEventListener(
                "click",
                function () {

                    state.narrationEnabled =
                        !state.narrationEnabled;

                    showToast(
                        state.narrationEnabled
                            ? "Narration enabled."
                            : "Narration disabled."
                    );
                }
            );


        document
            .getElementById("favorite-button")
            .addEventListener(
                "click",
                toggleFavorite
            );


        document
            .getElementById("details-favorite")
            .addEventListener(
                "click",
                toggleFavorite
            );


        document
            .getElementById("open-details")
            .addEventListener(
                "click",
                function () {

                    if (state.activeSite) {
                        showDetails(
                            state.activeSite
                        );
                    }

                    closeAR();
                }
            );


        document
            .getElementById("rotate-left")
            .addEventListener(
                "click",
                function () {
                    rotateModel(-30);
                }
            );


        document
            .getElementById("rotate-right")
            .addEventListener(
                "click",
                function () {
                    rotateModel(30);
                }
            );
    }


    function init() {

        renderHeritageCards();

        initializeTheme();

        initializeNavigation();

        initializeEvents();
    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();
    }

})();