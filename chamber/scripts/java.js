const apiKey = '4c8ce712147ea4a8c5a64ee66ad78c88';
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=San%20Juan,AR&units=metric&appid=${apiKey}`;


//clima
async function getWeather() {
    try {
        const city = 'San Juan';
        const responseCurrent = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},AR&units=metric&appid=${apiKey}`);
        const responseForecast = await fetch(weatherUrl);

        if (!responseCurrent.ok || !responseForecast.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const dataCurrent = await responseCurrent.json();
        const dataForecast = await responseForecast.json();

        const currentDiv = document.getElementById('weather-current');
        const forecastDiv = document.getElementById('weather-forecast');

        currentDiv.innerHTML = `
            <p><strong>Temperature:</strong> ${Math.round(dataCurrent.main.temp)}°C</p>
            <p><strong>Description:</strong> ${capitalize(dataCurrent.weather[0].description)}</p>
            <p><strong>Humidity:</strong> ${dataCurrent.main.humidity}%</p>
        `;

        
        const forecastDays = {};
        dataForecast.list.forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            if (!forecastDays[date]) forecastDays[date] = [];
            forecastDays[date].push(item);
        });

        const days = Object.keys(forecastDays).slice(1, 4); // omitir hoy

        forecastDiv.innerHTML = days.map(date => {
            const temps = forecastDays[date].map(d => d.main.temp);
            const avgTemp = Math.round(temps.reduce((a, b) => a + b) / temps.length);
            const desc = capitalize(forecastDays[date][0].weather[0].description);
            return `<p><strong>${date}:</strong> ${avgTemp}°C – ${desc}</p>`;
        }).join("");
    } catch (error) {
        document.getElementById('weather-current').innerHTML = `<p>Error loading weather</p>`;
        document.getElementById('weather-forecast').innerHTML = `<p>Error loading forecast</p>`;
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



document.querySelectorAll('.open-modal').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const modalId = e.target.dataset.modal;
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
    });
});

document.querySelectorAll('.close-modal').forEach((btn) => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        modal.classList.remove('active');
    });
});



getWeather();
loadSpotlights();
