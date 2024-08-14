import { useState, useRef } from 'react';
import './styles.css'; // Import stylesheet
import SuggestionsList from '../SuggestionsList';
import SearchInput from '../SearchInput';

export interface OptionProps {
  id: number;
  name: string;
}

interface AutocompleteProps {
  placeholder?: string;
  options: OptionProps[];
}

const Autocomplete = ({ placeholder, options }: AutocompleteProps) => {
  const [searchVal, setSearchVal] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [suggestions, setSuggestions] = useState<OptionProps[]>([]);

  const inputSearchRef = useRef<HTMLInputElement>(null);

  // TODO:: Handle input change
  // 1. Get text from Input component
  const fetchData = (text: string) => {
    console.log('Make new request to API with --> ', text);
    // 2. Make Request to API

    // 3. Update suggestions
    setSuggestions(options);

    // 4. Update search vale so we can highlight text in list
    setSearchVal(text);
  };

  const handleSuggestionClick = (suggestionText: string) => {
    // Set the selected option
    setSelectedOption(suggestionText);

    // Close suggestions list
    setSuggestions([]);

    // Focus on input after choosing option from list
    inputSearchRef.current?.focus();
  };

  return (
    <div className="autocomplete-container">
      <SearchInput
        placeholder={placeholder}
        updateSearch={fetchData}
        selectedOption={selectedOption}
      />
      <SuggestionsList
        suggestions={suggestions}
        searchVal={searchVal}
        handleSuggestionClick={handleSuggestionClick}
      />

      {/* Give user feedback if there is no match to its search */}
      {suggestions.length === 0 && searchVal && !selectedOption && (
        <span className="no-results">No results found.</span>
      )}
    </div>
  );
};

export default Autocomplete;
