import React, { Component, Fragment } from "react";
import Link from "umi/link";
import router from "umi/router";
import {} from "antd";
import { connect } from "dva";
import Iconfont from "@/components/Iconfont";
import styles from "./index.less";

import Header from "./components/link";
import List from "./components/list";

@connect(({ bigScreen }) => ({ ...bigScreen }))
class HelpCenter extends Component {
  state = {};
  componentDidMount() {
    this.props.dispatch({
      type: "bigScreen/getBigSreenList",
      payload: {
        pageSize: 1000,
        page: 1,
        key: 2
      }
    });
  }

  render() {
    const { bigSreenList } = this.props;
    return (
      <Fragment>
        <div>
          <Header />
        </div>
        <div
          style={{
            background: "white",
            marginLeft: "-24px",
            padding: "15px 24px",
            fontSize: "20px",
            color: "#2e313c",
            fontFamily: "PingFangSC-Medium"
          }}
        >
          直播大屏
        </div>
        <List currentBigSreenList={bigSreenList} />
      </Fragment>
    );
  }
}

export default HelpCenter;
