```javascript
/* =========================================
   KANAKLATA BARUA
   YOUTH RESISTANCE EXPLORER
========================================= */


/* =========================================
   HERO → EXPLORER
========================================= */

const startExplorer = document.getElementById("startExplorer");

if (startExplorer) {
  startExplorer.addEventListener("click", () => {
    document.getElementById("explorer").scrollIntoView({
      behavior: "smooth"
    });
  });
}


/* =========================================
   INTERACTIVE MAP
========================================= */

const locationData = {
  barangabari: {
    number: "01",
    title: "Barangabari",
    description:
      "Kanaklata Barua was born in Barangabari village in Assam. This is where her journey began."
  },

  gohpur: {
    number: "02",
    title: "Gohpur",
    description:
      "Gohpur became central to Kanaklata's story when she led volunteers towards the police station during the Quit India Movement."
  },

  assam: {
    number: "03",
    title: "Assam",
    description:
      "Assam played an important role in the Quit India Movement, with young volunteers participating in resistance activities."
  }
};

const mapLocations = document.querySelectorAll(".map-location");

const locationInfo = document.getElementById("locationInfo");

mapLocations.forEach((location) => {

  location.addEventListener("click", () => {

    const locationKey = location.dataset.location;

    const data = locationData[locationKey];

    if (!data) {
      return;
    }

    locationInfo.innerHTML = `
      <span class="location-number">${data.number}</span>

      <h3>${data.title}</h3>

      <p>${data.description}</p>
    `;

  });

});


/* =========================================
   STORY EXPERIENCE
========================================= */

const storyCards = document.querySelectorAll(".story-card");

const nextButtons = document.querySelectorAll(".story-next");

const restartStory = document.querySelector(".story-restart");

const storyProgress = document.getElementById("storyProgress");

let currentStory = 0;


/**
 * Show a particular story card.
 */
function showStory(index) {

  storyCards.forEach((card, cardIndex) => {

    card.classList.toggle(
      "active",
      cardIndex === index
    );

  });

  const progress =
    ((index + 1) / storyCards.length) * 100;

  storyProgress.style.width = `${progress}%`;

}


/**
 * Move to the next story.
 */
nextButtons.forEach((button) => {

  button.addEventListener("click", () => {

    if (currentStory < storyCards.length - 1) {

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
   EVENTS
========================================= */

const eventCards = document.querySelectorAll(".event-card");

const eventDetail = document.getElementById("eventDetail");

const eventData = [
  `
    <strong>The Quit India Movement</strong>
    <p>
      Launched in 1942, the Quit India Movement became one of the
      major mass movements against British rule. Young people
      played an important role in demonstrations and resistance.
    </p>
  `,

  `
    <strong>The Gohpur Procession</strong>
    <p>
      On 20 September 1942, Kanaklata Barua led volunteers towards
      the Gohpur police station with the national flag.
    </p>
  `,

  `
    <strong>A Young Leader</strong>
    <p>
      Kanaklata was only 17 when she became a symbol of courage
      during the freedom struggle. Her story demonstrates the
      significant participation of young people in India's
      independence movement.
    </p>
  `
];


eventCards.forEach((card, index) => {

  card.addEventListener("click", () => {

    eventCards.forEach((item) => {
      item.classList.remove("active");
    });

    card.classList.add("active");

    eventDetail.innerHTML = eventData[index];

  });

});


/* =========================================
   QUIZ
========================================= */

const questions = [

  {
    question:
      "Where was Kanaklata Barua associated with the famous flag procession?",

    answers: [
      "Gohpur",
      "Dibrugarh",
      "Jorhat",
      "Silchar"
    ],

    correct: 0
  },

  {
    question:
      "How old was Kanaklata Barua when she became a martyr?",

    answers: [
      "15",
      "17",
      "21",
      "25"
    ],

    correct: 1
  },

  {
    question:
      "Which major movement was taking place in 1942?",

    answers: [
      "Non-Cooperation Movement",
      "Swadeshi Movement",
      "Quit India Movement",
      "Civil Disobedience Movement"
    ],

    correct: 2
  },

  {
    question:
      "What was the main objective of the procession led by Kanaklata?",

    answers: [
      "To open a school",
      "To hoist the national flag",
      "To organise a festival",
      "To establish a market"
    ],

    correct: 1
  }

];


let currentQuestion = 0;

let score = 0;

let quizLocked = false;


const questionElement =
  document.getElementById("question");

const answersElement =
  document.getElementById("answers");

const quizCount =
  document.getElementById("quizCount");

const quizFeedback =
  document.getElementById("quizFeedback");

const quizContent =
  document.getElementById("quizContent");

const quizResult =
  document.getElementById("quizResult");

const scoreElement =
  document.getElementById("score");

const scoreMessage =
  document.getElementById("scoreMessage");

const restartQuiz =
  document.getElementById("restartQuiz");


/**
 * Load a question.
 */
function loadQuestion() {

  quizLocked = false;

  const question = questions[currentQuestion];

  quizCount.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  questionElement.textContent =
    question.question;

  quizFeedback.textContent = "";

  answersElement.innerHTML = "";

  question.answers.forEach((answer, index) => {

    const button =
      document.createElement("button");

    button.className = "answer";

    button.textContent = answer;

    button.addEventListener("click", () => {

      checkAnswer(index, button);

    });

    answersElement.appendChild(button);

  });

}


/**
 * Check selected answer.
 */
function checkAnswer(selectedIndex, selectedButton) {

  if (quizLocked) {
    return;
  }

  quizLocked = true;

  const question = questions[currentQuestion];

  const allAnswers =
    document.querySelectorAll(".answer");

  if (selectedIndex === question.correct) {

    selectedButton.classList.add("correct");

    quizFeedback.textContent =
      "Correct! Well done.";

    score++;

  } else {

    selectedButton.classList.add("wrong");

    allAnswers[question.correct]
      .classList.add("correct");

    quizFeedback.textContent =
      "Not quite. The highlighted answer is correct.";

  }


  setTimeout(() => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

      loadQuestion();

    } else {

      showQuizResult();

    }

  }, 1200);

}


/**
 * Show final result.
 */
function showQuizResult() {

  quizContent.classList.add("hidden");

  quizResult.classList.remove("hidden");

  scoreElement.textContent = score;

  if (score === questions.length) {

    scoreMessage.textContent =
      "Excellent! You know Kanaklata Barua's story very well.";

  } else if (score >= 2) {

    scoreMessage.textContent =
      "Good work! Explore the story again to learn more.";

  } else {

    scoreMessage.textContent =
      "Keep exploring. Every story is a chance to learn.";

  }

}


/**
 * Restart quiz.
 */
restartQuiz.addEventListener("click", () => {

  currentQuestion = 0;

  score = 0;

  quizContent.classList.remove("hidden");

  quizResult.classList.add("hidden");

  loadQuestion();

});


/* =========================================
   INITIALISE
========================================= */

showStory(0);

loadQuestion();
```
