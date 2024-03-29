import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { english, french, arabic } from "../../components/Languages/Languages"
import Title from '../../components/title';
import { ToastContainer, toast } from "react-toastify";
import Button from "../../components/Button";
import "react-toastify/dist/ReactToastify.css";
import { InitialActions, ColorToggler } from "../../components/initalActions";
import { Messages, PageHead,handlecheckbox } from '../../components/Inbox';
import LineLoader from '../../components/loaders/lineloader';
import Modal from "../../components/NewTheme/modal"
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

    // runs at load time
    useEffect(() => {
        const resp = InitialActions({ setColor, setMode })
        language = resp?.language;
        currentLogged = resp?.currentLogged;
        currentProperty = resp?.currentProperty;
        if (JSON.stringify(currentLogged) === 'null') {
            router?.push(window.location.origin)
        }
        else {
            fetchInboxDetails();
        }

    }, [])


    // get inbox messages of current property
    const fetchInboxDetails = async () => {
        const url = `/api/inbox/${currentProperty.property_id}`;
        axios.get(url)
            .then((response) => {
                setInboxDetails(response?.data);
                var msg = [];
                response?.data.map(i => {
                    if (i.parent_message_id === "" || undefined || null || "none") {
                        msg.push(i)
                    }
                    setMessagesFiltered(msg)
                });
                console.log("url  to fetch property messages hitted success.");
                setVisible(1)
            })
            .catch((error) => { console.log("url to fetch property messages, failed.") });
    }

    const displayData = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return messagesFiltered.slice(start, start + itemsPerPage);
    }, [page, messagesFiltered, itemsPerPage]);

    function ItemShow(event) {
        setItemsPerPage(event.target.value);
    }

    // function read message
    const readMessage = (props) => {
        if (props?.is_read == false) {
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
        if (props?.is_starred == false) {
            msg = "API: Message starred success"
        }
        if (props.is_starred == true) {
            msg = "API: Message unstarred success"
        }
        const final_data = {
            "message_id": props.message_id,
            "is_starred": !props?.is_starred
        }
        const url = '/api/inbox'
        axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
            ((response) => {
                toast.success(msg, {
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
        const data = checked?.map((item) => { return ({ message_id: item }) })
        setSpinner(1);
        const finalContact = { messages: data };
        axios
            .post(`/api/deleteall/messages`, finalContact, {
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

            <Header color={color} setColor={setColor} Primary={english?.Side} Type={currentLogged?.user_type} Sec={ColorToggler} mode={mode} setMode={setMode} />
            <Sidebar color={color} setColor={setColor} Primary={english?.Side} Type={currentLogged?.user_type} />

            <div id="main-content" className={`${color?.whitebackground} min-h-screen pt-20  relative overflow-y-auto lg:ml-64`}>
                {/* page header  */}
                
                <PageHead color={color} ItemShow={ItemShow} setPage={setPage} page={page} itemsPerPage={itemsPerPage} messagesFiltered={messagesFiltered}
                allDelete={allDelete} handlecheckbox={handlecheckbox} setMessagesFiltered={setMessagesFiltered}/>
                

                {/* list of meesages */}
                <div className={`hover:${color?.tableheader} divide-y mt-1.5 whitespace-nowrap border-t border-gray-200`}></div>
                
                {messagesFiltered.length===0? 
                <LineLoader/> :
                <Messages readMessage={readMessage} displayData={displayData} handlecheckbox={handlecheckbox} messagesFiltered={messagesFiltered} setMessagesFiltered={setMessagesFiltered} starMessage={starMessage} color={color}/>}

                {/* Delete messages */}
                <div className={deleteMultiple === 1 ? 'block' : 'hidden'}>
                    <Modal
                    setShowModal={() => setDeleteMultiple(0)}
                    description={<div className="p-6 pt-0 text-center">
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

                </div>}/>
                   
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