const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export async function getWeatherByCity(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}





