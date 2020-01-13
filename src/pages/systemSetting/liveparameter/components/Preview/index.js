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

                    {
                        this.state.status ?
                            <div className={styles.NotEdit}>
                                < div className={styles.all_concurrency}>
                                    <span className={styles.concurrency_item}>全场最大并发数&nbsp;:</span>
                                    <span>2000</span>
                                </div>
                                <div className={styles.single_concurrency}>
                                    <span className={styles.concurrency_item}>单场最大并发数&nbsp;:</span>
                                    <span>2000</span>
                                </div>
                                <div className={styles.single_concurrency}>
                                    <span className={styles.concurrency_item}>允许提前开播最大分钟数&nbsp;:</span>
                                    <span>2000</span>
                                </div>
                                <div className={styles.editBtn}>
                                    <Button type="primary" onClick={this.handleEdit}>编辑</Button>
                                </div>
                            </div> :
                            <div className={styles.creactEdit}>
                                <Form layout={formLayout}>
                                    <Form.Item label="Field A" {...formItemLayout}>
                                        <Input placeholder="input placeholder" />
                                    </Form.Item>
                                    <Form.Item label="Field B" {...formItemLayout}>
                                        <Input placeholder="input placeholder" />
                                    </Form.Item>
                                    <Form.Item {...buttonItemLayout}>
                                        <Button type="primary" onClick={this.handleSave}>保存</Button>
                                        <Button type="primary" onClick={this.handleBack}>返回</Button>
                                    </Form.Item>
                                </Form>
                            </div>

                    }
                </div >
            </div >
        )
    }
}
export default Preview