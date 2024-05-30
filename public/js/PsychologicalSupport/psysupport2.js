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
