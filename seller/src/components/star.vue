<template>
	<div class="star" :class="starType">
		<span v-for="item in itemClass" :class="item" class="star-item"></span>
	</div>
</template>

<script>
	const LENGTH=5
	const CLS_ON='on'
	const CLS_HALF='half'
	const CLS_OFF='off'
	export default{
		name:'star',
		props:{
			score:{
				type:Number
			},
			size:{
				type:Number
			}
		},
		computed:{
			starType(){
				return 'star'+this.size
			},
			itemClass(){
				let result=[]
				//获取评分
				let score=Math.floor(this.score*2)/2
				//判断是否有半星
				let hasHALF=score%1==0
				//全部是星星
				let hasON=Math.floor(score)
				//全星星的
				for(let i=0;i<hasON;i++){
					result.push(CLS_ON)
				}
				if(!hasHALF){
					result.push(CLS_HALF)
				}
				while(result.length<LENGTH){
					result.push(CLS_OFF)
				}
				return result;
			}
		}
	}
</script>

<style lang="scss">
	@import "../common/style/mixin.scss";
	.star{
		font-size: 0;
		.star-item{
			display: inline-block;
			background-repeat:no-repeat;
		}
		&.star48{
			.star-item{
				width: 20px;
				height: 20px;
				margin-right: 22px;
				background-size: 22px 22px;
				&:last-child{
					margin-right:0;
				}
				&.on{
					@include bg-image("../common/img/star48_on")
				}
				&.half{
					@include bg-image("../common/img/star48_half")
				}
				&.off{
					@include bg-image("../common/img/star48_off")
				}
			}
		}
		&.star36{
			.star-item{
				width: 15px;
				height: 15px;
				margin-right: 6px;
				background-size: 15px 15px;
				&:last-child{
					margin-right:0;
				}
				&.on{
					@include bg-image("../common/img/star36_on")
				}
				&.half{
					@include bg-image("../common/img/star36_half")
				}
				&.off{
					@include bg-image("../common/img/star36_off")
				}
			}
		}
		&.star24{
			.star-item{
				width: 10px;
				height: 10px;
				margin-right: 3px;
				background-size: 10px 10px;
				&:last-child{
					margin-right:0;
				}
				&.on{
					@include bg-image("../common/img/star24_on")
				}
				&.half{
					@include bg-image("../common/img/star24_half")
				}
				&.off{
					@include bg-image("../common/img/star24_off")
				}
			}
		}
	}
</style>
