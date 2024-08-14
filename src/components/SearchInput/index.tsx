import { useEffect, useState } from 'react';

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
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;

    // Update state
    setUserInput(searchText);

    // Update search in parent
    updateSearch(searchText);
  };

  useEffect(() => {
    // Update input value when user selected an option
    setUserInput(selectedOption);
  }, [selectedOption]);

  return (
    <input
      id="autocomplete-input"
      className="autocomplete-input"
      role="search"
      type="text"
      placeholder={placeholder}
      value={userInput}
      onChange={handleInputChange}
    />
  );
};

export default SearchInput;
