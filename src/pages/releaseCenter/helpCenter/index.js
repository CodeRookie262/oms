import React, { Component, Fragment } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import {} from 'antd';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';

import HeaderLink from '../../../components/HeaderLink';
import List from './components/list';

const routes = [
  {
    path: '/',
    breadcrumbName: '首页'
  },
  {
    path: '/help',
    breadcrumbName: '帮助中心'
  },
  {
    breadcrumbName: '帮助列表'
  }
];
@connect(({}) => ({}))
class HelpCenter extends Component {
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

export default HelpCenter;
