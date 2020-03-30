<template>
<div class="cityBox">
   <select class="form-control city-select" v-model="cityB">
      <option 
         v-for="(city,index) in cityList"
         :key="index"
         :value="city.cityName"
      >{{ city.cityName }}</option>
   </select>
   <select class="form-control" v-model="districtB">
      <option value="" disabled>請選擇</option>
      <option 
         v-for="item in districtList"
         :key="item.ZipCode"
         :value="item.AreaName"
      >{{ item.AreaName }}</option>
   </select>
</div>
</template>

<script>
import area from './area.js';
export default {
   props: {
      cityA: {
         type: String,
         required: true
      },
      districtA: {
         type: String,
         required: true
      },
   },
	data: () => ({
      area
   }),
   computed: {
      cityB: {
         get() {
            return this.cityA;
         },
         set(val) {
            this.$emit('update:cityA', val);
         }
      },
      districtB: {
         get() {
            return this.districtA;
         },
         set(val) {
            this.$emit('update:districtA', val);
         }
      },
      cityList() {
         if (this.area.length === 0) return [];
         return this.area.reduce((prev, current) => {
            prev.push({ cityName: current.CityName });
            return prev;
         }, []);
      },
      districtList() {
         this.districtB = '';
         if (this.area.length === 0) return [];
         let targetCity = this.area.find(item => item.CityName === this.cityB);
         if (targetCity !== undefined) return targetCity.AreaList;
         else return [];
      }
   }
}
</script>

<style lang="scss">
.city-select {
   margin-bottom: 15px;
}
</style>