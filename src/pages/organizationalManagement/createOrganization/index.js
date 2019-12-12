import React, { Component, Fragment } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import {} from 'antd';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';

import HeaderLink from '../../../components/HeaderLink';
import List from './components/list/index.js';

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
    breadcrumbName: '创建组织'
  }
];
@connect(({}) => ({}))
class Organization extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <HeaderLink routes={routes} />
        <List />
      </Fragment>
    );
  }
}

export default Organization;
