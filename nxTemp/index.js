import store from '@/nxTemp/store';
import wechat from '@/nxTemp/wechat/wechat';
import tools from '@/nxTemp/utils/tools'
import storage from '@/nxTemp/utils/storage'
import nxShare from '@/nxTemp/utils/share.js'
import dayjs from "dayjs"
import * as filter from '@/nxTemp/filter';
const install = Vue => {
	// global filter
	Object.keys(filter).forEach(item => {
		Vue.filter(item, filter[item]);
	});
	// 挂载函数
	Vue.prototype.$storage = storage;
	Vue.prototype.$store = store;
	Vue.prototype.$tools = tools;
	Vue.prototype.$dayjs = dayjs;//可以全局使用dayjs
	// event Bus 用于无关系组件间的通信。
	Vue.prototype.$bus = new Vue();
	Vue.mixin(nxShare);
}

export async function init(options) {
	// #ifdef MP-WEIXIN
	// 检测小程序更新(如果从朋友圈场景进入则无此API)
	options.scene !== 1154 && wechat.checkMiniProgramUpdate();
	// #endif
}

export default {
	install
}
