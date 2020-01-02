import fetch from 'dva/fetch';
import { notification, message } from 'antd';
import router from 'umi/router';
import hash from 'hash.js';
import { isAntdPro } from './utils';

// 默认配置
message.config({
  top: 24,
  duration: 3,
  maxCount: 1
});

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

const cachedSave = (response, hashcode) => {
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(
  url,
  options = {
    expirys: isAntdPro()
  }
) {
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');

  const defaultOptions = {};
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'PATCH' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        Authorization: 'JWT ' + localStorage.getItem('token') || '',
        'Content-Type': newOptions.Type ? newOptions.Type : 'application/json',
        ...newOptions.headers
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      newOptions.headers = {
        Authorization: 'JWT ' + localStorage.getItem('token') || '',
        ...newOptions.headers
      };
    }
  }

  const expirys = options.expirys || 60;
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }
  //请求之前加入token
  if (!url.includes('/user/login') && !url.includes('/user/logout')) {
    const setToken = {
      Authorization: 'JWT ' + localStorage.getItem('token') || ''
    };
    newOptions.headers = {
      ...newOptions.headers,
      ...setToken
    };
  }
  return (
    fetch(url, newOptions)
      .then(checkStatus)
      .then(response => {
        return response.json();
      })

      /**
       * 这里是最终后台返回结果的地方，在这里统一处理业务状态码
       */
      .then(response => {
        if (
          // response.code == "20013" ||
          response.code == '20018' ||
          response.code == '20019' ||
          response.code == '20020'
        ) {
          router.push('/user/login');
          message.warning(`${JSON.stringify(response.msg)}`);
        } else if (response.code != 20000) {
          message.warning(`${JSON.stringify(response.msg)}`);
          return response;
        } else {
          return response;
        }
      })
      .catch(e => {
        const status = e.name;
        notification.error({
          message: `请求错误 `,
          description: `${status}`
        });
        if (status === 401) {
          window.g_app._store.dispatch({
            type: 'login/logout'
          });
          return;
        }
        if (status === 403) {
          router.push('/exception/403');
          return;
        }
        if (status <= 504 && status >= 500) {
          router.push('/');
          return;
        }
        if (status >= 404 && status < 422) {
          router.push('/exception/404');
        }
      })
  );
}
