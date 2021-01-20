<template>
	<view>
		<!-- 导航 -->
		<uni-nav-bar :border="false" :fixed="true" :statusBar="true" @click-right="openAddInput">
			<view class="w-100 flex align-center justify-center font-weight-bold">
				<!-- <view class="font-lg text-main mx-1">关注</view> -->
				<view @click="changeTab(index)" v-for="(item,index) in tabBars" :key="index" :class="tabIndex === index ? 'font-lg text-main':' font-md text-light-muted'"
				 class=" mx-1">
					{{item.name}}
				</view>
			</view>
			<text slot='right' class="iconfont icon-fatie_icon"></text>
		</uni-nav-bar>

		<swiper @change="onChangeTab" :current="tabIndex" :duration="150" :style="'height:'+scrollH+'px;'">
			<!-- 关注 -->
			<swiper-item >
				<scroll-view @scrolltolower="loadmoreEvent" scroll-y="true" :style="'height:'+scrollH+'px;'">
					<block v-for="(item,index) in list" :key="index">
						<common-list @doSupport="doSupport" :item="item" :index="index"></common-list>
						<divider></divider>
					</block>
					<load-more :loadmore ="loadmore"></load-more>
				</scroll-view>
			</swiper-item>
			<!-- 话题 -->
			<swiper-item >
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'">
					<!-- 热门分类 -->
					<hot-cate :hotCate = "hotCate"></hot-cate>
					<!-- 搜索框 -->
					<view class="p-2">
						<view @click="openSearch" class="bg-light rounded flex align-center justify-center py-2 text-secondary">
							<text class="iconfont icon-sousuo mr-2">搜索话题</text>
						</view>
					</view>
					<!-- 轮播图 -->
					<swiper class="px-2 pt-2" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item>
							<image class="w-100 rounded" style="height: 300rpx;" src="/static/demo/banner1.jpg"></image>
						</swiper-item>
					</swiper>
					<!-- 最近更新 -->
					<view class="p-2 font-md">最近更新</view>
					<!-- 话题列表组件 -->
					<block v-for="(item,index) in topicList" :key="index">
						<topic-list :item='item' :index='index'></topic-list>
					</block>
				</scroll-view>
			</swiper-item>
			
		</swiper>

	</view>
</template>

<script>
	const demo = [{
		username: "昵称",
		userpic: "/static/default.jpg",
		newstime: "2020-2-2",
		isFollow: true,
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
		isFollow: true,
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
		isFollow: true,
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
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import commonList from '@/components/common/common-list.vue'
	import loadMore from '@/components/common/load-more.vue'
	import hotCate from '@/components/news/hot-cate.vue'
	import topicList from '@/components/news/topic-list.vue'
	export default {
		data() {
			return {
				scrollH: 500,
				tabIndex: 0,
				topicList:[{
					cover:'/static/demo/topicpic/1.jpeg',
					title:'话题名称',
					desc:'话题描述',
					today_count:0,
					news_count:0
				},{
					cover:'/static/demo/topicpic/1.jpeg',
					title:'话题名称',
					desc:'话题描述',
					today_count:0,
					news_count:0
				}],
				tabBars: [{
					name: "关注"
				}, {
					name: "话题"
				}],
				//关注列表
				list:[],
				loadmore:"上拉加载更多",
				hotCate:[{
					name:'关注'
				},{
					name:'推荐'
				},{
					name:'体育'
				},{
					name:'热点'
				},{
					name:'财经'
				},{
					name:'娱乐'
				}]
			}
		},
		components: {
			uniNavBar,
			commonList,
			loadMore,
			hotCate,
			topicList
		},
		onLoad() {
			//计算屏幕高度
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - res.statusBarHeight - 44
				}
			})
			//加载测试数据
			this.list = demo
		},
		methods: {
			//打开搜索页
			openSearch(){
				uni.navigateTo({
					url: '../search/search?type=topic',
				
				});
			},
			//打开发布页面
			openAddInput() {
				uni.navigateTo({
					url: '../add-input/add-input'
				});
			},
			//切换选项卡
			changeTab(index) {
				this.tabIndex = index
			},
			//滑动
			onChangeTab(e){
				this.tabIndex = e.detail.current
			},
			//顶踩 （子组件方法）
			doSupport(type) {
				//type=> {type:'support',index:0}
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
			//上拉加载
			loadmoreEvent(){
				//验证当前是否处于
				if(this.loadmore !== '上拉加载更多') return;
				//设置加载状态
				this.loadmore = '加载中'
				//模拟数据请求
				setTimeout(()=>{
					//加载数据
					this.list = [...this.list,...this.list]
					//设置加载状态
					this.loadmore = '上拉加载更多'
				},2000)
			}
		}
	}
</script>

<style>

</style>
