import React, { useState, useRef } from 'react';
import './styles.css'; // Import stylesheet
import HighlightedText from '../HighlightedText';
import SuggestionsList from '../SuggestionsList';

export interface OptionProps {
  id: number;
  value: string;
}

interface AutocompleteProps {
  placeholder: string;
  options: OptionProps[];
}

const Autocomplete = ({ placeholder, options }: AutocompleteProps) => {
  const [userInput, setUserInput] = useState('');
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0); // currently highlighted suggestion in the list
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<OptionProps[]>([]);
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const suggestionsListRef = useRef<HTMLUListElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;

    setUserInput(searchText);

    // If input is empty, clear suggestions
    if (searchText === '') {
      setSuggestions([]);
      return;
    }

    // Filter suggestions based on the input text with case insensitive
    const filteredSuggestions = options.filter(({ value }) =>
      value.toLowerCase().includes(searchText.trim().toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestionText: string) => {
    // Set input field to the selected suggestion
    setUserInput(suggestionText);

    // Set the selected option
    setSelectedOption(suggestionText);

    // Reset active suggestions index
    setActiveSuggestionIndex(0);

    // Close suggestions list
    setSuggestions([]);

    // Focus on input after choosing option from list
    inputSearchRef.current?.focus();
  };

  // Handle keyboard navigation within the suggestions list
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const listElement = suggestionsListRef.current;

    // If there are no suggestions shown, skip processing
    if (suggestions.length === 0 || !listElement) return;

    const activeItem = listElement.querySelector(
      `li:nth-child(${activeSuggestionIndex + 1})`
    ) as HTMLLIElement;

    if (e.key === 'ArrowDown' && activeSuggestionIndex < suggestions.length) {
      setActiveSuggestionIndex((prevVal) => prevVal + 1);

      // Scroll down if needed
      if (activeItem && activeItem.offsetTop > listElement.offsetHeight) {
        listElement.scrollTop = activeItem.offsetTop;
      }
    } else if (e.key === 'ArrowUp' && activeSuggestionIndex > 1) {
      // Navigate down in the suggestions list based on "activeSuggestionIndex" index
      setActiveSuggestionIndex((prevVal) => prevVal - 1);

      // Scroll up if the active item is out of view
      // TODO:: Scroll up is not working great, calculations are not correct
      if (activeItem && activeItem.offsetTop < listElement.scrollTop) {
        listElement.scrollTop = activeItem.offsetTop;
      }
    } else if (e.key === 'Enter') {
      handleSuggestionClick(suggestions[activeSuggestionIndex].value);
    }
  };

  return (
    <div className="autocomplete-container">
      <input
        ref={inputSearchRef}
        role="search"
        type="text"
        className="autocomplete-input"
        id="autocomplete-input"
        placeholder={placeholder}
        value={userInput}
        onChange={handleInputChange}
        // onKeyDown={handleKeyDown}
      />
      <SuggestionsList
        suggestions={suggestions}
        userInput={userInput}
        handleSuggestionClick={handleSuggestionClick}
      />

      {/* Give user feedback if there is no match to its search */}
      {suggestions.length === 0 && userInput && !selectedOption && (
        <span className="no-results">No results found.</span>
      )}
    </div>
  );
};

export default Autocomplete;
