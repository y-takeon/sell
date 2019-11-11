<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item , index) in goods" class="menu-item" :class="{current:currentIndex===index}" @click="selectMenu(index,$event)">
					<span class="text border-1px">
						<span class="icon" v-if="item.type>0" :class="classMap[item.type]"></span>
						{{item.name}}
					</span>	
				</li>
			</ul>
		</div>
		<div class="good-wrapper" ref="foodWrapper">
			<ul>
				<li v-for="item in goods" class=" food-list-hook">
					<h1 class="food-title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px" >
							<div class="icon" @click="selectedFood(food,$event)">
								<img :src="food.icon" width="57" height="57"/>
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="description">{{food.description}}</p>
								<div class="exta">
									<span class="count">月售{{food.sellerCount}}份</span>
									<span class="ratings">好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="oldPrice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
							</div>
							<div class="control-wrapper">
								<CartControl :food="food"></CartControl>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<ShopCart ref="shopcart" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" :selectFoods="selectFoods"></ShopCart>
	    <food :food="clickFood"  ref="clickFoodWrapper"></food>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	import axios from "axios"
	import ShopCart from "../components/ShopCart.vue"
	import CartControl from "../components/CartControl.vue"
	import food from "../components/food.vue"
	export default{
		name:'goods',
		data(){
			return {
				goods:[],
				classMap:[],
				scrollHeight:[],
				scrollY:0,
				clickFood:{}
			}
		},
		components:{
			ShopCart,
			CartControl,
			food
		},
		props:{
			seller:{
				type:Object
			}
		},
		computed:{
			currentIndex(){
				for(let i=0;i<this.scrollHeight.length;i++){
					let height1=this.scrollHeight[i]
					let height2=this.scrollHeight[i+1]
					if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
						return i
					}
				}
				return 0
			},
			selectFoods(){
				let goodFood=[];
				for(let item of this.goods){
					for(let food of item.foods){
						if(food.count){
							goodFood.push(food)
						}
					}
				}
				return goodFood;
			}
		},
		created(){
			this.classMap=["decrease","discount","guarantee","invoice","special"],
			axios.get("./data.json").then((res)=>{
				// console.log(res.data.goods)
				this.goods=res.data.goods
				this.$nextTick(()=>{
					this._initScroll()
					this._height()
				})
			})
			this.$root.eventHub.$on('cart_add',(target)=>{
				this._drop(target)
			})
		},
		methods:{
			selectedFood(food,event){
				//参数的实现
				this.clickFood=food
				//组件的显示
				this.$refs.clickFoodWrapper.show()
			},
			_drop(target){
				//在父组件中调用子组件的方法，但是在子组件中无法调用父组件中的方法
				this.$refs.shopcart.drop(target)
			},
			selectMenu(index,event){
				if(!event._constructed){
					return
				}
				let foodList=this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
				let el=foodList[index]
				this.foodScroll.scrollToElement(el)
			},
			_initScroll(){
				this.menuScroll=new BScroll(this.$refs.menuWrapper,{click:true})//表示可以点击
				this.foodScroll=new BScroll(this.$refs.foodWrapper,{ 
					probeType:3,
				    click:true                                    
				})//表示实时监测高度
				this.foodScroll.on("scroll",(pos)=>{
					// console.log(pos)时时滚动的宽高（x,y）
					this.scrollY=Math.abs(Math.round(pos.y))
				})
				
			},
			_height(){
				//把每一项取出
				let foodList=this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
				// console.log(foodList)
				//计算每一项高度
				let height=0
				this.scrollHeight.push(height)
				for(let arr of foodList){
					height+=arr.clientHeight;
					this.scrollHeight.push(height)
				}
				// console.log(this.scrollHeight)
			}
		}
	}
</script>

<style lang="scss">
	@import "../common/style/mixin.scss";
	.goods{
		display: flex;
		position: absolute;
		top: 177px;
		bottom: 45px;
		overflow: hidden;
		width: 100%;
		.menu-wrapper{
			flex: 0 0 80px;
			width: 80px;
			background: #f3f5f7;
			.menu-item{
				display: table;
				width: 56px;
				height: 54px;
				padding: 0 12px;
				font-size:12px;
				line-height: 14px;
				font-weight: 200;
				&:last-child>.text::after{
					border: none;
				}
                &.current{
					color:rgb(240,20,20);
					font-size: 12px;
					line-height: 14px;
					background-color: white;
					.text{
						@include border-none
					}
				}
				.text{
					display: table-cell;
					vertical-align: middle;
					@include border-1px(rgba(7,17,27,0.1));
					.icon{
						display: inline-block;
						vertical-align: text-top;
						width: 12px;
						height: 12px;
						margin-right:4px;
						background-size:12px 12px;
						background-repeat: no-repeat;
						&.decrease{
							@include bg-image("../common/img/decrease_1")
						}
						&.discount{
							@include bg-image("../common/img/discount_1")
						}
						&.guarantee{
							@include bg-image("../common/img/guarantee_1")
						}
						&.invoice{
							@include bg-image("../common/img/invoice_1")
						}
						&.special{
							@include bg-image("../common/img/special_1")
						}
					}
				}
			}
			
		}
		.good-wrapper{
			flex: 1;
			.food-title{
				height: 26px;
				line-height:26px;
				padding-left:14px;
				border-left:2px solid #d9dde1;
				background:#f3f5f7;
				font-size:12px;
				font-weight: 200;
				color: rgb(147,153,159);
			}
			.food-item{
				display: flex;
				margin: 18px;
				padding-bottom:18px;
				@include border-1px(rgba(7,17,27,0.1));
                &:last-child{
				 @include border-none()
				}
				// &:last-child::after{
				// 	border: none;
				// }
				.icon{
					flex:0 0 57px;
					border-radius: 2px;
					margin-right:10px;
				}
				.content{
					flex: 1;
					.name{
						margin:2px 0 8px 0;
						font-size: 14px;
						font-weight: 700;
						line-height: 14px;
						color: rgb(7,17,27);
						white-space: nowrap;
					}
					.exta{
						line-height: 10px;
						font-size: 10px;
						color: rgb(147,153,159);
						.count{
							margin-right:12px;
						}
					}
					.description{
						@extend .exta;
						margin-bottom: 8px;
						line-height: 1.5em;
					}
					.price{
						font-weight: 700;
						line-height: 24px;
						.now{
							color: rgb(240,20,20);
							font-size: 14px;
							margin-right: 8px;
						}
						.oldPrice{
							color: rgb(147,153,159);
							font-size:10px;
							text-decoration: line-through;
						}
					}
				}
				.control-wrapper{
					position: absolute;
					right:0;
					bottom: 10px;
				}
			}
		}
	}
</style>
