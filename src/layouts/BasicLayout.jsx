/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { SettingDrawer } from "@ant-design/pro-layout";
import React, { useEffect } from "react";
import Link from "umi/link";
import { connect } from "dva";
import { formatMessage } from "umi-plugin-react/locale";
import Authorized from "@/utils/Authorized";
import RightContent from "@/components/GlobalHeader/RightContent";
import { isAntDesignPro } from "@/utils/utils";
import Iconfont from "../components/Iconfont";
import logoSVG from "../assets/logo.svg";
import logoTextSVG from "../assets/logoText.svg";
/**
 * use Authorized check all menu item
 */

const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : []
    };
    return Authorized.check(item.authority, localItem, null);
  });

const footerRender = (_, defaultDom) => {
  return null;
};

const BasicLayout = props => {
  const { dispatch, children, settings } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "settings/getSetting"
      });
    }
  }, []);

  const handleMenuCollapse = payload =>
    dispatch &&
    dispatch({
      type: "global/changeLayoutCollapsed",
      payload
    });

  const logo = (
    <Link to="/live">
      <img
        src={logoSVG}
        style={{
          verticalAlign: "-1.05em",
          width: "2.7em",
          height: "2.7em"
        }}
      />
    </Link>
  );
  const logoText = (
    <Link to="/live">
      <img
        src={logoTextSVG}
        style={{
          width: "5.3em",
          height: "5.3em",
          marginTop: "-0.95em",
          marginLeft: "-5px"
        }}
      />
    </Link>
  );
  return (
    <>
      <ProLayout
        logo={logo}
        title={`英荔播课`}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => {
          return [
            {
              path: "/live",
              breadcrumbName: formatMessage({
                id: "menu.live",
                defaultMessage: "Live"
              })
            },
            ...routers
          ];
        }}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={footerRender}
        menuDataRender={menuDataRender}
        formatMessage={formatMessage}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        {...props}
        {...settings}
      >
        {children}
      </ProLayout>
    </>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings
}))(BasicLayout);
