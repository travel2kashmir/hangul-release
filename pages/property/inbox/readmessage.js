import React, { useState, useEffect } from 'react';
import colorFile from '../../../components/colors/Color';
import Router from 'next/router';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import english from "../../../components/Languages/en"
import french from "../../../components/Languages/fr"
import arabic from "../../../components/Languages/ar";
import { InitialActions, ColorToggler } from "../../../components/initalActions";
import { useRouter } from "next/router";
import Title from '../../../components/title';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Message, PageHead, Reply } from '../../../components/Inbox/ReadMessage';
var language;
var currentLogged;
let colorToggle;
let currentMessage;
let currentProperty;
let currentUser;
let i = 0;


function ReadMessage() {
    const router = useRouter();
    const [mode, setMode] = useState()
    const [color, setColor] = useState({})
    const [reply, setReply] = useState(false)
    const [messageDetails, setMessageDetails] = useState([]);
    const [replyMessage, setReplyMessage] = useState([]);
    const [emojiState, setEmojiState] = useState(false);
    const [flag, setFlag] = useState([]);
    const [image, setImage] = useState();
    const [multipleImages, setMultipleImages] = useState([]);

    // runs at load time
    useEffect(() => {
        const resp = InitialActions({ setColor, setMode })
        language = resp?.language;
        currentLogged = resp?.currentLogged;
        currentProperty = resp?.currentProperty;
        currentUser = JSON.parse(localStorage.getItem("user"));
        currentMessage = localStorage.getItem("MessageId")
        if (JSON.stringify(currentLogged) === 'null') {
            router?.push(window.location.origin)
        }
        else {
            fetchInboxDetails();
        }

    }, [])


    const inbox = () => {
        Router.push("../inbox")
    }
    /* Function call to fetch Current Property Details when page loads */
    useEffect(() => {
        fetchInboxDetails();
    }, []);

    // Get inbox messages of current message
    const fetchInboxDetails = async () => {
        const url = `/api/inbox/${currentMessage}`;
        axios.get(url)
            .then((response) => {
                setMessageDetails(response?.data?.messages);
                console.log("url  to fetch message details hitted success.")
            })
            .catch((error) => { console.log("url to fetch message details, failed.") });
    }

    /*   Function */
    const submitReply = () => {
        if (flag === 1) {
            var k = new Date()
            var day = k.getDate();
            var month = k.getMonth() + 1
            k.getFullYear()
            var year = k.getFullYear()
            var hr = k.getHours()
            var min = k.getMinutes()
            var sec = k.getSeconds()
            var msec = k.getMilliseconds()
            var currentDateTime = `${year}-${month}-${day} ${hr}:${min}:${sec}.${msec}`;

            const final_data = {
                "property_id": currentProperty?.property_id,
                "sender_name": currentLogged?.name,
                "sender_email": currentLogged?.email,
                "message_subject": messageDetails?.[i]?.message_subject,
                "message": replyMessage?.message,
                "parent_message_id": messageDetails?.[i]?.message_id,
                "created_on": currentDateTime,
                "is_read": false,
                "is_starred": false,
                "is_deleted": false
            }
            const url = '/api/inbox'
            axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
                ((response) => {
                    toast.success("API: Reply sent successfully!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    router.push("./readmessage");
                    setReplyMessage([])
                    setFlag([]);
                    fetchInboxDetails();
                    router.push('./readmessage');
                    setReply(false)
                })
                .catch((error) => {
                    toast.error("API: Reply sent error!", {
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

    }

    const imageTemplate = {
        image_link: '',
        image_title: ''
    }

    // Images Mapping
    const [imageData, setImageData] = useState([imageTemplate]?.map((i, id) => { return { ...i, index: id } }))



    const addPhotos = () => {
        setImageData([...imageData, imageTemplate]?.map((i, id) => { return { ...i, index: id } }))
    }

    return (
        <>
            <Title name={`Engage |  ${language?.inbox}`} />
            <Header color={color} setColor={setColor} Primary={english?.Side1} Type={currentLogged?.user_type} Sec={ColorToggler} mode={mode} setMode={setMode} />
            <Sidebar color={color} setColor={setColor} Primary={english?.Side1} Type={currentLogged?.user_type} />

            <div id="main-content" className={`${color?.whitebackground} min-h-screen pt-24  relative overflow-y-auto lg:ml-64`}>
                <PageHead color={color} inbox={inbox} messageDetails={messageDetails} />

                <div className='hover:bg-gray-100 divide-y mt-2  border-t border-gray-200'></div>

                <div className={`${color?.greybackground}  px-4 `} >
                    <h1 className={`text-xl py-6 sm:text-2xl font-semibold ${color?.tabletext}`}>{messageDetails?.[i]?.message_subject}</h1>
                    {messageDetails?.map((item, idx) => (
                        <Message item={item} color={color} key={idx} />))}
                </div>

                <div className='hover:bg-gray-100 divide-y  border-t border-gray-200'></div>
                <div className='flex space-x-3 items-center px-4 my-3'>
                    <a href="#replymessage">
                        <button data-testid="test-reply-button" onClick={() => { setReply(true) }} className="sm:inline-flex  text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-semibold rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                            <span className='mr-3'>
                                Reply</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white flex-shrink-0 transition duration-75" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z" /></svg>
                        </button></a>
                    {/* optional button of cancel when user is intended to send reply  */}
                    {reply === true &&
                        <button type="button" onClick={() => { setReply(false); setEmojiState(false) }} data-modal-toggle="delete-user-modal" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                            <svg className="w-5 h-5  mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd">
                            </path></svg>
                            Cancel
                        </button>
                    }

                </div>

                {reply === true &&
                    <Reply submitReply={submitReply} color={color} messageDetails={messageDetails} setImageData={setImageData} imageData={imageData} setFlag={setFlag} replyMessage={replyMessage} setReplyMessage={setReplyMessage} emojiState={emojiState} setEmojiState={setEmojiState} />}

                <div className='px-12'>
                    {emojiState === true ?
                        <EmojiPicker /> : <></>}
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

export default ReadMessage