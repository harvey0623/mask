import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);
const apiUrl = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json';
export default new Vuex.Store({
	strict: false,
	state: {
		pharmacy: [],
		markerArr: [],
		map: null,
		allowPos: false,
		area: {
			county: '臺北市',
			town: '中正區'
		}
	},
	mutations: {
		setPharmacy(state, value) {
			state.pharmacy = value;
		},
		setCounty(state, value) {
			state.area.county = value;
		},
		setTown(state, value) {
			state.area.town = value;
		},
		setMarkerArr(state, value) {
			state.markerArr = value;
		},
		setMap(state, value) {
			state.map = value;
		},
		setAllowPos(state, value) {
			state.allowPos = value;
		}
	},
	getters: {
		mapInfo(state) {
			if (state.pharmacy.length === 0) return [];
			return state.pharmacy.filter(item => {
				let { county, town } = item.properties;
				let { county: userCounty, town: userTown } = state.area;
				return county === userCounty && town === userTown;
			});
		},
		getMarker: (state) => (coordinate) => {
			let { lng:userLng, lat:userLat } = coordinate;
			return state.markerArr.find(marker => {
				let { lng, lat } = marker._latlng;
				return lng === userLng && lat === userLat;
			});
		}
	},
	actions: {
		async getData({ commit }) {
			let result = await axios.get(apiUrl).then(res => res.data.features);
			commit('setPharmacy', result);
		}
	},
});
