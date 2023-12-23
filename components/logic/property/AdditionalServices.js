import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validateAdditionalServices from '../../validation/additionalservices/additionalservicesadd';

export async function fetchAdditionalServices(currentProperty, setAdditionalServices, setGene, setVisible) {
    var geneData = [];
    const url = `/api/additional_services/${currentProperty.property_id}`
    axios.get(url)
        .then((response) => {
            setAdditionalServices(response.data);
            console.log("url  to fetch additional services hitted successfully")

            {
                response.data?.map((item) => {
                    var temp = {
                        name: item.add_service_name,
                        type: item.add_service_comment,
                        status: item.status,
                        id: item.add_service_id
                    }
                    geneData.push(temp)
                })
                setGene(geneData);
                setVisible(1);
            }

        })
        .catch((error) => { console.log("url to fetch additional services, failed") });
}

/* Function call to fetch Current Property Details when page loads */
export async function fetchHotelDetails(currentProperty, setServices, setGen, setVisible) {
    var genData = [];
    const url = `/api/${currentProperty.address_province.replace(
        /\s+/g,
        "-"
    )}/${currentProperty.address_city}/${currentProperty.property_category
        }s/${currentProperty.property_id}`;
    axios.get(url)
        .then((response) => {
            setServices(response.data);
            console.log("url  to fetch property details hitted successfully")
            {
                response.data?.services?.map((item) => {
                    var temp = {
                        name: item.local_service_name,
                        description: item.service_comment,
                        type: item.service_value,
                        status: item.status,
                        id: item.service_id
                    }
                    genData.push(temp)
                })
                setGen(genData);
            }
            setVisible(1)
        })
        .catch((error) => { console.log("url to fetch property details, failed") });
}

/* Function to add additional services */
export function newAdditionalService(setSpinner, modified, setModified, setFlag, setView, currentProperty, setAdditionalServices, setGene, setVisible, Router) {
    setSpinner(1);
    if (modified.length !== 0) {
        const final_data = {
            "additional_service": [{
                "property_id": currentProperty.property_id,
                "add_service_name": modified.add_service_name,
                "add_service_comment": modified.add_service_comment,
                "status": true
            }]
        }
        const url = '/api/additional_services'
        axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
            ((response) => {
                setSpinner(0);
                document.getElementById('asform').reset();
                toast.success("Service Added Successfully!", {
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
                setFlag([])
                setView(0)
            })
            .catch((error) => {
                setSpinner(0);
                toast.error("Additional Services Add Error! ", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setFlag([]);

            })
    }

}

export function navigationList(currentLogged, currentProperty) {
    return ([
        {
            icon: "homeIcon",
            text: "Home",
            link: currentLogged?.id.match(/admin.[0-9]*/)
                ? "../admin/adminlanding"
                : "./landing"
        },
        {
            icon: "rightArrowIcon",
            text: [currentProperty?.property_name],
            link: "./propertysummary"
        },
        {
            icon: "rightArrowIcon",
            text: "Additional Services",
            link: ""
        }
    ])
}

export function validationAdditionalServices(setError, setSpinner, modified, setModified, setFlag, setView, currentProperty, setAdditionalServices, setGene, setVisible, Router) {
    setError({});
    var result = validateAdditionalServices(modified);
    console.log("Result" + JSON.stringify(result))
    if (result === true) {
        newAdditionalService(setSpinner, modified, setModified, setFlag, setView, currentProperty, setAdditionalServices, setGene, setVisible, Router)

    }
    else {
        setError(result)
    }
}
