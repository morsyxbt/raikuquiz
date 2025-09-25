const questions = [
    {
        question: "What is the primary focus of Raiku’s work on the Solana blockchain?",
        options: [
            { text: "Creating a new cryptocurrency", correct: false },
            { text: "Building a Coordination Layer", correct: true },
            { text: "Developing a gaming platform", correct: false },
            { text: "Designing NFT marketplaces", correct: false }
        ]
    },
    {
        question: "Which blockchain does Raiku primarily work with?",
        options: [
            { text: "Ethereum", correct: false },
            { text: "Bitcoin", correct: false },
            { text: "Solana", correct: true },
            { text: "Cardano", correct: false }
        ]
    },
    {
        question: "What is one key feature of Raiku’s Coordination Layer?",
        options: [
            { text: "High-performance block building", correct: true },
            { text: "Decentralized cloud storage", correct: false },
            { text: "Anonymous voting systems", correct: false },
            { text: "Cross-chain token swaps", correct: false }
        ]
    },
    {
        question: "Which of the following is a benefit of Raiku’s Coordination Layer?",
        options: [
            { text: "Increased transaction latency", correct: false },
            { text: "Low-latency global coordination", correct: true },
            { text: "Reduced blockchain security", correct: false },
            { text: "Higher energy consumption", correct: false }
        ]
    },
    {
        question: "In which industry is Raiku’s technology particularly applicable?",
        options: [
            { text: "Healthcare", correct: false },
            { text: "Finance", correct: true },
            { text: "Social media", correct: false },
            { text: "E-commerce", correct: false }
        ]
    },
    {
        question: "What does Raiku’s “pre-confirmations” feature help achieve?",
        options: [
            { text: "Faster transaction finality", correct: true },
            { text: "Increased transaction fees", correct: false },
            { text: "Longer confirmation times", correct: false },
            { text: "Reduced network security", correct: false }
        ]
    },
    {
        question: "What characteristic of Raiku’s Coordination Layer supports diverse use cases?",
        options: [
            { text: "Fixed execution model", correct: false },
            { text: "Flexible execution", correct: true },
            { text: "Single-node processing", correct: false },
            { text: "Limited scalability", correct: false }
        ]
    },
    {
        question: "What is a primary goal of Raiku’s infrastructure?",
        options: [
            { text: "Creating centralized databases", correct: false },
            { text: "Enhancing Solana’s scalability and reliability", correct: true },
            { text: "Replacing Solana’s consensus mechanism", correct: false },
            { text: "Building a standalone blockchain", correct: false }
        ]
    },
    {
        question: "Which of the following is NOT a feature of Raiku’s Coordination Layer?",
        options: [
            { text: "High-performance block building", correct: false },
            { text: "Low-latency coordination", correct: false },
            { text: "Decentralized identity verification", correct: true },
            { text: "Flexible execution", correct: false }
        ]
    },
    {
        question: "Why might someone want to join Raiku’s project?",
        options: [
            { text: "To develop centralized banking systems", correct: false },
            { text: "To contribute to innovative blockchain infrastructure", correct: true },
            { text: "To create social media platforms", correct: false },
            { text: "To design virtual reality games", correct: false }
        ]
    }
];

// Quiz logic implementation
let currentQuestion = 0;
let score = 0;
let timer = null;
let timeLeft = 15;

const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const progressBar = document.getElementById('progress-bar');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const timerDisplay = document.getElementById('timer-display');
const resultsModal = document.getElementById('results-modal');
const resultsContent = document.getElementById('results-content');
const finalScore = document.getElementById('final-score');
const totalScore = document.getElementById('total-score');
const scoreMessage = document.getElementById('score-message');
const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');

