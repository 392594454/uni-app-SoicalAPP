<template>
	<view>
		<view class="position-relative">
			<image style="height: 300rpx;" class="w-100 filter" :src="info.cover" mode="aspectFill"></image>
		</view>
		<view class="position-relative bg-white px-2 pb-2" style="z-index: 10;">
			<view class="flex">
				<image class="rounded mr-2" style="margin-top: -75rpx; height: 150rpx; width: 150rpx;" src="../../static/demo/topicpic/1.jpeg"></image>
				<text class="font-md">#{{info.title}}#</text>
			</view>
			<view class="flex align-center font text-secondary mt-1">
				<text class="mr-2">动态:{{info.news_count}}</text>
				<text>今日:{{info.today_count}}</text>
			</view>
			<view class="font text-secondary">{{info.desc}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['info']
	}
</script>

<style>
	.filter {
		filter: blur(10px);
	}
</style>
