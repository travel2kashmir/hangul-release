import React from 'react';
function ReceiptViewLoader() {
    return (
        <section >
            <div className='px-3 md:px-10'>
                <div className=' py-5 flex justify-between border-b'>
                    <div className='flex'>
                        <h2 className='text-2xl md:text-5xl my-auto bg-slate-300 animate-pulse h-24 py-2 w-36'/>
                    </div>
                    <div>
                        <div className='text-lg md:text-2xl text-right bg-slate-300 animate-pulse h-24 py-2 w-36' />
                    </div>
                </div>

                <div className='py-5 border-b flex justify-between'>
                    <div>
                        <h4 className=' md:text-lg bg-slate-300 animate-pulse h-8 my-2 py-2 w-36'/>
                        {/* it will check if gst for company is registered then it will display company's name else will display guests name */}
                        <div className='md:text-lg font-semibold bg-slate-300 animate-pulse h-24 w-20 p-2' />

                    </div>
                    <div className='text-right bg-slate-300 animate-pulse  h-32 w-1/6 ' />

                </div>

                <div className='py-5 md:flex md:justify-between'>
                    <div className='md:w-7/12'>
                        <table className='w-full bg-slate-300 animate-pulse  h-36' />
                    </div>

                    <div className='py-10 md:py-0 md:w-3/12 bg-slate-300 animate-pulse  h-44 w-full' />

                </div>
            </div>


            <div className='flex justify-center py-10'>
                <button className='px-3 py-2 bg-slate-300 animate-pulse h-8 w-36'/>
                <button className='px-3 py-2 bg-slate-300 animate-pulse h-8 w-36 mx-1'/>
            </div>
        </section>
    )
}

export default ReceiptViewLoader