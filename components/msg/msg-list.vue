<template>
	<view>
		<!-- 消息列表 -->

		<view @click="open" class="flex align-center p-2 border-bottom border-light-secondary" hover-class="bg-light">
			<image :src="item.avatar" style="height: 80rpx; width: 80rpx;" class="rounded-circle mr-2"></image>
			<view class="flex flex-column  flex-1">
				<view class="flex align-center justify-between">
					<text class="font-md">{{item.username}}</text>
					<text class="font-sm text-secondary">{{item.update_time | formatTime}}</text>
				</view>
				<view class="flex align-center justify-between">
					<text class="text-secondary text-ellipsis" style="max-width: 500rpx;">{{item.data}}</text>
					<uni-badge type="error" :text="item.noread"></uni-badge>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue'

	import $T from '@/common/time.js'
	export default {
		props: {
			item: Object,
			index: Number
		},
		components: {
			uniBadge
		},
		//过滤器
		filters: {
			formatTime(value) {
				return $T.gettime(value)
			}
		},
		methods: {
			//打开聊天页
			open() {
				uni.navigateTo({
					url: '../../pages/user-chat/user-chat',
					
				});
			}
		}
	}
</script>

<style>
</style>
