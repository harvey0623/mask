<template>
<div id="app">
	<SideBar
		:city.sync="area.city"
		:district.sync="area.district"
	></SideBar>
	<div class="mapBox">
		<Map
			:pharmacyArr="pharmacyArr"
			:city="area.city"
			:district="area.district"
		></Map>
	</div>
</div>
</template>

<script>
import Map from '@/components/Map/index.vue';
import SideBar from '@/components/SideBar/index.vue';
import axios from 'axios';
const apiUrl = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json';
export default {
	data: () => ({
		pharmacyArr: [],
		area: {
			city: '臺北市',
			district: '大安區'
		},
		centerPos: {
			lng: 0,
			lat: 0
		}
	}),
	methods: {
		getData() {
			return axios.get(apiUrl);
		}
	},
	async created() {
		this.pharmacyArr = await this.getData().then(res => res.data.features);
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
