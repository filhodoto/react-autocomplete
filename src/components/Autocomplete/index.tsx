import { useState, useEffect, useCallback, useRef } from 'react';
import './styles.css';
import SuggestionsList from '../SuggestionsList';
import SearchInput from '../SearchInput';

// Using Rick and Morty free public API.
// See more here: https://rickandmortyapi.com/
const API_BASE_URL = 'https://rickandmortyapi.com/api/character';
export interface OptionProps {
  id: number;
  name: string;
  origin: { name: string };
}

interface AutocompleteProps {
  placeholder?: string;
}

const Autocomplete = ({ placeholder }: AutocompleteProps) => {
  const [searchVal, setSearchVal] = useState('');
  const [selected, setSelected] = useState<string>();
  const [data, setData] = useState<OptionProps[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  // Setup a useRef to use as cache between re-renders
  const cacheRef = useRef<{ [key: string]: OptionProps[] }>({});

  // Fetch data from api and update list
  const fetchData = useCallback(async () => {
    // Check if we have this search saved in cache
    if (cacheRef.current[searchVal]) {
      // return cached value and prevent an unnecessary request
      setData(cacheRef.current[searchVal]);
      return;
    }

    // Make Request to API
    try {
      // * NOTE:: If there are no results, API it returns "{error: 'There is nothing here'}"
      const response = await fetch(`${API_BASE_URL}/?name=${searchVal}`);
      const { results } = await response.json();

      // Update list data with results, or empty if there aren't any
      const fetchedData = results ?? [];

      // Update state
      setData(fetchedData);

      // Store the fetched data in the cache
      cacheRef.current[searchVal] = fetchedData;

      // Reset the active suggestion index when data changes
      setActiveSuggestionIndex(0);
    } catch (error) {
      console.error('Something went wrong: ', error);
    }
  }, [searchVal]);

  const handleSelect = (suggestionText: string) => {
    // Set the selected option
    setSelected(suggestionText);

    // Close suggestions list
    setData([]);
  };

  useEffect(() => {
    // Fetch data only if there is a value to search
    searchVal && fetchData();
  }, [searchVal, fetchData]);

  return (
    <div className="autocomplete-container">
      <SearchInput
        placeholder={placeholder}
        setSearchVal={setSearchVal}
        selected={selected}
        setActiveSuggestionIndex={setActiveSuggestionIndex}
        activeSuggestionIndex={activeSuggestionIndex}
        suggestionsCount={data.length}
      />
      <SuggestionsList
        suggestions={data}
        searchVal={searchVal}
        handleClick={handleSelect}
        activeSuggestionIndex={activeSuggestionIndex}
      />

      {/* Give user feedback if there is no match to its search */}
      {data.length === 0 && searchVal && !selected && (
        <span id="no-results" className="no-results">
          No results found.
        </span>
      )}
    </div>
  );
};

export default Autocomplete;
