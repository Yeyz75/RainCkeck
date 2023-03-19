import React, { useState, useEffect } from 'react';
import '../styles/LocationSearch.css';
import { getWeatherData } from '../services/weather';

function LocationSearch() {
    const [city, setCity] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [suggestedCountries, setSuggestedCountries] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (city.length > 0) {
            fetch(`https://restcountries.com/v2/name/${city}`)
                .then(response => response.json())
                .then(data => {
                    const countries = data.map(country => country.name);
                    setSuggestedCountries(countries);
                })
                .catch(error => console.error(error));
        } else {
            setSuggestedCountries([]);
        }
    }, [city]);

    function handleCityChange(event) {
        setCity(event.target.value);
    }

    function handleCountryClick(country) {
        setSelectedCountry(country);
        setCity(country);
        setSuggestedCountries([]);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setWeatherData(null);
        try {
            const data = await getWeatherData(city, selectedCountry);
            setWeatherData(data);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="city-input">Pais:</label>
                <input
                    id="city-input"
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                />
                {suggestedCountries.length > 0 && (
                    <ul>
                        {suggestedCountries.map(country => (
                            <li key={country} onClick={() => handleCountryClick(country)}>
                                {country}
                            </li>
                        ))}
                    </ul>
                )}
                <button type="submit" disabled={!selectedCountry}>
                    Obtener datos meteorológicos
                </button>
            </form>
            {error && <div className="error">{error}</div>}
            {weatherData && (
                <div className="weather-data">
                    <p>Temperatura actual: {weatherData.temperature}°C</p>
                    <p>Temperatura mínima: {weatherData.temp_min}°C</p>
                    <p>Temperatura máxima: {weatherData.temp_max}°C</p>
                    <p>Presión: {weatherData.pressure} hPa</p>
                    <p>Nivel del mar: {weatherData.sea_level} m</p>
                    <p>Descripción: {weatherData.description}</p>
                    <img src={`http://openweathermap.org/img/w/${weatherData.icon}.png`} alt="Weather icon" />
                </div>
            )}
        </div>
    );
}
export default LocationSearch;