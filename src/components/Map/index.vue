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
            zoom: 15
         });
         L.tileLayer(mapKey, {
            maxZoom: 20,
         }).addTo(controller.map);
         this.$store.commit('setMap', controller.map);
      },
      addMarker() {
         controller.removeMarker();
         this.mapInfo.forEach(item => {
            controller.addMarker(item);
         });
         this.$store.commit('setMarkerArr', controller.markerArr);
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