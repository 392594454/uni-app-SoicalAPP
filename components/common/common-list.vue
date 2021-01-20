<template>

	<!-- 列表样式 -->
	<view class="p-2 animated fast fadeIn">
		<!-- 头像按钮 、关注按钮 -->
		<view class="flex align-center justify-between">
			<view class="flex align-center">
				<!-- 头像 -->
				<image @click="openSpace" :src="item.userpic" class="rounded-circle mr-2" style="height:65rpx; width:65rpx;"
				 lazy-load></image>
				<!-- 昵称发表时间 -->
				<view>
					<view class="font" style="line-height: 1.5;">{{item.username}}</view>
					<text class="font-sm text-light-muted">{{item.newstime}}</text>
				</view>
			</view>
			<!-- 关注按钮 -->
			<view @click="follow" v-if="!item.isFollow">
				<view class="flex align-center justify-center rounded bg-main text-white animated faster" style="width: 90rpx; height: 50rpx;"
				 hover-class="jello">关注</view>
			</view>
		</view>
		<!-- 标题 -->
		<view @click="openDetail" class="font-md my-1">{{item.title}} </view>
		<!-- 帖子详情 -->
		<slot>
			<!-- 图片 -->
			<image @click="openDetail" v-if="item.titlepic" :src="item.titlepic" class="rounded w-100" style="height: 350rpx;"></image>
		</slot>
		<!-- 图标按钮 -->
		<view class="flex align-center">
			<!-- 点赞 -->
			<view @click="doSupport('support')" :class="item.support.type === 'support' ? 'support-active':''" class="flex align-center justify-center flex-1 animated faster"
			 hover-class="jello text-main">
				<text class="iconfont icon-dianzan2 mr-2"></text>
				<text>{{item.support.support_count > 0 ? item.support.support_count: '赞'}}</text>
			</view>
			<!-- 踩 -->
			<view @click="doSupport('unsupport')" :class="item.support.type === 'unsupport' ? 'text-main':''" class="flex align-center justify-center flex-1 animated faster"
			 hover-class="jello support-active">
				<text class="iconfont icon-cai mr-2"></text>
				<text>{{item.support.unsupport_count >0 ? item.support.unsupport_count:'踩'}}</text>
			</view>
			<!-- 评论 -->
			<view @click="doComment()" class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main">
				<text class="iconfont icon-pinglun2 mr-2"></text>
				<text>{{item.comment_count > 0 ? item.comment_count :'评论'}}</text>
			</view>
			<!-- 分享 -->
			<view @click="doShare()" class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main">
				<text class="iconfont icon-fenxiang mr-2"></text>
				<text>{{item.share_num > 0 ? item.share_num : '分享'}}</text>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			item: Object,
			index: {type:Number,default:-1},
			isdetail: {
				type: Boolean,
				default: false
			}
		},

		methods: {
			//打开个人空间
			openSpace() {
				uni.navigateTo({
					url:'/pages/user-space/user-space'
				})
			},
			//关注
			follow() {
				//通知父组件 this.index告诉父组件点击了那个
				this.$emit('follow', this.index)
			},
			//进入详情页
			openDetail() {
				//处于详情页
				if (this.isdetail) return
				uni.navigateTo({
					url: '../../pages/detail/detail?detail=' + JSON.stringify(this.item),

				});
			},
			//顶踩操作
			doSupport(type) {
				this.$emit('doSupport', {
					type,
					index: this.index
				})
			},
			//评论
			doComment() {
				if (this.isdetail) {
					this.openDetail()
				}
				this.$emit('doComment')
			},
			//分享
			doShare() {
				if (this.isdetail) {
					this.openDetail()
				}
				this.$emit('doShare')
			}

		}
	}
</script>
<style>
	.support-active {
		color: #FF4A6A;
	}
</style>
