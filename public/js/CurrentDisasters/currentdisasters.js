
document.addEventListener("DOMContentLoaded", function() {
    var bubble = document.querySelector(".bubble"); 

    bubble.addEventListener("click", function() {
        window.location.href = "donation";
    });

});

document.addEventListener("DOMContentLoaded", function() {
    var bubble = document.querySelector(".bubble-2"); 
  
    bubble.addEventListener("click", function() {
        window.location.href = "education";
    });
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


let localStream = null;
let peerConnection = null;



document.getElementById('shareLocation').addEventListener('click', function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        const { latitude, longitude } = position.coords;
        fetch('/api/add-location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${data.address}</td><td><button onclick="deleteLocation(${data.id})">Delete</button></td>`;
                document.querySelector('#locationsTable tbody').appendChild(row);
            } else {
                alert('Failed to add location');
            }
        });
    }, function(error) {
        alert('Error getting location: ' + error.message);
    });
});


function deleteLocation(locationId) {
    fetch(`/api/delete-location/${locationId}`, {
        method: 'DELETE',
        credentials: 'include' // Ensure cookies, such as session cookies, are sent with the request
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.querySelector(`button[onclick="deleteLocation('${locationId}')"]`).parentNode.parentNode.remove();
        } else {
            alert('Failed to delete location');
        }
    })
    .catch(error => console.error('Error deleting location:', error));
}


let recognition;
let isRecording = false;

function startDictation(locationId) {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Speech recognition is not supported in this browser. Please use Google Chrome.');
        return;
    }
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;  // Allows the recording to continue until stopped
    recognition.interimResults = false;  // We only want final results
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        isRecording = true;
        console.log('Voice recording started...');
    };

    recognition.onresult = function(event) {
        const transcript = event.results[event.results.length - 1][0].transcript;
        document.getElementById('transcription' + locationId).value += transcript;
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error', event);
    };

    recognition.onend = function() {
        isRecording = false;
        console.log('Voice recording stopped.');
    };

    recognition.start();
}

function stopDictation(locationId) {
    if (recognition && isRecording) {
        recognition.stop();
        isRecording = false;
    }
}

function submitComment(event, locationId) {
    event.preventDefault();
    const form = document.getElementById('voiceForm' + locationId);
    const comment = document.getElementById('transcription' + locationId).value;
    // Assuming you have a route set up to handle the comment submission
    fetch('/api/add-comment/' + locationId, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: comment })
    })
    .then(response => response.json())
    .then(data => {
        alert('Comment submitted successfully!');
        form.reset();  // Reset the form after successful submission
    })
    .catch(error => {
        console.error('Failed to submit comment', error);
        alert('Failed to submit comment.');
    });
}