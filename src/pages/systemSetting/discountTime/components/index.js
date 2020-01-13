import React, { Component } from 'react';
import {
    Button,
    Table,
    Pagination,
    Modal,
    DatePicker,
    Checkbox,
    TimePicker,
    Select,
    Empty,
    message
}
    from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';
import { browserHistory } from 'react-router';
import moment from 'moment';
const data = [
    {
        number: 'key',
        time: '2018-01-22',
        age: 32,
        address: 'New York No. 1 Lake Park',
    }, {
        number: 'key',
        time: '2018-01-22',
        age: 32,
        address: 'New York No. 1 Lake Park',
    }
]



const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const format = 'HH:mm';
const { Option } = Select;
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};
// week 
// const modal = Modal.info();
const plainOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const optionsData = ['1', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0']
const options = [
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
    { label: 'Sunday', value: 'Sunday' },
];
function onChange(date, dateString) {
    console.log(date, dateString);
}
function handleChange(value) {
    console.log(`selected ${value}`);
}
const success = () => {
    message.success('This is a success message');
};
@connect(({ }) => ({}))
class DiscountTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: '1',
            //等待table数据
            loading: true,
            // 弹窗销毁
            removeLoading: false,
            // datas: []
        };
    }
    // 新增规则
    addRule = () => {
        this.setState({ visible: true })
    }
    // 删除规则

    deleteRule = (index) => {

    }
    // 点击新增的保存按钮
    // ping() {

    //     this.setState({
    //         datas: this.state.datas.push({xinz})
    //     });
    //     //ajax
    // }
    // componentDidMount() {
    //     //data  ajax
    //     this.setState({
    //         datas: data
    //     })
    // }

    // 删除选中的规则
    deleteSelected = () => {
        const modal = Modal.confirm();
        modal.update({
            title: '是否确定删除选中的规则',
            content: '删除选中的规则后，该规则会立即失效，但不会影响已经根据原规则创建好的直播间。',
            centered: true,
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            mask: true,
            onOk: () => {
                message.success(<div>23333</div>);
                this.setState({
                    loading: true,
                    visible: false,
                });

            }
        });

        // modal.destroy();
        // browserHistory.listen(() => {
        //     Modal.destroyAll();
        // });
    }
    // 新增规则
    newRule = () => {
        let startTime = document.getElementsByClassName('start_time')[0]
        console.log(startTime)
    }
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'number',
                render: text => <a>{text}</a>,
            },
            {
                title: '有效期',
                dataIndex: 'time',
            },
            {
                title: '生效日',
                dataIndex: 'effective_date',
            }, {
                title: '优惠时段',
                dataIndex: 'discount_data'
            }, {
                title: '场次扣除次数',
                dataIndex: 'session'
            }, {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) => (
                    <span>
                        <Button type="primary">编辑</Button>
                        <Button type="primary" onClick={this.deleteRule(index)}>删除</Button>
                    </span>
                )
            }
        ];
        const { visible, loading } = this.state;
        return (
            <div className={styles.discountTable}>
                <div className={styles.discount_item}>
                    <Button type="primary" onClick={this.addRule}>新增规则</Button>
                    <Button type="primary" onClick={this.deleteSelected}>删除选中的规则</Button>
                    {/* {this.state.data ? <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.datas} pagination={false} /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />} */}
                    {this.state.data ? <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}

                    <Modal
                        visible={visible}
                        className={styles.customModal}
                        onCancel={this.handleCancel}
                        maskClosable={true}
                        closable={false}
                        footer={null}
                        width={700}
                    >
                        <div className={styles.addModal}>
                            <h2>新增规则</h2>
                            <div className={styles.limitedTime}>
                                <span>有效期:</span>
                                <RangePicker onChange={onChange} />
                            </div>
                            <div className={styles.effectDate}>
                                <span>生效日:</span>
                                <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
                            </div>
                            <div className={styles.discountTime}>
                                <span>优惠时段:</span>
                                <TimePicker format={format} placeholder="开始时间" className='start_time' />~
                                <TimePicker format={format} placeholder="结束时间" />
                            </div>
                            <div className={styles.relNumber}>
                                <span>扣除基数:</span>
                                <Select style={{ width: 120 }} onChange={handleChange} placeholder="请选择场次扣除基数">
                                    {
                                        optionsData.length && optionsData.map((item, index) => (
                                            <Select.Option key={index} value={item}>{item}</Select.Option>)
                                        )
                                    }
                                </Select>
                            </div>
                            <div className={styles.footer}>
                                <Button type="primary" onClick={this.newRule}>新增</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div >
        )
    }
}
export default DiscountTable