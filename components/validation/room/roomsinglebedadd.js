const validateBedAdd = (data) => {
    var error={};
     var flag=[]
     var final_flag=true;
    
     if (data?.bed_length === "" || data?.bed_length === undefined) {
      flag.push(false)
      error.bed_length = "APP: The bed length is required."
    }
      
      if (data?.bed_width === "" || data?.bed_width === undefined) {
        flag.push(false)
        error.bed_width= "APP: The bed width is required."
      }
      if(data?.bed_length != "" && data?.bed_length != undefined)
      {
         if(!(/^([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(data?.bed_length))){
          flag.push(false)
          error.bed_length="APP: The bed length accepts only numbers and decimal values."
      }
     }
     if(data?.bed_width != "" && data?.bed_width != undefined)
     {
        if(!(/^([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(data?.bed_width))){
         flag.push(false)
         error.bed_width="APP: The bed width accepts only numbers and decimal values."
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
  export default validateBedAdd
  
  