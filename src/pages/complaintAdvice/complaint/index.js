import React, { Component, Fragment } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { } from 'antd';
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
    path: '/complaint',
    breadcrumbName: '投诉建议'
  },
  {
    breadcrumbName: '投诉建议列表'
  }
];
@connect(({ complaintList }) => ({ ...complaintList }))
class ComplaintAdvice extends Component {
  state = {};
  componentDidMount() {
    this.props.dispatch({
      type: 'complaintList/getComplaintList',  //getComplaintList请求函数
      payload: {
        pageSize: 5,//每页条数
        page: 1,//页码
      },
      callback: res => {
        console.log(res)
      }
    })
  }
  render() {
    return (
      <Fragment>
        <HeaderLink routes={routes} />
        <List />
      </Fragment>
    );
  }
}

export default ComplaintAdvice;
