/**
 * Decimal Number System Explorer - Core Logic & Datasets
 * Showcases ancient Indian place value notation, zero (Shunya), and global mathematical impact.
 */

export const DECIMAL_EXPLORER_INFO = {
    id: 'decimal-number-system',
    name: 'Decimal Place-Value System',
    origin: 'Ancient India',
    era: 'Vedic to Classical Period (c. 1500 BCE – 628 CE)',
    base: 10,
    coreConcepts: [
        'Positional Place Value',
        'Shunya (Zero as Digit & Value)',
        'Base-10 Exponential Notation',
        'Algorithmic Arithmetic (+, -, ×, ÷)',
    ],
    laplaceQuote:
        'It is India that gave us the ingenious method of expressing all numbers by means of ten symbols, each symbol receiving a value of position as well as an absolute value.',
};

export const DECIMAL_TIMELINE = [
    {
        id: 'vedic-period',
        period: 'c. 1500 – 500 BCE',
        era: 'Vedic Literature & Shulba Sutras',
        title: 'Powers of Ten in Sanskrit Texts',
        description:
            'The Yajurveda Samhita names powers of 10 up to 10¹² (Eka, Dasa, Sata, Sahasra, Ayuta, Niyuta, Prayuta, Arbuda, Nyarbuda, Samudra, Madhya, Anta, Parardha). No other ancient civilization had named scale numbers of such magnitude.',
    },
    {
        id: 'bakhshali-ms',
        period: 'c. 3rd – 4th Century CE',
        era: 'Bakhshali Manuscript',
        title: 'Earliest Carbon-Dated Zero Dot Symbol',
        description:
            'Discovered in 1881 near Peshawar, carbon dating by Oxford University confirmed the Bakhshali Manuscript contains the oldest recorded use of a black dot (bindu) used as a zero placeholder.',
    },
    {
        id: 'aryabhata-era',
        period: '499 CE',
        era: 'Aryabhata I — Aryabhatiya',
        title: 'Formalization of Positional Place Value',
        description:
            'Aryabhata codified the positional principle in verse: "Stānāt stānaṁ daśaguṇaṁ syāt" (From place to place, each is ten times the preceding). He devised an alphabetic base-10 numerical system for astronomical tables.',
    },
    {
        id: 'brahmagupta-era',
        period: '628 CE',
        era: 'Brahmagupta — Brahmasphutasiddhanta',
        title: 'Zero as an Operational Number',
        description:
            'Brahmagupta established the first formal mathematical rules for calculating with Zero (Shunya) and negative numbers: a + 0 = a, a - 0 = a, a × 0 = 0, and 0/a = 0.',
    },
    {
        id: 'global-transmission',
        period: '8th – 13th Century CE',
        era: 'Islamic Golden Age & European Adoption',
        title: 'Transmission via Al-Khwarizmi & Fibonacci',
        description:
            'Syrian scholar Severus Sebokht praised Indian computation in 662 CE. Persian scholar Al-Khwarizmi published "On Calculation with Hindu Numerals" (c. 825 CE). Fibonacci later introduced the "Modus Indorum" to Europe in his 1202 CE "Liber Abaci".',
    },
];

export const DECIMAL_IMPACT = [
    {
        id: 'algebra-calculus',
        icon: '📐',
        title: 'Foundation of Algebra & Calculus',
        description:
            'Positional notation simplified complex polynomial equations, square roots, and infinite series, laying the ground for Newton and Leibniz.',
    },
    {
        id: 'astronomy-navigation',
        icon: '🪐',
        title: 'Astronomical Precision',
        description:
            'Enabled Aryabhata and Varahamihira to calculate solar years, lunar eclipses, and planetary circumferences with astonishing accuracy.',
    },
    {
        id: 'digital-computing',
        icon: '💻',
        title: 'Binary & Modern Computing',
        description:
            'The concept of positional base systems directly inspired Leibniz to formulate Binary (Base 2), the bedrock of modern electronic microprocessors.',
    },
    {
        id: 'global-commerce',
        icon: '📊',
        title: 'Universal Banking & Trade',
        description:
            'Standardized global financial accounting, compound interest calculation, and double-entry bookkeeping by making large numbers effortless to write.',
    },
];

