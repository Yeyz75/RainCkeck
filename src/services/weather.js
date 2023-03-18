const API_KEY = 'edf3e9fde17c444f747f1fb40c31a83d';

export async function searchCities(query) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    if (Array.isArray(data)) {
        return data.map((city) => {
            return {
                id: city.name + ', ' + city.country,
                name: city.name,
                country: city.country,
                lat: city.lat,
                lon: city.lon,
            };
        });
    } else {
        throw new Error('La respuesta de la API no es un arreglo');
    }
}

