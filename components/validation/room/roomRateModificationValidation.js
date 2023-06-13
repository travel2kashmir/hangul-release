const roomRateModificationValidation = (all_data) => {
    let error = []
    // to initialise empty error object equal to the number of object in data array 
    for (let i = 0; i < all_data.length; i++) {
        error.push({})
    }
    var flag = []
    var final_flag = true;
    all_data.map((data, index) => {
        // is data present checking start 
        if (data?.date_from === "" || data?.date_from === undefined) {
            flag.push(false)
            error[index].date_from = "APP: The date-from is required."
        }
        if (data?.date_to === "" || data?.date_to === undefined) {
            flag.push(false)
            error[index].date_to = "APP: The date-to is required."
        }
        if (data?.orginal_rate === "" || data?.orginal_rate === undefined) {
            flag.push(false)
            error[index].orginal_rate = "APP: The orginal rate is required."
        }
        if (data?.modified_rate === "" || data?.modified_rate === undefined) {
            flag.push(false)
            error[index].modified_rate = "APP: The modified_rate is required."
        }
        // is data present checking end
        // validating dates 
        if ((largerDate(data?.date_from, data?.date_to) === data?.date_from || false)) {
            flag.push(false)
            error[index].date_from = "APP: The date-from must be less than date-to."
            error[index].date_to = "APP: The date-from must be less than date-to."
        }

        if (data?.orginal_rate <= data?.modified_rate) {
            flag.push(false)
            error[index].orginal_rate = "APP: The orginal rate should be less than modified rate"
            error[index].modified_rate = "APP: The modified rate should be greater than orginal rate."
        }
    })

    //    if any of the element is true then final flag is turned to false and error object is returned 
    for (let value in flag) {
        if (flag[value] === false) {
            final_flag = false;
            break;
        }

    }

    return final_flag === true ? true : error;
}


//to check which date is larger
function largerDate(d1, d2) {
    let date1 = new Date(d1)
    let date2 = new Date(d2)
    if (date1 < date2) {
        return (d2);
    } else if (date1 > date2) {
        return (d1);
    } else {
        return false;
    }
};

export default roomRateModificationValidation;