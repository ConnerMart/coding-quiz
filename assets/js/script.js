startButton = document.querySelector("#start-button");
startPage = document.querySelector("#start-page");
questionsDiv = document.querySelector("#questions");
questionTextSpot = document.querySelector("#question-text");
buttonA = document.querySelector("#choiceA");
buttonB = document.querySelector("#choiceB");
buttonC = document.querySelector("#choiceC");
buttonD = document.querySelector("#choiceD");
feedback = document.querySelector("#feedback");
finished = document.querySelector("#finished");
scoreSpan = document.querySelector("#score");

// array of question objects, which each have values for their question text, answer choices, and correct answer choice
questionList = [
  (question1 = {
    text: "What is a question1?",
    choiceA: "1A",
    choiceB: "1B",
    choiceC: "1C",
    choiceD: "1D",
    correctChoice: choiceB,
  }),
  (question2 = {
    text: "What is a question2?",
    choiceA: "2A",
    choiceB: "2B",
    choiceC: "2C",
    choiceD: "2D",
    correctChoice: choiceD,
  }),
  (question3 = {
    text: "What is a question3?",
    choiceA: "3A",
    choiceB: "3B",
    choiceC: "3C",
    choiceD: "3D",
    correctChoice: choiceB,
  }),
  (question4 = {
    text: "What is a question4?",
    choiceA: "4A",
    choiceB: "4B",
    choiceC: "4C",
    choiceD: "4D",
    correctChoice: choiceA,
  }),
  (question5 = {
    text: "What is a question5?",
    choiceA: "5A",
    choiceB: "5B",
    choiceC: "5C",
    choiceD: "5D",
    correctChoice: choiceC,
  }),
  (question6 = {
    text: "What is a question6?",
    choiceA: "6A",
    choiceB: "6B",
    choiceC: "6C",
    choiceD: "6D",
    correctChoice: choiceB,
  }),
  (question7 = {
    text: "What is a question7?",
    choiceA: "7A",
    choiceB: "7B",
    choiceC: "7C",
    choiceD: "7D",
    correctChoice: choiceB,
  }),
  (question8 = {
    text: "What is a question8?",
    choiceA: "8A",
    choiceB: "8B",
    choiceC: "8C",
    choiceD: "8D",
    correctChoice: choiceD,
  }),
];
var currentQ = 0;
var score = 0;

// when the start button is clicked, make the start div disappear and the questions div appear, then run the showQuestions() function with an argument of the currentQ-position of the questionList, which is set to 0 to begin with, so the first question will be shown
startButton.addEventListener("click", function (event) {
  event.preventDefault();
  startPage.setAttribute("style", "display: none");
  questionsDiv.setAttribute("style", "visibility: visible");
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
    // TODO: remove time from timer
  }
}
