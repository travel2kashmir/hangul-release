import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import InputText from '../utils/InputText';
import Color from '../colors/Color';
import { RxCross2, BiArrowBack, AiOutlineClose } from './Icons';
import useRazorpay from "react-razorpay";
// redux libraries
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeRoomFromSelected, clearRoomsSelected, setAddMoreRoom, setGuestDetails, clearGuestDetails, clearInventoryDetail, clearReservationIdentity, removeReservationFromReservationIdentity, updateBookingInfo } from '../redux/hangulSlice';
// validation
import ExtraGuestDetailValidation from "../validation/bookingEngine/ExtraGuestDetailValidation";
import GuestDetailValidation from '../validation/bookingEngine/GuestDetailValidation';
import GstValidation from '../validation/bookingEngine/GstDetailValidation';
// timestamp
import formatDateToCustomFormat from '../generalUtility/timeStampMaker'
import CountdownTimer from './CountDownTimer';
import ButtonLoader from './ButtonLoader';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteBin from '../utils/Icons/DeleteBin';
import DropDown from '../utils/DropDown';
function Reviewbooking({ color, property_id, setDisplay, rooms, setRoomsLoader, setShowModal, setSearched, checkinDate, checkoutDate, cookie }) {

    let guestTemplate = {
        "guest_name": "",
        "guest_email": "",
        "guest_phone_number": "",
        "guest_age": ""

    }
    const [extraGuestError, setExtraGuestError] = useState({})
    const [guestDetailError, setGuestDetailError] = useState([])
    const [gstDetailerror, setGstDetailError] = useState({})
    const [guest, setGuest] = useState([{ ...guestTemplate, index: 0 }]);
    const [extraGuest, setExtraGuest] = useState(undefined);
    const [addGst, setAddGst] = useState(false);
    const [gstDetails, setGstDetails] = useState({})
    const [guestIndex, setGuestIndex] = useState(0)
    const [extraGuestIndex, setExtraGuestIndex] = useState(-1)
    const [rate, setRate] = useState({})
    const [selectedRoom, setSelectedRoom] = useState({})
    const [disabled, setDisabled] = useState(false)
    // loaders
    const [cancelBookingLoader, setCancelBookingLoader] = useState(false)
    const [payNowLoader, setpayNowLoader] = useState(false)
    // State for totalRoomsCapacity
    const [totalRoomsCapacity, setTotalRoomsCapacity] = useState(0);

    const [totals, setTotals] = useState({
        totalFinalRate: 0,
        totalTaxAmount: 0,
        totalOtherFees: 0,
        extraGuestCharges: 0
    });
    const [addExtraGuest, setAddExtraGuest] = useState(false)

    const { totalFinalRate, extraGuestCharges, totalTaxAmount, totalOtherFees } = totals;
    const couponDiscount = 0;

    const startDate = new Date(checkinDate); // Booking start date
    const endDate = new Date(checkoutDate); // Booking end date

    // Calculate the number of days for the booking
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const numberOfNights = Math.round((endDate - startDate) / oneDay);

    const roomsSelectedInitial = useSelector(state => state.roomsSelected)
    const roomsSelected = new Set(roomsSelectedInitial.map(i => i.room_id))

    // console.log("this is roomSelected set using redux", roomsSelected)

    const [selectedRoomsArray, setSelectedRoomsArray] = useState([])

    useEffect(() => {
        setSelectedRoomsArray(rooms.filter((room) => roomsSelected.has(room.room_id)));
    }, [roomsSelected])

    const inventoryDetail = useSelector(state => state.inventoryDetail)
    //  stored the lowest inventory available in the inventory_available variable.
    // const inventory_available = Math.min(...inventoryDetail.map((item) => item.available_inventory))
    const [inventoryState, setInventoryState] = useState(inventoryDetail)
    const dispatch = useDispatch();

    // Create a state variable for the Map
    const [selectedQuantitiesMap, setSelectedQuantitiesMap] = useState(new Map());

    // Calculate the total sum of selected rooms, now totalSelectedQuantities contains the total sum of selected quantities
    const totalSelectedQuantities = [...selectedQuantitiesMap.values()].reduce((acc, quantity) => acc + quantity, 0);

    // check the boolean value of reserveRoom state and based on this changed the css of payNow button

    const reservationIdentity = useSelector(state => state.reservationIdentity)
    // to check for selected rooms whenever the page renders
    useEffect(() => {
        // Create a new Map with keys from roomsSelected and values as 1
        const newSelectedQuantitiesMap = new Map(selectedQuantitiesMap);
        roomsSelected.forEach(roomId => {
            newSelectedQuantitiesMap.set(roomId, 1);
        });
        // Update the selectedQuantitiesMap state
        setSelectedQuantitiesMap(newSelectedQuantitiesMap);
    }, [])
    useEffect(() => {
        let capacityArray = selectedRoomsArray.map((room) => ({
            room_id: room.room_id,
            room_capacity: room.room_capacity
        }));
        let totalCapacity = 0;
        capacityArray.map((r) => {
            totalCapacity += (selectedQuantitiesMap.get(r.room_id) || 1) * r.room_capacity
        })
        // Update the totalRoomsCapacity state
        setTotalRoomsCapacity(totalCapacity);
    }, [selectedQuantitiesMap, roomsSelected])
    // for getting the data from the local storage and setting the data
    useEffect(() => {
        calculateBill()
    }, [extraGuest, selectedQuantitiesMap])
    function calculateBill() {
        let room = localStorage.getItem("room_data")
        setSelectedRoom(JSON.parse(room))
        let room_rates = localStorage.getItem("room_rates")
        // if(JSON.parse(room_rates)!=rate){
        setRate(JSON.parse(room_rates))
        // }
        // Calculate the total final rate
        const calculatedTotals = calculateTotalFinalRate(JSON.parse(room_rates), selectedQuantitiesMap, addExtraGuest === true ? extraGuest : undefined);
        // Update the state with the new totals
        setTotals(calculatedTotals);

    }

    // Function to update the selected quantity for a room
    const updateSelectedQuantity = (room_id, quantity) => {
        const newMap = new Map(selectedQuantitiesMap);
        newMap.set(room_id, quantity);
        setSelectedQuantitiesMap(newMap);
    };

    // Function to calculate the total final rate from multiple objects
    function calculateTotalFinalRate(rate, selectedQuantitiesMap, extraGuest = undefined) {
        let totalFinalRate = 0;
        let totalTaxAmount = 0;
        let totalOtherFees = 0;
        let extraGuestCharges = extraGuest != undefined ? 0 : undefined;

        // Loop through the objects and accumulate the total_final_rate values
        for (const roomKey in rate) {
            if (rate.hasOwnProperty(roomKey)) {
                const room = rate[roomKey]; //har ek room ka price detail
                const selectedQuantity = selectedQuantitiesMap.get(roomKey) || 1; // Default to 1 if no quantity is selected

                // Calculate the updated total final rate, total tax amount, and total other fees
                if (extraGuest != undefined) {
                    extraGuest.forEach((guest) => {
                        //calculating extra guest charges
                        if (guest.room_id === roomKey) {
                            console.log(`Guest age \t"${guest.guest_age}`)
                            if (guest.guest_age <= 12) {
                                extraGuestCharges += room.extra_child_price;
                            }
                            else {
                                extraGuestCharges += room.extra_adult_price;
                            }
                        }
                    })

                }

                totalFinalRate += room.total_final_rate * selectedQuantity;
                totalTaxAmount += room.total_tax_amount * selectedQuantity;
                totalOtherFees += room.total_otherfees_amount * selectedQuantity;


            }
        }

        // Return the values as an object
        return {
            totalFinalRate: totalFinalRate,
            extraGuestCharges: extraGuestCharges,
            totalTaxAmount: totalTaxAmount,
            totalOtherFees: totalOtherFees,
        };
    }

    // to add guest in ui view 
    const addGuest = () => {
        setGuestIndex(guestIndex + 1);
        setGuest([...guest, { ...guestTemplate, index: guestIndex + 1 }])
    }
    const newExtraGuest = () => {
        setExtraGuestIndex(extraGuestIndex + 1);
        extraGuest != undefined ? setExtraGuest([...extraGuest, { ...guestTemplate, index: extraGuestIndex + 1 }]) : setExtraGuest([{ ...guestTemplate, index: extraGuestIndex + 1 }])
        setAddExtraGuest(true);
    }

    // to handle changes in data
    const handleChangeInGuest = (e, index, i) => {
        setGuest(prevGuest => {
            return prevGuest.map((item) => {
                return item.index === index ? { ...item, [i]: e.target.value } : item;
            }).sort((a, b) => a.index - b.index);
        });
    };

    // to handle changes in extra guest data
    const handleChangeInExtraGuest = (e, index, i) => {
        setExtraGuest(prevExtraGuest => {
            return prevExtraGuest.map((item) => {
                if (item.index === index) {
                    return { ...item, [i]: e.target.value };
                } else {
                    return item;
                }
            }).sort((a, b) => a.index - b.index);
        });
    };



    // to remove guest from ui
    const removeGuest = (indexToRemove) => {
        const updatedGuests = guest.filter((i, index) => i.index !== indexToRemove);
        setGuest(updatedGuests); //list of guest not removed
    };
    // to remove extra guest from ui
    const removeExtraGuest = (indexToRemove) => {
        if (extraGuest?.length === 1) {
            setAddExtraGuest(false); setExtraGuest(undefined)
        }
        else {
            const updatedGuests = extraGuest.filter((i, index) => i.index !== indexToRemove);
            setExtraGuest(updatedGuests); //list of guest not removed
        }
    };

    // Function to remove data from 'room_data' in local storage based on room_id
    function removeRoomRateByRoomId(roomIdToRemove) {
        // Get the existing 'room_data' from local storage
        let existingData = localStorage.getItem('room_rates');

        // Check if there is existing data in local storage
        if (existingData) {
            // Parse the existing data from JSON
            existingData = JSON.parse(existingData);

            // Check if the room_id to remove exists in the data
            if (existingData[roomIdToRemove]) {
                // Remove the entry with the specified room_id
                delete existingData[roomIdToRemove];

                // Store the updated data back in local storage
                localStorage.setItem('room_rates', JSON.stringify(existingData));

            } else {
                // Handle the case where the specified room_id doesn't exist in the data
                console.log(`Room with room_id ${roomIdToRemove} not found.`);
            }
            calculateBill();

        } else {
            // Handle the case where there is no existing data in local storage
            console.log('No existing room data found in local storage.');
        }

    }

    // Function to delete room_rates and room_data from local storage
    function deleteRoomDetails() {
        // Remove the room_rates key from local storage
        localStorage.removeItem('room_rates');
        localStorage.removeItem('temp_room_rate');

        // Remove the room_data key from local storage
        localStorage.removeItem('room_data');

        // Remove the room reservation_ids key from local storage
        localStorage.removeItem('reservation_ids');

    }

    function removeReservationFromDB(room_id, reservation_time, action) {

        if (action === "close") {
            setCancelBookingLoader(false)
            setDisplay(0)
            setShowModal(0)
            setSearched(false)
            dispatch(setAddMoreRoom(false))
            dispatch(clearRoomsSelected())
            dispatch(clearReservationIdentity())
            dispatch(clearInventoryDetail())
            deleteRoomDetails()
        }

    }

    function SubmitGuestDetails() {
        if (cookie) {
            const user = JSON.parse(cookie);
            global.analytics.track("User clicked on paynow", {
                action: "User clicked on paynow",
                user: user.user,
                time: Date()
            });
        }
        let validationResults = [];
        let isGuestDetailsValid = GuestDetailValidation(guest);
        let isExtraGuestDetailsValid = extraGuest === undefined ? true : ExtraGuestDetailValidation(extraGuest);
        // isGuestDetailsValid can be either true or an error object
        if (isGuestDetailsValid !== true) {
            // Guest details are invalid, you can handle the error here
            setGuestDetailError(isGuestDetailsValid);
            validationResults.push(false)
        }

        if (isExtraGuestDetailsValid !== true) {
            // Guest details are invalid, you can handle the error here
            setExtraGuestError(isExtraGuestDetailsValid);
            validationResults.push(false)
        }

        if (isGuestDetailsValid === true) {
            validationResults.push(true)
            setGuestDetailError({})
            dispatch(setGuestDetails(guest))
        }

        if (addGst) {
            let isGstDetailsValid = GstValidation(gstDetails);
            // Step 2: Validate GST if GST is true
            if (isGstDetailsValid !== true) {
                // GST details are invalid, you can handle the error here
                setGstDetailError(isGstDetailsValid);
                validationResults.push(false)

            } else {
                validationResults.push(true)
                setGstDetailError({})
            }
        }
        // checks if all the results are true only then this block will work.
        if (validationResults.every(result => result === true)) {
            bookingRoom()
            setpayNowLoader(true)
        }
    }

    function bookingRoom() {
        let roomBookingData = {
            "booking_date_from": checkinDate,
            "booking_date_to": checkoutDate,
            "total_rooms_booked": 1,
            "is_cancelled": false,
            "booking_time": formatDateToCustomFormat(new Date()),
            "property_id": property_id
        }

        let guestsForThisBooking = {
            "booking_guest_link": (extraGuest ? [...guest, ...extraGuest] : guest).map((guestdetail) => {
                return ({
                    "guest_name": guestdetail.guest_name,
                    "guest_email": guestdetail.guest_email,
                    "guest_age": guestdetail.guest_age,
                    "guest_phone_number": guestdetail.guest_phone_number
                })
            })
        }


        let bookingRoomArray = selectedRoomsArray.map((item, index) => {
            return ({
                "room_id": item.room_id,
                "room_name": item.room_name,
                "room_type": item.room_type,
                "room_count": selectedQuantitiesMap?.get(item?.room_id),
                "meal_name": rate[item?.room_id].meal_name !== null ? rate[item?.room_id].meal_name : "Room Only - RO"
            })
        })

        let roomsForThisBooking = { "booking_room_link": bookingRoomArray }

        let finalInvoiceForThisBooking = {
            "booking_invoice": [
                {
                    "base_price": totalFinalRate,
                    "taxes": totalTaxAmount,
                    "other_fees": totalOtherFees,
                    "coupon_discount": couponDiscount,
                    "extra_guest_price": extraGuestCharges,
                    "total_price": totalFinalRate + totalOtherFees + totalTaxAmount + (extraGuestCharges || 0) - couponDiscount,
                    "invoice_time": formatDateToCustomFormat(new Date()),
                    ...(addGst && {
                        "booking_gst_link": [
                            {
                                "gst_registration_no": gstDetails.gst_registration_no,
                                "gst_company_name": gstDetails.gst_company_name,
                                "gst_company_address": gstDetails.gst_company_address,
                            }
                        ]
                    })
                }
            ]
        };

        //multiple api call's will be performed in this bookRoom function so that is why it is divided in multiple functions.
        bookRoom(roomsForThisBooking, roomBookingData, guestsForThisBooking, finalInvoiceForThisBooking)
    }

    function bookRoom(roomsForThisBooking, roomBookingData, guestsForThisBooking, finalInvoiceForThisBooking) {
        let bookingURL = "/api/booking";
        let bookingData = {
            "booking": [{
                ...roomBookingData, ...roomsForThisBooking, ...guestsForThisBooking, ...finalInvoiceForThisBooking
            }]
        }

        axios.post(bookingURL, bookingData, {
            header: { "content-type": "application/json" },
        }).then((response) => {
            let totalPrice = finalInvoiceForThisBooking?.booking_invoice[0].total_price;

            let paymentRefrenceNumber = PaymentGateway(response.data.booking_id, totalPrice)
            // addRefrenceToInvoice(paymentRefrenceNumber, response.data.booking_id)

            // // Add booking_id and property_id to local storage
            // let propertyId = property_id; // Replace with the actual property_id
            // let bookingId = response.data.booking_id;

            // dispatch(updateBookingInfo({ booking_id: bookingId, property_id: propertyId }));

        }).catch((error) => {
            toast.error("API: Room Booking Failed,Try again Latter.");
            setpayNowLoader(false)
        })
    }
    //function to add payemtn gateway logic


    const PaymentGateway = async (booking_id, total_price) => {
        const key = process.env.RAZORPAY_API_KEY;

        // Make API call to the serverless API
        const paymentData = {
            "amount": total_price,
            "currency": "INR",
            "booking_id": booking_id
        };
        axios.post("/api/razorpay", paymentData).then((res) => {
            const order = res.data.order;
            const options = {
                key: process.env.RAZORPAY_API_KEY,
                name: "Travel 2 kashmir",
                currency: order.currency,
                amount: order.amount,
                order_id: order.id,
                description: "Booking payment",
                // image: logoBase64,
                handler: async function (response) {
                    // if (response.length==0) return <Loading/>;
                    console.log(response);
                    
                    const data = await fetch("/api/paymentverify", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });
                    console.log(data)
                    const res = await data.json();
                    if (res?.message == "success") {
                        console.log(JSON.stringify(res))
                        addRefrenceToInvoice(res?.refrenceNumber, booking_id)

                        // Add booking_id and property_id to local storage
                        let propertyId = property_id; // Replace with the actual property_id
                        let bookingId = booking_id;

                        dispatch(updateBookingInfo({ booking_id: bookingId, property_id: propertyId }));
                        // return res?.refrenceNumber
                    }
                },
                prefill: {
                    name: "Travel 2 Kashmir"
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

            paymentObject.on("payment.failed", function (response) {
                alert("Payment failed. Please try again. Contact support for help");
            });
        }).catch((err) => {
            console.log(err.message)
        });
    };



    //function to update invoice id 
    function addRefrenceToInvoice(paymentRefrenceNumber, booking_id) {
        console.log("add refrence to invoice called ")
        let invoiceLinkUrl = "/api/booking_invoice_link";
        let invoiceForThisBooking = {
            "booking_invoice_link": [{
                "transaction_refrence_no": paymentRefrenceNumber,
                "booking_id": booking_id
            }]
        }
        axios.put(invoiceLinkUrl, invoiceForThisBooking, {
            header: { "content-type": "application/json" },
        }).then((responseFromInvoiceLinkUrl) => {
            // handle the third post response
            // console.log('payment sucessful')
            // changeBookingCount()
            setpayNowLoader(false)
            setDisplay(3) //changes screen to booking sucessfull
        }).catch((err) => {
            console.log(err)
        })
    }


    // this function resets the values
    function closeButtonAction() {
        // if there is any reservation in DB then remove them first else perform the other funtions
        if (cookie) {
            const user = JSON.parse(cookie);
            global.analytics.track("Booking Closed", {
                action: "booking engine closed",
                user: user.user,
                time: Date()
            });
        }
        if (reservationIdentity.length > 0) {
            reservationIdentity?.map((room) => {
                removeReservationFromDB(room?.room_id, room?.reservation_time, "close");
            });
        }
        else {
            setCancelBookingLoader(false)
            setShowModal(0)
            setDisplay(0)
            setSearched(false)
            dispatch(setAddMoreRoom(false))
            dispatch(clearRoomsSelected())
            dispatch(clearGuestDetails())
            dispatch(clearReservationIdentity())
            dispatch(clearInventoryDetail())
            deleteRoomDetails()
        }
    }

    return (
        <div className={`min-h-screen ${color?.bgColor}`}>

            {/* app bar  */}
            <div>

                <div className={`flex justify-between w-full py-5 px-3 md:px-5 border-b  ${color?.border}`}>
                    {/* back arrow start  */}
                    <div className='flex'>
                        <i className='my-auto'
                            onClick={() => {
                                if (cookie) {
                                    const user = JSON.parse(cookie);
                                    global.analytics.track("User clicked on back", {
                                        action: "User clicked on back in review booking page",
                                        user: user.user,
                                        time: Date()
                                    });
                                }
                                if (localStorage.getItem("temp_room_rate") === null) {
                                    setDisplay(0)
                                } else {
                                    setDisplay(1)

                                }
                            }}
                        ><BiArrowBack size={30} />
                        </i>
                        <h1 className={` ${color?.text?.title} text-xl my-auto font-bold ml-2 md:ml-5`}>Review Booking</h1>
                    </div>
                    {/* back arrow end */}

                    {/* timer for medium and large screen start */}
                    <div className='hidden md:block my-auto'>
                        <CountdownTimer
                            time={15}
                            onTimerComplete={closeButtonAction}
                            color={color}
                        />
                    </div>
                    {/* timer for medium and large screen end */}

                    {cancelBookingLoader === true ?
                        <ButtonLoader
                            classes='text-red-600 text-sm font-semibold cursor-pointer my-auto'
                            text={'Cancel Booking'}
                        />
                        : <span className='text-red-600  italic text-sm font-semibold cursor-pointer my-auto'
                            onClick={() => {
                                setCancelBookingLoader(true);
                                closeButtonAction();
                            }}>Cancel Booking</span>
                    }

                </div>

                {/* timer for mobile screen */}
                <div className='block md:hidden bg-slate-100 border-b-2 pb-2'>
                    <CountdownTimer
                        time={15}
                        onTimerComplete={closeButtonAction}
                        color={color}

                    />
                </div>

            </div>

            <div id="main-content" className={`h-fit text-white flex flex-wrap justify-around gap-2 mx-4 py-10 `}>

                {/* left side div  */}
                <div id="guest-detail-review" className={`${color?.boxColor} border border-slate-400 text-black h-fit w-full md:w-6/12  rounded-2xl `}>

                    {/* rooms summary section */}
                    <div className=' border-b border-slate-400 justify-start p-2 md:p-4'>
                        <div className='flex  justify-between'>
                            <h6 className={`${color?.text?.title} text-xl my-auto flex pl-2 leading-none font-bold`}>
                                Rooms Summary
                            </h6>
                            <button
                                className='my-2 ml-auto px-4 py-1 bg-cyan-700 hover:bg-cyan-900 rounded-md text-white'
                                onClick={() => {
                                    if (cookie) {
                                        const user = JSON.parse(cookie);
                                        global.analytics.track("Add more rooms clicked", {
                                            action: "User clicked on add more rooms",
                                            user: user.user,
                                            time: Date()
                                        });
                                    }
                                    setDisplay(0);
                                }}
                            >Add More Rooms</button>

                        </div>

                        <table className='px-4 w-full' cellPadding={15}>
                            <thead className={`${color?.text?.title}`}>
                                <th className='text-start'>Room Name</th>
                                <th className='text-start'>Room Type</th>
                                <th className='text-start'>Meal Plan</th>
                                <th className='text-start'>Number Of Rooms</th>

                            </thead>

                            {selectedRoomsArray?.map((room, index) => {
                                return <tr className={`${color?.text?.description}`} key={index}>
                                    <td>{room?.room_name}</td>
                                    <td>{room?.room_type}</td>
                                    <td>{rate[room?.room_id]?.meal_name}</td>
                                    <td>
                                        {/* drop down to change room quantity  */}
                                        <select
                                            className=' pl-3 pr-10'
                                            value={selectedQuantitiesMap?.get(room?.room_id) || "1"} // Use selected quantity from the Map
                                            onChange={(e) => {
                                                const newQuantity = parseInt(e.target.value);
                                                if (cookie) {
                                                    const user = JSON.parse(cookie);
                                                    global.analytics.track("User changed number of rooms selected", {
                                                        action: "User changed number of rooms selected",
                                                        user: user.user,
                                                        room: room?.room_name,
                                                        meal: rate[room?.room_id]?.meal_name,
                                                        quantity: newQuantity,
                                                        time: Date()
                                                    });
                                                }
                                                updateSelectedQuantity(room?.room_id, newQuantity); // Update selected quantity in the Map
                                            }}
                                        >
                                            {Array.from({ length: Math.min(...(inventoryState?.filter(item => item?.room_id === room?.room_id)?.map(item => item?.available_inventory)) || [1]) }, (_, index) => index + 1).map((quantity) => (
                                                <option key={quantity} value={quantity}>
                                                    {quantity}
                                                </option>
                                            ))}


                                        </select>


                                    </td>
                                    <td className='text-red-800 '>
                                        {/* delete icon  */}
                                        <button
                                            className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                                            onClick={() => {
                                                if (cookie) {
                                                    const user = JSON.parse(cookie);
                                                    global.analytics.track("User deleted selected room", {
                                                        action: "User deleted selected room",
                                                        user: user.user,
                                                        room: room?.room_name,
                                                        meal: rate[room?.room_id]?.meal_name,
                                                        time: Date()
                                                    });
                                                }
                                                dispatch(removeRoomFromSelected(room?.room_id)) //remove room from selected list
                                                removeRoomRateByRoomId(room?.room_id)  //remove room_rate from local storage
                                                dispatch(removeReservationFromReservationIdentity(room?.room_id))
                                            }}
                                        >
                                            <DeleteBin />
                                        </button></td>
                                </tr>
                            })}
                        </table>
                    </div>

                    {/* guests summary section */}
                    <div className='flex justify-start mt-2 p-4'>
                        <h6
                            className={`${color?.text?.title} text-xl flex my-auto leading-none pl-2 font-bold`}
                        >
                            Guest Details
                        </h6>

                        <div
                            className={`${color?.text?.title} text-md flex m-auto font-normal`}
                        > {totalRoomsCapacity - guest?.length} more guest can be added</div>

                        {guest?.length < totalRoomsCapacity ? <button
                            onClick={() => {
                                if (cookie) {
                                    const user = JSON.parse(cookie);
                                    global.analytics.track("User added 1 more guest", {
                                        action: "User added 1 more guest",
                                        user: user.user,
                                        time: Date()
                                    });
                                }
                                addGuest()
                            }}
                            className={`ml-auto px-4 py-1 bg-cyan-700 hover:bg-cyan-900  rounded-md text-white`}>
                            {'Add Guests'}
                        </button> :
                            <button
                                onClick={() => {
                                    if (cookie) {
                                        const user = JSON.parse(cookie);
                                        global.analytics.track("User added extra guest", {
                                            action: "User added extra guest",
                                            user: user.user,
                                            time: Date()
                                        });
                                    }
                                    newExtraGuest()
                                }}
                                disabled={selectedRoomsArray.filter(i => i.extra_guest_allowed > 0).length === 0}
                                className={`ml-auto px-4 py-1 ${selectedRoomsArray.filter(i => i.extra_guest_allowed > 0).length !== 0 ? 'bg-cyan-700 hover:bg-cyan-900' : 'bg-cyan-600 '}  rounded-md text-white`}>
                                {'Add Extra Guests'}
                            </button>}

                    </div>

                    {/* allowed extra guest list start */}
                    {
                        selectedRoomsArray.map((i, idx) => {
                            return (
                                <div className={`flex flex-wrap items-center justify-center`} key={idx}>
                                    <span className="font-semibold text-sm mx-2">{i?.room_name}</span>  extra guest allowed {(i?.room_capacity - i?.maximum_number_of_occupants) * selectedQuantitiesMap?.get(i?.room_id)}
                                </div>
                            )
                        })
                    }
                    {/* allowed extra guest list start */}

                    <div className="pt-1 pb-4">
                        <div className="md:px-4 mx-auto w-full">
                            {guest.map((i, loopIndex) => (
                                <div className='border border-slate-400 rounded-xl p-2 m-2' key={i.index}>
                                    {loopIndex != 0 && addExtraGuest != 1 ? <div className='flex justify-end'><button onClick={() => removeGuest(i.index)}><RxCross2 /></button></div> : <></>}
                                    <div className="flex flex-wrap ">

                                        {/* guest name  */}
                                        <InputText
                                            label={loopIndex === 0 ? 'Main Guest Name' : 'Guest Name'}
                                            visible={1}
                                            defaultValue={``}
                                            onChangeAction={(e) => {
                                                handleChangeInGuest(e, i.index, "guest_name")
                                            }
                                            }
                                            error={guestDetailError[loopIndex]?.guest_name}
                                            color={color?.theme === "light" ? Color?.light : Color?.dark}
                                            // color={Color?.light}
                                            req={true}
                                            title={'Guest Name'}
                                            tooltip={true}

                                        />

                                        {/* guest email  */}
                                        <InputText
                                            // label={'Guest Email'}
                                            label={loopIndex === 0 ? 'Main Guest Email' : 'Guest Email'}
                                            visible={1}
                                            defaultValue={``}
                                            onChangeAction={(e) => {
                                                handleChangeInGuest(e, i.index, "guest_email")
                                            }
                                            }
                                            error={guestDetailError[loopIndex]?.guest_email}
                                            color={color?.theme === "light" ? Color?.light : Color?.dark}
                                            req={loopIndex === 0}  // make it required only for the first guest
                                            title={'Guest email'}
                                            tooltip={true}
                                        />

                                        {/* guest phone  */}
                                        <InputText
                                            // label={'Guest Phone'}
                                            label={loopIndex === 0 ? 'Main Guest Phone' : 'Guest Phone'}
                                            visible={1}
                                            defaultValue={``}
                                            onChangeAction={(e) => {
                                                handleChangeInGuest(e, i.index, "guest_phone_number")
                                            }}
                                            error={guestDetailError[loopIndex]?.guest_phone_number}
                                            color={color?.theme === "light" ? Color?.light : Color?.dark}
                                            req={loopIndex === 0}  // make it required only for the first guest
                                            title={'Guest Phone'}
                                            tooltip={true}
                                        />
                                        <InputText
                                            // label={'Guest Age [in years] '}
                                            label={loopIndex === 0 ? 'Main Guest Age [in years]' : 'Guest Age [in years]'}
                                            visible={1}
                                            defaultValue={``}
                                            onChangeAction={(e) => {
                                                handleChangeInGuest(e, i.index, "guest_age")
                                            }}
                                            error={guestDetailError[loopIndex]?.guest_age}
                                            color={color?.theme === "light" ? Color?.light : Color?.dark}
                                            req={true}
                                            title={'Guest Age'}
                                            tooltip={true}
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* extra guest starts */}

                            {addExtraGuest == true ?
                                extraGuest.map((i, loopIndex) => (
                                    <div className='border border-slate-400 rounded-xl p-2 m-2' key={i.index}>
                                        <div className='flex justify-end'><button onClick={() => removeExtraGuest(i.index)}><RxCross2 /></button></div>
                                        <div className="flex flex-wrap ">

                                            {/* select extra guest for room  */}

                                            <DropDown
                                                label={'Select Room'}
                                                visible={1}
                                                defaultValue={'select room'}
                                                onChangeAction={(e) => handleChangeInExtraGuest(e, i.index, "room_id")}
                                                color={color?.theme === "light" ? Color?.light : Color?.dark}
                                                req={true}
                                                options={selectedRoomsArray.filter(i => i.extra_guest_allowed > 0).map(i => ({ "label": i.room_name, "value": i.room_id }))}
                                                error={extraGuestError[loopIndex]?.room_id}
                                                tooltip={'select room for which extra guest is being selected'}
                                            />


                                            {/* guest name  */}
                                            <InputText
                                                label={'Extra Guest Name'}
                                                visible={1}
                                                defaultValue={``}
                                                onChangeAction={(e) => {
                                                    handleChangeInExtraGuest(e, i.index, "guest_name")
                                                }
                                                }
                                                error={extraGuestError[loopIndex]?.guest_name}
                                                color={color?.theme === "light" ? Color?.light : Color?.dark}
                                                // color={Color?.light}
                                                req={true}
                                                title={'Guest Name'}
                                                tooltip={true}

                                            />
                                            {/* Age */}
                                            <InputText
                                                label={'Extra Guest Age [in years] '}
                                                visible={1}
                                                defaultValue={``}
                                                onChangeAction={(e) => {
                                                    handleChangeInExtraGuest(e, i.index, "guest_age")
                                                }}
                                                error={extraGuestError[loopIndex]?.guest_age}
                                                color={color?.theme === "light" ? Color?.light : Color?.dark}
                                                req={true}
                                                title={'Guest Age'}
                                                tooltip={true}
                                            />
                                        </div>
                                    </div>
                                )) : undefined}

                            {/* extra guest ends */}


                            <input type="checkbox" name="add_gst" onClick={() => {
                                if (cookie) {
                                    const user = JSON.parse(cookie);
                                    global.analytics.track("User clicked on add gst details", {
                                        action: "User clicked on add gst details",
                                        user: user.user,
                                        time: Date()
                                    });
                                }
                                setAddGst(!addGst); setGstDetails({})
                            }} />
                            <span className={`${color?.text?.title} font-semibold text-base mx-2`}>Add GST Details (optional)</span>
                            {addGst === true ?
                                <div className="flex flex-wrap border-2 border-slate-400 rounded-xl p-2 m-2">
                                    {/* GST Registration Number  */}
                                    <InputText
                                        label={'GST Registration Number'}
                                        visible={1}
                                        defaultValue={``}
                                        onChangeAction={(e) =>
                                            setGstDetails({ ...gstDetails, gst_registration_no: e.target.value })
                                        }
                                        error={gstDetailerror?.gst_registration_no}
                                        color={color?.theme === "light" ? Color?.light : Color?.dark}
                                        req={true}
                                        title={'registration number'}
                                        tooltip={true}
                                    />

                                    {/* Registered company name  */}
                                    <InputText
                                        label={'Registered Company Name'}
                                        visible={1}
                                        defaultValue={``}
                                        onChangeAction={(e) =>
                                            setGstDetails({ ...gstDetails, gst_company_name: e.target.value })
                                        }
                                        error={gstDetailerror?.gst_company_name}
                                        color={color?.theme === "light" ? Color?.light : Color?.dark}
                                        req={true}
                                        title={'name of company'}
                                        tooltip={true}
                                    />
                                    {/* Registered company address  */}
                                    <InputText
                                        label={'Registered Company Address'}
                                        visible={1}
                                        defaultValue={``}
                                        onChangeAction={(e) =>
                                            setGstDetails({ ...gstDetails, gst_company_address: e.target.value })
                                        }
                                        error={gstDetailerror?.gst_company_address}
                                        color={color?.theme === "light" ? Color?.light : Color?.dark}
                                        req={true}
                                        title={'Address of company'}
                                        tooltip={true}
                                    />


                                </div>
                                : <></>}

                        </div>
                    </div>
                </div>

                {/* right side div  */}
                <div id="price-breakup" className={`border border-slate-400 ${color?.boxColor} p-4 mt-10 md:mt-0 text-black h-fit w-full text-start  md:w-5/12 lg:w-4/12  rounded-2xl `}>
                    <div className=' w-full h-1/2 my-2'>
                        <h1 className={`${color?.text?.title} font-extrabold p-2 text-xl`}>Price Breakup</h1>
                        {/* total final rate start  */}
                        <div className={`${color?.text?.description} flex justify-start items-start my-4  border-b border-slate-400`}> <div className='p-2 w-4/5 font-semibold'>{totalSelectedQuantities} Room for {numberOfNights === 0 ? '1 Day' : numberOfNights === 1 ? '1 Night' : `${numberOfNights} Nights`}<br /> <div className='text-sm font-normal px-3'>base price</div></div>
                            <div className='mx-2 my-auto flex justify-end w-full'>₹ {totalFinalRate}</div>
                        </div>
                        {/* total final rate end */}

                        {/* total extra guest rate start  */}
                        {addExtraGuest == true && <div className={`${color?.text?.description} flex justify-start items-start my-4  border-b border-slate-400`}> <div className='p-2 w-4/5 font-semibold'>Extra Guest Charges</div>
                            <div className='mx-2 my-auto flex justify-end w-full'>₹ {extraGuestCharges ? extraGuestCharges : 0}</div>
                        </div>}
                        {/* total extra guest rate end */}


                        {/* total tax amount start  */}
                        <div className={`${color?.text?.description} flex justify-start items-start my-4  border-b border-slate-400`}> <div className='p-2 w-4/5 font-semibold'>Taxes</div>
                            <div className='mx-2 my-auto flex justify-end w-full'>₹ {totalTaxAmount}</div>
                        </div>
                        {/* total tax amount end*/}

                        {/* total other fees start  */}
                        <div className={`${color?.text?.description} flex justify-start items-start my-4  border-b border-slate-400`}> <div className='p-2 w-4/5 font-semibold'>Other Fees</div>
                            <div className='mx-2 my-auto flex justify-end w-full'>₹ {totalOtherFees}</div>
                        </div>
                        {/* total other fees end  */}
                        {/* <div className='flex  items-start my-4  border-b-2'> <div className='p-2 w-4/5 font-semibold'>Coupon Discounts</div> <div className='mx-2 my-auto flex justify-end w-full'>₹ {couponDiscount}.00</div></div> */}
                        {/* total final rate start */}
                        <div className={`${color?.text?.title} flex justify-start items-start my-4`}> <div className='p-2 w-4/5 font-bold'>Total Amount To Be Paid</div>
                            <div className='mx-2 flex justify-end w-full text-2xl font-bold'>₹ {(totalFinalRate + totalTaxAmount + totalOtherFees + (extraGuestCharges || 0)) - couponDiscount}</div>
                        </div>
                        {/* total final rate end */}
                    </div>

                    {/* coupon code section */}
                    {/* <div className='border border-gray rounded-lg w-full h-1/2 my-2 py-2 px-4'>
                        <h2 className='h-12 w-fit mx-3 p-2 font-semibold'>Coupon Codes</h2>
                        <div className='flex justify-between'>
                            <input className='my-1 border border-gray h-12 w-full mx-4 p-2' onChange={(e) => console.log(e.target.value)} placeholder='Have Coupon Code' />
                            <button className='bg-blue-600 rounded-lg text-white px-4 h-9 my-auto font-medium'>Apply</button>
                        </div>

                    </div> */}

                    {payNowLoader === true ?
                        <ButtonLoader
                            classes={`px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded-lg w-full`}
                            text={'Pay Now'}
                        />
                        :
                        <button
                            disabled={disabled || totalFinalRate + totalTaxAmount + totalOtherFees === 0}
                            onClick={() => {


                                let totalExtaGuest = selectedRoomsArray.reduce((total, room) => {
                                    return total + Number(room.extra_guest_allowed);
                                }, 0)

                                if (guest.length <= totalRoomsCapacity) {
                                    if (addExtraGuest === true && extraGuest.length === totalExtaGuest) {
                                        SubmitGuestDetails();
                                    }

                                    else if (addExtraGuest === false) {
                                        SubmitGuestDetails();
                                    }
                                    else {
                                        toast.error('APP: Extra guest more than permissible limit.');
                                    }

                                } else {
                                    toast.error('APP: No selected room can accommodate the current number of guests.');
                                }
                            }}
                            className={`px-4 py-2 ${totalFinalRate + totalTaxAmount + totalOtherFees === 0
                                ? "bg-gray-500" : "bg-green-700 hover:bg-green-900"
                                } text-white rounded-lg w-full`}
                        >
                            Pay Now
                        </button>
                    }

                </div>
            </div>

        </div>
    )
}

export default Reviewbooking
