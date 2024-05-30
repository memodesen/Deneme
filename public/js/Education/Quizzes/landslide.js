let currentQuestion = 1; 
const quizQuestions = [
   
    {
        "question": "What is a landslide?",
        "options": [
            "A sudden snowfall on a mountain",
            "The movement of rock, earth, or debris down a sloped section of land",
            "An earthquake that occurs underground",
            "A large wave caused by an underwater earthquake"
        ],
        "correctAnswer": "The movement of rock, earth, or debris down a sloped section of land"
    },
    {
        "question": "What can trigger a landslide?",
        "options": [
            "Heavy rain",
            "Earthquakes",
            "Volcanic activity",
            "All of the above"
        ],
        "correctAnswer": "All of the above"
    },
    {
        "question": "Which type of area is most susceptible to landslides?",
        "options": [
            "Flat terrains with no vegetation",
            "Slopes that have been previously disturbed",
            "Areas with dense, deep-rooted trees",
            "Urban areas with no nearby water sources"
        ],
        "correctAnswer": "Slopes that have been previously disturbed"
    },
    {
        "question": "What is the role of vegetation in preventing landslides?",
        "options": [
            "It adds weight to potentially unstable slopes",
            "The roots stabilize the soil and absorb water",
            "It attracts wildlife that can dig and anchor the soil",
            "Vegetation has no role in preventing landslides"
        ],
        "correctAnswer": "The roots stabilize the soil and absorb water"
    },
    {
        "question": "What is a debris flow?",
        "options": [
            "A slow movement of soil down a slope",
            "A fast-moving landslide that involves a mixture of water, rock, soil, and vegetation",
            "The aftermath of a volcanic eruption",
            "A controlled flow of debris set up to prevent landslides"
        ],
        "correctAnswer": "A fast-moving landslide that involves a mixture of water, rock, soil, and vegetation"
    },
    {
        "question": "How can human activities contribute to the risk of landslides?",
        "options": [
            "By planting trees on slopes",
            "Through construction and development on unstable slopes",
            "By studying and monitoring landslide-prone areas",
            "Human activities do not contribute to the risk of landslides"
        ],
        "correctAnswer": "Through construction and development on unstable slopes"
    },
    {
        "question": "What is the main difference between a rockslide and a rockfall?",
        "options": [
            "A rockslide occurs underwater, while a rockfall does not",
            "A rockslide involves the movement of rock on a slope, while a rockfall is the free fall of rocks",
            "A rockfall is larger than a rockslide",
            "There is no difference; they are the same phenomenon"
        ],
        "correctAnswer": "A rockslide involves the movement of rock on a slope, while a rockfall is the free fall of rocks"
    },
    {
        "question": "What does the term 'slope stabilization' refer to?",
        "options": [
            "The natural process of slopes becoming stable over time",
            "Engineering and vegetation strategies used to make slopes less susceptible to landslides",
            "The study of slopes and their angles",
            "A type of insurance policy for homeowners in landslide-prone areas"
        ],
        "correctAnswer": "Engineering and vegetation strategies used to make slopes less susceptible to landslides"
    },
    {
        "question": "What are 'retaining walls' used for in landslide mitigation?",
        "options": [
            "To retain water from reaching landslide-prone areas",
            "To prevent debris from spreading onto roads and properties",
            "To support the soil and prevent it from sliding down slopes",
            "To decorate landscapes and provide aesthetic value"
        ],
        "correctAnswer": "To support the soil and prevent it from sliding down slopes"
    },
    {
        "question": "Why are landslides common after wildfires?",
        "options": [
            "Because the water used to extinguish fires saturates the soil",
            "Because fires can destabilize the ground by burning away vegetation that holds the soil in place",
            "Because the heat from fires causes rocks to expand and crack",
            "Wildfires have no effect on the likelihood of landslides"
        ],
        "correctAnswer": "Because fires can destabilize the ground by burning away vegetation that holds the soil in place"
    }, {
        "question": "What is a landslide?",
        "options": [
            "A rapid flow of snow down a sloping surface",
            "The movement of rock, earth, or debris down a sloped section of land",
            "An earthquake that triggers a tsunami",
            "The process of land drying out and cracking"
        ],
        "correctAnswer": "The movement of rock, earth, or debris down a sloped section of land"
    },
    {
        "question": "Which factor can trigger a landslide?",
        "options": [
            "Heavy rainfall",
            "Earthquakes",
            "Volcanic activity",
            "All of the above"
        ],
        "correctAnswer": "All of the above"
    },
    {
        "question": "What role does water play in landslides?",
        "options": [
            "It can lubricate soil and rock, making slopes more susceptible to landslides",
            "It dries out the land, making it more stable",
            "It acts as a barrier to landslides",
            "None of the above"
        ],
        "correctAnswer": "It can lubricate soil and rock, making slopes more susceptible to landslides"
    },
    {
        "question": "What is a mudflow?",
        "options": [
            "A slow movement of soil down a hill",
            "A rapid flow of water mixed with soil and rock",
            "The flow of mud during a volcanic eruption",
            "A type of landslide that occurs underwater"
        ],
        "correctAnswer": "A rapid flow of water mixed with soil and rock"
    },
    {
        "question": "How can human activities contribute to landslides?",
        "options": [
            "Deforestation",
            "Construction",
            "Irrigation practices",
            "All of the above"
        ],
        "correctAnswer": "All of the above"
    },
    {
        "question": "What is the main difference between a landslide and a rockfall?",
        "options": [
            "The material involved in the movement",
            "The speed at which the material moves",
            "Rockfalls involve liquid, whereas landslides do not",
            "Landslides can only occur on mountains"
        ],
        "correctAnswer": "The material involved in the movement"
    },
    {
        "question": "What is one way to minimize landslide risk to a property?",
        "options": [
            "Planting more trees on the slope",
            "Building a water collection basin at the top of the slope",
            "Removing all vegetation from the slope",
            "Covering the slope with a large tarp"
        ],
        "correctAnswer": "Planting more trees on the slope"
    },
    {
        "question": "Which of the following areas is least likely to experience a landslide?",
        "options": [
            "Steep mountainous areas with loose soil",
            "Flat areas with dense vegetation",
            "Areas along riverbanks",
            "Slopes where recent wildfires have occurred"
        ],
        "correctAnswer": "Flat areas with dense vegetation"
    },
    {
        "question": "What is a debris flow?",
        "options": [
            "The movement of large rocks down a slope",
            "Water flowing through a debris-filled river",
            "A fast-moving type of landslide consisting of water mixed with soil and other materials",
            "The flow of trash in urban waterways"
        ],
        "correctAnswer": "A fast-moving type of landslide consisting of water mixed with soil and other materials"
    },
    {
        "question": "What technology is used to monitor potential landslide areas?",
        "options": [
            "Seismic sensors",
            "Satellite imagery",
            "Groundwater measurement tools",
            "All of the above"
        ],
        "correctAnswer": "All of the above"
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
