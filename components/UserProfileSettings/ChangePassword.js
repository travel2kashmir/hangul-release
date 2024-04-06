import React from 'react';
import Button from '../Button';
import InputText from '../utils/InputText';
import { InputEmail } from '../Login';


function ChangePassword({color,language,setSigninDetails,signinDetails,spinner,flag,setFlag,validationChangePassword, error}) {
  return (
    <div className={`${color?.whitebackground} shadow rounded-lg px-12 my-2 sm:p-6 xl:p-8  2xl:col-span-2`}>

          <h3 className={`${color?.text} text-base font-bold pt-4 mb-4`}>
            {language?.changepassword}
          </h3>

          <div className="pt-6">
            <div className=" md:px-4 mx-auto w-full">
              <div className="flex flex-wrap">
                {/* current password  */}
                
                <InputText
                  label={language?.currentpassword}
                  visible={1}
                    onChangeAction={ (e) => (
                    setSigninDetails({ ...signinDetails, old_password: e.target.value }, setFlag(1))
                  )
                  }
                  color={color}
                  error={error?.old_password}
                />

                {/* new password  */}

                <InputText
                  label={language?.newpassword}
                  visible={1}
                  
                  onChangeAction={  (e) => (
                    setSigninDetails({ ...signinDetails, new_password: e.target.value }, setFlag(1))
                  )
                  }
                  error={error?.new_password}
                  color={color}
                />
                {/* confirm password  */}
                <InputText
                  label={language?.confirmpassword}
                  visible={1}
                  
                  onChangeAction={  (e) => (
                    setSigninDetails({ ...signinDetails, confirm_password: e.target.value }, setFlag(1))
                  )
                  }
                  error={error?.confirm_password}
                  color={color}
                />
                
               <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <p className={`${color?.text} text-base font-semibold  mt-2 mb-1`}>Password requirements:</p>
                    <p className={`${color?.textgray} text-sm   font-medium mb-1`}>Ensure that these requirements are met:</p>
                    <div className={`${color?.textgray} text-sm ml-2  font-medium`}>
                      At least 10 characters (and up to 100 characters)<br />
                      At least one lowercase character<br />
                      Inclusion of at least one special character, e.g., ! @ # ? <br />
                    </div>
                  </div></div>
              </div>
            </div>
          </div>

          

          <div id="btn" className="flex items-center justify-end ml-auto mr-2 ">
            <div className={flag !== 1 && spinner === 0 ? 'block' : 'hidden'}>
              <Button Primary={language?.UpdateDisabled} /></div>
            <div className={spinner === 0 && flag === 1 ? 'block' : 'hidden'}>
              <Button Primary={language?.Update} onClick={validationChangePassword} />
            </div>
            <div className={spinner === 1 && flag === 1 ? 'block' : 'hidden'}>
              <Button Primary={language?.SpinnerUpdate} />
            </div>
          </div>
        </div>
  )
}

export default ChangePassword

