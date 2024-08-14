import { useRef, useState } from 'react';
import HighlightedText from '../HighlightedText';
import { OptionProps } from '../Autocomplete';

interface SuggestionsListProps {
  searchVal: string;
  suggestions: OptionProps[];
  handleSuggestionClick: (val: string) => void;
}

const SuggestionsList = ({
  searchVal,
  suggestions,
  handleSuggestionClick,
}: SuggestionsListProps): JSX.Element => {
  // currently highlighted suggestion index, when user navigates with keyboard
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const suggestionsListRef = useRef<HTMLUListElement>(null);

  return suggestions.length ? (
    <ul className="autocomplete-suggestions" ref={suggestionsListRef}>
      {suggestions.map(({ id, name }, index) => (
        <li
          key={id}
          className={`autocomplete-suggestion ${
            index === activeSuggestionIndex - 1 && 'active'
          }`}
          onClick={() => handleSuggestionClick(name)}
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
