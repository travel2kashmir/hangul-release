import React, { useEffect, useState } from 'react'
import DayCard from '../../components/customCalendar/DayCard'
import getDatesBetween from '../../components/customCalendar/DatesBetweenDays'
import { light  } from "../../components/colors/Color";
function Index() {
    const [month, setMonth] = useState([])
    const [initialMonth, setInitialMonth] = useState(1);
    const [initialYear, setInitialYear] = useState(2023);
    const [large, setLarge] = useState({ l: 0, index: 0 });
    const [enlarged, setEnlarged] = useState({});
    useEffect(() => {
        console.log(initialMonth);
        findingMonth(initialMonth, initialYear);
    }, [initialMonth])

    let rooms_price = [
        {
            room_name: 'Standard Size',
            price: 1000
        },
        {
            room_name: 'King Size',
            price: 1400
        },
        {
            room_name: 'Queen Size',
            price: 1800
        },
    ]
    let day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"]
    useEffect(() => {
        findingMonth();
    }, [])
    function findingMonth(mo, ye) {
        let m = mo ? mo : '01';
        let y = ye ? ye : '2023';
        const dates = getDatesBetween(new Date(y, m - 1, 1), new Date(y, m, 0));
        const month = dates.map(date => ({
            "day": day[date.getDay()],
            "date": date.getDate(),
            "month": months[date.getMonth()]
        }));
        setMonth(month);
    }

    return (<>
        <div>
            <div className={large.l === 0 ? 'block h-auto grid grid-cols-2 lg:grid-cols-7 md:grid-cols-4 gap-2 m-2 p-2' : 'hidden'}>
                {month.map((i, index) =>
                    <div key={index} onClick={() => { setLarge({ ...large, index: index, l: 1 }); setEnlarged(i) }}>
                        <DayCard day={`${i?.day?.toUpperCase()},${i?.date} ${i?.month}`} rooms_price={rooms_price} />
                    </div>
                )}
            </div>
            <div className='flex justify-end gap-2'>
                {initialMonth}
                <button
                    className='bg-cyan-600 hover:bg-cyan-800 h-8 w-24 text-white border border-none rounded-md'
                    onClick={() => { setInitialMonth(initialMonth <= 1 ? 12 : initialMonth - 1); }}>Prev Month</button>
                <button
                    className='bg-cyan-600 hover:bg-cyan-800 h-8 w-24 text-white border border-none rounded-md'
                    onClick={() => { setInitialMonth(initialMonth >= 12 ? 1 : initialMonth + 1); }}>Next Month</button>

            </div>
        </div>


        <div className={large.l === 1 ? "block" : "hidden"}>
            <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
                <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                    <div className={`${light?.whitebackground} rounded-lg shadow relative`}>
                        <div className="flex items-start justify-between p-5 border-b rounded-t">
                       
                            <div className='h-96 w-96'>
                            <button
                    type="button"
                    onClick={() =>{
                     setLarge({...large,l:0});
                    } }
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 lg:ml-96 inline-flex items-center "
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                                <DayCard day={`${enlarged?.day?.toUpperCase()},${enlarged?.date} ${enlarged?.month}`} rooms_price={rooms_price} />
                                <button
                                    className='bg-cyan-600 hover:bg-cyan-800 h-8 w-24 text-white border border-none rounded-md'
                                    onClick={() => { alert("no functionality added") }}>Book Now</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Index