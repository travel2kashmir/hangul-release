import React, { useState, useMemo,useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import SearchFunction from "../../Code/SearchFunction";
import Button from "../../../Button";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import InlineTableBody from "./InlineTableBody";
import Pagination from "./Pagination";
var checked = [];

function GenericTable({inlineTable, color, language, deleteAll, cols, addButton, tableName, addButtonAction,...args }) {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [error, setError] = useState({});
    const [viewDel, setViewDel] = useState(0);
    const [flag, setFlag] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    
    const [data,setData]=useState(args.data)
    useEffect(()=>{setData(args.data)},[args.data])
   

    //slices data as per requirment to be displayed 
    const displayData = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return data.slice(start, start + itemsPerPage);
    }, [page, data, itemsPerPage]);

    // changes the number of items visible in table 
    function ItemShow(event) {
        setItemsPerPage(event.target.value);
    }

    const handlecheckbox = (e) => {
        const { name } = e.target;
        let temp = data.filter(i => i.id != name)
        let item = data.filter(i => i.id === name)[0]
        setData([...temp, { ...item, isChecked: !item.isChecked }]);
        checked.includes(name) === false ? checked.push(name) : checked = checked.filter(i => i != name)


    }

    function handleSelectAll(e){
       setIsAllSelected(!isAllSelected)
        let displayedItem=displayData.map((i)=>i.id)
       let nonDisplayedItems=data.filter(i=>!displayedItem.includes(i.id))
       e.target.checked===true?displayData.map((i)=>checked.push(i.id)):checked=[];
        let withTickData=displayData.map(item=>({...item,isChecked:e.target.checked===true?true:false}))
        if(nonDisplayedItems.length===0){setData(withTickData);}
        else{
            setData([...withTickData,...nonDisplayedItems])
        }
       
    }
    return (<>
        <div>
            <h1 className={`text-xl sm:text-2xl font-semibold mx-4 ${color?.text}`}>{tableName}</h1>
            <div className="w-fit">
                <div className="">
                    {/* table heading and icons starts */}
                    <div className="flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                        {/* search form */}
                        <form className="lg:pr-3" action="#" method="GET">
                            <label htmlFor="users-search" className="sr-only">{`search`}</label>
                            <div className="pl-4 mt-1 relative lg:w-64 xl:w-96">
                                <input type="text" name="email" id="searchInput" onKeyUp={(e) => { SearchFunction(e.target.value, dataTable) }}
                                    className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} placeholder={`Search`}>
                                </input>
                            </div>
                        </form>
                        {/* search form end */}
                        {/* icons start */}
                        <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                            <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                            </span>

                            <button onClick={() => deleteAll()} data-tooltip="Delete" aria-label="Delete" className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
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
                        {/* if add button is true then show icon  */}
                        {addButton === true ? <div className="flex items-center justify-center space-x-2 sm:space-x-3 ml-auto">
                            <button className="mr-4  bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex  
                             font-semibold
                                    rounded-lg text-sm px-5 py-2 text-center 
                              items-center ease-linear transition-all duration-150" onClick={() => addButtonAction()} >
                                {`Add `}</button>

                        </div> : <></>}
                    </div>
                    {/* table heading and icons end */}
                    <div className="mt-8 lg:-mr-20 sm:mr-0 w-full ">
                        <div className="overflow-x-auto">
                            <div className="align-middle inline-block w-full">
                                <div className="shadow overflow-x-auto">
                                    <table id="dataTable" className="table data overflow-x-auto table-fixed w-full divide-y divide-gray-200">
                                        <TableHead 
                                        cols={cols}
                                         color={color}
                                         handleSelectAll={(e)=>handleSelectAll(e)} 
                                         isAllSelected={isAllSelected}/>

                                        {inlineTable===true?<InlineTableBody
                                         cols={cols}
                                          data={displayData} 
                                          color={color} 
                                          handlecheckbox={(e) => handlecheckbox(e)}
                                           setDeleteMultiple={(e) => setDeleteMultiple(e)} />:
                                           <TableBody
                                           cols={cols}
                                            data={displayData} 
                                            color={color} 
                                            handlecheckbox={(e) => handlecheckbox(e)}
                                             setDeleteMultiple={(e) => setDeleteMultiple(e)} />}
                                    </table>
                                    {/* Pagination */}
                                    <Pagination color={color}
                                        page={page}
                                        setPage={(value)=>setPage(value)}
                                        data={data}
                                        itemsPerPage={itemsPerPage}
                                        ItemShow={(e) => ItemShow(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </>
    )
}
export default GenericTable