const questions = [
  {
    question: "What does the <a> tag in HTML do?",
    options: ["Adds an image", "Adds a hyperlink", "Adds a heading", "Adds a list"],
    answer: "Adds a hyperlink"
  },
  {
    question: "Which one is a JavaScript data type?",
    options: ["Float", "Integer", "Boolean", "Character"],
    answer: "Boolean"
  },
  {
    question: "Which HTML tag is used for embedding JavaScript?",
    options: [
      "<scriptjs>",
      "<javascript>",
      "<script>",
      "<code>"
    ],
    answer: "<script>"
  },
  {
  question: "What does z-index do in CSS?",
    options: [
      "Controls stacking order; works on positioned elements",
      "Changes text size",
      "Aligns text",
      "Applies background images"
    ],
    answer: "Controls stacking order; works on positioned elements"
  },
   {
    question: "What is the output of: let a = [1, 2, 3]; let b = a; b.push(4); console.log(a);",
    options: [
      "[1, 2, 3]",
      "[1, 2, 3, 4]",
      "undefined",
      "Error"
    ],
    answer: "[1, 2, 3, 4]"
  },
  {
    question: "What does the === operator do in JavaScript?",
    options: [
      "Compares values only",
      "Converts type before comparing",
      "Strictly compares value and type",
      "Checks only reference"
    ],
    answer: "Strictly compares value and type"
  },
  {
    question: "What is the output order of setTimeout(() => console.log('First'), 0); console.log('Second');",
    options: [
      "First, Second",
      "Second, First",
      "Error",
      "Random"
    ],
    answer: "Second, First"
  },
  {
    question: "Which CSS unit is relative to the root element's font size?",
    options: ["px", "em", "rem", "%"],
    answer: "rem"
  },
  {
    question: "What is the default value of the position property in CSS?",
    options: ["absolute", "relative", "fixed", "static"],
    answer: "static"
  },
  {
    question: "What will typeof null return in JavaScript?",
    options: ["null", "object", "undefined", "boolean"],
    answer: "object"
  },
  {
    question: "Which HTML tag defines a semantic section of a page?",
    options: ["<div>", "<section>", "<span>", "<form>"],
    answer: "<section>"
  },
  {
    question: "Which selector has the highest specificity?",
    options: [
      "Element selector (e.g., div)",
      "Class selector (e.g., .btn)",
      "ID selector (e.g., #main)",
      "Universal selector (*)"
    ],
    answer: "ID selector (e.g., #main)"
  },
  {
    question: "Which keyword creates a block-scoped variable in JavaScript?",
    options: ["var", "let", "const", "Both let and const"],
    answer: "Both let and const"
  },
  {
    question: "Which HTML tag is used for accessibility and screen readers?",
    options: ["<label>", "<article>", "<div>", "<meta>"],
    answer: "<label>"
  },
  {
    question: "What is the output of: console.log(0.1 + 0.2 == 0.3)?",
    options: ["true", "false", "undefined", "Error"],
    answer: "false"
  },
  {
    question: "What is the use of the defer attribute in a <script> tag?",
    options: [
      "Delays script execution until page is fully loaded",
      "Loads script asynchronously",
      "Prevents script from running",
      "Applies script to footer"
    ],
    answer: "Delays script execution until page is fully loaded"
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "int", "string", "float"],
    answer: "var"
  },
  {
    question: "Which of the following is a data type in JavaScript?",
    options: ["number", "integer", "float", "double"],
    answer: "number"
  },
  {
    question: "What will be the output of: typeof 'Hello'?",
    options: ["string", "text", "char", "word"],
    answer: "string"
  },
  {
    question: "What is the result of 2 + '2' in JavaScript?",
    options: ["22", "4", "undefined", "NaN"],
    answer: "22"
  },

];

let current = 0;
let score = 0;
let timer;
let timeLeft = 10;

// Load sounds
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
  timer = setInterval(updateTimer, 1000);

  const q = questions[current];
  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => {
      clearInterval(timer);
      checkAnswer(option);
    };
    optionsDiv.appendChild(btn);
  });

  const progressPercent = ((current + 1) / questions.length) * 100;
  document.getElementById("progress").style.width = `${progressPercent}%`;
}

function updateTimer() {
  timeLeft--;
  document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
  if (timeLeft === 0) {
    clearInterval(timer);
    nextQuestion();
  }
}

function checkAnswer(selected) {
  const correct = questions[current].answer;
  const options = document.getElementById("options").children;

  if (selected === correct) {
    score++;
    correctSound.play();
  } else {
    wrongSound.play();
  }

  for (let btn of options) {
    btn.disabled = true;
    if (btn.innerText === correct) {
      btn.style.backgroundColor = "#a0e7a0";
    } else if (btn.innerText === selected) {
      btn.style.backgroundColor = "#f89e9e";
    }
  }
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("question-box").style.display = "none";
    document.getElementById("result-box").style.display = "block";
    document.getElementById("score").innerText = `${score} / ${questions.length}`;

// Score comment logic
let comment = "";
if (score >= 18) {
  comment = "🎯 Congratulations! You nailed it!";
} else if (score >= 15) {
  comment = "🔥 Awesome! You're doing great!";
} else if (score >= 12) {
  comment = "💪 Super! Keep pushing!";
} else if (score >= 10) {
  comment = "👏 Good job! You can improve!";
} else if (score >= 5) {
  comment = "🙂 Not bad, try again for a better score!";
} else if (score >= 1) {
  comment = "😅 Keep practicing!";
} else {
  comment = "💡 Don't give up! Practice makes perfect!";
}

document.getElementById("score-comment").innerText = comment;

    showHighScore(score);
  }
}

function showHighScore(currentScore) {
  let best = localStorage.getItem("quizHighScore");
  if (!best || currentScore > best) {
    localStorage.setItem("quizHighScore", currentScore);
    best = currentScore;
  }
  document.getElementById("high-score").innerText = `🏆 High Score: ${best}`;
}

loadQuestion();
