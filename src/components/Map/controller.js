export default class Controller {
   constructor() {
      this.map = null;
      this.markerArr = [];
   }
   addMarker(item) {
      let { geometry, properties } = item;
      let [ lng, lat ] = geometry.coordinates;
      let icon = this.createIcon(properties);
      let marker = L.marker([lat, lng], { icon }).addTo(this.map)
         .bindPopup(this.renderHtml(properties));
      this.markerArr.push(marker);
   }
   renderHtml(data) {
      const url = 'https://www.google.com.tw/maps/place/';
      return `
         <p class="siteName">${data.name}</p>
         <p class="count">
            口罩剩餘:
            成人:${data.mask_adult}個 /
            小孩:${data.mask_child}個
         </p>  
         <a href="${url + data.address}" target="_blank">地址:${data.address}</a>
         <p class="phone">電話:${data.phone}</p>
         <p class="updateTime">更新時間:${data.updated}</p>`
   }
   createIcon({ mask_adult, mask_child }) {
      let iconColor = mask_adult !== 0 || mask_child !== 0 ? '2x-green' : '2x-grey'; 
      return new L.Icon({
         iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-${iconColor}.png`,
         shadowUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png`,
         iconSize: [25, 41],
         iconAnchor: [12, 41],
         popupAnchor: [1, -34],
         shadowSize: [41, 41]
      });
   }
   removeMarker() {
      this.markerArr = [];
      this.map.eachLayer(layer => {
         if (layer instanceof L.Marker) {
            this.map.removeLayer(layer);
         }
      });
   }
   panto(coordinate) {
      let [lng, lat] = coordinate;
      this.map.setView([lat, lng]);
   }
}