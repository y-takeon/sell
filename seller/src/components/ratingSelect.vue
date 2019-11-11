<template>
	<div class="ratingSelect">
		<div class="rating-type">
			<span class="block positive"
			:class="{active:mySelectType===2}" @click="select(2)">{{desc.all}}
			<span class="count">{{ratings.length}}</span>
			</span>
			<span class="block positive"
			:class="{active:mySelectType===0}" @click="select(0)">{{desc.positive}}
			<span class="count">{{positive.length}}</span>
			</span>
			<span class="block negative"
			:class="{active:mySelectType===1}" @click="select(1)">{{desc.negative}}
			<span class="count">{{negative.length}}</span>
			</span>
			
		</div>
		<div class="switch" @click="toggleSwitch()"
		:class="{on:myonlyContent}">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	//定义三个常量
	const POSITIVE=0;//推荐
	const NEGATIVE=1;//吐槽
	const ALL=2;//全部
	export default{
		name:'ratingSelect',
		data(){
			return {
				mySelectType:this.selectType,
				myonlyContent:this.onlyContent
			}
		},
		props:{
			ratings:{
				type:Array,
				default(){
					return []
				}
			},
			selectType:{
				type:Number,
				default: ALL
			},
			onlyContent:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default () {
					return {
						all:"全部",
						positive:"满意",
						negative:"不满意"
					}
				}
			}
		},
		methods:{
			select(type){
				this.mySelectType=type
				//派发事件
				this.$root.eventHub.$emit('selectType',type)
			},
			toggleSwitch(){
				this.myonlyContent=!this.myonlyContent
				//派发事件
				this.$root.eventHub.$emit('selectContent',this.myonlyContent)
			}
		},
		computed:{
			positive(){
				
				return this.ratings.filter((rating)=>{
						return rating.rateType===POSITIVE
					})
				
			},
			negative(){
				
				return	this.ratings.filter((rating)=>{
						return rating.rateType===NEGATIVE
					})
				
			}
		}
	}
</script>

<style lang="scss">
	@import "../common/style/mixin.scss";
	.ratingSelect{
		padding: 0 18px;
		font-size: 0;
		border-bottom: 1px solid rgb(7,17,27,0.2);
		.rating-type{
             @include border-1px(rgba(7,17,27,0.1));
			 padding-bottom:18px;
			.block{
				display: inline-block;
				margin-right: 8px;
				padding: 8px 12px;
				line-height: 16px;
				font-size:12px;
				color: rgb(77,85,93);
				background: rgb(0,160,220);
				.count{
					font-size:8px;
					margin-left: 2px;
				}
				&.active{
					color: #fff;
				}
				&.positive{
					background: rgba(0,160,220,0.2);
					&.active{
						background: rgb(0,160,220);
					}
				}
				&.negative{
					background: rgba(77,85,93,0.2);
					&.active{
						background: rgb(77,85,93);
					}
				}
			}
		}
		.switch{
			padding: 12px 0;
			color: rgb(147,153,159);
			&.on{
				.icon-check_circle{
					color: green;
				}
			}
			.icon-check_circle{
				display: inline-block;
				vertical-align: top;
				font-size:24px;
				line-height: 24px;
			}
			.text{
				display: inline-block;
				vertical-align: top;
				font-size:12px;
				line-height:12px;
				margin: 6px 0 0 4px;
			}
			
		}
	}
</style>
