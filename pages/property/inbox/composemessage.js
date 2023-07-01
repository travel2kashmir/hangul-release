import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import Link from "next/link";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { InitialActions, ColorToggler } from '../../../components/initalActions';
import { english, french, arabic } from '../../../components/Languages/Languages';
import Title from '../../../components/title';
var language;
var currentLogged;
let colorToggle;

function ComposeMessage() {
    const [darkModeSwitcher, setDarkModeSwitcher] = useState()
    const [color, setColor] = useState({})
    const [mode, setMode] = useState()

    // first function to be executed
    useEffect(() => {
        const resp = InitialActions({ setColor, setMode })
        language = resp?.language;
        currentLogged = resp?.currentLogged;
        // currentProperty = resp?.currentProperty
        // setProperty_name(resp?.currentProperty?.property_name);
        colorToggle = resp?.colorToggle

    }, [])

    const inbox = () => {
        Router.push("../inbox")
    }
    return (
        <>
            <Title name={`Engage |  ${language?.inbox}`} />

            
            <Header color={color} setColor={setColor} Primary={english?.Side1} Type={currentLogged?.user_type} Sec={ColorToggler} mode={mode} setMode={setMode} />
            <Sidebar color={color} Primary={english?.Side1} Type={currentLogged?.user_type} />

            <div id="main-content" className={`${color?.whitebackground} min-h-screen pt-24  relative overflow-y-auto lg:ml-64`}>
                <div className={`${color?.whitebackground} px-4 sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 `}>

                    <div className="flex space-x-4 pl-0 sm:pl-2  sm:mt-0">
                        <div className="border-r   pr-2 border-gray-200">
                            <button onClick={inbox}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mt-2 hover:bg-gray-100 mr-2 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" fill="currentColor">
                                    <rect fill="none" height="24" width="24" />
                                    <path d="M9,19l1.41-1.41L5.83,13H22V11H5.83l4.59-4.59L9,5l-7,7L9,19z" />

                                </svg> </button>
                        </div>
                        <span className="mt-1.5 text-left text-md font-medium  text-gray-500 "> New Message</span>

                    </div>

                    <div className="flex items-center  mb-4 sm:mb-0">
                        <div className="border-r  border-gray-200">
                            <button data-tooltip="Delete" aria-label="Delete" className="w-6 h-6 mr-4  hover:text-gray-900 hover:bg-gray-100 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                            </button></div>
                        <a href="#" className="text-gray-500 hover:text-gray-900 ml-2 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                    </div>

                </div>

                <div className='hover:bg-gray-100 divide-y mt-2 mb-8 border-t border-gray-200'>

                </div>
                <div className='px-10 my-6'>
                    <input
                        type="text"
                        className={`shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        placeholder="To"
                    />
                </div>

                <div className='px-10 my-6'>
                    <input
                        type="text"
                        className={`shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        placeholder="Subject"
                    />
                </div>
                <div className='px-10 my-6'>
                    <textarea rows="18" columns="50"
                        className={`shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        placeholder="Write text here..."
                    />
                </div>

                <div className='flex space-x-3 items-center px-10 my-6'>
                    <button href="#" className="sm:inline-flex  text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-semibold rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                        <span className='mr-3'>
                            Send</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white flex-shrink-0 transition duration-75" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z" /></svg>
                    </button>

                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-500 hover:text-gray-900 flex-shrink-0 group-hover:text-gray-900  transition duration-75" fill="currentColor"
                        enableBackground="new 0 0 24 24" viewBox="0 0 24 24"><g><rect fill="none" /></g><g><g /><g><circle cx="15.5" cy="9.5" r="1.5" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="M12,18c2.28,0,4.22-1.66,5-4H7C7.78,16.34,9.72,18,12,18z" /><path d="M11.99,2C6.47,2,2,6.48,2,12c0,5.52,4.47,10,9.99,10C17.52,22,22,17.52,22,12C22,6.48,17.52,2,11.99,2z M12,20 c-4.42,0-8-3.58-8-8c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z" /></g></g></svg>

                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-500 hover:text-gray-900 flex-shrink-0 group-hover:text-gray-900  transition duration-75" fill="currentColor"
                        viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-gray-500 hover:text-gray-900 flex-shrink-0 group-hover:text-gray-900  transition duration-75" fill="currentColor"
                    ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 hover:text-gray-900 flex-shrink-0 group-hover:text-gray-900  transition duration-75" fill="currentColor"
                        viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" /><circle cx="18" cy="11.5" r="1" /></svg>
                </div>


            </div>

        </>
    )
}

export default ComposeMessage