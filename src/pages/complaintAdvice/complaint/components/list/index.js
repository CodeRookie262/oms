import { Table, Tag, Divider, Pagination, Input, Modal, Button } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './index.less';


const data = [
    {
        key: '1',
        category: '产品建议',
        description: '我不太喜欢',
        phone: '',
        contact: '18277567750',
        submitter: 'yao先生',
        time: '2019-12-24 10:24:56',
        // operation: '查看详情'
    }, {
        key: '2',
        category: '产品建议',
        description: '我不太喜欢',
        phone: '',
        contact: '18277567750',
        submitter: '谢先生',
        time: '2019-12-24',
        // operation: '查看详情'
    }, {
        key: '3',
        category: '产品建议',
        description: '我不太喜欢',
        phone: '',
        contact: '18277567750',
        submitter: '谢先生',
        time: '2019-12-24',
        // operation: '查看详情'
    }
];

// 分页事件

@connect(({ }) => ({}))

class ComplaintAdvice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            pageSize: 10,//分页查询
            imgList: [1, 2]
        };
    }
    // componentWillMount(){ 
    //     index:0,
    //     dataSource:Array(100)
    // }
    handleCancel = () => {
        this.setState({ visible: false })
    }
    //翻页事件
    onShowSizeChange(current, pageSize) {
        console.log(current, pageSize);
    }
    // 显示弹窗
    showModal = e => {
        this.setState({ visible: true })
        let data_id = e.target.parentElement.children[0].getAttribute('data-id')//获取每行的索引
        console.log(data_id);
    }

    render() {
        const columns = [
            {
                title: '类别',
                dataIndex: 'category',
                key: 'name',
                width: 109

            },
            {
                title: '描述',
                dataIndex: 'description ',
                key: 'description',
                width: 259,
                render: (text, item) => (
                    <p className={styles.ant_description} >hsddddddddddddddddddddddddddddddddddddddddd</p>
                )
            },
            {
                title: '图片',
                dataIndex: 'phone',
                key: 'phone',
                width: 83
            },
            {
                title: '联系方式',
                key: 'contact',
                dataIndex: 'contact',
                width: 163

            }, {
                title: '提交账号',
                dataIndex: 'submitter',
                key: 'submitter',
                width: 154
            },
            {
                title: '提交时间',
                dataIndex: 'time',
                key: 'time',
                width: 180
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                width: 88,
                render: (text, record, index) => (//当前行的值，当前行数据，行索引
                    <span className={styles.operation_item} onClick={this.showModal} data-id={index}>查看详情</span>
                )
            }
        ];
        const { visible, loading } = this.state;
        return (
            <div className={styles.table}>
                <div className={styles.complaintAdvice}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        rowKey={record => record.id}
                        className={styles.complaintAdvice_table}
                    />
                    <div className={styles.footer}>
                        <Pagination
                            defaultCurrent={1}
                            defaultPageSize={2}
                            pageSizeOptions={['2']}
                            // total={list.count}
                            // current={page}
                            // onChange={this.pageChange}
                            showSizeChanger={true}
                            showQuickJumper={true}
                            onShowSizeChange={this.onShowSizeChange}
                            className={styles.pagination}
                        />
                        <span className={styles.footer_all}> 共    条记录</span>
                    </div>

                    <Modal
                        visible={visible}
                        className={styles.customModal}
                        onCancel={this.handleCancel}
                        width={639}
                        footer={null}
                    >
                        <div className={styles.customModal_item}>
                            <p className={styles.customModal_title}>投诉建议详情</p>
                            <div className={styles.ping}>
                                <div className={styles.customModal_type} >
                                    <span>类别:</span>
                                    <span>&nbsp;&nbsp;</span>
                                </div>
                                <div className={styles.customModal_description}>
                                    <span>描述:</span>
                                    <span></span>
                                </div>
                                <div className={styles.customModal_phone}>
                                    <span>联系方式:</span>
                                    <span></span>
                                </div>
                                <div className={styles.customModal_account}>
                                    <span>提交账号:</span>
                                    <span></span>
                                </div>
                                <div className={styles.customModal_time}>
                                    <span>提交事件:</span>
                                    <span></span>
                                </div>
                                <div className={styles.customModal_photo}>
                                    {/* {this.state.imgList?{this.state.imgList.map((item, index) => {
                                         <div>
                                            <img src="item" key={index}/>
                                         </div>
                                    })}:''}; */}

                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>

        )
    }
}
export default ComplaintAdvice