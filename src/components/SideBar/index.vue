<template>
<div class="sideBar">
   <CityBox
      :cityA.sync="cityA"
      :districtA.sync="districtA"
   ></CityBox>
</div>
</template>

<script>
import CityBox from './CityBox.vue';
export default {
   props: {
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
      cityA: {
         get() {
            return this.city;
         },
         set(val) {
            this.$emit('update:city', val);
         }
      },
      districtA: {
         get() {
            return this.district;
         },
         set(val) {
            this.$emit('update:district', val);
         }
      },
   },
	components: {
      CityBox
   }
}
</script>

<style lang="scss">
.sideBar {
   position: fixed;
   left: 0;
   top: 0;
   width: 300px;
   height: 100%;
   padding: 15px;
   background-color: #fff;
   overflow: auto;
   z-index: 2;
}
</style>