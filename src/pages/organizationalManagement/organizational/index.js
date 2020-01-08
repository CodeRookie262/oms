import React, { Component } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';
import HeaderLink from '../../../components/HeaderLink';
import List from './components/list/index.js';

import {
  Tabs
} from 'antd';
const { TabPane } = Tabs;
const routes = [
  {
    path: '/',
    breadcrumbName: '首页'
  },
  {
    path: '/list',
    breadcrumbName: '组织'
  },
  {
    breadcrumbName: '组织列表'
  }
];
@connect(({ }) => ({}))
class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <HeaderLink routes={routes} createBtn='create' />
        <div className={styles.tabsContainer}>
          <Tabs
            defaultActiveKey="1"
          >
            <TabPane tab="现存组织" key="1">
              <List />
            </TabPane>
            <TabPane tab="已删除组织" key="2">
              已删除组织
            </TabPane>
          </Tabs>
        </div>

      </div>
    );
  }
}

export default Organization;
