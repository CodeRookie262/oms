import { getComplaintList } from "@/services/complaintAdvice/complaintList";

export default {

    namespace: "complaintList",
    state: {
        complaintAdviceList: {}
    },
    effects: {
        *getComplaintList({ payload, callback }, { call }) {
            const res = yield call(getComplaintList, payload);
            callback(res)
            //    if(res&&res.code===20000){
            // yield put({
            //     type: "saveList",
            //     payload: res.data
            // });
            //    }
        }
    },
    // reducers: {
    //     saveList(state, action) {
    //         return {
    //             ...state,
    //             complaintAdviceList: action.payload
    //         }
    //     }
    // }
}
// export default ComplaintListModel;