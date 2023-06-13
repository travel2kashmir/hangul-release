import React, { useState, useEffect } from 'react';
import { InitialActions, ColorToggler } from '../initalActions';
import Link from "next/link";
import Headloader from '../loaders/headloader';
import Lineloader from '../loaders/lineloader';
import Textboxloader from '../loaders/textboxloader';
import { ToastContainer, toast } from "react-toastify";
import Multiselect from 'multiselect-react-dropdown';
import AddContact from '../contacts/AddContact';
let language, currentLogged, currentProperty, colorToggle;

function EditProviders({ activeProvider, setActiveProvider, set, theme, reset }) {
    const [addContact, setAddContact] = useState(0);
    const [contact, setContact] = useState({});
    const [flag, setFlag] = useState(0);
    const [mode, setMode] = useState();
    const [color, setColor] = useState(theme);
    const [visible, setVisible] = useState(1);
    const [propertyName, setpropertyName] = useState('')
    const [languages, setLanguages] = useState([{ "language_code": "en" }])
    const [servicesOffered, setServicesOffered] = useState([{
        "service_id": "service001",
        "service_name": "Guide",
    }, {
        "service_id": "service002",
        "service_name": "Photography",
    }, {
        "service_id": "service003",
        "service_name": "Food Serving",
    }])
    function serviceViews(event) {
        console.log(event)
    }
    useEffect(() => {
        const resp = InitialActions({ setColor, setMode })
        language = resp?.language;
        currentLogged = resp?.currentLogged;
        currentProperty = resp?.currentProperty
        setpropertyName(resp?.currentProperty?.property_name);
        colorToggle = resp?.colorToggle

    }, [theme])



    return (
        <>
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
                                        <a className='capitalize'>{propertyName}</a>
                                    </Link>
                                    </div></div>

                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <div className={visible === 0 ? 'block w-16' : 'hidden'}><Headloader /></div>
                                    <div className={visible === 1 ? 'block' : 'hidden'}>   <button onClick={reset} className="text-gray-700 text-sm   font-medium hover:{`${color?.text} ml-1 md:ml-2">
                                        <a className='capitalize'>Providers</a>
                                    </button>
                                    </div></div>

                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <div className={`${color?.textgray} text-base font-medium  inline-flex items-center`}>
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">Edit {language?.provider}</span>
                                </div>
                            </div>
                        </li>
                    </ol>
                </nav>
                {/* Navbar End*/}
                {/* add contact button */}
                <div className='flex justify-end'>
                <button
                    className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150 mr-2 mb-2"
                    onClick={() => setAddContact(1)}>ADD Contact</button>

                </div>

                <div className={`${color?.whitebackground} shadow rounded-lg px-12  sm:p-6 xl:p-8  2xl:col-span-2`}>
                    <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  font-bold`}>
                        {activeProvider.providerName}
                    </h6>
                    {/* content */}
                    <div className="pt-6">
                        <div className=" md:px-4 mx-auto w-full">
                            <div className="flex flex-wrap">
                                {/* Provider name */}
                                <div className="w-full lg:w-6/12  px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Provider Name
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <input
                                                type="text" data-testid="test_addon_name"
                                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                defaultValue={activeProvider.providerName} required
                                                onChange={
                                                    (e) => (
                                                        setActiveProvider({ ...activeProvider, providerName: e.target.value })
                                                    )
                                                } />
                                            {/* <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                        {error?.property_name}</p> */}
                                        </div>
                                    </div>
                                </div>
                                {/* Provider Category */}
                                <div className="w-full lg:w-6/12  px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Provider Category
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <input
                                                type="text" data-testid="test_addon_description"
                                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                defaultValue={activeProvider.providerCategory} required
                                                onChange={
                                                    (e) => (
                                                        setActiveProvider({ ...activeProvider, providerCategory: e.target.value })
                                                    )
                                                } />
                                            {/* <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                        {error?.property_name}</p> */}
                                        </div>
                                    </div>
                                </div>
                                {/* provider company */}
                                <div className="w-full lg:w-6/12  px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Provider Company
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <input
                                                type="text" data-testid="test_addon_description"
                                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                defaultValue={activeProvider.providerCompany} required
                                                onChange={
                                                    (e) => (
                                                        setActiveProvider({ ...activeProvider, providerCompany: e.target.value })
                                                    )
                                                } />
                                            {/* <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                        {error?.property_name}</p> */}
                                        </div>
                                    </div>
                                </div>

                                {/* services offered */}
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className={`text-sm font-medium ${color?.text} block mb-2`}
                                            htmlFor="grid-password">
                                            Services Offered
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <Multiselect
                                                isObject={true}
                                                options={servicesOffered}
                                                onRemove={(event) => { serviceViews(event) }}
                                                onSelect={(event) => { serviceViews(event) }}
                                                selectedValues={activeProvider?.servicesOffered}
                                                displayValue="service_name"
                                                placeholder="Search"
                                                closeIcon='circle'
                                                style={{
                                                    chips: {
                                                        background: '#0891b2',
                                                        'font-size': '0.875 rem'
                                                    },
                                                    searchBox: {
                                                        border: 'none',
                                                        'border-bottom': 'none',
                                                        'border-radius': '0px'
                                                    }
                                                }}

                                            />
                                            <p className="text-sm text-sm text-red-700 font-light">
                                                {/* {error?.view} */}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Provider Contact */}
                                <>
                                {activeProvider?.contactInformation?.map((contact, index)=>{
                                    return <React.Fragment key={index}>
                                 
                                        {/* Provider Category */}
                                <div className="w-full lg:w-6/12  px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className={`text-sm font-medium ${color?.text} block mb-2 capitalize`}
                                            htmlFor="grid-password">
                                            {contact.contact_type}
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                                        <div className={visible === 1 ? 'block' : 'hidden'}>
                                            <input
                                                type="text" data-testid="test_addon_description"
                                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                defaultValue={contact.contact_data} required
                                                onChange={
                                                    (e) => (
                                                        setActiveProvider({ ...activeProvider, providerCategory: e.target.value })
                                                    )
                                                } />
                                            {/* <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                        {error?.property_name}</p> */}
                                        </div>
                                    </div>
                                </div>
                                    </React.Fragment>
                                })}
                            </>
                                


                                {/* button */}
                                <div className='flex justify-end mr-4 w-full mt-4 '>
                                    <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150 mr-2"
                                        onClick={() => reset()}>Back</button>
                                    <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                        onClick={() => set()}>Update</button>
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

            {addContact === 1 ? <AddContact
                contact={contact}
                setContact={setContact}
                flag={flag}
                setFlag={setFlag}
                language={language}
                color={color}
                validationContact={() => { alert('contactAdded') }}
                setAddContact={(val) => setAddContact(val)} />
                : <></>}

        </>
    )
}

export default EditProviders;
