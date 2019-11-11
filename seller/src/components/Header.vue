<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64"/>
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					<span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
				</div>
				<div class="supports" v-if="seller.supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if="seller.supports" @click="detailShow(true)">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="detailShow(true)">
			<div class="bulletin-title"></div>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%"/>
		</div>
		<transition name="fade">
			<div class="detail" v-if="show">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="detail-title">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :score="seller.score" :size="48"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul class="supports" v-if="seller.supports">
							<li v-for="item in seller.supports" class="supports-item">
								<span class="icon" :class="classMap[item.type]"></span>
								<span class="text">{{item.description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="content">
							<span class="content-text">{{seller.bulletin}}</span>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="detailShow(false)">
					<i class="icon-close"></i>
				</div>
				
			</div>
		</transition>
	</div>
</template>

<script>
	import star from "../components/star.vue"
	export default{
		name:'HeaderUI',
		data(){
			return {
				classMap:[],
				show:false,
				
			}
		},
		created(){
			this.classMap=["decrease","discount","guarantee","invoice","special"]
		},
		props:{
			seller:{
				type:Object
			}
		},
		methods:{
			detailShow(flag){
				this.show=flag
			}
		},
		components:{
			star
		}
	}
</script>

<style lang="scss">
	@import "../common/style/mixin.scss";
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
	.header{
		position: relative;
		overflow: hidden;
		color: #fff;
		background-color:rgba(7,17,27,0.5);
		.content-wrapper{
			position: relative;
			padding: 24px 16px 18px 24px;
			.avatar{
				display: inline-block;
				vertical-align: top;
				img{
					border-radius: 2px;
				}
			}
			.content{
				display: inline-block;
				margin-left: 16px;
				font-size: 16;
				vertical-align: top;
			   .title{
				   margin: 2px 0 8px 0;
			   	 .brand{
			   	 	display: inline-block;
			   	 	width:30px;
			   	 	height: 18px;
			   	 	vertical-align: text-top;
			   	 	@include bg-image("../common/img/brand");
			   	 	background-size:30px 18px;
			   	 	background-repeat: no-repeat;
			   	 }
			   	 .name{
			   	 	vertical-align: text-top;
			   	 	margin-left: 6px;
			   	 	font-size: 16px;
			   	 	line-height: 18px;
			   	 	font-weight: bold;
			   	 }
			   }
				.description{
					font-size: 12px;
					line-height: 12px;
					margin-bottom: 10px;
				}
				.supports{
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
					.text{
						font-size: 10px;
						line-height: 12px;
						vertical-align: text-top;
					}
				}
			}
			.support-count{
				position: absolute;
				right: 12px;
				bottom: 18px;
				height: 24px;
				padding: 2px 8px;
				text-align: center;
				line-height: 24px;
				background-color: rgba(0,0,0,0.2);
				border-radius:14px;
				.count{
					font-size: 10px;
					vertical-align:top;
				}
				.icon-keyboard_arrow_right{
					line-height: 24px;
					margin-left: 2px;
					font-size: 14px;
				}
			}
			
		}
		.bulletin-wrapper{
			position: relative;
			height: 28px;
			line-height: 28px;
			padding: 0 12px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			background-color: rgba(0,0,0,0.2);
			.bulletin-title{
				width: 22px;
				height: 12px;
				display: inline-block;
				@include bg-image("../common/img/bulletin");
				background-size: 22px 12px;
				vertical-align: middle;
				background-repeat: no-repeat;
			}
			.bulletin-text{
				font-size: 10px;
				margin: 0 4px;
				font-weight: 200;
			}
			.icon-keyboard_arrow_right{
				position: absolute;
				top:11px;
				right: 5px;
				font-size: 10px;
			}
		}
		.background{
			position: absolute;
			width: 100%;
			height: 100%;
			
			top: 0;
			left: 0;
			z-index: -1;
			filter:blur(10px);
		}
		.detail{
			position: fixed;
			z-index: 100;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			overflow: auto;
			text-align: center;
			background-color:rgba(7,17,27,0.8);
			.detail-wrapper{
				min-height: 100%;
				min-width: 100%;
				.detail-main{
					margin-top: 64px;
					padding-bottom:64px;
				}
				.detail-title{
					font-size: 16px;
					font-weight: 700;
					line-height: 16px;
					margin-bottom:16px;
				}
				.star-wrapper{
					padding: 2px 0;
					text-align: center;
				}
				.title{
					margin: 28px auto 24px auto;
					display: flex;
					width: 80%;
					.line{
						position: relative;
						flex: 1;
						top: -7px;
						border-bottom: 1px solid rgba(255,255,255,0.2);
					}
					.text{
						margin: 0 12px;
						font-size:14px;
						font-weight: 700;
					}
				}
				.supports{
					width: 80%;
					margin: 0 auto;
					text-align: left;
					.supports-item{
						margin-bottom: 12px;
					}
					.icon{
						display: inline-block;
						width: 12px;
						height: 12px;
						margin: auto 6px auto 12px;
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
					.text{
						font-size: 12px;
						font-weight: 200;
						color: rgb(255,255,255);
					}
				}
				.content{
					width: 80%;
					margin: 0 auto;
					.content-text{
						display: inline-block;
						margin: 0 12px;
						font-size: 12px;
						line-height:24px;
						text-align: left;
					}
				}
			}
			.detail-close{
				position: relative;
				width: 32px;
				height: 32px;
				margin: -64px auto 0 auto;
				font-size:32px;
			}
		}
	}
</style>
