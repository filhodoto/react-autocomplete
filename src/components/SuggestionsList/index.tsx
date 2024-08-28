import { useRef, useEffect } from 'react';
import HighlightedText from '../HighlightedText';
import { OptionProps } from '../Autocomplete';

interface SuggestionsListProps {
  searchVal: string;
  suggestions: OptionProps[];
  handleClick: (val: string) => void;
  activeSuggestionIndex: number;
}

const SuggestionsList = ({
  searchVal,
  suggestions,
  handleClick,
  activeSuggestionIndex,
}: SuggestionsListProps): JSX.Element => {
  const suggestionsListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Get the reference to the suggestions list element
    const listElement = suggestionsListRef.current;

    // Check if the list element exists and if there are any suggestions
    if (listElement && suggestions.length > 0) {
      // Get the currently active suggestion element based on the active index
      const activeElement = listElement.children[activeSuggestionIndex];

      // If the active element exists, scroll it into view
      // `scrollIntoView` with `block: 'nearest'` ensures the active suggestion
      // is brought into view, but only if it is out of the visible area
      if (activeElement && typeof activeElement.scrollIntoView === 'function') {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeSuggestionIndex, suggestions]);

  // Render list with suggestions
  const renderList = () => (
    <ul
      ref={suggestionsListRef}
      id="autocomplete-list"
      className="autocomplete-suggestions"
      role="listbox"
      aria-label="Navigate suggestions"
    >
      {suggestions.map(({ id, name, origin }, index) => {
        // See if item is active by comparing index with active index
        const isActive = index === activeSuggestionIndex;
        return (
          <li
            key={id}
            // uniquely identify the active suggestion in the list
            id={isActive ? `active-option-${index}` : undefined}
            className={`autocomplete-suggestion ${isActive ? 'active' : ''}`}
            role="option"
            aria-selected={isActive}
            onClick={() => handleClick(name)}
          >
            <p>
              <HighlightedText text={name} searchText={searchVal} />
            </p>
            {/* Show origin, so we can differentiate results with same name (eg: Rick Sanchez from different earths) */}
            {origin.name !== 'unknown' && (
              <span className="autocomplete-suggestion__extra">
                {origin.name}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );

  // If there are suggestions to show show list or "no results" feedback depending on match with search val
  return suggestions.length && searchVal ? renderList() : <></>;
};

export default SuggestionsList;
