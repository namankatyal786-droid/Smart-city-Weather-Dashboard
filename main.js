const API_KEY = "41fa3f1392dbb6a0cc306376c44b5443";
let currentCity = "Pune";

async function fetchWeather(city = currentCity) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!res.ok) throw new Error("City not found");
        const data = await res.json();
        currentCity = city;
        displayWeather(data);
    } catch (error) {
        alert("Error: " + error.message);
    }
}

function displayWeather(data) {

    document.getElementById("cityName").innerText = `📍 ${data.name}, ${data.sys.country}`;
    document.getElementById("temp").innerText = `${data.main.temp}°`;
    document.getElementById("condition").innerText = data.weather[0].main;

    document.getElementById("time").innerText =
        new Date().toLocaleString();

    document.getElementById("status").innerText =
        data.weather[0].description;

    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const visibility = data.visibility / 1000;
    const wind = data.wind.speed;

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    document.getElementById("weatherContainer").innerHTML = `
        <div class="card"><h4>Humidity</h4><p>${humidity}%</p></div>
        <div class="card"><h4>Wind</h4><p>${wind} m/s</p></div>
        <div class="card"><h4>Pressure</h4><p>${pressure} hPa</p></div>
        <div class="card"><h4>Visibility</h4><p>${visibility} km</p></div>
        <div class="card"><h4>Sunrise</h4><p>${sunrise}</p></div>
        <div class="card"><h4>Sunset</h4><p>${sunset}</p></div>
    `;
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    updateThemeButton();
}

function updateThemeButton() {
    const btn = document.getElementById("themeToggle");
    btn.innerText = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
    updateThemeButton();
}

window.onload = function() {
    loadTheme();
    fetchWeather();
    

    document.getElementById("searchBtn").addEventListener("click", function() {
        const city = document.getElementById("cityInput").value.trim();
        if (city) {
            fetchWeather(city);
            document.getElementById("cityInput").value = "";
        }
    });
    
    document.getElementById("cityInput").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            document.getElementById("searchBtn").click();
        }
    });
    
    document.getElementById("themeToggle").addEventListener("click", toggleTheme);
};