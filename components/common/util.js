export default {
	//监听网络状态
	onNetWork() {
		let func = (res) => {
			if (res.networkType === 'none') {
				uni.showToast({
					title: '当前处于断网状态,请先连接'
				})
			}
		}
		uni.getNetworkType({
			success: func
		});
		uni.onNetworkStatusChange(func)
	},
	//热更新
	update(showToast = false) {
		// #ifdef APP-PLUS
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			$H.post('/update', {
				ver: widgetInfo.version,
			}).then((data) => {
				// 成功
				if (!data.url) {
					// 无需更新
					if (showToast) {
						uni.showToast({
							title: '无需更新',
							icon: "none"
						})
					}
					return
				}

				uni.showModal({
					title: '发现新的版本',
					content: '最新版本：' + data.version,
					cancelText: '放弃更新',
					confirmText: '立即更新',
					success: res => {
						if (!res.confirm) return;
						uni.downloadFile({
							url: data.url,
							success: (downloadResult) => {
								if (downloadResult.statusCode === 200) {
									plus.runtime.install(downloadResult.tempFilePath, {
										force: false
									}, function() {
										console.log('install success...');
										plus.runtime.restart();
									}, function(e) {
										console.error('install fail...');
									});
								}
							}
						});
					}
				});

			});

		});
		// #endif  
	},





}
