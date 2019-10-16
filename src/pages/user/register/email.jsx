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
  message,
  Modal,
  AutoComplete
} from "antd";
import { connect } from "dva";
import styles from "./index.less";
import regSuccess from "@/assets/success.png";

@connect(({ user }) => ({
  user
}))
class EmailReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getCodeBtn: true,
      codeBtn: "获取验证码",
      isChecked: false,
      seconds: 3
    };
    this.timer = null;
  }

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
    e.preventDefault();

    this.props.form.validateFields(["email"], (err, values) => {
      console.log(values);
      if (!err) {
        this.forCode({ send_type: 1, email: values.email });
      }
    });
  };

  CheckboxChange = e => {
    // console.log(e.target.checked)
    this.setState({ isChecked: e.target.checked });
  };

  // 注册请求
  regRequest = obj => {
    this.props.dispatch({
      type: "user/userRegister",
      payload: obj,
      callback: res => {
        // console.log(res);

        if (res.code === 20000) {
          //3秒倒计时跳转
          let secondsToGo = 3;
          const modal = Modal.success({
            width: 433,
            content: (
              <div className={styles.SuccessModal}>
                <Row>
                  <img src={regSuccess} alt="" />
                </Row>
                <Row className={styles.tip}>账号创建成功</Row>
                <Row>
                  你现在可以使用此账号登录了。
                  <span style={{ color: "#0d6fde" }}>{secondsToGo}</span>
                  &nbsp;秒后自动跳转
                </Row>
              </div>
            ),
            centered: true,
            okText: "立即登录",
            onOk: () => {
              router.push("/user/login");
            }
          });
          const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
              content: (
                <div className={styles.SuccessModal}>
                  <Row>
                    <img src={regSuccess} alt="" />
                  </Row>
                  <Row className={styles.tip}>账号创建成功</Row>
                  <Row>
                    你现在可以使用此账号登录了。
                    <span style={{ color: "#0d6fde" }}>{secondsToGo}</span>
                    &nbsp;秒后自动跳转
                  </Row>
                </div>
              )
            });
          }, 1000);
          this.timeOuter = setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
            router.push("/user/login");
          }, secondsToGo * 1000);
        }
      }
    });
  };

  // 点击注册
  handleSubmit = e => {
    e.preventDefault();
    //邮箱注册
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

  // 组件卸载时清理定时器等
  componentWillUnmount() {
    this.timeOuter && clearTimeout(this.timeOuter);
    this.timer && clearInterval(this.timer);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { getCodeBtn, codeBtn, isChecked } = this.state;
    const { loadingCaptcha, loadingRegister } = this.props.user;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
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
            disabled={isChecked === false ? true : false}
            loading={loadingRegister}
          >
            立即注册
          </Button>
        </Form.Item>

        <Row gutter={8} style={{ marginTop: "-16px" }}>
          <Col span={16}>
            <Checkbox onChange={this.CheckboxChange} defaultChecked={isChecked}>
              我已阅读并接受<a>《用户协议》</a>
            </Checkbox>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            已经有账号？
            <Link to="/user/login">去登录</Link>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create({ name: "register-email" })(EmailReg);
