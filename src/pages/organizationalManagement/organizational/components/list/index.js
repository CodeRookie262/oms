import React, { Component } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';
import {
  Table,
  Button,
  Icon,
  Pagination,
  Select,
  Input
} from 'antd';
const { Option } = Select;
const { Search } = Input;
@connect(({ }) => ({}))
class HelpList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  render() {
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
                  <Option value="S 超级会员的套餐">S 超级会员的套餐</Option>
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
        </div>

      </div>
    );
  }
}

export default HelpList;
