const validateUnavailability = (data,roomCodes) =>{
    var error={};
     var flag=[]
     var final_flag=true;
   if(data?.room_id==="" || data?.room_id===undefined)
   {
       flag.push(false)
       error.room="The Room is required."
   }
     if(data?.date_from==="" || data?.date_from===undefined)
     {
         flag.push(false)
         error.date_from="The start date is required."
     }
     if(data?.date_to==="" || data?.date_to===undefined)
     {
         flag.push(false)
         error.date_to="The end date is required."
     }
     if(data?.date_from >= data?.date_to)
     {
         flag.push(false)
         error.date_from="The start date should be less than the end date."
         error.date_to="The end date should be greater than the end date."
     }
     if(data?.reason ==="" || data?.reason===undefined)
     {
         flag.push(false)
         error.reason ="The reason is required."
     }
     if(data?.unavailability_count ==="" || data?.unavailability_count===undefined)
     {
         flag.push(false)
         error.unavailability_count ="The room count is required."
     }
     if(data?.unavailability_count<1)
     {
         flag.push(false)
         error.unavailability_count ="The room count Should be positive number."
     }

     if(data?.unavailability_count!= roomCodes.length)
     {
         flag.push(false)
         error.unavailability_count ="The room count Should be number of codes in room type codes";
         error.room_refrences ="The room count Should be number of codes in room type codes";
     }
    
     final_flag = flag.every(value => value !== false);
       return final_flag===true ? true : error;
     }
 export default  validateUnavailability
 
 