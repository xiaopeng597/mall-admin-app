<template>
	<div class="porduct-list">
		<!--搜索框-->
		<Search @submit="searchSubmit" :data="categoryList"/>
		<a-button class="product-add-btn">
			<router-link :to="{name: 'ProductAdd'}">新增商品</router-link>
		</a-button>
		<!--表格栏-->
		<Table :data="tableData" :page="page" @change="changePage" :categoryList="categoryList" @edit="editProduct" @remove="removeProduct"/>
	</div>
</template>

<script>
import Search from '@/components/search.vue';
import Table from '@/components/table.vue';
import api from '@/api/product.js';
import categoryApi from '@/api/category.js';
import ProductAdd from '@/views/page/ProductAdd.vue';

export default {
  data() {
  	return {
  		tableData: [],
  		searchForm: {},
  		categoryList: [],
  		page: {
  			current: 1,
  			pageSize: 10,
  			showSizeChanger: true,
  			total: 1,
  		},
  		categoryObj: {},
  	};
  },
  components: {
    Search,
    Table,
  },
  async created() {
  	await categoryApi.list().then((res) => {
  		this.categoryList = res.data;
  		res.data.forEach((item) => {
  			this.categoryObj[item.id] = item;
  		});
  	});
  	this.getTableData();
  },
  methods: {
  	searchSubmit(form) {
  		this.searchForm = form;
  		this.getTableData();
  	},
  	getTableData() {
  		api.list({
  			page: this.page.current,
  			size: this.page.pageSize,
  			...this.searchForm,
  		}).then((res) => {
  			console.log(res);
  			this.page.total = res.total;
  			this.tableData = res.data.map((item) => ({
  						...item,
  						categoryName: this.categoryObj[item.category].name,
  					}));
  		});
  	},
  	changePage(page) {
  		this.page = page;
  		this.getTableData();
  	},
  	editProduct(record) {
  		this.$router.push({
  			name: 'ProductEdit',
  			params: {
  				id: record.id,
  			},
  		});
  	},
  	removeProduct(record) {
  		this.$confirm({
        title: '是否删除该商品?',
        content: (h) => <div style="color:red;">{`确认删除:${record.title}`}</div>,
        onOk: () => {
        	api.remove({
        		id: record.id,
        	}).then((r) => {
        		this.getTableData();
        	});
        },
        onCancel() {
          console.log('已取消!');
        },
        class: 'confirm-box',
      });
  	},
  },
};
</script>

<style lang="less">
	.product-add-btn {
		float: right;
    	margin-top: -45px;
    	margin-right: 50px;
	}
</style>
