import React, { useState, useEffect } from 'react';
import DarkModeLogic from "../../../components/darkmodelogic";
import Router from 'next/router'
import Link from "next/link";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import english from "../../../components/Languages/en"
import french from "../../../components/Languages/fr"
import arabic from "../../../components/Languages/ar";
import Title from '../../../components/title';
var language;
var currentLogged;
let currentMessage;

function ReplyMessage() {
    const [darkModeSwitcher, setDarkModeSwitcher] = useState()
    const [color, setColor] = useState({})
    const [messageDetails, setMessageDetails] = useState([]);

    useEffect(() => {
        firstfun();
    }, [])

    const firstfun = () => {
        if (typeof window !== 'undefined') {
            var locale = localStorage.getItem("Language");
            const colorToggle = JSON.parse(localStorage.getItem("ColorToggle"));
            const color = JSON.parse(localStorage.getItem("Color"));
            setColor(color);
            setDarkModeSwitcher(colorToggle)
            if (locale === "ar") {
                language = arabic;
            }
            if (locale === "en") {
                language = english;
            }
            if (locale === "fr") {
                language = french;
            }
            currentLogged = JSON.parse(localStorage.getItem("Signin Details"));
            currentMessage=localStorage.getItem("MessageId")
        }
    }

    useEffect(() => {
        setColor(DarkModeLogic(darkModeSwitcher))
    }, [darkModeSwitcher])

    const inbox = () => {
        Router.push("../inbox")
    }
   
    /* Function call to fetch Current Property Details when page loads */
    useEffect(() => {
          fetchInboxDetails();
      }, []);
    
    // get inbox messages of current property
    const fetchInboxDetails = async () => {
       const url = `/api/inbox/${currentMessage}`;
       axios.get(url)
          .then((response) => {
            alert(JSON.stringify(response.data))
            setMessageDetails(response?.data);
            logger.info("url  to fetch property details hitted successfully")
            
          })
          .catch((error) => { logger.error("url to fetch property details, failed") });
      }
   
    return (
        <>
            <Title name={`Engage |  ${language?.inbox}`} />

            <Header color={color} Primary={english?.Side1} Type={currentLogged?.user_type} />
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
                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer mr-1 p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg xmlns="http://www.w3.org/2000/svg"  height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24" x="0" /></g><g><g><path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M12.5,7H11v6l5.2,3.2l0.8-1.3l-4.5-2.7V7z" /></g></g></svg>
                        </span>

                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        </span>
                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer mr-1 p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                        </span>

                        <span className={`${color?.textgray} hover:${color?.text}  mr-1 cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><path d="M0,0h24v24H0V0z" fill="none" /></g><g><g><path d="M21.41,11.41l-8.83-8.83C12.21,2.21,11.7,2,11.17,2H4C2.9,2,2,2.9,2,4v7.17c0,0.53,0.21,1.04,0.59,1.41l8.83,8.83 c0.78,0.78,2.05,0.78,2.83,0l7.17-7.17C22.2,13.46,22.2,12.2,21.41,11.41z M12.83,20L4,11.17V4h7.17L20,12.83L12.83,20z" /><circle cx="6.5" cy="6.5" r="1.5" /></g></g></svg>
                        </span>
                        <div className="border-l   pl-2 border-gray-200">
                            <span className="mt-1.5 text-left text-md font-medium  text-gray-500 "> Today, 08:34 AM</span>
                        </div>
                    </div>

                    <div className="flex items-center  mb-4 sm:mb-0">
                    <a href="#" className="text-gray-500 hover:text-gray-900 ml-2 cursor-pointer p-1 -mt-1 hover:bg-gray-100 rounded inline-flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24"  fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>
                    </a>
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

                <div className='hover:bg-gray-100 divide-y mt-2  border-t border-gray-200'></div>

                <div className={`${color?.greybackground}  px-4 `} >
                    <div className='p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0'>
                        <img className="h-10 w-10 rounded-full" src="/man.png" alt="Neil Sims avatar" />
                        <div className="text-sm font-normal text-gray-500">
                            <div className="text-base font-semibold text-gray-900">Neil Sims</div>
                            <div className="text-sm font-normal text-gray-500">neil.thomas@gmail.com</div>
                        </div>
                    
                    </div>
                    <h1 className="text-xl  px-2 sm:text-2xl font-bold text-gray-900">Website Hosting Reviews Free The Best Resource For Hosting Comparison</h1>
                    <div className='hover:bg-gray-100 divide-y mt-1  border-t border-gray-200'></div>
               
                </div>

                <div className='px-6 my-5'>
                <input type="text" className={`shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                 defaultValue="neilthomas@gmail.com" />
                </div>

                <div className='px-6 my-5'>
                <textarea rows="6" columns="50"
                 className={`shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                placeholder="Write text here..."/>
                </div>
                
                <div className='flex space-x-3 items-center px-6 my-3'>
                <button href="#" className="sm:inline-flex  text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-semibold rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                          <span className='mr-3'>
                         Send</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white flex-shrink-0 transition duration-75" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M0 0h24v24H0V0z" fill="none"/>
                            <path d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z"/></svg>
                 </button>

                 <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 hover:text-gray-900 flex-shrink-0 group-hover:text-gray-900  transition duration-75" fill="currentColor"
                  enableBackground="new 0 0 24 24" viewBox="0 0 24 24"><g><rect fill="none" /></g><g><g/><g><circle cx="15.5" cy="9.5" r="1.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M12,18c2.28,0,4.22-1.66,5-4H7C7.78,16.34,9.72,18,12,18z"/><path d="M11.99,2C6.47,2,2,6.48,2,12c0,5.52,4.47,10,9.99,10C17.52,22,22,17.52,22,12C22,6.48,17.52,2,11.99,2z M12,20 c-4.42,0-8-3.58-8-8c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z"/></g></g></svg>
                        
                 <svg xmlns="http://www.w3.org/2000/svg"  
                 className="w-6 h-6 text-gray-500 hover:text-gray-900 flex-shrink-0 group-hover:text-gray-900  transition duration-75" fill="currentColor"
                viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>
               
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  className="w-6 h-6 text-gray-500 hover:text-gray-900 flex-shrink-0 group-hover:text-gray-900  transition duration-75" 
                fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/></svg>
                 
                 <svg xmlns="http://www.w3.org/2000/svg"  className="w-6 h-6 text-gray-500 hover:text-gray-900 flex-shrink-0 group-hover:text-gray-900  transition duration-75" fill="currentColor"
                 viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z"/><circle cx="18" cy="11.5" r="1"/></svg>
                 </div>

            </div>

        </>
    )
}

export default ReplyMessage