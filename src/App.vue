<template>
<div id="app">
	<SideBar></SideBar>
	<div class="mapOuter" :class="{invisible: isLoading}">
		<Map :defaultPos="defaultPos"></Map>
	</div>
</div>
</template>

<script>
import Map from '@/components/Map/index.vue';
import SideBar from '@/components/SideBar/index.vue';
import Gps from '@/components/Map/gps.js';
const geoLocation = new Gps();
export default {
	data: () => ({
		defaultPos: {
			lat: 25.0339808,
			lng: 121.5623502
		},
		isLoading: false
	}),
	methods: {
		getAddress({ lat, lng }) {
			return new Promise((resolve, reject) => {
				L.esri.Geocoding.reverseGeocode().latlng([lat, lng])
					.run((err, result, res) => {
						if (!err) {
							return resolve({
								success: true,
								county: result.address.Region,
								town: result.address.City,
							});
						} else {
							return resolve({ success: false });
						}
					});
			});
		}
	},
	async created() {
		this.isLoading = true;
		if (geoLocation.checkSupport()) {
			let { success, lat, lng } = await geoLocation.getPosition().then(res => res);
			if (success) {
				let addrInfo = await this.getAddress({ lat, lng }).then(res => res);
				if (addrInfo.success) {
					this.defaultPos = { lat, lng };
					this.$store.commit('setCounty', addrInfo.county.replace('台', '臺'));
					this.$store.commit('setTown', addrInfo.town);
				}
			}
		}
		await this.$store.dispatch('getData');
		this.isLoading = false;
	},
	components: {
		Map,
		SideBar
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/index.scss';
</style>
