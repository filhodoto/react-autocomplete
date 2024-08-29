import { render, screen } from '@testing-library/react';
import SuggestionsList from '.';

const mockedOptions = [
  { id: 1, name: 'Rick Sanchez', origin: { name: 'Alien Spa' } },
  { id: 8, name: 'Morty Smith', origin: { name: 'Alien Spa' } },
];

describe('SuggestionsList tests', () => {
  it('should show active styles depending on active suggestion index ', async () => {
    // TODO:: Finish this test
    // TODO:: Add test to HighlightText component and test highlight visual
    render(
      <SuggestionsList
        suggestions={mockedOptions}
        searchVal="Rick"
        handleClick={jest.fn()}
        activeSuggestionIndex={0}
      />
    );

    // Make sure we see a list of options
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
  });
});
