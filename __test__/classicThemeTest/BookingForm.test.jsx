import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import BookingForm from '../../components/ClassicTheme/CustomizedUtils/BookingForm';
import'@testing-library/jest-dom';

describe('BookingForm Component', () => {
  it('should render with correct initial values', () => {
    const themeColor = { titleTextColor: 'text-red-500' };
    const setShowModalBookingForm = jest.fn();
    const setShowBookingEngine = jest.fn();
    const setEnquiry = jest.fn();
    const setRoomsLoader = jest.fn();
    const setSearched = jest.fn();
    const searched = false;
    const cookie = null;

    const { getByText, getByLabelText } = render(
      <BookingForm
        themeColor={themeColor}
        setShowModalBookingForm={setShowModalBookingForm}
        setShowBookingEngine={setShowBookingEngine}
        enquiry={{}}
        setEnquiry={setEnquiry}
        setRoomsLoader={setRoomsLoader}
        setSearched={setSearched}
        searched={searched}
        cookie={cookie}
      />
    );

    expect(getByText('Booking Form')).toBeInTheDocument();
    expect(getByText('Checkin Date')).toBeInTheDocument();
    expect(getByText('Checkout Date')).toBeInTheDocument();
    expect(getByText('Number of Guests')).toBeInTheDocument();
    expect(getByText('Number of Adults')).toBeInTheDocument();
    expect(getByText('Guests < 6 (years)')).toBeInTheDocument();
    expect(getByText('Guests < 12 (years)')).toBeInTheDocument();
    expect(getByText('Search')).toBeInTheDocument();
  });

  it('disables search button when checkin and checkout dates are not selected', () => {
    const themeColor = { titleTextColor: 'text-red-500' };
    const setShowModalBookingForm = jest.fn();
    const setShowBookingEngine = jest.fn();
    const setEnquiry = jest.fn();
    const setRoomsLoader = jest.fn();
    const setSearched = jest.fn();
    const searched = false;
    const cookie = null;

    const { getByText } = render(<BookingForm 
        themeColor={themeColor}
        setShowModalBookingForm={setShowModalBookingForm}
        setShowBookingEngine={setShowBookingEngine}
        enquiry={{}}
        setEnquiry={setEnquiry}
        setRoomsLoader={setRoomsLoader}
        setSearched={setSearched}
        searched={searched}
        cookie={cookie}
        />);
    const searchButton = getByText('Search');
    expect(searchButton).toBeDisabled();
  });

  it('enables search button when checkin and checkout dates are selected', () => {
    const themeColor = { titleTextColor: 'text-red-500' };
    const setShowModalBookingForm = jest.fn();
    const setShowBookingEngine = jest.fn();
    const setEnquiry = jest.fn();
    const setRoomsLoader = jest.fn();
    const setSearched = jest.fn();
    const searched = false;
    const cookie = null;
    const { getByLabelText, getByText } = render(
        <BookingForm 
        themeColor={themeColor}
        setShowModalBookingForm={setShowModalBookingForm}
        setShowBookingEngine={setShowBookingEngine}
        enquiry={{}}
        setEnquiry={setEnquiry}
        setRoomsLoader={setRoomsLoader}
        setSearched={setSearched}
        searched={searched}
        cookie={cookie}
        />);
    const checkinInput = getByText('Checkin Date');
    const checkoutInput = getByText('Checkout Date');
    const searchButton = getByText('Search');

    fireEvent.change(checkinInput, { target: { value: '2024-04-01' } });
    fireEvent.change(checkoutInput, { target: { value: '2024-04-10' } });

    expect(searchButton).toBeEnabled();
  })


});
