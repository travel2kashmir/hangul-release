import React from 'react'

function BookingForm() {
    return (
        <section className='bg-amber-900'>
            <div className='py-10'>
                <div className='mx-14'>
                    <div>
                        <form className='mx-4 lg:flex'>

                            <div className='mb-5'>
                                <p className='mb-2 text-white'>
                                    CheckIn Date
                                </p>
                                <div>
                                    <input type='date'></input>
                                </div>
                            </div>

                            <div className='mb-5 lg:ml-5'>
                                <p className='mb-2 text-white'>
                                    CheckOut Date
                                </p>
                                <div>
                                    <input type='date'></input>
                                </div>
                            </div>

                            <div className='mb-5 lg:ml-5'>
                                <p className='mb-2 text-white'>
                                    Number of Rooms
                                </p>
                                <select id="rooms" name="cars">
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="fiat">Fiat</option>
                                    <option value="audi">Audi</option>
                                </select>
                            </div>

                        </form>
                    </div>
                </div>  
            </div>
        </section>
    )
}

export default BookingForm