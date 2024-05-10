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
  const [activeSuggestion, setActiveSuggestion] = useState(0);
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

    // Reset active suggestions index
    setActiveSuggestion(0);

    // Close list
    setSuggestions([]);

    // Focus on input after choosing option from list
    inputSearchRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If there are no suggestions shown, means there's no list to navigate so we do nothing
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown' && activeSuggestion < suggestions.length) {
      setActiveSuggestion((prevVal) => prevVal + 1);
    } else if (e.key === 'ArrowUp' && activeSuggestion > 0) {
      setActiveSuggestion((prevVal) => prevVal - 1);
    } else if (e.key === 'Enter') {
      handleSuggestionClick(suggestions[activeSuggestion].value);
    }
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
        onKeyDown={handleKeyDown}
      />
      {suggestions.length > 0 && (
        <ul className="autocomplete-suggestions">
          {suggestions.map(({ id, value }, index) => (
            <li
              key={id}
              className={`autocomplete-suggestion ${
                index === activeSuggestion - 1 && 'active'
              }`}
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
