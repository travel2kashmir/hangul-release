import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import objChecker from "lodash";
import validateGallery from "../../../components/validation/gallery/galleryadd";
import validateEditGallery from "../../../components/validation/gallery/galleryedit";


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

export function onChangePhoto(e, imageFile, image, setImage) {
    setImage({ ...image, imageFile: e.target.files[0] });
};

/* Function to upload image*/
export function uploadImage(setSpin, image, setImage) {
    setSpin(1);
    const imageDetails = image.imageFile;
    const formData = new FormData();
    formData.append("file", imageDetails);
    formData.append("upload_preset", "Travel2Kashmir");
    formData.append("enctype", "multipart/form-data");
    axios
        .post("https://api.cloudinary.com/v1_1/dvczoayyw/image/upload", formData)
        .then((response) => {
            setImage({ ...image, image_link: response?.data?.secure_url });
            setSpin(0);
        })
        .catch((error) => {
            setSpin(0);
            toast.error("Image upload error! ", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.error("Image upload error!", error);
        });
};

/* Function to add images*/
export function submitAddImage(flag, actionImage, setActionImage, setSpinner, currentProperty, image, setImage, setGallery, setImages, setEnlargedImage, setVisible, Router, addImage, addURLImage, setAddImage, setAddURLImage) {
    if (flag === 1) {
        if (actionImage.length !== 0) {
            setSpinner(1);
            const imagedata = [
                {
                    property_id: currentProperty?.property_id,
                    image_link: image.image_link,
                    image_title: actionImage.image_title,
                    image_description: actionImage.image_description,
                    image_category: "outside",
                },
            ];
            const finalImage = { images: imagedata };
            axios
                .post(`/api/gallery`, finalImage)
                .then((response) => {
                    setSpinner(0);
                    toast.success("Image Added Successfully!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    fetchHotelDetails(currentProperty, setGallery, setImages, setEnlargedImage, setVisible);
                    setImage({});
                    setActionImage({});
                    Router.push("./gallery");
                    if (addImage === 1) {
                        setAddImage(0);
                        document.getElementById("addgallery").reset();
                    }
                    if (addURLImage === 1) {
                        setAddURLImage(0);
                        document.getElementById("addurlgallery").reset();
                    }
                })
                .catch((error) => {
                    if (addImage === 1) {
                        document.getElementById("addgallery").reset();
                    }
                    if (addURLImage === 1) {
                        document.getElementById("addurlgallery").reset();
                    }
                    setSpinner(0);
                    toast.error(" Gallery Error", {
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
    }
};

/* Function to edit images*/
export function updateImageDetails(flag, actionImage, updateImage, setAllHotelDetails, setSpinner, setEditImage, currentProperty, setGallery, setImages, setEnlargedImage, setVisible, setEnlargeImage, setActionImage, setError, Router) {
    if (flag === 1) {
        if (objChecker.isEqual(actionImage, updateImage)) {
            toast.warn("No change in Image Details detected. ", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setAllHotelDetails([]);
        } else {
            setSpinner(1);
            const final_data = {
                image_id: actionImage?.image_id,
                image_title: actionImage.image_title,
                image_description: actionImage.image_description,
            };
            const url = "/api/images";
            axios
                .put(url, final_data, {
                    header: { "content-type": "application/json" },
                })
                .then((response) => {
                    setSpinner(0);
                    setEditImage(0);
                    toast.success("Gallery Updated Successfully!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    document.getElementById("editImage").reset();
                    fetchHotelDetails(currentProperty, setGallery, setImages, setEnlargedImage, setVisible);
                    setAllHotelDetails([]);
                    setEnlargeImage(0);
                    setActionImage({});
                    setError({});
                    Router.push("./gallery");
                })
                .catch((error) => {
                    setSpinner(0);
                    toast.error("Gallery Update Error! ", {
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
    }
};

// Add Validation Gallery
export function validationGallery(setError, flag, actionImage, setActionImage, setSpinner, currentProperty, image, setImage, setGallery, setImages, setEnlargedImage, setVisible, Router, addImage, addURLImage, setAddImage, setAddURLImage) {
    setError({});
    var result = validateGallery(actionImage, image.image_link);
    if (result === true) {
        submitAddImage(flag, actionImage, setActionImage, setSpinner, currentProperty, image, setImage, setGallery, setImages, setEnlargedImage, setVisible, Router, addImage, addURLImage, setAddImage, setAddURLImage);
    } else {
        setError(result);
    }
};

// Edit Validation Gallery
export function validationGalleryEdit(flag, actionImage, updateImage, setAllHotelDetails, setSpinner, setEditImage, currentProperty, setGallery, setImages, setEnlargedImage, setVisible, setEnlargeImage, setActionImage, setError, Router) {
    setError({});
    var result = validateEditGallery(actionImage);
    console.log("Result" + JSON.stringify(result));
    if (result === true) {
        updateImageDetails(flag, actionImage, updateImage, setAllHotelDetails, setSpinner, setEditImage, currentProperty, setGallery, setImages, setEnlargedImage, setVisible, setEnlargeImage, setActionImage, setError, Router);
    } else {
        setError(result);
    }
};

export function handlecheckbox(e, images, setImages, setCheck) {
    // console.log(images.length);
    const { name, checked } = e.target;
    let tempCon = images.map((item) =>
        item.image_id === name ? { ...item, isChecked: checked } : item
    );
    setImages(tempCon);
    let check = tempCon
        .filter((i) => i.isChecked === true)
        .map((j) => {
            return j.image_id;
        });
    setCheck(check)

};

// Select multiple delete images
export function allDelete(setdeleteImage) {
    setdeleteImage(1);
};

/* Function Multiple Delete*/
export function deleteMultiple(check, currentProperty, setSpinner, setGallery, setImages, setEnlargedImage, setVisible, Router, setdeleteImage) {
    const data = check?.map((item) => {
        return { image_id: item, property_id: currentProperty?.property_id };
    });
    setSpinner(1);
    const imagedata = data;
    const finalImages = { images: imagedata };
    axios
        .post(`/api/deleteall/images`, finalImages, {
            headers: { "content-type": "application/json" },
        })
        .then((response) => {
            setSpinner(0);
            toast.success("API: Images delete success.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fetchHotelDetails(currentProperty, setGallery, setImages, setEnlargedImage, setVisible);
            Router.push("./gallery");
            setdeleteImage(0);
        })
        .catch((error) => {
            setSpinner(0);
            toast.error("API:Images add error.", {
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

export function searchImage(data, images, setSearchedImages, setShowSearchedImages) {
    let matchedImages = images.filter(
        (i) => i.image_title.toLowerCase().match(data.toLowerCase()) || i.image_description.toLowerCase().match(data.toLowerCase())
    );
    setSearchedImages(matchedImages);
    setShowSearchedImages(1);
};