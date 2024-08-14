import { render, fireEvent, screen } from '@testing-library/react';
import Autocomplete from '.';

const dummyOptions = [
  { id: 1, value: 'Rick Sanchez' },
  { id: 8, value: 'Adjudicator Rick' },
  { id: 15, value: 'Alien Rick' },
  { id: 19, value: 'Antenna Rick' },
  { id: 22, value: 'Aqua Rick' },
];
describe('Autocomplete tests', () => {
  it('should render input and show suggestions on typing', () => {
    render(<Autocomplete placeholder="Search..." options={dummyOptions} />);

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Rick Sanchez' } });
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('should remove suggestions list when input is empty', async () => {
    render(<Autocomplete placeholder="Search..." options={dummyOptions} />);

    // Check if element is not present
    expect(screen.queryByText('Rick Sanchez')).not.toBeInTheDocument();

    const input = screen.getByRole('search');

    // Add text to input
    fireEvent.change(input, { target: { value: 'Rick Sanchez' } });

    // Check if new element is present
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();

    // Clean input
    fireEvent.change(input, { target: { value: '' } });

    // Check if element now has disappeared
    expect(screen.queryByText('Rick Sanchez')).not.toBeInTheDocument();
  });
});
