<template>
	<view>
		<uni-list-item title="头像" @click="changeUserpic">
			<view slot='right' class="flex align-center">
				<image :src="userpic" style="height: 100rpx;width: 100rpx;" class="rounded-circle"></image>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="昵称">
			<view slot='right' class="flex align-center">
				<input class="uni-input text-right" type="text" v-model="username" />
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="性别" @click="changeSex">
			<view slot='right' class="flex align-center">
				<text>{{sexText}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>

		<picker mode="date" :value="birthday" @change="onDateChange">
			<uni-list-item title="生日">
				<view slot='right' class="flex align-center">
					<text>{{birthday}}</text>
					<text class="iconfont icon-bianji1 ml-2"></text>
				</view>
			</uni-list-item>
		</picker>
		<uni-list-item title="情感" @click='changeEmotion'>
			<view slot='right' class="flex align-center">
				<text>{{emotionText}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="职业" @click='changeJob'>
			<view slot='right' class="flex align-center">
				<text>{{job}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="家乡" @click="showCityPick">
			<view slot='right' class="flex align-center">
				<text>{{pickerText}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>



		<view class="py-2 px-3">
			<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary">完成</button>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onConfirm='onConfirm'>

		</mpvue-city-picker>


	</view>
</template>

<script>
	let sexArray = ['保密', '男', '女']
	const emotionArray = ['保密', '未婚', '已婚']
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	import mpvueCityPicker from '@/components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components: {
			uniListItem,
			mpvueCityPicker
		},
		data() {
			return {
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				pickerText:'',
				userpic: '/static/default.jpg',
				username: '昵称',
				sex: 0,
				emotion: 0,
				job: 'IT',
				birthday: '2018-02-01'
			}
		},
		computed: {
			sexText() {
				return sexArray[this.sex]
			},
			emotionText() {
				return emotionArray[this.emotion]
			}

		},
		// 监听返回
		onBackPress() {
		  if (this.$refs.mpvueCityPicker.showPicker) {
		  	this.$refs.mpvueCityPicker.pickerCancel();
		    return true;
		  }
		},
		// 监听页面卸载
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		},
		methods: {
			//修改头像
			changeUserpic() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						this.userpic = res.tempFilePaths[0]
					}
				})
			},
			//修改性别
			changeSex() {
				uni.showActionSheet({
					itemList: sexArray,
					success: (res) => {
						this.sex = res.tapIndex
					}
				})
			},
			//修改情感
			changeEmotion() {
				uni.showActionSheet({
					itemList: emotionArray,
					success: (res) => {
						this.emotion = res.tapIndex
					}
				})
			},
			changeJob() {
				let jobArray = ['IT', '教师', '其他']
				uni.showActionSheet({
					itemList: jobArray,
					success: (res) => {
						this.job = jobArray[res.tapIndex]
					}
				})
			},
			//修改生日
			onDateChange(e) {
				this.birthday = e.detail.value
			},
			//三级联动提交事件
			onConfirm(e) {
				this.pickerText = e.label
			},
			showCityPick(){
				this.$refs.mpvueCityPicker.show()
			}
		}
	}
</script>

<style>

</style>