function shuffleQuestions(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function startQuiz() {
    shuffleQuestions(questions);
    currentQuestion = 0;
    score = 0;
    totalQuestionsSpan.textContent = questions.length;
    showQuestion();
}

function showQuestion() {
    resetState();
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    q.options.forEach((option, idx) => {
        const btn = document.createElement('button');
        btn.className = 'w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-xl text-lg font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-150 option-btn flex items-center justify-between';
        btn.innerHTML = `<span>${option.text}</span><span class="icon-container"></span>`;
        btn.onclick = () => selectAnswer(btn, option.correct, idx);
        answerOptions.appendChild(btn);
    });
    currentQuestionSpan.textContent = currentQuestion + 1;
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    timeLeft = 15;
    timerDisplay.textContent = timeLeft;
    startTimer();
    nextBtn.disabled = true;
    submitBtn.disabled = true;
    submitBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
    if (currentQuestion === questions.length - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
        submitBtn.textContent = 'Submit';
    } else {
        submitBtn.textContent = 'See Results';
    }
}


function resetState() {
    while (answerOptions.firstChild) {
        answerOptions.removeChild(answerOptions.firstChild);
    }
    clearInterval(timer);
}

function selectAnswer(btn, isCorrect, selectedIdx) {
    Array.from(answerOptions.children).forEach((child, idx) => {
        child.disabled = true;
        child.classList.remove('bg-blue-50', 'border-blue-400', 'bg-green-200', 'bg-red-200', 'selected-answer', 'correct-answer', 'wrong-answer', 'opacity-60');
        // Remove any previous icon
        let icon = child.querySelector('.icon-container');
        if (icon) icon.innerHTML = '';
        child.classList.add('opacity-60');
    });
    if (isCorrect) {
        btn.classList.add('selected-answer');
        let icon = btn.querySelector('.icon-container');
        if (icon) icon.innerHTML = '<svg class="inline ml-2" width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#b6f2d7"/><path d="M8 12.5l3 3 5-5.5" stroke="#1C7C54" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        score++;
    } else {
        btn.classList.add('wrong-answer');
        let icon = btn.querySelector('.icon-container');
        if (icon) icon.innerHTML = '<svg class="inline ml-2" width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M8 8l8 8M16 8l-8 8" stroke="#e57373" stroke-width="2.2" stroke-linecap="round"/></svg>';
        // Highlight the correct answer
        Array.from(answerOptions.children).forEach((child, idx) => {
            if (questions[currentQuestion].options[idx].correct) {
                child.classList.add('correct-answer');
                let icon = child.querySelector('.icon-container');
                if (icon) icon.innerHTML = '<svg class="inline ml-2" width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1C7C54"/><path d="M8 12.5l3 3 5-5.5" stroke="#E8F5E9" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            }
        });
    }
    nextBtn.disabled = false;
    submitBtn.disabled = false;
    clearInterval(timer);
    // No auto-advance. User must click Next or Submit to proceed.
}

function startTimer() {
    timerDisplay.classList.remove('timer-blink', 'timer-critical');
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        // Blinking and red logic
        timerDisplay.classList.remove('timer-blink');
        if (timeLeft <= 8) {
            timerDisplay.classList.add('timer-blink');
        }
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerDisplay.classList.remove('timer-blink', 'timer-critical');
            selectAnswer(answerOptions.children[0], false); // auto-select first option
        }
    }, 1000);
}

nextBtn.onclick = () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
};

submitBtn.onclick = () => {
    showResults();
};

shareBtn.onclick = () => {
    const score = finalScore.textContent;
    const total = totalScore.textContent;
    const tweetText = encodeURIComponent(`I scored ${score}/${total} on the Raikucom Quiz! Test your knowledge: https://raikuquiz.vercel.app/`);
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(url, '_blank');
};

function showResults() {
    finalScore.textContent = score;
    totalScore.textContent = questions.length;
    let message = '';
    const percent = (score / questions.length) * 100;
    if (percent === 100) message = 'Perfect Score! Raiku Pro!';
    else if (percent >= 80) message = 'Excellent!';
    else if (percent >= 60) message = 'Good Job!';
    else if (percent >= 40) message = 'Keep Practicing!';
    else message = 'Try Again!';
    scoreMessage.textContent = message;
    resultsModal.classList.remove('hidden');
    setTimeout(() => {
        resultsContent.classList.remove('scale-95', 'opacity-0');
        resultsContent.classList.add('scale-100', 'opacity-100');
    }, 50);
}

restartBtn.onclick = () => {
    resultsModal.classList.add('hidden');
    resultsContent.classList.remove('scale-100', 'opacity-100');
    resultsContent.classList.add('scale-95', 'opacity-0');
    startQuiz();
};

document.addEventListener('DOMContentLoaded', function() {
    var startModal = document.getElementById('start-modal');
    var quizContainer = document.getElementById('quiz-container');
    var startBtn = document.getElementById('start-quiz-btn');
    if (startModal && quizContainer && startBtn) {
        quizContainer.style.display = 'none';
        startModal.style.display = 'flex';
        startBtn.onclick = function() {
            startModal.style.display = 'none';
            quizContainer.style.display = '';
            startQuiz();
        };
    } else {
        // fallback: if modal not present, just start quiz
        startQuiz();
    }
});
