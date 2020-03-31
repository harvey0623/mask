<template>
<div class="sideBar">
   <CitySelect></CitySelect>
   <ul class="listBox">
      <PharmacyList
         v-for="item in mapInfo"
         :key="item.properties.id"
         :name="item.properties.name"
         :adultCount="item.properties.mask_adult"
         :childCount="item.properties.mask_child"
         :address="item.properties.address"
         :updated="item.properties.updated"
         :note="item.properties.note"
         :lng="item.geometry.coordinates[0]"
         :lat="item.geometry.coordinates[1]"
      ></PharmacyList>
   </ul>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import CitySelect from './CitySelect.vue';
import PharmacyList from './PharmacyList.vue';
export default {
   computed: {
      ...mapGetters(['mapInfo']),
   },
	components: {
      CitySelect,
      PharmacyList
   }
}
</script>

<style lang="scss">
.sideBar {
   position: fixed;
   left: 0;
   top: 0;
   width: 400px;
   height: 100%;
   padding: 15px 15px 0;
   background-color: #fff;
   overflow: auto;
   z-index: 2;
}

.listBox {
   margin-left: -15px;
   margin-right: -15px;
}
</style>