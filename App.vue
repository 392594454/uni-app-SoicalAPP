<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//检测更新
			// this.$U.update(true)
			//检测网络
			this.$U.onNetWork()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 引入官方css库 */
	@import url("/common/uni.css");
	/* 自定义图标库 */
	@import url("/common/icon.css");
	/* 动画库 */
	@import "./common/animate.css";
	/* 自定义样式库 */
	@import "./common/free.css";
	/* 全局样式 */
	@import "./common/common.css";
</style>
