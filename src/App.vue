<template>
<div id="app">
	<SideBar></SideBar>
	<Map :defaultPos="defaultPos"></Map>
	<Loading v-if="isLoading"></Loading>
</div>
</template>

<script>
import { mapMutations } from 'vuex';
import Loading from '@/components/Loading/index.vue';
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
		...mapMutations(['setAllowPos', 'setCounty', 'setTown']),
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
				this.setAllowPos(true);
				let addrInfo = await this.getAddress({ lat, lng }).then(res => res);
				if (addrInfo.success) {
					this.defaultPos = { lat, lng };
					alert(addrInfo.county);
					this.setCounty(addrInfo.county.replace('台', '臺'));
					this.setTown(addrInfo.town);
				}
			} else {
				this.setAllowPos(false);
			}
		}
		await this.$store.dispatch('getData');
		this.isLoading = false;
	},
	components: {
		Loading,
		Map,
		SideBar
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/index.scss';
</style>
