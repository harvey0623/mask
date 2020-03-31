import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);
const apiUrl = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json';
export default new Vuex.Store({
	state: {
		pharmacy: [],
		area: {
			county: '臺北市',
			town: '中正區'
		},
		markerArr: []
	},
	mutations: {
		setPharmacy(state, value) {
			state.pharmacy = value;
		},
		setCounty(state, value) {
			state.area.county = value;
		},
		setTown(state, value) {
			console.log(value);
			state.area.town = value;
		},
		setMarkerArr(state, value) {
			state.markerArr = value;
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
		}
	},
	actions: {
		async getData({ commit }) {
			let result = await axios.get(apiUrl).then(res => res.data.features);
			commit('setPharmacy', result);
		}
	},
});
