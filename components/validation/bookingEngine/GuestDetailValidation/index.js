export default function validateGuestDetail(data) {
    if(data.length===0){
        return true;
    }
    else{var error = [];

        for (let i = 0; i < data.length; i++) {
            error.push({})
        }
        var flag = false;
    
        data.map((guest, index) => {
            // Validate all fields for the first guest
            if (index === 0) {
                if (!guest?.guest_name || !guest?.guest_email || !guest?.guest_phone_number || !guest?.guest_age) {
                    flag = true;
                    if (!guest?.guest_name) {
                        error[index].guest_name = "APP: Name field cannot be empty";
                    }
                    if (!guest?.guest_email) {
                        error[index].guest_email = "APP: Email field cannot be empty";
                    }
                    if (!guest?.guest_phone_number) {
                        error[index].guest_phone_number = "APP: Phone number field cannot be empty";
                    }
                    if (!guest?.guest_age) {
                        error[index].guest_age = "APP: Age field cannot be empty";
                    }
                }
            } else {
                // Validate only name and age fields for the additional guests
                if (!guest?.guest_name || !guest?.guest_age) {
                    flag = true;
                    if (!guest?.guest_name) {
                        error[index].guest_name = "APP: Name field cannot be empty";
                    }
                    if (!guest?.guest_age) {
                        error[index].guest_age = "APP: Age field cannot be empty";
                    }
                }
            }
    
            // Validating if email is valid
            if (guest?.guest_email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(guest?.guest_email)) {
                flag = true;
                error[index].guest_email = "APP: The email is invalid.";
            }
    
            // }The pattern allows for a phone number that starts with a digit from 1 to 9 and has a total length of 2 to 15 digits (inclusive).
            if (guest?.guest_phone_number !== "" && guest?.guest_phone_number !== undefined) {
                if (!/^\+?[1-9]\d{9,14}$/.test(guest?.guest_phone_number)) {
                    error[index].guest_phone_number = "APP: Phone number entered is invalid";
                    flag = true;
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
                if (guest?.guest_age > 150) {
                    error[index].guest_age = "APP: Age cannot be greater then 150"
                    flag = true
                }
    
            }
        });
   
        return flag === false ? true : error; 
    }
    
}
