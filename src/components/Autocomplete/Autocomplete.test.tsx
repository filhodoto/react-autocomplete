import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Autocomplete from '.';

const searchVal = 'Rick';

const mockedOptions = [
  { id: 1, name: 'Rick Sanchez', origin: { name: 'Alien Spa' } },
  { id: 8, name: 'Adjudicator Rick', origin: { name: 'Alien Spa' } },
  { id: 15, name: 'Alien Rick', origin: { name: 'Alien Spa' } },
  { id: 19, name: 'Antenna Rick', origin: { name: 'Alien Spa' } },
  { id: 22, name: 'Aqua Rick', origin: { name: 'Alien Spa' } },
];

const filterOptions = (searchVal: string) => {
  return mockedOptions.filter((el) => el.name.includes(searchVal));
};

// Mock fetch action with a Promise response that will return values if we pass "searchVal" and empty string if not
const mockFetch = jest.fn((url: string) =>
  Promise.resolve({
    json: () =>
      Promise.resolve(
        url.includes(searchVal)
          ? { results: filterOptions(searchVal) }
          : { results: [] }
      ),
  })
);

global.fetch = mockFetch as jest.Mock;

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Autocomplete tests', () => {
  it('should render input and show suggestions when user types common text value between options', async () => {
    render(<Autocomplete placeholder="Search..." />);
    const input = screen.getByPlaceholderText('Search...');

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: searchVal } });

    const results = await screen.findAllByText(searchVal);

    // Make sure list the same amount of results as the ones provided by mocked api
    expect(results.length).toBe(mockedOptions.length);

    // Ensure the correct API request was made
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining(`?name=${searchVal}`)
    );
  });

  it('should remove suggestions list when input is empty', async () => {
    render(<Autocomplete placeholder="Search..." />);

    // Check if there are no visible options
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    const input = screen.getByPlaceholderText('Search...');

    // Add text to input
    fireEvent.change(input, { target: { value: searchVal } });

    const list = await screen.findByRole('listbox');

    // Make sure we see a list of options
    expect(list).toBeInTheDocument();

    // Clean input
    fireEvent.change(input, { target: { value: '' } });

    // Check if list has disappeared
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('Should not send API request when cleaning input', async () => {
    render(<Autocomplete placeholder="Search..." />);

    const input = screen.getByPlaceholderText('Search...');

    // Add text to input
    fireEvent.change(input, { target: { value: searchVal } });

    // Make sure we see a list of options
    expect(await screen.findByRole('listbox')).toBeInTheDocument();

    // Clean input
    fireEvent.change(input, { target: { value: '' } });

    // Check if list has disappeared
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    // Make sure request was only called once (the first time with a search value)
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
