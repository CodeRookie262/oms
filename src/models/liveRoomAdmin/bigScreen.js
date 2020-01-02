import { getBigSreenList } from "@/services/bigScreen";
import { message } from "antd";

const BigScreenModel = {
  namespace: "bigScreen",
  state: {
    bigSreenList: {}
  },
  effects: {
    *getBigSreenList({ payload }, { call, put }) {
      const res = yield call(getBigSreenList, payload);
      if (res && res.code === 20000) {
        yield put({
          type: "saveList",
          payload: res.data
        });
      }
    }
  },
  reducers: {
    saveList(state, action) {
      return {
        ...state,
        bigSreenList: action.payload
      };
    }
  }
};
export default BigScreenModel;
