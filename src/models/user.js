import {
  queryCurrent,
  query as queryUsers,
  getCaptcha,
  userRegister,
  userLogin,
  resetPassword
} from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';
import router from 'umi/router';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {
      id: ''
    },
    loadingCaptcha: false,
    loadingRegister: false,
    loadingLogin: false,
    loadingReset: false
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response
      });
    },

    // 获取用户信息
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data
      });
    },

    // 验证码
    *getCaptcha({ payload, callback, failCallback }, { call, put }) {
      yield put({
        type: 'CaptchaLoading',
        payload: true
      });
      const response = yield call(getCaptcha, payload);
      console.log('response===', response)
      if (response.code === 20000) {
        callback(response);
      } else if (response.code === 20011) {
        message.error('用户已存在');
        failCallback();
      } else if (response.code === 20012) {
        message.error('用户不存在');
        failCallback();
      } else {
        message.error('获取验证码失败');
        failCallback();
      }
      yield put({
        type: 'CaptchaLoading',
        payload: false
      });
    },

    // 注册
    *userRegister({ payload, callback }, { call, put }) {
      yield put({
        type: 'RegisterLoading',
        payload: true
      });
      const response = yield call(userRegister, payload);
      if (response.code === 20000) {
        callback(response);
      } else if (response.code === 20015) {
        message.error('验证码错误');
      } else if (response.code === 20007) {
        message.error('手机号码格式错误');
      } else if (response.code === 20008) {
        message.error('邮箱格式错误');
      } else if (response.code === 20009) {
        message.error('密码格式错误');
      } else if (response.code === 20011) {
        message.error('用户已存在');
      } else {
        message.error('注册失败');
      }
      yield put({
        type: 'RegisterLoading',
        payload: false
      });
    },

    // 登录
    *userLogin({ payload, callback }, { call, put }) {
      yield put({
        type: 'LoginLoading',
        payload: true
      });
      const response = yield call(userLogin, payload);
      if (response.code === 20000) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/releaseCenter/help';
      } else if (response.code === 20012) {
        message.error('用户不存在');
      } else if (response.code === 20013) {
        message.error('密码错误');
      } else if (response.code === 20014) {
        message.error('手机号码或邮箱格式错误');
      } else {
        message.error('登录失败');
      }
      yield put({
        type: 'LoginLoading',
        payload: false
      });
    },

    // 重置密码
    *resetPassword({ payload, callback }, { call, put }) {
      yield put({
        type: 'resetLoading',
        payload: true
      });
      const response = yield call(resetPassword, payload);
      if (response.code === 20000) {
        callback(response);
      } else if (response.code === 20015) {
        message.error('验证码错误');
      } else if (response.code === 20007) {
        message.error('手机号码格式错误');
      } else if (response.code === 20008) {
        message.error('邮箱格式错误');
      } else if (response.code === 20009) {
        message.error('密码格式错误');
      } else if (response.code === 20012) {
        message.error('用户不存在');
      } else {
        message.error('提交失败');
      }
      yield put({
        type: 'resetLoading',
        payload: false
      });
    },
    // 登出
    *loggout(_, { call, put }) {
      window.localStorage.removeItem('token');
      setAuthority('guest');
      reloadAuthorized();
      window.location.href = '/user/login';
    }
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    CaptchaLoading(state, action) {
      return {
        ...state,
        loadingCaptcha: action.payload
      };
    },
    RegisterLoading(state, action) {
      return {
        ...state,
        loadingRegister: action.payload
      };
    },
    LoginLoading(state, action) {
      return {
        ...state,
        loadingLogin: action.payload
      };
    },
    resetLoading(state, action) {
      return {
        ...state,
        loadingReset: action.payload
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {}
      },
      action
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount
        }
      };
    }
  }
};
export default UserModel;
