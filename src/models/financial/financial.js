import {
	getFinancialList,
	deleteFinancial,
	detailFinancial,
	createFinancial,
	rewriteFinancial
} from '@/services/financial/financial';

export default {
	namespace: 'financial',
	state: {},
	effects: {
		* getList({
			payload,
			callback
		}, {
			call,
			put
		}) {
			const response = yield call(getFinancialList, payload);
			// console.log(response, '请求的数据')
			callback(response);
			// yield put({
			// 	type: 'financialList',
			// 	payolad: response
			// })
		},
		* deleteList({
			payload,
			callback
		}, {
			call
		}) {
			console.log('删除接口请求加入', new Date(), payload, callback)
			const response = yield call(deleteFinancial, payload);
			console.log('response', response)
			callback(response);
		},
		* getDetail({
			payload,
			callback
		}, {
			call
		}) {
			console.log('开始请求套餐详情表')
			const response = yield call(detailFinancial, payload);
			callback(response)
		},
		* createFinancial({
			payload,
			callback
		}, {
			call
		}) {
			console.log('开始创建套餐')
			const response = yield call(createFinancial, payload);
			console.log(response)
			callback(response)
		},
		* updateFinancial({
			payload,
			callback
		}, {
			call
		}) {
			console.log('开始修改套餐');
			const response = yield call(rewriteFinancial, payload);
			console.log(response, '修改请求的数据返回体')
			callback(response)
		}
	}
}