import React, { useState, useEffect } from 'react';
import {english,french,arabic} from "./Languages/Languages"
import { useRouter } from "next/router";
import Link from 'next/link';
import SidebarMenu from './utils/SidebarMenu';
var language;
var currentLogged;

function Navbar(args) {
  const [flag, setFlag] = useState(false)
  

  useEffect(() => {
    const onComponentLoadActions = () => {
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

      }
    }
    onComponentLoadActions();
    currentLogged = JSON.parse(localStorage.getItem("Signin Details"));
  }, [])
  /** UseState to check whether its small screen or large screen **/
  const [smSidebar, setSmSidebar] = useState(false)
  const router = useRouter();

  return (
    <div>
      {/** Header **/}
      <nav className={`${args?.color?.whitebackground} px-2 border-b border-gray-200 fixed z-30 w-full`}>
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <div className={smSidebar === false ? 'block' : 'hidden'}>
                <button onClick={() => setSmSidebar(true)} aria-expanded="true" aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                  <svg className="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button></div>
              <div className={smSidebar === true ? 'block' : 'hidden'}>
                <button onClick={() => setSmSidebar(false)} aria-expanded="true" aria-controls="sidebar"
                  className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                  <svg className="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>

              <li className="text-2xl text-cyan-600 font-bold flex items-center lg:ml-2.5">
                <span className="self-center whitespace-nowrap">enGage</span>
              </li>

            </div>


            {/** Button for Sign out**/}
            <div className="flex mr-2 items-center justify-end space-x-2 sm:space-x-3 ml-auto">

              {JSON.stringify(args?.mode) == "false" ?
                <button onClick={() => { args?.Sec("dark", args?.setColor); router.push(`${window.location.pathname}`); args?.setMode(!args?.mode) }}
                  id="theme-toggle"
                  type="button"
                  className="text-gray-500  bg-gray-100  focus:outline-none focus:ring-4 Focus:ring-gray-200  rounded-lg text-sm p-2.5">

                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                    ></path> </svg></button>
                :
                <button onClick={() => { args?.Sec("light", args?.setColor); router.push(`${window.location.pathname}`); args?.setMode(!args?.mode) }}
                  id="theme-toggle"
                  type="button"
                  className="text-gray-400 bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700 rounded-lg text-sm 
              p-2.5">
                  <svg

                    className=" w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg> </button>}

            </div>


            <button onClick={() => { setFlag(!flag) }}
              className="bg-cyan-600 bg-opacity-100  flex float-right ml-5 text-white 
  hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-semibold rounded-full
  rounded-lg text-sm mr-8 px-3 py-3 text-center " type="button">
              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="26px" viewBox="0 0 24 24" width="26px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none" /></g><g><g><path d="M4,18v-0.65c0-0.34,0.16-0.66,0.41-0.81C6.1,15.53,8.03,15,10,15c0.03,0,0.05,0,0.08,0.01c0.1-0.7,0.3-1.37,0.59-1.98 C10.45,13.01,10.23,13,10,13c-2.42,0-4.68,0.67-6.61,1.82C2.51,15.34,2,16.32,2,17.35V20h9.26c-0.42-0.6-0.75-1.28-0.97-2H4z" /><path d="M10,12c2.21,0,4-1.79,4-4s-1.79-4-4-4C7.79,4,6,5.79,6,8S7.79,12,10,12z M10,6c1.1,0,2,0.9,2,2s-0.9,2-2,2 c-1.1,0-2-0.9-2-2S8.9,6,10,6z" /><path d="M20.75,16c0-0.22-0.03-0.42-0.06-0.63l1.14-1.01l-1-1.73l-1.45,0.49c-0.32-0.27-0.68-0.48-1.08-0.63L18,11h-2l-0.3,1.49 c-0.4,0.15-0.76,0.36-1.08,0.63l-1.45-0.49l-1,1.73l1.14,1.01c-0.03,0.21-0.06,0.41-0.06,0.63s0.03,0.42,0.06,0.63l-1.14,1.01 l1,1.73l1.45-0.49c0.32,0.27,0.68,0.48,1.08,0.63L16,21h2l0.3-1.49c0.4-0.15,0.76-0.36,1.08-0.63l1.45,0.49l1-1.73l-1.14-1.01 C20.72,16.42,20.75,16.22,20.75,16z M17,18c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S18.1,18,17,18z" /></g></g></svg>

            </button>
          </div>

          <div className="ml-auto mr-0 flex justify-end ">
            <div id="dropdownInformation" className={flag === true ? `${args?.color?.whitebackground} absolute z-10 w-44 rounded divide-y divide-gray-100 shadow ` : 'hidden'}>
              <div className={`${args?.color?.text} py-3 px-4 text-sm `}>
                <div className='capitalize'>{currentLogged?.name}</div>
                <div className="font-medium truncate">{currentLogged?.email}</div>
              </div>
              <ul className={`${args?.color?.crossbg} py-1 text-sm`} >
                <li>
                  <Link href={"./userprofilesettings"}>
                    <a href="#" className={`${args?.color?.sidebar} block py-2 px-4  ${args?.color?.footerhover}`}>
                      {language?.userprofile}</a></Link>
                </li>
                <li>
                  <a className={`${args?.color?.sidebar} block py-2 px-4 ${args?.color?.footerhover}`}>
                    <button onClick={() => {
                      router.push("/");
                      localStorage.removeItem("property");
                      localStorage.removeItem("Signin Details");
                      //localStorage.clear();
                    }} >
                      {language?.signout}</button></a>
                </li>
              </ul>

            </div></div>
        </div>

      </nav>

      {/** Sidebar for small screens **/}
      <div className={smSidebar === true ? "block" : "hidden"}>
        <aside className="fixed lg:hidden z-20 h-full top-0 left-0 pt-16 flex sm:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
         <SidebarMenu color={args?.color} Primary={args?.Primary} language={language} Type={args?.Type}/>
        </aside>
      </div>
    </div>
  )
}

export default Navbar