<template>
	<view>
		<topic-info :info='info'></topic-info>
		<divider></divider>
		<view class="p-2 flex align-center border-bottom" hover-class="bg-light" v-for="(item,index) in hotList" :key="index">
			<text class="iconfont icon-xihuan text-main"></text>
			<text class="font text-dark text-ellipsis">{{item.title}}</text>
		</view>
		<divider></divider>
		<!-- tab -->
		<view class="flex align-center py-2">
			<view :class="index === tabIndex ? 'font-lg font-weight-bold text-main':'font-md '" class="flex-1  flex align-center justify-center"
			 v-for="(item,index) in tabBars" :key="index" @click="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		<!-- 列表 -->
		<template v-if="listData.length > 0">
			<block v-for="(item,index) in listData" :key="index">
				<common-list :item="item" :index="index"></common-list>
				<divider></divider>
			</block>
		</template>
		<template v-else>
			<no-thing></no-thing>
		</template>
		<!-- 上拉加载 -->
		<load-more :loadmore='loadText'></load-more>
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
	import topicInfo from '@/components/topic-detail/topic-info.vue'
	import commonList from '@/components/common/common-list.vue'
	import noThing from '@/components/common/no-thing.vue'
	import loadMore from '@/components/common/load-more.vue'
	export default {
		data() {
			return {
				info: {
					cover: "/static/demo/topicpic/1.jpeg",
					title: '话题名称',
					desc: "话题描述 ",
					today_count: 10,
					news_count: 0
				},
				hotList: [{
					title: '【新人必读】uni-app实战第二季商城类项目开发'
				}, {
					title: '【新人必读】uni-app实战第三季商城类项目开发'
				}],
				list1: [],
				loadText1: '上拉加载更多',
				list2: [],
				loadText2: "上拉加载更多",
				tabIndex: 0,
				tabBars: [{
						name: '默认'
					},
					{
						name: '最新'
					}
				],


			}
		},
		components: {
			topicInfo,
			commonList,
			noThing,
			loadMore
		},
		onLoad(e) {
			if (e.detail) {
				let res = JSON.parse(e.detail)
				console.log(res)
			}
			this.list1 = demo
		},
		computed: {
			//当前列表数据
			listData() {
				// return this['list'+this.tabIndex+1]
				if (this.tabIndex === 0) {
					return this.list1
				}
				return this.list2
			},
			//当前上拉加载
			loadText() {
				if (this.tabIndex === 0) {
					return this.loadText1
				}
				return this.loadText2
			}
		},
		// 触底事件
		onReachBottom() {
			this.loadmore()
		},
		methods: {
			//tab切换
			changeTab(index) {
				this.tabIndex = index
			},
			//上拉加载
			loadmore() {
				//拿到当前列表
				let index = this.tabIndex
				//判断是否处于可加载状态
				if (this.loadText !== '上拉加载更多') return;
				//设置上拉加载状态处于加载中
				this['loadText' + (index + 1)] = '加载中...'
				//请求数据
				setTimeout(() => {
					this['list' + (index + 1)] = [...this['list' + (index + 1)], ...this['list' + (index + 1)]]
					this['loadText' + (index + 1)] = '上拉加载更多'
				},2000)
			}
		}
	}
</script>

<style>
	
</style>
