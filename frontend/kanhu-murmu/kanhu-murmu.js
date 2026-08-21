```javascript
/* =========================================
   KANHU MURMU
   SANTHAL HUL INTERACTIVE EXPLORER
========================================= */


/* =========================================
   HERO NAVIGATION
========================================= */

const startJourney =
  document.getElementById("startJourney");

if (startJourney) {

  startJourney.addEventListener("click", () => {

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
   PLACE EXPLORER
========================================= */

const placeData = {

  bhognadih: {

    title: "Bhognadih",

    description:
      "Bhognadih is closely associated with the beginning of the Santhal Hul. A major gathering took place here on 30 June 1855, with Sidhu and Kanhu Murmu emerging as important leaders."

  },

  santhal: {

    title: "The Santhal Region",

    description:
      "The uprising spread through areas inhabited by Santhal communities. The movement reflected resistance to exploitation, revenue pressures and the disruption of traditional life."

  },

  damin: {

    title: "Damin-i-Koh",

    description:
      "Damin-i-Koh was a region associated with Santhal settlement under colonial administration. Changes in land relations and the growth of exploitative practices contributed to tensions in the region."

  }

};


const placeCards =
  document.querySelectorAll(".place-card");

const placeInfo =
  document.getElementById("placeInfo");


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

    placeInfo.innerHTML = `

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
      "What does the word 'Hul' refer to in this context?",

    answers: [
      "Rebellion or uprising",
      "A harvest festival",
      "A type of settlement",
      "A traditional instrument"
    ],

    correct: 0
  },

  {
    question:
      "Who was one of the principal leaders of the Santhal Hul?",

    answers: [
      "Kanhu Murmu",
      "Mangal Pandey",
      "Tantia Tope",
      "Lal Bahadur Shastri"
    ],

    correct: 0
  },

  {
    question:
      "When did the major Bhognadih gathering take place?",

    answers: [
      "30 June 1855",
      "15 August 1857",
      "26 January 1855",
      "10 May 1856"
    ],

    correct: 0
  },

  {
    question:
      "Who was Kanhu Murmu's brother and fellow leader?",

    answers: [
      "Sidhu Murmu",
      "Birsa Murmu",
      "Chand Murmu",
      "Bhairav Murmu"
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
      "Excellent! You know the story of the Santhal Hul very well.";

  } else if (score >= 2) {

    scoreMessage.textContent =
      "Good work! Explore the timeline once more to learn more.";

  } else {

    scoreMessage.textContent =
      "Keep exploring. There is much more to discover about Kanhu Murmu and the Hul.";

  }

}


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
