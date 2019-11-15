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
      {
        path: "/help",
        breadcrumbName: "帮助中心"
      },
      {
        // path: 'second',
        breadcrumbName: "帮助列表"
      }
    ];
    const itemRender = (route, params, routes, paths) => {
      const last = routes.indexOf(route) === routes.length - 1;
      return last ? (
        <span>{route.breadcrumbName}</span>
      ) : (
        <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
      );
    };
    return (
      <div>
        <Breadcrumb itemRender={itemRender} routes={routes} />
      </div>
    );
  }
}

export default HelpHeader;
