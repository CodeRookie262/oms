import React, { Component } from 'react';
import Link from 'umi/link';
import Operation from './operation.js'
import router from 'umi/router';
import { Table } from 'antd';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import style from './index.less';


const columns = [
  {
    title: '套餐名称',
    width: 200,
    dataIndex: 'package_name',
    key: 'package_name'
  },
  {
    title: '开启状态',
    dataIndex: 'is_active',
    key: 'is_active'
  },
  {
    title: '场次数',
    dataIndex: 'limit_number',
    key: 'limit_number'
  },
  {
    title: '参考价',
    width: 150,
    dataIndex: 'suggested_price',
    key: 'suggested_price'
  },
  {
    title: '售价',
    width: 150,
    dataIndex: 'selling_price',
    key: 'selling_price'
  },
  {
    title: '有效期限',
    dataIndex: 'expiration_time',
    key: 'expiration_time'
  },
  {
    title: '单场时长',
    dataIndex: 'single_duration',
    key: 'single_duration'
  },
  {
    title: '单场人数',
    dataIndex: 'single_num',
    key: 'single_num'
  },
  {
    title: '操作',
    width: 120,
    dataIndex: 'operation',
    key: 'operation'
  }

].map(item => ({ ...item, align: 'center' }));

@connect(({ }) => ({}))
class HelpList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.dataList
    }
  }

  componentDidUpdate() {
    const showTotal = document.querySelector(".ant-pagination-total-text");
    if (!showTotal) return;
    showTotal.style.marginLeft = '20px';
    showTotal.parentNode.append(showTotal)
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps, 9900)
    return {
      dataSource: nextProps.dataList,
      total: nextProps.total
    }
  }

  render() {
    const { dataSource, total } = this.state;
    return (
      <div className={style.financial}>
        <Table
          rowKey={(text, record) => text.id}
          className={style['ant-table-wrapper']}
          dataSource={dataSource}
          scroll={{ y: '560px' }}
          columns={columns} pagination={{
            total: total || dataSource.length || 0,
            showSizeChanger: true,
            showQuickJumper: true,
            hideOnSinglePage: true,
            defaultPageSize: 30,
            onChange: (page, page_size) => this.props.fetchList({ page, page_size }),
            onShowSizeChange: (page, page_size) => this.props.fetchList({ page, page_size }),
            showTotal: (total, range) => ` 共 ${total} 条数据`
          }}
        />
      </div>
    );
  }
}

export default HelpList;
