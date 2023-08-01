import React, { useState, useEffect, useMemo } from 'react';
import colorFile from '../../components/colors/Color';
import { useRouter } from "next/router";
// import Link from "next/link";
import axios from 'axios';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import english from "../../components/Languages/en"
import french from "../../components/Languages/fr"
import arabic from "../../components/Languages/ar";
import Title from '../../components/title';
const logger = require("../../services/logger");
import { ToastContainer, toast } from "react-toastify";
import Button from "../../components/Button";
import "react-toastify/dist/ReactToastify.css";
var language;
var currentLogged;
let colorToggle;
let currentProperty;
var checked = [];

function Inbox() {
    const router = useRouter();
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [color, setColor] = useState({})
    const [mode, setMode] = useState()
    const [inboxDetails, setInboxDetails] = useState([]);
    const [messagesFiltered, setMessagesFiltered] = useState([]);
    const [deleteMultiple, setDeleteMultiple] = useState(0);
    const [spinner, setSpinner] = useState(0)

    useEffect(() => {
        firstfun();
    }, [])

    // function on page load
    const firstfun = () => {
        if (typeof window !== 'undefined') {
            var locale = localStorage.getItem("Language");
            colorToggle = localStorage.getItem("colorToggle");

            if (colorToggle === "" || colorToggle === undefined || colorToggle === null || colorToggle === "system") {
                window.matchMedia("(prefers-color-scheme:dark)").matches === true ?
                    setColor(colorFile?.dark) : setColor(colorFile?.light);
                setMode(window.matchMedia("(prefers-color-scheme:dark)").matches === true ? true : false);
            }
            else if (colorToggle === "true" || colorToggle === "false") {
                setColor(colorToggle === "true" ? colorFile?.dark : colorFile?.light);
                setMode(colorToggle === "true" ? true : false)

            }
            {
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
            /** Current Property Details fetched from the local storage **/
            currentProperty = JSON.parse(localStorage.getItem("property"));
            currentLogged = JSON.parse(localStorage.getItem("Signin Details"));

        }
    }

    /* Function call to fetch Current Property Details when page loads */
    useEffect(() => {
        if (JSON.stringify(currentLogged) === 'null') {
            router?.push(window.location.origin)
        }
        else {
            fetchInboxDetails();
        }

    }, []
    );

    // get inbox messages of current property
    const fetchInboxDetails = async () => {
        const url = `/api/inbox/${currentProperty.property_id}`;
        axios.get(url)
            .then((response) => {
                setInboxDetails(response?.data);
                var msg = [];
              response?.data.map(i => {

            if (i.parent_message_id === "" || undefined || null || "none")
           
              {
                msg.push(i)
              }
              
          setMessagesFiltered(msg)
        });
                logger.info("url  to fetch property messages hitted success.");
                setVisible(1)
            })
            .catch((error) => { logger.error("url to fetch property messages, failed.") });
    }

    const displayData = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return messagesFiltered.slice(start, start + itemsPerPage);
    }, [page, messagesFiltered, itemsPerPage]);

    // color toggle function
    const colorToggler = (newColor) => {
        if (newColor === 'system') {
            window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark)
                : setColor(colorFile?.light)
            localStorage.setItem("colorToggle", newColor)
        }
        else if (newColor === 'light') {
            setColor(colorFile?.light)
            localStorage.setItem("colorToggle", false)
        }
        else if (newColor === 'dark') {
            setColor(colorFile?.dark)
            localStorage.setItem("colorToggle", true)
        }
        firstfun();
        router.push('./inbox')
    }

    function ItemShow(event) {
        setItemsPerPage(event.target.value);
    }

    // function read message
    const readMessage = (props) => {
      if(props?.is_read == false){
        const final_data = {
            "message_id": props.message_id,
            "is_read": true
        }
        const url = '/api/inbox'
        axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
            ((response) => {
                toast.success("API: Message read success.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((error) => {
                toast.error("API: Message read error!", {
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
        localStorage.setItem("MessageId", (props.message_id));
        router.push("./inbox/readmessage")
    }

    // function star message
    const starMessage = (props) => {
        let msg;
        if(props?.is_starred == false){
            msg = "API: Message starred success"
        }
        if(props.is_starred == true){
            msg = "API: Message unstarred success"
        }
        const final_data = {
            "message_id": props.message_id,
            "is_starred": !props?.is_starred
        }
        const url = '/api/inbox'
        axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
            ((response) => {
                toast.success( msg, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
               
               fetchInboxDetails();
               router.push('./inbox')
            })
            .catch((error) => {
                toast.error("API:  Message starred error.", {
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

    // Checkboxes logic for single or multi delete
    const handlecheckbox = (e) => {
        console.log(e.target)
        const { name, checked } = e.target;
        if (name === "allSelect") {
            let tempCon = messagesFiltered.map((item) => {
                return { ...item, isChecked: checked }
            });
            setMessagesFiltered(tempCon)
        }
        else {
            let tempCon = messagesFiltered.map((item) =>
                item.message_id === name ? { ...item, isChecked: checked } : item
            );
            setMessagesFiltered(tempCon)
        }

    }

    // Multi delete
    const allDelete = async () => {
        checked = [];
        checked = messagesFiltered.filter(i => i.isChecked === true).map(j => { return (j.message_id) })
        if (checked?.length > 0) {
            setDeleteMultiple(1);
        }
        else {
            toast.warn("No messages selected", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

/* Function Add Messages */
 function deleteAll() {
   const data = checked?.map((item)=>{return ({message_id:item})})
    setSpinner(1);
       const finalContact = { messages: data };
       axios
         .post(`/api/deleteall/messages`,finalContact, {
           headers: { "content-type": "application/json" },
         })
         .then((response) => {
           setSpinner(0)
           toast.success("API: Message delete success.", {
             position: "top-center",
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
           });
          
           setDeleteMultiple(0);
           fetchInboxDetails();
           router.push('./inbox')
         })
         .catch((error) => {
           setSpinner(0)
           toast.error("API: Messages add error.", {
             position: "top-center",
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
           });
           setDeleteMultiple(0);
          
         });
     
   
   }

    return (
        <>
            <Title name={`Engage |  ${language?.inbox}`} />

            <Header color={color} Primary={english?.Side} Type={currentLogged?.user_type} Sec={colorToggler} mode={mode} setMode={setMode} />
            <Sidebar color={color} Primary={english?.Side} Type={currentLogged?.user_type} />

            <div id="main-content" className={`${color?.whitebackground} min-h-screen pt-20  relative overflow-y-auto lg:ml-64`}>
                <div className={`${color?.whitebackground}  sticky pt-2 sm:flex items-center w-full sm:justify-between bottom-0 right-0 `}>

                    <div className="flex items-center justify-start space-x-1 pl-0 sm:pl-4  sm:mt-0">
                        <div>
                            <input id="checkbox-all"  checked={messagesFiltered?.filter(item => item?.isChecked !== true).length < 1}
                                                        onChange={(e) => { handlecheckbox(e); }}
                            aria-describedby="checkbox-1" type="checkbox" name="allSelect" className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"/>
                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                        </div>
                        <button data-tooltip="Delete" aria-label="Delete" onClick={allDelete} className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                        </span>
                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        </span>
                        <span className={`${color?.textgray} hover:${color?.text}  mr-2 cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                        </span>
                        {/* <div className="border-l mx-4  border-gray-200">
                            <button type="button" data-modal-toggle="add-user-modal" className="mx-4 w-1/2  text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-4 py-2 text-center sm:w-auto">
                                <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                <Link href="./inbox/composemessage"> Compose </Link>
                            </button>
                        </div> */}
                    </div>

                    <div className="flex items-center mr-2 mb-4 sm:mb-0">
                    <span className={`text-sm font-normal ${color?.textgray}`}>Entries per page</span>
                    <select onChange={(e) => ItemShow(e)} className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block mr-2 ml-2 w-12 px-1.5  py-2`}>
                        <option selected disabled>{itemsPerPage}</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                       
                        <a href="#" onClick={() => {
                        if (page > 1) {
                            setPage(page - 1);
                        }

                    }}
                        className={` ${color?.deltext}  hover:${color?.tabletext} cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center`}>
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                        <a onClick={() => {
                        if (page < Math.ceil(messagesFiltered?.length / itemsPerPage)) {
                            setPage(page + 1);

                        }
                    }} className={` ${color?.deltext}  hover:${color?.tabletext} cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2`}>
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                        <span className={` ${color?.deltext} text-sm font-normal text-gray-500`}>Showing <span className={` ${color?.deltext}text-gray-900 font-semibold">1-20</span> of <span className="text-gray-900 font-semibold`}> 
                        {page} of {Math.ceil(messagesFiltered.length / itemsPerPage)} pages</span>
                        </span>
                    </div>

                </div>

                <div className={`hover:${color?.tableheader} divide-y mt-1.5 whitespace-nowrap border-t border-gray-200`}></div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="align-middle inline-block min-w-full">
                            <div className="shadow overflow-hidden">
                                <table  data-testid="test_inbox_table" className="table-fixed min-w-full divide-y divide-gray-200">
                                    <tbody className="divide-y divide-gray-200 ">
                                        {displayData?.map((item, idx) => (
                                          
                                            <>
                                                <tr className={`hover:${color?.tableheader}`}>
                                                    <td className="px-4 py-3 w-4">
                                                        <div className="flex items-center">
                                                            <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox"
                                                            name={item?.message_id} checked={item.isChecked || false}
                                                                        onChange={(e) => { handlecheckbox(e); }}
                                                                        className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"/>
                                                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                                            {item?.is_starred == false ?
                                                            <svg onClick={() => starMessage(item)} xmlns="http://www.w3.org/2000/svg"
                                                                className={
                                                                    `w-6 h-6 mx-1 cursor-pointer hover:text-yellow-400 ${color?.textgray} flex-shrink-0  ${color?.iconhover} transition duration-75 `}
                                                                fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg>
                                                            :
                                                            <svg onClick={() => starMessage(item)} xmlns="http://www.w3.org/2000/svg"
                                                            className={
                                                                `w-6 h-6 mx-1 cursor-pointer text-yellow-400  flex-shrink-0  ${color?.iconhover} transition duration-75 `}
                                                            fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg>
                                                            }
                                                                </div>
                                                    </td>
                                                    {item?.is_read == false?
                                                    <>
                                                    <td onClick={() => readMessage(item)} className="px-2 py-3 flex items-center cursor-pointer whitespace-nowrap space-x-4  lg:mr-0">
                                                        <div className="flex-shrink-0 whitespace-nowrap">
                                                            <img className="h-6 w-6 rounded" src="/man.png" alt="avatar" />
                                                        </div>
                                                        
                                                        <div onClick={() => readMessage(item)} className={` 
                                                        text-md pr-6 font-semibold cursor-pointer whitespace-nowrap ${color?.tabletext} `}>
                                                            {item?.sender_name}
                                                        </div>

                                                    </td>
                                                    <td onClick={() => readMessage(item)} className={`${color?.tabletext} px-4 py-3 font-semibold space-x-2 cursor-pointer whitespace-nowrap`}> {item?.message_subject}...</td>
                                                    <td className={`${color?.tabletext} px-4 py-3 font-semibold whitespace-nowrap space-x-2 cursor-pointer`}>
                                                        {item?.created_on}
                                                    </td></>
                                                    :
                                                    <>
                                                     <td className="px-2 py-3 flex items-center cursor-pointer whitespace-nowrap space-x-4  lg:mr-0">
                                                     <div className="flex-shrink-0 whitespace-nowrap">
                                                         <img className="h-6 w-6 rounded" src="/man.png" alt="Neil image" />
                                                     </div>
                                                     
                                                     <div  onClick={() => readMessage(item)} className={` 
                                                     text-md pr-6 font-normal cursor-pointer whitespace-nowrap ${color?.tabletext} `}>
                                                         {item?.sender_name}
                                                     </div>

                                                 </td>
                                                 <td onClick={() => readMessage(item)} className={`${color?.tabletext} px-4 py-3 font-normal space-x-2 cursor-pointer whitespace-nowrap`}> {item?.message_subject}...</td>
                                                 <td  onClick={() => readMessage(item)} className={`${color?.tabletext} px-4 py-3 font-normal whitespace-nowrap space-x-2 cursor-pointer`}>
                                                     {item?.created_on}
                                                 </td></>}
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delete messages */}
                <div className={deleteMultiple === 1 ? 'block' : 'hidden'}>
                <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
                    <div className="relative w-full max-w-md px-4 h-full md:h-auto">
                        <div className={`rounded-lg shadow relative ${color?.whitebackground}`}>
                            <div className="flex justify-end p-2">
                                <button
                                    onClick={() => setDeleteMultiple(0)}
                                    type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="delete-user-modal">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                            </div>

                            <div className="p-6 pt-0 text-center">
                                <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <h3 className={`text-base font-normal ${color?.deltext} mt-5 mb-6`}>
                                    {language?.areyousureyouwanttodelete}
                                </h3>

                                {spinner === 0 ?
                                    <>
                                        <Button Primary={language?.Delete} onClick={() => { deleteAll() }} />
                                        <Button Primary={language?.Cancel} onClick={() => setDeleteMultiple(0)} />
                                    </>
                                    :
                                    <Button Primary={language?.SpinnerDelete} />}

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

        </>
    )
}

export default Inbox