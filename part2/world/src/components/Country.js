/**
 * Display country common name and official.
 */
const Country = ({ country }) => {
    return (
        <>
            <p>{country.common} | {country.official}</p>
        </>
    )
}

/**
 * Display country object details.
 */
const CountryDetails = ({ country }) => {


    // store country object's language object
    const lang = country.languages

    // country's currencies object
    // money is an object containing objects
    const money = country.currencies

    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Official 🌐 {country.name.official}</p>
            <p>Capital 🏙️ {country.capital}</p>
            <p>Population 🫂 {country.population}</p>
            <h3> Currency: </h3>
            {
                Object.entries(money)
                .map(([key, value]) => (
                    <p key={key}>{`${value.name} 💰 ${value.symbol}`}</p>
            ))

            }

            <h3> {country.flag} Languages: </h3>
            <ul>
                {
                    Object.entries(lang)
                        .map(([key, value]) => (
                            <li key={key}>{`${value}`}</li>
                    ))

                }
            </ul>
        
            <img src={country.flags.png} alt={country.flags.alt} />
            <figcaption>{country.flags.alt}</figcaption>
           

        </>
    )
}

const CountrySelect = ({country, handleCountrySelect}) => {

    return (
        <>
            <p>{country.common} | {country.official} <button onClick={handleCountrySelect}>Show</button></p>
        </>
    )
}

export default { Country, CountryDetails, CountrySelect }