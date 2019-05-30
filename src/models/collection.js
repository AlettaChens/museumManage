import { publish,getInfoByPage,getInfoCount,deleteInfoById,updateInfo} from '../services/collection';

export default {
    namespace: 'collection',
    state: {
        collectionList: [],
        total: 0,
    },

    effects: {
        *publish({ payload }, { call, put }) {
            const data = yield call(publish, payload);
            if (data.code == 200) {
                yield put({ type: 'getInfoCount'});
                yield put({ type: 'getInfoByPage', payload: { offset: 1, pageSize: 8 } });
            }
        },
        *getInfoByPage({ payload }, { call, put }) {
            const data = yield call(getInfoByPage, payload);
            if (data.code == 200) {
                yield put({ type: 'update', payload: { collectionList: data.data } });
            }
        },

        *getInfoCount({ payload }, { call, put }) {
            const data = yield call(getInfoCount);
            if (data.code == 200) {
                yield put({ type: 'update', payload: { total: data.data } });
            }
        },

        *deleteInfoById({ payload }, { call, put }) {
           const data = yield call(deleteInfoById, payload);
            if (data.code == 200) {
                yield put({ type: 'getInfoCount'});
                yield put({ type: 'getInfoByPage', payload: { offset: 1, pageSize: 8 } });
            }
        },

        *updateInfo({ payload }, { call, put }) {
            const data = yield call(updateInfo, payload);
            if (data.code == 200) {
                yield put({ type: 'getInfoCount'});
                yield put({ type: 'getInfoByPage', payload: { offset: 1, pageSize: 8 } });
            }
        },
    },
    reducers: {
        update(state, action) {
            return { ...state, ...action.payload };
        }
    }
};