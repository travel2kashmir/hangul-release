function validateRatePlans(rates) {
    console.log(rates)
    let errors = Array(rates.length).fill({});
    let hasError = false;

    rates.forEach((rate, idx) => {
        let temp={}
        if (rate.meal_plan_id === "" || rate.meal_plan_id === null) {
            temp.meal_plan_id = "Meal Plan must be selected";
            temp.meal_description = "Meal Plan must be selected";
            hasError = true;
        }
        
        if (rate.price === "" || rate.price === null ) {
            temp.price = "Price must be provided";
            hasError = true;
        }
        if (rate.tax === "" || rate.tax === null || rate.tax<0 || isNaN(rate.tax) ) {
            temp.tax = "Tax must be positive number";
            hasError = true;
        }
        if (rate.other_charges === "" || rate.other_charges === null || rate.other_charges < 0 || isNaN(rate.other_charges) ) {
            temp.other_charges = "Other charges must be positive number";
            hasError = true;
        }
        if (rate.extra_adult_price === "" || rate.extra_adult_price === null || rate.extra_adult_price < 0 || isNaN(rate.extra_adult_price) ) {
            temp.extra_adult_price = "Extra adult charges must be positive number";
            hasError = true;
        }
       
        if (rate.extra_child_price === "" || rate.extra_child_price === null ) {
            temp.extra_child_price = "extra_child_price must be provided";
            hasError = true;
        }

        if (!/^\d+(\.\d+)?$/.test(rate.price)) {
            temp.price = "Price must be non negative number";
            hasError = true;
        }
        if (!/^\d+(\.\d+)?$/.test(rate.extra_adult_price)) {
            temp.exta_adult_price = "exta_adult_price must be non negative number";
            hasError = true;
        }
        if (!/^\d+(\.\d+)?$/.test(rate.extra_child_price)) {
            temp.extra_child_price = "extra_child_price must be non negative number";
            hasError = true;
        }

        errors[idx]=temp
    // Add additional validation checks for other fields if needed
    });
    return hasError ? errors : true;
}

export default validateRatePlans;
