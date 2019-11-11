<template>
	<div class="seller" ref="sellerWrapper">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star :size="36" :score="4.2" class="star"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				
				<ul class="remark">
					<li class="block">
						<h2 class="name">起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2 class="name">商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2 class="name">平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="contentBoard">
				<h1 class="title">公告与活动</h1>
				<span class="content-text">{{seller.bulletin}}</span>
				<ul class="supports" v-if="seller.supports">
					<li v-for="item in seller.supports" class="supports-item">
						<span class="icon" :class="classMap[item.type]"></span>
						<span class="text">{{item.description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			
			<div class="seller-list" >
				<h2 class="tilte">商家实景</h2>
				<div ref="listWrapper">
				<ul class="pic-wrapper" ref="picWrapper">
					<li v-for="item in seller.pics" class="pic-item">
						<img :src="item" width="120" height="90"/>
					</li>
				</ul>
				</div>
			</div>
			
			<split></split>
			<div class="sellerMessage">
				<h2 class="title">商家信息</h2>
				<ul>
					<li class="info-item" v-for="item in seller.infos">
						{{item}}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	import split from '@/components/split.vue'
	import star from '@/components/star.vue'
	export default{
		name:'seller',
		data (){
			return {
				classMap:[]
			}
		},
		props:{
			seller:{
				type:Object
			}
		},
		components:{
			star,
			split
		},
		created(){
			this.classMap=["decrease","discount","guarantee","invoice","special"]
		},
		mounted(){
			this.$nextTick(()=>{
				if(!this.scroll){
					this.scroll=new BScroll(this.$refs.sellerWrapper,{
						click:true
					})
				}else{
					this.scroll.refresh()
				}
			})
			
			if(this.seller.pics){
				let picWidth = 120
				let margin = 6
				let width = (picWidth+margin)*this.seller.pics.length-margin
				this.$refs.picWrapper.style.width=width+'px'
				this.$nextTick(()=>{
					this.picScroll=new BScroll(this.$refs.listWrapper,{
						scrollX:true,
						eventPassthrough:'vertical'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../common/style/mixin.scss";
	
	.seller{
		position: absolute;
		width: 100%;
		top:176px;
		left: 0;
		bottom: 0;
		overflow: hidden;
		.overview{
			position: relative;
			padding: 18px;
			.title{
				font-size: 14px;
				line-height: 14px;
				color: rgb(7,17,27);
				font-weight: 700;
				margin-bottom: 8px;
			}
			.desc{
				padding-bottom: 18px;
				@include border-1px(rgba(7,17,27,0.1));
				.star{
					display: inline-block;
					margin-right: 8px;
					vertical-align: top;
				}
				.text{
					display: inline-block;
					margin-right: 12px;
					vertical-align: top;
					font-size: 10px;
					font-weight: 200;
					color: rgb(77,85,93);
					line-height: 18px;
				}
			}
			.remark{
				display: flex;
				justify-content:space-around;
				padding: 18px 0;
				.block{
					width: 100%;
					text-align: center;
					border-right: 1px solid rgba(7,17,27,0.1);
					&:last-child{
						border: none;
					}
					.name{
						font-size: 10px;
						color: rgb(147,153,159);
						line-height: 10px;
						margin-bottom: 4px;
					}
					.content{
						font-size: 10px;
						font-weight: 200;
						color: rgb(7,17,27);
						line-height: 24px;
						.stress{
							font-size: 24px;
						}
					}
				}
			}
		}
		.contentBoard{
			padding: 18px 18px 0 18px;
			.title{
				font-size: 14px;
				font-weight: 700;
				color: rgb(7,17,27);
				line-height:14px;
			}
			.content-text{
				display: inline-block;
				font-size: 12px;
				font-weight: 200;
				color: rgb(240,20,20);
				line-height: 24px;
				padding: 8px 12px 16px 12px;
				@include border-1px(rgba(7,17,27,0.1));
			}
			.supports{
				.supports-item{
					padding: 16px 12px;
					@include border-1px(rgba(7,17,27,0.1));
					&:last-child{
						@include border-none()
					}
				}
					.icon{
						display: inline-block;
						vertical-align: text-top;
						width: 16px;
						height: 16px;
						margin-right:6px;
						background-size:16px 16px;
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
					.text{
						font-size: 12px;
						line-height: 16px;
						color: rgb(7,17,27);
						font-weight: 200;
						vertical-align: text-top;
					}
					
				}
		}
		.seller-list{
			padding: 18px;
			.tilte{
				margin-bottom:12px;
				font-size: 14px;
				font-weight: 700;
				color: rgb(7,17,27);
				line-height:14px;
			}
			.pic-wrapper{
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
	              .pic-item{
					  display: inline-block;
					  margin-right: 6px;
					  width: 120px;
					  height: 90px;
					  &:last-child{
						  margin: 0;
					  }
				  }
			}
		}
		.sellerMessage{
			padding: 18px 18px 0 18px;
			.title{
				padding-bottom: 12px;
				font-size: 14px;
				font-weight: 700;
				color: rgb(7,17,27);
				line-height:14px;
				@include border-1px(rgba(7,17,27,0.1));
			}
			.info-item{
				padding: 16px 12px;
				font-size: 12px;
				font-weight: 200;
				color: rgb(7,17,27);
				line-height: 16px;
				@include border-1px(rgba(7,17,27,0.1));
				&:last-child{
					@include border-none()
				}
			}
		}
	}	
</style>
