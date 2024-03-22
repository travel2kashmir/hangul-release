import Cookies from 'js-cookie';
export default function setCookieData(checked,signinDetails) {
    if (checked) {
      Cookies.set("email", signinDetails.email, { expires: 30 })
      Cookies.set("password", signinDetails.password, { expires: 30 })
    }
    else {
      Cookies.remove("email");
      Cookies.remove("password")
    }
  }