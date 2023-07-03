import React, { useEffect, useState } from 'react';
import english from '../../components/Languages/en';
import french from "../../components/Languages/fr";
import arabic from "../../components/Languages/ar";
import Router from 'next/router';
import DarkModeLogic from '../../components/darkmodelogic';
var language;


function Liscensing() {
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
        Router.push("./liscensing");
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
                                <span className={`${color?.text} text-xl sm:text-3xl mb-8 leading-none font-bold `}>{language?.licensing}</span>

                            </div>
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-end flex-1 mr-10 text-cyan-600 text-lg font-bold">

                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">
                            We at Travel2Kashmir value the privacy of your personal information and are committed to protecting and preserving its confidentiality. As the owner and operator of Travel2Kashmir (referred to as &quot us &quot,&quot our &quot,&quot or &quot, &quot we &quot  in this Privacy Policy), we have provided this policy to explain how we collect, use, share, and protect information about our users .

                            This Privacy Policy outlines the types of personal data we collect, the purposes for which we use the data, how we handle the data, and your rights concerning your personal data. It is our intention to fulfill the transparency requirements of the EU General Data Protection Regulation 2016/679 (GDPR) and its implementing laws.

                            Rest assured that we will not use or share your personal information with anyone except as described in this Privacy Policy. We are dedicated to maintaining the security and privacy of your information while providing you with the best possible experience on our website.

                            Please read this Privacy Policy carefully to understand how we collect, use, and protect your personal data. If you have any questions or concerns, please feel free to contact us.
                        </p>

                        <p className="text-sm text-gray-500 my-4">
                            The legal basis upon which we rely for the collection and processing of your Personal Information under the GDPR are the following:<br />

                            1. When signing up subscribing to use our Services, you have given us explicit consent allowing Lorem Ipsum to provide you with our Services and generally to process your information in accordance with this Privacy Policy;
                            and to the transfer of your personal data to other jurisdictions including, without limitation, the United States;

                            <br />2. It is necessary registering you as a user, managing your account and profile, and authenticating you when you log in.

                            <br />3. It is necessary for our legitimate interests in the proper administration of our website and business; analyzing the use of the website and our Services; assuring the security of our website and Services;
                            maintaining back-ups of our databases; and communicating with you.
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

export default Liscensing