import React, { Component, Fragment } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { Modal, Button, Icon, message } from 'antd';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';

import HeaderLink from '../../../components/HeaderLink';
import List from './components/list';
import Operation from './components/list/operation';

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
    breadcrumbName: '套餐列表'
  }
];
@connect(({ financial }) => ({ ...financial }))
class Finacial extends Component {
  state = {};

  componentWillMount() {
    // 发起数据请求
    this.fetchFinancial({ page: 1, page_size: 30 })
  }


  fetchFinancial = ({ page = 1, page_size = 10 }) => {
    this.props.dispatch({
      type: 'financial/getList',
      // 这里填写的是参数
      payload: { page, page_size },
      callback: list => {
        this.setState({
          total: list.total || 0,
          dataSource: (list.data || []).map((item, index) => ({
            ...item,
            package_name: <Link to={`/financialManagement/detail/${item.id}`} className={styles.financial_link}>{item.package_name}</Link>,
            is_active: item.is_active ? '开启' : '关闭',
            single_duration: '45分钟',
            limit_number: item.is_number_limit ? item.limit_number : '无限制',
            expiration_time: !item.is_expiration ? '无限制' : `${item.expiration_time || '-'}${item.expiration_time_unit == 1 ? '年' : (item.expiration_time_unit == 2 ? '月' : '日')}`,
            operation: <Operation
              id={'id'}
              index={index}
              id={item.id}
              discord={this.handleDiscard}
              edit={this.handleEdit} />
          }))
        })
      }
    });
  }

  handleDiscard = (id, index) => {
    Modal.confirm({
      className: styles.customSelect,
      type: 'error',
      icon: <Icon type="exclamation-circle" />,
      title: '是否确认删除改套餐',
      content: '删除该套餐不会影响已分配该套餐的组织使用',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        let { dataSource } = this.state;

        this.props.dispatch({
          type: 'financial/deleteList',
          payload: {
            id: id
          },
          callback: (res) => {
            if (res.code == 20000) {
              message.success('套餐删除成功');

              dataSource.splice(index, 1)
              this.setState({
                dataSource: dataSource.map((_, i) => ({
                  ..._, key: i, operation: <Operation
                    index={i}
                    id={_.id}
                    discord={this.handleDiscard}
                    edit={this.handleEdit} />
                }
                ))
              })
            } else {
              message.error('套餐删除失败,请重试');
            }
          }
        })
      },
      style: {
        marginTop: 150
      }
    });
  }

  handleEdit = (id, index) => {

  }

  render() {
    let { dataSource = [], list = [], total = 0 } = this.state;

    return (
      <Fragment>
        <HeaderLink routes={routes} type="financial" createFinancial={true} />
        <List dataList={dataSource} total={total} fetchList={this.fetchFinancial} />
      </Fragment>
    );
  }
}

export default Finacial;
