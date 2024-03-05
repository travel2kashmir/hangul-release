import axios from 'axios';
import { SHA256 } from 'crypto-js';

function getUserDetails() {
    return {
        language: navigator.language || navigator.languages[0],
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        browserName: navigator.userAgent.split(' ').pop().split('/')[0],
        platform: navigator.userAgent.substring(navigator.userAgent.indexOf('(') + 1, navigator.userAgent.indexOf(';'))
    };
}

function findGeoLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    reject('Error getting geolocation: ' + error.message);
                }
            );
        } else {
            reject('Geolocation is not available');
        }
    });
}

function hashAndSendToSegment(IP, geolocation, info) {
    if (IP && geolocation?.latitude && geolocation?.longitude) {
        // Serialize the object into a JSON string
        const objectToSave = {
            IP: IP,
            latitude: geolocation.latitude,
            longitude: geolocation.longitude,
            ...info
        };
        const hash = SHA256(JSON.stringify(objectToSave)).toString();
        // Check if the cookie has the data for the user key
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const cookieData = cookies.find(cookie => cookie.startsWith('user='));
        if (cookieData) {
            const userData = JSON.parse(cookieData.substring(5)); // Remove 'user=' prefix
            if (userData.user === hash) {
                // Data found in cookie, return it
                return userData;
            }
        }

        // Data not found in cookie or user mismatch, save new data to cookie and return it
        const jsonString = JSON.stringify({ "user": hash, ...objectToSave });
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 1); // Set expiry to 1 month from now
        document.cookie = `user=${jsonString}; expires=${expiryDate.toUTCString()}; path=/`;

        // Return new data
        return { "user": hash, ...objectToSave };
    }
    return null; // Return null if IP or geolocation is missing
}

export default async function getUserIdentity() {
    const info = getUserDetails();
    let IP;
    try {
        const res = await axios.get('https://api64.ipify.org?format=json');
        IP = res.data.ip;
    } catch (error) {
        console.error('Error getting IP:', error.message);
        IP = null;
    }

    let geolocation;
    try {
        geolocation = await findGeoLocation();
    } catch (error) {
        console.error(error);
        geolocation = null;
    }

    return hashAndSendToSegment(IP, geolocation, info);
}
