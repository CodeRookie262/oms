import React, { Component, useCallback } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { Table, DatePicker, Select, Input, Pagination } from 'antd';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';
import event from '../../eventdetail/index'


const { Search } = Input;
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dataSource = [
    {
        key: '1',
        id: '123456',
        phone: '18277567750',
        nickname: '胡彦斌',
        time: '2019-01-04 17:16:45',
        type: '登录',
        event: '事件ID2500000'
    },
    {
        key: '2',
        id: '123457',
        phone: '13444444444',
        nickname: '天气之子',
        time: '2019-01-02 17:16:45',
        type: '新增',
        event: '事件ID2500340'
    }, {
        key: '3',
        id: '123457',
        phone: '13444444444',
        nickname: '天气之子',
        time: '2019-01-02 17:16:45',
        type: '新增',
        event: '事件ID2500340'
    }, {
        key: '4',
        id: '123457',
        phone: '13444444444',
        nickname: '天气之子',
        time: '2019-01-02 17:16:45',
        type: '新增',
        event: '事件ID2500340'
    }, {
        key: '5',
        id: '123457',
        phone: '13444444444',
        nickname: '天气之子',
        time: '2019-01-02 17:16:45',
        type: '修改',
        event: '事件ID2500340'
    }
];

const columns = [
    {
        title: '操作人ID',
        dataIndex: 'id',
        key: 'id',
        width: '80'
    },
    {
        title: '操作人手机号',
        dataIndex: 'phone',
        key: 'phone',
        width: '156'
    },
    {
        title: '操作人昵称',
        dataIndex: 'nickname',
        key: 'nickname',
        width: '198'
    }, {
        title: '操作时间',
        dataIndex: 'time',
        key: 'time',
        width: '103',
        render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm')}</span>
    }, {
        title: '事件类型',
        dataIndex: 'type',
        key: 'type',
        width: '121'
    }, {
        title: '事件',
        dataIndex: 'event',
        key: 'event',
        width: '169'
    }
];

@connect(({ operationJournal }) => ({ ...operationJournal }))
class OperationJournal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageSize: 5,
            laiXing: ''

        };
    }
    // 请求列表
    componentDidMount() {
        this.props.dispatch({
            type: 'operationJournal/getOperationJournalList',
            payload: {
                page: 1,
                pageSize: 5
            },
            callback: res => {
                console.log(res)
            }
        })
    }
    搜索
    // handleSearch = value => {
    //     console.log(value);
    //     const { page, pageSize } = this.state
    //     let search = value;
    //     this.props.dispatch({
    //         type: 'searchList/getSearchList',
    //         payload: {
    //             page:1,
    //             pageSize:5,
    //             // search
    //         },
    //         callback: res => {
    //             console.log(res);
    //         //     // // console.log('get====', res);
    //         //     // this.setState({ list_data: res });
    //         }
    //     })

    // }
    // 列表跳详页
    handleDetail = () => {
        console.log(111)
    }
    handleSelect = (value) => {
        console.log(value)
        this.setState({
            laiXing: value
        });
        //请求ajax

    }
    render() {
        return (
            <div className={styles.componentJournal}>
                <div className={styles.operation} >
                    <div className={styles.operation_top}>
                        <div className={styles.dataSelect}>
                            <span>事件类型:</span>
                            <Select
                                className={styles.operation_select}
                                showSearch
                                style={{ width: 200 }}
                                placeholder="事件类型"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onSelect={this.handleSelect}
                            >
                                <Option value="全部">全部</Option>
                                <Option value="登录">登录</Option>
                                <Option value="退出">退出</Option>
                                <Option value="increased">新增</Option>
                                <Option value="change">修改</Option>
                                <Option value="delete">删除</Option>
                            </Select>
                        </div>

                        <div className={styles.dataPicker}>
                            <span>时间范围:</span>
                            <RangePicker
                                defaultValue={[moment('2010/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                                format={dateFormat}
                            />
                        </div>
                        <div className={styles.dataSearch}>
                            <Search
                                placeholder="操作人手机号码"
                                onSearch={value => this.handleSearch(value)}
                                style={{ width: 200 }}
                                className={styles.operation_search}
                            />
                        </div>
                    </div>
                    <div className={styles.operation_bottom}>
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            className={styles.operation_list}
                            pagination={false}
                            rowKey={record => record.id}
                            onRow={(record, item) => {
                                return {
                                    onClick: event => {
                                        event.persist()
                                        router.push(`/systemJournal/eventDetail/${item}`);
                                    }, // 点击行
                                };
                            }}
                        // onClick={this.handleDetail}
                        />
                        <Pagination
                            defaultCurrent={1}
                            defaultPageSize={10}
                            showSizeChanger={true}
                            showQuickJumper={true}
                            onShowSizeChange={this.onShowSizeChange}
                            className={styles.pagination}
                        />
                    </div>
                </div>

            </div >
        );
    }
}

export default OperationJournal;
