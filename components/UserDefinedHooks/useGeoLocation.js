import { useEffect,useState } from "react";
export default function useGeoLocation(){
    const [geoLocation,setGeoLocation]=useState()
    // useEffect(() => {
        
    //   }, []);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setGeoLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            console.error('Error getting geolocation:', error);
          }
        );
      } else {
        console.log('Geolocation is not available');
      }
      return geoLocation
}
