```javascript
/* =========================================
   BHIKAJI CAMA
   FREEDOM & FLAG EXPLORER
========================================= */


/* =========================================
   HERO
========================================= */

const beginJourney =
  document.getElementById("beginJourney");

if (beginJourney) {

  beginJourney.addEventListener("click", () => {

    document
      .getElementById("explorer")
      .scrollIntoView({
        behavior: "smooth"
      });

  });

}


/* =========================================
   STORY EXPERIENCE
========================================= */

const storySlides =
  document.querySelectorAll(".story-slide");

const nextStoryButtons =
  document.querySelectorAll(".next-story");

const restartStory =
  document.getElementById("restartStory");

const storyProgress =
  document.getElementById("storyProgress");

let currentStory = 0;


/**
 * Display a story slide.
 */
function showStory(index) {

  storySlides.forEach((slide, slideIndex) => {

    slide.classList.toggle(
      "active",
      slideIndex === index
    );

  });

  const progress =
    ((index + 1) / storySlides.length) * 100;

  storyProgress.style.width =
    `${progress}%`;

}


/**
 * Continue story.
 */
nextStoryButtons.forEach((button) => {

  button.addEventListener("click", () => {

    if (currentStory < storySlides.length - 1) {

      currentStory++;

      showStory(currentStory);

    }

  });

});


/**
 * Restart story.
 */
if (restartStory) {

  restartStory.addEventListener("click", () => {

    currentStory = 0;

    showStory(currentStory);

    document
      .querySelector(".story-section")
      .scrollIntoView({
        behavior: "smooth"
      });

  });

}


/* =========================================
   FLAG SYMBOL EXPLORER
========================================= */

const flagData = {

  lotuses: {

    title: "Lotus Symbols",

    description:
      "The upper section of the flag featured lotus motifs representing the provinces of British India in the historical design associated with the Stuttgart presentation."

  },

  vande: {

    title: "Vande Mataram",

    description:
      "The words 'Vande Mataram' appeared across the central section of the flag, expressing devotion to the motherland and becoming an important nationalist slogan."

  },

  sun: {

    title: "Sun and Crescent",

    description:
      "The lower section included symbols of the sun and crescent moon, elements associated with the historical nationalist flag design."

  }

};


const flagSymbols =
  document.querySelectorAll(".flag-symbol");

const flagInfo =
  document.getElementById("flagInfo");


flagSymbols.forEach((symbol) => {

  symbol.addEventListener("click", () => {

    const key =
      symbol.dataset.symbol;

    const data =
      flagData[key];

    if (!data) {
      return;
    }

    flagInfo.innerHTML = `

      <span>FLAG SYMBOL</span>

      <h3>${data.title}</h3>

      <p>
        ${data.description}
      </p>

    `;

  });

});


/* =========================================
   PLACES
========================================= */

const placeData = {

  bombay: {

    title: "Bombay",

    text:
      "Bhikaji Cama was born in Bombay in 1861. The city was an important centre of political activity and public debate during the period of India's nationalist awakening."

  },

  london: {

    title: "London",

    text:
      "London became an important centre for Indian political activity abroad. Cama interacted with Indian nationalists and political thinkers connected with the independence movement."

  },

  paris: {

    title: "Paris",

    text:
      "Cama spent many years in Paris. She worked with Indian revolutionaries and nationalist activists and used the city as an important base for her political activities."

  },

  stuttgart: {

    title: "Stuttgart",

    text:
      "Stuttgart is associated with the 1907 International Socialist Congress, where Cama presented an Indian nationalist flag and spoke about India's struggle for independence."

  }

};


const placeCards =
  document.querySelectorAll(".place-card");

const placeDetails =
  document.getElementById("placeDetails");


placeCards.forEach((card) => {

  card.addEventListener("click", () => {

    placeCards.forEach((item) => {

      item.classList.remove("active");

    });

    card.classList.add("active");

    const place =
      card.dataset.place;

    const data =
      placeData[place];

    if (!data) {
      return;
    }

    placeDetails.innerHTML = `

      <strong>${data.title}</strong>

      <p>
        ${data.text}
      </p>

    `;

  });

});


/* =========================================
   QUIZ
========================================= */

const questions = [

  {

    question:
      "In which year was Bhikaji Cama associated with the historic flag presentation in Stuttgart?",

    answers: [
      "1905",
      "1907",
      "1910",
      "1915"
    ],

    correct: 1

  },

  {

    question:
      "Where did the historic flag presentation associated with Cama take place?",

    answers: [
      "Paris",
      "London",
      "Stuttgart",
      "Bombay"
    ],

    correct: 2

  },

  {

    question:
      "Which phrase appeared on the historical nationalist flag associated with Cama?",

    answers: [
      "Jai Hind",
      "Vande Mataram",
      "Swaraj Bharat",
      "Inquilab Hind"
    ],

    correct: 1

  },

  {

    question:
      "Which country became an important base for Cama's political activities?",

    answers: [
      "France",
      "Japan",
      "United States",
      "Russia"
    ],

    correct: 0

  }

];


let currentQuestion = 0;

let score = 0;

let quizLocked = false;


const quizContent =
  document.getElementById("quizContent");

const quizResult =
  document.getElementById("quizResult");

const quizCount =
  document.getElementById("quizCount");

const questionElement =
  document.getElementById("question");

const answersElement =
  document.getElementById("answers");

const feedback =
  document.getElementById("feedback");

const scoreElement =
  document.getElementById("score");

const scoreMessage =
  document.getElementById("scoreMessage");

const restartQuiz =
  document.getElementById("restartQuiz");


/**
 * Load current question.
 */
function loadQuestion() {

  quizLocked = false;

  const question =
    questions[currentQuestion];

  quizCount.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  questionElement.textContent =
    question.question;

  feedback.textContent = "";

  answersElement.innerHTML = "";


  question.answers.forEach((answer, index) => {

    const button =
      document.createElement("button");

    button.className = "answer";

    button.textContent =
      answer;

    button.addEventListener("click", () => {

      checkAnswer(
        index,
        button
      );

    });

    answersElement.appendChild(button);

  });

}


/**
 * Check quiz answer.
 */
function checkAnswer(
  selectedIndex,
  selectedButton
) {

  if (quizLocked) {
    return;
  }

  quizLocked = true;

  const question =
    questions[currentQuestion];

  const answerButtons =
    document.querySelectorAll(".answer");


  if (
    selectedIndex ===
    question.correct
  ) {

    selectedButton.classList.add(
      "correct"
    );

    feedback.textContent =
      "Correct! Great work.";

    score++;

  } else {

    selectedButton.classList.add(
      "wrong"
    );

    answerButtons[
      question.correct
    ].classList.add("correct");

    feedback.textContent =
      "Not quite. The correct answer is highlighted.";

  }


  setTimeout(() => {

    currentQuestion++;

    if (
      currentQuestion <
      questions.length
    ) {

      loadQuestion();

    } else {

      showResult();

    }

  }, 1200);

}


/**
 * Display quiz result.
 */
function showResult() {

  quizContent.classList.add(
    "hidden"
  );

  quizResult.classList.remove(
    "hidden"
  );

  scoreElement.textContent =
    score;


  if (score === 4) {

    scoreMessage.textContent =
      "Excellent! You have a strong understanding of Bhikaji Cama's story.";

  } else if (score >= 2) {

    scoreMessage.textContent =
      "Good work! Explore the story once more to discover more details.";

  } else {

    scoreMessage.textContent =
      "Keep exploring. There is more to discover about her remarkable legacy.";

  }

}


/**
 * Restart quiz.
 */
restartQuiz.addEventListener(
  "click",
  () => {

    currentQuestion = 0;

    score = 0;

    quizContent.classList.remove(
      "hidden"
    );

    quizResult.classList.add(
      "hidden"
    );

    loadQuestion();

  }
);


/* =========================================
   INITIALISE
========================================= */

showStory(0);

loadQuestion();
```
