import React, { useState, useEffect } from 'react'
import InputText from '../utils/InputText'
import DateInput from '../utils/DateInput'
import DropDown from '../utils/DropDown'
import BookingEngine from '../BookingEngine'
import Modal from '../NewTheme/modal';
import BookingModal from './BookingModal'


function BookingForm({ setShowBookingEngine, setShowModalBooking, color, searched, setSearched, enquiry, setEnquiry, setRoomsLoader,cookie }) {

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
        <div className='mx-auto lg:w-11/12 rounded-2xl lg:hover:shadow-gray-500 lg:hover:shadow-md bg-slate-200'>
            <div className={`pt-3 pb-1`} >
                <div className=" md:px-4 mx-auto w-full">
                    <div className='flex md:flex-wrap flex-wrap lg:flex-nowrap'>
                        {/* checkInDate */}
                        <DateInput
                            color={color}
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
                            color={color}
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
                            color={color}
                            req={true}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, number_of_rooms: e.target.value })}
                            defaultValue={enquiry?.number_of_adults}
                            options={Array.from({ length: 20 }, (_, index) => index + 1).map((i) => ({ "label": i, "value": i }))} />

                        <DropDown
                            label={"Number of Guest"}
                            visible={1}
                            color={color}
                            req={true}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, number_of_guests: e.target.value })}
                            defaultValue={enquiry?.number_of_guests}
                            options={Array.from({ length: 50 }, (_, index) => index + 1).map((i) => ({ "label": i, "value": i }))} />

                        <DropDown
                            label={"Number of Adults"}
                            visible={1}
                            color={color}
                            req={true}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, number_of_adults: e.target.value })}
                            defaultValue={enquiry?.number_of_adults}
                            options={Array.from({ length: 50 }, (_, index) => index + 1).map((i) => ({ "label": i, "value": i }))} />


                        <DropDown
                            label={"Children 0 to 6 years"}
                            visible={1}
                            color={color}
                            req={true}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, child_below_six: e.target.value })}
                            defaultValue={enquiry?.child_below_six}
                            options={Array.from({ length: 50 }, (_, index) => index + 1).map((i) => ({ "label": i, "value": i }))} />

                        <DropDown
                            label={"Children below 12"}
                            visible={1}
                            color={color}
                            req={true}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, child_above_six: e.target.value })}
                            defaultValue={enquiry?.child_above_six}
                            options={Array.from({ length: 50 }, (_, index) => index + 1).map((i) => ({ "label": i, "value": i }))} />


                    </div>
                    <div className='py-2 lg:py-0 flex justify-center items-center'>
                        <button disabled={err === true} className='bg-cyan-700  hover:bg-cyan-900 h-8 w-2/6 md:w-1/6 text-white border rounded-2xl border-none '
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
                                        global.analytics.track("User is searching for rooms", {
                                           action: "User is searching for rooms",
                                           checkin:enquiry.checkin,     
                                           checkout:enquiry.checkout,
                                           user: user.user,
                                           time: Date()
                                        });
                                     }
                                    setRoomsLoader(true)
                                    setSearched(!searched);
                                    setShowBookingEngine(1);
                                    setShowModalBooking(0)
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