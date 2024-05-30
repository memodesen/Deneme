


// Fetch earthquake data from the USGS API
function fetchEarthquakes() {
    const apiUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=38.9637&longitude=35.2433&maxradiuskm=500';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayEarthquakes(data); // Call to display function
        })
        .catch(error => console.error('Error fetching earthquake data:', error));
}

// Display earthquake data in the HTML container
function displayEarthquakes(data) {
    const container = document.getElementById('earthquakeContainer');
    container.innerHTML = ''; // Clear previous entries

    data.features.forEach(earthquake => {
        const magnitude = earthquake.properties.mag;
        const place = earthquake.properties.place;
        const time = new Date(earthquake.properties.time);

        const earthquakeElem = document.createElement('div');
        earthquakeElem.className = 'earthquake';
        earthquakeElem.innerHTML = `
            <strong>Magnitude:</strong> ${magnitude} <br>
            <strong>Location:</strong> ${place} <br>
            <strong>Time:</strong> ${time.toLocaleString()}
        `;
        container.appendChild(earthquakeElem);
    });
}

// Event listener to load data when the document is ready
document.addEventListener('DOMContentLoaded', fetchEarthquakes);
