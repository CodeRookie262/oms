import React, { Component } from 'react';
import { Button, Table } from 'antd';
import DiscountModal from './discountModal';
import styles from './index.less';


// //定义表格头信息 
const columns = [
    {
        title: '序号',
        dataIndex: 'order',
    },
    {
        title: '有效期',
        dataIndex: 'expiration_date',
    },
    {
        title: '生效期',
        dataIndex: 'effective_date',
    },
    {
        title: '优惠时段',
        dataIndex: 'discount_period'
    },
    {
        title: '场数扣除基数',
        dataIndex: 'discount'
    },
    {
        title: '操作',
        dataIndex: 'operating'
    }
];

class Discount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            list: []
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ list: nextProps.data || [] })
    }

    handleDeleteItem = () => {
        let { list, selectedRowKeys } = this.state;
        list = list.filter(item => !selectedRowKeys.includes(item.order))

        console.log(list, 'new List')
        this.setState({ list })

    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {
        const { selectedRowKeys, list } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className={styles.discount}>
                <div style={{ marginBottom: 16, height: 50 }}>
                    {hasSelected && (<Button
                        onClick={this.handleDeleteItem}
                        type="primary"
                        ghost
                        disabled={!hasSelected}>删除</Button>)}
                </div>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={list}
                    rowKey="order"
                />
                {/* <DiscountModal></DiscountModal> */}
            </div>
        );
    }
}


export default Discount;