<template>
	<div class="CartControl">
		<transition name="decrease-classes-transition"
					enter-active-class="animated rotateInDownRight"
					leave-active-class="animated rollOut">

		<div class="decrease" v-show="food.count>0"  @click="decreaseCart">
			<i class="icon-remove_circle_outline"></i>
		</div>
		</transition>
		<div class="num" v-show="food.count>0">
			{{food.count}}
		</div>
		<transition name="decrease-classes-transition"
					enter-active-class="animated rotateInDownRight"
					leave-active-class="animated rollOut">

		<div class="add" @click="addCart">
			<i class="icon-add_circle"></i>
		</div>
		</transition>
	</div>
</template>

<script>
	import Vue from "vue"
	export default{
		name:'CartControl',
		props:{
			food:{
				type:Object
			}
		},
		methods: {
			addCart(){
				if(!this.food.count){
					Vue.set(this.food,'count',1)
				}else{
					this.food.count++
				}
				this.$root.eventHub.$emit("cart_add",event.target)
			},
			decreaseCart(){
				if(this.food.count>0){
					this.food.count--
				}
				
			}
			
		}
	}
</script>

<style lang="scss">
	.CartControl{
		.decrease,.add{
			display: inline-block;
			vertical-align: top;
			padding: 6px;
			font-size:24px;
			line-height: 24px;
			color: rgb(0,160,220);
		}
		.num{
			display: inline-block;
			vertical-align: top;
			width: 12px;
			font-size:10px;
			margin-top:7px;
			padding-top:6px;
			text-align: center;
			color:rgb(147,153,159);
			font-weight:200;
		}
	}
</style>
