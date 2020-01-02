import request from '@/utils/request';
import { async } from 'q';

export async function getBigSreenList(params) {
  return request(
    `/api/omsdata/?page=${params.page}&&page_size=${params.pageSize}&&key=${params.key}`,
    {
      method: 'GET'
    }
  );
}
