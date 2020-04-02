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
			county: '',
			town: ''
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
		initInfo(state) {
			if (state.pharmacy.length === 0) return [];
			return state.pharmacy.filter(item => {
				return item.properties.county === state.area.county;
			});
		},
		mapInfo(state, getters) {
			return getters.initInfo.filter(item => {
				return item.properties.town === state.area.town;
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
