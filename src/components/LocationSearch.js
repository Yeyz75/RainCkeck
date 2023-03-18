import React, { useState } from 'react';
import '../styles/LocationSearch.css';

function LocationSearch() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí podrías llamar a una función que busque la ubicación en la API
        // y envíe los resultados a otros componentes para su visualización
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>
        </div>
    );
}

export default LocationSearch;
