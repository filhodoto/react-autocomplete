import { useState, useEffect, useCallback } from 'react';
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

  // Fetch data from api and update list
  const fetchData = useCallback(async () => {
    console.log('Fetch data with value = ', searchVal);
    // Make Request to API
    try {
      // * NOTE:: If there are no results, API it returns "{error: 'There is nothing here'}"
      const response = await fetch(`${API_BASE_URL}/?name=${searchVal}`);
      const { results } = await response.json();

      // Update list data with results, or empty if there aren't any
      setData(results ?? []);

      // Update search vale so we can highlight text in list
      searchVal && setSearchVal(searchVal);

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
