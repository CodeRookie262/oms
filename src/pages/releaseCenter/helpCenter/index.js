import React, { Component, Fragment } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import {} from 'antd';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';

import Header from './components/release';
import List from './components/list';

@connect(({}) => ({}))
class HelpCenter extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <Header />
        <List />
      </Fragment>
    );
  }
}

export default HelpCenter;
