import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { getWeather } from "./services/weatherApi";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError("❌ City not found. Try again!");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center min-h-screen text-gray-800">
      <header className="mt-10">
        <h1 className="text-4xl font-bold text-blue-700">🌤️ Weather Now</h1>
        <p className="mt-2 text-lg text-gray-700 max-w-lg">
          Hi Jamie! Ready to check the weather for your next outdoor adventure?
        </p>
      </header>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="mt-6 text-gray-600">Loading...</p>}
      {error && <p className="mt-6 text-red-600">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}
