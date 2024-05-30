document.addEventListener("DOMContentLoaded", function() {
    var bubble = document.querySelector(".bubble"); 

    bubble.addEventListener("click", function() {
        window.location.href = "supportgroups";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var bubble = document.querySelector(".bubble-2"); 
  
    bubble.addEventListener("click", function() {
        window.location.href = "Homepage";
    });
  });


  document.getElementById('searchBox').addEventListener('keypress', function(event) {
    const checkRelevance = document.getElementById('relevanceToggle').checked;
    console.log(checkRelevance);
    if (event.key === 'Enter') {
        event.preventDefault();  
        const message = this.value;
        this.value = ''; 
        displayMessage(`You: ${message}`, 'user');

        hideHeader(); 

        fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message ,checkRelevance:checkRelevance})
        })
        .then(response => response.json())
        .then(data => {
            displayMessage(`DisasterPal: ${data.message}`, 'bot');
        })
        .catch(error => console.error('Error:', error));
    }
});

function displayMessage(text, sender) {
    const main = document.querySelector('.main'); 
    const messageDiv = document.createElement('div');
    messageDiv.textContent = text;
    messageDiv.className = 'message ' + sender; 
    main.appendChild(messageDiv);
    main.scrollTop = main.scrollHeight; 
}

function hideHeader() {
    const header = document.querySelector('.headerr'); 
    if (header) {
        header.style.display = 'none';
    }
}



function hideHeader() {
    const header = document.querySelector('.headerr');
    header.style.display = 'none'; 
}

let recognition;
let isRecording = false;

function startDictation() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Speech recognition is not supported in this browser. Please use Google Chrome.');
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true; // Continue capturing until explicitly stopped
    recognition.interimResults = true; // Get results immediately, not just at the end
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        isRecording = true;
        document.getElementById('transcript').placeholder = "Listening...";
        document.getElementById('searchBox').placeholder = "Listening...";
    };

    recognition.onresult = function(event) {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
        }
        document.getElementById('transcript').value = transcript;
        document.getElementById('searchBox').value = transcript;
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error', event);
    };

    recognition.onend = function() {
        isRecording = false;
        document.getElementById('transcript').placeholder = "Press 'Start' to continue...";
        document.getElementById('searchBox').placeholder = "Message DisasterPal";
    };

    recognition.start();
}

function stopDictation() {
    if (recognition && isRecording) {
        recognition.stop();
        isRecording = false;
    }
}


function submitForm() {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the form inputs
    const age = document.getElementById('age').value;
    const healthIssues = document.getElementById('healthIssues').value;
    const disasterSituation = document.getElementById('disasterSituation').value;
    const personalDetails = document.getElementById('personalDetails').value;

    // Construct the message string
    const message = `Hi, I am ${age} years old. I have problems with ${healthIssues}. I'm suffering from ${disasterSituation}. ${personalDetails}`;

    // Set the message string to the searchBox input field
    document.getElementById('searchBox').value = message;

    // Prepare the data for sending to the server
    const data = {
        age: age,
        healthIssues: healthIssues,
        disasterSituation: disasterSituation,
        personalDetails: personalDetails,
        message: message // Including the constructed message in the data sent to the server
    };


    // Optional: Clear the form after submission
    document.getElementById('disasterForm').reset();
}

