import React, { Component, Fragment } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';

import HeaderLink from '../../../components/HeaderLink';
import Preview from './components/Preview/index.js'
import createEdit from './components/createEdit/index.js'

const routes = [
    {
        path: '/',
        breadcrumbName: '首页'
    }, {
        path: '/discount',
        breadcrumbName: '系统设置'
    }, {
        breadcrumbName: '直播参数'
    }
];
@connect(({ }) => ({}))
class LiveParaMeter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // status: true,
        }
    }

    render() {
        return (

            <>
                <Fragment>
                    <HeaderLink routes={routes} />
                    {/* {this.state.status ? <Preview /> : <createEdit />} */}

                <Preview></Preview>
                </Fragment>
                {/* < createEdit /> */}
            </>
        );


    }
}
export default LiveParaMeter;