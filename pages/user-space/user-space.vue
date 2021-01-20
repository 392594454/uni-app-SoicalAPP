<template>
	<view>

		<!-- 头部 -->
		<view class="flex align-center p-3 border-bottom border-light-secondary">
			<image src="../../static/default.jpg" style="width: 180rpx; height: 180rpx;" class="rounded-circle"></image>
			<view class="pl-3 flex flex-column flex-1">
				<view class="flex align-center">
					<view class="flex-1 flex flex-column align-center justify-center">
						<text class="font-lg font-weight-bold">1</text>
						<text class="text-muted">获赞</text>
					</view>
					<view class="flex-1 flex flex-column align-center justify-center">
						<text class="font-lg font-weight-bold">1</text>
						<text class="text-muted">关注</text>
					</view>
					<view class="flex-1 flex flex-column align-center justify-center">
						<text class="font-lg font-weight-bold">1</text>
						<text class="text-muted">粉丝</text>
					</view>
				</view>
				<view class="flex align-center justify-center">
					<button type="primary" size="mini" class="bg-main w-100" style="width: 400rpx;">关注</button>
				</view>
			</view>
		</view>

		<view class="flex align-center " style="height: 100rpx;">
			<view :class="index === tabIndex ? 'font-lg font-weight-bold text-main':'font-md '" class="flex-1  flex align-center justify-center"
			 v-for="(item,index) in tabBars" :key="index" @click="changeTab(index)">
				{{item.name}}
			</view>
		</view>

		<template v-if="tabIndex === 0">
			<view class="animated fast fadeIn">
				<view class="p-3 border-bottom">
					<view class="font-md">账号信息</view>
					<view class="font">账号年龄：12个月</view>
					<view class="font">账号ID：123</view>
				</view>
				<view class="p-3 border-bottom">
					<view class="font-md">个人信息</view>
					<view class="font">星座：12个月</view>
					<view class="font">职业：123</view>
					<view class="font">故乡：123</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="animated fast fadeIn">
				<common-list @follow="follow" @doSupport="doSupport" v-for="(item,index) in list" :key="index" :item='item' :index="index"></common-list>
				<divider></divider>
				<load-more :loadmore="loadmore"></load-more>
			</view>
		</template>
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top"  >
			<view hover-class="bg-light" class="flex align-center justify-center font-md border-bottom py-2">
				<text class="iconfont icon-sousuo mr-2"></text>加入黑名单
			</view>
			<view   hover-class="bg-light"class="flex align-center justify-center font-md py-2">
				<text class="iconfont icon-shanchu mr-2"></text>聊天
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const demo = [{
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
		share_num: 2
	}, {
		username: "昵称",
		userpic: "/static/default.jpg",
		newstime: "2020-2-2",
		isFollow: false,
		title: "我是标题",
		titlepic: "",
		support: {
			type: "unsupport",
			support_count: 1,
			unsupport_count: 2
		},
		comment_count: 2,
		share_num: 2
	}, {
		username: "昵称",
		userpic: "/static/default.jpg",
		newstime: "2020-2-2",
		isFollow: false,
		title: "我是标题",
		titlepic: "",
		support: {
			type: "",
			support_count: 0,
			unsupport_count: 0
		},
		comment_count: 0,
		share_num: 0
	}]
	import commonList from '@/components/common/common-list.vue'
	import loadMore from '@/components/common/load-more.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	
	export default {
		components: {
			commonList,
			loadMore,
			uniPopup
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
						name: '主页',

					},
					{
						name: '帖子',
						list: demo,
						loadmore: '上拉加载更多'
					},
					{
						name: '动态',
						list: demo,
						loadmore: '上拉加载更多'
					}
				],
			}
		},
		computed: {
			list() {
				return this.tabBars[this.tabIndex].list
			},
			loadmore() {
				return this.tabBars[this.tabIndex].loadmore
			}
		},
		//监听原始导航栏按钮事件
		onNavigationBarButtonTap(e) {
			this.$refs.popup.open()
		},
		methods: {
			//tab切换
			changeTab(index) {
				this.tabIndex = index
			},
			//关注（子组件传过来的方法）
			follow(index) {
				//拿到当前选项卡对应的list
				let list = this.tabBars[this.tabIndex].list
				list[index].isFollow = true
				uni.showToast({
					title: "关注成功"
				})
			},
			//顶踩 （子组件方法）
			doSupport(type) {
				let list = this.tabBars[this.tabIndex].list
				//拿到当前对象
				let item = list[type.index]
				let msg = type.type === 'support' ? '赞' : '踩'
				//判断之前是否已经顶踩
				//之前没有操作过
				if (item.support.type === '') {
					item.support[type.type + '_count']++
				}
				//之前已经点赞过了
				if (item.support.type === 'support' && type.type === 'unsupport') {
					//点赞-1
					item.support.support_count--;
					//踩+1
					item.support.unsupport_count++;
				} else if (item.support.type === 'unsupport' && type.type === 'support') {
					//点赞+1
					item.support.support_count++;
					//踩-1
					item.support.unsupport_count--;
				}
				item.support.type = type.type;
				uni.showToast({
					title: msg + '成功'
				})
			},
		}
	}
</script>

<style>

</style>
