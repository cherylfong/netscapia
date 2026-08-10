const CountryListItem = ({ country, toggleShow }) => {
    return <p className='code'>{country} <button onClick={toggleShow}>show</button> </p>
}

export default CountryListItem