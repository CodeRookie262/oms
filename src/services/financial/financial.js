import request from '@/utils/request';
import {
  async
} from 'q';

// 获取套餐列表
export async function getFinancialList(params) {
  return request(
    `/api/oms/package/?page=${params.page}&page_size=${params.page_size}`, {
      method: "GET"
    }
  );
}

// 删除套餐

export async function deleteFinancial(params) {
  console.log('params====', params)
  return request(
    `/api/oms/package/${params.id}/`, {
      method: "DELETE"
    }
  );
}

//套餐详情
export async function detailFinancial(params) {
  return request(
    `/api/oms/package/${params.id}/`, {
      method: "GET"
    }
  );
}

//创建套餐
export async function createFinancial(params) {
  return request(
    `/api/oms/package/`, {
      method: "POST",
      body: {
        ...params
      }
    }
  );
}


//修改套餐
export async function rewriteFinancial(params) {
  const {
    id,
    ...data
  } = params;
  console.log('修改接口请求的参数', id, data)
  return request(
    `/api/oms/package/${params.id}/`, {
      method: "PATCH",
      body: {
        ...params
      }
    }
  );
}