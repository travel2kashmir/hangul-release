import React from 'react'
import Router from 'next/router';
import CloseIcon from '@mui/icons-material/Close';

function MenuSM({ setShowContactUs, lang, setMenu }) {

    return (
        <React.Fragment>
            <div className='absolute inset-0 w-full h-72 md:h-80 bg-white opacity-75 rounded-bl-3xl rounded-br-3xl  md:rounded-br-full z-50'>
                <i onClick={() => setMenu(false)} className='flex justify-end pt-5 pr-5 cursor-pointer hover:text-slate-500'><CloseIcon /></i>
                <div className='text-center text-black pt-10 md:pt-12'>
                    <ul className='inline-block font-bold'>
                        <li onClick={() => Router.push(`${window?.location?.origin}/${"#about"}`)} className='pb-1 md:pb-2 hover:text-slate-500'>{lang?.about}</li>
                        <li onClick={() => Router.push(`${window?.location?.origin}/${"#rooms"}`)} className='pb-1 md:pb-2 hover:text-slate-500'>{lang?.rooms}</li>
                        <li onClick={() => Router.push(`${window?.location?.origin}/${"#photos"}`)} className='pb-1 md:pb-2 hover:text-slate-500'>{lang?.photos}</li>
                        <li onClick={() => Router.push(`${window?.location?.origin}/${"#services"}`)} className='pb-1 md:pb-2 hover:text-slate-500'>{lang?.services}</li>
                        <li onClick={() => Router.push(`${window?.location?.origin}/${"#reviews"}`)} className='pb-1 md:pb-2 hover:text-slate-500'>{lang?.reviews}</li>
                        <li onClick={() => { setShowContactUs(1), setMenu(0) }} className='pb-1 md:pb-2 hover:text-slate-500'>{lang?.contactUs}</li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MenuSM