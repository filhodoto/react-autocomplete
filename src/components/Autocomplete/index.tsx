import React, { useState, useEffect, useRef } from 'react';
import './styles.css'; // Import stylesheet

interface OptionProps {
  id: string;
  name: string;
}

interface AutocompleteProps {
  placeholder: string;
  options: OptionProps[];
}

const Autocomplete = ({ placeholder, options }: AutocompleteProps) => {
  const [userInput, setUserInput] = useState('');
  const [showNoResults, setShowNoResults] = useState(false);
  const [suggestions, setSuggestions] = useState<OptionProps[]>([]);

  const inputSearchRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSuggestionClick = (suggestionText: string) => {
    setUserInput(suggestionText);

    // Close list
    setSuggestions([]);

    // Focus on input after choosing option from list
    inputSearchRef.current?.focus();
  };

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
        onFocus={() => setSuggestions(options)}
      />
      {suggestions.length > 0 && (
        <ul className="autocomplete-suggestions">
          {suggestions.map(({ id, name }) => (
            <li
              key={id}
              className="autocomplete-suggestion"
              onClick={() => handleSuggestionClick(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
      {showNoResults && <p className="no-results">No results found.</p>}
    </div>
  );
};

export default Autocomplete;
