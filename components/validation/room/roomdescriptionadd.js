const validateRoom = (data, props,room_identifier) => {
    var error = {};
    var flag = []
    var final_flag = true;

    if(room_identifier?.length!=data?.inventory_count){
        flag.push(false)
        error.room_identifier = "APP: The number of identifiers should be equal to inventory."
    }
    if (props?.length === 0) {
        flag.push(false)
        error.view = "APP: The views are required."
    }
    if (data?.room_name === "" || data?.room_name === undefined) {
        flag.push(false)
        error.room_name = "APP: The room name is required."
    }
    if (data?.room_type === "" || data?.room_type === undefined) {
        flag.push(false)
        error.room_type = "APP: The room type is required."
    }
    if (data?.room_description === "" || data?.room_description === undefined) {
        flag.push(false)
        error.room_description = "APP: The room description is required."
    }
    if (data?.room_capacity === "" || data?.room_capacity === undefined) {
        flag.push(false)
        error.room_capacity = "APP: The room description is required."
    }
    if (data?.maximum_number_of_occupants === "" || data?.maximum_number_of_occupants === undefined) {
        flag.push(false)
        error.maximum_number_of_occupants = "APP: The maximum number of occupants is required."
    }
    if (data?.minimum_number_of_occupants === "" || data?.minimum_number_of_occupants === undefined) {
        flag.push(false)
        error.minimum_number_of_occupants = "APP: The minimum number of occupants is required."
    }
    if (data?.minimum_age_of_occupants === "" || data?.minimum_age_of_occupants === undefined) {
        flag.push(false)
        error.minimum_age_of_occupants = "APP: The minimum age of occupants is required."
    }
    if (data?.room_length == "" || data?.room_length == undefined) {
        flag.push(false)
        error.room_length = "APP: The room length is required."
    }
    if (data?.room_width == "" || data?.room_width == undefined) {
        flag.push(false)
        error.room_width = "APP: The room width is required."
    }
    if (data?.room_height === "" || data?.room_height === undefined) {
        flag.push(false)
        error.room_height = "APP: The room height is required."
    }
    if (data?.room_style === "" || data?.room_style === undefined) {
        flag.push(false)
        error.room_style = "APP: The room style is required."
    }
    if (data?.is_room_sharing === "" || data?.is_room_sharing === undefined) {
        flag.push(false)
        error.is_room_sharing = "APP: The room shared is required."
    }
    if (data?.is_room === "" || data?.is_room === undefined) {
        flag.push(false)
        error.is_room = "APP: The is room field is required."
    }

    if (data?.room_capacity !== "" && data?.room_capacity !== undefined) {
        if (!(/^([1-9]+[0-9]*)$/.test(data.room_capacity))) {
            flag.push(false)
            error.room_capacity = "APP: The room capacity accepts only numbers."
        }
    }
    
    if (data?.inventory_count != "" && data?.inventory_count != undefined) {
        if (isNaN(data?.inventory_count) || data?.inventory_count < 0 || data?.inventory_count > 100) {
            flag.push(false)
            error.inventory_count = "APP: The inventory count must be between 0 and 100"
        }
    }
    if (data?.inventory_count === "" || data?.inventory_count === undefined) {
        flag.push(false)
            error.inventory_count = "APP: The inventory count is empty "
    }


    if (data?.room_capacity < data?.maximum_number_of_occupants) {
        flag.push(false)
        error.room_capacity = "APP: The room capacity should be greater than max occupants."

    }
    if (data?.maximum_number_of_occupants !== "" && data?.maximum_number_of_occupants !== undefined) {
        if (!(/^([1-9]+[0-9]*)$/.test(data.maximum_number_of_occupants))) {
            flag.push(false)
            error.maximum_number_of_occupants = "APP: The maximum number of occupants accepts only numbers."
        }
        if (data?.maximum_number_of_occupants < data?.minimum_number_of_occupants) {
            flag.push(false)
            error.maximum_number_of_occupants = "APP: The maximum number of occupants must be greater than minimum number of occupants."
        }
    }
    if (data?.minimum_number_of_occupants !== "" && data?.minimum_number_of_occupants !== undefined) {
        if (!(/^([1-9]+[0-9]*)$/.test(data.minimum_number_of_occupants))) {
            flag.push(false)
            error.minimum_number_of_occupants = "APP: The minimum number of occupants accepts only numbers."
        }
        if (data?.minimum_number_of_occupants > data?.maximum_number_of_occupants) {
            flag.push(false)
            error.minimum_number_of_occupants = "APP: The minimum number of occupants must be less than maximum number of occupants."
        }
    }
    if (data?.minimum_age_of_occupants !== "" && data?.minimum_age_of_occupants !== undefined) {
        if (!(/^([1-9]+[0-9]*)$/.test(data.minimum_age_of_occupants))) {
            flag.push(false)
            error.minimum_age_of_occupants = "APP: The minimum age of occupants accepts only numbers."
        }
    }
    if (data?.room_length != "" && data?.room_length != undefined) {
        if (!(/^([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(data?.room_length))) {

            flag.push(false)
            error.room_length = "APP: The room length accepts only numbers and decimal values."
        }
    }
    if (data?.room_width != "" && data?.room_width != undefined) {
        if (!(/^([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(data?.room_width))) {
            flag.push(false)
            error.room_width = "APP: The room width accepts only numbers and decimal values. "
        }
    }
    if (data?.room_height != "" && data?.room_height != undefined) {
        if (!(/^([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(data?.room_height))) {
            {
                flag.push(false)
                error.room_height = "APP: The room height accepts only numbers and decimal values."
            }
        }
    }
    final_flag = flag.every(value => value !== false);

    return final_flag === true ? true : error;
}
export default validateRoom