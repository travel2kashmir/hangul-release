import CountUp from 'react-countup';
function CountupBox({title,countUpValue,countUpDuration=1.5,decimals=0}) {
    return (
        <div className='text-center'>
            <h2 className='text-3xl md:text-4xl font-bold'>
                <CountUp end={countUpValue} duration={countUpDuration} decimal={decimals} />
            </h2>
            <p className='md:pt-2 '>{title}</p>
        </div>

    )
}
export default CountupBox