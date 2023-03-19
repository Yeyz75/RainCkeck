import React, { useState, useEffect } from 'react';
import { getWeatherData } from '../services/weather';

function LocationSearch() {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [suggestedCountries, setSuggestedCountries] = useState([]);

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

    function handleCountrySelect(selectedCountry) {
        setCountry(selectedCountry);
        setSuggestedCountries([]);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const weatherData = await getWeatherData(city, country);

        console.log(weatherData);

        // Do something with the weather data, like update the UI
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="city-input">City:</label>
            <input
                id="city-input"
                type="text"
                value={city}
                onChange={handleCityChange}
            />
            {suggestedCountries.length > 0 && (
                <ul>
                    {suggestedCountries.map(country => (
                        <li key={country} onClick={() => handleCountrySelect(country)}>
                            {country}
                        </li>
                    ))}
                </ul>
            )}
            <button type="submit" disabled={!country}>
                Get weather data
            </button>
        </form>
    );
}

export default LocationSearch;
