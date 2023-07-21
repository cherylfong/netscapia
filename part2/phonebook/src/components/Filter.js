/**
 * Filter component has, 
 * 
 * Input to search for name
 * Input changes list of names shown dynamically
 * 
 * case insensitive search!
 */
import Person from "./Person"

const Filter = ({newSearch, setNewSearch, persons}) => {


    const handleNameSearch = (event) => {

        const valueLowered = (event.target.value).toLowerCase()

        setNewSearch(valueLowered)
        console.log('Triggered event source value: ', event.target.value)
        console.log('new search value', newSearch)
    }

    // convert names to lowercase to match lowercase search term
    // get results as an array
    // return the array containing matched elements
    const filterByName = persons.filter(
        person => {
            person = person.name.toLowerCase();
            return person.includes(newSearch)
        }
    )

    return(
        <>
            <form>
                <label>Filter by name: </label>
                <input value={newSearch} onChange={handleNameSearch}/>
            </form>
            <h3>Results:</h3>
            {filterByName.map( (person,i) =>
                <Person.Person key={i} person={person}/>
            )}
        </>
    )
}


export default Filter