import { useEffect, useState } from "react";
import Title from "../components/title";
import Axios from "axios";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import colorFile from "../components/colors/Color";
import { useRouter } from "next/router";
import Button from "../components/Button";
import { InitialActions, ColorToggler } from "../components/initalActions";
import { english, arabic, french } from "../components/Languages/Languages"
import {ForgotPassword, InputEmail,InputPassword, RememberMe,LocalSignin,setCookieData,getCookieData} from "../components/Login";
let language;
let currentLogged;
let currentProperty;
let user = false;

function Signin() {
  const [lang, setLang] = useState("");
  const [spinner, setSpinner] = useState(0)
  /** Router for Redirection **/
  const router = useRouter();
  let locale = router?.locale;
  const [current, setCurrent] = useState(false)
  const [error, setError] = useState({})
  const [color, setColor] = useState({})
  const [modeChanger, setModeChanger] = useState("")
  const [mode, setMode] = useState();

  /** State for internationalization **/
  useEffect(() => {
    onComponentLoadActions()
    getCookieData(setSigninDetails,setCurrent);
  }, [locale])

  // First Function
  const onComponentLoadActions = () => {
    if (typeof window !== 'undefined') {
      const resp = InitialActions({ setColor, setMode })
      language = resp?.language;
      currentLogged = resp?.currentLogged;
      currentProperty = resp?.currentProperty;
      // colorToggle = resp?.colorToggle
  
      if (JSON.stringify(currentLogged) != "null") {
        let currentUser = JSON.parse(localStorage.getItem("Signin Details"));
        if (currentUser?.id.match('user00.[0-9]*')) {
          router.push('./property/landing')
        }
        else if (currentUser?.id.match('admin00.[0-9]*')) {
          router.push('./admin/adminlanding');
        }
      } 
      
  }
  }
 

  /** Function for Internationalisation **/
  const changelanguage = (item) => {
    if (item != localStorage.getItem("Language")) {
      let locale = item;
      /** Language selected stored to the localstorage **/
      localStorage.setItem("Language", locale);
      language = locale;
      router?.push("/", "/", { locale });
    }
  };

  /** State for Sign In **/
  const [signinDetails, setSigninDetails] = useState({
    email: "",
    password: "",
  });

  
  
  /** Sign In Submit Function **/
  const submitSignIn = async (e) => {
    e.preventDefault()
    if (validation(signinDetails)) {
      setSpinner(1)
      var item = {
        user_email: signinDetails.email,
      };
      /** API POST call to send Sign Details **/
      Axios.post("/api/signin/user", item, {
        headers: { "content-type": "application/json" },
      })
        .then(async (response) => {
          /** Password Decryption **/
          const salt = response.data.salt;
          const EncryptedPass = await bcrypt.hash(signinDetails.password, salt);
          if (EncryptedPass === response.data.password) {

            /** Toast emitter Sign in Successfull **/
            const whoIsLogged = {
              id: response.data.id,
              name: response.data.name,
              email: signinDetails?.email,
              password: response.data?.password,
              admin_type: response.data?.admin_type,
              user_type: response.data?.user_type
            };


            {/*To re-direct to required module*/ }
            if (response.data.id.match(/admin00.[0-9]*/g)) {
              LocalSignin(whoIsLogged);
              router.push("./admin/adminlanding")
            }
            else {
              LocalSignin(whoIsLogged);
              router.push("./property/landing");
            }
          } else {
            setSpinner(0)
            /** Toast emitter for error wrong email password combination  **/
            toast.error("API: The password that you've entered is incorrect.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })

        .catch((error) => {
          if (error.message === `Request failed with status code 401`) {
            setSpinner(0);
            /** Toast emitter fo: Invalid Email error  **/
            toast.error("API: The email address you entered isn't connected to an account.", {
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
            setSpinner(0);
            /** Toast emitter for Sign in error  **/
            toast.error("API: Network error!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }

        });
    }
  };

  // Validation Function
  const validation = (signinDetails) => {
    var Result = checkFormData(signinDetails);
    if (Result === true) {
      return true;
    }
    else {
      setError(Result);
      return false;

    }

  }
  //Checking Form Data for Validations
  const checkFormData = (signinDetails) => {
    var error = {};
    if (signinDetails?.email === "" || signinDetails.email === undefined) {
      error.email = "The email field is required."
    }
    if ((!signinDetails?.email?.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) && (signinDetails?.email != "" && signinDetails.email != undefined))) {
      error.email = "The email field is in invalid format."
    }
    if (signinDetails?.password === "" || signinDetails.password === undefined) {
      error.password = "The password field is required"
    }
    return Object.keys(error).length === 0 ? true : error;
  }


  return (
    <>
      <Title id="title" name="Engage | Sign in" />
      <div data-testid='main-div'
        className={`min-h-screen ${color?.greybackground} p-4 `}>
        <div className="mx-auto  flex flex-col justify-center items-center px-4 pt-8 pt:mt-0">
          <span className={`${color.text} self-center text-3xl  mb-4 mt-2 tracking-normal font-bold  whitespace-nowrap`}>
            enGage
          </span>

          <div className={`${color?.whitebackground} shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0`} >
            <div className="p-4 sm:p-8 lg:p-16 space-y-8">
              <h2 className={`${color.text} text-2xl lg:text-3xl capitalize font-bold`}  >
                {language?.title}
              </h2>
              {/** Signin Form **/}
              <form data-testid='signin-form' className="mt-8 space-y-6" action="#">
                {/* email input  */}
                <InputEmail
                label= {language?.email}
                onChangeAction={(e) => {
                  setSigninDetails({
                    ...signinDetails,
                    email: e.target.value,
                  }),
                    setError({ ...error, email: '' })
                }}
                error={error?.email}
                color={color}
                disabled={false}
                req={true}
                />

                {/* password input  */}
                <InputPassword
                label= {language?.password}
                onChangeAction={(e) => {
                  setSigninDetails({
                    ...signinDetails,
                    password: e.target.value,
                  })
                  setError({ ...error, password: '' })
                }}
                error={error?.password}
                color={color}
                disabled={false}
                req={true}
                />
               {/* remember me and forgot password   */}
                <div className="flex items-start">
                  <RememberMe current setCookieData signinDetails setCurrent color remember={language?.remember}/>
                  {/* <ForgotPassword lost={language?.lost}/> */}
                </div>

                {/* buttons  */}
                <div className={spinner === 0 ? 'block' : 'hidden'}>
                  <Button testid='submitbtn' Primary={language?.Signin} onClick={(e) => { submitSignIn(e); }} />
                </div>
                <div className={spinner === 1 ? 'block' : 'hidden'}>
                  <Button Primary={language?.SpinnerSignin} />
                </div>

               
              </form>
            </div>
          </div>

          {/* manage languages  */}
          
          <div className=" mx-64 mt-2 text-teal-600">
            <div>
              <button
                data-testid="en-btn"
                className={lang === "en" ? "text-teal-600 text-sm font-bold mx-1 " : "mx-1 text-teal-600 text-sm"}
                onClick={() => {
                  setLang("en");
                  changelanguage("en");
                }}
              >
                English
              </button>|
              <button
                data-testid="fr-btn"
                className={lang === "fr" ? "mx-1 text-teal-600 text-sm font-bold" : "mx-1 text-teal-600 text-sm"}
                onClick={() => {
                  setLang("fr");
                  changelanguage("fr");
                }}
              >
                Français
              </button>|
              <button
                data-testid="ar-btn"
                className={lang === "ar" ? "text-teal-600 text-sm font-bold mx-1" : "mx-1 text-teal-600 text-sm"}
                onClick={() => {
                  setLang("ar");
                  changelanguage("ar");
                }}
              >
                عربى
              </button>
            </div>
          </div>
        </div>
        {/** Toast Container **/}
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
      </div>
    </>


  );
}
export default Signin;


