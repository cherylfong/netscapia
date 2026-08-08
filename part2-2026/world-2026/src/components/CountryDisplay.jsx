const CountryDisplay = ({ oneCountry }) => {

    const countryObject = oneCountry[0]

    const languageEntries = Object.entries(countryObject.languages || {})

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
             <img src={countryObject.flagImage} alt={countryObject.flagImage}/> 
        </>
    )
}

export default CountryDisplay