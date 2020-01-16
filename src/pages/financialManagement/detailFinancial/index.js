import React, { Component, Fragment } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { Modal, Button, Icon, message } from 'antd';
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
    breadcrumbName: '套餐详情'
  }
];
@connect(({ }) => ({}))
class Finacial extends Component {
  state = {};

  componentWillMount() {
    // console.log(this.props.match.params, '套餐详情')

    this.props.dispatch({
      type: 'financial/getDetail',
      payload: this.props.match.params || {},
      callback: res => {
        // console.log(res, '套餐详情')
        if (res.code == 20000) {
          message.success('获取套餐详情成功')
          this.setState({ data: res.data })
        } else {
          message.error('加载套餐失败')
        }
      }
    })
  }

  render() {
    let { data = {} } = this.state;

    return (
      <Fragment>
        <HeaderLink routes={routes} type="financial" />
        <List data={data} />
      </Fragment>
    );
  }
}

export default Finacial;
