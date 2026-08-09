const CountryDisplay = ({ oneCountry, weather }) => {

    const countryObject = oneCountry[0]

    const languageEntries = Object.entries(countryObject.languages || {})

    const weatherImgUrl = `https://openweathermap.org/payload/api/media/file/${weather.icon}.png`

    const weatherCelsius = Number(weather.temp - 273.15).toFixed(2)  

    return (
        <>
            <h2>{countryObject.flag} {countryObject.name}</h2>
            <p>Capital: {countryObject.capital?.[0] ?? 'N/A'}</p>
            <p>Area: {countryObject.area}</p>
            <h3>Languages</h3>
            <ul>
                {languageEntries.map(([code, language]) => (
                    <li key={code}>{language}</li>
                ))}
            </ul>
            <img src={countryObject.flagImage} alt={countryObject.flagImage} />
            <h3>Weather in {countryObject.capital}</h3>
            <p>Temperature {weatherCelsius} Celsius</p>
            <img src={weatherImgUrl} alt={weatherImgUrl} />
            <p>Wind {weather.wind} m/s</p>
        </>
    )
}

export default CountryDisplay