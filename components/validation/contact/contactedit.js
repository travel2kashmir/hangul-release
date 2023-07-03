import { parsePhoneNumber } from "awesome-phonenumber";
const validateContactEdit = (data, props) => {

    var error = {};
    var flag = []
    var final_flag = true;

    if (data.name === "" || data.name === undefined) {
        flag.push(false)
        error.name = "APP: The contact type is required"
    }

    if (data.type === "" || data.type === undefined) {
        flag.push(false)
        error.type = "APP: The contact data is required."
    }


    if (data.name === "Email") {
        if ((!data.type?.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))) {
            flag.push(false)
            error.type = "APP: The email is invalid."
        }
    }
    if (data.name === "website") {
        if ((!data.type?.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/))) {
            flag.push(false)
            error.contact_data = "APP: The website is invalid."
        }
    }

    if (data.name !== "" && data.name !== undefined) {
        if (data.name === "Tdd Number") {
            if ((!data.type?.match(/^([1-9]+[0-9]*)$/))) {
                flag.push(false)
                error.type = "APP: The tdd number is invalid."
            }
        }
    }
    if (data.name !== "" && data.name !== undefined) {
        if (data.name === "Toll Free Number") {
            if ((!data.type?.match(/^([1-9]+[0-9]*)$/))) {
                flag.push(false)
                error.type = "APP: The toll free number is invalid."
            }
        }
    }
    if (data.name !== "" && data.name !== undefined) {
        if (data.name === "Phone") {
            // regex to check string may have + at start , may have - after 2 digits and must have only numbers
            const regex = /^(\+)?\d{2}(-)?\d+$/;
            if (regex.test(data.type) === false) {
                flag.push(false)
                error.type = `APP: The phone number is invalid.`
            }
            const pn = parsePhoneNumber(data.type, { regionCode: props })
            if (pn?.valid == false) {
                flag.push(false)
                error.type = `APP: The phone number is invalid.`
            }
        }
    }
    for (let value in flag) {

        if (flag[value] === false) {
            final_flag = false;
            break;
        }

    }

    return final_flag === true ? true : error;
}
export default validateContactEdit

