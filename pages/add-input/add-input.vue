<template>
	<view>
		<!-- 自定义导航 -->
		<uni-nav-bar left-icon="back" @click-left="goBack" statusBar :border="false">
			<view class="flex align-center justify-center w-100">
				所有人可见
				<text class="iconfont icon-shezhi pl-1"></text>
			</view>
		</uni-nav-bar>
		<!-- 文本域 -->
		<textarea v-model="content" placeholder="说一句话吧" class="uni-textarea px-2" />
		<!-- 多图上传 -->
		<upload-image :show="show" ref="uploadImage" :list="imageList" @change='changeImage'></upload-image>
		<!-- 底部操作条 -->
		<view class="fixed-bottom bg-white flex align-center" style="height: 85rpx;">
			<view class="iconfont icon-caidan footer-btn animated " hover-class="jello"></view>
			<view class="iconfont icon-huati footer-btn animated " hover-class="jello"></view>
			<view @click="iconClickEvent('uploadImage')" class="iconfont icon-tupian footer-btn animated " hover-class="jello"></view>
			
			<view class="bg-main text-white ml-auto flex justify-center align-center rounded mr-2 animated " hover-class="jello" style="width: 140rpx; height: 60rpx;">发送</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import uploadImage  from '@/components/common/upload-image.vue'
	export default {
		data() {
			return {
				content:'',
				imageList:[],
				showBack:false //是否已经弹出提示框
			}
		},
		components:{
			uniNavBar,
			uploadImage
		},
		computed:{
			show(){
				return this.imageList.length > 0
			}
		},
		//监听返回
		onBackPress() {
			if((this.content !== '' || this.imageList.length > 0) && !this.showBack){
				uni.showModal({
					content: '是否保存为草稿？',
					showCancel: true,
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						//点击确认
						if(res.confirm){
							this.store()
						}else{//点击取消
							uni.removeStorage({
								key:'add-input'
							})
						}
						//手动执行返回
						uni.navigateBack({
							delta: 1
						});
					}
					
				});
				this.showBack = true
				return true
			}
		},
		//页面加载时
		onLoad() {
			uni.getStorage({
				key:'add-input',
				success:(res) => {
					// console.log(res.data)
					// console.log(JSON.parse(res.data))ss
					if(res.data){
						let result = JSON.parse(res.data)
						// console.log(result)
						this.content = result.content
						//console.log(this.content)
						//console.log(res.data.content)
						this.imageList = result.imageList
					}
				}
			})
		},
		methods: {
			//底部图标点击事件
			iconClickEvent(e){
				switch(e){
					case 'uploadImage': 
					this.$refs.uploadImage.chooseImage()
					break
				}
			},
			//返回上一步
			goBack(){
				uni.navigateBack({
					data:1
				})
			},
			//选中图片
			changeImage(e){
				this.imageList = e
			},
			//保存草稿
			store(){
				//保存到本地
				uni.setStorage({
					key:'add-input',
					data:JSON.stringify({
						content:this.content,
						imageList:this.imageList
					})
				})
			}
		}
	}
</script>

<style>
.footer-btn{
	width: 86rpx;
	height: 86rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 50rpx;
}
</style>
