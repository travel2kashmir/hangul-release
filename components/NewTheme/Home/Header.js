import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Loader from '../Loaders/Loader'
import { english, arabic, french } from '../../Languages/NewTheme';

function Header({ allHotelDetails, menu, setMenu, hotelDetailLoader, lang, setLang, setShowContactUs }) {
    return (
        <header className="relative px-7 md:px-10 py-12 md:py-16 font-bold">
            <div className="flex justify-between">
                <h1 className="text-lg text-white md:text-lg hotelLogo">
                    {hotelDetailLoader === 0 ? <Loader size={`h-10 w-32`} /> :
                        <>{allHotelDetails?.property_name}</>}

                </h1>
                <div className='flex gap-5 md:gap-10'>
                    <span className='hidden md:hidden lg:block'>
                        <ul className='lg:flex lg:gap-10 xl:gap-16 lg:text-white'>
                            <a href="#about"><li className='hover:text-slate-300 hover:underline'>{lang?.about}</li></a>
                            <a href="#rooms"><li className='hover:text-slate-300 hover:underline'>{lang?.rooms}</li></a>
                            <a href="#photos"><li className='hover:text-slate-300 hover:underline'>{lang?.photos}</li></a>
                            <a href="#services"><li className='hover:text-slate-300 hover:underline'>{lang?.services}</li></a>
                            <a href="#reviews"><li className='hover:text-slate-300 hover:underline'>{lang?.reviews}</li></a>
                            <a onClick={() => setShowContactUs(1)}><li className='hover:text-slate-300 hover:underline'>{lang?.contactUs}</li></a>
                        </ul>
                    </span>

                    <div className="relative w-20 lg:max-w-sm">
                        <select onChange={(e) => {
                            switch (e.target.value) {
                                case 'english': setLang(english);
                                    break;
                                case 'french': setLang(french);
                                    break;
                                case 'arabic': setLang(arabic);
                                    break;
                                default:
                            }
                            localStorage.setItem("lang", e.target.value)
                        }}
                            style={{ fontSize: "10px" }} className="text-xs text-white w-full relative -top-1 md:top-2 lg:-top-1 p-2 bg-transparent border rounded-md shadow-sm outline-none hover:border-indigo-600">
                            <option className='text-gray-500'>{lang?.language}</option>
                            <option className='text-gray-500 lg:text-xs' value={'english'}>English</option>
                            <option className='text-gray-500 lg:text-xs' value={'arabic'}>عربي</option>
                            <option className='text-gray-500 lg:text-xs' value={'french'}>Français</option>
                        </select>
                    </div>
                    <i onClick={() => setMenu(true)} className={`text-white ${menu === true ? 'hidden' : 'block'}  lg:hidden `}><MenuIcon className='relative -top-1  md:text-3xl md:top-2 cursor-pointer' sx={{ fontSize: 20 }} /></i>
                </div>
            </div>
        </header>
    )
}

export default Header