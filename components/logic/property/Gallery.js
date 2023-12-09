import axios from "axios";


/* Function call to fetch Current Property Details when page loads */
export async function fetchHotelDetails(currentProperty, setGallery, setImages, setEnlargedImage, setVisible) {
    const url = `/api/${currentProperty.address_province.replace(
        /\s+/g,
        "-"
    )}/${currentProperty.address_city}/${currentProperty.property_category}s/${currentProperty.property_id
        }`;
    axios.get(url)
        .then((response) => {
            setGallery(response.data);
            setImages(response.data?.images);
            setEnlargedImage(
                response.data?.images?.map((item, idx) => {
                    return {
                        image_id: item?.image_id,
                        image_title: item?.image_title,
                        image_link: item?.image_link,
                        image_idx: idx,
                        image_description: item?.image_description,
                    };
                })
            );
            console.log("url  to fetch property details hitted successfully");
            setVisible(1);
        })
        .catch((error) => {
            console.log("url to fetch property details, failed");
        });
};


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
            text: "Gallery",
            link: ""
        }
    ])
}