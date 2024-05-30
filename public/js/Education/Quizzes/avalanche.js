let currentQuestion = 1; 
const quizQuestions = [
    {
        "question": "What is an avalanche?",
        "options": [
            "A sudden release of snow, ice, and rocks down a mountain slope",
            "A type of mountain found in cold regions",
            "A weather pattern involving heavy snowfall",
            "A method of skiing"
        ],
        "correctAnswer": "A sudden release of snow, ice, and rocks down a mountain slope"
    },
    {
        "question": "Which factor is most likely to trigger an avalanche?",
        "options": [
            "A loud noise",
            "A change in temperature",
            "Heavy snowfall",
            "All of the above"
        ],
        "correctAnswer": "All of the above"
    },
    {
        "question": "What is the most dangerous type of avalanche?",
        "options": [
            "Slab avalanche",
            "Loose snow avalanche",
            "Wet avalanche",
            "Ice avalanche"
        ],
        "correctAnswer": "Slab avalanche"
    },
    {
        "question": "Which layer in the snowpack is typically responsible for causing avalanches?",
        "options": [
            "The topmost layer",
            "A weak layer buried beneath stronger layers",
            "The bottom layer",
            "The layer closest to the ground"
        ],
        "correctAnswer": "A weak layer buried beneath stronger layers"
    },
    {
        "question": "What time of day do avalanches most commonly occur?",
        "options": [
            "Morning",
            "Afternoon",
            "Evening",
            "Night"
        ],
        "correctAnswer": "Afternoon"
    },
    {
        "question": "What is a terrain trap in the context of avalanches?",
        "options": [
            "A feature that increases the severity of an avalanche",
            "A device used to prevent avalanches",
            "A safety feature designed to stop an avalanche",
            "A type of equipment used in avalanche rescue"
        ],
        "correctAnswer": "A feature that increases the severity of an avalanche"
    },
    {
        "question": "What are the signs of avalanche danger?",
        "options": [
            "Recent avalanche activity",
            "Cracks in the snowpack",
            "A whoompf sound",
            "All of the above"
        ],
        "correctAnswer": "All of the above"
    },
    {
        "question": "What should you do if caught in an avalanche?",
        "options": [
            "Try to swim to the surface",
            "Stay still and wait for rescue",
            "Dig yourself deeper",
            "None of the above"
        ],
        "correctAnswer": "Try to swim to the surface"
    },
    {
        "question": "Which equipment is essential for avalanche safety?",
        "options": [
            "Avalanche transceiver",
            "GPS device",
            "Cell phone",
            "Compass"
        ],
        "correctAnswer": "Avalanche transceiver"
    },
    {
        "question": "What does an avalanche transceiver do?",
        "options": [
            "Sends a distress signal to satellites",
            "Receives weather updates",
            "Helps locate buried avalanche victims",
            "Warns of impending avalanches"
        ],
        "correctAnswer": "Helps locate buried avalanche victims"
    },
    {
        "question": "What is the role of a probe in avalanche rescue?",
        "options": [
            "To dig out buried victims",
            "To detect movement under the snow",
            "To locate victims under the snow",
            "To provide oxygen to buried victims"
        ],
        "correctAnswer": "To locate victims under the snow"
    },
    {
        "question": "How can trees affect an avalanche?",
        "options": [
            "Increase its speed",
            "Stop it completely",
            "Have no effect",
            "Slow it down or stop it"
        ],
        "correctAnswer": "Slow it down or stop it"
    },
    {
        "question": "What is a cornice in relation to avalanches?",
        "options": [
            "A type of avalanche",
            "A mass of snow overhanging a ridge",
            "A safety device",
            "A rescue technique"
        ],
        "correctAnswer": "A mass of snow overhanging a ridge"
    },
    {
        "question": "Which factor does not contribute to avalanche risk?",
        "options": [
            "Slope angle",
            "Snow temperature",
            "Wind speed",
            "The color of the snow"
        ],
        "correctAnswer": "The color of the snow"
    },{
        "question": "What is the safest way to cross a slope that may be prone to avalanches?",
        "options": [
            "Straight down the slope",
            "In a zigzag pattern",
            "One person at a time",
            "In a group for safety"
        ],
        "correctAnswer": "One person at a time"
    },
    {
        "question": "What is the main purpose of an avalanche airbag?",
        "options": [
            "To provide air to breathe",
            "To float on top of the avalanche",
            "To send a GPS signal",
            "To alert rescue teams"
        ],
        "correctAnswer": "To float on top of the avalanche"
    },
    {
        "question": "What should be avoided when traveling in avalanche-prone areas?",
        "options": [
            "Steep slopes",
            "Areas with sparse vegetation",
            "Areas below freezing point",
            "All of the above"
        ],
        "correctAnswer": "All of the above"
    },
    {
        "question": "What does the term 'avalanche mitigation' refer to?",
        "options": [
            "Predicting when and where an avalanche will occur",
            "Taking steps to reduce the impact of avalanches",
            "Studying avalanches after they occur",
            "None of the above"
        ],
        "correctAnswer": "Taking steps to reduce the impact of avalanches"
    },
    {
        "question": "Which of the following is a natural trigger of avalanches?",
        "options": [
            "Snowmobiles",
            "Skiing",
            "Heavy snowfall",
            "Explosives"
        ],
        "correctAnswer": "Heavy snowfall"
    },
    {
        "question": "What is a slab avalanche?",
        "options": [
            "An avalanche that occurs on flat terrain",
            "A release of a cohesive layer of snow",
            "An avalanche consisting only of loose snow",
            "A small avalanche that is triggered by animals"
        ],
        "correctAnswer": "A release of a cohesive layer of snow"
    }
    
    
    
];
let userAnswers = {};

