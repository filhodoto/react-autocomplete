import { useRef, useState } from 'react';
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
  // currently highlighted suggestion index, when user navigates with keyboard
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const suggestionsListRef = useRef<HTMLUListElement>(null);

  return suggestions.length && searchVal ? (
    <ul className="autocomplete-suggestions" ref={suggestionsListRef}>
      {suggestions.map(({ id, name }, index) => (
        <li
          key={id}
          className={`autocomplete-suggestion ${
            index === activeSuggestionIndex - 1 && 'active'
          }`}
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
