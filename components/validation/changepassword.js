const validatechangePassword = (data) => {
    var error = {};
    var flag = []
    var final_flag = true;
    
        if(data.confirm_password == '' || data.confirm_password == undefined){
           
        flag.push(false)
        error.confirm_password = "APP: abcdThe confirm password is required"
        }
    
        if(data.new_password === '' || data.new_password === undefined){
        flag.push(false)
        error.new_password = "APP: The new password is required"
        }
   
        if(data.new_password !== data.confirm_password ){
            flag.push(false)
            error.new_password = "APP: The new password and confirm password doesn't match." 
            error.confirm_password = " APP: The new password and confirm password doesn't match." 
        }
       
        if (data.new_password !== '' && data.new_password !== undefined) {
        if (data.confirm_password !== '' && data.confirm_password !== undefined) {
        if(data.new_password === data.confirm_password ){
            if ((!data?.new_password?.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/))) {
                error.new_password = "APP: The password should be  min 8 letter password, with at least a symbol, upper and lower case letters and a number."
                error.confirm_password = "APP: The password should be  min 8 letter password, with at least a symbol, upper and lower case letters and a number."
              }
            
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
export default validatechangePassword

