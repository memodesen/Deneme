let currentQuestion = 1;
const quizQuestions = [
   
    {
        "question": "What is the most common cause of wildfires?",
        "options": [
            "Lightning strikes",
            "Campfires left unattended",
            "Cigarettes",
            "All of the above"
        ],
        "correctAnswer": "All of the above"
    },
    {
        "question": "Which of these elements is not part of the fire triangle?",
        "options": [
            "Fuel",
            "Oxygen",
            "Water",
            "Heat"
        ],
        "correctAnswer": "Water"
    },
    {
        "question": "What is a controlled burn?",
        "options": [
            "A wildfire that firefighters are able to manage",
            "An intentional fire set to prevent larger fires",
            "A fire used to cook food in the wilderness",
            "A technique for putting out fires with minimal water"
        ],
        "correctAnswer": "An intentional fire set to prevent larger fires"
    },
    {
        "question": "Which type of fire extinguisher is most suitable for a grease fire?",
        "options": [
            "Water-based",
            "Foam",
            "Dry chemical",
            "CO2"
        ],
        "correctAnswer": "Dry chemical"
    },
    {
        "question": "What does the term 'flashpoint' refer to?",
        "options": [
            "The temperature at which a liquid boils",
            "The temperature at which something catches fire spontaneously",
            "The minimum temperature at which a liquid forms a vapor above its surface in sufficient concentration that it can be ignited",
            "The point in a fire at which it becomes uncontrollable"
        ],
        "correctAnswer": "The minimum temperature at which a liquid forms a vapor above its surface in sufficient concentration that it can be ignited"
    },
    {
        "question": "What is a firebreak?",
        "options": [
            "A technique used by firefighters to rest during long wildfires",
            "A natural barrier that stops the progress of a fire",
            "An artificial barrier created to halt the spread of a fire",
            "A break in the continuity of fuel for a fire provided by roads or rivers"
        ],
        "correctAnswer": "An artificial barrier created to halt the spread of a fire"
    },
    {
        "question": "What is the main purpose of a smoke detector?",
        "options": [
            "To extinguish small fires automatically",
            "To detect and alert individuals to the presence of smoke",
            "To purify air in case of smoke",
            "To act as a security device against intruders"
        ],
        "correctAnswer": "To detect and alert individuals to the presence of smoke"
    },
    {
        "question": "In fire safety, what does 'PASS' stand for when using a fire extinguisher?",
        "options": [
            "Pull, Aim, Squeeze, Sweep",
            "Push, Aim, Spray, Stay",
            "Pull, Align, Squeeze, Stay",
            "Push, Align, Spray, Sweep"
        ],
        "correctAnswer": "Pull, Aim, Squeeze, Sweep"
    },
    {
        "question": "Which of the following materials is most fire-resistant?",
        "options": [
            "Wood",
            "Plastic",
            "Steel",
            "Concrete"
        ],
        "correctAnswer": "Concrete"
    },
    {
        "question": "What is a backdraft?",
        "options": [
            "A sudden intake of air before a fire ignites",
            "A technique used to ventilate a burning building",
            "An explosive event caused by the introduction of oxygen into an oxygen-depleted environment",
            "The movement of air that follows a moving fire truck"
        ],
        "correctAnswer": "An explosive event caused by the introduction of oxygen into an oxygen-depleted environment"
    },
    {
        "question": "How can homeowners reduce the risk of fire?",
        "options": [
            "Regularly cleaning the chimney",
            "Installing and maintaining smoke detectors",
            "Keeping a fire extinguisher on hand",
            "All of the above"
        ],
        "correctAnswer": "All of the above"
    },
    {
        "question": "What should you do if your clothes catch on fire?",
        "options": [
            "Run to get help",
            "Throw water on yourself",
            "Stop, Drop, and Roll",
            "Wave your arms to put out the flames"
        ],
        "correctAnswer": "Stop, Drop, and Roll"
    },{
        "question": "Which natural ecosystem depends on periodic fires for renewal?",
        "options": [
            "Tropical rainforests",
            "Coral reefs",
            "Grasslands",
            "Deciduous forests"
        ],
        "correctAnswer": "Grasslands"
    },
    {
        "question": "What is the leading cause of home fire deaths?",
        "options": [
            "Cooking equipment",
            "Heating equipment",
            "Electrical malfunction",
            "Smoking materials"
        ],
        "correctAnswer": "Smoking materials"
    },
    {
        "question": "What phenomenon causes the rapid spread of fire through the upper layer of air, due to intense heat?",
        "options": [
            "Flashover",
            "Backdraft",
            "Jet fire",
            "Roll-over"
        ],
        "correctAnswer": "Flashover"
    },
    {
        "question": "During a wildfire, what should you do if you are trapped in your car?",
        "options": [
            "Leave the car and run",
            "Drive as fast as possible",
            "Stay in the car, close windows and vents, and cover yourself with a wool blanket",
            "Honk the horn continuously for help"
        ],
        "correctAnswer": "Stay in the car, close windows and vents, and cover yourself with a wool blanket"
    },
    {
        "question": "Which class of fire involves flammable gases?",
        "options": [
            "Class A",
            "Class B",
            "Class C",
            "Class D"
        ],
        "correctAnswer": "Class B"
    },
    {
        "question": "What is the best way to put out a campfire safely?",
        "options": [
            "Let it burn out on its own",
            "Cover it with dry leaves",
            "Douse it with water, then stir and douse again until cold",
            "Bury it with soil"
        ],
        "correctAnswer": "Douse it with water, then stir and douse again until cold"
    },
    {
        "question": "Which firefighting method involves removing the fuel source?",
        "options": [
            "Cooling",
            "Smothering",
            "Starvation",
            "Breaking the chemical chain reaction"
        ],
        "correctAnswer": "Starvation"
    },
    {
        "question": "What does the term 'defensible space' refer to in wildfire preparedness?",
        "options": [
            "A safety zone for firefighters",
            "An area cleared of all flammable vegetation and materials around a structure",
            "A firefighting technique involving defensive positions",
            "A legal term for property that can be defended in court"
        ],
        "correctAnswer": "An area cleared of all flammable vegetation and materials around a structure"
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
