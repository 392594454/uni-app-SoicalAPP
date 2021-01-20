<template>
	<view>
		<input class="uni-input" type="text" v-model="email" placeholder="请输入绑定邮箱" />
		<input class="uni-input" type="text" v-model="password" placeholder="请输入邮箱密码" />
		<view class="py-2 px-3">
			<button @click="submit" :disabled="disabled" :class="disabled ? 'bg-main-disabled':''" class="bg-main text-white"
			 style="border-radius: 50rpx;border: 0;" type="primary">设置</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				password: ''
			}
		},
		computed: {
			disabled() {
				return this.email === '' || this.password === ''
			}
		},
		methods: {
			check() {
				let rule = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if (!rule.test(this.email)) {
					uni.showToast({
						title: "邮箱格式不正确",
						icon: "none"
					})
					return false;
				}
				return true
			},
			submit() {
				if (!this.check()) {
					return
				}
			}
		}
	}
</script>

<style>

</style>
