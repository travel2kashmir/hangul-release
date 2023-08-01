import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { english, french, arabic } from "./Languages/Languages"
import getConfig from 'next/config';
import generatedGitInfo from './generatedGitInfo.json';
var language;
const gitCommand = "git rev-parse HEAD";
const { publicRuntimeConfig } = getConfig();
import Modal from "./NewTheme/modal";
let privacy = `Privacy Policy - Travel2Kashmir

Introduction:

Travel2Kashmir (India) Private Limited (hereinafter “T2K”) recognizes the importance of privacy of its users and also of maintaining confidentiality of the information provided by its users as a responsible data controller and data processer.

This Privacy Policy provides for the practices for handling and securing user's Personal Information (defined hereunder) by T2K and its subsidiaries and affiliates.

This Privacy Policy is applicable to any person (‘User’) who purchase, intend to purchase, or inquire about any product(s) or service(s) made available by T2K through any of T2K’s customer interface channels including its website, mobile site, mobile app & offline channels including call centers and offices (collectively referred herein as "Sales Channels").

For the purpose of this Privacy Policy, wherever the context so requires "you" or "your" shall mean User and the term "we", "us", "our" shall mean T2K. For the purpose of this Privacy Policy, Website means the website(s), mobile site(s) and mobile app(s).

By using or accessing the Website or other Sales Channels, the User hereby agrees with the terms of this Privacy Policy and the contents herein. If you disagree with this Privacy Policy please do not use or access our Website or other Sales Channels.

This Privacy Policy does not apply to any website(s), mobile sites and mobile apps of third parties, even if their websites/products are linked to our Website. User should take note that information and privacy practices of T2K’s business partners, advertisers, sponsors or other sites to which T2K provides hyperlink(s), may be materially different from this Privacy Policy. Accordingly, it is recommended that you review the privacy statements and policies of any such third parties with whom they interact.

This Privacy Policy is an integral part of your User Agreement with T2K and all capitalized terms used, but not otherwise defined herein, shall have the respective meanings as ascribed to them in the User Agreement.

USERS OUTSIDE THE GEOGRAPHICAL LIMITS OF INDIA

Please note that the data shared with T2K shall be primarily processed in India and such other jurisdictions where a third party engaged by T2K may process the data on T2K’s behalf. By agreeing to this policy, you are providing T2K with your explicit consent to process your personal information for the purpose(s) defined in this policy. The data protection regulations in India or such other jurisdictions mentioned above may differ from those of your country of residence.

If you have any concerns in the processing your data and wish to withdraw your consent, you may do so by writing to the following email id: chairman@travel2kashmir.com . However, if such processing of data is essential for us to be able to provide service to you, then we may not be able to serve or confirm your bookings after your withdrawal of consent. For instance, if you want to book any international holiday package in fixed departures (group bookings), then certain personal information of yours like contact details, gender, dietary preferences, choice of room with smoking facility, any medical condition which may require specific attention or facility etc. may have to be shared by us with our vendors in each city where you will stay, and they may further process this information for making suitable arrangements for you during the holiday. Such sharing and processing of information may extend to the hotel where you will stay or the tour manager who will be your guide during the travel.

A withdrawal of consent by you for us to process your information may:

    severely inhibit our ability to serve you properly and in such case, we may have to refuse the booking altogether, or
    unreasonably restrict us to service your booking (if a booking is already made) which may further affect your trip or may compel us to cancel your booking.

TYPE OF INFORMATION WE COLLECT AND ITS LEGAL BASIS

The information as detailed below is collected for us to be able to provide the services chosen by you and also to fulfill our legal obligations as well as our obligations towards third parties as per our User Agreement.

"Personal Information" of User shall include the information shared by the User and collected by us for the following purposes:

Registration on the Website: Information which you provide while subscribing to or registering on the Website, including but not limited to information about your personal identity such as name, gender, marital status, religion, age, profile picture etc., your contact details such as your email address, postal addresses, frequent flyer number, telephone (mobile or otherwise) and/or fax numbers. The information may also include information such as your banking details (including credit/debit card) and any other information relating to your income and/or lifestyle; billing information payment history etc. (as shared by you).

Other information: We many also collect some other information and documents including but not limited to:

    Transactional history (other than banking details) about your e-commerce activities, buying behavior.
    Your usernames, passwords, email addresses and other security-related information used by you in relation to our Services.
    Data either created by you or by a third party and which you wish to store on our servers such as image files, documents etc.
    Data available in public domain or received from any third party including social media channels, including but not limited to personal or non-personal information from your linked social media channels (like name, email address, friend list, profile pictures or any other information that is permitted to be received as per your account settings) as a part of your account information.
    Information pertaining any other traveler(s) for who you make a booking through your registered T2K account. In such case, you must confirm and represent that each of the other traveler(s) for whom a booking has been made, has agreed to have the information shared by you disclosed to us and further be shared by us with the concerned service provider(s).
    If you request T2K to provide visa related services, then copies of your passport, bank statements, originals of the filled in application forms, photographs, and any other information which may be required by the respective embassy to process your visa application.
    For international bookings, Users, in compliance with the Liberalized Remittance Scheme(LRS) of RBI or any other law may be required to provide details such as their PAN information or passport details number or any such information required by Service Provider. Such information shall be strictly used as per the aforesaid requirements only. In case a User does not wish to provide this information, T2K may not be able to process the booking. T2K will never share User’s PAN details without their prior consent unless otherwise such action is required by any law enforcement authority for investigation, by court order or in reference to any legal process.
    In case you opt for contactless check-in at Hotels, then copies of your government identification like aadhar, driving license, election card etc., Self-declaration and any other information like date of birth, destination/origin of travel and place of residence that may be required by the concerned Hotel to honor your hotel booking.
    For international bookings, Users, in compliance with the Liberalized Remittance Scheme(LRS) of RBI or any other law may be required to provide details such as their PAN information or passport details number or any such information required by Service Provider.
    In case you opt for contactless check-in at Hotels, then copies of your government identification like aadhar, driving license, election card etc., Self-declaration and any other information like date of birth, destination/origin of travel and place of residence that may be required by the concerned Hotel to honor your hotel booking.
    Your Covid-19 Vaccination status and certificate in case you wish to avail any service for provision of which such Covid-19 vaccination related information is required or want to access your vaccination certificate at a later stage for travel related or any other purpose. T2K will never process the beneficiary id and other id details contained in the vaccination certificate.

Such information shall be strictly used for the aforesaid specified & lawful purpose only. User further understands that T2K may share this information with the end service provider or any other third party for provision and facilitation of the desired booking. T2K will always redact all/any sensitive & confidential information contained in the vaccination certificate, passbook, bank statement or any other identity card submitted for the purpose of availing a service, promotional offer or booking a product on the Website. In case a User does not wish to provide this information or opts for deletion of the information already provided, T2K may not be able to process the desired booking request. T2K will never share any of the above information collected including PAN card details, Vaccination status & certificate , Passport details , Aadhar Card details without their prior consent unless otherwise such action is required by any law enforcement authority for investigation, by court order or in reference to any legal process.

HOW WE USE YOUR PERSONAL INFORMATION:

The Personal Information collected maybe used in the following manner:

While making a booking

While making a booking, we may use Personal Information including, payment details which include cardholder name, credit/debit card number (in encrypted form) with expiration date, banking details, wallet details etc. as shared and allowed to be stored by you. We may also use the information of travelers list as available in or linked with your account. This information is presented to the User at the time of making a booking to enable you to complete your bookings expeditiously.

We may also use your Personal Information for several reasons including but not limited to:

    confirm your reservations with respective service providers;
    keep you informed of the transaction status;
    send booking confirmations either via sms or Whatsapp or any other messaging service;
    send any updates or changes to your booking(s);
    allow our customer service to contact you, if necessary;
    customize the content of our website, mobile site and mobile app;
    request for reviews of products or services or any other improvements;
    send verification message(s) or email(s);
    validate/authenticate your account and to prevent any misuse or abuse.
    contact you on your birthday/anniversary to offer a special gift or offer.

`;

