export default {
	/**
	 * 图片处理-预览图片
	 * @param {Array} urls - 图片列表
	 * @param {Number} current - 首个预览下标
	 */
	previewImage(urls = [], current = 0) {
		uni.previewImage({
			urls: urls,
			current: current,
			indicator: 'default',
			loop: true,
			fail(err) {
				console.log('previewImage出错', urls, err)
			},
		})
	},


	/**
	 * 打电话
	 * @param {String<Number>} phoneNumber - 数字字符串
	 */
	callPhone(phoneNumber = '') {
		let num = phoneNumber.toString()
		uni.makePhoneCall({
			phoneNumber: num,
			fail(err) {
				console.log('makePhoneCall出错', err)
			},
		});
	},
	
	/**
	 * @description 上传文件
	 */
	async uploadFile(url, path, progress) {
		return new Promise((resolve, reject) => {
			uniCloud.uploadFile({
				filePath: url,
				cloudPath: path,
				onUploadProgress: (progressEvent) => {
					var percentCompleted = Math.round((progressEvent.loaded * 100) /
						progressEvent.total);
					if (typeof progress === 'function') {
						progress(percentCompleted, progressEvent);
					}
				}
			}).then(async uRes => {
				console.log('use-upload', uRes);
				uRes.url = uRes.fileID;
				// 兼容腾讯云上传文件
				if (uRes.url.indexOf('cloud://') != -1) {
					const tempRes = await uniCloud.getTempFileURL({
						fileList: [uRes.url]
					});
	
					if (tempRes.fileList && tempRes.fileList.length > 0) {
						uRes.url = tempRes.fileList[0].tempFileURL;
					}
				}
	
				resolve(uRes);
			}).catch(err => {
				console.log('use-upload', err);
				reject(err);
			});
		});
	},
	
	/**
	 * @description 消息提示 toast
	 */
	msg(title, duration = 1500, mask = false, icon = 'none') {
		if (!title) return;
		if (typeof title !== 'string') title = JSON.stringify(title);
	
		uni.showToast({
			title,
			duration,
			mask,
			icon
		});
	},
	


}
