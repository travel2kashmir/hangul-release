export default function validateGstDetail(data) {
    var error = {};
    var flag = false;

    // validating if registration number is empty or not 
    if (data?.gst_registration_no === "" || data?.gst_registration_no === undefined) {
        error.gst_registration_no = "APP: Registration Number field cannot be empty"
        flag = true
    }

    // validating if company name is empty or not 
    if (data?.gst_company_name === "" || data?.gst_company_name === undefined) {
        error.gst_company_name = "APP: Company Name field cannot be empty"
        flag = true
    }

    // validating if company address is empty or not 
    if (data?.gst_company_address === "" || data?.gst_company_address === undefined) {
        error.gst_company_address = "APP: Company Address field cannot be empty"
        flag = true
    }
    return flag === false ? true : error;
}
