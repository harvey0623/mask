<template>
<div id="app">
	<SideBar></SideBar>
	<Map></Map>
</div>
</template>

<script>
import Map from '@/components/Map/index.vue';
import SideBar from '@/components/SideBar/index.vue';
export default {
	data: () => ({
		
	}),
	methods: {
		
	},
	async created() {
		this.$store.dispatch('getData');
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

ul {
	list-style: none;
	margin-bottom: 0;
}

a {
	display: inline-block;
}

#app {
	padding-left: 400px;
}
</style>
