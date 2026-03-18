import { useEffect, useState } from "react";

export default function Weather() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState(null);

    const weatherText = {
        0: "Klart",

        1: "Mest klart",
        2: "Delvis molnigt",
        3: "Mulet",

        45: "Dimma",
        48: "Rimfrost-dimma",

        51: "Lätt duggregn",
        53: "Duggregn",
        55: "Kraftigt duggregn",

        56: "Lätt underkylt duggregn",
        57: "Kraftigt underkylt duggregn",

        61: "Lätt regn",
        63: "Regn",
        65: "Kraftigt regn",

        66: "Lätt underkylt regn",
        67: "Kraftigt underkylt regn",

        71: "Lätt snöfall",
        73: "Snöfall",
        75: "Kraftigt snöfall",

        77: "Snökorn",

        80: "Lätta regnskurar",
        81: "Regnskurar",
        82: "Kraftiga regnskurar",

        85: "Lätta snöbyar",
        86: "Kraftiga snöbyar",

        95: "Åskväder",

        96: "Åskväder med lätt hagel",
        99: "Åskväder med kraftigt hagel"
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