export default function validateGuestDetail(data) {
    var error = [];

    for (let i = 0; i < data.length; i++) {
        error.push({})
    }
    var flag = false;

    data.map((guest, index) => {
        // Validate all fields for the first guest
        
            if (!guest?.guest_name || !guest?.guest_age || guest?.room_id) {
                flag = true;
                if (!guest?.guest_name) {
                    error[index].guest_name = "APP: Name field cannot be empty";
                }
               
                if (!guest?.guest_age) {
                    error[index].guest_age = "APP: Age field cannot be empty";
                }

                if (!guest?.room_id) {
                    error[index].room_id = "APP: Room must be selected and cannot be empty";
                }
            }
        

        

        // validating if age is empty or not
        if (guest?.guest_age === "" || guest?.guest_age === undefined) {
            error[index].guest_age = "APP: Age field cannot be empty"
            flag = true
        } else {
            // validating if age is within 150
            if ((!guest?.guest_age?.match(/^([1-9]+[0-9]*)$/))) {
                error[index].guest_age = "APP: Age entered is invalid"
                flag = true
            }
            if (guest?.guest_age > 150 ||guest?.guest_age < 0) {
                error[index].guest_age = "APP: Age cannot be greater then 150 or less than 0"
                flag = true
            }

        }
    });

    return flag === false ? true : error;
}
