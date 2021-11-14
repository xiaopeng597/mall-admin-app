import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import getMenuRoutes from '@/utils/permission.js';
import Home from '@/views/layout/Home.vue';
import Login from '@/views/layout/Login.vue';

Vue.use(VueRouter);

const ayncRouterMap = [{
  path: '/product',
  name: 'Product',
  component: Home,
  meta: {
    title: '商品',
    hidden: false,
    icon: 'inbox',
  },
  children: [{
    path: '/list',
    name: 'ProductList',
    component: () => import('@/views/page/ProductList.vue'),
    meta: {
      title: '商品列表',
      hidden: false,
      icon: 'bars',
    },
  }, {
    path: '/add',
    name: 'ProductAdd',
    component: () => import('@/views/page/ProductAdd.vue'),
    meta: {
      title: '新增商品',
      hidden: false,
      icon: 'file-add',
    },
  }, {
    path: '/edit/:id',
    name: 'ProductEdit',
    component: () => import('@/views/page/ProductAdd.vue'),
    meta: {
      title: '编辑商品',
      icon: 'file-add',
      hidden: true,
    },
  }, {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/page/Category'),
    meta: {
      title: '商品类目',
      hidden: false,
    },
  }],
}];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    meta: {
    	title: '首页',
    	hidden: false,
    	icon: 'home',
    },
    children: [{
    	path: '/index',
    	name: 'Index',
    	meta: {
    		title: '统计',
    		hidden: false,
    		icon: 'home',
    	},
    	component: () => import('../views/page/Index.vue'),
    }],
  },
  {
  	path: '/login',
  	name: 'Login',
  	component: Login,
  	meta: {
  		title: '登录',
  		hidden: true,
  	},
  },
];

const router = new VueRouter({
  routes,
});

let isAddRoutes = false;

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddRoutes) {
      	const menuRoutes = getMenuRoutes(store.state.user.role, ayncRouterMap);
      	store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
      		router.addRoutes(menuRoutes);
      		next();
      	});
      	isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  	return next();
});

export default router;
