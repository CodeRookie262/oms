import React, { Component, Fragment } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { } from 'antd';
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
    render() {
        return (
            <Fragment>
                <HeaderLink routes={routes} />
                <Discount />
            </Fragment>
        );


    }
}
export default DiscountTime;