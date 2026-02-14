// allows user to filter through names
const Filter = ( {filterPerson, setFilterPerson} ) => {
  const handleFilterPerson = (event) => {
    setFilterPerson(event.target.value)
  }

  return (
   <div>
      Filter shown with <input value={filterPerson} onChange={handleFilterPerson}/>
    </div> 
  )
}

export default Filter
