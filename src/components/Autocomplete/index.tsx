import React, { useState, useRef, useEffect } from 'react';
import './styles.css'; // Import stylesheet
import HighlightedText from '../HighlightedText';

interface OptionProps {
  id: string;
  value: string;
}

interface AutocompleteProps {
  placeholder: string;
  options: OptionProps[];
}

const Autocomplete = ({ placeholder, options }: AutocompleteProps) => {
  const [userInput, setUserInput] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<OptionProps[]>([]);

  const inputSearchRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;

    setUserInput(searchText);

    if (searchText === '') {
      setSuggestions([]);
      return;
    }

    // Filter suggestions with case insensitive
    const filteredSuggestions = options.filter(({ value }) =>
      value.toLowerCase().includes(searchText.trim().toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestionText: string) => {
    setUserInput(suggestionText);
    setSelectedOption(suggestionText);

    // Close list
    setSuggestions([]);

    // Focus on input after choosing option from list
    inputSearchRef.current?.focus();
  };

  useEffect(() => {
    // Focus on input when it mounts. If this was part of a big form we wouldn't use this
    inputSearchRef.current && inputSearchRef.current.focus();
  }, []);

  return (
    <div className="autocomplete-container">
      <input
        ref={inputSearchRef}
        type="text"
        className="autocomplete-input"
        id="autocomplete-input"
        placeholder={placeholder}
        value={userInput}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul className="autocomplete-suggestions">
          {suggestions.map(({ id, value }) => (
            <li
              key={id}
              className="autocomplete-suggestion"
              onClick={() => handleSuggestionClick(value)}
            >
              <HighlightedText text={value} searchText={userInput} />
            </li>
          ))}
        </ul>
      )}
      {suggestions.length === 0 && userInput && !selectedOption && (
        <span className="no-results">No results found.</span>
      )}
    </div>
  );
};

export default Autocomplete;
