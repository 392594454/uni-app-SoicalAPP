<template>
	<!-- 底部操作条 -->
	<view style="height: 100rpx;" class="fixed-bottom flex align-center border-top bg-white">
		<input @confirm="submit" type="text" v-model="content" style="padding: 5rpx ;" class=" flex-1 rounded bg-light ml-2"
		 placeholder="文明发言" />
		<view @click="submit" class="iconfont icon-fabu flex align-center justify-center font-lg animated" hover-class="jello text-main"
		 style="width: 100rpx;"></view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				content: ''
			}
		},
		methods:{
			//发送
			submit() {
				if (this.content === '') {
					return uni.showToast({
						title: '消息不能为空',
						icon: 'none'
					})
				}
				this.$emit('submit',this.content)
				//清空输入框
				this.content = ''
			},
		}
	}
</script>

<style>
</style>
