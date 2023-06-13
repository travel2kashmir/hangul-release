import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Title from '../../components/title';
import Footer from '../../components/Footer';
import { InitialActions, ColorToggler } from '../../components/initalActions';
import { english, french, arabic } from '../../components/Languages/Languages';
import Link from "next/link";
import Headloader from '../../components/loaders/headloader';
import Lineloader from '../../components/loaders/lineloader';
import Textboxloader from '../../components/loaders/textboxloader';
import { ToastContainer, toast } from "react-toastify";
import searchFunction from '../../components/searchFunction';
import AccomodationData from "../../components/devlopmentjson/AccomodationData.json";
let language, currentLogged, currentProperty, colorToggle;

function Accomodations() {
  const [allCheck, setAllCheck] = useState(0)
  const [mode, setMode] = useState();
  const [color, setColor] = useState({});
  const [visible, setVisible] = useState(1);
  const [editaddon, setEditaddon] = useState(0);
  const [property_name, setProperty_name] = useState('')
  const [activeAddon, setActiveAddon] = useState({})
  const [accomodations, setAccomodations] = useState({});
  const [editRow, setEditRow] = useState({
    edit: 0,
    id: undefined
  })
  const [editAccomodation, setEditAccomodation] = useState({})

  useEffect(() => {
    const resp = InitialActions({ setColor, setMode })
    language = resp?.language;
    currentLogged = resp?.currentLogged;
    currentProperty = resp?.currentProperty
    setProperty_name(resp?.currentProperty?.property_name);
    colorToggle = resp?.colorToggle;
    const itinerary = JSON.parse(localStorage.getItem('itinerary'));
    setAccomodations(AccomodationData?.accomodations.filter(i => i.itinerary_id === itinerary.itinerary_id)[0]);

  }, [])

  return (
    <>
      <Title name={`Engage |  ${language?.places}`} />
      <Header color={color} Primary={english.PlaceSide} Type={currentLogged?.user_type} Sec={ColorToggler} mode={mode} setMode={setMode} />
      <Sidebar color={color} Primary={english.PlaceSide} Type={currentLogged?.user_type} />
      <div className={`${color?.greybackground} px-4 pt-24 pb-2  relative overflow-y-auto  lg:ml-64`}>
        <nav className="flex mb-5 ml-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                <Link href={currentLogged?.id.match(/admin.[0-9]*/) ? "../admin/AdminLanding" : "./landing"}
                  className={`${color?.text} text-base font-medium  inline-flex items-center`}><a>{language?.home}</a>
                </Link></div>
            </li>
            <li>
              <div className="flex items-center">
                <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <div className={visible === 0 ? 'block w-16' : 'hidden'}><Headloader /></div>
                  <div className={visible === 1 ? 'block' : 'hidden'}>   <Link href="../itineraries" className="text-gray-700 text-sm   font-medium hover:{`${color?.text} ml-1 md:ml-2">
                    <a>Itenarary</a>
                  </Link>
                  </div></div>

              </div>
            </li>
            <li>
              <div className="flex items-center">
                <div className={`${color?.textgray} text-base font-medium  inline-flex items-center`}>
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">
                    Accomodations
                  </span>
                </div>
              </div>
            </li>
          </ol>
        </nav>
        <h6 className={`${color?.text} capitalize text-xl flex leading-none pl-6 lg:pt-2 pt-6 mb-2 font-bold`}>
          Accomodations
        </h6>
        <div className={`${color?.whitebackground} shadow rounded-lg px-12 h-auto sm:p-6 xl:p-8  2xl:col-span-2`}>
          <div className="sm:flex">
            <div className=" sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
              {/* search form */}
              <form className="lg:pr-3" action="#" method="GET">
                <label htmlFor="users-search" className="sr-only">Search</label>
                <div className="mt-1 relative lg:w-64 xl:w-96">
                  <input type="text" name="email" id="climateInput" onKeyUp={() => searchFunction('climateInput', 'climateTable')}
                    className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} placeholder='Search'>
                  </input>
                </div>
              </form>
              {/* search form end */}
              {/* icons start */}
              <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                </span>

                <button onClick={() => { deleteAllSeason() }} data-tooltip="Delete" aria-label="Delete" className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                </button>

                <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                </span>
                <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                </span>

              </div>
              {/* icons end*/}


            </div>
          </div>
          {/* table */}
          <div className="flex flex-col mt-8 lg:-mr-20 sm:mr-0 w-full  relative">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden">
                  <table className="table data table-fixed lg:min-w-full divide-y divide-gray-200 min-w-screen" id="climateTable">
                    <thead className={` ${color?.tableheader} `}>
                      <tr>
                        {/* checkbox */}
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox"
                              checked={allCheck === 1 || false}
                              name="allSelect"
                              onChange={(e) => {
                                // setAllCheck(allCheck === 1 ? 0 : 1);
                                // allCheckbox(e);
                              }}

                              className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                          </div>
                        </th>

                        <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                          Night</th>
                        <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                          Property Name</th>
                        <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                          Room</th>
                        <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                          Actions</th>
                      </tr>
                    </thead>

                    <tbody className={` ${color?.whitebackground} divide-y  divide-gray-200`}>
                      {accomodations?.accomodation?.map((stay, index) => {
                        return (<>
                          {(editRow?.edit === 1 && editRow?.id === index) ?
                            <tr key={index}>
                              <td className="p-4 w-4">
                                <span className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={stay?.accomodation_id}
                                    tooltip
                                    disabled
                                    title="Click here to delete image."
                                    name={stay?.accomodation_id}
                                    checked={stay?.isChecked || false}

                                    aria-describedby="checkbox-1"
                                    className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                  <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                                </span>
                              </td>

                              <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                <input type="text"
                                  className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                  defaultValue={stay?.night}
                                // onChange={(e) => setEditSeason({ ...editSeason, season_name: e.target.value })} 
                                />
                              </td>

                              <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                <input type="text" className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                  defaultValue={stay?.property_name}
                                // onChange={(e) => setEditSeason({ ...editSeason, period: e.target.value })} 
                                />

                              </td>
                              <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                <input type="text" className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                  defaultValue={stay?.room_name}
                                // onChange={(e) => setEditSeason({ ...editSeason, max_temp: e.target.value })} 
                                />

                              </td>

                              <td>
                                <button
                                  onClick={() => {
                                    editSeasonDetails();
                                  }}
                                  className={`bg-gradient-to-r mt-1 bg-green-600 hover:bg-green-700 mr-2 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}>

                                  Save</button>
                                <button className={`bg-gradient-to-r my-1 bg-gray-400 hover:${color?.greybackground}0 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}
                                  onClick={() => {
                                    setEditAccomodation({});
                                    setEditRow({ edit: 0, id: undefined })
                                  }}
                                >

                                  Cancel</button>
                              </td>
                            </tr> :
                            <tr key={index}>
                              <td className="p-4 w-4">
                                <span className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={stay?.accomodation_id}
                                    tooltip
                                    title="Click here to delete image."
                                    name={stay?.accomodation_id}
                                    checked={stay.isChecked || false}
                                    onChange={(e) => {

                                      handlecheckbox(e, season);
                                    }}
                                    aria-describedby="checkbox-1"
                                    className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                  <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                                </span>
                              </td>

                              <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>

                                {stay?.night}
                              </td>

                              <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>

                                {stay?.property_name}
                              </td>
                              <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>

                                {stay?.room_name}
                              </td>

                              <td>
                                <button className="bg-gradient-to-r mt-1 mr-2 bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                  onClick={() => {
                                    setEditAccomodation(stay);
                                    setEditRow({ edit: 1, id: index })
                                  }}
                                >

                                  Edit</button>
                                <button className="bg-gradient-to-r my-1 bg-red-600 hover:bg-red-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                // onClick={() => { deleteSeason(season) }} 
                                >

                                  Delete</button>
                              </td>
                            </tr>}
                        </>
                        )
                      })}

                    </tbody>
                  </table>
                </div></div></div></div>
          {/* button div */}
          <div className='flex justify-end mt-2 '>
            <button className="mr-4 bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
              onClick={() => setDisp(0)}>Previous </button>
            <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
              onClick={() => setDisp(6)}>Next </button>
          </div>


        </div></div>
    </>

  )
}

export default Accomodations