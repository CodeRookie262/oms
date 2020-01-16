import React, { Component } from 'react';
import Link from 'umi/link'; import router from 'umi/router';
import { Form, Select, Input, Button, Radio, Divider, Icon } from 'antd';
import Picker from './picker'
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import AstInput from '@/components/astrictInput';
import style from './index.less';

const { Option } = Select;

@connect(({ }) => ({}))


class CreateFinancial extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data || {},
      list: {}
    }

  }
  componentWillMount() {
    this.upDateUpate()
  }

  componentWillReceiveProps(nextProps) {
    this.upDateUpate(nextProps)
  }

  upDateUpate = (nextProps = {}) => {
    let { handleCollectInputDate, state: { list, isEditPage } } = this;
    const { data = {} } = nextProps;

    if (!Object.keys(data).length && isEditPage) {
      return;
    }

    list = {
      temp1: [
        {
          name: 'package_name',
          label: '套餐名称',
          content: <>{data.package_name ? data.package_name : '套餐1'}</>
        },
        {
          name: 'is_active',
          label: '开启状态',
          content: <>{data.is_active ? '开启' : '关闭'}</>
        },
        {
          name: 'limit_number',
          label: '场次数',
          content: <>{data.is_number_limit ? '限制' : (data.limit_number || 0) + '场'}</>
        },
        {
          name: 'suggested_price',
          label: '参考价',
          content: <>{data.suggested_price || 0}元</>
        },
        {
          name: 'selling_price',
          label: '售价',
          content: <>{data.selling_price || 0}元</>
        },
        {
          name: 'expiration_time',
          label: '有效期限',
          content: <>{data.is_expiration ? (data.expiration_time + (data.expiration_time_unit == 1 ? '年' : (data.expiration_time_unit == 2 ? '月' : '日'))) : '无限制'}</>
        },
      ],
      temp2: [
        {
          name: 'single_duration',
          label: '单场时长',
          content:
            <>
              <Select defaultValue={'45'}
                style={{ width: 120 }}
                disabled
              >
                <Option value="45">45分钟</Option>
                <Option value="50">50分钟</Option>
                <Option value="60">60分钟</Option>
              </Select>
            </>
        },
        {
          name: 'single_num',
          label: '单场人数',
          content: <>{data.single_num || '0'} 人</>
        },
        {
          name: 'time_limit',
          label: '可开播时间',
          content: (<ul style={{ margin: 0, padding: 0 }}>
            {data.is_time_limit ?
              JSON.parse(data.time_limit || '[]').map((item, index) => {
                let start = (item.startTime || '').split(" ");
                let end = (item.endTime || '').split(" ");
                let week = item.week.join(" ");

                return (
                  <li key={index} style={{ width: 600 }}>
                    <span>{start[0]} ~ {end[0]}</span>&emsp;
                    <span>{week}</span>&emsp;
                    <span>{start[1]} ~ {end[1]}</span>
                  </li>)
              }) : '无限制'
            }
          </ul>)
        }
      ],
      temp3: [
        {
          name: 'start_ahead_time',
          label: '允许提前开播',
          content:
            <>{data.start_ahead_time || 0}分钟</>
        },
        {
          name: 'extent_live_time',
          label: '允许延长开播',
          content:
            <>{data.extent_live_time || 0}分钟</>
        },
        {
          name: 'playback_store',
          label: '回放存储',
          content:
            <>{data.playback_store || '0'}天</>

        }
      ]
    }
    // console.log(list)

    this.setState({ data, list })
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style.financial_create}>
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {

            Object.values(this.state.list).map((block, index) => {
              return (
                <div key={index} className={style.financial_form}>
                  {
                    block.map((l, i) => {
                      return (
                        <Form.Item label={l.label} key={i}>
                          {l.content || <></>}
                        </Form.Item>
                      );
                    })
                  }
                </div>
              );
            })
          }
          <Divider className={style.divider} />
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Link to={`/financialManagement/edit/${this.props.data.id}`}>
              <Button type="primary" onClick={this.handleSubmit}>
                编辑
              </Button>
            </Link>
            <Link to='/financialManagement/list'>
              <Button type="primary" ghost style={{ marginLeft: '50px' }}>
                返回
              </Button>
            </Link>

          </Form.Item>

        </Form>
      </div>
    );
  }
}

const WrappedCreateFinancial = Form.create({ name: 'CreateFinancial' })(CreateFinancial);
export default WrappedCreateFinancial;
