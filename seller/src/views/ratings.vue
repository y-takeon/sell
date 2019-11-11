<template>
	<div class="ratings" ref="ratingsWrapper">
		<div class="rating-wrapper">
			<div class="rating-header">
				<div class="header-left">
					<h2 class="score">{{seller.score}}</h2>
					<div class="title">
						综合评分
					</div>
					<div class="rating">
						高于周边商家{{seller.rankRate}}%
					</div>
				</div>
				<div class="header-right">
					<div class="score-wrapper">
						<span class="title"> 商品评分</span>
						<star class="star" :score="seller.foodScore" :size="36"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="server-wrapper">
						<span class="title">服务态度</span>
						<star class="star" :score="seller.serviceScore" :size="36"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="time-wrapper">
						<span class="title">送达时间</span>
						<span class="text">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<div class="rating-content">
				<ratingSelect class="rating-select" :ratings="ratings"
				:selectType="selectType" :onlyContent="onlyContent"></ratingSelect>
				
				<div class="everyuser">
					<ul>
						<li class="ratinguser" v-for="rating in ratings" v-if="needShow(rating.rateType,rating.text)">
							<div class="avatar">
								<img :src="rating.avatar" width="28"/>
							</div>
							<div class="content">
								<h1 class="name">{{rating.username}}</h1>
								<div class="star-wrapper">
									<star :score="rating.score" :size="24" class="star"></star>
									<span class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>
								</div>
								<div class="text">{{rating.text}}</div>
								<div class="recommend">
									<span :class="rating.rateType===0?'icon-thumb_up':'icon-thumb_down'"></span>
									<span class="item" v-for="item in rating.recommend">
										{{item}}
									</span>
								</div>
								<div class="time">{{rating.rateTime | dateFormat}}</div>
							</div>
						</li>
					</ul>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	const POSITIVE=0;//推荐
	const NEGATIVE=1;//吐槽
	const ALL=2;//全部
	import BScroll from "better-scroll"
	import axios from "axios"
	import star from "../components/star.vue"
	import split from "../components/split.vue"
	import ratingSelect from "../components/ratingSelect.vue"
	import { formatDate } from "@/common/js/data.js"
	export default{
		name:'ratings',
		data (){
			return {
				ratings:[],
				selectType:ALL,
				onlyContent:false
			}
		},
		props:{
			seller:{
				type:Object
			}
		},
		components:{
			star,
			split,
			ratingSelect
		},
		created(){
			axios.get("./data.json").then((res)=>{
				this.ratings=res.data.ratings
				this.$nextTick(()=>{
					this.ratingScroll=new BScroll(this.$refs.ratingsWrapper,{
						click:true
					})
					
				})
			}),
			//接受子组件派发的事件
			this.$root.eventHub.$on('selectType',(type)=>{
				this.ratingSelectType(type)
			})
			this.$root.eventHub.$on('selectContent',(content)=>{
				this.contentToggle(content)
			})
		},
		filters:{
			dateFormat (time){
				//获取当前的时间
				var date = new Date(time)
				return formatDate(date,"yyyy-MM-dd")
			}
		},
		methods:{
			needShow(type, text){
				if(this.onlyContent&&!text){
					return false
				}
				if(this.selectType===ALL){
					return true
				}else{
					return this.selectType===type
				}
			},
			ratingSelectType(type){
				this.selectType=type
			},
			contentToggle(content){
				this.onlyContent=content
			}
		}
		
	}
</script>

<style lang="scss">
	@import "../common/style/mixin.scss";
	.ratings{
		position: absolute;
		top:176px;
		left: 0;
		bottom: 0;
		overflow: hidden;
		.rating-header{
			display: flex;
			margin: 18px 0;
			padding: 6px 0;
			.header-left{
				flex: 0 0 137px;
				width: 137px;
				@media only screen and(max-width:320px){
					flex: 0 0 120px;
					width: 120
				}
				border-right:1px solid rgba(7,17,27,0.1);
				text-align: center;
				.score{
					font-size: 24px;
					line-height: 28px;
					color: rgb(255,153,0);
				}
				.title{
					font-size: 12px;
					line-height: 12px;
					font-weight: 700;
					color:rgb(7,17,27);
					margin: 6px 0 8px 0;
				}
				.rating{
					font-size: 10px;
					line-height: 10px;
					font-weight: 200;
					color: rgba(7,17,27,0.7);
				}
			}
			.header-right{
				flex: 1;
				@media only screen and(max-width:320px){
					margin: 0 0 0 6px;
				}
				padding:6px 0;
				margin: 0 24px;
				font-size:10px;
				.server-wrapper{
					margin: 8px 0;
				}
				.title{
					display: inline-block;
					font-size: 12px;
					color: rgb(7,17,27);
					line-height:18px;
					vertical-align: top;
					margin-right: 12px;
					@media only screen and(max-width:320px){
						margin-right:6px;
					}
				}
				.star{
					display: inline-block;
					vertical-align: top;
				}
				.score{
					font-size:12px;
					line-height:18px;
					color: rgb(255,153,0);
					margin-left: 12px;
					@media only screen and(max-width:320px){
						margin-left: 6px;
					}
				}
				.text{
					font-size: 12px;
					line-height: 18px;
					color: rgb(147,153,159);
				}
			}
		}
		.rating-content{
			.rating-select{
				margin-top:18px;
			}
			.everyuser{
				position: relative;
				.ratinguser{
					display: flex;
					margin: 18px;
					padding-bottom: 18px;
					@include border-1px(rgba(7,17,27,0.1));
					&:last-child{
						@include border-none()
					}
					.avatar{
				        flex: 0 0 28px;
						width: 28px;
						margin-right:12px;
						img{
							border-radius: 50%;
						}
					}
					.content{
						flex: 1;
						.name{
							font-size: 10px;
							line-height: 12px;
							color: rgb(7,17,27);
							margin-bottom:4px;
						}
						.star-wrapper{
							font-size:0;
							margin-bottom: 6px;
							.star{
								display: inline-block;
								vertical-align: top;
								margin-right: 6px;
							}
							.deliveryTime{
								font-size: 10px;
								line-height: 12px;
								font-weight: 200;
								color: rgb(147,153,159);
							}
						}
						.text{
							font-size: 12px;
							line-height: 18px;
							margin-bottom:8px;
							color: rgb(7,17,27);
						}
						.recommend{
							line-height: 16px;
							.icon-thumb_up,.item,.icon-thumb_down{
								display: inline-block;
								margin: 0 8px 4px 0;
								line-height: 16px;
							}
							.icon-thumb_up{
								font-size: 12px;
								color: rgb(0,160,220);
							}
							.icon-thumb_down{
								font-size: 12px;
								color: rgb(183,187,191);
							}	
							.item{
								font-size: 9px;
								padding: 0 6px;
								margin-right:8px;
								color: rgb(147,153,159);
								border: 1px solid rgba(7,17,27,0.1);
								border-radius: 2px;
								background-color:rgb(255,255,255);
							}
						}
						.time{
							position: absolute;
							right: 0;
							top: 0;
							font-size: 10px;
							line-height: 12px;
							font-weight: 200;
							color: rgb(147,153,159);
						}
					}
				}
			}
		}
	}
</style>
