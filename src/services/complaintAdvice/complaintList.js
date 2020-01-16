import request from '@/utils/request';

export async function getComplaintList(params){
    return request(
        `/api/feedback/user_feedback_list/?page=${params.page}&page_size=${params.pageSize}`,
        {
            method:'GET'
        }
    );
}