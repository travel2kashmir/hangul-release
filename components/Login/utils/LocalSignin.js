export default function LocalSignin(whoIsLogged){
    localStorage.setItem("Signin Details", JSON.stringify(whoIsLogged));
  };
