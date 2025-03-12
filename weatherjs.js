const apiKey = '978e5c21975942ccb8ff4776d4cdf139';

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            document.getElementById("weather-result").innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${Math.round(data.main.temp)}°C</p>
                <p>Condition: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        } else {
            document.getElementById("weather-result").innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        document.getElementById("weather-result").innerHTML = `<p>Unable to fetch weather data.</p>`;
    }
}

function getWeatherByCity() {
    const city = document.getElementById("city-input").value;
    if (city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        fetchWeather(url);
    }
}

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
            fetchWeather(url);
        }, () => {
            document.getElementById("weather-result").innerHTML = "<p>Location access denied.</p>";
        });
    } else {
        document.getElementById("weather-result").innerHTML = "<p>Geolocation not supported.</p>";
    }
}
