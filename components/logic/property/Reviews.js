import axios from "axios";
import validateReview from "../../validation/review";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function fetchReviews({ currentProperty, setReviews, setVisible }) {
    const url = `/api/${currentProperty?.address_province.replace(
        /\s+/g,
        "-"
    )}/${currentProperty?.address_city}/${currentProperty?.property_category
        }s/${currentProperty?.property_id}`;
    axios.get(url)
        .then((response) => {
            setReviews(response.data);
            console.log("url  to fetch property details hitted successfully")
            setVisible(1);
        })
        .catch((error) => { console.log("url to fetch property details, failed") });
}

export function handleSubmit(e, setSpinner, review, currentProperty, setReviews, setVisible, setView, setError) {
    e.preventDefault()
    setSpinner(1);
    const reviewdata = review?.map((i => {
        return {
            property_id: currentProperty?.property_id,
            review_link: i.review_link,
            review_title: i.review_title,
            review_author: i.review_author,
            review_rating: i.review_rating,
            review_type: i.review_type,
            service_date: i.service_date,
            review_date: i.review_date,
            review_content: i.review_content
        }
    }))
    const validationResponse = validateReview(reviewdata);
    if (validationResponse === true) {
        const finalData = { reviews: reviewdata }
        console.log(JSON.stringify(finalData), 'finaldata')
        axios.post(`/api/review`, finalData,
            {
                headers: { 'content-type': 'application/json' }
            }).then(response => {
                console.log(response)
                fetchReviews(currentProperty, setReviews, setVisible);
                toast.success("API: Review Saved Sucessfully.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setError({})
                setView(0);
                setSpinner(0);
                document.getElementById('addform').reset();
            })
            .catch(error => {
                setSpinner(0);
                console.log(JSON.stringify(error))
                toast.error("API: Review Add Error!", {
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
    else {
        setError(validationResponse);
        setSpinner(0);
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
            text: "Reviews",
            link: ""
        }
    ])
}