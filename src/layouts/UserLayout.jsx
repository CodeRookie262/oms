// import { getMenuData, getPageTitle } from "@ant-design/pro-layout";
import DocumentTitle from "react-document-title";
import Link from "umi/link";
import React from "react";
import { connect } from "dva";
import { formatMessage } from "umi-plugin-react/locale";
import DefaultFooter from "@/components/DefaultFooter";
import styles from "./userLayout.less";

const UserLayout = props => {
  const {
    route = {
      routes: []
    }
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: ""
    }
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
      <DefaultFooter />
    </div>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
