let currentQuestion = 1;
const quizQuestions = [
   
    {
        "question": "What is a storm?",
        "options": [
            "A clear weather pattern characterized by sunshine",
            "A disturbance of the atmosphere with strong winds and usually rain, snow, or other precipitation",
            "A long period of drought affecting a large area",
            "An earthquake that triggers a tsunami"
        ],
        "correctAnswer": "A disturbance of the atmosphere with strong winds and usually rain, snow, or other precipitation"
    },
    {
        "question": "Which type of storm is characterized by a rotating column of air that touches both the cloud base and the Earth's surface?",
        "options": [
            "Hurricane",
            "Tornado",
            "Thunderstorm",
            "Blizzard"
        ],
        "correctAnswer": "Tornado"
    },
    {
        "question": "What is the main difference between a hurricane and a typhoon?",
        "options": [
            "Their size",
            "Their location",
            "The season they occur",
            "Their wind speeds"
        ],
        "correctAnswer": "Their location"
    },
    {
        "question": "What is the eye of a hurricane?",
        "options": [
            "The most destructive part of the hurricane",
            "The center of the hurricane, characterized by a calm weather",
            "A satellite tool used to track hurricanes",
            "The outer edge of the hurricane"
        ],
        "correctAnswer": "The center of the hurricane, characterized by a calm weather"
    },
    {
        "question": "Which of the following is a common effect of storms?",
        "options": [
            "Power outages",
            "Flooding",
            "Damage to buildings and infrastructure",
            "All of the above"
        ],
        "correctAnswer": "All of the above"
    },
    {
        "question": "What does a storm surge involve?",
        "options": [
            "A sudden drop in atmospheric pressure",
            "An increase in storm intensity",
            "A rising of the sea as a result of atmospheric pressure changes and wind associated with a storm",
            "A surge of lightning activity"
        ],
        "correctAnswer": "A rising of the sea as a result of atmospheric pressure changes and wind associated with a storm"
    },
    {
        "question": "What conditions are required for the formation of a thunderstorm?",
        "options": [
            "Cold temperatures and snow",
            "Moisture, unstable air, and a lifting mechanism",
            "Dry air and high winds",
            "High temperatures and clear skies"
        ],
        "correctAnswer": "Moisture, unstable air, and a lifting mechanism"
    },
    {
        "question": "What is a blizzard?",
        "options": [
            "A tropical storm with heavy rainfall",
            "A severe snowstorm with strong winds and low visibility",
            "A heatwave that occurs in winter",
            "A storm with heavy thunder and lightning"
        ],
        "correctAnswer": "A severe snowstorm with strong winds and low visibility"
    },
    {
        "question": "How are storms classified?",
        "options": [
            "By the damage they cause",
            "By their wind speed and potential for damage",
            "By the amount of precipitation they drop",
            "By the temperature during the storm"
        ],
        "correctAnswer": "By their wind speed and potential for damage"
    },
    {
        "question": "What safety measure is recommended when a tornado warning is issued?",
        "options": [
            "Go outside and confirm the tornado's location",
            "Seek shelter immediately, preferably in a basement or storm cellar",
            "Open all windows to equalize pressure",
            "Evacuate the town or city"
        ],
        "correctAnswer": "Seek shelter immediately, preferably in a basement or storm cellar"
    },
    {
        "question": "What is a squall line?",
        "options": [
            "A row of bushes planted to reduce wind speed",
            "A long line of heavy thunderstorms that can form ahead of a cold front",
            "The boundary where two squalls meet",
            "A graphical tool used to predict squalls"
        ],
        "correctAnswer": "A long line of heavy thunderstorms that can form ahead of a cold front"
    },
    {
        "question": "What is the Saffir-Simpson Hurricane Wind Scale used for?",
        "options": [
            "To measure the size of a hurricane",
            "To determine the potential for flooding from a hurricane",
            "To classify hurricanes based on their wind speed",
            "To predict the path of hurricanes"
        ],
        "correctAnswer": "To classify hurricanes based on their wind speed"
    },{
        "question": "What causes a storm?",
        "options": [
            "A sudden temperature change in the Earth's core",
            "The movement of tectonic plates in the Earth's crust",
            "Differences in air pressure",
            "The shaking of the surface of the Earth resulting from a sudden release of energy in the Earth's lithosphere"
        ],
        "correctAnswer": "Differences in air pressure"
    },
    {
        "question": "What is a thunderstorm?",
        "options": [
            "A storm characterized by snow",
            "A storm with thunder and lightning",
            "A strong windstorm without precipitation",
            "A heavy downpour of rain without thunder"
        ],
        "correctAnswer": "A storm with thunder and lightning"
    },
    {
        "question": "Which of these storms is classified by rotating winds?",
        "options": [
            "Tornado",
            "Hurricane",
            "Both A and B",
            "Hailstorm"
        ],
        "correctAnswer": "Both A and B"
    },
    {
        "question": "What is a hurricane called in the Western Pacific?",
        "options": [
            "Typhoon",
            "Cyclone",
            "Tsunami",
            "Tornado"
        ],
        "correctAnswer": "Typhoon"
    },
    {
        "question": "What measures the intensity of a hurricane?",
        "options": [
            "The Enhanced Fujita scale",
            "The Richter scale",
            "The Saffir-Simpson Hurricane Wind Scale",
            "The Beaufort scale"
        ],
        "correctAnswer": "The Saffir-Simpson Hurricane Wind Scale"
    },
    {
        "question": "What is the eye of a hurricane?",
        "options": [
            "The most destructive part of the hurricane",
            "The center of the hurricane, characterized by calm weather",
            "The outer edge of the hurricane",
            "A term used to describe the vision of a hurricane"
        ],
        "correctAnswer": "The center of the hurricane, characterized by calm weather"
    },
    {
        "question": "Which phenomenon occurs when warm air rises and cold air sinks, creating a cycling effect?",
        "options": [
            "Convection",
            "Evaporation",
            "Condensation",
            "Sublimation"
        ],
        "correctAnswer": "Convection"
    },
    {
        "question": "What is a supercell?",
        "options": [
            "A type of battery",
            "A highly organized storm characterized by a deep rotating updraft",
            "The final stage of a thunderstorm",
            "A cloud formation preceding a tornado"
        ],
        "correctAnswer": "A highly organized storm characterized by a deep rotating updraft"
    },
     
    
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
