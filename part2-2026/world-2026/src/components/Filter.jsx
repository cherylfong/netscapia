const Filter = ({newFilter, handleFilterChange, onSearch}) => {

    return(
        <form onSubmit={onSearch}>
            Search for countries <input value={newFilter} onChange={handleFilterChange}/>
        </form>
    )
}

export default Filter