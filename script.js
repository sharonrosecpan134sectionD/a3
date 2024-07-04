// Quiz questions and answers about databases
const quizData = [
    {
        question: "Which database type is known for its flexibility and scalability, often used for large-scale applications?",
        options: ["MySQL", "MongoDB", "SQLite", "PostgreSQL"],
        answer: 1 // Index of correct answer in options array
    },
    {
        question: "Which database model organizes data into tables with rows and columns, and uses SQL for querying?",
        options: ["NoSQL", "Document-oriented", "Relational", "Key-value"],
        answer: 2
    },
    {
        question: "Which database system is widely used for mobile and embedded applications due to its lightweight nature?",
        options: ["MySQL", "MongoDB", "SQLite", "PostgreSQL"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;

const quizForm = document.getElementById('quizForm');
const questionElement = document.getElementById('question');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const option4 = document.getElementById('option4');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const resultDiv = document.getElementById('result');

function displayQuestion() {
    const q = quizData[currentQuestion];
    questionElement.textContent = q.question;
    option1.textContent = q.options[0];
    option2.textContent = q.options[1];
    option3.textContent = q.options[2];
    option4.textContent = q.options[3];
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert('Please select an answer!');
        return;
    }

    const selectedAnswer = Number(selectedOption.value);
    const correctAnswer = quizData[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {
        feedbackElement.style.color = "green";
        feedbackElement.textContent = "Correct!";
        score++;
    } else {
        feedbackElement.style.color = "red";
        feedbackElement.textContent = "Wrong!";
    }

    currentQuestion++;
    selectedOption.checked = false;

    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizForm.style.display = 'none';
    resultDiv.style.display = 'block';
    scoreElement.textContent = score;
}

// Fake authentication (simulated)
function startQuiz() {
    const username = prompt("Enter your username to start the quiz:");
    if (username) {
        displayQuestion();
        quizForm.addEventListener('submit', function(event) {
            event.preventDefault();
            checkAnswer();
        });
    } else {
        alert("You need to enter a username to start the quiz!");
    }
}

// Start quiz when the page is loaded
document.addEventListener('DOMContentLoaded', startQuiz);
