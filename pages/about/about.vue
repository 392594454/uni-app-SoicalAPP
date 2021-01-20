<template>
	<view>
		<view class="flex align-center justify-center flex-column pt-4 pb-3">
			<image class="rounded-circle" src="/static/common/nothing.png" mode="" style="height: 300rpx;width: 300rpx;"></image>
			<text>version 1.0.1</text>
		</view>
		<uni-list-item title="新版本检测"></uni-list-item>
		<uni-list-item title="社区用户协议"></uni-list-item>
		
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	export default {
		components:{
			uniListItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
