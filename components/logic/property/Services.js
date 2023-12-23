import axios from "axios";
import objChecker from "lodash";


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
            text: "Services",
            link: ""
        }
    ])
}

/* Function call to fetch Current Property Details when page loads */
export async function fetchHotelDetails(currentProperty, setServices, setVisible, setGen) {
    var genData = [];
    const url = `/api/${currentProperty.address_province.replace(
        /\s+/g,
        "-"
    )}/${currentProperty.address_city}/${currentProperty.property_category
        }s/${currentProperty?.property_id}`;
    axios.get(url)
        .then((response) => {
            setServices(response.data);
            console.log("url  to fetch property details hitted successfully")
            setVisible(1)
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


        })

        .catch((error) => { console.log("url to fetch property details, failed") });
}
