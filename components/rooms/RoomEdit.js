import React, { useState } from 'react';
import InputText from '../utils/InputText';
import Button from '../Button';
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';

function RoomEdit({ roomData, color, language,fetchDetails,setRoomRateEditModal }) {
    const [editedRoomPrice, setEditedRoomPrice] = useState({})
    const [error, setError] = useState({})

    const validateEditedRate = (editedRoomPrice)=>{
        const {price}=editedRoomPrice;
        let flag=false;
        let errorFound={}
        if (isNaN(price)){
                flag=true;
                errorFound.price="Rate should be number";
        }
        if( price <= 0) {
            flag=true
            errorFound.price="Rate should be greater than zero";
        }
      return flag===true?errorFound:true
    }

    

    const sendRateUpdate = () => {
        let result = validateEditedRate(editedRoomPrice);
        if (result === true) {
            let url = '/api/room_rate_plan';
            let data = {
                "room_rate_plan": [
                    {
                        "room_rate_plan_id": roomData?.room_rate_plan_id,
                        "price": editedRoomPrice.price
                    }
                ]
            }
            axios.put(url,data,{"header":{"content-type":"application/json"}})
            .then((resp)=>{
                toast.success("API: Rate edit sucess");
                fetchDetails();
                setError({})
                setRoomRateEditModal(0)
            })
            .catch((err)=>toast.error('Update Error'))
        }
        else {
            setError(result)
        }
    }
    return (<>
        <div className='flex flex-wrap'>
            {/* meal name  */}
            <InputText
                label={"Meal Name"}
                visible={1}
                defaultValue={roomData.meal_name}
                onChangeAction={undefined}
                error={error?.meal_name}
                color={color}
                req={true}
                disabled={true}
            />
            {/* meal price  */}
            <InputText
                label={"Price"}
                visible={1}
                defaultValue={roomData.price}
                onChangeAction={(e) => setEditedRoomPrice({ ...roomData, "price": e.target.value })}
                error={error?.price}
                color={color}
                req={true}
                tooltip={true}
                title={'New price for the meal plan'}
            />
        </div>
       <div className='flex justify-end'>
       <Button
            testid="edit_button"
            Primary={language?.Update}
            onClick={sendRateUpdate}
        />
        </div>
       <ToastContainer position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
  
    </>
    )
}

export default RoomEdit