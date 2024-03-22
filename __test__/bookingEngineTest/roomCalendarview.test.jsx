import React from 'react';
import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Import userEvent
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RoomCalenderView from '../../components/BookingEngine/RoomCalenderView';
import { toast } from 'react-toastify';
import ReactRedux from 'react-redux';

import { useDispatch } from 'react-redux';



jest.mock('react-toastify', () => ({
    toast: {
      error: jest.fn(), // Mock the error method
    },
  }));

  jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
  }));

const mockStore = configureStore([]);


const store = mockStore({
  reservationIdentity: [], // Add your initial state here
  roomsSelected: [],
  addMoreRoom: false,
  inventoryDetail: {},
  guestDetails: {},
  bookingInfo: {},
});

describe('RoomCalenderView', () => {
  test('clicking cart icon opens cart', async () => {
    const store = mockStore({
      reservationIdentity: [],
      roomsSelected: [],
      addMoreRoom: false,
      inventoryDetail: {},
      guestDetails: {},
      bookingInfo: {},
    });

    render(
      <Provider store={store}>
        <RoomCalenderView
          allHotelDetails={{ property_id: 1 }}
          color={{ bgColor: 'white', border: 'black', text: { title: 'black' } }}
          roomsLoader={false}
          setRoomsLoader={() => {}}
          rooms={[]}
          setDisplay={() => {}}
          setShowModal={() => {}}
          setSearched={() => {}}
          checkinDate="2024-03-20"
          checkoutDate="2024-03-21"
          cookie=""
        />
      </Provider>
    );

    userEvent.click(screen.getByTestId('cart-icon'));
    
    // Wait for the text "Cart is Empty." to appear
    await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('APP: Cart is Empty.');
    
    });
  });

//   test('clicking back icon calls closeButtonAction', async () => {
//     const closeButtonActionMock = jest.fn();
//     const dispatchMock = jest.fn();
//     jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatchMock);
  
//     const { getByTestId } = render(
//       <Provider store={store}>
//         <RoomCalenderView
//           allHotelDetails={{ property_id: 1 }}
//           color={{ bgColor: 'white', border: 'black', text: { title: 'black' } }}
//           roomsLoader={false}
//           setRoomsLoader={() => {}}
//           rooms={[]}
//           setDisplay={() => {}}
//           setShowModal={() => {}}
//           setSearched={() => {}}
//           checkinDate="2024-03-20"
//           checkoutDate="2024-03-21"
//           cookie=""
//           closeButtonAction={closeButtonActionMock}
//         />
//       </Provider>
//     );
  
//     // Simulate click on back icon
//     fireEvent.click(getByTestId('back-icon'));
  
//     // Check if closeButtonActionMock was called
//     expect(closeButtonActionMock).toHaveBeenCalled();
//     useDispatchMock.mockRestore();
//   });
 
// test('renders RoomCard components for each unique room', () => {
//     // Mock data
//     const uniqueRooms = [
//       { room_id: 1, property_id: 1 },
//       { room_id: 2, property_id: 1 },
//     ];

//     render(
//         <Provider store={store}>
//       <RoomCalenderView
//         roomsLoader={false}
//         uniqueRooms={uniqueRooms}
//       />
//       </Provider>
//     );

//     // Check if RoomCard components are rendered for each unique room
//     uniqueRooms.forEach((room) => {
//       const roomElement = screen.getByTestId(`room-${room.room_id}`);
//       expect(roomElement).toBeInTheDocument();
//     });
//   });


});
