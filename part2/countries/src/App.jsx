import { useState, useEffect } from 'react'
import axios from 'axios'

// goal, give list of countries that contain substring
// if more than 10 countries, then output too many matches

function App() {
  const [searchedCountry, setSearchedCountry] = useState('')
  const [listOfCountries, setListOfCountries] = useState([])
  const [singleCountryObj, setSingleCountryObj] = useState(null)

  const handleSetSearchedCountryName = (event) => {
    setSearchedCountry(event.target.value)
  }

  const handleShowCountry = (country) => {
    setSearchedCountry(country)
  }

  // useEffect reruns axios request to get list of countries when there is a change to the input
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

  // useEffect reruns axios request to get data of specific country according to change in listOfCountries
  useEffect( () => {
    if (listOfCountries.length === 1) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${listOfCountries.at(0)}`)
        .then(response => {
          const specifiedCountry = response.data
          setSingleCountryObj({...specifiedCountry})
        })
        .catch(error => console.log(error))
    }
  }, [listOfCountries])

  return (
    <div>
      <h1> Find Countries </h1> 
      <input value={searchedCountry} onChange={handleSetSearchedCountryName}/>
      {
        // if list of countries is 1, show full info on that country, else if list of countries is at least less than 10, then show those list of county names, else output to the user that there are too many matches
        (listOfCountries.length === 1 && singleCountryObj !== null) // tricky, have to do conditional rendering so that axios gets info before render
          ?
            <article>
              <h1>{singleCountryObj.name.common}</h1>
              <p>Capital: {singleCountryObj.capital}</p>
              <p>Area: {singleCountryObj.area}</p>
              <h2>Languages</h2>
              <ul>
                {
                  // https://stackoverflow.com/questions/40950546/react-js-right-way-to-iterate-over-object-instead-of-object-entries
                  // iterate over each value and append to list
                  Object.entries(singleCountryObj.languages).map(([key,value]) => 
                    <li key={crypto.randomUUID()}>{value}</li>
                  ) 
                }
              </ul>
              <div>{singleCountryObj.flag}</div>
              <h2>Weather for {singleCountryObj.capital}</h2>
            </article>   
          : (listOfCountries.length > 10)
            ? <p> Too many matches, specify another filter</p>
            : <ul>
                {
                  // use crypto library to create unique ids 
                  listOfCountries.map( country => 
                    <li key={crypto.randomUUID()}>
                      {country} <button onClick={ () => handleShowCountry(country) }>Show</button>
                    </li>
                  )
                }
              </ul>
      }
    </div>
  )
}

export default App
