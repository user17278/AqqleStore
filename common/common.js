export default {
	// 获取城市周边苹果授权店
	getAppleShopInCurrentCity(lat, lng) {
		console.log(this)
		return new Promise((resolve, reject) => {
			this.nearlyShopArr = [];
			this.qqmapsdk.search({
				keyword: 'Apple授权专营店-店',
				location: {
					latitude: lat,
					longitude: lng
				},
				page_size: 20,
				success: async res => {
					if (res.count == 0) {
						this.loadingTip = '暂无门店';
						this.nearlyShopArr = [{
							id: 0
						}];
						this.isShowLoading = true;
					} else {
						for (let i = 0; i < res.data.length; i++) {
							if (res.data[i].title.indexOf('-') == -1) {
								continue;
							}
							const distance = await this.getDistance(res.data[i].location.lat, res
								.data[i].location.lng);
							await this.addNearlyShopArr(res, i, distance);
						}
						this.isShowLoading = false;
					}
					resolve();
				}
			});
		});
	},
	// 获取当前定位点到门店距离
	getDistance(lat, lng, title) {
		return new Promise((resolve, reject) => {
			this.qqmapsdk.calculateDistance({
				mode: 'straight',
				from: {
					latitude: this.currentLatitude,
					longitude: this.currentLongitude
				},
				to: [{
					latitude: lat,
					longitude: lng
				}],
				success: data => {
					resolve((data.result.elements[0].distance / 1000).toFixed(2));
				}
			});
		});
	}
}
