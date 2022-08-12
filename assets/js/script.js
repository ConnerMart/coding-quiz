var startButton = document.querySelector("#start-button");
var startPage = document.querySelector("#start-page");
var questionsDiv = document.querySelector("#questions");
var questionTextSpot = document.querySelector("#question-text");
var buttonA = document.querySelector("#choiceA");
var buttonB = document.querySelector("#choiceB");
var buttonC = document.querySelector("#choiceC");
var buttonD = document.querySelector("#choiceD");
var feedback = document.querySelector("#feedback");
var finished = document.querySelector("#finished");
var scoreSpan = document.querySelector("#score");
var timerDisplay = document.querySelector("#timer");
var initials = document.querySelector("#initials");
var scoreDisplay = document.querySelector("#score-display");
var scoreBoard = document.querySelector("#scoreboard");

// array of question objects, which each have values for their question text, answer choices, and correct answer choice
questionList = [
  (question1 = {
    text: "What is the syntax for introducing a variable in JavaScript?",
    choiceA: "v",
    choiceB: "var",
    choiceC: "vari",
    choiceD: "variable",
    correctChoice: choiceB,
  }),
  (question2 = {
    text: "Items between [square brackets] are called a/an:",
    choiceA: "set",
    choiceB: "group",
    choiceC: "list",
    choiceD: "array",
    correctChoice: choiceD,
  }),
  (question3 = {
    text: "What is the term for the items in parentheses in a function declaration?",
    choiceA: "arguments",
    choiceB: "parameters",
    choiceC: "conditions",
    choiceD: "factors",
    correctChoice: choiceB,
  }),
  (question4 = {
    text: "Local storage can only store which data type?",
    choiceA: "string",
    choiceB: "numeric",
    choiceC: "boolean",
    choiceD: "function",
    correctChoice: choiceA,
  }),
  (question5 = {
    text: "What unit of time is used when setting an interval?",
    choiceA: "minutes",
    choiceB: "seconds",
    choiceC: "milliseconds",
    choiceD: "nanoseconds",
    correctChoice: choiceC,
  }),
];
var currentQ = 0;
var score = 0;
var timeLeft = 60;
quizFinished = false;

// when the start button is clicked, make the start div disappear and the questions div appear, then run the showQuestions() function with an argument of the currentQ-position of the questionList, which is set to 0 to begin with, so the first question will be shown
startButton.addEventListener("click", function (event) {
  event.preventDefault();
  startPage.setAttribute("style", "display: none");
  questionsDiv.setAttribute("style", "visibility: visible");
  startTimer();
  showQuestion(questionList[currentQ]);
});

// retrieves the question and answer choices for the given question from the questionList and renders them to the question text and the answer buttons
function showQuestion(questionNumber) {
  questionTextSpot.textContent = questionNumber.text;
  buttonA.textContent = questionNumber.choiceA;
  buttonB.textContent = questionNumber.choiceB;
  buttonC.textContent = questionNumber.choiceC;
  buttonD.textContent = questionNumber.choiceD;
}

questionsDiv.addEventListener("click", checkAnswer);

function checkAnswer(event) {
  event.preventDefault();
  // if the target of the click is the same as the correct choice of the current question, feedback is given and score is increased by 10
  if (event.target === questionList[currentQ].correctChoice) {
    feedback.textContent = "Correct!";
    score = score + 10;
    // if there are still questions left in the questionList, currentQ is increased by one and showQuestion() is run again with an argument of the new currentQ-position of the questionList, moving us to the next question in order
    if (currentQ < questionList.length - 1) {
      currentQ++;
      showQuestion(questionList[currentQ]);
      // if there are no more questions in the questionList, create a "finish quiz" button and append it underneath the last question
    } else {
      quizFinished = true;
      finishButton = document.createElement("button");
      finishButton.textContent = "Finish Quiz";
      // removes old event listener so that "finish quiz" buttons don't keep appearing if you keep clicking on the correct answer of the final question
      questionsDiv.removeEventListener("click", checkAnswer);
      questionsDiv.appendChild(finishButton);
      finishButton.addEventListener("click", function () {
        questionsDiv.setAttribute("style", "display: none");
        finished.setAttribute("style", "visibility: visible");
        scoreSpan.textContent = score;
      });
    }
  } else {
    feedback.textContent = "Incorrect, try again.";
    score = score - 5;
    timeLeft = timeLeft - 5;
  }
}

function startTimer() {
  var timeInterval = setInterval(function () {
    timerDisplay.textContent = "Time: " + timeLeft + " seconds";
    timeLeft--;
    if (quizFinished === true) {
      timerDisplay.textContent = "";
      clearInterval(timeInterval);
    }
    if (timeLeft < 1) {
      clearInterval(timeInterval);
      timerDisplay.textContent = "";
      questionsDiv.setAttribute("style", "display: none");
      finished.setAttribute("style", "visibility: visible");
      scoreSpan.textContent = score;
    }
  }, 1000);
}

finished.addEventListener("submit", saveScore);

function saveScore(event) {
  event.preventDefault();
  finished.setAttribute("style", "display: none");

  var playerInfo = {
    playerInitials: initials.value.trim(),
    playerScore: score,
  };
  localStorage.setItem("playerInfo", JSON.stringify(playerInfo));
  showScores();
}

function showScores() {
  scoreDisplay.setAttribute("style", "visibility: visible");
  var savedScore = JSON.parse(localStorage.getItem("playerInfo"));
  scoreBoard.textContent =
    savedScore.playerInitials + ": " + savedScore.playerScore;
}
