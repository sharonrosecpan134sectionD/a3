const questions = [
    {
        question: "What is a primary key?",
        answers: [
            { text: "A unique identifier for a record", correct: true },
            { text: "A column used for sorting data", correct: false },
            { text: "A column that contains duplicate values", correct: false },
            { text: "A secondary key for indexing", correct: false }
        ]
    },
    {
        question: "What does SQL stand for?",
        answers: [
            { text: "Structured Query Language", correct: true },
            { text: "Simple Query Language", correct: false },
            { text: "Structured Question Language", correct: false },
            { text: "Simple Question Language", correct: false }
        ]
    },
    {
        question: "What is a foreign key?",
        answers: [
            { text: "A key used to open a foreign database", correct: false },
            { text: "A key that uniquely identifies a record", correct: false },
            { text: "A key used to link two tables together", correct: true },
            { text: "A key used for sorting data", correct: false }
        ]
    },
    {
        question: "What is a join in SQL?",
        answers: [
            { text: "A keyword used to combine records from two or more tables", correct: true },
            { text: "A command to start a transaction", correct: false },
            { text: "A function to merge two databases", correct: false },
            { text: "A method to combine multiple queries", correct: false }
        ]
    },
    {
        question: "What is normalization in databases?",
        answers: [
            { text: "Organizing data to reduce redundancy", correct: true },
            { text: "Creating backup copies of the database", correct: false },
            { text: "Encrypting data for security", correct: false },
            { text: "Standardizing data formats", correct: false }
        ]
    },
    {
        question: "Which SQL statement is used to extract data from a database?",
        answers: [
            { text: "SELECT", correct: true },
            { text: "EXTRACT", correct: false },
            { text: "OPEN", correct: false },
            { text: "GET", correct: false }
        ]
    },
    {
        question: "Which SQL statement is used to update data in a database?",
        answers: [
            { text: "UPDATE", correct: true },
            { text: "SAVE", correct: false },
            { text: "MODIFY", correct: false },
            { text: "CHANGE", correct: false }
        ]
    },
    {
        question: "Which SQL clause is used to filter records?",
        answers: [
            { text: "WHERE", correct: true },
            { text: "FILTER", correct: false },
            { text: "SEARCH", correct: false },
            { text: "GROUP BY", correct: false }
        ]
    }
];

const usernameInput = document.getElementById('username');
const authBtn = document.getElementById('auth-btn');
const quizContainer = document.getElementById('quiz');
const questionContainer = document.getElementById('question-container');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');

let currentQuestionIndex = 0;
let score = 0;

authBtn.addEventListener('click', () => {
    if (usernameInput.value === "student") {
        document.getElementById('authentication').classList.add('hidden');
        quizContainer.classList.remove('hidden');
        showQuestion();
    } else {
        alert('Invalid username');
    }
});

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.createElement('div');
    questionElement.textContent = currentQuestion.question;
    questionContainer.appendChild(questionElement);

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        questionContainer.appendChild(button);
    });

    updateProgressBar();
}

function resetState() {
    nextBtn.classList.add('hidden');
    while (questionContainer.firstChild) {
        questionContainer.removeChild(questionContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
    }
    Array.from(questionContainer.children).forEach(button => {
        if (button.dataset.correct) {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextBtn.classList.remove('hidden');
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.innerHTML = `<div style="width: ${progress}%"></div>`;
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreElement.textContent = `${score} / ${questions.length}`;
}
