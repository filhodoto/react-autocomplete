import { useEffect, useState, useRef } from 'react';
import useDebounce from '../../hooks/useDebounce';

interface SearchInputProps {
  placeholder?: string;
  selected?: string;
  updateSearch: (val: string) => void;
  setActiveSuggestionIndex: (index: number) => void;
  activeSuggestionIndex: number;
  suggestionsCount: number;
}

const SearchInput = ({
  placeholder,
  selected,
  updateSearch,
  setActiveSuggestionIndex,
  activeSuggestionIndex,
  suggestionsCount,
}: SearchInputProps): JSX.Element => {
  const [inputVal, setInputVal] = useState('');
  // Controller to help us prevent unnecessary requests when user selects option
  const isSelecting = useRef(false);

  // This is the value we will use to trigger the search in parent
  const debouncedValue = useDebounce<string>(inputVal, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Reset selecting controller
    isSelecting.current = false;

    setInputVal(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If there are no suggestions, do nothing
    if (suggestionsCount === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        // If not at the last suggestion, move the active index down by one
        if (activeSuggestionIndex < suggestionsCount - 1)
          setActiveSuggestionIndex(activeSuggestionIndex + 1);
        break;

      case 'ArrowUp':
        e.preventDefault();
        // If not at the first suggestion, move the active index up by one
        if (activeSuggestionIndex > 0)
          setActiveSuggestionIndex(activeSuggestionIndex - 1);
        break;

      case 'Enter':
        e.preventDefault();
        // If a suggestion is selected, trigger the click on the active suggestion
        if (
          activeSuggestionIndex >= 0 &&
          activeSuggestionIndex < suggestionsCount
        ) {
          // Indicate that a selection is being made
          isSelecting.current = true;
          console.log(
            'first',
            document.getElementById(`active-option-${activeSuggestionIndex}`)
          );

          // Simulate a click on the currently active suggestion to select it
          (
            document.getElementById(
              `active-option-${activeSuggestionIndex}`
            ) as HTMLLIElement
          )?.click();
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    // Update input value when user selects an option
    if (selected) {
      isSelecting.current = true;
      setInputVal(selected);
    }
  }, [selected]);

  useEffect(() => {
    // Only update the search if the input change wasn't due to a selection
    if (!isSelecting.current) {
      // Run a new API request with new value
      updateSearch(debouncedValue);
    }
  }, [debouncedValue, updateSearch]);

  return (
    <input
      id="autocomplete-input"
      className="autocomplete-input"
      role="combobox"
      aria-autocomplete="list"
      placeholder={placeholder}
      value={inputVal}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      aria-expanded={!!debouncedValue} // Indicate if suggestions might be displayed
    />
  );
};

export default SearchInput;
