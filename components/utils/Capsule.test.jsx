import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Capsule from './Capsule'; // Assuming Capsule component is in the same directory

describe('Capsule component', () => {
  // Test 1: Renders correctly with default props
  it('should render with default props', () => {
    const { getByText } = render(<Capsule title="Sample title" />);

    const capsule = getByText(/Sample title/i); // Case-insensitive matching for title
    expect(capsule).toBeInTheDocument();
    expect(capsule).toHaveClass('text-sm text-gray-700 bg-gray-200 rounded-md p-1 mx-1 mb-2 w-fit flex items-end justify-center');
  });

  // Test 2: Renders with custom props
  it('should render with custom props', () => {
    const { getByText } = render(
      <Capsule
        title="Custom title"
        color="bg-blue-500"
        textColor="text-white"
      />
    );

    const capsule = getByText(/Custom title/i);
    expect(capsule).toBeInTheDocument();
    expect(capsule).toHaveClass('text-sm text-white bg-blue-500 rounded-md p-1 mx-1 mb-2 w-fit flex items-end justify-center');
  });

  // Test 3: Handles click events (if onClick prop is provided)
  it('should call the onClick handler when clicked (if provided)', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<Capsule title="Clickable capsule" onClick={mockOnClick} />);

    const capsule = getByText(/Clickable capsule/i);
    fireEvent.click(capsule);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  // Test 4: Skips click event handler if not provided
  it('should not call a non-existent onClick handler when clicked', () => {
    const { getByText } = render(<Capsule title="Non-clickable capsule" />);

    const capsule = getByText(/Non-clickable capsule/i);
    fireEvent.click(capsule);

    expect(console.error).toHaveBeenCalledTimes(0); // No errors expected
  });
});
