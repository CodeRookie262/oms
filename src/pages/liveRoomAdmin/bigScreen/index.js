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
    path: '/bigScreen',
    breadcrumbName: '直播间管理'
  },
  {
    breadcrumbName: '直播大屏'
  }
];
@connect(({ bigScreen }) => ({ ...bigScreen }))
class BigScreen extends Component {
  state = {};
  componentDidMount() {
    this.props.dispatch({
      type: 'bigScreen/getBigSreenList',
      payload: {
        pageSize: 3,
        page: 1,
        key: 2
      }
    });
  }

  render() {
    const { bigSreenList } = this.props;
    return (
      <Fragment>
        <HeaderLink routes={routes} />
        <List currentBigSreenList={bigSreenList} />
      </Fragment>
    );
  }
}

export default BigScreen;
