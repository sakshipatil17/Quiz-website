// Questions with answers
const questions = [
  {
    question: "Which shape has 3 side?",
    answers: [
      { text: "Square", correct: false },
      { text: "Circle", correct: false },
      { text: "Triangle", correct: true }
    ]
  },
  {
    question: "How many days are there in a week?",
    answers: [
      { text: "5", correct: false },
      { text: "7", correct: true },
      { text: "6", correct: false }
    ]
  },
  {
    question: "Which animal gives milk?",
    answers: [
      { text: "cow", correct: true },
      { text: "lion", correct: false },
      { text: "cat", correct: false }
    ]
  }
];

// DOM elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const progressElement = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;

// Start button click → begins quiz
startButton.addEventListener("click", startQuiz);

// Next button click → move to next question or show result
nextButton.addEventListener("click", () => {
  if (nextButton.innerText === "Play Again") {
    startQuiz(); // Restart quiz
    return;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// Start quiz: reset everything
function startQuiz() {
  startButton.style.display = "none"; // Hide start button
  currentQuestionIndex = 0;
  score = 0;
  resultElement.innerText = ""; // Clear old result
  nextButton.innerText = "Next"; // Reset button text
  showQuestion();
}

// Show current question
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  progressElement.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  // Create answer buttons dynamically
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
   button.addEventListener("click", (e) => selectAnswer(e, answer));
    answerButtons.appendChild(button);
  });
}

// Clear previous buttons
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Handle answer click
function selectAnswer(e, answer) {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach(btn => {
    btn.classList.remove("selected");
  });

  e.target.classList.add("selected");

  if (answer.correct) {
    score++;
  }

  nextButton.style.display = "block";
}

// Show quiz result
function showResult() {
  resetState();
  questionElement.innerText = "Quiz Completed!";
  resultElement.innerText = `You scored ${score} out of ${questions.length}`;
  nextButton.innerText = "Play Again"; // Change button text
  nextButton.style.display = "block";
}

//Show start button initially
startButton.style.display = "block";