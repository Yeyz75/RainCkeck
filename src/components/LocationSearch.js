import "../styles/LocationSearch.css";
import React, { useState } from "react";
import { getWeatherByCity } from "../services/weather";

function LocationSearch() {
    const [city, setCity] = useState("");
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [isRaining, setIsRaining] = useState(null);

    const handleSearch = async () => {
        const data = await getWeatherByCity(city);

        // Extraer los valores de temperatura, humedad y lluvia (si está lloviendo)
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const isRaining = !!data.rain?.["1h"]; // Verifica si el campo rain.1h existe y es diferente de null

        // Actualizar el estado de la aplicación
        setTemperature(temperature);
        setHumidity(humidity);
        setIsRaining(isRaining);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Introduce el nombre de la ciudad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>

            {temperature !== null && (
                <div>
                    <p>Temperatura: {temperature} K</p>
                    <p>Humedad: {humidity}%</p>
                    <p>Está lloviendo: {isRaining ? "Sí" : "No"}</p>
                </div>
            )}
        </div>
    );
}

export default LocationSearch;
