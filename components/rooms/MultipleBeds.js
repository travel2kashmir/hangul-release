import Table from '../Table'
import WidgetStatus from '../widgetStatus'
import LoaderTable from '../loadertable'
import Button from '../Button'

function MultipleBeds({color,language,visible,deleteBed,editBed,setView,setGen,gen,setDisp}) {
  return (
    <div id='4' className='block py-1'>
    <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
      <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`]}
        selected={1}
        color={color} />
      <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  pb-2 font-bold`}>
        {language?.room} {language?.description}
      </h6>
      <div className={visible === 0 ? 'block py-1' : 'hidden'}><LoaderTable /></div>
      <div className={visible === 1 ? 'block py-1' : 'hidden'}>
        <Table gen={gen} setGen={setGen} add={() => setView(1)} name="Additional Services"
          color={color}
          mark="beds"
          edit={editBed} delete={deleteBed}
          common={language?.common} cols={language?.BedsCols} /> </div>

      <div className="flex items-center mt-2 justify-end space-x-2 sm:space-x-3 ml-auto">
        <Button Primary={language?.Previous} onClick={() => {
          setDisp(0)
        }} />
        <Button Primary={language?.Next} onClick={() => {
          setDisp(1)
        }} />
      </div>
    </div>
  </div>
  )
}

export default MultipleBeds