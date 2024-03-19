import CountUp from 'react-countup';
function CountupBoxRow({ title, countUpValue, countUpDuration = 1.5,style='bg-yellow-500 text-white' }) {
    return (
        <div className={`${style} shadow rounded-lg p-4 sm:p-6 xl:p-8 `}>
            <div className="flex justify-between my-auto">
                <div className='my-auto'>
                    <h2 className='font-semibold'>{title}</h2>
                </div>
                <div >
                    <span className='text-3xl md:text-4xl leading-none font-bold text-white'>
                        <CountUp end={countUpValue} duration={countUpDuration} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CountupBoxRow