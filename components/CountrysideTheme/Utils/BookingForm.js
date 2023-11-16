import React, { useState } from 'react'
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
        <div className='mx-auto py-6 '>
            <div>
                {/* <div className=" md:px-4 mx-auto w-full"> */}
                <div className=" md:px-0 mx-auto w-full">
                    <div className=''>
                        {/* checkInDate */}
                        <DateInput
                            // color={color}
                            label={'Check In'}
                            req={true}
                            initialValue={new Date()}
                            visible={1}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, checkin: e.target.value })}
                        />


                        {/* checkout Date */}
                        <DateInput
                            // color={color}
                            label={'Check Out'}
                            req={true}
                            initialValue={new Date() + 10}
                            visible={1}
                            onChangeAction={(e) => setEnquiry({ ...enquiry, checkout: e.target.value })}
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
                        {/* <button className='bg-cyan-700 hover:bg-cyan-900 h-12 w-11/12 text-white border rounded-3xl border-none '>Search</button> */}
                        <button className='bg-custom-yellow h-12 w-full text-white'>Search</button>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </div>
    )
}

export default BookingForm