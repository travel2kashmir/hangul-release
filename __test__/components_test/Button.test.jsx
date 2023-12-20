import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import Button from '../../components/Button'

describe("Testing Button component",()=>{
// Test case 1: Render button with label and default props
test('renders button with label and default props', () => {
  render(<Button testid="test-button" Primary={{ label: 'Click me' }} />);
  const button = screen.getByTestId('test-button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent('Click me');
  expect(button).not.toBeDisabled();
});

// Test case 2: Render button with custom color and icon
test('renders button with custom color and icon', () => {
  render(<Button testid="custom-button" Primary={{ label: 'Submit', color: 'bg-blue-500', icon: '🚀' }} />);
  const button = screen.getByTestId('custom-button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent('🚀Submit');
  expect(button).not.toBeDisabled();
  expect(button).toHaveClass('bg-gradient-to-r bg-blue-500');
});

// Test case 3: Render disabled button
test('renders disabled button', () => {
  render(<Button testid="disabled-button" Primary={{ label: 'Disabled', disabled: true }} />);
  const button = screen.getByTestId('disabled-button');
  expect(button).toBeInTheDocument();
  expect(button).toBeDisabled();
});

// Test case 4: Trigger onClick event

test('should call onClick when the button is clicked', () => {
  // Arrange
  const mockOnClick = jest.fn();
  const testId = 'test-button';
  const labelText = 'Click me';

  // Act
  render(<Button testid={testId} onClick={mockOnClick} Primary={{ label: labelText }} />);
  const button = screen.getByTestId(testId);
  fireEvent.click(button);

  // Assert
  expect(mockOnClick).toHaveBeenCalled();
});

  // Test case 5: Render button with only icon (no label)
  test('renders button with only icon and default props', () => {
    const testId = 'test-button';
    render(<Button testid={testId} Primary={{ icon: '⭐️' }} />);
    const button = screen.getByTestId(testId);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('⭐️');
    expect(button).not.toBeDisabled();
  });

  // test 6  doesnt render component if label and icon are empty
  test('returns null when both label and icon are empty', () => {
    // Render the Button component with empty label and icon
    render(<Button testid="empty-button" Primary={{}} />);
  
    // Try to query the button by test ID
    const button = screen.queryByTestId('empty-button');
  
    // Assert that the button is not present in the DOM
    expect(button).not.toBeInTheDocument();
  });

})