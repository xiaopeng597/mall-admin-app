<template>
	<div class="home">
		<LeftMenu :key="key"/>
		<div :class="{'main-app':true, 'menu-unfold':$store.state.collapsed}">
			<SliderNav />
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import LeftMenu from './components/menu.vue';
import SliderNav from './components/sliderNav.vue';

export default {
  data() {
    return {
      collapsed: false,
      key: new Date().getTime(),
    };
  },
  watch: {
  	$route() {
  		this.key = new Date().getTime();
  	},
  },
  components: {
    LeftMenu,
    SliderNav,
  },
  methods: {

  },
};
</script>

<style lang="less">
    @import "~@/assets/css/home.less";
</style>
