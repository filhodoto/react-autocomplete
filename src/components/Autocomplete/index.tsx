import React, { useState, useEffect } from 'react';
import './styles.css'; // Import stylesheet

const Autocomplete = ({ placeholder, options }) => {
  const [userInput, setUserInput] = useState('');
  const [showNoResults, setShowNoResults] = useState(false);
  const [suggestions, setSuggestions] = useState(options);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        className="autocomplete-input"
        id="autocomplete-input"
        placeholder={placeholder}
        value={userInput}
        onChange={handleChange}
        onFocus={() => setSuggestions(options)}
      />
      {suggestions.length > 0 && (
        <ul className="autocomplete-suggestions">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion} // Assuming suggestions have unique keys
              className="autocomplete-suggestion"
              //   onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
      {showNoResults && <p className="no-results">No results found.</p>}
    </div>
  );
};

export default Autocomplete;
