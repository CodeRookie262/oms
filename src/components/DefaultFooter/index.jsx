import React, { Component } from 'react';
import { Row, Col, Select } from 'antd';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';

const { Option } = Select;

class DefaultFooter extends Component {
    state = {

    }

    handleChange = (value) => {
        console.log(value)
    }

    render() {
        const list = [
            { name: '关于我们' },
            { name: '联系我们' },
            { name: '使用帮助' },
            { name: '开放平台' },
            { name: '更新日志' }
        ];

        return (
            <div className={styles.defaultFooter}>
                <Row className={styles.footerContent}>
                    <Col span={20} className={styles.col}>
                        <Row style={{ flex: 1 }}>
                            {
                                list.map((item, index) => (
                                    <span key={index} className={styles.hoverCol}>{item.name}</span>
                                ))
                            }
                        </Row>
                        <Row style={{ flex: 1, marginTop: '2%' }}>
                            Copyright © 2018-2019 广东英荔国际教育科技有限公司  粤ICP备13044168号-7 增值电信业务经营许可证：B2-20191904
                        </Row>
                    </Col>
                    <Col span={4} style={{ height: '100%', textAlign: 'right', padding: '34px 0', boxSizing: 'border-box' }} className={styles.col2}>
                        <Select
                            defaultValue="0"
                            style={{ width: 135 }}
                            onChange={this.handleChange}
                            size="large"
                        >
                            <Option value="0"><Iconfont type='language' className={styles.icon} />简体中文</Option>
                            <Option value="1"><Iconfont type='language' className={styles.icon} />English</Option>
                        </Select>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DefaultFooter
