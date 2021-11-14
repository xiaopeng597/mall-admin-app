<template>
  <div class="product-detail">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basicDetail v-if="current == 0" @next="next" :form="form"/>
      <saleDetail v-else-if="current == 1" @prev="prev" @next="next" :form="form"/>
    </div>
  </div>
</template>
<script>
import basicDetail from '@/components/basicDetail.vue';
import saleDetail from '@/components/saleDetail.vue';
import api from '@/api/product.js';

export default {
  data() {
    return {
      current: 0,
      form: {
      	title: '',
        desc: '',
        category: 1,
        c_item: [],
        tags: [],
        price: 0,
        price_off: 0,
        inventory: 0,
        unit: '',
        images: [],
      },
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  components: {
  	basicDetail,
  	saleDetail,
  },
  created() {
    const { id } = this.$router.currentRoute.params;
  	console.log(id);
  	if (id) {
  		// 如果有id值则为编辑商品信息
  		api.detail(id).then((res) => {
  			this.form = res;
  		});
  	}
  },
  methods: {
    next(form) {
    	this.form = {
      	...this.form,
      	form,
      };
      if (this.current === 1) {
      	// 提交数据
      	if (this.$router.currentRoute.params.id) {
      		api.edit(this.form).then((res) => {
      			this.$message.success('修改成功');
      			this.$router.push({
      				name: 'ProductList',
      			});
      		});
      	} else {
      		api.add(this.form).then((res) => {
      		this.$message.success('新增成功');
      		this.$router.push({
      			name: 'ProductList',
      		});
      	});
      	}
      } else {
      	this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style scoped lang="less">
.product-detail {
	margin-top: 20px;
	.product-steps {
		width: 50%;
		margin: 20px auto;
	}
	.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
}

</style>
