const roomDiscountValidation = (all_data) => {
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
        if (data?.discount_type === "" || data?.discount_type === undefined) {
            flag.push(false)
            error[index].discount_type = "APP: The discount-type is required."
        }
        if (data?.discount_on === "" || data?.discount_on === undefined) {
            flag.push(false)
            error[index].discount_on = "APP: The discount-on is required."
        }
        if (data?.discount === "" || data?.discount === undefined) {
            flag.push(false)
            error[index].discount = "APP: The discount is required."
        }
        // is data present checking end
        // validating dates 
        if((largerDate(data?.date_from,data?.date_to) === data?.date_from || false)){
            flag.push(false)
            error[index].date_from= "APP: The date-from must be less than date-to."
            error[index].date_to= "APP: The date-from must be less than date-to."
        }

        if (data?.discount <= 0 || data?.discount >= 100) {
            flag.push(false)
            error[index].discount = "APP: The discount cannot be less than 0 or greater than 100."
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
function largerDate(d1, d2){
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();

    if (date1 < date2) {
        return(d2);
    } else if (date1 > date2) {
        return(d1);
    } else {
        return false;
    }
};

export default roomDiscountValidation;