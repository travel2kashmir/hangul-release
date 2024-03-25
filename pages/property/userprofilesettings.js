import React from 'react'
import UserProfileSidebar from "../../components/userprofilesidebar";
import bcrypt from "bcryptjs";
import validatechangePassword from '../../components/validation/changepassword';
import UserProfileHeader from "../../components/userprofileheader";
import { useEffect, useState } from "react";
import Title from '../../components/title';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import { InitialActions, ColorToggler } from "../../components/initalActions";
import { english, arabic, french } from "../../components/Languages/Languages"
import BreadCrumb from "../../components/utils/BreadCrumb";
import { NavigationList } from "../../components/Landing";
import objChecker from "lodash";
import { ChangePassword } from '../../components/UserProfileSettings';
var language;
var currentUser;
var currentLogged;
let colorToggle;

function UserProfileSettings() {
  var locale;

  /** Router for Redirection **/
  const router = useRouter();

  /** State Intialisation for storing all Properties of Current User **/
  const [ownerdata, setOwnerdata] = useState([]);
  const [spinner, setSpinner] = useState(0);
  const [error, setError] = useState({})
  const [flag, setFlag] = useState([]);
  const [userDetails, setUserDetails] = useState({})
  const [signinDetails, setSigninDetails] = useState({})
  const [userFetchedDetails, setFetchedDetails] = useState({})
  const [visible, setVisible] = useState(0);
  const [darkModeSwitcher, setDarkModeSwitcher] = useState()
  const [color, setColor] = useState({})
  const [modeChanger, setModeChanger] = useState("")
  const [mode, setMode] = useState()
  const [userProfileSettings, setUserProfileSetting] = useState({
    "news": false,
    "account_activity": false,
    "new_messages": false,
    "rating_reminder": false,
    "item_update": false,
    "review": false,
    "comment": false
  }
  )
  const [copyUserProfileSettings, setCopyUserProfileSettings] = useState({
    "news": false,
    "account_activity": false,
    "new_messages": false,
    "rating_reminder": false,
    "item_update": false,
    "review": false,
    "comment": false
  })


  useEffect(() => {
    if (JSON.stringify(currentUser) === 'null') {
      router.push(window.location.origin)
    }
    else {
      onComponentLoadActions();
    }
  }, [])

  const onComponentLoadActions = () => {
    if (typeof window !== 'undefined') {
      const resp = InitialActions({ setColor, setMode })
      language = resp?.language;
      currentLogged = resp?.currentLogged;
      if (JSON.stringify(currentLogged) != "null") {
        let currentLogged = JSON.parse(localStorage.getItem("Signin Details"));

      }
      fetchUserDetails();
      fetchUserProfileSettings();

    }
  }



  function fetchUserProfileSettings() {
    const url = `/api/user_settings/${currentUser?.id}`;
    axios.get(url).then((response) => {

      setUserProfileSetting(response.data)
      setCopyUserProfileSettings(response.data)
    }).catch((error) => {
      console.log("error in fetching user profile settings")
    })

  }


  const fetchUserDetails = async () => {
    var item = {
      user_email: JSON.parse(localStorage.getItem("Signin Details"))?.email
    };
    axios.post("/api/signin/user", item, {
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        setUserDetails(response?.data);
        console.log("url  to fetch user details hitted successfully")
      })
      .catch((error) => { console.log("url to fetch user details, failed") });
  }

  /* Edit Basic Details Function */
  const submitUserpasswordEdit = async () => {
    if (flag === 1) {
      const EncryptedPass = await bcrypt.hash(signinDetails.new_password, userDetails?.salt);
      if (EncryptedPass !== userDetails.password) {
        const final_data = {
          "user_id": userDetails?.id,
          "user_password": EncryptedPass
        }
        const url = '/api/signup_user'
        axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
          ((response) => {
            setSpinner(0);
            toast.success("API: Password update success.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            localStorage.setItem("Signin Details", JSON.stringify(userDetails));
            router.push("./userprofilesettings");
            setFlag([]);

          })
          .catch((error) => {
            setSpinner(0)
            toast.error("API: Password update error.", {
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
        toast.warn('APP: The new password is the old one. ', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }

    else {
      toast.warn('APP: No change in userpassword detected. ', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }
  }

  // Add Validation Basic Details
  const validationChangePassword = () => {
    setError({})
    var result = validatechangePassword(signinDetails)
    console.log("Result" + JSON.stringify(result))
    if (result === true) {

      submitUserpasswordEdit();
    }
    else {
      setError(result)
    }
  }

  //edit or add notification values
  function updateUserProfileSettings() {
    if (flag === 1) {
      if (objChecker.isEqual(userProfileSettings, copyUserProfileSettings)) {
        toast.warn("APP: No change in User Profile Settings detected. ", {
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
        const url = "/api/user_setting";
        const final_data = {
          "user_settings": [{ ...userProfileSettings, "user_id": currentUser.id }]
        }
        axios
          .post(url, final_data, {
            header: { "content-type": "application/json" },
          })
          .then((response) => {
            setSpinner(0);
            toast.success("API: User Profile Settings Updated Successfully!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setFlag([])
          })
          .catch((error) => {
            setSpinner(0);
            toast.error("API: User Profile Settings Update Error!", {
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
      toast.warn("APP: No change in User Profile Settings detected. ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (

    <>
      <Title name={`Engage |  ${language?.propertysummary}`} />

      <UserProfileHeader color={color} setColor={setColor} Primary={color?.name} Sec={ColorToggler} mode={mode} setMode={setMode} />
      <UserProfileSidebar color={color} setColor={setColor} Primary={color?.name} Sec={ColorToggler} />

      {/* Body */}
      <div id="main-content"
        className={`${color?.greybackground} min-h-screen px-4 py-2 pt-24 relative overflow-y-auto lg:ml-64`}>
        {/* bread crumb */}
         {/* bread crumb */}
         <BreadCrumb
          color={color}
          crumbList={NavigationList(currentLogged, language?.userprofile)}
        />
        


        {/* Change Password */}
        <ChangePassword color={color}
         language={language}
        setSigninDetails={setSigninDetails}
         signinDetails={signinDetails}
          spinner={spinner}
           flag={flag} 
           setFlag={setFlag}
          validationChangePassword={validationChangePassword}
           error={error}/>

        <div className={`${color?.greybackground}  grid  lg:grid-cols-2 md:grid-cols-1 my-2 sm:grid-cols-1 gap-3`}>

          <div className={`${color?.whitebackground} shadow rounded-lg px-12  sm:p-6 xl:p-8  2xl:col-span-2`}>
            <h3 className={`${color?.text} text-xl pt-4 font-bold  mb-1`}>
              Alerts & Notifications
            </h3>
            <p className={`${color?.textgray} text-sm  font-medium mb-2`}>You can set up enGage to get notifications</p>

            <div className={`${color?.text} text-lg font-bold  my-4`}>
              Company News
            </div>
            <div className='flex'>
              <span className={`${color?.textgray} text-base ml-2  font-medium`}>Get enGage news, announcements, and product updates</span>
              <div className='items-center justify-end ml-auto'>
                <label className="inline-flex relative cursor-pointer">

                  <input type="checkbox" name="news" defaultChecked={userProfileSettings?.news}
                    onClick={(e) => {
                      setFlag(1);
                      setUserProfileSetting({ ...userProfileSettings, news: e.target.checked })
                    }} className="sr-only peer" />
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                 dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-gray-700 
                    peer-checked:after:translate-x-full 
                peer-checked:after:border-white a fter:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                   after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                </label>
              </div>
            </div>
            <div className='hover:bg-gray-100 divide-y mt-2 whitespace-nowrap border-t border-gray-200 my-2'></div>


            <div className={`${color?.text} text-lg font-bold  my-4`}>
              Account Activity
            </div>
            <div className='flex'>
              <span className={`${color?.textgray} text-base ml-2  font-medium`}>Get important notifications about you or activity you`ve missed</span>
              <div className='items-center justify-end ml-auto'>
                <label className="inline-flex relative cursor-pointer">

                  <input type="checkbox" name="account_activity" value={userProfileSettings?.account_activity} defaultChecked={userProfileSettings?.account_activity}
                    onClick={(e) => {
                      setFlag(1);
                      setUserProfileSetting({ ...userProfileSettings, "account_activity": !userProfileSettings.account_activity })
                    }
                    } className="sr-only peer" />
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                 dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-gray-700 
                    peer-checked:after:translate-x-full 
                peer-checked:after:border-white a fter:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                   after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                </label>
              </div>
            </div>
            <div className='hover:bg-gray-100 divide-y mt-2 whitespace-nowrap border-t my-2 border-gray-200'></div>



            <div className={`${color?.text} text-lg font-bold  my-4`}>
              New Messages
            </div>
            <div className='flex'>
              <span className={`${color?.textgray} text-base ml-2  font-medium`}>Get enGagage news, announcements, and product updates</span>
              <div className='items-center justify-end ml-auto'>
                <label className="inline-flex relative cursor-pointer">

                  <input type="checkbox" name="message" defaultChecked={userProfileSettings?.new_messages}
                    onClick={(e) => {
                      setFlag(1);
                      setUserProfileSetting({ ...userProfileSettings, new_messages: e.target.checked })
                    }
                    }
                    className="sr-only peer" />
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                 dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-gray-700 
                    peer-checked:after:translate-x-full 
                peer-checked:after:border-white a fter:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                   after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                </label>
              </div>
            </div>
            <div className='hover:bg-gray-100 divide-y mt-2 whitespace-nowrap border-t border-gray-200'></div>
            <div id="btn" className="flex mt-2 items-center justify-end ml-auto mr-0 ">

              <div className={flag !== 1 && spinner === 0 ? 'block' : 'hidden'}>
                <Button Primary={language?.UpdateDisabled} /></div>
              <div className={spinner === 0 && flag === 1 ? 'block' : 'hidden'}>
                <Button Primary={language?.Update} onClick={updateUserProfileSettings} />
              </div>
              <div className={spinner === 1 && flag === 1 ? 'block' : 'hidden'}>
                <Button Primary={language?.SpinnerUpdate} />
              </div>
            </div>
          </div>

          <div className={`${color?.whitebackground} shadow rounded-lg px-12  sm:p-6 xl:p-8  2xl:col-span-2`}>
            <h3 className={`${color?.text} text-xl font-bold pt-4  mb-1`}>
              Email Notifications
            </h3>
            <p className={`${color?.textgray} text-sm font-medium mb-2`}>You can set up enGage to get email notifications </p>

            <div className={`${color?.text} text-lg font-bold  my-4`}>
              Rating reminders
            </div>
            <div className='flex'>
              <span className={`${color?.textgray} text-base ml-2  font-medium`}>Send an email reminding me to rate an item a week after purchase</span>
              <div className='items-center justify-end ml-auto'>
                <label className="inline-flex relative cursor-pointer">

                  <input type="checkbox" name="rating_reminder" defaultChecked={userProfileSettings?.rating_reminder}
                    onClick={(e) => {
                      setFlag(1);
                      setUserProfileSetting({ ...userProfileSettings, rating_reminder: e.target.checked })
                    }
                    }
                    className="sr-only peer" />
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                 dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-gray-700 
                    peer-checked:after:translate-x-full 
                peer-checked:after:border-white a fter:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                   after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                </label>
              </div>
            </div>
            <div className='hover:bg-gray-100 divide-y mt-2 whitespace-nowrap border-t my-2 border-gray-200'></div>


            <div className={`${color?.text} text-lg font-bold  my-4`}>
              Item update notifications
            </div>
            <div className='flex'>
              <span className={`${color?.textgray} text-base ml-2  font-medium`}>Send user and product notifications for you</span>
              <div className='items-center justify-end ml-auto'>
                <label className="inline-flex  relative  cursor-pointer">

                  <input type="checkbox" name="item_update" defaultChecked={userProfileSettings?.item_update}
                    onClick={(e) => {
                      setFlag(1);
                      setUserProfileSetting({ ...userProfileSettings, item_update: e.target.checked })
                    }
                    }
                    className="sr-only peer" />
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                 dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-gray-700 
                    peer-checked:after:translate-x-full 
                peer-checked:after:border-white a fter:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                   after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                </label></div>
            </div>
            <div className='hover:bg-gray-100 divide-y mt-2 whitespace-nowrap border-t my-2 border-gray-200'></div>


            <div className={`${color?.text} text-lg font-bold  my-4`}>
              Item comment notifications
            </div>
            <div className='flex'>
              <span className={`${color?.textgray} text-base ml-2  font-medium`}>Send me an email when someone comments on one of my items</span>
              <div className='items-center justify-end ml-auto'>
                <label className="inline-flex pb-6 relative  cursor-pointer">

                  <input type="checkbox" name="comment" defaultChecked={userProfileSettings?.comment}
                    onClick={(e) => {
                      setFlag(1);
                      setUserProfileSetting({ ...userProfileSettings, comment: e.target.checked })
                    }
                    }
                    className="sr-only peer" />
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                 dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-gray-700 
                    peer-checked:after:translate-x-full 
                peer-checked:after:border-white a fter:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                   after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                </label></div>
            </div>
            <div className='hover:bg-gray-100 divide-y mt-2 whitespace-nowrap border-t my-2 border-gray-200'></div>


            <div className={`${color?.text} text-lg font-bold  my-4`}>
              Buyer review notifications
            </div>
            <div className='flex'>
              <span className={`${color?.textgray} text-base ml-2  font-medium`}>Send me an email when someone leaves a review with their rating</span>
              <div className='items-center justify-end ml-auto'>
                <label className="inline-flex relative cursor-pointer">

                  <input type="checkbox" name="review" defaultChecked={userProfileSettings?.review}
                    onChange={(e) => {
                      setFlag(1);
                      setUserProfileSetting({ ...userProfileSettings, review: e.target.checked })
                    }
                    }
                    className="sr-only peer" />
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                 dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-gray-700 
                    peer-checked:after:translate-x-full 
                peer-checked:after:border-white a fter:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                   after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                </label>
              </div>
            </div>
            <div className='hover:bg-gray-100 divide-y mt-2 whitespace-nowrap my-2 border-t border-gray-200'></div>
            <div id="btn" className="flex mt-2 items-center justify-end ml-auto mr-0 ">

              <div className={flag !== 1 && spinner === 0 ? 'block' : 'hidden'}>
                <Button Primary={language?.UpdateDisabled} /></div>
              <div className={spinner === 0 && flag === 1 ? 'block' : 'hidden'}>
                <Button Primary={language?.Update} onClick={updateUserProfileSettings} />
              </div>
              <div className={spinner === 1 && flag === 1 ? 'block' : 'hidden'}>
                <Button Primary={language?.SpinnerUpdate} />
              </div>
            </div>

          </div>
        </div>
      </div>

      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />

    </>


  )
}

export default UserProfileSettings