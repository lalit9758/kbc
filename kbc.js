let currentQuestionIndex = -1;
let score = 0;
let usedQuestions = [];
let timer;
let timeRemaining = 30;
let lifelines = { "50-50": true, audience: true, friend: true };

const questions = [
  {
    question: "What is the largest organ in the human body?",
    options: ["Liver", "Brain", "Heart", "Skin"],
    correct: "D",
  },
  {
    question: "Which year did the Titanic sink?",
    options: ["1912", "1905", "1921", "1933"],
    correct: "A",
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Jane Austen",
      "Charles Dickens",
      "Mark Twain",
    ],
    correct: "A",
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Elephant", "Tiger", "Lion", "Giraffe"],
    correct: "C",
  },
  {
    question: "Which famous physicist developed the theory of relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Stephen Hawking",
      "Galileo Galilei",
    ],
    correct: "B",
  },
  {
    question: "Which chemical element has the symbol 'Na'?",
    options: ["Sodium", "Nickel", "Silver", "Sulfur"],
    correct: "A",
  },
  {
    question: "Which country is known as the 'Land of the Rising Sun'?",
    options: ["Japan", "China", "South Korea", "Vietnam"],
    correct: "A",
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Mars", "Jupiter", "Saturn", "Neptune"],
    correct: "A",
  },
  {
    question: "Which city is known as the 'Pink City' of India?",
    options: ["Jaipur", "Delhi", "Mumbai", "Kolkata"],
    correct: "A",
  },
  {
    question: "Who is the Prime Minister of India?",
    options: ["Narendra Modi", "Rahul Gandhi", "Amit Shah", "Manmohan Singh"],
    correct: "A",
  },
  {
    question: "Which of these is not a type of tree?",
    options: ["Oak", "Maple", "Birch", "Pineapple"],
    correct: "D",
  },
  {
    question: "Which of these is not a type of pasta?",
    options: ["Spaghetti", "Fusilli", "Rigatoni", "Penne"],
    correct: "D",
  },
  {
    question: "Which of these is not a programming language?",
    options: ["Python", "JavaScript", "Java", "Applescript"],
    correct: "D",
  },
  {
    question: "Which of these is not a planet?",
    options: ["Mercury", "Venus", "Uranus", "Pluto"],
    correct: "D",
  },
  {
    question: "Finish the sequence: 9, 18, 27, _?",
    options: ["36", "34", "30", "37"],
    correct: "A",
  },
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: "C",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correct: "B",
  },
  {
    question: "Which planet is known as the Earth's twin?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correct: "B",
  },
  {
    question: "Which is the smallest ocean in the world?",
    options: ["Indian", "Pacific", "Atlantic", "Arctic"],
    correct: "D",
  },
  {
    question: "Who invented the telephone?",
    options: [
      "Thomas Edison",
      "Nikola Tesla",
      "Alexander Graham Bell",
      "Albert Einstein",
    ],
    correct: "C",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correct: "C",
  },
  {
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Onion", "Avocado", "Pepper"],
    correct: "C",
  },
  {
    question: "Which country gifted the Statue of Liberty to the USA?",
    options: ["France", "Spain", "Italy", "Germany"],
    correct: "A",
  },
  {
    question: "What is the chemical formula for water?",
    options: ["CO2", "H2O", "O2", "CH4"],
    correct: "B",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Claude Monet",
    ],
    correct: "C",
  },
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correct: "C",
  },
  {
    question: "Which element is said to keep bones strong?",
    options: ["Iron", "Calcium", "Magnesium", "Zinc"],
    correct: "B",
  },
  {
    question: "Which planet is known for its rings?",
    options: ["Earth", "Mars", "Saturn", "Venus"],
    correct: "C",
  },
  {
    question: "Which country is known as the 'Land of the Rising Sun'?",
    options: ["China", "Japan", "India", "South Korea"],
    correct: "B",
  },
  {
    question: "Which planet is closest to the sun?",
    options: ["Mars", "Venus", "Earth", "Mercury"],
    correct: "D",
  },
];

const prizeAmounts = [
  1000, 2000, 3000, 5000, 10000, 20000, 40000, 80000, 160000, 320000, 640000,
  1250000, 2500000, 5000000, 10000000
];

function checkAnswer(selectedOption) {
  const correctOption = questions[currentQuestionIndex].correct;

  if (selectedOption === correctOption) {
    showAnswer("Correct!", "green");
    score=prizeAmounts[usedQuestions.length - 1];
    showScorePointer(score);
    showFinalScore();
    setTimeout(nextQuestion, 1000);
  } else {
    showAnswer("Incorrect!", "red");
    showFinalScore();
    setTimeout(() => {
      alert("Quiz ended! Your final score is RS:" + score);
      window.location.reload();
    }, 2000);
  }
  disableOptions();
  clearInterval(timer);
}

