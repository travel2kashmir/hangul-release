import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Title from '../../components/title';
import Footer from '../../components/Footer';
import { InitialActions, ColorToggler } from '../../components/initalActions';
import { english, french, arabic } from '../../components/Languages/Languages';
import Link from "next/link";
import Headloader from '../../components/loaders/headloader';
import Lineloader from '../../components/loaders/lineloader';
import Textboxloader from '../../components/loaders/textboxloader';
import { ToastContainer, toast } from "react-toastify";
import searchFunction from '../../components/searchFunction';
import EditProviders from '../../components/providers/EditProviders';
import AddProviders from '../../components/providers/AddProvider'
import NewAddon from '../../components/addons/newAddon';

let language, currentLogged, currentProperty, colorToggle;
function Providers() {
    const [mode, setMode] = useState();
    const [color, setColor] = useState({});
    const [visible, setVisible] = useState(1);
    const [editprovider, setEditprovider] = useState(0);
    const [property_name, setProperty_name] = useState('')
    const [activeProvider, setActiveProvider] = useState({})

    useEffect(() => {
        const resp = InitialActions({ setColor, setMode })
        language = resp?.language;
        currentLogged = resp?.currentLogged;
        currentProperty = resp?.currentProperty
        setProperty_name(resp?.currentProperty?.property_name);
        colorToggle = resp?.colorToggle

    }, [])

    const [providers, setProviders] = useState([
        {
            "provider_id": "Guide001",
            "providerCategory": "Guide",
            "providerName": "John Smith",
            "providerCompany": "Smith's Tour Guides",

            "servicesOffered":
                [{
                    "service_id": "service001",
                    "service_name": "Guide",
                }, {
                    "service_id": "service002",
                    "service_name": "Photography",
                }
                ],
                "contactInformation": [{
                    "contact_type":"email",
                    "contact_data": "Dal-Shikara@gmail.com"
                },
                {
                    "contact_type":"phone",
                    "contact_data": "7006177777"
                },{
                    "contact_type":"website",
                    "contact_data": "www.dalshikara.com"
                }
                ]
        }, {
            "provider_id": "Provider002",
            "providerCategory": "Shikara",
            "providerName": "Noor Mahal",
            "providerCompany": "Dal Shikara Association",

            "servicesOffered":
            [{
                "service_id": "service001",
                "service_name": "Guide",
            }, {
                "service_id": "service002",
                "service_name": "Photography",
            }
            ],
            "contactInformation": [{
                "contact_type":"email",
                "contact_data": "Dal-Shikara@gmail.com"
            },
            {
                "contact_type":"phone",
                "contact_data": "7006177777"
            },{
                "contact_type":"website",
                "contact_data": "www.dalshikara.com"
            }
            ]
        }
    ]

    )
    //edit provider
    function editProviderfunction() {
        let unchangedAddons = addons.filter((item) => item.addon_id != activeProvider.addon_id);
        setAddons([...unchangedAddons, activeProvider]);
        setActiveProvider({});
        setEditprovider(0);
    }
    //new provider
    function newProvider() {
        setProviders([...providers, activeProvider]);
        setActiveProvider({});
        setEditprovider(0);
    }
    return (
        <>

            <Title name={`Engage |  ${language?.providers}`} />

            <Header
                color={color}
                setColor={setColor}
                Primary={english.PlaceSide}
                Type={currentLogged?.user_type}
                Sec={ColorToggler}
                mode={mode}
                setMode={setMode} />

            <Sidebar
                color={color}
                Primary={english.PlaceSide}
                Type={currentLogged?.user_type} />
            {/* view addons */}
            {editprovider === 0 ?
                <div id="main-content"
                    className={`${color?.greybackground} px-4 pt-24 pb-2 relative overflow-y-auto h-screen lg:ml-64`}>
                    {/* Navbar */}
                    <nav className="flex mb-5 ml-4" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2">
                            <li className="inline-flex items-center">
                                <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                                    <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    <Link href={currentLogged?.id.match(/admin.[0-9]*/) ? "../admin/AdminLanding" : "./landing"}
                                        className={`${color?.text} text-base font-medium  inline-flex items-center`}><a>{language?.home}</a>
                                    </Link></div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                        <div className={visible === 0 ? 'block w-16' : 'hidden'}><Headloader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>   <Link href="../property/propertysummary" className="text-gray-700 text-sm   font-medium hover:{`${color?.text} ml-1 md:ml-2">
                                            <a className='capitalize'>{property_name}</a>
                                        </Link>
                                        </div></div>

                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <div className={`${color?.textgray} text-base font-medium  inline-flex items-center`}>
                                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                        <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">{language?.providers}</span>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    {/* Navbar End*/}

                    {/* page heading, search bar,icons and add button*/}
                    <div className="mx-4">
                        <h1 className={`text-xl sm:text-2xl font-semibold ${color?.text}`}>{language?.providers}</h1>
                        <div className="sm:flex">
                            <div className=" sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                                {/* search form */}
                                <form className="lg:pr-3" action="#" method="GET">
                                    <label htmlFor="users-search" className="sr-only">Search</label>
                                    <div className="mt-1 relative lg:w-64 xl:w-96">
                                        <input type="text" name="email" id="providerInput" onKeyUp={() => searchFunction('providerInput', 'providerTable')}
                                            className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} placeholder="Search">
                                        </input>
                                    </div>
                                </form>
                                {/* search form end */}
                                {/* icons start */}
                                <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                                    <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                                    </span>

                                    <button data-tooltip="Delete" aria-label="Delete" className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                    </button>



                                    <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                    </span>
                                    <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                                    </span>
                                </div>
                                {/* icons end*/}
                            </div>

                            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                                <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex  
                             font-semibold
                                    rounded-lg text-sm px-5 py-2 text-center 
                              items-center ease-linear transition-all duration-150" onClick={() => setEditprovider(2)} >
                                    ADD</button>

                            </div>
                        </div>
                    </div>


                    <div className={`${color?.whitebackground}`}>
                        {/* table of activities for day */}
                        <div className="flex flex-col mt-8 lg:-mr-20 sm:mr-0 w-full  relative">
                            <div className="overflow-x-auto">
                                <div className="align-middle inline-block min-w-full">
                                    <div className="shadow overflow-hidden">
                                        <table className="table data table-fixed lg:min-w-full divide-y divide-gray-200 min-w-screen" id="providerTable">
                                            <thead className={`${color?.tableheader}`}>
                                                <tr>
                                                    <th scope="col" className={`p-4 ${color?.textgray}`}>
                                                        <div className="flex items-center">
                                                            <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                                        </div>
                                                    </th>
                                                    <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.text} uppercase`}>Provider Name</th>
                                                    <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.text} uppercase`}>Provider Category</th>
                                                    <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.text} uppercase`}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className={` ${color?.whitebackground} divide-y  divide-gray-200`} id="TableList">

                                                {providers?.map((provider, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className="p-4 w-4">
                                                                <span className="flex items-center">
                                                                    <input id="checkbox-1" name="" aria-describedby="checkbox-1" type="checkbox"
                                                                        className={`bg-gray-50 ${color?.text} text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded`} />
                                                                    <label htmlFor="checkbox-1" className="sr-only" />
                                                                </span>
                                                            </td>
                                                            <td className={`${color?.text} p-4 whitespace-nowrap capitalize text-base font-normal`}>{provider.providerName}</td>
                                                            <td className={`${color?.text} p-4 whitespace-nowrap capitalize text-base font-normal`}>{provider.providerCategory}</td>

                                                            <td className="py-4 whitespace-nowrap capitalize">
                                                                <div>
                                                                    <button
                                                                        onClick={() => { setActiveProvider(provider); setEditprovider(1) }}
                                                                        className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                    >Edit </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}




                                            </tbody>
                                        </table>

                                        {/* Pagination */}
                                        <div className={`${color?.whitebackground} sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4`}>
                                            <div className="flex items-center w-64 mb-4 sm:mb-0">
                                                <button onClick={() => {
                                                    if (page > 1) {
                                                        setPage(page - 1);
                                                    }

                                                }} className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                                </button>

                                                <button onClick={() => {
                                                    if (page < Math.ceil(gen?.length / itemsPerPage)) {
                                                        setPage(page + 1);

                                                    }
                                                }} className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center mr-2`}>
                                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                                </ button>

                                                <span className={`text-sm font-normal ${color?.textgray}`}>
                                                    Showing
                                                    {/* {common?.Showing} */}

                                                    <span className={`${color?.text} font-semibold mx-1`}>
                                                        {/* {page} */} 1
                                                    </span>
                                                    of{/* {common?.Of} */}
                                                    <span className={`${color?.text} font-semibold mx-1`}>
                                                        1
                                                        {/* {Math.ceil(gen?.length / itemsPerPage)} */}
                                                    </span></span>

                                            </div>

                                            <div className="flex items-center w-42 space-x-3">
                                                <span className={`text-sm font-normal ${color?.textgray}`}>Entries per page</span>
                                                <select
                                                    // onChange={(e) => ItemShow(e)} 
                                                    className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block mr-2 w-12 px-3  py-1`}>
                                                    <option selected disabled>
                                                        5{/* {itemsPerPage} */}
                                                    </option>
                                                    <option value="5">5</option>
                                                    <option value="10">10</option>
                                                    <option value="15">15</option>
                                                    <option value="20">20</option>
                                                </select>

                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Toast Container */}
                    <ToastContainer position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover />


                </div>
                : <></>}
            {/* edit addons */}
            {editprovider === 1 ?
                <EditProviders activeProvider={activeProvider} setActiveProvider={setActiveProvider} set={()=>{editProviderfunction(); setActiveProvider({});}} theme={color} reset={() =>{setActiveProvider({});setEditprovider(0)} } />
                : <></>}
            {/* add addons */}
            {editprovider === 2 ?
                <AddProviders activeProvider={activeProvider} setActiveProvider={setActiveProvider} set={()=>{newProvider();}} theme={color} reset={() => setEditprovider(0)} /> : <></>}

            <Footer color={color} Primary={english.Foot} />
        </>
    )
}

export default Providers