<template>
<li 
   class="pharmacyList" 
   :class="{active: hasStock}"
   @click="moveMap">
   <h3>{{ name }}</h3>
   <p>成人: {{ adultCount }}個 / 小孩: {{ childCount }}個</p>
   <a 
      :href="addressUrl" 
      target="_blank"
   >{{ address }}</a>
   <p>更新時間: {{ updated }}</p>
   <p>備註: {{ note }}</p>
</li>
</template>

<script>
export default {
	props: {
      name: {
         type: String,
         required: true
      },
      adultCount: {
         type: Number,
         required: true
      },
      childCount: {
         type: Number,
         required: true
      },
      address: {
         type: String,
         required: true
      },
      note: {
         type: String,
         required: true
      },
      updated: {
         type: String,
         required: true
      },
      lng: {
         type: Number,
         required: true
      },
      lat: {
         type: Number,
         required: true
      }
   },
   computed: {
      hasStock() {
         return this.adultCount > 0 || this.childCount > 0;
      },
      addressUrl() {
         let url = 'https://www.google.com.tw/maps/place/';
         return url + this.address;
      },
      mapInstance() {
         return this.$store.state.map;
      }
   },
   methods: {
      moveMap() {
         let lng = this.lng;
         let lat = this.lat;
         let marker = this.$store.getters.getMarker({ lng, lat });
         if (marker !== undefined) {
            marker.openPopup();
            if (this.mapInstance !== null) this.mapInstance.setView([lat, lng]);
         }
      }
   },
}
</script>