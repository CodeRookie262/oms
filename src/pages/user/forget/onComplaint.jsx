import React, { Component } from "react";
import Link from "umi/link";
import router from "umi/router";
import { Row, Col, Button } from "antd";
import { connect } from "dva";
import styles from "./index.less";

import logo from "@/assets/logo2.png";

class OnComplaint extends Component {
  state = {};

  render() {
    return (
      <div className={styles.main}>
        <Row className={styles.logo}>
          <img src={logo} alt="" />
        </Row>
        <div className={styles.context}>
          <Row className={styles.title}>账号申诉</Row>
          <div className={styles.describe}>
            <div>
              <Row className={styles.typeTitle}>账号申诉指引</Row>
              <Row className={styles.typeSection}>
                如在需要找回密码时遇到手机丢失或邮箱无法登入等情况无法循正常渠道找回密码，请通过以下方式联系英荔：
              </Row>
            </div>
            <div style={{ margin: "21px 0" }}>
              <Row className={styles.typeTitle}>电子邮箱</Row>
              <Row className={styles.typeSection}>
                通过其他电子邮箱向&nbsp;<span>support@e-ducation.cn</span>
                &nbsp;发送标题为「账号申诉 + 原登录用手机号或邮箱」的电子邮件，
                并附上常用联系方式如电话号码、电子邮箱等，等候客服联系。
              </Row>
            </div>
            <div>
              <Row className={styles.typeTitle}>微信公众号</Row>
              <Row className={styles.typeSection}>
                通过微信添加微信公众号<span>「英荔智库」</span>
                ，在对话框中留言「账号申诉 +
                原登录用手机号或邮箱」，等候客服联系。
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OnComplaint;