function showAnswer(text, color) {
  const answer = document.getElementById("answer");
  answer.textContent = text;
  answer.style.color = color;
  answer.style.display = "block";
}

function disableOptions() {
  const options = document.getElementsByClassName("option");

  for (let i = 0; i < options.length; i++) {
    options[i].disabled = true;
  }
}

function enableOptions() {
  const options = document.getElementsByClassName("option");

  for (let i = 0; i < options.length; i++) {
    options[i].disabled = false;
  }
}

function getRandomQuestion() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * questions.length);
  } while (usedQuestions.includes(randomIndex));

  usedQuestions.push(randomIndex);
  return randomIndex;
}

function nextQuestion() {
  if (usedQuestions.length >= 15) {
    alert("Quiz ended! Your final score is RS:" + score);
  } else {
    currentQuestionIndex = getRandomQuestion();
    resetQuestion();
  }
}

function resetQuestion() {
  const question = document.getElementById("question");
  const answer = document.getElementById("answer");
  const options = document.getElementsByClassName("option");
  const questionAmount = document.getElementById("question-amount");
  const timerElement = document.getElementById("timer");

  question.textContent = questions[currentQuestionIndex].question;
  questionAmount.textContent = `Prize: RS ${
    prizeAmounts[usedQuestions.length - 1]
  }`;
  answer.style.display = "none";
  enableOptions();

  for (let i = 0; i < options.length; i++) {
    options[i].textContent = questions[currentQuestionIndex].options[i];
  }

  if (usedQuestions.length <= 5) {
    timeRemaining = 30;
  } else if (usedQuestions.length <= 10) {
    timeRemaining = 40;
  } else {
    timeRemaining = Infinity; // Unlimited time
  }

  if (timeRemaining !== Infinity) {
    timerElement.textContent = timeRemaining;
    timer = setInterval(updateTimer, 1000);
  } else {
    document.timerElement.style.display='none';
  }
   
  for (let i = 0; i <= options.length; i++) {
      options[i].style.display = "flex";
  }

}

function updateTimer() {
  const timerElement = document.getElementById("timer");
  timeRemaining--;
  timerElement.textContent = timeRemaining;

  if (timeRemaining <= 0) {
    clearInterval(timer);
    showAnswer("Time up!", "red");
    disableOptions();
    window.location.reload();
  }
}

function showFinalScore() {
  const scoreContainer = document.getElementById("score-container");
  const finalScore = document.getElementById("final-score");

  scoreContainer.style.display = "block";
  finalScore.textContent = `You won RS: ${score}!`;
}

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startGame);

function startGame() {
  const bar = document.querySelector(".navbar");
  const mainContainer = document.querySelector(".main");
  const startButtonContainer = document.querySelector(
    ".start-button-container"
  );
  const gameContainer = document.getElementById("game-container");

  mainContainer.style.display = "none";
  startButtonContainer.style.display = "none";
  gameContainer.style.display = "flex"; // Display game container
  bar.style.display="block";
  nextQuestion(); // Initialize the first question
}

function quitGame() {
  alert(`Game has been quit.your score is: ${score}`);
  window.location.reload();
}

function showScorePointer(score) {
  const prizes = document.getElementById("prizes").getElementsByTagName("li");

  // Reset all prizes to default color
  for (let i = 0; i < prizes.length; i++) {
    prizes[i].style.backgroundColor = ""; // Reset to default color
  }

  // Highlight the current prize based on the score
  if (score > 0) {
    const index = prizeAmounts.indexOf(score); // Find the index of the score in prizeAmounts
    if (index !== -1) { // Check if index is valid
      const reversedIndex = prizes.length - 1 - index; // Calculate the reversed index
      prizes[reversedIndex].style.backgroundColor = "yellow"; // Highlight the correct prize
    }
  }
}


// Lifeline functions
function useFiftyFifty() {
  if (lifelines["50-50"]) {
    const correctOption = questions[currentQuestionIndex].correct;
    const options = document.getElementsByClassName("option");
    let removedCount = 0;

    for (let i = 0; i < options.length && removedCount < 2; i++) {
      if (options[i].getAttribute("data-option") !== correctOption) {
        options[i].style.display = "none";
        removedCount++;
      }
    }

    lifelines["50-50"] = false;
    document.getElementById("fifty-fifty").disabled = true;
  }
}


function askTheAudience() {
  if (lifelines["audience"]) {
    const correctOption = questions[currentQuestionIndex].correct;
    alert(
      `The audience suggests that the correct answer is option ${correctOption}.`
    );
    lifelines["audience"] = false;
    document.getElementById("audience").disabled = true;
  }
}

function phoneAFriend() {
  if (lifelines["friend"]) {
    window.open('https://wa.me/6398813601?text=hello', '_self');
    lifelines["friend"] = false;
    document.getElementById("friend").disabled = true;
  }
}


