import React, { useEffect, useState } from "react";
import {english,french,arabic} from "./Languages/Languages"
import SidebarMenu from "./utils/SidebarMenu";
var language;

const Sidebar = (args) => {
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
      }
    }
    firstfun();

  }, [])

  return (
    <div
      id="sidebar"
      className="hidden  fixed z-20 h-full 
      top-0 left-0 pt-16  lg:flex flex-shrink-0 flex-col w-64 
      transition-width duration-75"
      aria-label="Sidebar"
    >
      <SidebarMenu  color={args?.color} Primary={args?.Primary} language={language} Type={args?.Type}/>
    </div>
  );
};
export default Sidebar;
