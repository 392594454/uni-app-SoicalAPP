<template>
	<view>
		<template v-if="searchList.length === 0">
			<!-- 搜索历史 -->
			<view class="py-2 font-md px-2">搜索历史</view>
			<view class="flex flex-wrap">
				<view @click="clickSearchHistory(item)" class="border rounded font mx-2 my-1 px-2 " hover-class="bg-light" v-for="(item,index) in list"
				 :key="index">{{item}}</view>
			</view>
		</template>
		<template v-else>
			<!-- 数据列表 -->
			<block v-for="(item,index) in searchList" :key="index">
				<!-- 帖子 -->
				<template v-if="type === 'post'">					
					<common-list :item="item" :index="index"></common-list>
				</template>
				<!-- 话题 -->
				<template v-if="type === 'topic'">
					<topic-list :item="item" :index="index"></topic-list>
				</template>
				<!-- 用户 -->
				<template v-if="type === 'user'">
					<user-list :item="item" :index="index"></user-list>
				</template>
			</block>
		</template>

	</view>
</template>

<script>
	//测试数据
	const demo1 = [{
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
		titlepic: "/static/demo/datapic/11.jpg",
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
		titlepic: "/static/demo/datapic/11.jpg",
		support: {
			type: "",
			support_count: 0,
			unsupport_count: 0
		},
		comment_count: 0,
		share_num: 0
	}]
	const demo2 = [{
			cover: '/static/demo/topicpic/1.jpeg',
			title: '话题名称',
			desc: '话题描述',
			today_count: 0,
			news_count: 0
		}, {
			cover: '/static/demo/topicpic/1.jpeg',
			title: '话题名称',
			desc: '话题描述',
			today_count: 0,
			news_count: 0
		}, {
			cover: '/static/demo/topicpic/1.jpeg',
			title: '话题名称',
			desc: '话题描述',
			today_count: 0,
			news_count: 0
		},
		{
			cover: '/static/demo/topicpic/1.jpeg',
			title: '话题名称',
			desc: '话题描述',
			today_count: 0,
			news_count: 0
		},
		{
			cover: '/static/demo/topicpic/1.jpeg',
			title: '话题名称',
			desc: '话题描述',
			today_count: 0,
			news_count: 0
		}
	]
	const demo3 = [{
		avatar: '/static/default.jpg',
		username: '昵称',
		sex: 2,
		age: 24,
		isFollow: true
	}, {
		avatar: '/static/default.jpg',
		username: '昵称',
		sex: 1,
		age: 22,
		isFollow: false
	}]
	import commonList from '@/components/common/common-list.vue'
	import topicList from '@/components/news/topic-list.vue'
	import userList from '@/components/user-list/user-list.vue'
	export default {
		data() {
			return {
				searchText: '',
				searchList: [], //搜索结果
				//当前搜索类型
				type: 'post',
				list: ['uni-app第二季商城类开发', 'uni-app第三季仿微信实战开发', '实战课程', '系列教程']
			}
		},
		components: {
			commonList,
			topicList,
			userList
		},
		//监听导航输入
		onNavigationBarSearchInputChanged(e) {
			this.searchText = e.text
		},
		//监听点击导航搜索按钮
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.searchEvent()
			}
		},
		onLoad(e) {
			if (e.type) {
				this.type = e.type
			}
			let pageTitle = '帖子'
			switch (this.type) {
				case 'topic':
					pageTitle = '话题'
					break
				case 'user':
					pageTitle = '用户'
					break
				case 'post':

			}
			//修改搜索占位
			// #ifdef APP-PLUS
			let currentWebview = this.$mp.page.$getAppWebview();
			let tn = currentWebview.getStyle().titleNView
			tn.searchInput.placeholder = '搜索' + pageTitle
			currentWebview.setStyle({
				titleNView: tn
			})
			// #endif

		},
		methods: {
			//点击搜索历史事件
			clickSearchHistory(text) {
				this.searchText = text
				this.searchEvent()
			},
			//搜索事件
			searchEvent() {
				//收起键盘
				uni.hideKeyboard()
				//显示loading状态
				uni.showLoading({
					title: '加载中...',
					mask: false
				});
				//请求搜索

				setTimeout(() => {
					switch (this.type) {
						case 'post':
							this.searchList = demo1
							break
						case 'topic':
							this.searchList = demo2
							break
						case 'user':
							this.searchList = demo3
							break

					}
					//隐藏loading
					uni.hideLoading()
				}, 3000)
				//请求搜索
			}
		}
	}
</script>

<style>

</style>
