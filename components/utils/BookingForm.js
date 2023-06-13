import React, { useState } from 'react'
import InputText from './InputText'
import DateInput from './DateInput'
import DropDown from './DropDown'

function BookingForm({ color }) {
    
    const [enquiry, setEnquiry] = useState({
        "checkin": "",
        "checkout": "",
        "number_of_rooms": 1,
        "number_of_guests": 1,
        "number_of_adults": 1,
        "child_below_six": 0,
        "child_above_six": 0
    })
    return (
        <div className='mx-auto  border shadow-lg rounded-lg border-0'>
            <div className={`pt-6 ${color?.whitebackground} tour-receipt-dark`} >
                <h3
                    className={`${color?.text} text-4xl flex leading-none pl-6 lg:py-0 pt-6 my-4 font-bold`}
                >
                    Booking Form 
                </h3>

                <div className=" md:px-4 mx-auto w-full">
                    <div className='flex flex-wrap'>
                        {/* checkInDate */}
                        <DateInput
                            color={color}
                            label={'Checkin Date'}
                            req={true}
                            initialValue={new Date()}
                            visible={1}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, checkin: e.target.value })}
                        />


                        {/* checkout Date */}
                        <DateInput
                            color={color}
                            label={'Checkout Date'}
                            req={true}
                            initialValue={new Date() + 10}
                            visible={1}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, checkout: e.target.value })}
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
                            label={"Children 6 to 12 years"}
                            visible={1}
                            color={color}
                            req={true}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, child_above_six: e.target.value })}
                            defaultValue={enquiry?.child_above_six}
                            options={Array.from({ length: 50 }, (_, index) => index + 1).map((i) => ({ "label": i, "value": i }))} />


                    </div>
                    <div className=' flex justify-center items-center'>
                        <button className='bg-cyan-700 hover:bg-cyan-900 h-12 w-11/12 text-white border rounded-3xl border-none '>Search</button>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </div>
    )
}

export default BookingForm