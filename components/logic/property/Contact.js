import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import validateContact from "../../validation/contact/contactadd";

let i = 0;
// Fetch Hotel Details
export async function fetchHotelDetails(currentProperty, setContacts, setCountryCode, propertyName, setGen, setVisible) {
    var genData = [];
    const url = `/api/${currentProperty.address_province.replace(
        /\s+/g,
        "-"
    )}/${currentProperty.address_city}/${currentProperty.property_category
        }s/${currentProperty.property_id}`;
    axios.get(url)
        .then((response) => {
            setContacts(response.data.contacts);
            setCountryCode(response.data.address?.[i]?.address_country);
            propertyName = response.data.property_name;
            {
                response.data?.contacts?.map((item) => {
                    // var temp = {
                    //   "checkbox": { operation: undefined },
                    //   "Contact Details": {
                    //     "value": item.contact_data,
                    //     "inputType": "text",
                    //     "onChangeAction": () => alert("hello")
                    //   },
                    //   "Contact Type": {
                    //     "value": item.contact_type,
                    //     "inputType": undefined,
                    //     "onChangeAction": undefined
                    //   },
                    //   "status": item.status,
                    //   "id": item.contact_id,
                    //   "Actions": [

                    //     {
                    //       type: "button",
                    //       label: "Edit",
                    //       operation: (item) => { currentRoom(item) }
                    //     },
                    //     {
                    //       type: "button",
                    //       label: "Delete",
                    //       operation: (item) => { currentRoom(item) }
                    //     }

                    //   ]


                    // }
                    var temp = {
                        name: item.contact_type,
                        type: item.contact_data,
                        status: item.status,
                        id: item.contact_id
                    }
                    genData.push(temp)
                })

                setGen(genData);
            }
            setVisible(1);
        })
        .catch((error) => { console.log("url to fetch property details, failed") });


}

/* Function Add Contact*/
export function submitContactAdd(flag, setSpinner, contact, currentProperty, setView, setContacts, setCountryCode, propertyName, setGen, setVisible, Router, setContact, setSpin, setError, setFlag) {
    if (flag === 1) {
        setSpinner(1);
        if (contact.contact_type !== undefined) {
            const contactdata = [{
                property_id: currentProperty?.property_id,
                contact_type: contact?.contact_type,
                contact_data: contact?.contact_data,
                status: true
            }];
            const finalContact = { contacts: contactdata };
            axios.post(`/api/contact`, finalContact, {
                headers: { "content-type": "application/json" },
            })
                .then((response) => {
                    setSpinner(0)
                    toast.success("API: Contact add success.", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    document.getElementById('addcontactform').reset();
                    setView(0)
                    fetchHotelDetails(currentProperty, setContacts, setCountryCode, propertyName, setGen, setVisible);
                    Router.push("./contact");
                    setContact([]);
                    setSpin(0)
                    setError({});
                    setFlag([]);
                })
                .catch((error) => {
                    setSpinner(0)
                    toast.error("API: Contact add error.", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setView(0)
                    setFlag([]);
                });
        }
    }
}

// Add Validation Contact
export function validationContact(setError, contact, countryCode, flag, setSpinner, currentProperty, setView, setContacts, setCountryCode, propertyName, setGen, setVisible, Router, setContact, setSpin, setFlag) {
    setError({})
    var result = validateContact(contact, countryCode)
    console.log("Result" + JSON.stringify(result))
    if (result === true) {
        submitContactAdd(flag, setSpinner, contact, currentProperty, setView, setContacts, setCountryCode, propertyName, setGen, setVisible, Router, setContact, setSpin, setError, setFlag);
    }
    else {
        setError(result)
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
            text: "Contact",
            link: ""
        }
    ])
}
