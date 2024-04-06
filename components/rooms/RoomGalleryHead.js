import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../Button';
import WidgetStatus from '../widgetStatus';

function RoomGalleryHead({ color, language, searchImage, showSearchedImages, setShowSearchedImages, allDelete, setAddImage, check }) {
    const clearSearchField = () => {
        document.getElementById("imageSearchBox").reset();
    };

    return (
        <>
            <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`]} selected={3} color={color} />
            <h6 className={`${color?.text} text-base  flex leading-none mb-2 mx-2 pt-2 font-semibold`}>
                {language?.room}  {language?.gallery}
            </h6>
            <div className="sm:flex py-2 ">
                <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 ml-5 sm:mb-0"> <form className="lg:pr-3" id="imageSearchBox">
                    <label htmlFor="users-search" className="sr-only">
                        {language?.search}
                    </label>
                    <div className="mt-1 relative lg:w-64 xl:w-96">
                        <input
                            type="text"
                            name="imageSearch"
                            onChange={(e) => searchImage(e.target.value)}
                            className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block py-1 w-full p-2.5`}
                            placeholder={language?.searchforimages}
                        ></input>
                    </div>
                </form>
                    {/*  icons to delete , clear , setting */}

                    <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                        {showSearchedImages === 1 ? (
                            <a
                                href="#"
                                onClick={() => {
                                    setShowSearchedImages(0);
                                    clearSearchField();
                                }}
                                className={`${color?.textgray}  hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    title="clear search"
                                    width="26"
                                    height="26"
                                    fill="currentColor"
                                    className="bi bi-eraser-fill"
                                    viewBox="0 0 16 16"
                                >
                                    {" "}
                                    <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />{" "}
                                </svg>
                            </a>
                        ) : (
                            <></>
                        )}
                        <a
                            href="#"
                            className={`${color?.textgray}  hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </a>
                        <a
                            onClick={() => check.length != 0 ? allDelete() : toast.error('APP: No photo selected')}
                            className={
                                check?.length === 0 || undefined
                                    ? `${color?.textgray} cursor-pointer p-1 ${color?.hover} rounded inline-flex
              justify-center`
                                    : `${color?.textgray} bg-red-600 cursor-pointer p-1 ${color?.hover} rounded inline-flex
              justify-center`
                            }
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </a>
                        <a
                            href="#"
                            className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </a>
                        <a
                            href="#"
                            className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                            </svg>
                        </a>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">

                        <Button Primary={language?.Add} onClick={() => setAddImage(1)} />

                    </div>
                </div>

            </div>

        </>
    )
}

export default RoomGalleryHead