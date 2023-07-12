import React from 'react'

function TableHead({ cols = [], color = {},handleSelectAll,isAllSelected, ...args }) {
    return (
        <thead className={` ${color?.tableheader} w-full`}>
            <tr>
                {cols.map((col, index) => {
                    return(
                        <React.Fragment key={index} >
                        {col === "checkbox" ?
                            <th key={index} scope="col" className={`p-4 w-10`}>
                            <div className='flex items-center'>
                                <input type="checkbox" checked={isAllSelected} onClick={(e)=>handleSelectAll(e)} className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                            </div>
                        </th>                       
                        :<><th scope="col" 
                        className={`p-4 text-left text-xs font-semibold ${color?.text} uppercase`}> {col}</th></>}

                    </React.Fragment>
                    )
                    
                })}
        </tr>
        </thead >
    )
}

export default TableHead