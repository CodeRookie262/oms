import React, { Component } from "react";
import Link from "umi/link";
import router from "umi/router";
import { Row, Col, Button } from "antd";
import { connect } from "dva";
import Iconfont from "@/components/Iconfont";
import styles from "./index.less";

import logo from "@/assets/logo2.png";

class ForgetPassword extends Component {
  render() {
    const listRender = [
      {
        picture: "phonecomplaint",
        type: "已绑定手机号码",
        describe: "可通过手机号码找回",
        path: "/forget/phone"
      },
      {
        picture: "Emailback",
        type: "已绑定邮箱",
        describe: "可通过邮箱地址重设密码",
        path: "/forget/email"
      },
      {
        picture: "Complaintsback",
        type: "账号申诉",
        describe: "联系英荔客服代表",
        path: "/forget/complaint"
      }
    ];

    return (
      <div className={styles.main}>
        <Row className={styles.logo}>
          <img src={logo} alt="" />
        </Row>
        <div className={styles.context}>
          <Row className={styles.title}>找回密码</Row>
          <div className={styles.listBox}>
            {listRender.map((item, index) => (
              <Row className={styles.list} key={index}>
                <Col span={3}>
                  <div className={styles.iconBox}>
                    <Iconfont type={item.picture} className={styles.icon} />
                  </div>
                </Col>
                <Col span={21} className={styles.border}>
                  <Row>
                    <Col span={20} style={{ marginTop: 7 }}>
                      <Row style={{ fontSize: 18, color: "#041f40" }}>
                        {item.type}
                      </Row>
                      <Row style={{ color: "#8494a6", marginBottom: 28 }}>
                        {item.describe}
                      </Row>
                    </Col>
                    <Col span={4} style={{ textAlign: "right" }}>
                      <Link to={item.path}>
                        <Button
                          type="primary"
                          size="large"
                          style={{ width: "100%", marginTop: 9 }}
                        >
                          进入
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ForgetPassword;
