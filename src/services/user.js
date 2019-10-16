import request from "@/utils/request";
import { async } from "q";

export async function query() {
  return request("/api/users");
}
export async function queryCurrent() {
  return request("/api/users/user_info/", {
    method: "GET"
  });
}

// 获取验证码
export async function getCaptcha(params) {
  return request("/api/captcha/", {
    method: "POST",
    body: { ...params }
  });
}

// 注册
export async function userRegister(params) {
  return request("/api/accounts/register/", {
    method: "POST",
    body: { ...params }
  });
}

// 登录
export async function userLogin(params) {
  return request("/api/accounts/login/", {
    method: "POST",
    body: { ...params }
  });
}

// 重置密码
export async function resetPassword(params) {
  return request("/api/accounts/password/reset/", {
    method: "POST",
    body: { ...params }
  });
}
