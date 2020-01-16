import React, { Component, Fragment } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { Modal, Button, Icon } from 'antd';
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
    path: '/list',
    breadcrumbName: '套餐'
  },
  {
    breadcrumbName: '创建套餐'
  }
];
@connect(({ }) => ({}))
class Finacial extends Component {
  state = {};


  render() {
    let { data = {} } = this.state;

    return (
      <Fragment>
        <HeaderLink routes={routes} type="financial" />
        <List dispatch={this.props.dispatch} success={() => this.props.history.push('/financialManagement/list/')} />
      </Fragment>
    );
  }
}

export default Finacial;
