<template>
	<!-- 列表样式 -->
	<view class="p-2 flex align-center border-bottom border-light-secondary" hover-class="bg-light">
		<image style="width: 100rpx; height: 100rpx;" class="rounded mr-2" :src="item.avatar"></image>
		<view class="flex flex-column flex-1">
			<text class="font-md text-dark">{{item.username}}</text>
			<view class="">
				<uni-badge v-if="item.sex > 0" :text="item.age" :type="item.sex === 1 ?'error':'primary'" size="small">
					<text class="iconfont icon-nv text-white font-sm " 
					:class="item.sex === 1 ? 'icon-nv':'icon-nan'"
					style="margin-right: 5rpx;"></text>
				</uni-badge>
			</view>
	
		</view>
		<view class="uni-icon uni-icon-checkbox-filled text-light-muted" :class="item.isFollow ? 'text-light-muted':'text-main'"></view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue'
	
	export default{
		props:{item:Object,index:Number},
		components:{
			uniBadge
		}
	}
</script>

<style>
</style>
