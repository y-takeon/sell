<template>
	<div class="ShopCart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper" @click="toggleShow">
					<div class="logo" :class="{light:totalCount>0}">
						<i class="icon-shopping_cart" :class="{light:totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">
					     {{totalCount}}
					</div>
				</div>
				<div class="price" :class="{light:totalPrice>0}">
					￥{{totalPrice}}
				</div>
				<div class="desc">
					另需配送费￥{{deliveryPrice}}元
				</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">
					{{priceDesc}}
				</div>
			</div>
		</div>
	   <transition
	       name="decrease-classes-transition"
	       enter-active-class="animated fadeInUp"
	       leave-active-class="animated fadeOutDown"
	     >
		<div class="cart-list" v-show="listShow">
			<div class="cart-header">
				<h1 class="title">购物车</h1>
				<span class="empty" @click="cleanCart">清空</span>
			</div>
			<div class="list-content" ref="listWrapper">
				<ul>
					<li  class="food" v-for="food in selectFoods">
						<span class="name">{{food.name}}</span>
						<span class="price">￥{{food.price}}</span>
						<div class="cart-control">
							<cartcontrol :food="food"></cartcontrol>
						</div>
					</li>
				</ul>
			</div>
			<div class="shade"></div>
		</div>
		</transition>
		
		<div class="ball-controller">
			<transition 
			name="drop"
			v-on:before-enter="beforeEnter"
			v-on:enter="enter"
			v-on:after-enter="afterEnter"
			v-for="(litterBall,indexBall) in balls" :key="indexBall"
			>
			<div class="ball" v-show="litterBall.bf">
				<div class="inner" :class="indexBall"></div>
			</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	import cartcontrol from "./CartControl.vue"
	import Velocity from "velocity-animate"
	export default{
		name:'ShopCart',
		data(){
			return {
				listShow:false,
				balls:[
					{
						bf:false
					},
					{
						bf:false
					},
					{
						bf:false
					},
					{
						bf:false
					},
					{
						bf:false
					}
				],
				dropBall:[]
			}
		},
		components:{
			cartcontrol
		},
		created(){
			this.$nextTick(()=>{
				this.initList()
			})
		},
		methods:{
			toggleShow(){
				if(this.totalCount>0){
					this.listShow=!this.listShow
				}
			},
			initList(){
				this.ListScroll=new BScroll(this.$refs.listWrapper,{ 
					// probeType:3,
				    click:true                                    
				})
			},
			cleanCart(){
				if(this.selectFoods){
					for(let item of this.selectFoods){
						item.count=0
					}
				}
				this.listShow=false
			},
			drop(el){
				//遍历所有小球
				for(let ball of this.balls){
					if(!ball.bf){
						ball.bf=true
						ball.el=el
						this.dropBall.push(ball)
						return
					}
				}
			},
			 // 进入中
			// --------
			beforeEnter(el) {
				//获取下降的小球的个数
			   let count=this.dropBall.length-1
			   //获取最新的ball.bf为true的小球
			   let ball=this.dropBall[count]
			   //console.log(ball)
			   //获取元素相对于窗口的位置
			   let rect=ball.el.getBoundingClientRect()
			   //x的位置
			  /* let x=rect.left-18
			   //y的位置,值应为负数  向下运动
			   let y=(window.innerHeight-rect.top-32)*/
			   let x = rect.left - 18 ; //点击元素的左边距离 - 下面购物车左边的距离，就是小球要运动的X轴距离
			    let y =-(window.innerHeight - rect.top -32)
			   
			  el.style.opacity = 1;
			    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
			    el.style.transform = `translate3d(0,${y}px,0)`; //外层做纵轴运动
			
			    //内层做横轴运动
			    let inner = el.getElementsByClassName('inner')[0];
			    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
			    inner.style.transform = `translate3d(${x}px,0,0)`;
			   
			},
			enter(el, done) {
			    var _this=this 
			    var hh=el.offsetHeight
			    _this.$nextTick(()=>{
			    	el.style.opacity=0
			    	let inner=el.getElementsByClassName('inner')[0]
			    	Velocity(el,{translate3d:"translate3d(0,0,0)"},{duration:400})
			    	Velocity(inner,{translate3d:"translate3d(0,0,0)"},{duration:1000,complete:function(){
			    		  done()
			    	}})
					
			    })
			
			},
			afterEnter(el) {
			   let ball = this.dropBall.shift();
			      if(ball){
			        ball.bf = false;
			        el.style.display = "none";
			      }
			}
		},
		props:{
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			},
			selectFoods:{
				type:Array,
				default(){
					return [
						
					]
				}
			}
		},
		computed:{
			//计算总价
			totalPrice(){
				let total=0;
				for(let food of this.selectFoods){
					total+=food.price*food.count
				}
				return total;
			},
			//计算总数
			totalCount(){
				let count=0;
				for(let food of this.selectFoods){
					count+=food.count
				}
				return count;
			},
			//定义一个描述信息
			priceDesc(){
				if(this.totalPrice==0){
					return `￥${this.minPrice}元起送`
				}else if(this.totalPrice<this.minPrice){
					let deff=this.minPrice-this.totalPrice;
					return `还差￥${deff}起送 `
				}else{
					return `去结算`
				}
			},
			//定义显示的class
			payClass(){
				if(this.totalPrice==0){
					return ``
				}
				else if(this.totalPrice<this.minPrice){
					return `not-enough`
				}else{
					return `enough`
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../common/style/mixin.scss";
	.ShopCart{
		position: fixed;
		bottom: 0;
		left: 0;
		height: 50px;
		width: 100%;
		z-index: 50;
		.content{
			display: flex;
			// z-index: 50;
			height: 100%;
			background: #141d27;
			.content-left{
				flex: 1;
				.logo-wrapper{
					position: relative;
					display: inline-block;
					z-index: 50;
					top: -10px;
					width: 44px;
					height: 44px;
					padding: 6px;
					margin: 0 12px;
					border-radius: 50%;
					background: #141d27;
					.logo{
						width: 100%;
						height: 100%;
						background: #2b343c;
						border-radius: 50%;
						text-align: center;
						vertical-align: middel;
						.icon-shopping_cart{
							display: inline-block;
							font-size: 24px;
							color: rgba(255,255,255,0.4);
							line-height: 24px;
							margin-top:10px;
						}
						.light{
							color: #fff;
						}
					}
					.num{
						position: absolute;
						right: 0;
						top:0;
						background:rgb(240,20,20);
						width: 24px;
						height:16px;
						line-height: 16px;
						border-radius: 16px;
						color: #fff;
						font-size: 9px;
						font-weight: 700;
						text-align: center;
						box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4);
					}
					.light{
						background: rgb(0,120,220);
				    }
			}
				.price{
					display: inline-block;
					vertical-align: top;
					margin-top:12px;
					padding-right:12px;
					border-right:1px solid rgba(255,255,255,0.1);
					box-sizing: border-box;
					font-size:16px;
					color:rgba(255,255,255,0.4);
					line-height: 24px;
					font-size:700;
					&.light{
						color: #fff;
					}
				}
				.desc{
					display: inline-block;
					margin-left:12px;
					line-height: 24px;
					font-size:10px;
					font-weight: 700;
					color:rgba(255,255,255,0.4);
					vertical-align: top;
					margin-top:12px;
					
				}
			}	
			.content-right{
				flex: 0 0 105px;
				width: 105px;
				.pay{
					height: 50px;
					line-height: 50px;
					font-size:14px;
					font-weight: 700;
					text-align: center;
					color: rgba(255,255,255,0.4);
					background: #2b343c;
				}
				.not-enough{
					color: rgba(255,255,255,0.4);
					background: rgb(240,20,20);
					
				}
				.enough{
					color: #fff;
					background: #11c226;
					// background: #2b343c;
				}
			}
		}
		.cart-list{
			position: absolute;
			z-index: -1;
			left:0;
			bottom: 50px;
			width: 100%;
			.cart-header{
				height: 40px;
				padding: 0 18px;
				background: #f3f5f7;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				.title{
					display: inline-block;
					font-size: 14px;
					font-weight: 200;
					line-height: 40px;
					color: rgb(7,17,27)
				}
				.empty{
					float: right;
					font-size: 14px;
					line-height: 40px;
					color: rgb(0,160,220)
				}
			}
			.list-content{
				max-height: 217px;
				padding: 0 18px;
				overflow: hidden;
				background: #fff;
				.food{
					position: relative;
					padding: 12px 0;
					@include border-1px(rgba(7,17,27,0.1));
					.name{
						font-size: 14px;
						line-height: 24px;
						color: rgb(7,17,27);
						font-weight: 700;
					}
					.price{
						position: absolute;
						right: 90px;
						bottom: 12px;
						font-size: 14px;
						font-weight: 700;
						color: rgb(240,20,20);
					}
					.cart-control{
						position: absolute;
						right: 0;
						bottom: 0;
					}
				}
			}
		}
		.shade{
			position: fixed;
			top: 0;
			left: 0;
			z-index: -1;
			width: 100%;
			height: 100%;
			background: rgba(7,17,27,0.8);
		}
		.ball-controller{
			.ball{
				position: fixed;
				left:32px;
				bottom:22px;
				z-index: 1000;
				transition: all .4s cubic-bezier(.49,-0.29,.75,.41);
				transform: translate3d(0,0,0);
			}
			.inner{
				width: 16px;
				height: 16px;
				border-radius: 50%;
				background: rgb(0,160,220);
				transform: translate3d(0,0,0);
				transition: all .5s linear;
			}
		}
		
	}
</style>
