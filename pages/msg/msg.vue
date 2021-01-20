<template>
	<view>
		<template v-if="list.length >0 ">
			<!-- 消息列表 -->
			<block v-for="(item,index) in list" :key="index">
				<msg-list :item="item" :index="index"></msg-list>
			</block>
		</template>
		<template v-else>
			<no-thing></no-thing>
		</template>
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top" class="" >
			<view @click="popupEvent('friend')" hover-class="bg-light" class="flex align-center justify-center font-md border-bottom py-2">
				<text class="iconfont icon-sousuo mr-2"></text>添加好友
			</view>
			<view  @click="popupEvent('clear')" hover-class="bg-light"class="flex align-center justify-center font-md py-2">
				<text class="iconfont icon-shanchu mr-2"></text>清除列表
			</view>
		</uni-popup>

	</view>
</template>

<script>
	const demo = [{
			avatar: "/static/default.jpg",
			username: "昵称",
			update_time: "1570718427",
			data: "内容",
			noread: 20
		},
		{
			avatar: "../../static/default.jpg",
			username: "昵称",
			update_time: "1570718427",
			data: "内容",
			noread: 20
		}
	]
	import msgList from '@/components/msg/msg-list.vue'
	import noThing from '@/components/common/no-thing.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				list: []
			}
		},
		components: {
			msgList,
			noThing,
			uniPopup
		},
		//监听下拉刷新
		onPullDownRefresh() {
			this.refresh()
		},
		onLoad() {
			this.list = demo
		},
		//监听原始导航栏按钮事件
		onNavigationBarButtonTap(e) {
			switch(e.index){
				case 0 ://左边
				uni.navigateTo({
					url: '../user-list/user-list'
				});
				this.$refs.popup.close()
				break
				case 1://右边
				this.$refs.popup.open()
				break
			}
		},
		methods: {
			// 下拉刷新
			refresh() {
				setTimeout(() => {
					this.list = demo
					uni.stopPullDownRefresh()
					//停止下拉刷新
				}, 2000)
			},
			//弹出层选项点击事件
			popupEvent(e){
				switch(e){
					case 'friend':
					uni.navigateTo({
						url: '../search/search?type=user',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
					break;
					case'clear':
					break
				}
				//关闭弹出层
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>

</style>
