```javascript
/* =========================================
   RANI GAIDINLIU
   SELF-RULE INTERACTIVE EXPLORER
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

  nungkao: {

    title: "Nungkao",

    description:
      "Nungkao, in the present-day Tamenglong area of Manipur, was the birthplace of Rani Gaidinliu. Her early experiences in the region shaped her connection with the Heraka movement and her community."

  },

  manipur: {

    title: "Manipur",

    description:
      "Manipur was central to Gaidinliu's early life and resistance. The region became an important setting for her opposition to British colonial authority."

  },

  nagaland: {

    title: "Northeast India",

    description:
      "Gaidinliu's story is part of the wider history of indigenous resistance and movements for cultural identity and self-rule across Northeast India."

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
      "In which year was Rani Gaidinliu born?",

    answers: [
      "1915",
      "1905",
      "1925",
      "1931"
    ],

    correct: 0
  },

  {
    question:
      "Which movement did Rani Gaidinliu join as a young girl?",

    answers: [
      "Heraka movement",
      "Swadeshi movement",
      "Khilafat movement",
      "Non-Cooperation movement"
    ],

    correct: 0
  },

  {
    question:
      "Who was Haipou Jadonang?",

    answers: [
      "A leader associated with the Heraka movement",
      "A British administrator",
      "A military officer",
      "A colonial governor"
    ],

    correct: 0
  },

  {
    question:
      "In which year was Rani Gaidinliu arrested?",

    answers: [
      "1932",
      "1922",
      "1942",
      "1952"
    ],

    correct: 0
  },

  {
    question:
      "Which civilian honour did Rani Gaidinliu receive in 1982?",

    answers: [
      "Padma Bhushan",
      "Bharat Ratna",
      "Padma Vibhushan",
      "Padma Shri"
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
      "Correct! Excellent work.";

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


  if (score === questions.length) {

    scoreMessage.textContent =
      "Excellent! You know Rani Gaidinliu's story very well.";

  } else if (score >= 3) {

    scoreMessage.textContent =
      "Great work! Explore the timeline once more to deepen your knowledge.";

  } else {

    scoreMessage.textContent =
      "Keep exploring. There is more to discover about Rani Gaidinliu and the Heraka movement.";

  }

}


if (restartQuiz) {

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

}


/* =========================================
   INITIALISE
========================================= */

showStory(0);

loadQuestion();
```
