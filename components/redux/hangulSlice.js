import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    roomsSelected: [],
    addMoreRoom: false,
    inventoryDetail: [],
    reserveRoom: false,
    reservationIdentity: [],
    guestDetails: {},
    bookingInfo: {
        booking_id: null,
        property_id: null,
    },

}
// reducers 
export const hangulSlice = createSlice({
    name: 'hangul',
    initialState,
    // reducers is a group of functions which will work on state 
    reducers: {

        setRoomsSelected: (state, action) => {
            // Ensure that action.payload is an array (if not already)
            // const roomToAdd = Array.isArray(action.payload) ? action.payload : [action.payload];
            const roomToAdd = action.payload;
            // Add the room_id(s) to roomsSelected
            state.roomsSelected = [...state.roomsSelected, ...roomToAdd];
        },
        removeRoomFromSelected: (state, action) => {
            const roomIdToRemove = action.payload;
            state.roomsSelected =state.roomsSelected.filter(roomId => roomId.room_id !== roomIdToRemove);
        },
        // Add a reducer case to handle clearing roomsSelected
        clearRoomsSelected: (state) => {
            state.roomsSelected = [];
        },
        setAddMoreRoom: (state, action) => {
            state.addMoreRoom = action.payload
        },
        addInventoryDetail: (state, action) => {
            state.inventoryDetail = action.payload
        },
        clearInventoryDetail: (state, action) => {
            state.inventoryDetail = []
        },
        setReserveRoom: (state, action) => {
            state.reserveRoom = action.payload
        },
        setReservationIdentity: (state, action) => {
            const roomsToReserve = action.payload
            state.reservationIdentity = [...state.reservationIdentity, ...roomsToReserve];
        },
        removeReservationFromReservationIdentity: (state, action) => {
            const roomIdToRemove = action.payload;
            state.reservationIdentity = state.reservationIdentity.filter(reservation => reservation.room_id !== roomIdToRemove);
        },
        clearReservationIdentity: (state) => {
            state.reservationIdentity = [];
        },

        setGuestDetails: (state, action) => {
            state.guestDetails = action.payload
        },
        clearGuestDetails: (state, action) => {
            state.guestDetails = {};
        },
        updateBookingInfo: (state, action) => {
            const { booking_id, property_id } = action.payload;
            state.bookingInfo.booking_id = booking_id;
            state.bookingInfo.property_id = property_id;
        },

    }
})

export const {
    setRoomsSelected,
    removeRoomFromSelected,
    clearRoomsSelected,
    setAddMoreRoom,
    addInventoryDetail,
    clearInventoryDetail,
    setReserveRoom,
    setReservationIdentity,
    removeReservationFromReservationIdentity,
    clearReservationIdentity,
    setGuestDetails,
    clearGuestDetails,
    updateBookingInfo,
} = hangulSlice.actions  //to be used in component files

export default hangulSlice.reducer //this will be used to put in store
