import { register } from '../services/admin';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
message.config({
	top: 50,
})
export default {
	namespace: 'register',
	state: {

	},

	effects: {
		*register({ payload }, { call, put }) {
			const data = yield call(register, payload);
			if (data.code == 200) {
				message.success('注册成功');
			}
		},
	},
	reducers: {

	}
};