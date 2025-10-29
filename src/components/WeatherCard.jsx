import { getWeatherEmoji } from "../services/weatherApi";

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const { city, temperature, windSpeed, weatherCode } = weather;
  const condition = getWeatherEmoji(weatherCode);

  return (
    <div className="bg-white/70 shadow-lg rounded-2xl p-6 w-80 text-center mt-6 mx-auto backdrop-blur">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{city}</h2>
      <p className="text-5xl mb-3">{condition}</p>
      <p className="text-lg text-gray-700">🌡️ {temperature} °C</p>
      <p className="text-lg text-gray-700">💨 {windSpeed} km/h</p>
    </div>
  );
}
