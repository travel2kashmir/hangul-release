import React, { useEffect, useState } from 'react';
import validateAdditionalServicesEdit from '../../components/validation/additionalservices/additionalservicesedit';
import LoaderDarkTable from "../../components/loaders/darktableloader";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import LoaderTable from "../../components/loadertable";
import Table from '../../components/Table';
import Button from "../../components/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import objChecker from "lodash"
import { english, french, arabic } from "../../components/Languages/Languages";
import { InitialActions, ColorToggler } from "../../components/initalActions";
import { fetchAdditionalServices, fetchHotelDetails, navigationList, validationAdditionalServices } from '../../components/logic/property/AdditionalServices'
import Router from 'next/router';
import BreadCrumb from '../../components/utils/BreadCrumb';
import Modal from "../../components/NewTheme/modal";
import { AddAdditionalService } from '../../components/AdditionalServices';

var language;
var currentProperty;
var currentLogged;
let colorToggle;
function AdditionalServices() {
    const [visible, setVisible] = useState(0);
    const [spinner, setSpinner] = useState(0)
    const [additionalServices, setAdditionalServices] = useState({})
    const [error, setError] = useState({})
    const [color, setColor] = useState({})
    const [mode, setMode] = useState()
    const [services, setServices] = useState([])
    const [flag, setFlag] = useState([])
    const [view, setView] = useState(0);
    const [modified, setModified] = useState([])
    const [add, setAdd] = useState(0)
    const [gen, setGen] = useState([])
    const [gene, setGene] = useState([])

    // runs at load time
    useEffect(() => {
        const resp = InitialActions({ setColor, setMode })
        language = resp?.language;
        currentLogged = resp?.currentLogged;
        currentProperty = resp?.currentProperty;
        colorToggle = resp?.colorToggle
        if (JSON.stringify(currentLogged) === 'null') {
            Router.push(window.location.origin)
        }
        else {
            fetchAdditionalServices(currentProperty, setAdditionalServices, setGene, setVisible);
            fetchHotelDetails(currentProperty, setServices, setGen, setVisible);

        }
    }, [])

    /* Function to edit additional services */
    const editAdditionalServices = (props, noChange) => {
        if (objChecker.isEqual(props, noChange)) {
            toast.warn('No change in  Additional Services detected. ', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            var result = validateAdditionalServicesEdit(props)
            if (result === true) {

                const final_data = {
                    "add_service_id": props.id,
                    "add_service_name": props.name,
                    "property_id": currentProperty.property_id,
                    "add_service_comment": props?.type,
                    "status": props.status
                }
                const url = '/api/additional_services'
                axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
                    ((response) => {
                        toast.success("Additional Services Updated Successfully!", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        fetchAdditionalServices(currentProperty, setAdditionalServices, setGene, setVisible);
                        Router.push("./additionalservices");
                        setModified([])
                    })
                    .catch((error) => {
                        toast.error("Additional Services Update Error!", {
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
            else {
                toast.warn(result?.name, {
                    position: "top-center",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                toast.warn(result?.type, {
                    position: "top-center",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }

    /* Function to delete additional services */
    const deleteAdditionalServices = (props) => {
        const url = `/api/additional_service/${props}`
        axios.delete(url).then((response) => {
            toast.success(("Additional Service Deleted Successfully!"), {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fetchAdditionalServices(currentProperty, setAdditionalServices, setGene, setVisible);
            Router.push('./additionalservices')
        })
            .catch((error) => {
                toast.error(("Additional Service Delete Error!"), {
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

    return (
        <>
            <Header
                color={color}
                setColor={setColor}
                Primary={english?.Side}
                Type={currentLogged?.user_type}
                Sec={ColorToggler}
                mode={mode}
                setMode={setMode}
            />

            <Sidebar
                color={color}
                Primary={english?.Side}
                Type={currentLogged?.user_type}
            />

            <div id="main-content" className={`${color?.whitebackground} min-h-screen pt-24 relative overflow-y-auto lg:ml-64`}>

                {/* bread crumb */}
                <BreadCrumb
                    color={color}
                    crumbList={navigationList(currentLogged, currentProperty)}
                />
                
                {visible === 0 && colorToggle === "false" &&<LoaderTable />}
                {visible === 0 && colorToggle === "true" && <LoaderDarkTable />}
                {visible === 1 &&
                    <Table gen={gene} setGen={setGene} add={() => setView(1)} name="Additional Services"
                        edit={editAdditionalServices} color={color}
                        delete={deleteAdditionalServices}
                        common={language?.common} cols={language?.AdditionalServicesCols} />
               }



                {/* Modal Add */}
                <div className={view === 1 ? 'block' : 'hidden'}>
                    <Modal
                    title={`${language?.add} ${language?.new} ${language?.service}`}
                    description={<AddAdditionalService 
                        color={color} setModified={setModified} modified={modified} error={error} setError={setError} language={language} spinner={spinner} setSpinner={setSpinner} flag={flag} setFlag={setFlag}
                        validationAdditionalServices={validationAdditionalServices} setAdditionalServices={setAdditionalServices} setView={setView} 
                        currentProperty={currentProperty} setGene={setGene} setVisible={setVisible} Router={Router}/>}
                    setShowModal={(e)=>{document.getElementById('asform').reset();
                    setError({})
                    setModified([])
                    setView(e);}}
                    />
                  
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
        </>)
}
export default AdditionalServices
AdditionalServices.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}
