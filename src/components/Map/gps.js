export default class Gps {
   constructor() {}
   checkSupport() {
      if (navigator.geolocation) return true;
      else return false;
   }
   getPosition() {
      return new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition((res) => {
            resolve({ 
               success: true,  
               lng: res.coords.longitude,
               lat: res.coords.latitude
            });
         }, (err) => {
            resolve({ success: false });
         }, { enableHighAccuracy: true });
      });
   }
}