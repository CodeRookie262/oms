import React, { Component, Fragment } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { Button } from 'antd';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';

import HeaderLink from '../../../components/HeaderLink';
import Discount from './components/index.js'
const routes = [
    {
        path: '/',
        breadcrumbName: '首页'
    }, {
        path: '/discount',
        breadcrumbName: '系统设置'
    }, {
        breadcrumbName: '优惠时段'
    }
];
@connect(({ }) => ({}))
class DiscountTime extends Component {
    state = {};

    componentWillMount() {
        this.setState({
            data: Array(30).fill(0).map((_, i) => ({
                order: parseInt(Math.random() * 10000) + 59,
                expiration_date: '有效期' + i,
                effective_date: '生效期' + i,
                discount_period: '优惠时段' + i,
                discount: 0.04 * i,
                operating: (
                    <div className="operating">
                        <span className="rewrite">修改</span> |
                        <span>删除</span>
                    </div>),
                isCheck: i % 2
            }))
        })
    }

    //新增规则
    handleAddRule = () => {
        console.log('准备新增规则')

    }
    render() {
        const { data } = this.state;
        return (
            <Fragment>
                <HeaderLink routes={routes} button={<Button type="primary" onClick={this.handleAddRule}>新增规则</Button>} />
                <Discount data={data} />
            </Fragment>
        );


    }
}
export default DiscountTime;