import React, { Component } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { Table } from 'antd';
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
class HelpList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default HelpList;
