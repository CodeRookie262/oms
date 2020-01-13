import React, { Component, Fragment } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { } from 'antd';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';

import HeaderLink from '../../../components/HeaderLink';
import List from './components/index.js';

const routes = [
    {
        path: '/',
        breadcrumbName: '首页'
    }, {
        path: '/list',
        breadcrumbName: '系统日志'
    }, {
        breadcrumbName: '操作日志'
    }
];
// @connect(({ operationJournal }) => ({ ...operationJournal }))//关联modal
class OperationJournal extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    // componentDidMount() {
    //     this.props.dispatch({
    //         type: 'operationJournal/getOperationJournal',
    //         payload: {
    //             pageSize: 5,
    //             page: 1
    //         },
    //         callback: res => {
    //             console.log(res)
    //         }
    //     });
    // }
    render() {
        return (
            <Fragment>
                <HeaderLink routes={routes} />
                <List />
            </Fragment>
        );
    }
}
export default OperationJournal;