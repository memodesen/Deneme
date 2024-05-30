// Fetch flood data from an API
function fetchFloods() {
    const apiUrl = 'https://api.example.com/floods?country=Turkey&format=json';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayFloods(data); // Call to display function
        })
        .catch(error => console.error('Error fetching flood data:', error));
}

// Display flood data in the HTML container
function displayFloods(data) {
    const container = document.getElementById('floodContainer');
    container.innerHTML = ''; // Clear previous entries

    data.floods.forEach(flood => {
        const severity = flood.severity;
        const location = flood.location;
        const date = new Date(flood.date);

        const floodElem = document.createElement('div');
        floodElem.className = 'flood';
        floodElem.innerHTML = `
            <strong>Severity:</strong> ${severity} <br>
            <strong>Location:</strong> ${location} <br>
            <strong>Date:</strong> ${date.toLocaleString()}
        `;
        container.appendChild(floodElem);
    });
}

// Event listener to load data when the document is ready
document.addEventListener('DOMContentLoaded', fetchFloods);
