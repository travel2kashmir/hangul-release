import axios from "axios";
import objChecker from "lodash";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validatebasicDetails from "../../validation/basicdetails";
import Resizer from "react-image-file-resizer";

// import { useRouter } from "next/router";

// const router = useRouter();


const current = new Date();
let month = current.getMonth() + 1;
export const descriptionDate = `${current.getDate()}/${month < +10 ? `0${month}` : `${month + 1}`}/${current.getFullYear()}`;

export function fetchAllPropertyTypes(setAllPropertyTypes) {
    const url = '/api/all_property_types';
    axios.get(url).then((response) => setAllPropertyTypes(response.data))
}

export async function fetchBasicDetails(currentProperty, setBasicDetails, setAllHotelDetails, setImageLogo, setVisible) {
    try {
        const { address_province, address_city, property_category, property_id } =
            currentProperty;
        const url = `/api/${address_province.replace(
            /\s+/g,
            "-"
        )}/${address_city}/${property_category}s/${property_id}`;

        const response = await axios.get(url);
        setBasicDetails(response.data);
        setAllHotelDetails(response.data);
        setImageLogo(response.data.logo);
        console.log("url to fetch property details hit successfully");
        setVisible(1);
    } catch (error) {
        console.log("url to fetch property details failed");
    }
};

/* Edit Basic Details Function */
export function submitBasicEdit(flag, setFlag, setSpinner, currentProperty, allHotelDetails, setAllHotelDetails, basicDetails, setBasicDetails, setImageLogo, setVisible, router) {
    if (flag === 1) {
        if (objChecker.isEqual(allHotelDetails, basicDetails)) {
            toast.warn("APP: No change in Basic Details detected. ", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setFlag([]);
        } else {
            setSpinner(1);

            const final_data = {
                property_id: currentProperty?.property_id,
                property_name: allHotelDetails.property_name?.toLowerCase(),
                property_category: allHotelDetails.property_category?.toLowerCase(),
                property_brand: allHotelDetails.property_brand,
                established_year: allHotelDetails.established_year,
                star_rating: allHotelDetails.star_rating,
                description_title: allHotelDetails.description_title,
                description_body: allHotelDetails.description_body.replace(/\n/g, "\\n"),
                description_date: allHotelDetails.description_date,
            };

            const url = "/api/basic";
            axios.put(url, final_data, {
                header: { "content-type": "application/json" },
            }).then((response) => {
                setSpinner(0);
                toast.success("API: Basic Details Updated Successfully!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                fetchBasicDetails(currentProperty, setBasicDetails, setAllHotelDetails, setImageLogo, setVisible);
                router.push("./basicdetails");
                setAllHotelDetails([]);
                setFlag([]);
            })
                .catch((error) => {
                    setSpinner(0);
                    toast.error("API: Basic Details Update Error!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        }
    } else {
        toast.warn("APP: No change in Basic Details detected. ", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
};

// Add Validation Basic Details
export function validationBasicDetails(setError, flag, setFlag, setSpinner, currentProperty, allHotelDetails, setAllHotelDetails, basicDetails, setBasicDetails, setImageLogo, setVisible, router) {
    setError({});
    var result = validatebasicDetails(allHotelDetails);
    if (result === true) {
        submitBasicEdit(flag, setFlag, setSpinner, currentProperty, allHotelDetails, setAllHotelDetails, basicDetails, setBasicDetails, setImageLogo, setVisible, router);
    } else {
        setError(result);
    }
};

/* Function to upload logo to cloud*/
export function uploadImage(image, setUploadImageSpin, setImageLogo) {
    setUploadImageSpin(true);
    image = resizeFile(image);
    const imageDetails = image;
    const formData = new FormData();
    formData.append("file", imageDetails);
    formData.append("upload_preset", "Travel2Kashmir");
    formData.append("enctype", "multipart/form-data");
    axios.post("https://api.cloudinary.com/v1_1/dvczoayyw/image/upload", formData)
        .then((response) => {
            setImageLogo(response?.data?.secure_url);
        })
        .catch((error) => {
            toast.error("Image upload error. ", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
};


// Logo Upload
export function submitPhotoEdit(currentProperty, imageLogo, setBasicDetails, setAllHotelDetails, setImageLogo, setVisible, setUploadImageSpin, router) {
    const final_data = {
        property_id: currentProperty?.property_id,
        logo_link: imageLogo,
    };
    const url = "/api/basic";
    axios.put(url, final_data, { header: { "content-type": "application/json" } })
        .then((response) => {
            toast.success("API: Logo update success.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fetchBasicDetails(currentProperty, setBasicDetails, setAllHotelDetails, setImageLogo, setVisible);
            router.push("./basicdetails");
            setUploadImageSpin(false);
        })
        .catch((error) => {
            toast.error("API:Logo Update error.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
};

const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            164,
            40,
            "PNG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });
