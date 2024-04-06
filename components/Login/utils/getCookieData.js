import Cookies from 'js-cookie';
export default function getCookieData(setSigninDetails,setCurrent) {
    var mail = Cookies.get("email");
    var pass = Cookies.get("password")
    setSigninDetails({ "email": mail, "password": pass })
    if (mail != undefined) {
      document.getElementById('email').value = mail;
      document.getElementById('password').value = pass;
      document.getElementById('remember').checked = true;
      setCurrent(true)
    }
  }