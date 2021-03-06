import React, { Component } from "react";
import Link from "umi/link";
import router from "umi/router";
import {
  Row,
  Col,
  Button,
  Form,
  Icon,
  Input,
  message,
  AutoComplete
} from "antd";
import { connect } from "dva";
import styles from "./index.less";

import logo from "@/assets/logo2.png";

@connect(({ user }) => ({
  user
}))
class OnEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getCodeBtn: true,
      codeBtn: "获取验证码"
    };
  }

  // 邮箱自定义验证
  emailRules = (rule, value, callback) => {
    const { form } = this.props;
    let reg = new RegExp(
      /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/
    );

    if (value) {
      if (reg.test(value)) {
        this.setState({ getCodeBtn: false });
        callback();
      } else {
        this.setState({ getCodeBtn: true });
        callback("请输入正确格式的邮箱");
      }
    } else {
      this.setState({ getCodeBtn: true });
      callback("邮箱不能为空");
    }
  };

  // 确认密码自定义校验
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次密码输入不一致");
    } else {
      callback();
    }
  };

  forCode = obj => {
    // 发送请求
    this.setState({ getCodeBtn: true });
    this.props.dispatch({
      type: "user/getCaptcha",
      payload: obj,
      callback: res => {
        // console.log("getCode:", res);
        message.success("我们给你发送了一封邮件，请查收其中的验证码");

        //60秒倒计时
        let countdown = 60;
        this.timer = setInterval(() => {
          countdown--;
          if (countdown <= 0) {
            clearInterval(this.timer);
            this.setState({
              getCodeBtn: false,
              codeBtn: "重新获取"
            });
            countdown = 60;
            return;
          } else {
            this.setState({
              getCodeBtn: true,
              codeBtn: countdown + "s" + " " + "后重新获取"
            });
          }
        }, 1000);
      },
      failCallback: () => {
        this.setState({ getCodeBtn: false });
      }
    });
  };

  // 获取验证码
  getCode = e => {
    // console.log(this.props.tabsKey);
    e.preventDefault();

    this.props.form.validateFields(["email"], (err, values) => {
      // console.log(values);
      if (!err) {
        this.forCode({ send_type: 2, email: values.email });
      }
    });
  };

  // 点击提交
  handleSubmit = e => {
    e.preventDefault();

    //邮箱
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.regRequest({
          email: values.email,
          password: values.password,
          confirm_password: values.confirm,
          captcha: values.VerificationCode
        });
      }
    });
  };

  // 提交请求
  regRequest = obj => {
    this.props.dispatch({
      type: "user/resetPassword",
      payload: obj,
      callback: res => {
        // console.log(res)

        if (res.code === 20000) {
          router.push("/forget/resetSuccess");
        }
      }
    });
  };

  // 组件卸载时清理定时器等
  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { getCodeBtn, codeBtn } = this.state;
    const { loadingCaptcha, loadingReset } = this.props.user;

    return (
      <div className={styles.findPage}>
        <Row className={styles.logo}>
          <img src={logo} alt="" />
        </Row>

        <div className={styles.formMain}>
          <Row style={{ textAlign: "center", marginBottom: 29 }}>
            <span style={{ fontSize: 18, color: " #041f40" }}>
              输入邮箱账号
            </span>
            <br />
            <span style={{ color: "#8494a6" }}>
              请输入要找回密码的邮箱并验证
            </span>
          </Row>

          <Form onSubmit={this.handleSubmit} style={{ maxWidth: 344 }}>
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    validator: this.emailRules
                  }
                ]
              })(
                <AutoComplete size="large" placeholder="请输入邮箱">
                  <Input />
                </AutoComplete>
              )}
            </Form.Item>
            <Form.Item>
              <Row gutter={8}>
                <Col span={15}>
                  {getFieldDecorator("VerificationCode", {
                    rules: [{ required: true, message: "验证码不能为空" }]
                  })(
                    <AutoComplete size="large" placeholder="请输入验证码">
                      <Input />
                    </AutoComplete>
                  )}
                </Col>
                <Col span={9} style={{ textAlign: "right" }}>
                  <Button
                    disabled={getCodeBtn}
                    type="primary"
                    onClick={this.getCode}
                    style={{ width: "100%" }}
                    size="large"
                    loading={loadingCaptcha}
                  >
                    {codeBtn}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "密码不能为空" },
                  {
                    pattern: /^(?!^\d+$)(?!^[A-Z]+$)(?!^[a-z]+$)(?!^[!@#\$%\^&\*_\+\-=,\.\/?;:`"~'\\\(\)\{\}\[\]<>]+$)^[a-zA-Z0-9!@#\$%\^&\*_\+-=,\.\/?;:`"~'\\\(\)\{\}\[\]<>]{6,16}$/,
                    message:
                      "密码必须为数字，大写字母，小写字母，或特殊符号两种或两种以上组成，长度为6至16位"
                  }
                ]
              })(
                <AutoComplete placeholder="请输入密码" size="large">
                  <Input.Password />
                </AutoComplete>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "确认密码不能为空"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <AutoComplete placeholder="请输入确认密码" size="large">
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
                loading={loadingReset}
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create({ name: "forget-email" })(OnEmail);
