import React, { Component } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { Breadcrumb } from 'antd';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  },
  {
    key: '2',
    name: '吴彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  }
];
@connect(({}) => ({}))
class HelpHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const routes = [
      {
        path: '/',
        breadcrumbName: '发布管理中心'
      },
      {
        path: '/',
        breadcrumbName: '帮助中心'
      },
      {
        // path: 'second',
        breadcrumbName: '帮助列表'
      }
    ];
    const itemRender = (route, params, routes, paths) => {
      const last = routes.indexOf(route) === routes.length - 1;
      return last ? (
        <span>{route.breadcrumbName}</span>
      ) : (
        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
      );
    };
    return (
      <div>
        <Breadcrumb itemRender={itemRender} routes={routes} />
      </div>
    );
  }
}

export default HelpHeader;
