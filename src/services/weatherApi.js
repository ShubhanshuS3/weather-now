export async function getWeather(city) {
  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    return {
      city: `${name}, ${country}`,
      temperature: weatherData.current_weather.temperature,
      windSpeed: weatherData.current_weather.windspeed,
      weatherCode: weatherData.current_weather.weathercode,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function getWeatherEmoji(code) {
  if ([0].includes(code)) return "☀️ Clear";
  if ([1, 2, 3].includes(code)) return "⛅ Partly Cloudy";
  if ([45, 48].includes(code)) return "🌫️ Fog";
  if ([51, 53, 55].includes(code)) return "🌦️ Drizzle";
  if ([61, 63, 65].includes(code)) return "🌧️ Rain";
  if ([71, 73, 75].includes(code)) return "❄️ Snow";
  if ([95, 96, 99].includes(code)) return "⛈️ Thunderstorm";
  return "🌍 Unknown";
}
