import { useRef, useState, useEffect } from 'react';
import HighlightedText from '../HighlightedText';
import { OptionProps } from '../Autocomplete';

interface SuggestionsListProps {
  searchVal: string;
  suggestions: OptionProps[];
  handleClick: (val: string) => void;
}

const SuggestionsList = ({
  searchVal,
  suggestions,
  handleClick,
}: SuggestionsListProps): JSX.Element => {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const suggestionsListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setActiveSuggestionIndex(0);
  }, [suggestions]);

  return suggestions.length && searchVal ? (
    <ul
      id="autocomplete-list"
      className="autocomplete-suggestions"
      ref={suggestionsListRef}
      role="listbox"
      aria-label="Search suggestions"
    >
      {suggestions.map(({ id, name }, index) => (
        <li
          // uniquely identify the active suggestion in the list, helping with accessibility
          id={index === activeSuggestionIndex ? 'active-option' : undefined}
          key={id}
          className={`autocomplete-suggestion ${
            index === activeSuggestionIndex ? 'active' : ''
          }`}
          role="option"
          aria-selected={index === activeSuggestionIndex}
          onClick={() => handleClick(name)}
        >
          <HighlightedText text={name} searchText={searchVal} />
        </li>
      ))}
    </ul>
  ) : (
    <></>
  );
};

export default SuggestionsList;
