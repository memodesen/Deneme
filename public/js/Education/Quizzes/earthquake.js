let currentQuestion = 1; 
const quizQuestions = [
    {
        "question": "What is an earthquake?",
        "options": [
            "The sudden release of energy in the Earth's atmosphere causing wind storms",
            "The movement of tectonic plates in the Earth's crust",
            "The shaking of the surface of the Earth resulting from a sudden release of energy in the Earth's lithosphere",
            "A sudden temperature change in the Earth's core"
        ]
        ,"correctAnswer": "The shaking of the surface of the Earth resulting from a sudden release of energy in the Earth's lithosphere"

    },
    {
        "question": "Which scale is used to measure the magnitude of an earthquake?",
        "options": [
            "Kelvin Scale",
            "Richter Scale",
            "Beaufort Scale",
            "Mohs Scale"
        ]
        ,"correctAnswer":"Richter Scale"
    },
    {
        "question": "What is the point on the Earth's surface directly above an earthquake's focus called?",
        "options": [
            "Epicenter",
            "Hypocenter",
            "Ground Zero",
            "Apex"
        ]
        ,"correctAnswer":"Epicenter"
    },
    {
        "question": "Which layer of the Earth is most associated with the occurrence of earthquakes?",
        "options": [
            "Crust",
            "Mantle",
            "Outer Core",
            "Inner Core"
        ]
        ,"correctAnswer":"Crust"
    },
    {
        "question": "What do seismologists use to detect and record earthquakes?",
        "options": [
            "Barometer",
            "Hydrometer",
            "Seismometer",
            "Anemometer"
        ]
        ,"correctAnswer":"Seismometer"
    },
    {
        "question": "What is a fault?",
        "options": [
            "A mistake in Earth's geological composition",
            "A fracture in the Earth's crust where movement has occurred",
            "A large hole in the Earth's surface",
            "An area of the ocean floor where tsunamis originate"
        ]
        ,"correctAnswer":"A fracture in the Earth's crust where movement has occurred"
    },
    {
        "question": "What type of seismic waves arrive first, thereby being the fastest?",
        "options": [
            "Love waves",
            "Rayleigh waves",
            "P-waves",
            "S-waves"
        ]
        ,"correctAnswer":"P-waves"
    },
    {
        "question": "What is liquefaction?",
        "options": [
            "The process of turning solid rock into magma",
            "The hardening of lava into volcanic rock",
            "The conversion of water into steam during an earthquake",
            "The phenomenon where saturated soil temporarily loses its strength and behaves like a liquid due to the shaking of an earthquake"
        ]
        ,"correctAnswer":"The phenomenon where saturated soil temporarily loses its strength and behaves like a liquid due to the shaking of an earthquake"
    },
    {
        "question": "Which of the following is a secondary effect of earthquakes?",
        "options": [
            "Tsunamis",
            "Ground shaking",
            "Faulting",
            "Aftershocks"
        ]
        ,"correctAnswer":"Tsunamis"
    },
    {
        "question": "The point within the Earth where an earthquake originates is known as the:",
        "options": [
            "Epicenter",
            "Hypocenter",
            "Centerpoint",
            "Earthquake origin"
        ]
        ,"correctAnswer":"Hypocenter"
    },
    {
        "question": "What is the term for smaller earthquakes that follow the main shock?",
        "options": [
            "Foreshocks",
            "Aftershocks",
            "Microshocks",
            "Preshocks"
        ]
        ,"correctAnswer":"Aftershocks"
    },
    {
        "question": "Which of these countries is not in the Pacific Ring of Fire, known for frequent earthquakes and volcanic eruptions?",
        "options": [
            "Japan",
            "Chile",
            "Australia",
            "Indonesia"
        ]
        ,"correctAnswer":"Australia"
    },
    {
        "question": "What is the main cause of tsunamis?",
        "options": [
            "High winds",
            "Underwater earthquakes",
            "Lunar gravitational pull",
            "Coastal erosion"
        ]
        ,"correctAnswer":"Underwater earthquakes"
    },
    {
        "question": "Which of the following materials would seismic waves travel fastest through?",
        "options": [
            "Water",
            "Air",
            "Solid rock",
            "Sand"
        ]
        ,"correctAnswer":"Solid rock"
    },
    {
        "question": "What does the term 'magnitude' refer to in the context of an earthquake?",
        "options": [
            "The damage it causes",
            "The depth at which it occurs",
            "The amount of energy released",
            "The duration of the earthquake"
        ]
        ,"correctAnswer":"The amount of energy released"
    },
    {
        "question": "In which layer of the Earth do earthquakes occur?",
        "options": [
            "Troposphere",
            "Stratosphere",
            "Lithosphere",
            "Mesosphere"
        ]
        ,"correctAnswer":"Lithosphere"
    },
    {
        "question": "What phenomenon often occurs after large earthquakes in oceanic regions?",
        "options": [
            "El Niño",
            "Tsunamis",
            "Hurricanes",
            "Tornadoes"
        ]
        ,"correctAnswer":"Tsunamis"
    },{
        "question": "Which of the following areas is least likely to experience an earthquake?",
        "options": [
            "Near a plate boundary",
            "In the middle of a tectonic plate",
            "On a known fault line",
            "At a subduction zone"
        ]
        ,"correctAnswer":"In the middle of a tectonic plate"
    },
    {
        "question": "What is the Ring of Fire?",
        "options": [
            "A circle of volcanoes around the Arctic Circle",
            "A series of gyms in a popular fitness chain",
            "A major area in the basin of the Pacific Ocean where many earthquakes and volcanic eruptions occur",
            "A theoretical concept in astrophysics"
        ]
        ,"correctAnswer":"A major area in the basin of the Pacific Ocean where many earthquakes and volcanic eruptions occur"
    },
    {
        "question": "Which technology is primarily used to study the Earth's interior and detect earthquakes?",
        "options": [
            "RADAR",
            "LIDAR",
            "Seismography",
            "Sonar"
        ]
        ,"correctAnswer":"Seismography"
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
