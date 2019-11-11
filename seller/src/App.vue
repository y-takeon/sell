<template>
  <div id="app">
    <HeaderUI :seller="seller"></HeaderUI>
	<div class="tab border-1px">
		<div class="tab-item">
			<router-link to="/">商品</router-link>
		</div>
		<div class="tab-item">
			<router-link to="/ratings">评价</router-link>
		</div>
		<div class="tab-item">
			<router-link to="/seller">商家</router-link>
		</div>
	</div>
	<router-view :seller="seller"></router-view>
  </div>
</template>
<script type="text/javascript">
	//引入安装的依赖
	import axios from "axios"
	//引入组件
	import HeaderUi from "@/components/Header.vue"
	export default{
		name:'app',
		data(){
			return{
				seller:{}
			}
		},
		created(){
			axios.get('./data.json').then((res)=>{
				this.seller=res.data.seller
			})
		},
		//注册组件
		components:{
			HeaderUI:HeaderUi
		}
	}
</script>
<style lang="scss">
	@import "common/style/mixin.scss";
       #app{
		   .tab{
			   display: flex;
			   width: 100%;
			   height: 40px;
			   line-height: 40px;
			   // border-bottom: 1px solid rgba(7,17,27,0.1);
			   @include border-1px(rgba(7,17,27,0.1));
			   .tab-item{
				   flex: 1;
				   text-align: center;
				   &>a{
					   display: block;
					   font-size: 14px;
					   color: rgb(77,85,93);
				   }
				   .router-link-exact-active{
					   color: rgb(240,20,20);
				   }
			   }
		   }
	   }
</style>
