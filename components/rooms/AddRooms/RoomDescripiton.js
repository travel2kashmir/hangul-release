import React from 'react'
import InputText from '../../utils/InputText'
import WidgetStatus from '../../widgetStatus'
import Button from '../../Button'
import LineLoader from '../../loaders/LineLoader'
import InputTextBox from '../../utils/InputTextBox'
import Multiselect from 'multiselect-react-dropdown'
import { validationRoomDescription } from '../../../components/logic/property/Rooms/AddRoom';
import DropDown from '../../utils/DropDown'

function RoomDescripiton({ color, language, visible, error, setError, allRoomDes, setAllRoomDes, finalView,setFinalView, roomIdentifiers, setDisp, spinner, setSpinner, currentProperty, setRoomId, submitBed, submitView, submitInventory, manageIdentifiers, roomtypes = [], lang,setRoomIdentifiers  }) {
   //Views
  const views = (viewData) => {
    setFinalView([]);
    var final_view_data = []
    viewData.map(item => {
      var temp = {
        view: item?.view.replaceAll(" ", "")
      }
      final_view_data.push(temp)
    });
    setFinalView(final_view_data);
  }
    return (
        <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
            <WidgetStatus name={[`${language?.room} ${language?.description}`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`]}
                selected={1}
                color={color} />

            <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  font-bold`}>
                {language?.room} {language?.description}
            </h6>
            <div className="pt-6">
                <div className=" md:px-2 mx-auto w-full">
                    <div className="flex flex-wrap">

                        {/* room name  */}
                        <InputText
                            label={`${language?.room} ${language?.name}`}
                            visible={1}
                            onChangeAction={(e) => setAllRoomDes({ ...allRoomDes, room_name: e.target.value })}
                            req={true}
                            error={error?.room_name} />


                        {/* room type  */}
                        <DropDown
                            label={`${language?.room} ${language?.type}`}
                            visible={visible}
                            defaultValue={language?.select}
                            onChangeAction={(e) => setAllRoomDes({ ...allRoomDes, room_type_id: e.target.value, room_type: e.target.value })}
                            color={color}
                            req={true}
                            options={roomtypes?.map(i => {
                                return (
                                        {"label":i?.room_type_name.replaceAll("_", " "),"value":i.room_type_id}
                                    )
                            }
                            )} />
                        
                        {/*Room Description */}
                        <InputTextBox
                            label={` ${language?.room} ${language?.description}`}
                            visible={visible}
                            defaultValue={allRoomDes?.room_description}
                            wordLimit={1000}
                            onChangeAction={(e) => {
                                if (e.target.value.length >= 0 && e.target.value.length < 1000) {
                                    setError({})
                                    setAllRoomDes({ ...allRoomDes, room_description: e.target.value });
                                }
                                else {
                                    setError({ room_description: 'word limit reached' })
                                }

                            }

                            }
                            error={error?.room_description}
                            color={color}
                            req={true}
                            tooltip={true}
                        />

                        {/* room capacity */}
                        <InputText
                            label={`${language?.room} ${language?.capacity}`}
                            visible={1}
                            onChangeAction={(e) => setAllRoomDes({ ...allRoomDes, room_capacity: e.target.value })}
                            req={true}
                            error={error?.room_capacity} />

                        
                        {/* maximum number of guest  */}
                        <InputText
                            label={`${language?.maximum} ${language?.number} ${language?.of} ${language?.occupants}`}
                            visible={1}
                            onChangeAction={(e) => setAllRoomDes({ ...allRoomDes, maximum_number_of_occupants: e.target.value })}
                            req={true}
                            error={error?.maximum_number_of_occupants} />
                        
                        {/* minimum number of occupants  */}

                        <InputText
                            label={`${language?.minimum} ${language?.number} ${language?.of} ${language?.occupants}`}
                            visible={1}
                            onChangeAction={(e) => setAllRoomDes({ ...allRoomDes, minimum_number_of_occupants: e.target.value })}
                            req={true}
                            error={error?.minimum_number_of_occupants} />

                        
                        {/* minimum age of occupant  */}

                        <InputText
                            label={`${language?.minimum} ${language?.age} ${language?.of} ${language?.occupants}`}
                            visible={1}
                            onChangeAction={(e) => setAllRoomDes({ ...allRoomDes, minimum_age_of_occupants: e.target.value })}
                            req={true}
                            error={error?.minimum_age_of_occupants} />

                        
                        {/* view from room  */}
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className={`text-sm font-medium ${color?.text} block mb-2`}
                                    htmlFor="grid-password">
                                    {language?.viewsfromroom}
                                    <span style={{ color: "#ff0000" }}>*</span>
                                </label>
                                <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                                <div className={visible === 1 ? 'block' : 'hidden'}>
                                    <Multiselect
                                        className={`shadow-sm ${color?.greybackground} ${color?.text} mb-3 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full`}
                                        isObject={true}
                                        options={lang?.Views}
                                        onRemove={(event) => { views(event) }}
                                        onSelect={(event) => { views(event) }}
                                        displayValue="view"
                                    />
                                    <p className="text-sm text-red-700 font-light">
                                        {error?.view}</p>
                                </div>
                            </div>
                        </div>
                        {/* room length  */}
                        <InputText
                            label={`${language?.room} ${language?.length}(${language?.infeet})`}
                            visible={1}
                            onChangeAction={(e) => setAllRoomDes({ ...allRoomDes, room_length: e.target.value })}
                            req={true}
                            error={error?.room_length} />
                        
                        {/* room breadth  */}
                        <InputText
                            label={`${language?.room} ${language?.breadth}(${language?.infeet})`}
                            visible={1}
                            onChangeAction={(e) => setAllRoomDes({ ...allRoomDes, room_width: e.target.value })}
                            req={true}
                            error={error?.room_width} />

                        
                        {/* room height  */}
                        <InputText
                            label={`${language?.room} ${language?.height}(${language?.infeet})`}
                            visible={1}
                            onChangeAction={(e) => setAllRoomDes({ ...allRoomDes, room_height: e.target.value })}
                            req={true}
                            error={error?.room_height} />
                        

                        {/* room style  */}

                        <DropDown
                            label={`${language?.roomstyle}`}
                            visible={visible}
                            defaultValue={language?.select}
                            onChangeAction={(e) => (
                                setAllRoomDes({ ...allRoomDes, room_style: e.target.value })
                            )}
                            color={color}
                            req={true}
                            options={[{"value":"western","label":"Western"},{"value":"japanese","label":"Japanese"},{"value":"japanese_western","label":"Japanese Western"}]}
                            error={error?.room_style}
                            />
                        
                        {/* is room shared  */}
                        <DropDown
                            label={`${language?.isroomshared}`}
                            visible={visible}
                            defaultValue={language?.select}
                            onChangeAction={ (e) => (
                                setAllRoomDes({ ...allRoomDes, is_room_sharing: e.target.value })
                            )}
                            color={color}
                            req={true}
                            options={[{"value":"shared","label":"Yes"},{"value":"private","label":"No"}]}
                            error={error?.is_room_sharing}
                            />
                        
                        {/* is room indoor or outdoor  */}
                        <DropDown
                            label={`${language?.isroom}`}
                            visible={visible}
                            defaultValue={language?.select}
                            onChangeAction={ (e) => (
                                setAllRoomDes({ ...allRoomDes, is_room: e.target.value })
                            )}
                            color={color}
                            req={true}
                            options={[{"value":"outdoor","label":"Outdoor"},{"value":"indoor","label":"Indoor"}]}
                            error={error?.is_room}
                            />
                        

                        {/* room inventory start */}
                        <InputText
                            label={`${language?.room} ${language?.inventory}`}
                            visible={visible}
                            defaultValue={''}
                            onChangeAction={
                                (e) => {
                                    setAllRoomDes({ ...allRoomDes, inventory_count: e.target.value })
                                }
                            }
                            color={color}
                            disabled={false}
                            req={true}
                            title={"Total number of rooms available"}
                            tooltip={true}
                            error={error?.inventory_count}
                        />
                        {/* room inventory end */}


                        {/* Room identifier field start */}
                        <InputText
                            label={`Room identifiers`}
                            visible={1}
                            onChangeAction={(e) => setRoomIdentifiers(e.target.value)}
                            req={true}
                            error={error?.room_identifier}
                            tooltip={true}
                            title={`comma seperated values`} />

                        
                        {/*  Room identifier field end */}
                    </div>
                </div>
            </div>
            <div className="flex items-center mt-2 justify-end space-x-2 sm:space-x-3 ml-auto">
                {allRoomDes?.room_type_id === 'rt001' || allRoomDes?.room_type_id === 'rt002' || allRoomDes?.room_type_id === 'rt003' || allRoomDes?.room_type_id === 'rt004'
                    || allRoomDes?.room_type_id === 'rt005' ?

                    <Button Primary={language?.Next} onClick={(e) => {
                        validationRoomDescription(allRoomDes, finalView, roomIdentifiers, setDisp, setError, setSpinner, currentProperty, setRoomId, submitBed, submitView, submitInventory, manageIdentifiers, setAllRoomDes)
                    }} /> :
                    <>

                        <div className={spinner === 0 ? 'block' : 'hidden'}>
                            {allRoomDes?.length !== 0 ?
                                <Button Primary={language?.Submit} onClick={(e) => {
                                    validationRoomDescription(allRoomDes, finalView, roomIdentifiers, setDisp, setError, setSpinner, currentProperty, setRoomId, submitBed, submitView, submitInventory, manageIdentifiers, setAllRoomDes)
                                }} /> :
                                <Button Primary={language?.SubmitDisabled} />}
                        </div>
                        <div className={spinner === 1 ? 'block' : 'hidden'}>
                            <Button Primary={language?.Spinnersubmit} /></div>
                    </>
                }
            </div>
        </div>
    )
}

export default RoomDescripiton