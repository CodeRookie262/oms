import React, { Component } from "react";
import Link from "umi/link";
import router from "umi/router";
import { Breadcrumb } from "antd";
import { connect } from "dva";
import Iconfont from "@/components/Iconfont";
import styles from "./index.less";

@connect(({}) => ({}))
class HelpHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const routes = [
      {
        path: "/",
        breadcrumbName: "首页"
      },
      // {
      //   path: "/bigScreen",
      //   breadcrumbName: "直播间管理"
      // },
      {
        // path: 'second',
        breadcrumbName: "直播大屏"
      }
    ];
    const itemRender = (route, params, routes, paths) => {
      const last = routes.indexOf(route) === routes.length - 1;
      return last ? (
        <span style={{ color: "#0d6fde" }}>{route.breadcrumbName}</span>
      ) : (
        <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
      );
    };
    return (
      <div
        style={{
          width: "106%",
          height: "25px",
          background: "white",
          margin: "-24px 0 0 -24px",
          padding: "24px"
        }}
      >
        <Breadcrumb itemRender={itemRender} routes={routes} />
      </div>
    );
  }
}

export default HelpHeader;