function initializeQuiz() {
    generateCards();
    updateCurrentQuestion();
    document.querySelectorAll('.card').forEach(card => {
        card.style.backgroundColor = ''; 
    });
}

function generateCards() {
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = ''; 
    for (let i = 1; i <= quizQuestions.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = i;
        card.onclick = () => goToQuestion(i);
        cardsContainer.appendChild(card);
    }
}

function navigate(direction) {
    currentQuestion += direction;
    if (currentQuestion < 1) currentQuestion = 1;
    if (currentQuestion > 30) currentQuestion = 30;
    updateCurrentQuestion();
}

function goToQuestion(questionNumber) {
    currentQuestion = questionNumber;
    updateCurrentQuestion();
}

function updateCurrentQuestion() {
    const questionEl = document.querySelector('.question');
    const questionData = quizQuestions[currentQuestion - 1];
    
    questionEl.innerHTML = `<h2>${currentQuestion}. ${questionData.question}</h2>
        <form id="quiz-form" onchange="saveUserAnswer(${currentQuestion - 1})">
            ${questionData.options.map((option, index) => `
                <input type="radio" id="option${index}" name="question${currentQuestion}" value="${option}" ${userAnswers[currentQuestion - 1] === option ? 'checked' : ''}>
                <label for="option${index}">${option}</label><br>
            `).join('')}
        </form>`;
}

function saveUserAnswer(questionIndex) {
    const selectedOption = document.querySelector(`input[name="question${questionIndex + 1}"]:checked`).value;
    userAnswers[questionIndex] = selectedOption;
}

function submitQuiz() {
    let score = 0;
    const questionEl = document.querySelector('.question');
    questionEl.innerHTML = ''; 

    quizQuestions.forEach((question, qIndex) => {
        const userAnswer = userAnswers[qIndex];
        const correctAnswer = question.correctAnswer;
        const isCorrect = userAnswer === correctAnswer;

        if (isCorrect) {
            score++;
        }

        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result-question');
        resultDiv.innerHTML = `<h2>${qIndex + 1}. ${question.question}</h2>
            ${question.options.map((option, index) => {
                let color = option === correctAnswer ? 'green' : 'black';
                let additionalText = option === correctAnswer ? '' : '';

                if (userAnswer) {
                    if (option === userAnswer) {
                        color = option === correctAnswer ? 'green' : 'red'; 
                    }
                } else if (option === correctAnswer) {
                    additionalText += ' (Not marked)'; 
                }

                return `<div style="color: ${color};">${option}${additionalText}</div>`;
            }).join('')}`;

        questionEl.appendChild(resultDiv);
    });

    alert(`Quiz submitted! Your score is ${score}/${quizQuestions.length}.`);
}

window.onload = initializeQuiz;
