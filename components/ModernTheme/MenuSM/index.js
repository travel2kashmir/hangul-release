import React,{useState} from 'react'
import Router from 'next/router';
import ContactUsModal from '../Modals/ContactUsModal';

function MenuSM() {

    const [showModalContactUs, setShowModalContactUs] = useState(0);

    function clickHandler(id, action) {
        action === 'modal' ? id() : Router.push(`${window?.location?.origin}/${id}`)
    }


    return (
        <React.Fragment>
            <div className='absolute inset-0 w-9/12 mx-auto h-60 mt-28 md:h-80 bg-gray-800 opacity-100 rounded-b-3xl'>
                <div className='text-center text-white pt-10 md:pt-12'>
                    <ul className='inline-block font-semibold'>
                        {[{ "label": "About", "id": "#about", "action": "href" },
                        { "label": "Rooms", "id": "#rooms", "action": "href" },
                        { "label": "Photos", "id": "#photos", "action": "href" },
                        { "label": "Services", "id": "#services", "action": "href" },
                        { "label": "Reviews", "id": "#reviews", "action": "href" },
                        { "label": "Contact Us", "id": () => { setShowModalContactUs(1) }, "action": "modal" }
                        ].map((item, index) => {
                            return (
                                <li key={index} onClick={() => clickHandler(item?.id, item?.action)} className='text-gray-400 hover:text-white hover:underline pb-2'>{item?.label}</li>
                            )
                        })}

                    </ul>
                </div>
            </div>
             {/* modal for contact us*/}
             <div className={showModalContactUs === 1 ? "block" : "hidden"}>
                <ContactUsModal
                    setShowModalContactUs={setShowModalContactUs}
                />
            </div>
        </React.Fragment>
    )
}

export default MenuSM