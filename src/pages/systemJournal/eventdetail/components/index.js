import React, { Component } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import styles from './index.less';
import { withRouter } from 'react-router';

@connect(({ }) => ({}))
class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {}
        }
    }
    // 跳转到当前的事件详情页面在发送请求
    componentDidMount() {
        let id = this.props.match.params.id
        console.log(id);
        // this.props.dispatch({
        //     type:''
        // })
        // let data =  await axios.get('',{params:{id}});
        // this.setState({
        //     ping: { i: 1 }
        // });
    }
    render() {
        console.log(this.state.detail);//{}  data的数据
        return (
            <div className={styles.eventList}>
                <div className={styles.eventList_basic}>
                    <h2 className={styles.eventList_title}>事件基本信息</h2>
                    <div className={styles.operation_id}>
                        <span className={styles.operation_id_title}>操作人ID:</span>
                        <span>顶顶顶顶</span>
                    </div>
                    <div className={styles.operation_phone}>
                        <span>操作人手机号:</span>
                        <span></span>
                    </div>
                    <div className={styles.operation_email}>
                        <span>操作人邮箱:</span>
                        <span></span>
                    </div>
                    <div className={styles.operation_nick}>
                        <span>操作人昵称:</span>
                        <span></span>
                    </div>
                    <div className={styles.operation_time}>
                        <span>操作时间:</span>
                        <span></span>
                    </div>
                    <div className={styles.operation_type}>
                        <span>事件类型:</span>
                        <span></span>
                    </div>
                    <div className={styles.operation_affect}>
                        <span>事件影响:</span>
                        <span></span>
                    </div>
                </div>
                <div className={styles.eventList_detail}>
                    <h2>事件详细信息</h2>
                    {this.state.ping?
                    <>
                        <div className={styles.operation_contact}>
                        <span>联系人:</span>
                        <span></span>
                    </div>
                    <div className={styles.operation_tel}>
                        <span>联系电话:</span>
                        <span></span>
                    </div>
                    <div className={styles.operation_address}>
                        <span>联系地址:</span>
                        <span></span>
                    </div>
                    </>
                    :
                    <div></div>}
                </div>
            </div>
        )
    }
}
EventList = withRouter(EventList)
export default EventList