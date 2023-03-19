const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Reemplazar con tu propia API key

export async function getWeatherData(city, country) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const weatherData = await response.json();
        console.log(weatherData)
        return {
            name: weatherData.name,
            country: weatherData.sys.country,
            temperature: weatherData.main.temp,
            temp_min: weatherData.main.temp_min,
            temp_max: weatherData.main.temp_max,
            pressure: weatherData.main.pressure,
            sea_level: weatherData.main.sea_level,
            description: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

