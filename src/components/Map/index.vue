<template>
<div id="map">

</div>
</template>

<script>
import L from 'leaflet';
import Controller from './controller.js';
const mapKey = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const controller = new Controller();
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
         controller.map = L.map('map', {
            center: [24.9875278, 121.3646047],
            zoom: 16
         });
         L.tileLayer(mapKey, {
            maxZoom: 20,
         }).addTo(controller.map);
      },
      addMark() {
         this.currentData.forEach(item => {
            controller.addMark(item);
         });
      },
   },
   watch: {
      currentData() {
         controller.removeMarker();
         this.addMark();
         controller.panto(this.areaPosition);
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