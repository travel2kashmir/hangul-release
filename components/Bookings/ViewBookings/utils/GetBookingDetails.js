import axios from "axios";
export default function getBookingDetails({bookingId,currentProperty,setBookingDetail,setBookingDetailLoader}) {
    const url = `/api/all_bookings/${currentProperty.property_id}/${bookingId}`
    axios.get(url, { headers: { 'accept': 'application/json' } }).then((response) => {
        setBookingDetail(response?.data?.booking.map((i) => i));
        setBookingDetailLoader(false);

    }).catch((err) => {
        console.log(err)
    });
}
