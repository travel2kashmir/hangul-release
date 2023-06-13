import React, { useEffect, useState } from "react";
import DarkModeLogic from "./darkmodelogic";
import DarkModeToggle from "./darkmodetoggle";
import english from "./Languages/en";
import french from "./Languages/fr";
import arabic from "./Languages/ar";
import Link from 'next/link'
var language;


const UserProfileSidebar = (args) => {
  const [darkModeSwitcher, setDarkModeSwitcher] = useState()
  const [userProfile, setUserProfile] = useState(false)
  const [color, setColor] = useState({})
  const [modeChanger, setModeChanger] = useState("")
  const [colorMode, setColorMode] = useState(false)
  const [colorToggle, setColorToggle] = useState("")

  useEffect(() => {
    firstfun();

  }, [])

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
    }
  }



  return (
    <div
      id="sidebar"
      className="hidden  fixed z-20 h-full 
      top-0 left-0 pt-16  lg:flex flex-shrink-0 flex-col w-64 
      transition-width duration-75"
      aria-label="Sidebar"
    >
      <div className={`${args?.color?.whitebackground} relative flex-1 flex flex-col min-h-0 border-r border-gray-200  pt-0`}>
        <div className="flex-1 flex flex-col  pb-4 overflow-y-auto">
          <div className={`${args?.color?.whitebackground}  flex-1 py-4 px-3 divide-y space-y-1`}>
            <ul className="space-y-2 pb-2">
              <li>
                <form action="#" method="GET" className="lg:hidden">
                  <label htmlFor="mobile-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div
                      className="absolute inset-y-0 left-0 pl-3 flex items-center 
                       pointer-events-none"
                    ></div>
                  </div>
                </form>
              </li>
              <li className={`${args?.color?.text} ${args?.color?.sidebar} group text-base font-normal rounded-lg flex items-center p-2`}>
                <svg
                  className={`w-6 h-6 ${args?.color?.textgray} flex-shrink-0  ${args?.color?.iconhover} transition duration-75`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                    clipRule="evenodd"
                  ></path>
                </svg>

                <span className="ml-3">
                  <Link href={"./landing"}><a>{language?.listofproperties}</a></Link></span>
              </li>

              <li onClick={() => { setUserProfile(!userProfile); }} className={`${args?.color?.text} ${args?.color?.sidebar} group text-base font-normal rounded-lg flex items-center p-2 `}>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className={`w-6 h-6 ${args?.color?.textgray} flex-shrink-0 ${args?.color?.iconhover} transition duration-75  `}
                  fill="currentColor"
                  viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>

                <span className="ml-3 flex-1 whitespace-nowrap">
                  <Link href={"./userprofilesettings"}><a>{language?.userprofile}</a></Link>
                </span>
              </li>

              {/** Drop down example **/}
              <li>
                <button type="button" onClick={() => { setColorMode(!colorMode) }}
                  className={`${args?.color?.text} ${args?.color?.sidebar} group  rounded-lg flex items-center p-2 
            w-full p-2 text-base font-normal  transition duration-75`} >
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24"
                    className={`w-6 h-6 ${args?.color?.textgray} flex-shrink-0  ${args?.color?.iconhover} transition duration-75`}
                    fill="currentColor"><g><rect fill="none" height="24" width="24" /></g><g><g><g><g><path d="M12,22C6.49,22,2,17.51,2,12S6.49,2,12,2s10,4.04,10,9c0,3.31-2.69,6-6,6h-1.77c-0.28,0-0.5,0.22-0.5,0.5 c0,0.12,0.05,0.23,0.13,0.33c0.41,0.47,0.64,1.06,0.64,1.67C14.5,20.88,13.38,22,12,22z M12,4c-4.41,0-8,3.59-8,8s3.59,8,8,8 c0.28,0,0.5-0.22,0.5-0.5c0-0.16-0.08-0.28-0.14-0.35c-0.41-0.46-0.63-1.05-0.63-1.65c0-1.38,1.12-2.5,2.5-2.5H16 c2.21,0,4-1.79,4-4C20,7.14,16.41,4,12,4z" /><circle cx="6.5" cy="11.5" r="1.5" /><circle cx="9.5" cy="7.5" r="1.5" /><circle cx="14.5" cy="7.5" r="1.5" /><circle cx="17.5" cy="11.5" r="1.5" /></g></g></g></g></svg>

                  <span className="flex-1 ml-3 text-left whitespace-nowrap" >{language?.colorscheme}</span>
                  <svg sidebar-toggle-item className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
                <div className={colorMode === true ? 'block' : 'hidden'}>
                  <ul className="py-2 space-y-2">

                    <li onClick={() => args?.Sec("system")} className={
                      args?.colorToggle == "" || args?.colorToggle === undefined || args?.colorToggle === null || args?.colorToggle === "system" ?
                      `${args?.color?.text}  text-base cursor-pointer font-bold rounded-lg flex items-center p-2 pl-11`:
                      `${args?.color?.text}  text-base font-normal cursor-pointer rounded-lg flex items-center p-2 pl-11`}>
                      <svg xmlns="http://www.w3.org/2000/svg"  
                        className={`w-4 h-4 mr-2 ${args?.color?.textgray} flex-shrink-0 ${args?.color?.iconhover} transition duration-75`}
                      viewBox="0 0 24 24"  fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>
                      <a>{language?.systemprefrences}</a></li>

                    <li onClick={() => args?.Sec("light")} className={
                    args?.colorToggle == "false" ?
                    `${args?.color?.text} ${args?.color?.sidebar} group text-base font-bold cursor-pointer  rounded-lg flex items-center p-2 pl-11`:
                    `${args?.color?.text} ${args?.color?.sidebar} group text-base font-normal cursor-pointer
                     rounded-lg flex items-center p-2 pl-11`}>
                    <svg
                    id="theme-toggle-light-icon"
                    className={`w-4 h-4 mr-2 ${args?.color?.textgray} flex-shrink-0 ${args?.color?.iconhover} transition duration-75 `}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg> 
                      <a>{language?.lightmode}</a>
                    </li>
                    <li onClick={() => args?.Sec("dark")} className={args?.colorToggle == "true" ?
                    `${args?.color?.text} ${args?.color?.sidebar} group text-base font-bold cursor-pointer rounded-lg flex items-center p-2 pl-11`:
                    `${args?.color?.text} ${args?.color?.sidebar} group text-base font-normal cursor-pointer
                     rounded-lg flex items-center p-2 pl-11`}>
                     
                  <svg 
                    id="theme-toggle-dark-icon "
                    className={`w-4 h-4 mr-2 ${args?.color?.textgray} flex-shrink-0 ${args?.color?.iconhover} transition duration-75  `}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                    ></path> </svg>
                      <a>{language?.darkmode}</a>
                    </li>

                  </ul>
                  </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfileSidebar;
