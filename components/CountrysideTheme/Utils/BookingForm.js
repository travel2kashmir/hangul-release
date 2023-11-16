import React, { useState, useEffect } from 'react'
import DateInput from './DateInput'
import DropDown from './DropDown'


function BookingForm({ setShowBookingEngine, enquiry, setEnquiry, setRoomsLoader, setSearched, searched }) {

    // const [enquiry, setEnquiry] = useState({
    //     "checkin": "",
    //     "checkout": "",
    //     "number_of_rooms": 1,
    //     "number_of_guests": 1,
    //     "number_of_adults": 1,
    //     "child_below_six": 0,
    //     "child_above_six": 0
    // })

    const [maxDate, setMaxDate] = useState('');
    const [err, setErr] = useState(false);
    const [notSelectedErr, setNotSelectedErr] = useState({
        "forCheckin": false,
        "forCheckout": false
    });

    useEffect(() => {
        const dtToday = new Date();
        const month = (dtToday.getMonth() + 1).toString().padStart(2, '0');
        const day = dtToday.getDate().toString().padStart(2, '0');
        const year = dtToday.getFullYear();
        const formattedMaxDate = `${year}-${month}-${day}`;
        setMaxDate(formattedMaxDate);
    }, []);


    useEffect(() => {
        if (enquiry.checkin && enquiry.checkout) {
            if (enquiry.checkin > enquiry.checkout) {
                setErr(true)
            }
            else {
                setErr(false)
            }
        }
    }, [enquiry.checkin, enquiry.checkout]);


    return (
        <div className='mx-auto py-6 '>
            <div>
                {/* <div className=" md:px-4 mx-auto w-full"> */}
                <div className=" md:px-0 mx-auto w-full">
                    <div className=''>
                        {/* checkInDate */}
                        <DateInput
                            // color={color}
                            label={'Checkin Date'}
                            req={true}
                            initialValue={new Date()}
                            visible={1}
                            min={maxDate}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, checkin: e.target.value })}
                            error={err === true ? 'Checkin date cannot be ahead of the checkout date.' : notSelectedErr.forCheckin === true ? 'Select checkin date' : ''}
                        />


                        {/* checkout Date */}
                        <DateInput
                            // color={color}
                            label={'Checkout Date'}
                            req={true}
                            initialValue={new Date() + 10}
                            visible={1}
                            min={enquiry.checkin === "" ? maxDate : enquiry.checkin}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, checkout: e.target.value })}
                            error={err === true ? 'Checkout date cannot be earlier then the checkin date.' : notSelectedErr.forCheckout === true ? 'Select checkout date' : ''}

                        />

                        <DropDown
                            label={"Number of Rooms"}
                            visible={1}
                            // color={color}
                            req={true}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, number_of_rooms: e.target.value })}
                            defaultValue={enquiry?.number_of_adults}
                            options={Array.from({ length: 20 }, (_, index) => index + 1).map((i) => ({ "label": i, "value": i }))} />

                        <div className='flex justify-between'>
                            <div className='w-5/12'>
                                <DropDown
                                    label={"Number of Adults"}
                                    visible={1}
                                    // color={color}
                                    req={true}
                                    onChangeAction={(e) => setEnquiry({ ...enquiry, number_of_adults: e.target.value })}
                                    defaultValue={enquiry?.number_of_adults}
                                    options={Array.from({ length: 50 }, (_, index) => index + 1).map((i) => ({ "label": i, "value": i }))} />
                            </div>
                            <div className='w-5/12'>
                                <DropDown
                                    label={"Number of Children"}
                                    visible={1}
                                    // color={color}
                                    req={true}
                                    onChangeAction={(e) => setEnquiry({ ...enquiry, child_below_six: e.target.value })}
                                    defaultValue={enquiry?.child_below_six}
                                    options={Array.from({ length: 50 }, (_, index) => index + 1).map((i) => ({ "label": i, "value": i }))} />
                            </div>
                        </div>
                    </div>
                    <div className=' flex justify-center items-center'>
                        <button
                            className='bg-custom-yellow h-12 w-full text-white'
                            onClick={() => {
                                if (enquiry.checkin === "" && enquiry.checkout === "") {
                                    setNotSelectedErr((prevValue) => ({ ...prevValue, "forCheckin": true, "forCheckout": true }))
                                } else if (enquiry.checkin === "" && enquiry.checkout !== "") {
                                    setNotSelectedErr((prevValue) => ({ ...prevValue, "forCheckin": true, "forCheckout": false }))

                                } else if (enquiry.checkin !== "" && enquiry.checkout === "") {
                                    setNotSelectedErr((prevValue) => ({ ...prevValue, "forCheckin": false, "forCheckout": true }))
                                }
                                else {
                                    setRoomsLoader(true)
                                    setSearched(!searched);
                                    setShowBookingEngine(1);
                                    setNotSelectedErr((prevValue) => ({ ...prevValue, "forCheckin": false, "forCheckout": false }))
                                }


                            }}
                        >Search</button>
                    </div>
                </div>
            </div>

            {/* this div will only show up when the showBookingEngine is equal to 1 else there will be no such div, and the functions inside this div will only work when showBookingEngine is equal to 1 */}
            {/* {showBookingEngine === 1 ?
                <div className="block z-50">
                    {allHotelDetails && <BookingModal
                        title="Booking Engine"
                        bookingComponent={
                            <BookingEngine
                                roomsLoader={roomsLoader}
                                setRoomsLoader={(e) => setRoomsLoader(e)}
                                display={display}
                                setDisplay={(e) => setDisplay(e)}
                                rooms={rooms}
                                allHotelDetails={allHotelDetails}
                                setShowModal={(e) => setShowBookingEngine(e)}
                                setSearched={(e) => setSearched(false)}
                                checkinDate={enquiry.checkin}
                                checkoutDate={enquiry.checkout}
                            />}
                        setShowModal={(e) => setShowBookingEngine(e)}
                        setDisplay={(e) => setDisplay(e)}
                        setSearched={(e) => setSearched(false)}
                    />}
                </div> : undefined} */}

        </div>
    )
}

export default BookingForm