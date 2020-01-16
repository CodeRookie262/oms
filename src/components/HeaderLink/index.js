import React, { Component } from 'react';
import Link from 'umi/link';
import styles from './index.less';
import {
  Breadcrumb,
  Button,
  Tabs
} from 'antd';
const { TabPane } = Tabs;
class HelpHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { routes, createBtn, createFinancial } = this.props;
    const itemRender = (route, params, routes, paths) => {
      const last = routes.indexOf(route) === routes.length - 1;
      return last ? (
        <span style={{ color: '#495B70' }}>{route.breadcrumbName}</span>
      ) : (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        );
    };
    return (
      <div className={styles.panel}>
        <Breadcrumb itemRender={itemRender} routes={routes} />
        <div className={styles.title}>
          <span>
            {routes.length > 1 && routes[routes.length - 1].breadcrumbName}
          </span>
          {/* 创建组织按钮 */}
          {createBtn && <Link to="/organizationalManagement/create">
            <Button style={{ width: '118px', height: '40px' }} type="primary" size="large">
              创建组织
            </Button>
          </Link>}
          {createFinancial && <Link to="/financialManagement/create">
            <Button style={{ width: '118px', height: '40px' }} type="primary" size="large">
              创建套餐
            </Button>
          </Link>}
        </div>
      </div>
    );
  }
}

export default HelpHeader;
