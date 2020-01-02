import React, { Component } from 'react';
import Link from 'umi/link';
import { Breadcrumb, Button } from 'antd';
import styles from './index.less';

class HelpHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { routes, type } = this.props;
    console.log('type======', type);
    const itemRender = (route, params, routes, paths) => {
      const last = routes.indexOf(route) === routes.length - 1;
      return last ? (
        <span style={{ color: '#0d6fde' }}>{route.breadcrumbName}</span>
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
          <span className={styles.btn}>
            {type && type === 'organization' ? (
              <Link to="/organizationalManagement/create">
                <Button type="primary" size="large">
                  创建组织
                </Button>
              </Link>
            ) : null}
          </span>
        </div>
      </div>
    );
  }
}

export default HelpHeader;
