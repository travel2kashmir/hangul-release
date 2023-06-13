import React from 'react';
import icon from '../../GlobalData'
import Loader from '../Loaders/Loader';

function Services({ allHotelDetails, hotelDetailLoader ,lang}) {
    let i = 0;

    return (
        <section id='services' className="px-5 py-10">
            <div>
                <h2 className=" text-center font-semibold text-2xl md:text-4xl">{lang?.propertyServices}</h2>
                {hotelDetailLoader === 0 ?
                    <Loader size={`w-full h-56 md:h-64 rounded-lg mt-10`} /> :
                    <div className="py-10 grid grid-flow-row-dense grid-cols-5 lg:grid-cols-5 md:grid-cols-4 md:col-span-9  grid-cols-2  md:gap-3 gap-1 lg:gap-3">
                        {
                            allHotelDetails?.services?.map((item, idx) => {
                                return (
                                    <React.Fragment key={idx}>
                                        {(() => {
                                            switch (item?.service_id) {
                                                case 'ser001': return (
                                                    <div>
                                                        {/*AC*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.ac}
                                                        </span>
                                                    </div>)
                                                case 'ser002': return (
                                                    <div>
                                                        {/*All Inclusive Available*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.inclusive}
                                                        </span>
                                                    </div>)
                                                case 'ser003': return (
                                                    <div>
                                                        {/*Child Friendly*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.childfriendly}
                                                        </span>
                                                    </div>)
                                                case 'ser004': return (
                                                    <div>
                                                        {/*Golf Course*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.golf}
                                                        </span>
                                                    </div>)
                                                case 'ser005': return (
                                                    <div>
                                                        {/*Airport Shuttle*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.airport}
                                                        </span>
                                                    </div>)
                                                case 'ser006': return (
                                                    <div>
                                                        {/*Bar Lounge*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.bar}
                                                        </span>
                                                    </div>)
                                                case 'ser007': return (
                                                    <div>
                                                        {/*Beach*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.beach}
                                                        </span>
                                                    </div>)
                                                case 'ser008': return (
                                                    <div>
                                                        {/*Business Center*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.bussinesscenter}
                                                        </span>
                                                    </div>)
                                                case 'ser009': return (
                                                    <div>
                                                        {/*Fitness Center*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.fitnesscenter}
                                                        </span>
                                                    </div>)
                                                case 'ser0010': return (
                                                    <div>
                                                        {/*Free Breakfast*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.breakfast}
                                                        </span>
                                                    </div>)
                                                case 'ser0011': return (
                                                    <div>
                                                        {/*Hot Tub*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.hottub}
                                                        </span>
                                                    </div>)
                                                case 'ser0012': return (
                                                    <div>
                                                        {/*Laundary Service*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.laundary}
                                                        </span>
                                                    </div>)

                                                case 'ser0013': return (
                                                    <div>
                                                        {/*Restaurant*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.restaurant}
                                                        </span>
                                                    </div>)
                                                case 'ser0014': return (
                                                    <div>
                                                        {/*Room Service*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.roomservice}
                                                        </span>
                                                    </div>)
                                                case 'ser0015': return (
                                                    <div>
                                                        {/*Spa*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.spa}
                                                        </span>
                                                    </div>)
                                                case 'ser0016': return (
                                                    <div>
                                                        {/*Kitchen*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.kitchen}
                                                        </span>
                                                    </div>)
                                                case 'ser0017': return (
                                                    <div>
                                                        {/*Parking*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.parking}
                                                        </span>
                                                    </div>)

                                                case 'ser0018': return (
                                                    <div>
                                                        {/*Pets Allowed*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.pets}
                                                        </span>
                                                    </div>)
                                                case 'ser0019': return (
                                                    <div>
                                                        {/*Smoke Free*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.smokefree}
                                                        </span>
                                                    </div>)
                                                case 'ser0020': return (
                                                    <div>
                                                        {/*Swimming Pool*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.pool}
                                                        </span>
                                                    </div>)
                                                case 'ser0021': return (
                                                    <div>
                                                        {/*Wheel Chair*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.wheelchair}
                                                        </span>
                                                    </div>)
                                                case 'ser0022': return (
                                                    <div>
                                                        {/*Wifi Type*/}
                                                        <span className="tooltip rounded-full hover:cursor-pointer hover:text-gray-900 text-gray-600 flex justify-center" title={item?.local_service_name}>
                                                            {icon?.Icons?.[i]?.wifi}
                                                        </span>
                                                    </div>)

                                                default: return (<div></div>)
                                            }
                                        })()}
                                    </React.Fragment>
                                )
                            })
                        }

                    </div>
                }

            </div>
        </section>
    )
}

export default Services