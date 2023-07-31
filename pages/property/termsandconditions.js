import React, { useEffect, useState } from 'react';
import english from '../../components/Languages/en';
import french from "../../components/Languages/fr";
import arabic from "../../components/Languages/ar";
import Router from 'next/router';
import DarkModeLogic from '../../components/darkmodelogic';
var language;

function TermsAndConditions() {
    const [darkModeSwitcher, setDarkModeSwitcher] = useState()
    const [color, setColor] = useState({})


    useEffect(() => {
        const firstfun = () => {
            if (typeof window !== 'undefined') {
                var locale = localStorage.getItem("Language");
                const colorToggle = JSON.parse(localStorage.getItem("ColorToggle"));
                const color = JSON.parse(localStorage.getItem("Color"));
                setColor(color);
                setDarkModeSwitcher(colorToggle)
                if (locale === "ar") {
                    language = arabic;
                }
                if (locale === "en") {
                    language = english;
                }
                if (locale === "fr") {
                    language = french;
                }
            }
        }
        firstfun();
        Router.push("./termsandconditions");
    }, [])

    useEffect(() => {
        setColor(DarkModeLogic(darkModeSwitcher))
    }, [darkModeSwitcher])

    return (
        <div className={`${color?.whitebackground} mb-4 sm:p-6 xl:p-8 2xl:col-span-2`} >
            <div className="pt-2">
                <div className=" md:px-4 mx-auto w-full ">
                   
                    <div className="border-b-2 py-8 border-cyan-600">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <span className={`${color?.text} text-xl sm:text-3xl mb-8 leading-none font-bold `}>{language?.termsandconditions}</span>

                            </div>
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-end flex-1 mr-10 text-cyan-600 text-lg font-bold">

                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">
                            We at Travel2kashmir respect the privacy of your personal information and, as such, make every effort to ensure your information is
                            protected and remains private. As the owner and operator of travel2kashmir.com (the Website) hereafter referred to in this Privacy
                            Policy as t2k, us, our or we, we have provided this Privacy Policy to explain how we collect, use, share and protect information about
                            the users of our Website(hereafter referred to as “user”, “you” or your).
                            For the purposes of this Agreement, any use of the terms t2k, us, our or we includes travel2kashmir, without limitation.
                            We will not use or share your personal information with anyone except as described in this Privacy Policy.

                            This Privacy Policy will inform you about the types of personal data we collect, the purposes for which we use
                            the data, the ways in which the data is handled and your rights with regard to your personal data.
                            
                        </p>

                     
                        <p className="text-sm text-gray-500 my-4">
                            To resolve technical issues you encounter, to respond to your requests for assistance, comments and questions, to analyze crash information, to repair and improve the Services and provide other customer support.

                            Our Services, as well as the email messages sent with respect to our Services, may contain links or access to websites operated by third parties that are beyond our control. Links or access to third parties from our Services are not an endorsement by us of such third parties, or their websites, applications,
                            products, services, or practices.
                            We are not responsible for the privacy policy,
                            terms and conditions, practices or the content of such third parties. These third-parties may send their own Cookies to you and independently collect data.

                            If you visit or access a third-party Website, application or other property that is linked or accessed from our Services, we encourage you to read any privacy policies and terms and conditions of that third party before providing any personally identifiable information.
                            If you have a question about the terms and conditions, privacy policy, practices or contents of a third party, please contact the third party directly.

                        </p>

                    </div>
                    <div className="border-b-2 py-8 border-cyan-600">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <span className={`${color?.text} text-xl sm:text-3xl mb-8 leading-none font-bold `}>{language?.privacypolicy}</span>

                            </div>
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-end flex-1 mr-10 text-cyan-600 text-lg font-bold">

                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">
                            We at Travel2kashmir respect the privacy of your personal information and, as such, make every effort to ensure your information is
                            protected and remains private. As the owner and operator of travel2kashmir.com (the Website) hereafter referred to in this Privacy
                            Policy as t2k, us, our or we, we have provided this Privacy Policy to explain how we collect, use, share and protect information about
                            the users of our Website(hereafter referred to as “user”, “you” or your).
                            For the purposes of this Agreement, any use of the terms t2k, us, our or we includes travel2kashmir, without limitation.
                            We will not use or share your personal information with anyone except as described in this Privacy Policy.

                            This Privacy Policy will inform you about the types of personal data we collect, the purposes for which we use
                            the data, the ways in which the data is handled and your rights with regard to your personal data.
                            
                        </p>

                     
                        <p className="text-sm text-gray-500 my-4">
                            To resolve technical issues you encounter, to respond to your requests for assistance, comments and questions, to analyze crash information, to repair and improve the Services and provide other customer support.

                            Our Services, as well as the email messages sent with respect to our Services, may contain links or access to websites operated by third parties that are beyond our control. Links or access to third parties from our Services are not an endorsement by us of such third parties, or their websites, applications,
                            products, services, or practices.
                            We are not responsible for the privacy policy,
                            terms and conditions, practices or the content of such third parties. These third-parties may send their own Cookies to you and independently collect data.

                            If you visit or access a third-party Website, application or other property that is linked or accessed from our Services, we encourage you to read any privacy policies and terms and conditions of that third party before providing any personally identifiable information.
                            If you have a question about the terms and conditions, privacy policy, practices or contents of a third party, please contact the third party directly.

                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TermsAndConditions