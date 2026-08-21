```javascript
/* =========================================
   SURYA SEN
   CHITTAGONG ARMOURY RAID EXPLORER
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
   STORY MODE
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
 * Display story slide.
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

    if (
      currentStory <
      storySlides.length - 1
    ) {

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
   LOCATIONS
========================================= */

const locationData = {

  armoury: {

    title: "Chittagong Armouries",

    description:
      "The armouries were central targets of the coordinated revolutionary operation on the night of 18 April 1930. The aim was to seize arms and disrupt British authority in the city."

  },

  jalalabad: {

    title: "Jalalabad Hills",

    description:
      "After the raid, revolutionary forces gathered near the Jalalabad Hills. On 22 April 1930, they faced British forces in a major confrontation."

  },

  chittagong: {

    title: "Chittagong",

    description:
      "Chittagong was the centre of Surya Sen's revolutionary activities. The 1930 operation attempted to disrupt British control over the city and its communication systems."

  },

  noapara: {

    title: "Noapara",

    description:
      "Surya Sen was born in Noapara, Chittagong, on 22 March 1894. He later became a teacher and revolutionary leader."

  }

};


const locationCards =
  document.querySelectorAll(".location-card");

const locationInfo =
  document.getElementById("locationInfo");


locationCards.forEach((card) => {

  card.addEventListener("click", () => {

    locationCards.forEach((item) => {

      item.classList.remove("active");

    });

    card.classList.add("active");

    const location =
      card.dataset.location;

    const data =
      locationData[location];

    if (!data) {
      return;
    }

    locationInfo.innerHTML = `

      <strong>${data.title}</strong>

      <p>
        ${data.description}
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
      "On which date did the Chittagong Armoury Raid take place?",

    answers: [
      "18 April 1930",
      "22 April 1930",
      "15 August 1930",
      "26 January 1931"
    ],

    correct: 0

  },

  {

    question:
      "What was Surya Sen popularly known as?",

    answers: [
      "Netaji",
      "Masterda",
      "Deshbandhu",
      "Lokmanya"
    ],

    correct: 1

  },

  {

    question:
      "Where did a major confrontation take place after the raid?",

    answers: [
      "Jalalabad Hills",
      "Red Fort",
      "Jallianwala Bagh",
      "Sabarmati"
    ],

    correct: 0

  },

  {

    question:
      "In which year was Surya Sen executed?",

    answers: [
      "1930",
      "1932",
      "1934",
      "1942"
    ],

    correct: 2

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
 * Load question.
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


  question.answers.forEach(
    (answer, index) => {

      const button =
        document.createElement("button");

      button.className = "answer";

      button.textContent =
        answer;

      button.addEventListener(
        "click",
        () => {

          checkAnswer(
            index,
            button
          );

        }
      );

      answersElement.appendChild(
        button
      );

    }
  );

}


/**
 * Check answer.
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
    document.querySelectorAll(
      ".answer"
    );


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
 * Display result.
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
      "Excellent! You know the Chittagong Armoury Raid story very well.";

  } else if (score >= 2) {

    scoreMessage.textContent =
      "Good work! Explore the timeline again to discover more.";

  } else {

    scoreMessage.textContent =
      "Keep exploring. There is much more to learn about Surya Sen and his movement.";

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
