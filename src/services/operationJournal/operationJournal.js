import request from '@/utils/request';

export async function getOperationJournalList(params) {
    return request(
        `/api/oms/systemlog/?page=${params.page}&page_size=${params.pageSize}`,
        {
            method: 'GET'
        }
    )
}