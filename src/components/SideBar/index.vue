<template>
<div class="sideBar">
   <CitySelect></CitySelect>
</div>
</template>

<script>
import CitySelect from './CitySelect.vue';
export default {
	components: {
      CitySelect
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