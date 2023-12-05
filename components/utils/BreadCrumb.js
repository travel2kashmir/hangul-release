import React from 'react'
import Link from "next/link";

function BreadCrumb({ crumbList, color }) {
    let icons = {
        "homeIcon": <svg
            className="w-5 h-5 mr-2.5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
        </svg>,
        "rightArrowIcon": <svg
            className="w-6 h-6 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
            ></path>
        </svg>
    }
    return (
        <nav
            data-testid="nav"
            className="flex mb-5 ml-4"
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                {crumbList?.map((listItem, idx) => {
                    return (
                        <li key={idx} className={`inline-flex items-center ${color?.text} text-base font-medium  inline-flex items-center`}>
                            {icons[listItem.icon]}

                            {listItem.link !== "" ?
                                <Link
                                    href={listItem.link}
                                    className={`${color?.text} text-base font-medium  inline-flex items-center`}
                                >
                                    <a className='capitalize'>{listItem.text}</a>
                                </Link> :
                                <span
                                    className="text-gray-400 capitalize ml-1 md:ml-2 font-medium text-sm  "
                                    aria-current="page"
                                >
                                    {listItem.text}
                                </span>}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

export default BreadCrumb