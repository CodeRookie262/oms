import React, { Component } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';
import { Form, Input, Button, Radio } from 'antd';
class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: true,
            formLayout: 'horizontal',
            // 全场最大并发数
            all_max_concurrence: '',
            // 单场最大并发数
            // single_max_concurrence,
            // 
        }
    }
    // 编辑数据
    handleEdit = () => {
        this.setState({
            status: false
        })
        // console.log(111)
    }
    handleSave = () => {
        this.setState({
            status: true
        })
    }
    handleFormLayoutChange = e => {
        this.setState({ formLayout: e.target.value });
    };
    // handleEdit = () => {

    // }
    render() {
        const { formLayout } = this.state;
        const formItemLayout =
            formLayout === 'horizontal'
                ? {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                }
                : null;
        const buttonItemLayout =
            formLayout === 'horizontal'
                ? {
                    wrapperCol: { span: 14, offset: 4 },
                }
                : null;
        return (
            <div className={styles.liveparameter}>
                <div className={styles.explanation}>
                    <div className={styles.preview_title}>
                        <span className={styles.preview_item}>降低参数会对所有用户生效，请关注对现有套餐的影响以便通知客户。</span>
                    </div>
                    <div className={styles.NotEdit}>
                        < div className={styles.all_concurrency}>
                            <span className={styles.concurrency_item}>全场最大并发数&nbsp;:</span>
                            <span>2000</span>
                        </div>
                        <div className={styles.single_concurrency}>
                            <span className={styles.concurrency_item}>单场最大并发数&nbsp;:</span>
                            <span>2000</span>
                        </div>

                        <div className={styles.extent_live_time}>
                            <span className={styles.concurrency_item}>允许提前开播最大分钟数&nbsp;:</span>
                            <span>2000</span>
                        </div>
                        <div className={styles.extent_live_time}>
                            <span className={styles.concurrency_item}>允许延迟下播最大分钟数&nbsp;:</span>
                            <span>2000</span>
                        </div>
                        <div className={styles.extent_live_time}>
                            <span className={styles.concurrency_item}>预约最小间隔分钟数&nbsp;:</span>
                            <span>2000</span>
                        </div>
                        <div className={styles.extent_live_time}>
                            <span className={styles.concurrency_item}>回放存储最大天数&nbsp;:</span>
                            <span>2000</span>
                        </div>
                        <div className={styles.extent_live_time}>
                            <span className={styles.concurrency_item}>允许提前进入直播间分钟数&nbsp;:</span>
                            <span>2000</span>
                        </div>
                        <div className={styles.extent_live_time}>
                            <span className={styles.concurrency_item}>取消免责最大小时数&nbsp;:</span>
                            <span>72</span>
                            <span className={styles.reminder}>(距离预定开播时间大于72小时，客户可以删除该直播间，场次数全额返还。)</span>
                        </div>
                        <br />
                        <div className={styles.editBtn}>
                            <Link to="/systemSetting/liveParameter/createEdit">
                                <Button type="primary" onClick={this.handleEdit}>编辑</Button>
                            </Link>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}
export default Preview