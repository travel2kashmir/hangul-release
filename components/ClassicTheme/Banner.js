import React from 'react';
import LineLoader from '../loaders/lineloader';

function Banner({ args, language, visible }) {
   return (
      // <div id="contactus" className="tour-content-block">
      <div id="contactus" className="mt-10 border-b">

         {/* <div className="tour-help"> */}
         <div className="rounded-lg bg-cover bg-center bg-[url('https://tailwind-css-travel-booking.vercel.app/dist/images/tour-hero.jpeg')]">

            {/* <div className="tour-help-inner"> */}
            <div className="relative py-12 px-10 mb-4 h-80 bg-gradient-to-r from-red-600 via-red-600 to-orange-500 opacity-90">

               {/* <div className="tour-help-content"> */}
               <div className="w-full text-white">

                  {/* <div className="tour-help-title">{language?.needhelpbooking}</div> */}
                  <div className="text-xl lg:text-3xl font-semibold">{language?.needhelpbooking}</div>

                  {/* <div className="tour-help-text"> */}
                  <div className="mt-5 text-sm opacity-95 lg:text-base ">
                     {language?.bookingtitle}
                  </div>
               </div>

               <br />

               <div className='inline-block'>

                  {/* <div className="tour-help-call"> */}
                  <div className="mt-10 flex cursor-pointer items-center rounded-md px-4 py-3 lg:px-5 lg:py-4 lg:text-base text-sm font-medium tracking-wide bg-white bg-opacity-100 text-slate-700 text-opacity-100">
                     <span className="material-icons-outlined text-orange-400"> call </span>

                     {/* <div className="tour-help-call-text"> */}
                     <div className="">
                        <div className={visible === 0 ? 'block h-2 w-32 mb-6' : 'hidden'}><LineLoader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                           {args?.phone?.contact_data}</div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
   )
}

export default Banner