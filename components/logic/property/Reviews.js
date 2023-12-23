import axios from "axios";
import validateReview from "../../validation/review";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import objChecker from "lodash";


export async function fetchReviews(currentProperty, setReviews, setVisible) {
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

export function handleSubmit(e, setSpinner, review, currentProperty, setReviews, setVisible, setView, setError, setReview, initialReviewState) {
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
                resetReviewState(setReview, initialReviewState)
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

export function delConfirm(del, currentProperty, setReviews, setVisible, setModelDel) {
    var url = `/api/${del}`;

    axios.delete(`${url}`).then((response) => {
        fetchReviews(currentProperty, setReviews, setVisible);
        toast.success("API: Review Deleted Sucessfully.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setModelDel(0)
    }).catch((error) => {
        toast.error("API: Review Delete Error!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    )
}

export function handleEdit(active, org, currentProperty, setReviews, setVisible, setActive, setEdit, setError, Router) {

    if (objChecker.isEqual(active, org)) {

        toast.warn('APP: No changes in review! ', {
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
        const edited = [active]
        var res = validateReview(edited)

        if (res === true) {
            axios.put('/api/review', active, {
                headers: { 'content-type': 'application/json' }
            }).then(response => {
                console.log(response)
                fetchReviews(currentProperty, setReviews, setVisible);
                toast.success("API: Review Edited Sucessfully.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setActive({});
                setEdit(0);
                setError({})
                document.getElementById('editform').reset()
                Router.push('./reviews')

            })
                .catch(error => {

                    toast.error("API: Review Edit Error!", {
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
            setError(res)
        }
    }
}

export function onChange(e, index, i, setReview, review) {
    console.log(index, 'index')
    console.log(review, 'review')
    console.log(typeof (review))
    // setReview(review?.map((item, id) => {
    //     if (item.index === index) {
    //         item[i] = e.target.value
    //     }
    //     return item
    // }))
    setReview((prevReview) => {
        return prevReview.map((item, id) => {
            if (item.index === index) {
                return { ...item, [i]: e.target.value };
            }
            return item;
        });
    });
}

export function resetReviewState(setReview, initialReviewState) {
    setReview(initialReviewState);
};
