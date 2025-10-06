const form = document.getElementById('weather-form');
const input = document.getElementById('city-input');
const status = document.getElementById('status');
const card = document.getElementById('weather-card');

const locationEl = document.getElementById('location');
const localtimeEl = document.getElementById('localtime');
const iconEl = document.getElementById('icon');
const tempEl = document.getElementById('temp');
const conditionEl = document.getElementById('condition');
const detailsEl = document.getElementById('details');

const API_KEY = '96371c101f8840429f595331253006'; // 🔁 Replace with your WeatherAPI key

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return;

  status.textContent = 'Fetching weather...';
  card.style.display = 'none';

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`
    );
    if (!response.ok) throw new Error('Not found');

    const data = await response.json();
    const weather = data.current;
    const loc = data.location;

    locationEl.textContent = `${loc.name}, ${loc.country}`;
    localtimeEl.textContent = `Local Time: ${loc.localtime}`;
    iconEl.src = weather.condition.icon;
    iconEl.alt = weather.condition.text;
    tempEl.textContent = `${weather.temp_c}°C`;
    conditionEl.textContent = weather.condition.text;

    detailsEl.innerHTML = `
      <p><strong>Feels Like:</strong> ${weather.feelslike_c}°C</p>
      <p><strong>Humidity:</strong> ${weather.humidity}%</p>
      <p><strong>Wind:</strong> ${weather.wind_kph} kph ${weather.wind_dir}</p>
      <p><strong>Cloud Cover:</strong> ${weather.cloud}%</p>
    `;

    card.style.display = 'block';
    status.textContent = '';
  } catch (err) {
    status.textContent = 'Weather data not found.';
    card.style.display = 'none';
  }
});
