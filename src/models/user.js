import { getUserPage, getUserCount } from '../services/admin';

export default {
    namespace: 'user',
    state: {
        userList: [],
        total: 0,
        current: 1,
    },

    effects: {
        *getUserPage({ payload }, { call, put }) {
            const data = yield call(getUserPage, payload);
            if (data.code == 200) {
                yield put({ type: 'update', payload: { userList: data.data } });
            }
        },
        *getUserCount({ payload }, { call, put }) {
            const data = yield call(getUserCount, payload);
            if (data.code == 200) {
                yield put({ type: 'update', payload: { total: data.data } });
            }
        },
    },
    reducers: {
        update(state, action) {
            return { ...state, ...action.payload };
        }
    }
};