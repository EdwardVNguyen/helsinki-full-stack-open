import { useState, useEffect } from 'react'
import axios from 'axios'

// goal, give list of countries that contain substring
// if more than 10 countries, then output too many matches

function App() {
  const [searchedCountry, setSearchedCountry] = useState('')
  const [listOfCountries, setListOfCountries] = useState([])

  const handleSetSearchedCountryName = (event) => {
    setSearchedCountry(event.target.value)
  }

  useEffect( () => {
    if (searchedCountry !== '') {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          // filter out countries based off of substring input that user gives and update state for listOfCountries
          const arrayOfCountries = response.data
          const filteredCountries = arrayOfCountries.filter( country => {
            const countryName = country.name.common.toLowerCase()
            return countryName.includes(searchedCountry.toLowerCase())
          })
          const listOfCountryNames = filteredCountries.map(country => country.name.common)
          setListOfCountries(listOfCountryNames)
        })
        .catch(error => {
          console.log(error)
        })
    }

  }, [searchedCountry])

  return (
    <div>
      <h1> Find Countries </h1> 
      <input value={searchedCountry} onChange={handleSetSearchedCountryName}/>
      {
        (listOfCountries.length > 10)
          ? <div> Too many matches, specify another filter</div>
          : <ul>
              {
                // index is not a good solution, but good enough in this circumstance since listOfCountries is newly created each time its updated
                listOfCountries.map( (country, index) => 
                  <li key={index}>
                    {country}
                  </li>
                )
              }
            </ul>
      }
    </div>
  )
}

export default App
