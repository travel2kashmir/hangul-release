import React from 'react';
import LineLoader from '../loaders/lineloader';

function Banner({args,language,visible}) {
  return (
    <div id="contactus" className="tour-content-block">
    <div className="tour-help">
       <div className="tour-help-inner">
          <div className="tour-help-content">
             <div className="tour-help-title">{language?.needhelpbooking}</div>
             <div className="tour-help-text">
                {language?.bookingtitle}
             </div>
          </div>
          <br/>
          <div className="tour-help-call">
             <span className="material-icons-outlined"> call </span>
             <div className="tour-help-call-text">
                <div className={visible === 0 ? 'block h-2 w-32 mb-6' : 'hidden'}><LineLoader /></div>
                <div className={visible === 1 ? 'block' : 'hidden'}>
                   {args?.phone?.contact_data}</div>
             </div>
          </div>
       </div>
    </div>
 </div>
  )
}

export default Banner