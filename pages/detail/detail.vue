<template>
	<view>
		<!-- 帖子详情页详细信息 -->
		<common-list :item="info" isdetail @doSupport='doSupport' @follow="follow" @doComment='doComment' @doShare="doShare">
			<view>{{info.content}}</view>
			<view>
				<image @click="preview(index)" class="w-100 " mode="widthFix" v-for="(item,index) in info.images" :key="index" :src="item.url"></image>
			</view>
		</common-list>
		<divider></divider>
		<view class="p-2 font-md font-weight-bold">
			最新评论
		</view>
		<view class="px-2">
			<view class="uni-comment-list">
				<view class="uni-comment-face">
					<image src="../../static/default.jpg" mode="widthFix"></image>
				</view>
				<view class="uni-comment-body">
					<view class="uni-comment-top">
						<text>小猫咪</text>
					</view>
					<view class="uni-comment-content">
						支持国产
					</view>
					<view class="uni-comment-date">
						<view>2天前</view>
					</view>
				</view>
			</view>
		</view>
		<more-share ref='share'></more-share>
		<!-- 占位 -->
		<view style="height: 100rpx;"></view>
		<bottom-input @submit='submit'></bottom-input>
	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue'
	import bottomInput from '@/components/common/bottom-input.vue'
	import moreShare from '@/components/common/more-share.vue'
	export default {
		data() {
			return {
				
				//当前帖子信息
				info: {
					username: "昵称",
					userpic: "/static/default.jpg",
					newstime: "2020-2-2",
					isFollow: false,
					title: "我是标题",
					titlepic: "/static/demo/datapic/11.jpg",
					support: {
						type: "support",
						support_count: 1,
						unsupport_count: 2
					},
					comment_count: 2,
					share_num: 2,
					content: '编程学院：uni-app仿商城类实战项目开发，uni-app第三季仿微信实战项目开发',
					images: [{
						url: '/static/demo/datapic/5.jpg'
					}, {
						url: '/static/demo/datapic/4.jpg'
					}]
				}
			}
		},
		components: {
			commonList,
			bottomInput,
			moreShare
		},
		computed: {
			imagesList() {
				return this.info.images.map(item => item.url)
			}
		},
		onLoad(e) {
			//初始化操作
			if (e.detail) {
				this.__init(JSON.parse(e.detail))
			}
		},
		onNavigationBarButtonTap() {
			this.$refs.share.open()
		},
		onBackPress() {
			this.$refs.share.close()
		},
		methods: {
			__init(data) {
				//修改标题
				uni.setNavigationBarTitle({
					title: data.title
				})
				//请求api
			},
			//点击评论
			doComment() {

			},
			doShare() {

			},
			//关注
			follow() {
				this.info.isFollow = !this.info.isFollow
				uni.showToast({
					title: '关注成功'
				});
			},
			doSupport(e) {
				//之前操作过
				if (this.info.support.type === e.type) {
					return uni.showToast({
						title: '你已经操作过了',
						icon: 'none'
					})
				}
				let msg = e.type === 'support' ? '赞' : '踩'
				//判断之前有没有操作过
				if (this.info.support.type === '') {
					this.info.support[e.type + '_count']++
				} else if (this.info.support.type === 'support' && e.type === 'unsupport') {
					//点赞-1
					this.info.support.support_count--;
					//踩+1
					this.info.support.unsupport_count++;
				} else if (this.info.support.type === 'unsupport' && e.type === 'support') {
					//点赞+1
					this.info.support.support_count++;
					//踩-1
					this.info.support.unsupport_count--;
				}
				this.info.support.type = e.type
				uni.showToast({
					title: msg
				})
			},
			//预览图片
			preview(index) {
				// 预览图片
				uni.previewImage({
					current: index,
					urls: this.imagesList

				});
			},
			//提交评论
			submit() {

			}
		}
	}
</script>

<style>

</style>
