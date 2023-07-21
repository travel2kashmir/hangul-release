
export function ValidateContactUs(data) {
    let hasError = false;
    let error = {};
    // to check if the data is empty start
    if (data.message_subject === '' || data.message_subject === undefined) {
        error.message_subject = 'App: message subject required.'
        hasError = true
    }
    if (data.message === '' || data.message === undefined) {
        error.message = 'App: Message required.';
        hasError = true
    }
    if (data.sender_name === '' || data.sender_name === undefined) {
        error.sender_name = 'App: Sender name required.';
        hasError = true
    }
    if (data.sender_email === '' || data.sender_email === undefined) {
        error.sender_email = 'App: Sender email required.';
        hasError = true
    }
    // to check if the data is empty end

    // to check if the email is valid
    if (data.sender_email !== "" && data.sender_email !== undefined) {
         if ((!data.sender_email?.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))) {
                hasError=true;
                error.sender_email = "APP: The email is invalid."
            }
        
    }
    return hasError === true ? error : true;
}