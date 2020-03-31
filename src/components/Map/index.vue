<template>
<div id="map"></div>
</template>

<script>
import { mapGetters } from 'vuex';
import L from 'leaflet';
import Controller from './controller.js';
const mapKey = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const controller = new Controller();
export default {
   computed: {
      ...mapGetters(['mapInfo'])
   },
   methods: {
      initMap() {
         controller.map = L.map('map', {
            center: [24.9875278, 121.3646047],
            zoom: 14
         });
         L.tileLayer(mapKey, {
            maxZoom: 20,
         }).addTo(controller.map);
      },
      addMarker() {
         controller.removeMarker();
         this.mapInfo.forEach(item => {
            controller.addMarker(item);
         });
      },
   },
   watch: {
      mapInfo(val) {
         this.addMarker();
         controller.panto(val[0].geometry.coordinates);
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