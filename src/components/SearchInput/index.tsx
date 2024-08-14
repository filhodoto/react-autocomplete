import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

interface SearchInputProps {
  placeholder?: string;
  selectedOption: string;
  updateSearch: (val: string) => void;
}

const SearchInput = ({
  placeholder,
  selectedOption,
  updateSearch,
}: SearchInputProps): JSX.Element => {
  const [inputVal, setInputVal] = useState('');

  // This is the value we will use to trigger the search in parent
  const debouncedValue = useDebounce<string>(inputVal, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;

    // Update state
    setInputVal(searchText);
  };

  useEffect(() => {
    // Update input value when user selects an option in list
    setInputVal(selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    // Update search in parent with debounced value
    updateSearch(debouncedValue);
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
