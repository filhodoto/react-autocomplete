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
}

interface AutocompleteProps {
  placeholder?: string;
}

const Autocomplete = ({ placeholder }: AutocompleteProps) => {
  const [searchVal, setSearchVal] = useState('');
  const [selected, setSelected] = useState<string>();
  const [data, setData] = useState<OptionProps[]>([]);

  // Fetch data from api and update list
  const fetchData = useCallback(async (searchVal: string = '') => {
    // Make Request to API
    try {
      // * NOTE:: If there are no results, API it returns "{error: 'There is nothing here'}"
      const response = await fetch(`${API_BASE_URL}/?name=${searchVal}`);
      const { results } = await response.json();

      // Update list data with results, or empty if there aren't any
      setData(results ?? []);

      // Update search vale so we can highlight text in list
      searchVal && setSearchVal(searchVal);
    } catch (error) {
      console.error('Something went wrong: ', error);
    }
  }, []);

  const handleSelect = (suggestionText: string) => {
    // Set the selected option
    setSelected(suggestionText);

    // Close suggestions list
    setData([]);
  };

  useEffect(() => {
    // Call data from API on page load so we can pass the data to AutoComplete component
    fetchData();
  }, [fetchData]);

  return (
    <div className="autocomplete-container">
      <SearchInput
        placeholder={placeholder}
        updateSearch={fetchData}
        selected={selected}
      />
      <SuggestionsList
        suggestions={data}
        searchVal={searchVal}
        handleClick={handleSelect}
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
