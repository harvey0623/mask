<template>
<div id="map">
   
</div>
</template>

<script>
import L from 'leaflet';
const mapKey = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let map = null;
let mapController = {
   addMark(item) {
      let { geometry, properties } = item;
      let [ lng, lat ] = geometry.coordinates;
      let marker = L.marker([lat, lng]).addTo(map).bindPopup(this.renderHtml(properties));
   },
   renderHtml(data) {
      const url = 'https://www.google.com.tw/maps/place/'
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
   },
   removeMarker() {
      map.eachLayer((layer) => {
         if (layer instanceof L.Marker) {
            map.removeLayer(layer);
         }
      });
   },
   panto(position) {
      let { lat, lng } = position;
      map.panTo([lat, lng], {
         animate: false
      });
   }
}
export default {
	props: {
      pharmacyArr: {
         type: Array,
         required: true
      },
      city: {
         type: String,
         required: true
      },
      district: {
         type: String,
         required: true
      },
   },
   computed: {
      currentData() {
         if (this.pharmacyArr.length === 0) return [];
         return this.pharmacyArr.filter(pharmacy => {
            let { county, town } = pharmacy.properties;
            return county === this.city && town === this.district;
         });
      },
      areaPosition() {
         let [ lng, lat ] = this.currentData[0].geometry.coordinates;
         return { lng, lat };
      }
   },
   methods: {
      initMap() {
         map = L.map('map', {
            center: [24.9875278, 121.3646047],
            zoom: 12
         });
         L.tileLayer(mapKey, {
            maxZoom: 18,
         }).addTo(map);
      },
      addMark() {
         this.currentData.forEach(item => {
            mapController.addMark(item);
         });
      },
   },
   watch: {
      currentData() {
         mapController.removeMarker();
         this.addMark();
         mapController.panto(this.areaPosition);
      }
   },
   mounted() {
      this.initMap();
   }
}
</script>

<style lang="scss">
#map {
   width: 100%;
   height: 100vh;
}

.leaflet-popup-content > * {
   font-size: 15px;
}

.leaflet-popup-content p {
   margin: 5px 0;
}
</style>