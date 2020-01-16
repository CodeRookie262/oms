import React, { Component } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';
import AstrictInput from '@/components/astrictInput'
import {
  Table,
  Button,
  Icon,
  Pagination,
  Select,
  Input,
  Modal
} from 'antd';
const { Option } = Select;
const { Search } = Input;
@connect(({ }) => ({}))
class HelpList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      page: 1,
      pageSize: 10,
    };
  }
  // 获取组织列表
  getList = () => {

  }

  // 点击冻结
  freezeClick = (item) => {
    Modal.confirm({
      title: '是否确定冻结该组织',
      icon: (
        <Icon
          type="exclamation-circle"
          theme="filled"
          style={{ color: '#faad14' }}
        />
      ),
      okButtonProps: { type: 'danger', ghost: true },
      centered: true,
      content: '该组织仍保留在用户的组织列表中，但任何手机号/邮箱都无法登陆该组织去使用任何功能',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        console.log('删除');

      }
    })
  }

  // 点击删除
  deleteClick = (item) => {
    Modal.confirm({
      title: '是否确定删除该组织',
      icon: (
        <Icon
          type="exclamation-circle"
          theme="filled"
          style={{ color: '#f5222d' }}
        />
      ),
      okButtonProps: { type: 'danger', ghost: true },
      centered: true,
      content: '该组织将会从组织列表中移除，任何手机号/邮箱都无法登陆该组织去使用任何功能',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        console.log('冻结');

      }
    })
  }
  // 选择组织状态改变
  organizationChange = (value) => {
    console.log(value);

  }

  // 选择套餐名称改变
  setMealChange = (value) => {
    console.log(value);

  }

  // 输入框搜索
  searchInput = (value) => {
    console.log(value);

  }

  // 排序
  handleTableChange = (pagination, filters, sorter) => {
    // console.log(sorter);
  }

  // 查看页数改变
  pageChange = (page, pageSize) => {
    this.setState(
      {
        page,
        pageSize
      },
      () => {
        this.getList();
      }
    );
  };

  // 每页展示数量改变
  onShowSizeChange = (current, size) => {
    this.setState(
      {
        page: 1,
        pageSize: size
      },
      () => {
        this.getList();
      }
    );
  };

  // 输入信息
  onInputChange = (value) => {
    console.log(value);

  }
  render() {
    const {
      total,
      page,
      pageSize
    } = this.state;
    // let dataSource = [
    //   {
    //     id: 1,
    //     name: "腾讯",
    //     status: 0,
    //     apply_status: 3,
    //     create_time: "2020-01-09 14:48:43",
    //     update_time: "2020-01-09 14:48:43",
    //     expire_time: null,
    //     setmeal: 'A 套餐',
    //     concurrence: 500,
    //     session: 20
    //   },
    //   {
    //     id: 2,
    //     name: "网易",
    //     status: 1,
    //     apply_status: 3,
    //     create_time: "2020-01-09 14:48:58",
    //     update_time: "2020-01-09 15:06:08",
    //     expire_time: null,
    //     setmeal: '',
    //     concurrence: '',
    //     session: ''
    //   }
    // ]
    // dataSource = dataSource.map((el, i) => {
    //   for (var i in el) {
    //     if (el[i] === "") {
    //       el[i] = "—"
    //     }
    //   }
    //   return el
    // })
    const columns = [
      {
        title: <span style={{ fontWeight: 'bold' }}>组织名称</span>,
        dataIndex: 'name',
        width: 300,
        render: (record, item) => (
          <span className={styles.organizationName}>{item.name}</span>
        )
      },
      {
        title: <span style={{ fontWeight: 'bold' }}>组织状态</span>,
        dataIndex: 'apply_status',
        render: (state, item) => {
          if (item.status === 0) {
            switch (item.apply_status) {
              case 0:
                return (
                  <div>
                    <i className={`${styles.not} ${styles.dot}`} />
                    未认证
                  </div>
                );
              case 1:
                return (
                  <div>
                    <i className={`${styles.bein} ${styles.dot}`} />
                    认证中
                  </div>
                );
              case 2:
                return (
                  <div>
                    <i className={`${styles.Error} ${styles.dot}`} />
                    认证未通过
                  </div>
                );
              case 3:
                return (
                  <div>
                    <i className={`${styles.succeed} ${styles.dot}`} />
                    认证成功
                  </div>
                );
              default:
                return (
                  <div>
                    <i className={`${styles.Error} ${styles.dot}`} />
                    认证失败
                  </div>
                );
            }
          } else if (item.status === 1) {
            return (
              <div>
                <i className={`${styles.freeze} ${styles.dot}`} />
                冻结
              </div>
            );
          } else if (item.status === 2) {
            return (
              <div>
                <i className={`${styles.Error} ${styles.dot}`} />
                已删除
              </div>
            );
          }

        },
      },
      {
        title: <span style={{ fontWeight: 'bold' }}>套餐名称</span>,
        dataIndex: 'setmeal',
      },
      {
        title: <span style={{ fontWeight: 'bold' }}>并发数</span>,
        dataIndex: 'concurrence',
        key: 'concurrence',
        sorter: true,
      },
      {
        title: <span style={{ fontWeight: 'bold' }}>场次</span>,
        dataIndex: 'session',
        key: 'session',
        sorter: true,
      },
      {
        title: <span style={{ fontWeight: 'bold' }}>创建时间</span>,
        dataIndex: 'create_time',
        key: 'create_time',
        sorter: true,
      },
      {
        title: <span style={{ fontWeight: 'bold' }}>操作</span>,
        dataIndex: 'operation',
        render: (record, item) => (
          <div className={styles.operation}>
            <span className={styles.opBlock} >编辑</span>
            丨
              {item.status === 0 &&
              <span className={styles.opBlock} onClick={this.freezeClick.bind(this, item)}>冻结</span>
            }
            {item.status === 1 &&
              <span>
                <span className={styles.opBlock}>解冻</span>
                丨
                  <span className={styles.delete} onClick={this.deleteClick.bind(this, item)}>删除</span>
              </span>
            }
          </div>
        )
      },
    ]
    return (
      <div className={styles.groupListContainer}>
        <div className={styles.groupList}>
          {/* 条件查询 */}
          <div className={styles.conditionQuery}>
            <div className={styles.selectOption}>
              <div>
                <span style={{ fontWeight: '700' }}>组织状态：</span>
                <Select defaultValue="请选择组织状态" style={{ width: '143px', height: '32px' }} onChange={this.organizationChange}>
                  <Option value="全部">全部</Option>
                  <Option value="冻结">冻结</Option>
                  <Option value="未认证">未认证</Option>
                  <Option value="认证中">认证中</Option>
                  <Option value="认证未通过">认证未通过</Option>
                  <Option value="认证成功">认证成功</Option>
                </Select>
              </div>
              <div style={{ marginLeft: '50px' }}>
                <span style={{ fontWeight: '700' }}>套餐名称：</span>
                <Select defaultValue="请选择套餐名称" style={{ width: '143px', height: '32px' }} onChange={this.setMealChange}>
                  <Option value="S 超级会员的套餐">S 超级会员的套餐套餐套餐套餐</Option>
                  <Option value="A 套餐">A 套餐</Option>
                  <Option value="B 套餐">B 套餐</Option>
                </Select>
              </div>
            </div>
            <div>
              <Search
                placeholder="搜索组织名称"
                onSearch={this.searchInput}
                style={{ width: '286px', height: '32px' }}
              />
            </div>
          </div>
          {/* 数据列表 */}
          <div className={styles.organizationList}>
            <Table
              columns={columns}
              // dataSource={dataSource}
              rowKey={(text, record) => text.id}
              pagination={false}
              onChange={this.handleTableChange}
            />
          </div>
          {/* 分页器 */}
          <div className={styles.footer}>
            <div className={styles.footerPage}>
              <Pagination
                defaultCurrent={1}
                defaultPageSize={10}
                pageSizeOptions={['10', '20']}
                current={page}
                onChange={this.pageChange}
                total={total}
                showSizeChanger={true}
                showQuickJumper={true}
                onShowSizeChange={this.onShowSizeChange}
              />
              <span className={styles.footerTotal}>共 {total} 条记录</span>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default HelpList;
