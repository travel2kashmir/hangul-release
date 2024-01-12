function validateRatePlans(rates) {
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

        if (!/^\d+(\.\d+)?$/.test(rate.price)) {
            temp.price = "Price must be non negative number";
            hasError = true;
        }

        errors[idx]=temp
    // Add additional validation checks for other fields if needed
    });
    return hasError ? errors : true;
}

export default validateRatePlans;
