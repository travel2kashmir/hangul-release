import React, { useState, useEffect } from 'react'
import DateInput from '../../utils/DateInput'
import DropDown from '../../utils/DropDown'


function BookingForm({ themeColor, setShowModalBookingForm, setShowBookingEngine, enquiry, setEnquiry, setRoomsLoader, setSearched, searched, cookie }) {

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
        <div className='mx-auto border shadow-lg rounded-lg'>
            <div className='p-8'>
                <h3
                    className={`${themeColor?.titleTextColor} text-4xl flex leading-none pl-6 lg:py-0 pt-6 my-4 font-bold `}
                >
                    Booking Form
                </h3>
                <div className=" md:px-4 mx-auto w-full">
                    <div className='flex flex-wrap'>
                        {/* checkInDate */}
                        <DateInput
                            color={themeColor}
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
                            color={themeColor}
                            label={'Checkout Date'}
                            req={true}
                            initialValue={new Date() + 10}
                            visible={1}
                            min={enquiry.checkin === "" ? maxDate : enquiry.checkin}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, checkout: e.target.value })}
                            error={err === true ? 'Checkout date cannot be earlier then the checkin date.' : notSelectedErr.forCheckout === true ? 'Select checkout date' : ''}

                        />

                        <DropDown
                            label={"Number of Guests"}
                            visible={1}
                            color={themeColor}
                            req={true}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, number_of_guests: e.target.value })}
                            defaultValue={enquiry?.number_of_guests}
                            options={Array.from({ length: 20 }, (_, index) => index + 1).map((i) => ({ "label": i, "value": i }))} />


                        <DropDown
                            label={"Number of Adults"}
                            visible={1}
                            color={themeColor}
                            req={true}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, number_of_adults: e.target.value })}
                            defaultValue={enquiry?.number_of_adults}
                            options={Array.from({ length: 50 }, (_, index) => index + 1).map((i) => ({ "label": i, "value": i }))} />

                        <DropDown
                            label={"Guests < 6 (years)"}
                            visible={1}
                            color={themeColor}
                            req={true}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, guests_below_six: e.target.value })}
                            defaultValue={enquiry?.guests_below_six}
                            options={Array.from({ length: 50 }, (_, index) => index + 1).map((i) => ({ "label": i, "value": i }))} />
                        <DropDown
                            label={"Guests < 12 (years)"}
                            visible={1}
                            color={themeColor}
                            req={true}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, guests_below_twelve: e.target.value })}
                            defaultValue={enquiry?.guests_below_twelve}
                            options={Array.from({ length: 50 }, (_, index) => index + 1).map((i) => ({ "label": i, "value": i }))} />
                    </div>
                    <div className='flex justify-center items-center md:pt-10 lg:pt-0'>
                        <button
                            disabled={!enquiry || (!enquiry.checkin && !enquiry.checkout)}
                            className='bg-cyan-700 hover:bg-cyan-900 mt-5 border rounded-3xl border-none h-12 w-full text-white'
                            onClick={() => {
                                if (enquiry.checkin === "" && enquiry.checkout === "") {
                                    setNotSelectedErr((prevValue) => ({ ...prevValue, "forCheckin": true, "forCheckout": true }))
                                } else if (enquiry.checkin === "" && enquiry.checkout !== "") {
                                    setNotSelectedErr((prevValue) => ({ ...prevValue, "forCheckin": true, "forCheckout": false }))

                                } else if (enquiry.checkin !== "" && enquiry.checkout === "") {
                                    setNotSelectedErr((prevValue) => ({ ...prevValue, "forCheckin": false, "forCheckout": true }))
                                }
                                else {
                                    if (cookie) {
                                        const user = JSON.parse(cookie);
                                        global.analytics.track("User searched for room", {
                                            action: "User searched for room",
                                            checkin: enquiry.checkin,
                                            checkout: enquiry.checkout,
                                            user: user.user
                                        });
                                    }

                                    setRoomsLoader(true)
                                    setSearched(!searched);
                                    setShowBookingEngine(1);
                                    setShowModalBookingForm(0);
                                    setNotSelectedErr((prevValue) => ({ ...prevValue, "forCheckin": false, "forCheckout": false }))
                                }
                            }}
                        >Search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingForm