import CountryListItem from './CountryListItem'
import CountryDisplay from './CountryDisplay'

const Countries = ({ result, toggleShow, weather}) => {
    console.log('Result is', result)
    if (result) {
        if (result.length > 10) {

            console.log(`Number of countries: ${result.length}`)
            return (
                <p>Too many matches, specify another filter...</p>
            )
        }
        else if (result.length == 0) {
            return (<p>NO RESULTS</p>)

        }
        else if (result.length == 1) {
            console.log(`RESULT IS`, result)
            return (
                <CountryDisplay oneCountry={result} weather={weather} />
            )
        }
        else {
            console.log(`${result.length} is less than 10`)
            return (
                <>
                    {result.map(c => (
                        <CountryListItem
                            toggleShow={() => toggleShow(c.name)}
                            key={c.id}
                            country={c.name} />
                    ))}
                </>
            )
        }

    }
}

export default Countries