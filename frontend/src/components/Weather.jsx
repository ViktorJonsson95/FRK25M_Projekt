import { useEffect, useState } from "react";

export default function Weather() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState(null);

    const weatherText = {
        0: "Clear",

        1: "Mostly clear",
        2: "Partly cloudy",
        3: "Overcast",

        45: "Fog",
        48: "Rime fog",

        51: "Light drizzle",
        53: "Drizzle",
        55: "Heavy drizzle",

        56: "Light freezing drizzle",
        57: "Heavy freezing drizzle",

        61: "Light rain",
        63: "Rain",
        65: "Heavy rain",

        66: "Light freezing rain",
        67: "Heavy freezing rain",

        71: "Light snowfall",
        73: "Snowfall",
        75: "Heavy snowfall",

        77: "Snow grains",

        80: "Light rain showers",
        81: "Rain showers",
        82: "Heavy rain showers",

        85: "Light snow showers",
        86: "Heavy snow showers",

        95: "Thunderstorm",

        96: "Thunderstorm with light hail",
        99: "Thunderstorm with heavy hail"
    };

    const fetchWeather = async (lat, lon) => {
        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,windspeed_10m,cloudcover,precipitation,weathercode`
        );
        const weatherData = await weatherRes.json();

        const cityRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );
        const cityData = await cityRes.json();

        const cityName =
            cityData.address?.city ||
            cityData.address?.town ||
            cityData.address?.village ||
            cityData.address?.municipality ||
            "Malmö";

        setCity(cityName);
        setWeather(weatherData.current);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeather(lat, lon);
            },
            () => {
                // fallback till malmö om användaren nekar plats
                fetchWeather(55.6050, 13.0038);
            }
        );
    }, []);

    if (!weather) return <p>Loading weather...</p>;

    return (
        <div className="weather">
            <p>{city}</p>
            <p>{weatherText[weather.weathercode]}</p>
            <p>Temperature: {weather.temperature_2m}°C</p>
            <p>Wind Speed: {weather.windspeed_10m} km/h</p>
            <p>Rainfall: {weather.precipitation} mm</p>
        </div>
    );
}