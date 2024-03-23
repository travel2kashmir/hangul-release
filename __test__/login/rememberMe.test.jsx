import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RememberMe from '../../components/Login/RememberMe';
import '@testing-library/jest-dom'

describe('RememberMe', () => {
  it('should toggle the current state when clicking on the checkbox', () => {
    const setCookieData = jest.fn();
    const { getByTestId } = render(<RememberMe color={null} current={false} setCookieData={setCookieData} setCurrent={jest.fn()} remember="Remember Me" signinDetails={{}} />);
    const checkbox = getByTestId('remember-me');

    fireEvent.click(checkbox);

    expect(setCookieData).toHaveBeenCalledTimes(1);
    expect(setCookieData).toHaveBeenCalledWith(true, {});
  });

  it('should render the label with the correct text and color', () => {
    const { getByText } = render(<RememberMe color={{ text: 'text-red-500' }} current={false} setCookieData={jest.fn()} setCurrent={jest.fn()} remember="Remember Me" signinDetails={{}} />);
    const label = getByText('Remember Me');

    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-sm font-semibold text-red-500');
  });

  // Add more test cases as needed
});
