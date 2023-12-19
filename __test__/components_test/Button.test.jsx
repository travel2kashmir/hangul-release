import { render, screen, fireEvent, waitFor} from '@testing-library/react';
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

test('triggers onClick event', async () => {
    const onClickMock = jest.fn();
    render(<Button testid="clickable-button" Primary={{ label: 'Click me', onClick: onClickMock }} />);
    const button = screen.getByTestId('clickable-button');
  
    fireEvent.click(button);
    console.log('After click');
  
    // Wait for the asynchronous code to complete
    await waitFor(() => {
      console.log('Inside waitFor');
      expect(onClickMock).toHaveBeenCalled();
    });
  });
  
})