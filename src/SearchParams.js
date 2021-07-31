import { useState, useEffect, useContext } from 'react';
import ThemeContext from './ThemeContext'
import useBreedList from './useBreedList';
import Results from "./results";
// eslint-disable-next-line no-unused-vars
import Pet from "./pet"

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"]

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    requestPets();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
    const json = await res.json();
    setPets(json.pets);
  }
 

  return (

    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input id="location" onChange={e => setLocation(e.target.value)} value={location} placeholder="Location" />
        </label>

        <label htmlFor="animal">
            Animal
            <select
              id="animal"
              value={animal}
              onChange={(e) => setAnimal(e.target.value)}
              onBlur={(e) => setAnimal(e.target.value)}
            >
              <option />
              {ANIMALS.map((animal) => (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              ))}
            </select>
          </label>


        <label htmlFor="breed">
            Breed
            <select
              id="breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              onBlur={(e) => setBreed(e.target.value)}
            >
              <option />
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
         </label>
        <button style= { { backgroundColor: theme}}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  )
};

export default SearchParams;