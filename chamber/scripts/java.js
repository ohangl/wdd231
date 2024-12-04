const apiKey = '4c8ce712147ea4a8c5a64ee66ad78c88';
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=San%20Juan,AR&units=metric&appid=${apiKey}`;


//clima
async function getWeather() {
    try {
        const city = 'San Juan';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},AR&units=metric&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = `
            <p><strong>Temperature:</strong> ${Math.round(data.main.temp)}°C</p>
            <p><strong>Description:</strong> ${capitalize(data.weather[0].description)}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        `;
    } catch (error) {
        document.getElementById('weather').innerHTML = `<p>Error loading weather data</p>`;
        console.error(error);
    }
}

async function loadSpotlights() {
    const spotlightContainer = document.getElementById('spotlights');
    spotlightContainer.innerHTML = `<p>Loading...</p>`;
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        const goldAndSilver = members.filter(member => member.membership === 2 || member.membership === 3);

        if (goldAndSilver.length === 0) {
            spotlightContainer.innerHTML = `<p>No spotlight members available</p>`;
            return;
        }

        const spotlights = goldAndSilver.sort(() => 0.5 - Math.random()).slice(0, 3);
        spotlightContainer.innerHTML = ''; 

        spotlights.forEach(member => {
            const card = document.createElement('div');
            card.className = 'spotlight-card';
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;
            spotlightContainer.appendChild(card);
        });
    } catch (error) {
        spotlightContainer.innerHTML = `<p>Error loading spotlight data</p>`;
        console.error(error);
    }
}


function capitalize(text) {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}


document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;


getWeather();
loadSpotlights();
