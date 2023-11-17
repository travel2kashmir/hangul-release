import React, { useState, useEffect } from 'react';
import RoomPriceCalendar from '../../../components/PriceCalendar/RoomPriceCalender';
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Title from "../../../components/title";
import axios from "axios";
import { InitialActions, ColorToggler } from '../../../components/initalActions';
import { english, french, arabic } from "../../../components/Languages/Languages";

var currentLogged;
let colorToggle;
var language;
let currentProperty;

const RoomPricePage = () => {
    const [color, setColor] = useState({});
    const [mode, setMode] = useState()
    const [property_name, setProperty_name] = useState('')
    const [visible, setVisible] = useState(0)
    const [error, setError] = useState([{}])
    // runs first in the code
    useEffect(() => {
        const resp = InitialActions({ setColor, setMode })
        language = resp?.language;
        currentLogged = resp?.currentLogged;
        currentProperty = resp?.currentProperty;
        setProperty_name(resp?.currentProperty?.property_name);
        colorToggle = resp?.colorToggle
        setVisible(1);
    }, [])


    return (
        <>
            <Title name={`Engage |  Rate Calendar`} />
            <Header
                color={color}
                setColor={setColor}
                Primary={english.rateCalendarSide}
                Type={currentLogged?.user_type}
                Sec={ColorToggler}
                mode={mode}
                setMode={setMode}
            />
            <Sidebar
                color={color}
                Primary={english?.rateCalendarSide}
                Type={currentLogged?.user_type}
            />

            <div className={`${color?.greybackground} px-4 pt-24 pb-2 relative overflow-y-auto lg:ml-64`}>
                <RoomPriceCalendar color={color} language={language} />
            </div>
        </>
    );
};

export default RoomPricePage;