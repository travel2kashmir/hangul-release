// InputPassword.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputPassword from "../../components/Login/InputPassword";
import '@testing-library/jest-dom';


describe("InputPassword", () => {
  test("renders InputPassword component", () => {
    render(<InputPassword label="Password" />);
    const inputPasswordElement = screen.getByTestId("main");
    expect(inputPasswordElement).toBeInTheDocument();
  });

  test("renders label correctly", () => {
    render(<InputPassword label="Password" />);
    const labelElement = screen.getByText("Password");
    expect(labelElement).toBeInTheDocument();
  });

  test("renders required field indicator", () => {
    render(<InputPassword label="Password" req={true} />);
    const requiredIndicator = screen.getByText("*");
    expect(requiredIndicator).toBeInTheDocument();
  });

  test("renders tooltip", () => {
    render(<InputPassword label="Password" tooltip={true} />);
    const tooltipElement = screen.getByTestId("first");
    expect(tooltipElement).toBeInTheDocument();
  });

  test("renders input field", () => {
    render(<InputPassword label="Password" />);
    const inputField = screen.getByTestId("password-field");
    expect(inputField).toBeInTheDocument();
  });

  test("renders with default value", () => {
    render(<InputPassword label="Password" defaultValue="secret" />);
    const inputField = screen.getByTestId("password-field");
    expect(inputField).toHaveValue("secret");
  });

  test("calls onChangeAction when input changes", () => {
    const onChangeMock = jest.fn();
    render(<InputPassword label="Password" onChangeAction={onChangeMock} />);
    const inputField = screen.getByTestId("password-field");
    fireEvent.change(inputField, { target: { value: "newpassword" } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  test("displays error message", () => {
    render(<InputPassword label="Password" error="Invalid password" />);
    const errorMessage = screen.getByText("Invalid password");
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders correctly when visible is 0", () => {
    render(<InputPassword label="Password" visible={0} />);
    const lineLoader = screen.getByTestId("vis0");
    expect(lineLoader).toBeInTheDocument();
  });

  test("renders correctly when visible is 1", () => {
    render(<InputPassword label="Password" visible={1} />);
    const inputField = screen.getByTestId("password-field");
    expect(inputField).toBeInTheDocument();
  });

  test("renders tooltip with title if provided", () => {
    render(<InputPassword label="Password" tooltip={true} title="Enter your password" />);
    const tooltipElement = screen.getByText("Enter your password");
    expect(tooltipElement).toBeInTheDocument();
  });

  test("renders without tooltip if not provided", () => {
    render(<InputPassword label="Password" />);
    const tooltipElement = screen.queryByTestId("tooltip");
    expect(tooltipElement).toBeNull();
  });

  test("renders input field as disabled when disabled prop is true", () => {
    render(<InputPassword label="Password" disabled={true} />);
    const inputField = screen.getByTestId("password-field");
    expect(inputField).toBeDisabled();
    expect(inputField).toHaveValue(""); // Assuming defaultValue is not displayed when disabled
  });
});
