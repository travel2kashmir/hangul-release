import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Address from '../../pages/property/address';
// 1 test
it('renders without crashing', () => {
    render(<Address />);
  });
// 2 Test Case
it('sets initial state correctly', () => {
    render(<Address />);
    // Assert on the initial state values or visibility of certain elements
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.getByTestId('update')).toHaveTextContent('Update Disabled');
  });
// 3 Test Case
it('handles input field changes', () => {
    render(<Address />);
    // Simulate input changes
    userEvent.type(screen.getByTestId('streetaddress'), '123 Main St');
    // Assert on the updated state or value of the input field
    expect(screen.getByTestId('streetaddress')).toHaveValue('123 Main St');
  });
// 4 Test Case
it('handles update button click', async () => {
    render(<Address />);
    // Simulate input changes
    userEvent.type(screen.getByTestId('streetaddress'), '123 Main St');
    // Click the update button
    userEvent.click(screen.getByTestId('update'));
    // Assert on the expected actions/results after the update button click
    // For example, you might wait for a toast notification to appear
    await waitFor(() => {
      expect(screen.getByText('Update Successful')).toBeInTheDocument();
    });
  });
// 5 Test Case
it('handles errors during update', async () => {
    render(<Address />);
    // Simulate input changes
    userEvent.type(screen.getByTestId('streetaddress'), '');
    // Click the update button
    userEvent.click(screen.getByTestId('update'));
    // Assert on the expected error messages or UI changes
    await waitFor(() => {
      expect(screen.getByText('Street Address is required')).toBeInTheDocument();
    });
  });
// 6 Test Case
it('displays a loading spinner when fetching data', async () => {
    render(<Address />);
    // Assert that the loading spinner is initially displayed
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    // Wait for data to be loaded (e.g., mock the API call or wait for specific elements)
    await waitFor(() => {
      // Assert that the loading spinner is no longer displayed
      expect(screen.queryByTestId('loading-spinner')).toBeNull();
    });
  });
// 7 Test Case
it('populates the country dropdown with correct options', async () => {
    render(<Address />);
    // Wait for the country dropdown to be populated (e.g., mock the API call or wait for specific elements)
    await waitFor(() => {
      // Assert on the options in the country dropdown
      expect(screen.getByTestId('country')).toHaveTextContent('United States');
      expect(screen.getByTestId('country')).toHaveTextContent('Canada');
      // Add more assertions as needed
    });
  });
// 8 Test Case
it('updates the province dropdown when a country is selected', async () => {
    render(<Address />);
    // Wait for the country dropdown to be populated (e.g., mock the API call or wait for specific elements)
    await waitFor(() => {
      // Select a country from the dropdown
      userEvent.selectOptions(screen.getByTestId('country'), 'Canada');
      // Wait for the province dropdown to be updated
      await waitFor(() => {
        // Assert on the options in the province dropdown
        expect(screen.getByTestId('province')).toHaveTextContent('Ontario');
        expect(screen.getByTestId('province')).toHaveTextContent('Quebec');
        // Add more assertions as needed
      });
    });
  });
// 9 Test Case
it('displays an error toast when an update fails', async () => {
    render(<Address />);
    // Simulate an error during update (e.g., mock the API call to fail)
    userEvent.click(screen.getByTestId('update'));
    // Wait for the error toast to be displayed
    await waitFor(() => {
      expect(screen.getByText('Update Failed')).toBeInTheDocument();
    });
  });
// 10 Test Case
it('successfully updates the full address', async () => {
    render(<Address />);
    // Simulate updating all address fields
    userEvent.type(screen.getByTestId('streetaddress'), '456 Oak St');
    userEvent.type(screen.getByTestId('landmark'), 'Near Park');
    userEvent.selectOptions(screen.getByTestId('country'), 'Canada');
    await waitFor(() => {
      userEvent.selectOptions(screen.getByTestId('province'), 'Ontario');
    });
    await waitFor(() => {
      userEvent.selectOptions(screen.getByTestId('city'), 'Toronto');
    });
    userEvent.type(screen.getByTestId('postalcode'), 'M5J 2G8');
    // Click the update button
    userEvent.click(screen.getByTestId('update'));
    // Wait for success toast
    await waitFor(() => {
      expect(screen.getByText('Update Successful')).toBeInTheDocument();
    });
  });
// 11 Test Case
it('displays an error for invalid address', async () => {
    render(<Address />);
    // Simulate entering an invalid address (e.g., empty street address)
    userEvent.type(screen.getByTestId('streetaddress'), '');
    // Click the update button
    userEvent.click(screen.getByTestId('update'));
    // Wait for error toast
    await waitFor(() => {
      expect(screen.getByText('Street Address is required')).toBeInTheDocument();
    });
  });
// 12 Test Case
it('blocks update while data is still loading', async () => {
    render(<Address />);
    // Simulate a slow API response or delayed data loading
    // Ensure that the loading spinner is still displayed
    userEvent.type(screen.getByTestId('streetaddress'), '789 Pine St');
    // Click the update button before data is fully loaded
    userEvent.click(screen.getByTestId('update'));
    // Assert that the update button is disabled or a loading spinner is displayed
    expect(screen.getByTestId('update')).toBeDisabled();
    // Wait for data to be loaded
    await waitFor(() => {
      // Assert that the update button is enabled again
      expect(screen.getByTestId('update')).toBeEnabled();
    });
  });
  