document.addEventListener("DOMContentLoaded", function() {
    var bubble = document.querySelector(".bubble"); 

    bubble.addEventListener("click", function() {
        window.location.href = "Homepage";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var bubble = document.querySelector(".bubble-2"); 
  
    bubble.addEventListener("click", function() {
        window.location.href = "currentdisasters";
    });
  });


  document.getElementById('searchBox').addEventListener('keypress', function(event) {
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
            body: JSON.stringify({ message: message })
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


