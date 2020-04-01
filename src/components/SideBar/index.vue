<template>
<div class="sideBar">
   <div class="topBox">
      <CitySelect @reset="resetHandler"></CitySelect>
      <SearchInput :text.sync="text"></SearchInput>
      <p class="tip">(綠色代表還有口罩)</p>
   </div>
   <ul class="listBox" ref="listBox">
      <PharmacyList
         v-for="item in filterInfo"
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
import SearchInput from './SearchInput.vue';
export default {
   data: () => ({
      text: ''
   }),
   computed: {
      ...mapGetters(['mapInfo']),
      filterInfo() {
         if (this.text === '') return this.mapInfo;
			return this.mapInfo.filter(item => {
				return item.properties.name.includes(this.text);
			});
      }
   },
   methods: {
      resetHandler() {
         this.text = '';
         let listBox = this.$refs.listBox;
         if (listBox !== undefined) listBox.scrollTop = 0;
      }
   },
	components: {
      CitySelect,
      PharmacyList,
      SearchInput
   }
}
</script>