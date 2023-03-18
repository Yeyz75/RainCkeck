import React, { useState } from 'react';
import { searchCities } from '../services/weather.js';
import '../styles/LocationSearch.css';

function LocationSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí podrías llamar a una función que busque la ubicación en la API
        // y envíe los resultados a otros componentes para su visualización
    };

    const handleInputChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 2) {
            try {
                const results = await searchCities(query);
                setSearchResults(results);
            } catch (error) {
                console.error(error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div className="LocationSearch">
            <form onSubmit={handleSubmit}>
                <label htmlFor="location-search">Buscar ubicación:</label>
                <input
                    id="location-search"
                    type="text"
                    placeholder="Escribe el nombre de una ciudad o código postal"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button type="submit">Buscar</button>
            </form>
            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map((result) => (
                        <li key={result.id}>
                            {result.name}, {result.country}
                        </li>
                    ))}
                </ul>

            )}
        </div>
    );
}

export default LocationSearch;
