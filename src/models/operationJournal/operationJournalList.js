import { getOperationJournalList } from "@/services/operationJournal/operationJournal";
 export default {
     namespace:"operationJournalList",
     state:{
         operationList:{}
     },
     effects: {
        *getOperationJournalList({ payload, callback }, { call }) {
            const res = yield call(getOperationJournalList, payload);
            callback(res)
           
        }
    },

 }