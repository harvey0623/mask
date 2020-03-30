export default class Controller {
   constructor() {
      this.map = null;
   }
   addMark(item) {
      let { geometry, properties } = item;
      let [ lng, lat ] = geometry.coordinates;
      let marker = L.marker([lat, lng]).addTo(this.map)
         .bindPopup(this.renderHtml(properties));
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
   removeMarker() {
      this.map.eachLayer((layer) => {
         if (layer instanceof L.Marker) {
            this.map.removeLayer(layer);
         }
      });
   }
   panto(position) {
      let { lat, lng } = position;
      this.map.panTo([lat, lng], {
         animate: false
      });
   }
}