function Footer(args) {
    useEffect(() => {
        const firstfun = () => {
            if (typeof window !== 'undefined') {

                var locale = localStorage.getItem("Language");

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
    }, [])

    return (
        <div className={`${args?.color?.greybackground} px-4 relative overflow-y-auto lg:ml-64`}>
            <footer className={`${args?.color?.whitebackground} md:flex md:items-center md:justify-between shadow rounded-lg p-4 md:p-6 xl:p-8 my-6`}>
                <ul className="flex items-center flex-wrap mb-6 md:mb-0">
                    <li >
                        <Link href={{ pathname: args?.Primary?.termsandconditions, query: { id: 1 } }}>
                            <span className={`text-sm font-normal ${args?.color?.textgray} hover:cursor-pointer hover:underline mr-4 md:mr-6`}>
                                {language?.termsandconditions}</span></Link>
                    </li>


                    <li>
                        <Link href={{ pathname: args?.Primary?.termsandconditions, query: { id: 1 } }}><span className={`text-sm font-normal ${args?.color?.textgray} hover:cursor-pointer hover:underline mr-4 md:mr-6`}>
                            {language?.privacypolicy}</span></Link></li>


                    <li> <Link href={{ pathname: args?.Primary?.contactus, query: { id: 1 } }}><span className={`text-sm font-normal ${args?.color?.textgray} hover:cursor-pointer hover:underline mr-4 md:mr-6`}>
                        {language?.contact}</span></Link></li>
                    <li><span href="#" className={`text-sm font-normal ${args?.color?.textgray} hover:cursor-pointer hover:underline`}>
                        v:{publicRuntimeConfig}#{generatedGitInfo?.gitBranch}@{generatedGitInfo?.gitCommitHash}

                    </span></li>
                </ul>
                <div className="flex sm:justify-center space-x-6">
                    <a href="https://www.facebook.com/travel2kashmir" className={`${args?.color?.textgray} ${args?.color?.footerhover}`}>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                    </a>
                    {/* <a href="#" className={` ${args?.color?.footerhover} ${args?.color?.textgray}`}>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a href="#" className={` ${args?.color?.footerhover} ${args?.color?.textgray}`}>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                    </a>
                    <a href="#" className={` ${args?.color?.footerhover} ${args?.color?.textgray}`}>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a href="#" className={` ${args?.color?.footerhover} ${args?.color?.textgray}`}>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                        </svg>
                    </a> */}
                </div>
            </footer>
            <p className={`text-center text-sm ${args?.color?.textgray} my-10`}>
                &copy; 2022 <a href="" className="hover:underline">Hangul </a> {language?.allrightsreserved}.
            </p>


        </div>
    )
}

export default Footer
