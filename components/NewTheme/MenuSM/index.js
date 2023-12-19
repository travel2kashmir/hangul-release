import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

function MenuSM({ setShowContactUs, lang, setMenu }) {

    let listStyle = "pb-1 md:pb-2 hover:text-slate-500";

    return (
        <React.Fragment>
            <div className='absolute inset-0 w-full h-72 md:h-80 bg-white opacity-75 rounded-bl-3xl rounded-br-3xl  md:rounded-br-full z-50'>
                <i onClick={() => setMenu(false)} className='flex justify-end pt-5 pr-5 cursor-pointer hover:text-slate-500'><CloseIcon /></i>
                <div className='text-center text-black pt-10 md:pt-12'>
                    <ul className='inline-block font-bold'>
                        <li className={listStyle}><a href='#about'>{lang?.about}</a></li>
                        <li className={listStyle}><a href="#rooms">{lang?.rooms}</a></li>
                        <li className={listStyle}><a href='#photos'>{lang?.photos}</a></li>
                        <li className={listStyle}><a href='#services'>{lang?.services}</a></li>
                        <li className={listStyle}><a href='#reviews'>{lang?.reviews}</a></li>
                        <li onClick={() => { setShowContactUs(1), setMenu(0) }} className={listStyle}>{lang?.contactUs}</li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MenuSM