import Sidebar from "../components/Sidebar";
import Head from "next/head";
import colorFile from "../components/colors/Color";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from 'axios';
import Link from "next/link";
import english from "../components/Languages/en"
import french from "../components/Languages/fr"
import arabic from "../components/Languages/ar"
import Router, { useRouter } from "next/router";
const logger = require("../services/logger");
import { ToastContainer, toast } from "react-toastify";
import Classic from "./themes/classic";
import ClassicDark from './themes/classic-dark'
import "react-toastify/dist/ReactToastify.css";
import { jsPDF } from "jspdf";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import useDownloader from "react-use-downloader";


var language;
var currentUser;
var currentProperty;
var currentLogged;
let colorToggle;

async function Pdfmaker({ size, elapsed, percentage, download,
    cancel, error, isInProgress }) {
    console.log("pdf maker on the job");
    import('html2canvas').then(html2canvas => {
        html2canvas.default(document.getElementById('themePage'))
            .then(canvas => {
                const doc = new jsPDF();
                doc.addImage(canvas, 'JPEG', 0, 0, 200, 300);
                doc.save('sample-file.pdf');
               
            }).catch(e => { console.log("load failed"); console.log(e) })
    })

}

function PdfPage() {
    /** State to store Current Property Details **/
    const [allHotelDetails, setAllHotelDetails] = useState([]);
    const [mode, setMode] = useState()
    const [color, setColor] = useState({})
    const [allRooms, setAllRooms] = useState({});
    const [allPackages, setAllPackages] = useState({});
    const [themes, setThemes] = useState(false)
    const [phone, setPhone] = useState({});
    const [services, setServices] = useState([]);
    const [email, setEmail] = useState({});
    const [themeName, setThemeName] = useState("")
    const [uri, setUri] = useState("")
    const [loc, setLoc] = useState()
    const [lang, setLang] = useState('en')
    const [visible, setVisible] = useState(0)
    var locale;
    const { size, elapsed, percentage, download,
        cancel, error, isInProgress } =
        useDownloader();
    /** Router for Redirection **/
    const router = useRouter();
    useEffect(() => {
        firstfun();
        router.push(window.location);
    }, [])

    const firstfun = () => {
        if (typeof window !== 'undefined') {
            locale = localStorage.getItem("Language");
            colorToggle = localStorage.getItem("colorToggle");
            if (colorToggle === "" || colorToggle === undefined || colorToggle === null || colorToggle === "system") {
                window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark) : setColor(colorFile?.light)
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
            currentUser = JSON.parse(localStorage.getItem("Signin Details"));
            /** Current Property Details fetched from the local storage **/
            currentProperty = JSON.parse(localStorage.getItem("property"));
            currentLogged = JSON.parse(localStorage.getItem("Signin Details"));
            setLoc(window.location.origin)
            setLang(locale)

        }
    }



    /* Function call to fetch Current Property Details when page loads */
    useEffect(() => {
        fetchHotelDetails();
        fetchRoomDetails();
        fetchPackageDetails();

    }, []);

    const fetchHotelDetails = async () => {
        const url = `/api/${currentProperty?.address_province.replace(
            /\s+/g,
            "-"
        )}/${currentProperty?.address_city}/${currentProperty?.property_category
            }s/${currentProperty?.property_id}`;
        axios.get(url)
            .then((response) => {
                setThemeName(response.data.theme)
                setAllHotelDetails(response.data);
                response.data.contacts.map(i => { if (i.contact_type === 'Phone') { setPhone(i) } });
                var ser = [];
                response.data.services.map(i => {
                    if (i.service_value !== "no")
                        if (i.service_value !== "Not available") {
                            {
                                ser.push(i)
                            }
                        }
                    setServices(ser)
                }

                );

                response.data.contacts.map(i => { if (i.contact_type === 'Email') { setEmail(i) } });
                logger.info("url  to fetch property details hitted successfully")
            })
            .catch((error) => { logger.error("url to fetch property details, failed") });
    }
    const fetchRoomDetails = async () => {
        const url = `/api/all_rooms_details/${currentProperty.property_id}`;
        axios.get(url)
            .then((response) => {
                setAllRooms(response.data);
                logger.info("url  to fetch room details hitted successfully")
            })
            .catch((error) => { logger.error("url to fetch property details, failed") });
    }

    const fetchPackageDetails = async () => {
        const url = `/api/all_packages_details/${currentProperty.property_id}`;
        axios.get(url)
            .then((response) => {
                setAllPackages(response.data);
                logger.info("url  to fetch package details hitted successfully")
            })
            .catch((error) => { logger.error("url to fetch package details, failed") });
    }

    const sendLink = () => {
        const data = {
            uuid: `${allHotelDetails?.property_name.replaceAll(' ', '-')}-${currentProperty?.address_city}`,
            property_id: currentProperty?.property_id,
            address_id: allHotelDetails.address[0].address_id,
            theme_id: theme,
            lang: localStorage?.getItem("Language")
        }

        axios.post('/api/property_page', data).then(
            (response) => {
                toast.success("Page Updated Successfully!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                initialtheme();
                Router.push("./theme");
            }).catch((error) => toast.error("Unique URL Update Error!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }))
    }
    const submitTheme = () => {
        const final_data = {
            "property_id": currentProperty?.property_id,
            "theme": themeName
        }
        const url = '/api/basic'
        axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
            ((response) => {
                toast.success("Theme updated successfully!", {
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

                toast.error("Theme Set Error!", {
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

    const changeTheme = (item) => {
        localStorage.setItem("ThemeName", item);
    }

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
        Router.push('./theme')
    }
    return (
        <>

            {/* Body */}
            <div id="main-content" className={`${color?.greybackground} relative overflow-y-auto`}>

                {/* Themes Selection*/}
                <div className={`flex px-4 bg-gray-300`} >
                    <h6 className={`${color?.text} text-xl font-bold mt-2 mb-4`}>
                        Themes
                    </h6>
                    {/* Header */}
                    <div className="flex items-center justify-end space-x-1  sm:space-x-2 ml-auto">
                        <div>

                            <button onClick={() => { setThemes(!themes) }} className={`text-cyan-600 text-xs ${color?.whitebackground} hover:${color?.greybackground} 
                     border font-semibold rounded-lg  pr-2 py-2 
                         text-center inline-flex items-center`}
                                type="button">
                                <span className="flex items-center">
                                    <span className="h-2.5 w-2.5 capitalize rounded-full mx-1 bg-green-400"></span>
                                    <span className="mr-0.5">  {themeName}</span>
                                    <svg className=" w-4 h-4 px-0.5" aria-hidden="true" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" stroke-Linejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </span> </button>
                            <div className={themes === true ? 'block' : 'hidden'}>
                                <div className={`z-10 w-40 fixed rounded ${color?.greybackground} overflow-hidden divide-y divide-gray-100 shadow`}>
                                    <ul className={`py-1 text-sm ${color?.text}`} aria-labelledby="dropdownDefault">
                                        <li className={`block py-2 px-4 ${color?.sidebar} `}>
                                            <button onClick={() => { setThemeName("Classic"); setThemes(!themes); changeTheme("Classic") }} >Classic</button>
                                        </li>
                                        <li className={`block py-2 px-4 ${color?.sidebar} `}>
                                            <button onClick={() => { setThemeName("Classic-Dark"); setThemes(!themes); changeTheme("Classic-Dark") }} >Classic-Dark</button>
                                        </li>
                                    </ul>
                                </div></div>
                        </div>
                        <div>
                            <button
                                className="bg-cyan-600 text-sm text-center hover:bg-cyan-700 text-white  py-2 px-4 rounded" onClick={() => {
                                    submitTheme();
                                }}
                            >Save</button>

                            <button
                                onClick={() => Pdfmaker({
                                    size, elapsed, percentage, download,
                                    cancel, error, isInProgress
                                })}
                                className="mx-4 bg-cyan-600 text-sm text-center hover:bg-cyan-700 text-white  py-2 px-4 rounded"
                            >Download PDF</button>
                        </div>

                        <div className="flex hover:underline py-2 hover:decoration-cyan-600">
                            <svg className="h-6 w-6 pt-1 flex-none stroke-sky-500" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M17.25 10c0 1-1.75 6.25-7.25 6.25S2.75 11 2.75 10 4.5 3.75 10 3.75 17.25 9 17.25 10Z"></path><circle cx="10" cy="10" r="2.25"></circle></svg>
                            <button className=" text-base text-center text-cyan-600 mr-2  rounded"
                            >
                                <Link href={
                                    `${loc}/${lang}/${currentProperty?.address_province.replace(
                                        /\s+/g,
                                        "-"
                                    )}/${currentProperty?.address_city}/${currentProperty?.property_category
                                    }s/${allHotelDetails?.property_name?.replaceAll(' ', '-')?.toLowerCase()}`
                                }>
                                    <a target="_blank">Preview </a>
                                </Link>
                            </button>

                        </div>

                    </div>
                </div>
            </div>
            <p  > hello i want this in ppt</p>

            <div id='themePage'>

                {/* Classic Theme */}
                {themeName === "Classic" ?
                    <div className="sticky">
                        <Classic language={language} allHotelDetails={allHotelDetails}
                            allRooms={allRooms} allPackages={allPackages} services={services}
                            phone={phone} email={email} /></div> : <div className="sticky"></div>}

                {/* Classic Dark */}
                {themeName === "Classic-Dark" ?
                    <div className="sticky">
                        <ClassicDark language={language} allHotelDetails={allHotelDetails}
                            allRooms={allRooms} allPackages={allPackages} services={services}
                            phone={phone} email={email} /></div> : <div className="sticky"></div>}


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
        </>

    );
}
export default PdfPage