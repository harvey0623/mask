<template>
<div id="map"></div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import Controller from './controller.js';
const mapKey = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const controller = new Controller();
export default {
   props: {
      defaultPos: {
         type: Object,
         required: true
      }
   },
   data: () => ({
      isFirst: true
   }),
   computed: {
      ...mapState(['allowPos']),
      ...mapGetters(['mapInfo'])
   },
   methods: {
      ...mapMutations(['setMap', 'setMarkerArr']),
      initMap() {
         controller.map = L.map('map', {
            center: [this.defaultPos.lat, this.defaultPos.lng],
            zoom: 15
         });
         L.tileLayer(mapKey, {
            maxZoom: 20,
         }).addTo(controller.map);
         this.setMap(controller.map);
      },
      addMarker() {
         controller.removeMarker();
         this.mapInfo.forEach(item => {
            controller.addMarker(item);
         });
         this.setMarkerArr(controller.markerArr);
      },
   },
   watch: {
      mapInfo(val) {  //如果是地一次變動使用預設座標,其他次使用地一個點的位子
         this.addMarker();
         if (this.isFirst && this.allowPos) {
            this.isFirst = false;
            let { lat, lng } = this.defaultPos;
            controller.panto([lng, lat]);
         } else {
            controller.panto(val[0].geometry.coordinates);
         }
      }
   },
   mounted() {
      this.initMap();
   }
}
</script>