import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { english, french, arabic } from "../Languages/Languages";
var language;
var property = '';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const logger = require("../../services/logger");

function Addservices() {

    const [services, setServices] = useState([])
    const [finalServices, setFinalServices] = useState([])
    //creates json to be edited and sent to db
    const makefinal = (arg) => {
        var intermediate = []
        let ser=['ser0016','ser0017','ser0020','ser0022']
        arg.map((item, index) => {
            var temp = {
                "service_id": item.service_id,
                "property_id": property?.property_id,
                "local_service_name": item.service_name.replaceAll("_", " "),
                "service_value": ser.includes(item.service_id)?"Not available":"no",
                "service_comment": "",
                "status": true,
                "index": index
            }
            intermediate.push(temp)
        })
        setFinalServices(intermediate)
    }
    //fetches all services
    const fetchServices = () => {
        const url = `/api/services`;
        axios.get(url).then((response) => {
            setServices(response.data)
            logger.info("All services fetched")
            makefinal(response.data)

        }).catch(error => {
            logger.error(error)
        })
    }
    //first thing to run in page
    useEffect(() => {
        const firstfun = () => {
            if (typeof window !== 'undefined') {
                var locale = localStorage.getItem("Language");
                if (locale === "ar") {
                    language = arabic;
                }
                if (locale === "en") {
                    language = english;
                }
                if (locale === "fr") {
                    language = french;

                }
                property = JSON.parse(localStorage.getItem("property"));
            }
        }
        firstfun();
        fetchServices();
    }, [])

    //send services to db
    const submitServices = () => {
       const final = { "services_link": finalServices }
       const url = `/api/services`
        axios.post(url, JSON.stringify(final), {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        ).then((response) => {
           toast.success("Services Added Successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }).catch((error) => {
            toast.error(error.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }
 return (
        <>

            <table className="table data table-fixed min-w-full divide-y divide-gray-200" id="serviceTable">
                <thead className="bg-gray-100">
                    <tr className="p-4 text-left text-s font-bold text-gray-700 uppercase">
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Service Name</th>
                        {/* <th>Service Description</th> */}

                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Service Description</th>
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Service Value</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 " id="TableList">
                    {services.map((item, idx) => {
                        return (<>

                            <tr key={idx} className="hover:bg-gray-100">
                                <td className="overflow-x-scroll p-4 whitespace-nowrap text-base font-medium text-gray-900">{item?.service_name?.replaceAll("_", " ")}
                                    <p className="whitespace-nowrap text-xs text-gray-900">
                                        {item.service_description.slice(0, 71)}<br />
                                        {item.service_description.slice(71, 140)}<br />
                                        {item.service_description.slice(140, 210)}<br />
                                        {item.service_description.slice(210, 280)}
                                    </p>
                                </td>


                                <td><input type='text'
                                    onChange={(e) => {
                                        setFinalServices(finalServices?.map((i) => {
                                            if (i?.service_id === item?.service_id) {
                                                i.service_comment = e.target.value
                                            }
                                            return i
                                        }))
                                    }} placeHolder={`Say somethig about service`} /></td>
                                <td>
                                    {(() => {
                                        switch (item?.service_id) {
                                            case 'ser0016': return (<div>
                                                {/*Kitchen Availability*/}
                                                <select
                                                    onChange={(e) => {
                                                        setFinalServices(finalServices?.map((i) => {
                                                            if (i?.service_id === item?.service_id) {
                                                                i.service_value = e.target.value
                                                            }
                                                            return i
                                                        }))
                                                    }}
                                                    className="shadow-sm bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-64 p-2.5">
                                                    <option select>Select</option>
                                                    <option value="Available in all rooms">Available in all rooms</option>
                                                    <option value="Available in some rooms">Available in some rooms</option>
                                                    <option value="Not available">Not available</option>
                                                </select>
                                            </div>)
                                            case 'ser0017': return (<div>
                                                {/*Parking Type*/}
                                                <select
                                                    onChange={(e) => {
                                                        setFinalServices(finalServices?.map((i) => {
                                                            if (i?.service_id === item?.service_id) {
                                                                i.service_value = e.target.value
                                                            }
                                                            return i
                                                        }))
                                                    }}
                                                    className="shadow-sm bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-64 p-2.5" >
                                                    <option select>Select</option>
                                                    <option value="No payment required">No Payment Required</option>
                                                    <option value="Paid">Paid</option>
                                                    <option value="Not available">Not available</option>
                                                </select>
                                            </div>)
                                            case 'ser0020': return (<div>
                                                {/*Swimming Pool*/}
                                                <select
                                                    onChange={(e) => {
                                                        setFinalServices(finalServices?.map((i) => {
                                                            if (i?.service_id === item?.service_id) {
                                                                i.service_value = e.target.value
                                                            }
                                                            return i
                                                        }))
                                                    }} className="shadow-sm bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-64 p-2.5" >
                                                    <option select>Select</option>
                                                    <option value="Indoors">Indoors</option>
                                                    <option value="Outdoors">Outdoors</option>
                                                    <option value="Indoors and outdoors">Indoors and Outdoors</option>
                                                    <option value="Not available">Not available</option>
                                                </select>
                                            </div>)
                                            case 'ser0022': return (<div>
                                                {/*Wifi Type*/}
                                                <select
                                                    onChange={(e) => {
                                                        setFinalServices(finalServices?.map((i) => {
                                                            if (i?.service_id === item?.service_id) {
                                                                i.service_value = e.target.value
                                                            }
                                                            return i
                                                        }))
                                                    }}
                                                    className="shadow-sm bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-64 p-2.5">
                                                    <option select>Select</option>
                                                    <option value="No payment required">No Payment Required</option>
                                                    <option value="Paid">Paid</option>
                                                    <option value="Not available">Not available</option>
                                                    
                                                </select>
                                            </div>)
                                            default: return (<div className="form-check mx-2 form-check-inline">

                                                <label htmlFor={`default-toggle${idx}`} className="inline-flex relative items-center cursor-pointer">
                                                    <input type="checkbox" value={true}
                                                        onChange={(e) => {
                                                            setFinalServices(finalServices?.map((i) => {
                                                                if (i?.service_id === item?.service_id) {
                                                                    i.service_value = e.target.value === "true" ? "yes" : "no"
                                                                }
                                                                return i
                                                            }))
                                                        }}
                                                        id={`default-toggle${idx}`} className="sr-only peer" />
                                                    <div
                                                        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                     dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
                     peer-checked:after:translate-x-full 
                     peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                     after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                      after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>)
                                        }
                                    })()}

                                </td>

                            </tr>

                        </>)

                    })}
                </tbody>
            </table>
            <div className="flex justify-end items-center p-2 border-t border-gray-200 rounded-b">
                <button
                    className=" mt-4 bg-cyan-600 text-white hover:bg-cyan-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"

                    onClick={(e) => JSON.stringify(property.property_id).toUpperCase() != 'NULL' ? submitServices(e) :
                        toast.error("APP: Property Not Registered", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })}
                    
                >
                    {language?.add}
                </button>


            </div>


            {/* Toast Container */}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>

    )
}

export default Addservices