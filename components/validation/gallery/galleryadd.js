const validateGallery = (data,props) =>{
    var error={};
     var flag=[]
     var final_flag=true;

    if(data.image_title==="" || data.image_title===undefined)
    {
        flag.push(false)
        error.image_title="APP: The image title is required"
    }
   
    if(props==="" || props===undefined)
    {
        flag.push(false)
        error.image_link="APP: The image link is required."
    }

    if(data.image_description==="" || data.image_description===undefined)
    {
        flag.push(false)
        error.image_description="APP: The image description is required."
    }

    if(props !== "" && props !== undefined){
    if((!props?.match(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*/))){
        flag.push(false)
        error.image_link="APP: The image link is invalid."
    }
    }

    for (let value in flag) {
     
        if(flag[value]=== false)
         {
           final_flag = false;
           break;
         }
         
      } 
      return final_flag===true ? true : error;
    }
export default  validateGallery

