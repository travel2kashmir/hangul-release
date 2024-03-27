import Router from "next/router";
export default function  viewCurrentBookingDetails(id){
    localStorage.setItem("BookingId", id);
    Router.push("./bookings/viewBooking");
};