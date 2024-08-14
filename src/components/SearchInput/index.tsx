import { useEffect, useRef, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

interface SearchInputProps {
  placeholder?: string;
  selected?: string;
  updateSearch: (val: string) => void;
}

const SearchInput = ({
  placeholder,
  selected,
  updateSearch,
}: SearchInputProps): JSX.Element => {
  const [inputVal, setInputVal] = useState('');
  // Controller to help us prevent unnecessary requests when user selects option
  const isSelecting = useRef(false);

  // This is the value we will use to trigger the search in parent
  const debouncedValue = useDebounce<string>(inputVal, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    isSelecting.current = false; // Reset selecting controller
    setInputVal(searchText);
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
      updateSearch(debouncedValue);
    }
  }, [debouncedValue, updateSearch]);

  return (
    <input
      id="autocomplete-input"
      className="autocomplete-input"
      role="search"
      type="text"
      placeholder={placeholder}
      value={inputVal}
      onChange={handleInputChange}
    />
  );
};

export default SearchInput;
