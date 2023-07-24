/**
 * Displays a country's capital's weather.
 * 
 * weather is a js object
 */
const iconURL = 'https://openweathermap.org/img/wn/'

const Weather = ({weather}) => {

    //weather object's weather attribute is an array of objects
    const details = weather.weather

    return(
        <>
            <h2>Weather in {weather.name}</h2>

            <p>Temperature: {((weather.main.temp)- 273.15).toFixed(2)} C</p>

            <img src={iconURL.concat(details[0].icon,"@2x.png")}></img>

            <p>{details[0].description}</p>

            <p>Wind speed is {weather.wind.speed} m/s</p>

        </>
    )
}
export default Weather