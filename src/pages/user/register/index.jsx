import React, { Component } from "react";
import Link from "umi/link";
import router from "umi/router";
import { Row, Col, Form, Icon, Input, Button, Checkbox, Tabs } from "antd";
import EmailReg from "./Email";
import PhoneReg from "./Phone";
import styles from "./index.less";

import userlogo from "@/assets/user-logo.png";
import regpng from "@/assets/register.png";

const { TabPane } = Tabs;

class UserRegister extends Component {
  state = {
    tabsKey: "0"
  };

  tabsChange = key => {
    // console.log(key)
    this.setState({ tabsKey: key });
  };

  render() {
    const regType = ["手机注册", "邮箱注册"];

    return (
      <Row type="flex" style={{ width: "100%", height: "100%" }}>
        <Col style={{ width: 468, height: "100%" }} className={styles.imgBox}>
          <div className={styles.img1}>
            <img src={userlogo} alt="" />
          </div>
          <div className={styles.img2}>
            <img src={regpng} alt="" />
          </div>
        </Col>

        <Col
          style={{ width: 532, height: "100%", position: "relative" }}
          className={styles.logFrom}
        >
          <div className={styles.fromBox}>
            <Tabs
              defaultActiveKey="0"
              animated={false}
              onChange={this.tabsChange}
            >
              {regType.map((type, idx) => (
                <TabPane tab={type} key={idx}>
                  {this.state.tabsKey === "0" ? <PhoneReg /> : <EmailReg />}
                </TabPane>
              ))}
            </Tabs>
          </div>
        </Col>
      </Row>
    );
  }
}

export default UserRegister;
