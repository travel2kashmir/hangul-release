import React from 'react'
import StarRatings from 'react-star-ratings';
function ReviewCard({ color, setActive, setOrg, setEdit, setDel, setModelDel, item }) {
    return (
        <div className={`${color?.whitebackground} shadow rounded-lg mx-4 mb-4 px-8 sm:p-6 xl:p-8  2xl:col-span-2`} >
            <div className="pt-2">
                <div className=" md:px-4 mx-auto w-full ">
                    <div className="border-b-2 py-8 border-cyan-600">

                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <span className={`${color?.text} text-xl sm:text-xl leading-none font-bold `}>{item?.review_author}
                                    {/*Edit icon */}
                                    <button
                                        onClick={() => { setActive(item); setOrg(item); setEdit(1); }}
                                        className={`text-gray-500   ml-4 mr-2 hover:text-gray-900 cursor-pointer hover:bg-gray-100 rounded `}>
                                        <svg className=" h-5  w-5 font-semibold "
                                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                    </button>
                                    <button
                                        onClick={() => { setDel(item?.review_id); setModelDel(1); }} className={`text-gray-500   ml-4 mr-2 hover:text-gray-900 
                                                cursor-pointer hover:bg-gray-100 rounded `}>
                                        <svg className="  w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                    </button>
                                </span>
                                <h3 className="text-base font-normal text-gray-500">{item?.review_date}</h3>
                            </div>
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-end flex-1 mr-10 text-cyan-600 text-lg font-bold">

                                    <StarRatings
                                        rating={item?.review_rating}
                                        starRatedColor="#FDCC0D"
                                        starDimension='16px'
                                        numberOfStars={5}
                                        starSpacing='1px'
                                        name='rating'
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 ">
                            {item?.review_content}
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard