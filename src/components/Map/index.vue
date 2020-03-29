<template>
<div id="map">
   
</div>
</template>

<script>
import L from 'leaflet';
let map = null;
const mapKey = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
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
      }
   },
   methods: {
      initMap() {
         map = L.map('map', {
            center: [22.6743792, 120.1815641],
            zoom: 12
         });
         L.tileLayer(mapKey, {
            maxZoom: 18,
         }).addTo(map);
      },
   },
   watch: {
      currentData(to) {
         console.log(to)
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
</style>