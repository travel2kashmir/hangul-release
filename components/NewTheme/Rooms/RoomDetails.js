import React, { useState } from 'react';
import BedIcon from '@mui/icons-material/Bed';
import LandscapeIcon from '@mui/icons-material/Landscape';
import GroupsIcon from '@mui/icons-material/Groups';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

function RoomDetails({room,lang}) {
    
    // alert(JSON.stringify(lang))
    return (
        <div className="mt-5 pt-10 bg-slate-200 rounded-md">
            <h2 className=' text-slate-500 font-semibold tracking-wide text-center text-2xl'>{lang?.roomDetails}</h2>
            <div className="px-5 py-5 lg:flex lg:justify-around lg:py-10">
                <p className='text-slate-500 pb-2'><SquareFootIcon /> &nbsp; {room.carpet_area} SQ.FT</p>
                <p className='text-slate-500 pb-2'><GroupsIcon />  &nbsp; {room.room_capacity} Adults</p>
                <p className='text-slate-500 pb-2'>{room?.views?.map((item, index) => {
                    return (  
                        <span key={index} >{index === 0 ? <LandscapeIcon /> : ','} &nbsp; {item?.view}  </span>
                    );
                })}</p>

                {/* {Object.keys(room).includes("beds") ? room.beds.length > 1 ? <p className='text-slate-500 pb-2'>- {room.beds.length} Beds </p> : <p className='text-slate-500 pb-2'>- {room.beds.length} Bed</p> : <></>} */}
                {Object.keys(room).includes("beds") ?
                    <p className='text-slate-500 pb-2'><BedIcon /> &nbsp; {room.beds.length} {room.beds.length > 1 ? "Beds" : "Bed"} <span> ({room?.beds?.map((item, index) => {
                        return (
                            <span key={index}>{index === 0 ? '' : ' , '} {item?.bed_width} * {item?.bed_length}</span>

                        );
                    })}) cm</span>
                    </p> : <></>}

            </div>
        </div>
    )
}

export default RoomDetails