export const DECIMAL_REFERENCES = [
    {
        id: 'ref-laplace',
        source: 'Pierre-Simon Laplace (1814)',
        title: 'Exposition du Système du Monde',
        quote:
            'How grateful we ought to be to the wisdom of the Indians for this profound invention, which escaped the genius of Archimedes and Apollonius.',
    },
    {
        id: 'ref-sebokht',
        source: 'Severus Sebokht (662 CE)',
        title: 'Syrian Bishop Commentary',
        quote:
            'Their subtle discoveries in astronomy, and their computing methods that surpass description... done by means of nine signs.',
    },
    {
        id: 'ref-ifrah',
        source: 'Georges Ifrah (1998)',
        title: 'Universal History of Numbers',
        quote:
            'The concept of zero and positional notation developed in India represents one of the greatest intellectual feats in human history.',
    },
    {
        id: 'ref-albiruni',
        source: 'Al-Biruni (1030 CE)',
        title: 'Kitab al-Hind (Indica)',
        quote:
            'The numerical signs which we use are derived from the finest forms of the Hindu numeral characters.',
    },
];

export const DECIMAL_QUIZ = [
    {
        id: 1,
        question: 'Which ancient Indian text first explicitly defined rules for arithmetic with Zero (Shunya)?',
        options: [
            'Brahmasphutasiddhanta by Brahmagupta (628 CE)',
            'Aryabhatiya by Aryabhata (499 CE)',
            'Surya Siddhanta',
            'Lilavati by Bhaskara II',
        ],
        correct: 0,
        explanation:
            'Brahmagupta in 628 CE was the first mathematician to define arithmetic rules for zero (addition, subtraction, multiplication).',
    },
    {
        id: 2,
        question: 'What does Aryabhata’s famous rule "Stānāt stānaṁ daśaguṇaṁ syāt" mean?',
        options: [
            'From place to place, each is ten times the preceding',
            'Circles are divided into 360 degrees',
            'Zero multiplied by any number is zero',
            'The hypotenuse equals the sum of squares',
        ],
        correct: 0,
        explanation:
            'It translates to "From place to place, each is ten times the preceding", describing the base-10 positional decimal system.',
    },
    {
        id: 3,
        question: 'Which manuscript contains the world’s oldest carbon-dated symbol for Zero (a black dot)?',
        options: ['Bakhshali Manuscript', 'Rhind Papyrus', 'Plimpton 322', 'Dead Sea Scrolls'],
        correct: 0,
        explanation:
            'Carbon dating by Oxford University confirmed the Bakhshali Manuscript contains zero dots dating to 3rd–4th century CE.',
    },
    {
        id: 4,
        question: 'Which Italian mathematician introduced the Indian decimal numerals ("Modus Indorum") to Europe in 1202 CE?',
        options: ['Fibonacci (Leonardo of Pisa)', 'Galileo Galilei', 'René Descartes', 'Girolamo Cardano'],
        correct: 0,
        explanation:
            'Fibonacci published "Liber Abaci" in 1202 CE after learning the Indian number system from Arab merchants in North Africa.',
    },
];

// Helper: Convert Integer to Roman Numeral
export function numberToRoman(num) {
    if (typeof num !== 'number' || isNaN(num) || num <= 0 || num > 3999) {
        return 'N/A (Range 1-3999)';
    }
    const lookup = [
        { val: 1000, sym: 'M' },
        { val: 900, sym: 'CM' },
        { val: 500, sym: 'D' },
        { val: 400, sym: 'CD' },
        { val: 100, sym: 'C' },
        { val: 90, sym: 'XC' },
        { val: 50, sym: 'L' },
        { val: 40, sym: 'XL' },
        { val: 10, sym: 'X' },
        { val: 9, sym: 'IX' },
        { val: 5, sym: 'V' },
        { val: 4, sym: 'IV' },
        { val: 1, sym: 'I' },
    ];

    let roman = '';
    let temp = Math.floor(num);
    for (const item of lookup) {
        while (temp >= item.val) {
            roman += item.sym;
            temp -= item.val;
        }
    }
    return roman;
}

// Place Value Names for Integer Columns (0 to 9th power)
const PLACE_NAMES = [
    'Units (10⁰)',
    'Tens (10¹)',
    'Hundreds (10²)',
    'Thousands (10³)',
    'Ten Thousands (10⁴)',
    'Lakhs / Hundred Thousands (10⁵)',
    'Ten Lakhs / Millions (10⁶)',
    'Crores / Ten Millions (10⁷)',
    'Ten Crores / Hundred Millions (10⁸)',
];

