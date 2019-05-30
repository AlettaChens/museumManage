import { login } from '../services/admin';
import { routerRedux } from 'dva/router';

export default {
	namespace: 'login',
	state: {

	},

	effects: {
		*login({ payload }, { call, put }) {
			const data = yield call(login, payload);
			if (data.code == 200) {
				yield put(routerRedux.push('/collection'));
			}
		},
	},
	reducers: {

	}
};