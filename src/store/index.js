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
		}
	},
	getters: {

	},
	actions: {
		async getData({ commit }) {
			let result = await axios.get(apiUrl).then(res => res.data.features);
			commit('setPharmacy', result);
		}
	},
});