// Calculate Place Value Breakdown for any number
export function calculatePlaceValue(inputVal) {
    const rawStr = String(inputVal).trim();
    if (!rawStr || isNaN(Number(rawStr))) {
        return null;
    }

    // Work with integer portion for table breakdown
    const num = Math.abs(parseFloat(rawStr));
    const intPartStr = String(Math.floor(num));
    const len = intPartStr.length;

    const breakdown = [];
    for (let i = 0; i < len; i++) {
        const digit = parseInt(intPartStr[i], 10);
        const power = len - 1 - i;
        const placeName = PLACE_NAMES[power] || `10^${power}`;
        const multiplier = Math.pow(10, power);
        const contribution = digit * multiplier;

        breakdown.push({
            digit,
            power,
            placeName,
            multiplier,
            contribution,
        });
    }

    return {
        originalInput: rawStr,
        parsedNumber: num,
        intPartStr,
        breakdown,
    };
}

// DOM Manipulations & Rendering
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Initialization
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            themeToggleBtn.querySelector('.theme-icon').textContent = isLight ? '☀️' : '🌙';
        });

        // Set initial icon
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            themeToggleBtn.querySelector('.theme-icon').textContent = '☀️';
        }
    }

    // Place Value Input & Controls
    const numberInput = document.getElementById('number-input');
    const randomBtn = document.getElementById('btn-random-number');

    if (numberInput) {
        numberInput.addEventListener('input', () => {
            updatePlaceValueDisplay(numberInput.value);
        });
    }

    if (randomBtn && numberInput) {
        randomBtn.addEventListener('click', () => {
            const randomVal = Math.floor(Math.random() * 99999) + 1;
            numberInput.value = randomVal;
            updatePlaceValueDisplay(randomVal);
        });
    }

    // Converter Input
    const converterInput = document.getElementById('converter-input');
    const romanResult = document.getElementById('roman-result');
    if (converterInput && romanResult) {
        converterInput.addEventListener('input', () => {
            const val = parseInt(converterInput.value, 10);
            romanResult.textContent = numberToRoman(val);
        });
    }

    // Initial render of place value
    if (numberInput) {
        updatePlaceValueDisplay(numberInput.value);
    }

    // Render Static Sections
    renderTimeline();
    renderImpactCards();
    renderReferences();
    renderQuiz();
});

function updatePlaceValueDisplay(val) {
    const data = calculatePlaceValue(val);
    if (!data || data.breakdown.length === 0) return;

    const headersRow = document.getElementById('pv-headers');
    const digitsRow = document.getElementById('pv-digits');
    const placesRow = document.getElementById('pv-places');
    const powersRow = document.getElementById('pv-powers');
    const valueRow = document.getElementById('pv-contributions');
    const expandedNotation = document.getElementById('expanded-notation');
    const visualBlocks = document.getElementById('visual-blocks');

    if (!headersRow || !digitsRow || !placesRow || !powersRow || !valueRow) return;

    headersRow.innerHTML = '<th>Column</th>' + data.breakdown.map((_, idx) => `<th>Col ${data.breakdown.length - idx}</th>`).join('');
    digitsRow.innerHTML = '<td>Digit (Face Value)</td>' + data.breakdown.map(item => `<td>${item.digit}</td>`).join('');
    placesRow.innerHTML = '<td>Place Name</td>' + data.breakdown.map(item => `<td>${item.placeName}</td>`).join('');
    powersRow.innerHTML = '<td>Multiplier (10<sup>n</sup>)</td>' + data.breakdown.map(item => `<td>10<sup>${item.power}</sup> = ${item.multiplier.toLocaleString()}</td>`).join('');
    valueRow.innerHTML = '<td>Place Value Contribution</td>' + data.breakdown.map(item => `<td>${item.contribution.toLocaleString()}</td>`).join('');

    // Expanded Notation string
    const terms = data.breakdown.map(item => `(${item.digit} × 10<sup>${item.power}</sup>)`).join(' + ');
    if (expandedNotation) {
        expandedNotation.innerHTML = `<strong>${data.intPartStr}</strong> = ${terms}`;
    }

    // Visual Blocks Representation (Units, Tens, Hundreds)
    if (visualBlocks) {
        visualBlocks.innerHTML = '';
        data.breakdown.slice(-3).forEach(item => {
            if (item.digit > 0) {
                const col = document.createElement('div');
                col.className = 'visual-column';
                
                const title = document.createElement('div');
                title.className = 'visual-column-title';
                title.textContent = `${item.digit} × ${item.multiplier}`;
                col.appendChild(title);

                const stack = document.createElement('div');
                stack.className = 'blocks-stack';

                let blockClass = 'block-unit';
                if (item.power === 1) blockClass = 'block-ten';
                if (item.power >= 2) blockClass = 'block-hundred';

                for (let b = 0; b < Math.min(item.digit, 10); b++) {
                    const block = document.createElement('div');
                    block.className = blockClass;
                    stack.appendChild(block);
                }
                col.appendChild(stack);
                visualBlocks.appendChild(col);
            }
        });
    }
}

