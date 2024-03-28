import React, { useState, useEffect } from "react";

import StarRatings from 'react-star-ratings';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { english, arabic, french } from "../../components/Languages/Languages"
import Footer from '../../components/Footer';
import Button from "../../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import reviewImage from '../../public/review.png';
import InputTextBox from "../../components/utils/InputTextBox";
import Title from "../../components/title";
import Router from 'next/router'
import Image from 'next/image';
import { InitialActions, ColorToggler } from "../../components/initalActions";
import BreadCrumb from "../../components/utils/BreadCrumb";
import { fetchReviews, navigationList, handleSubmit, delConfirm, handleEdit, onChange, resetReviewState } from "../../components/logic/property/Reviews";
import { ReviewCard } from "../../components/Review";
import Modal from "../../components/NewTheme/modal";
var currentLogged;
var language;
var currentProperty;

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [darkModeSwitcher, setDarkModeSwitcher] = useState()
  const [color, setColor] = useState({})
  const [mode, setMode] = useState()
  const [modeChanger, setModeChanger] = useState("")
  const [visible, setVisible] = useState(0);
  const [view, setView] = useState(0);
  const [del, setDel] = useState('');
  const [modelDel, setModelDel] = useState(0);
  const [error, setError] = useState({})
  const [edit, setEdit] = useState(0)
  const [active, setActive] = useState({})
  const [org, setOrg] = useState({})
  const [spinner, setSpinner] = useState(0)

  var date = new Date();

  var currentDate = {
    "day": date?.getDate() < 10 ? `0${date?.getDate()}` : date?.getDate(),
    "month": date?.getMonth() + 1 < 10 ? `0${date?.getMonth() + 1}` : date?.getMonth() + 1,
    "year": date?.getUTCFullYear()
  }

  // runs at load time
  useEffect(() => {
    const resp = InitialActions({ setColor, setMode })
    language = resp?.language;
    currentLogged = resp?.currentLogged;
    currentProperty = resp?.currentProperty;
    if (JSON.stringify(currentLogged) === 'null') {
      Router.push(window.location.origin)
    }
    else {
      fetchReviews(currentProperty, setReviews, setVisible);
    }
  }, [])

  //functions to add review
  const reviewTemplate = [{
    property_id: currentProperty?.property_id,
    review_link: '',
    review_title: '',
    review_author: '',
    review_rating: '',
    review_type: '',
    service_date: '',
    review_date: '',
    review_content: ''
  }]
  const initialReviewState = reviewTemplate.map((i, id) => ({ ...i, index: id }));

  // const [review, setReview] = useState(reviewTemplate?.map((i, id) => { return { ...i, index: id } }))
  const [review, setReview] = useState(initialReviewState);


  return (
    <>
      <Title name={`Engage |  ${language?.reviews}`} />

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
        Primary={english?.Side}
        color={color}
        Type={currentLogged?.user_type}
      />

      <div id="main-content"
        className={`${color?.greybackground} px-4 pt-24 py-2 relative overflow-y-auto lg:ml-64`}>

        {/* bread crumb */}
        <BreadCrumb
          color={color}
          crumbList={navigationList(currentLogged, currentProperty)}
        />

        {/* Header */}
        <div className="flex justify-between">
          <h1 className=" text-xl sm:text-2xl mx-2 font-semibold mb-2 text-gray-900">{language?.reviews} </h1>
          <div className="mx-8"> <Button Primary={language?.Add} onClick={(e) => { setView(1) }} /></div>
        </div>

        {/* Form Property Reviews */}
        <div className={`${color?.whitebackground} shadow rounded-lg m-4 px-8 sm:p-6 xl:p-8  2xl:col-span-2`} >
          <div className="p-4">
            <div className=" md:px-4 mx-auto w-full ">
              <div className="flex items-center justify-between mb-2">
                <div className=" border-2 shadow lg:mx-64 md:mx-10 ">
                  <Image src={reviewImage} height={250} width={600} alt='review image' />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {reviews?.Reviews?.map((item, idx) => (
            <ReviewCard key={idx} color={color} setActive={setActive} setOrg={setOrg} setEdit={setEdit} setDel={setDel} setModelDel={setModelDel} item={item} />

          ))}
        </div>
      </div>

      {/*model del */}
      {modelDel === 1 &&
        <Modal
          description={<div className="p-6 pt-0 text-center">
            <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 className="text-base font-normal text-gray-500 mt-5 mb-6">
              {language?.areyousureyouwanttodelete}
            </h3>
            <Button Primary={language?.Delete} onClick={() => delConfirm(del, currentProperty, setReviews, setVisible, setModelDel)} />
            <Button Primary={language?.Cancel} onClick={() => setModelDel(0)} />
          </div>}
          setShowModal={() => setModelDel(0)}
        />
      }


      {/* Modal Add */}
      {view === 1 && <Modal
        title={language?.addreview}
        setShowModal={() => {
          setActive({}); setView(0); setError({}); document.getElementById('addform').reset();
          resetReviewState(setReview, initialReviewState);
        }}
        description={<form id="addform">
          <div className="relative w-full max-w-2xl px-4 h-fit md:h-auto">
            <div className={`${color?.whitebackground} rounded-lg relative px-4 py-2`}>

              {
                review?.map((review, index) =>
                (<div key={index} >
                  <div className="space-y-6" >
                    <div className="flex flex-wrap w-full">

                      <div className="w-full lg:w-6/12 px-4 py-2">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.reviewlink}   <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={`${color.greybackground} shadow-sm  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => onChange(e, review?.index, 'review_link', setReview, review)}
                          placeholder="link of review"

                        />
                        <p className=" peer-invalid:visible text-red-700 font-light">
                          {error?.review_link}
                        </p>

                      </div>
                      <div className="w-full lg:w-6/12 px-4 py-2">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.reviewtitle}   <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={`${color.greybackground} shadow-sm  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => onChange(e, review?.index, 'review_title', setReview, review)}
                          placeholder="Review title"
                        />
                        <p className="peer-invalid:visible text-red-700 font-light">
                          {error?.review_title}
                        </p>
                      </div>


                      <div className="w-full lg:w-6/12 px-4 py-2">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.reviewauthor}   <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={`${color.greybackground} shadow-sm  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => onChange(e, review?.index, 'review_author', setReview, review)}
                          placeholder="Review Author"
                        />
                        <p className=" peer-invalid:visible text-red-700 font-light">
                          {error?.review_author}
                        </p>
                      </div>


                      <div className="w-full lg:w-6/12 px-4 py-2">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.reviewrating} <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <select
                          onChange={e => onChange(e, review?.index, 'review_rating', setReview, review)}
                          className={`${color.greybackground} shadow-sm  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        >
                          <option selected disabled>Select Rating </option>
                          <option value="1" >1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>

                        <p className="peer-invalid:visible text-red-700 font-light">
                          {error?.review_rating}
                        </p>
                      </div>


                      <div className="w-full lg:w-6/12 px-4 py-2">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.reviewercategory}  <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <select
                          onChange={e => onChange(e, review?.index, 'review_type', setReview, review)}
                          className={`${color.greybackground} shadow-sm  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}>
                          <option selected disabled>Select Reviewer Category</option>
                          <option value="user" >User</option>
                          <option value="editorial">Editorial</option>
                        </select>
                        <p className=" peer-invalid:visible text-red-700 font-light">
                          {error?.review_type}
                        </p>
                      </div>

                      <div className="w-full lg:w-6/12 px-4 py-2">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.servicedate}<span style={{ color: "#ff0000" }}>*</span>
                        </label>

                        <input
                          type="date"
                          max={`${currentDate.year}-${currentDate.month}-${currentDate.day}`}
                          className={`${color.greybackground} shadow-sm  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => onChange(e, review?.index, 'service_date', setReview, review)}
                        />
                        <p className=" peer-invalid:visible text-red-700 font-light">
                          {error?.service_date}
                        </p>
                      </div>

                      <div className="w-full lg:w-6/12 px-4 py-2">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.reviewdate}<span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="date"
                          max={`${currentDate.year}-${currentDate.month}-${currentDate.day}`}
                          className={`${color.greybackground} shadow-sm  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => onChange(e, review?.index, 'review_date', setReview, review)}
                        />
                        <p className="peer-invalid:visible text-red-700 font-light">
                          {error?.review_date}
                        </p>
                      </div>
                      {/*Review content */}
                      <InputTextBox
                        label={` ${language?.reviewcontent}`}
                        visible={1}
                        defaultValue={review[0]?.review_content}
                        wordLimit={1000}
                        onChangeAction={(e) => {
                          if (e.target.value.length >= 0 && e.target.value.length < 1000) {
                            setError({})
                            onChange(e, review?.index, 'review_content', setReview, review)
                          }
                          else {
                            setError({ review_content: 'word limit reached' })
                          }
                        }
                        }
                        error={error?.review_content}
                        color={color}
                        req={true}
                        tooltip={true}
                      />
                    </div></div></div>)
                )}

              <div className="items-center p-2 border-t border-gray-200 rounded-b">
                <Button Primary={language?.Add} onClick={(e) => handleSubmit(e, setSpinner, review, currentProperty, setReviews, setVisible, setView, setError, setReview, initialReviewState)} />
              </div>
            </div>
          </div>
        </form>} />}

      {/*Modal Edit */}
      {edit === 1 &&
        <Modal
          title={language?.editreview}
          setShowModal={() => {
            setActive({});
            setEdit(0); setError({});
            document.getElementById('editform').reset()
          }}
          description={
            <div className={`${color.whitebackground} bg-white rounded-lg relative m-4 px-4 py-6`}>
                <form id="editform">
                  <div className="flex flex-wrap w-full">
                      <div className="w-full lg:w-6/12 px-4 py-2">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.reviewlink}  <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={`${color.greybackground} shadow-sm  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => setActive({ ...active, review_link: e.target.value })}
                          defaultValue={active?.review_link || ''} />
                        <p className=" peer-invalid:visible text-red-700 font-light">
                          {error?.review_link}
                        </p>
                      </div>
                      <div className="w-full lg:w-6/12 px-4 py-2">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.reviewtitle}  <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={`${color.greybackground} shadow-sm  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => setActive({ ...active, review_title: e.target.value })}
                          defaultValue={active?.review_title || ''}
                        />
                        <p className="peer-invalid:visible text-red-700 font-light">
                          {error?.review_title}
                        </p>
                      </div>


                      <div className="w-full lg:w-6/12 px-4 py-2">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.reviewauthor}  <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={`${color.greybackground} shadow-sm  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => setActive({ ...active, review_author: e.target.value })}
                          defaultValue={active?.review_author}
                        />
                        <p className=" peer-invalid:visible text-red-700 font-light">
                          {error?.review_author}
                        </p>
                      </div>
                      <div className="w-full lg:w-6/12 px-4 py-2">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.reviewrating}  <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <select
                          onChange={e => setActive({ ...active, review_rating: Number(e.target.value) })}
                          className={`${color.greybackground} shadow-sm  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}>
                          <option selected disabled>{active?.review_rating}  </option>
                          <option value="1" >1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <p className="peer-invalid:visible text-red-700 font-light">
                          {error?.review_rating}
                        </p>
                      </div>


                      <div className="w-full lg:w-6/12 px-4 py-2">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.reviewercategory}
                        </label>
                        <select
                          onChange={e => setActive({ ...active, review_type: e.target.value })}
                          className={`${color.greybackground} shadow-sm  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        >
                          <option selected disabled>{active?.review_type?.charAt(0).toUpperCase() + active?.review_type?.slice(1) || 'select'}</option>
                          <option value="user" >User</option>
                          <option value="editorial">Editorial</option>
                        </select>
                      </div>


                      <div className="w-full lg:w-6/12 px-4 py-2">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.servicedate}<span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="date"
                          max={`${currentDate.year}-${currentDate.month}-${currentDate.day}`}

                          className={`${color.greybackground} shadow-sm  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => setActive({ ...active, service_date: e.target.value })}
                          defaultValue={active?.service_date || ''}
                        />
                        <p className=" peer-invalid:visible text-red-700 font-light">
                          {error?.service_date}
                        </p>
                      </div>


                      <div className="w-full lg:w-6/12 px-4 py-2">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.reviewdate} <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="date"
                          max={`${currentDate.year}-${currentDate.month}-${currentDate.day}`}

                          className={`${color.greybackground} shadow-sm  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => setActive({ ...active, review_date: e.target.value })}
                          defaultValue={active?.review_date || ''}
                        />
                        <p className="peer-invalid:visible text-red-700 font-light">
                          {error?.review_date}
                        </p>
                      </div>

                      {/*Review content */}
                      <InputTextBox
                        label={` ${language?.reviewcontent}`}
                        visible={visible}
                        defaultValue={active?.review_content}
                        wordLimit={1000}
                        onChangeAction={(e) => {
                          if (e.target.value.length >= 0 && e.target.value.length < 1000) {
                            setError({})
                            setActive({ ...active, review_content: e.target.value })
                          }
                          else {
                            setError({ review_content: 'word limit reached' })
                          }
                        }}
                        error={error?.review_content}
                        color={color}
                        req={true}
                        tooltip={true}
                      />
                    </div>
                </form>
              <div className="items-center p-6 border-t border-gray-200 rounded-b">
                {spinner === 1 ?
                  <Button
                    testid="test_button_spinner"
                    Primary={language?.SpinnerUpdate}
                  /> : <Button Primary={language?.Update} onClick={() => handleEdit(active, org, currentProperty, setReviews, setVisible, setActive, setEdit, setError, Router)} />}
              </div>
            </div>
          }
        />}


      <Footer color={color} Primary={english.Foot} />

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>)
}
export default Reviews
Reviews.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}