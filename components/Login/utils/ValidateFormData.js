function ValidateFormData(signinDetails) {
    //Checking Form Data for Validations
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

export default ValidateFormData