function renderTimeline() {
    const container = document.getElementById('history-timeline');
    if (!container) return;

    container.innerHTML = DECIMAL_TIMELINE.map(
        item => `
        <div class="timeline-item">
            <div class="timeline-node"></div>
            <div class="timeline-content">
                <div class="timeline-period">${item.period} | ${item.era}</div>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-desc">${item.description}</p>
            </div>
        </div>
    `
    ).join('');
}

function renderImpactCards() {
    const grid = document.getElementById('impact-grid');
    if (!grid) return;

    grid.innerHTML = DECIMAL_IMPACT.map(
        card => `
        <div class="impact-card">
            <div class="impact-header">
                <span class="impact-icon">${card.icon}</span>
                <h3 class="impact-title">${card.title}</h3>
            </div>
            <p class="impact-desc">${card.description}</p>
        </div>
    `
    ).join('');
}

function renderReferences() {
    const list = document.getElementById('references-list');
    if (!list) return;

    list.innerHTML = DECIMAL_REFERENCES.map(
        ref => `
        <div class="reference-item">
            <strong>${ref.source}</strong> — <em>"${ref.title}"</em>
            ${ref.quote ? `<blockquote style="margin: 0.5rem 0 0; padding-left: 0.75rem; border-left: 2px solid var(--accent-gold); color: var(--text-primary); font-style: italic;">"${ref.quote}"</blockquote>` : ''}
        </div>
    `
    ).join('');
}

function renderQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;

    let currentQ = 0;

    function displayQuestion(qIdx) {
        const q = DECIMAL_QUIZ[qIdx];
        quizContainer.innerHTML = `
            <div class="quiz-question">Question ${qIdx + 1} of ${DECIMAL_QUIZ.length}: ${q.question}</div>
            <div class="quiz-options">
                ${q.options
                    .map(
                        (opt, idx) => `
                    <button class="quiz-option" data-index="${idx}">${opt}</button>
                `
                    )
                    .join('')}
            </div>
            <div class="quiz-feedback" id="quiz-feedback"></div>
        `;

        const options = quizContainer.querySelectorAll('.quiz-option');
        const feedback = quizContainer.querySelector('#quiz-feedback');

        options.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selected = parseInt(e.target.getAttribute('data-index'), 10);
                options.forEach(b => (b.disabled = true));

                if (selected === q.correct) {
                    btn.classList.add('correct');
                    feedback.className = 'quiz-feedback show success';
                    feedback.innerHTML = `<strong>Correct! 🎉</strong> ${q.explanation}`;
                } else {
                    btn.classList.add('incorrect');
                    options[q.correct].classList.add('correct');
                    feedback.className = 'quiz-feedback show error';
                    feedback.innerHTML = `<strong>Incorrect.</strong> ${q.explanation}`;
                }

                setTimeout(() => {
                    if (qIdx < DECIMAL_QUIZ.length - 1) {
                        const nextBtn = document.createElement('button');
                        nextBtn.className = 'btn btn-small';
                        nextBtn.style.marginTop = '1rem';
                        nextBtn.textContent = 'Next Question ➔';
                        nextBtn.addEventListener('click', () => displayQuestion(qIdx + 1));
                        feedback.appendChild(nextBtn);
                    } else {
                        const restartBtn = document.createElement('button');
                        restartBtn.className = 'btn btn-small';
                        restartBtn.style.marginTop = '1rem';
                        restartBtn.textContent = 'Restart Quiz 🔄';
                        restartBtn.addEventListener('click', () => displayQuestion(0));
                        feedback.appendChild(restartBtn);
                    }
                }, 400);
            });
        });
    }

    displayQuestion(0);
}
