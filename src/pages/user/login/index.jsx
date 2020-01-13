import React, { Component } from "react";
import Link from "umi/link";
import router from "umi/router";
import {
  Row,
  Col,
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Tooltip,
  message,
  AutoComplete
} from "antd";
import { connect } from "dva";
import Iconfont from "@/components/Iconfont";
import styles from "./index.less";

import userlogo from "@/assets/user-logo.png";
import loginpng from "@/assets/login.png";

@connect(({ user }) => ({
  user
}))
class UserLogin extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: "user/userLogin",
          payload: {
            username: values.username,
            password: values.password
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator} = this.props.form;
    const { loadingLogin } = this.props.user;

    return (
      <Row type="flex" style={{ width: "100%", height: "100%" }}>
        <Col style={{ width: 468, height: "100%" }} className={styles.imgBox}>
          <div className={styles.img1}>
            <img src={userlogo} alt="" />
          </div>
          <div className={styles.img2}>
            <img src={loginpng} alt="" />
          </div>
        </Col>
        <Col
          style={{ width: 532, height: "100%", position: "relative" }}
          className={styles.logFrom}
        >
          <div className={styles.fromBox}>
            <h1>登录</h1>

            <Form onSubmit={this.handleSubmit} style={{ maxWidth: 427 }}>
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "邮箱或手机号不能为空" }]
                })(
                  <AutoComplete placeholder="请输入邮箱或手机号" size="large">
                    <Input />
                  </AutoComplete>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "密码不能为空" }]
                })(
                  <AutoComplete placeholder="请输入密码" size="large">
                    <Input.Password />
                  </AutoComplete>
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  size="large"
                  loading={loadingLogin}
                >
                  登录
                </Button>
                <Row>
                  <Col span={20}>
                    <span style={{ color: "#8494a6" }}>没有账号？</span>
                    <Link to="/user/register">
                      <span style={{ color: "#0d6fde" }}>立即注册</span>
                    </Link>
                  </Col>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <Link to="/forget/index">
                      <span style={{ color: "#0d6fde" }}>忘记密码</span>
                    </Link>
                  </Col>
                </Row>
              </Form.Item>
            </Form>

            <div className={styles.other}>
              <div className={styles.title}>
                <i></i>
                <span>第三方账号登录</span>
                <i></i>
              </div>
              <Row
                type="flex"
                justify="space-between"
                style={{ marginTop: "23px" }}
              >
                <Tooltip title="功能开发中">
                  <Iconfont type="Chats" className={styles.weichat} />
                </Tooltip>
                <Tooltip title="功能开发中">
                  <Iconfont type="QQ" className={styles.qq} />
                </Tooltip>
                <Tooltip title="功能开发中">
                  <Iconfont type="weibo1" className={styles.weibo} />
                </Tooltip>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Form.create({ name: "user-login" })(UserLogin);
