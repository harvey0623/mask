<template>
<div class="cityBox">
   <select class="form-control" v-model="currentCity">
      <option 
         v-for="(city,index) in cityList"
         :key="index"
         :value="city.cityName"
      >{{ city.cityName }}</option>
   </select>
   <select class="form-control" v-model="currentTown">
      <option 
         v-for="(item,index) in districtList"
         :key="index"
         :value="item.AreaName"
      >{{ item.AreaName }}</option>
   </select>
</div>
</template>

<script>
import area from './area.js';
import { mapState, mapMutations } from 'vuex';
export default {
	data: () => ({
      area,
      isFirst: true
   }),
   computed: {
      ...mapState(['allowPos']),
      currentCity: {
         ...mapState({ get: state => state.area.county }),
         ...mapMutations({ set: 'setCounty' })
      },
      currentTown: {
         ...mapState({ get: state => state.area.town }),
         ...mapMutations({ set: 'setTown' })
      },
      cityList() {
         if (this.area.length === 0) return [];
         return this.area.reduce((prev, current) => {
            prev.push({ cityName: current.CityName });
            return prev;
         }, []);
      },
      districtList() {
         let targetCity = this.area.find(item => item.CityName === this.currentCity);
         this.resetHandler();
         if (targetCity !== undefined) {
            return targetCity.AreaList;
         } else {
            return [];
         }
      }
   },
   methods: {
      resetHandler() {
         this.$emit('reset');
      }
   },
   watch: {
      districtList() {
         if (this.isFirst && this.allowPos) {
            this.isFirst = false;
         } else {
            this.currentTown = this.districtList[0].AreaName;
         }
      },
      currentTown() {
         this.resetHandler();
      }
   }
}
</script>