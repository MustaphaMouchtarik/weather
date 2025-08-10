// script.js

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("city").value.trim();
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  try {
    // Step 1: Get coordinates from city name
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found!");
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Step 2: Get weather data
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    const temp = weatherData.current_weather.temperature;
    const wind = weatherData.current_weather.windspeed;

    document.getElementById("location").textContent = `${name}, ${country}`;
    document.getElementById("temp").textContent = `${temp}°C`;
    document.getElementById(
      "description"
    ).textContent = `Wind: ${wind} km/h`;

    document.getElementById("weatherResult").classList.remove("hidden");
  } catch (error) {
    alert("Error fetching weather data");
  }
}
