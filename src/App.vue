<template>
<div id="app">
	<SideBar></SideBar>
	<!-- <div class="mapBox">
		<Map
			:pharmacyArr="pharmacyArr"
			:city="area.city"
			:district="area.district"
		></Map>
	</div> -->
</div>
</template>

<script>
import Map from '@/components/Map/index.vue';
import SideBar from '@/components/SideBar/index.vue';
import axios from 'axios';
const apiUrl = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json';
export default {
	data: () => ({
		
	}),
	methods: {
		
	},
	async created() {
		this.$store.dispatch('getData')
	},
	components: {
		Map,
		SideBar
	},
}
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

#app {
	padding-left: 300px;
}
</style>
