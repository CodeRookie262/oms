import React, { Component } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { Row, Col, Button } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

import logo from '@/assets/logo2.png';

class ResetSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 5
    };
  }

  componentDidMount() {
    //60秒倒计时
    let countdown = 5;
    this.timer = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        router.push('/user/login');
        return;
      } else {
        this.setState({
          time: countdown
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  render() {
    return (
      <div
        className={styles.findPage}
        style={{ height: 504, maxHeight: '90%' }}
      >
        <Row className={styles.logo}>
          <img src={logo} alt="" />
        </Row>

        <div className={styles.Context}>
          <Row style={{ fontSize: 18, color: '#041f40' }}>密码重置成功</Row>
          <Row style={{ color: '#8494a6' }}>
            恭喜你，密码重置成功！
            <span style={{ color: '#0d6fde' }}>{this.state.time}</span>{' '}
            秒后自动跳转
          </Row>
          <Link to="/user/login">
            <Button type="primary" style={{ width: '100%', marginTop: 50 }}>
              立即登录
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ResetSuccess;
