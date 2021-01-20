<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x :scroll-into-view="scrollInto" class="scroll-row scroll-with-animation ">
			<view @click="changeTab(index)" v-for="(item,index) in tabBars" :key="index" :class="tabIndex === index ? 'text-main font-lg font-wight-blod':''"
			 :id="'tab'+index" class="scroll-row-item px-3 py-2" style="height: 100rpx;">
				{{item.name}}
			</view>
		</scroll-view>

		<swiper :current="tabIndex" :duration="150" @change="onChangeTab" :style="'height:'+scrollH+'px;'">
			<swiper-item v-for="(item,index) in newsList" :key="index">
				
				<scroll-view @scrolltolower="loadmore(index)" scroll-y="true" :style="'height:'+scrollH+'px;'">
					<template v-if="item.list.length > 0">
						<!-- 列表 -->
						<block v-for="(item2,index2) in item.list" :key="index2">
							<!-- 首页列表组件 -->
							<topic-list :item="item2" :index="index2"></topic-list>

						</block>
						<!-- 上拉加载 -->
						<load-more :loadmore="item.loadmore"></load-more>
					</template>
					<!-- 无数据 -->
					<template v-else>
						<no-thing></no-thing>
					</template>
				</scroll-view>
				
			</swiper-item>
		</swiper>



	</view>
</template>

<script>
	const demo = [{
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
	}]
	import topicList from '@/components/news/topic-list.vue'
	import loadMore from '@/components/common/load-more.vue'
	export default {
		data() {
			return {
				//列表高度
				scrollH: 600,
				tabIndex: 0,
				scrollInto: "",
				tabBars: [{
						name: '关注'
					},
					{
						name: '体育'
					},
					{
						name: '关注'
					},
					{
						name: '体育'
					},
					{
						name: '关注'
					},
					{
						name: '体育'
					},
					{
						name: '关注'
					},
					{
						name: '体育'
					},
				],
				newsList: []
			}
		},
		components: {
			topicList,
			loadMore
		},
		//监听导航按钮点击事件
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '../add-input/add-input'
			})
		},
		//监听导航栏搜索框
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search'
			});
		},
		onLoad() {
			//计算屏幕高度
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(100)
				}
			})
			//根据选项生成列表
			this.getData();
		},
		methods: {
			//获取数据
			getData() {
				let arr = []
				for (let i = 0; i < this.tabBars.length; i++) {
					//生成列表模板
					let obj = {
						//1上拉加载更多 2 加载中 3 没有更多了
						loadmore: '上拉加载更多',
						list: [],
					}
					if (i < 2) {
						obj.list = demo
					}
					arr.push(obj)
				}
				this.newsList = arr;
			},
			//监听滑动
			onChangeTab(e) {
				this.changeTab(e.detail.current)
			},
			//点击切换tab选项
			changeTab(index) {
				if (this.tabIndex === index) {
					return
				}
				this.tabIndex = index
				//滚动到指定元素
				this.scrollInto = 'tab' + index

			},
			//关注（子组件传过来的方法）
			follow(index) {
				this.list[index].isFollow = true
				uni.showToast({
					title: "关注成功"
				})
			},
			//顶踩 （子组件方法）
			doSupport(type) {
				//拿到当前对象
				let item = this.list[type.index]
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
			loadmore(index) {

				//拿到当前列表
				let item = this.newsList[index]
				//判断是否处于可加载状态
				if (item.loadmore !== '上拉加载更多') return;

				//修改当前列表加载状态
				item.loadmore = '加载中...'
				//模拟数据请求
				setTimeout(() => {
					//加载数据
					item.list = [...item.list, ...item.list]
					//恢复加载状态
					this.newsList[index].loadmore = '上拉加载更多...'
				}, 2000)
			}
		}
	}
</script>
