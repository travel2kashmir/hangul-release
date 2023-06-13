const validateSingleBedEdit = (data) => {
    var error={};
     var flag=[]
     var final_flag=true;
  
    var flag = []
    var final_flag = true;
    
      if (data?.name === "" || data?.name === undefined) {
        flag.push(false)
        error.name = "APP: The bed length is required."
      }
      if (data?.type === "" || data?.type === undefined) {
        flag.push(false)
        error.type= "APP: The bed width is required."
      }
      if(data?.name != "" && data?.name != undefined)
      {
         if(!(/^([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(data?.name))){
          flag.push(false)
          error.name="APP: The bed length accepts only numbers and decimal values."
      }
     }
     if(data?.type != "" && data?.type != undefined)
     {
        if(!(/^([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(data?.type))){
         flag.push(false)
         error.type="APP: The bed width accepts only numbers and decimal values."
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
  export default validateSingleBedEdit
  
  