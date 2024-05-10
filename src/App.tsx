import { useEffect, useState } from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete';

// Using Rick and Morty free public API. See more here: https://rickandmortyapi.com/
const API_BASE_URL = 'https://rickandmortyapi.com/api/character/?name=rick';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        // NOTE:: API will always return an array, if there are no results it returns empty array
        const response = await fetch(API_BASE_URL);
        const { results } = await response.json();

        // Format result to only get the data we want in autocomplete
        const formatted = results.map(
          ({ name, id }: { name: string; id: string }) => {
            return { id, value: name };
          }
        );

        setData(formatted);
      } catch (error) {
        console.error('Something went wrong: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>React Autocomplete Component</h1>
      {/* Only render Autocomplete when we have data to search */}
      {data.length > 0 && (
        <Autocomplete placeholder={'search...'} options={data} />
      )}
    </>
  );
}

export default App;
