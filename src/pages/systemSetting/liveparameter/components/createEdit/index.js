import React, { Component } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';
import { Form, Input, Button, Radio } from 'antd';

class createEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
        }
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
            <div className={styles.remarder}>
                <div className={styles.preparation}>
                    <Form layout={formLayout}>
                        <Form.Item label="Field A" {...formItemLayout}>
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item label="Field B" {...formItemLayout}>
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary">Submit</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
export default createEdit