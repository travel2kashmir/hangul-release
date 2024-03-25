// InputEmail.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputEmail from "../../components/Login/InputEmail";
import '@testing-library/jest-dom';

describe("InputEmail", () => {
  test("renders InputEmail component", () => {
    render(<InputEmail label="Email" />);
    const inputEmailElement = screen.getByTestId("main");
    expect(inputEmailElement).toBeInTheDocument();
  });

  test("renders label correctly", () => {
    render(<InputEmail label="Email" />);
    const labelElement = screen.getByText("Email");
    expect(labelElement).toBeInTheDocument();
  });

  test("renders required field indicator", () => {
    render(<InputEmail label="Email" req={true} />);
    const requiredIndicator = screen.getByText("*");
    expect(requiredIndicator).toBeInTheDocument();
  });

  test("renders tooltip", () => {
    render(<InputEmail label="Email" tooltip={true} />);
    const tooltipElement = screen.getByTestId("first");
    expect(tooltipElement).toBeInTheDocument();
  });

  test("renders input field", () => {
    render(<InputEmail label="Email" />);
    const inputField = screen.getByTestId("email-field");
    expect(inputField).toBeInTheDocument();
  });

  test("renders disabled input field", () => {
    render(<InputEmail label="Email" disabled={true} />);
    const inputField = screen.getByTestId("email-field");
    expect(inputField).toBeDisabled();
  });

  test('renders with default value', () => {
    render(<InputEmail label="Email" defaultValue="test@example.com" />);
    const inputField = screen.getByTestId('email-field');
    expect(inputField).toHaveValue('test@example.com');
  });
  
test('displays error message', () => {
  render(<InputEmail label="Email" error="Invalid email format" />);
  const errorMessage = screen.getByText('Invalid email format');
  expect(errorMessage).toBeInTheDocument();
});

test('displays disabled field value', () => {
    render(<InputEmail label="Email" defaultValue="test@example.com" disabled={true} />);
    const inputField = screen.getByTestId('email-field');
    expect(inputField).toHaveValue('test@example.com');
    expect(inputField).toBeDisabled();
  });

  test('triggers onChange action', () => {
    const handleChange = jest.fn();
    render(<InputEmail label="Email" onChangeAction={handleChange} />);
    const inputField = screen.getByTestId('email-field');
    fireEvent.change(inputField, { target: { value: 'new@example.com' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('applies color customization', () => {
    render(<InputEmail label="Email" color={{ text: 'text-red-500', whitebackground: 'bg-gray-100' }} />);
    const inputField = screen.getByTestId('email-field');
    expect(inputField).toHaveClass('text-red-500');
    expect(inputField).toHaveClass('bg-gray-100');
  });

  test('renders input field as disabled when disabled prop is true', () => {
    render(<InputEmail label="Email" disabled={true} />);
    const inputField = screen.getByTestId('email-field');
    expect(inputField).toBeDisabled();
    expect(inputField).toHaveValue(''); // Assuming defaultValue is not displayed when disabled
  });
  
});
