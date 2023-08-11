export default function validateContact(data) {
    var error = {};
    var flag = false;

    // validating if email is empty or not
    if (data?.contact_email === "" || data?.contact_email === undefined) {
        error.contact_email = "APP: Email field cannot be empty"
        flag = true
    }
    // validating if email typed is valid or not
    if (data?.contact_email !== "" && data?.contact_email !== undefined) {
        if ((!data?.contact_email?.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))) {
            flag = true
            error.contact_email = "APP: The email is invalid."
        }
    }

    // validating if name is empty or not 
    if (data?.contact_name === "" || data?.contact_name === undefined) {
        error.contact_name = "APP: Name field cannot be empty"
        flag = true
    }

    // validating if phone number is empty or not
    if (data?.contact_phoneNumber === "" || data?.contact_phoneNumber === undefined) {
        error.contact_phoneNumber = "APP: Phone number field cannot be empty"
        flag = true
    }
    // validating if phone number entered is valid or not and also checking the length of the phone number
    if (data?.contact_phoneNumber !== "" && data?.contact_phoneNumber !== undefined) {
        if ((!data?.contact_phoneNumber?.match(/^([1-9]+[0-9]*)$/))) {
            error.contact_phoneNumber = "APP: Phone number entered is invalid"
            flag = true
        }
        if (data?.contact_phoneNumber?.length() > 10) {
            error.contact_phoneNumber = "APP: Phone number cannot be greater then 10 digits"
            flag = true
        }

    }

    // validating if message is empty or not
    if (data?.contact_message === "" || data?.contact_message === undefined) {
        error.contact_message = "APP: Message field cannot be empty"
        flag = true
    }
    // validating if message length is within 1000 characters
    if (data?.contact_message !== " " || data?.contact_message !== undefined) {
        if (data?.contact_message?.length() > 1000) {
            error.contact_name = "APP: Message cannot be greater then 1000 characters"
            flag = true
        }

    }

    return flag === false ? true : error;
}