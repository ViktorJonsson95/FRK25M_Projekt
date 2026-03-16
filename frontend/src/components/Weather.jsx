import { useEffect, useState } from "react";

export default function Weather() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
            const weatherData = await weatherRes.json();

            const cityRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
            const cityData = await cityRes.json();

            const cityName =
                cityData.address.city ||
                cityData.address.town ||
                cityData.address.village ||
                cityData.address.municipality;

            setCity(cityName ?? "Din position");
            setWeather(weatherData.current_weather);
        });
    }, []);

    if (!weather) return <p>Loading weather...</p>;

    return (
        <div className="weather">
            <p>{city}</p>
            <p>Temperatur: {weather.temperature}°C</p>
            <p>Vindhastighet: {weather.windspeed} km/h</p>
        </div>
    );
}