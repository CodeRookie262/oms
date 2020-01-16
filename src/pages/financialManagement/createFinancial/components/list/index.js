import React, { Component } from 'react';
import Link from 'umi/link'; 
import router from 'umi/router';
import { Form, Select, Input, Button, Radio, Divider, Icon, InputNumber, message } from 'antd';
import Picker from './picker'
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import AstInput from '@/components/astrictInput';
import style from './index.less';

const { Option } = Select;

@connect(({ }) => ({}))

class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { status: this.props.selectStatus ? this.props.selectStatus : 0 }

  }

  handleSelectChange = e => {


    const { name, handleSelectChange = () => { } } = this.props;
    this.setState({ status: e.target.value }, () => {
      if (name) {
        handleSelectChange({
          [name]: { status: this.state.status }//在这里this.props.form.getFieldValue使用这个重置覆盖之前的表单即可
        })
      }
    })
  }

  render() {

    return (
      <>
        <Radio.Group onChange={this.handleSelectChange} defaultValue={this.state.status + '' || '0'}>
          <Radio value="0">{this.props.okText ? this.props.okText : '无限制'}</Radio>
          <Radio value="1">{this.props.cancelText ? this.props.cancelText : '限制'}</Radio>
        </Radio.Group>
        {!this.props.isHide ? (this.props && (this.props.edit && (this.state.status == 1)) && (this.props.edit) || '') : this.props.edit}
      </>
    );
  }
}


class UnitInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: 0,
      unit: this.props.selectDefaultValue,
      value: 0,
      disabled: true,
      ...(this.option || {})
    }
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      disabled: nextProps.disabled || false,
      unit: 1,
      value: 1,
      ...(nextProps.option)
    })

    
  }

  handleChange = (name = '', value = '') => {
    const { state } = this;

    state[name] = value;
    if (name == 'value' && !parseInt(value)) {
      const timer = setTimeout(() => this.props.setError(this.props.name, value == '0' ? '有效期限必须大于0' : '有效期限不可为空'), 1000 / 60)
    }
    
    this.props.getUnitMsg({ value: { unit: state.unit, value: state.value } })
    this.setState(state)
  }

  render() {
    
    return (
      <>
        <InputNumber
          style={this.props.style || {}}
          name={this.props.name || ''}
          min={1}
          defaultValue={this.state.value}
          disabled={this.state.disabled}
          onChange={e => this.handleChange('value', e)}
        /> 
        <Select defaultValue={this.state.unit || '1'}
          style={{ width: this.props.selectWidth || 'auto',marginLeft: '10px' }}
          onChange={e => this.handleChange('unit', e)}
          disabled={this.state.disabled}
        >
          {
            (this.props.selectList || [])
              .map((option, index) => {
                return (<Option value={index + 1} key={index}>{option.content}</Option>)
              })
          }
        </Select>
      </>
    )
  }
}







class CreateFinancial extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data || {},
      list: {},
      isEditPage: this.props.isEditPage,
      canSend: false
    }
    this.package_name = '套餐1'
    
  }
  componentWillMount() {
    this.state.isEditPage || this.upDateUpate()
  }

  componentWillReceiveProps(nextProps) {
    
    this.state.isEditPage && this.upDateUpate(nextProps)
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
          option: {
            initialValue: '套餐1',
            rules: [{ required: true, message: '请输入套餐名称'}],
          },
          content:
            <AstInput
              onChange={e => {
                this.package_name = e.target.value;
                handleCollectInputDate('package_name', e.target.value)
              }}
              onInput={() => { }}
              placeholder="请输入套餐名称"
              style={{
                width: '352px',
                border: "solid 1px #eff2f6 !important"
              }}
              data={isEditPage ? (data.package_name ? data.package_name : '套餐1') : '套餐1'}
              total="15"
            />
        },
        {
          name: 'is_active',
          label: '开启状态',
          option: { rules: [{ required: true, message: '请输入开启状态' }], ...(isEditPage ? { initialValue: { status: data.is_active ? '0' : '1' } } : { initialValue: 0 }) },
          content: <RadioGroup
            name="is_active"
            okText="开启"
            cancelText="关闭"
            handleSelectChange={this.handleSelectChange}
            selectStatus={isEditPage ? (data.is_active ? '0' : '1') : '0'}
          />
        },
        {
          name: 'limit_number',
          label: '场次数',
          option: {
            rules: [{ required: true }],
            ...(isEditPage ? { initialValue: { status: +data.is_number_limit, value: data.limit_number } } : { initialValue: { status: 0, value: 1 } })
          },
          content:
            <RadioGroup
              isHide={true}
              name="limit_number"
              handleSelectChange={this.handleSelectChange}
              selectStatus={isEditPage ? (data.is_number_limit ? '1' : '0') : '0'}
              edit={
                (<><InputNumber
                  min={1}
                  disabled={(data.is_number_limit ? false : true)}
                  style={{ width: '176px',marginRight: '10px' }}
                  name="limit_number"
                  placeholder="请输入场次数"
                  defaultValue={isEditPage ? (data.limit_number || 0) : 1}
                  onChange={e => this.handleShowInputChange('limit_number', e)} />场</>)
              }
            />
        },
        {
          name: 'suggested_price',
          label: '参考价',
          option: { rules: [{ required: true, message: '请输入参考价' }], ...(isEditPage ? { initialValue: data.suggested_price || 0 } : {}) },
          custom: true,
          content: <><InputNumber
            precision={2}
            min={0}
            className={style.financial_price}
            name="suggested_price"
            defaultValue={isEditPage ? data.suggested_price : ''}
            onChange={e => handleCollectInputDate('suggested_price', e)}
            placeholder="请输入套餐原价"
            style={{ width: '170px' }} /> 元</>
        },
        {
          name: 'selling_price',
          label: '售价',
          option: { rules: [{ required: true, message: '请输入售价' }], ...(isEditPage ? { initialValue: data.selling_price || 0 } : {}) },
          content: <><InputNumber
            precision={2}
            min={0}
            className={style.financial_price}
            name="selling_price"
            defaultValue={isEditPage ? data.selling_price || 0 : ''}
            onChange={e => handleCollectInputDate('selling_price', e)}
            placeholder="请输入套餐售价"
            style={{ width: '170px' }} /> 元</>
        },
        {
          name: 'expiration_time',
          label: '有效期限',
          option: {
            ...(isEditPage ? { initialValue: { status: data.is_expiration, value: { value: `${data.expiration_time}`, unit: data.expiration_time_unit } } } : { initialValue: { status: 0, value: { value: 1, unit: 1 } } }),
            rules: [{ required: true, message: '请输入有效期限' }]
          },
          content: <RadioGroup
            isDisableInput={this.isDisableInput}
            isHide={true}
            name="expiration_time"
            selectStatus={data.is_expiration ? '1' : '0'}
            handleSelectChange={this.handleSelectChange}
            edit={<UnitInput
              disabled={this.state.expiration_time ? true : false}
              style={{ width: '75px' }}
              name="expiration_time"
              selectWidth="60px"
              setError={this.setError}
              option={isEditPage ? { value: `${data.expiration_time || '1'}`, unit: data.expiration_time_unit || '1' } : {}}
              getUnitMsg={msg => handleCollectInputDate('expiration_time', msg)}
              selectList={[{ value: 1, content: '年' }, { value: 2, content: '月' }, { value: 3, content: '日' }]}
              selectDefaultValue={data.expiration_time_unit || 1}
              onChange={e => this.handleShowInputChange('expiration_time', e.target.value)}
            />}
          />
        },
      ],
      temp2: [
        {
          name: 'single_duration',
          label: '单场时长',
          option: {
            initialValue: data.single_duration || 45,
            rules: [{ required: true, message: '请输入时间' }],
          },
          content:
            <>
              <Select defaultValue={'45'}
                style={{ width: 97 }}
                disabled
                onChange={e => handleCollectInputDate('single_duration', e)}
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
          option: { rules: [{ required: true, message: '请输入人数' }], ...(isEditPage ? { initialValue: data.single_num } : {}) },
          content: <><InputNumber
            name="single_num"
            min={1}
            onChange={e => handleCollectInputDate('single_num', e)}
            defaultValue={isEditPage ? data.single_num || '0' : ''}
            placeholder="请输入单场最大人数"
            style={{ width: "176px" }} /> 人</>
        },
        {
          name: 'time_limit',
          label: '可开播时间',
          option: {
            initialValue: isEditPage ? '0' : '0',
            rules: [{ required: true, message: '请输入可开播时间' }]
          },
          content: <RadioGroup
            handleSelectChange={this.handleSelectChange}
            selectStatus={data.is_time_limit ? '1' : '0'}
            name="time_limit"
            edit={<Picker
              name="time_limit"
              getDateList={(value) => { this.handleShowInputChange('time_limit', value) }}
              setError={this.setError}
            />} />
        }
      ],
      temp3: [
        {
          name: 'start_ahead_time',
          label: '允许提前开播',
          option: { rules: [{ required: true, message: '请输入允许提前开播时间' }], ...({ initialValue: isEditPage ? (data.start_ahead_time == 0 ? data.start_ahead_time : 5) : 5 }) },
          content:
            <>
              <Select
                defaultValue={isEditPage ? data.extent_live_time || 5 : 5}
                onChange={e => handleCollectInputDate('start_ahead_time', e)}
                name="extent_live_time"
                style={{ width: 97 }}>
                {[0, 1, 2, 3, 4, 5].map((item) => (<Option value={item} key={item}>{item}分钟</Option>))}
              </Select>
            </>
        },
        {
          name: 'extent_live_time',
          label: '允许延长开播',
          option: { rules: [{ required: true, message: '请输入允许延长开播时间' }], ...({ initialValue: isEditPage ? (data.extent_live_time == 0 ? data.extent_live_time : 5) : 5 }) },
          content:
            <>
              <Select
                defaultValue={isEditPage ? data.extent_live_time || 5 : 5}
                onChange={e => handleCollectInputDate('extent_live_time', e)}
                name="extent_live_time"
                placeholder="请输入允许延长开播"
                style={{ width: 97 }}>
                {[0, 1, 2, 3, 4, 5].map((item) => (<Option value={item} key={item}>{item}分钟</Option>))}
              </Select>
            </>
        },
        {
          name: 'playback_store',
          label: '回放存储',
          option: { rules: [{ required: true, message: '回放存储时间不能为空' }], ...(isEditPage ? { initialValue: data.playback_store || 0 } : { initialValue: 0 }) },
          content:
            <>
              <InputNumber
                className="playback_store"
                min={0}
                max={30}
                defaultValue={isEditPage ? data.playback_store || '0' : ''}
                name="playback_store"
                onChange={e => handleCollectInputDate('playback_store', e)}
                placeholder="请输入回放存储时间"
                style={{ width: "352px" }}
              />
              <span> 天</span>
            </>

        }
      ]
    }
    
    this.setState({ data, list })
  }

  

  setError = (name, errMsg) => {
    this.props.form.setFields({
      [name || '']: {
        errors: [{ message: errMsg }]
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    let canSend = true;
    this.props.form.validateFields((err, values) => {
      const data = this.filterDate(values);

      
      const { package_name,is_number_limit,limit_number,suggested_price,selling_price,is_expiration,single_duration,single_num,is_time_limit,time_limit,start_ahead_time,extent_live_time,playback_store } = data;

      if(package_name != this.package_name){
        canSend = false;
        this.setError("package_name",'套餐名称不能为空!')
      }
      if(is_number_limit == 1 && limit_number == 0){
        canSend = false;
        this.setError("limit_number",'限制场次数不合法!')
      }
      if(suggested_price == undefined){
        canSend = false;
        this.setError('suggested_price','套餐参考价不可以为空!')
      }
      if(selling_price == undefined){
        canSend = false;
        this.setError("selling_price",'售价不可为空!')
      }
      if(is_time_limit == 1 && time_limit == ''){
        canSend = false;
        this.setError('time_limit','限制可开播时间不可为空!')
      }
      if(document.querySelector(".playback_store input").value == ''){
        canSend = false;
        this.setError('playback_store','回放存储时间不可为空!')
      }
      if(!single_num){
        canSend = false;
        this.setError("single_num",single_num == null ? '单场人数不可为空' : '单场人数不可为0')
      }
      if(is_expiration == 1 && document.querySelector("input[name=expiration_time]").value == ''){
        canSend = false;
        this.setError("expiration_time",'有效期限不可为')
      }
      
      if(canSend){
        console.log(data)
        this.props.dispatch({
              type: 'financial/createFinancial',
              payload: { ...(data || {}) },
              callback: res => {
                const {code} = res;
                this.requestCode(code)
                
              }
            })
      }else{
        message.error('创建表单失败,请将信息填写完整')
      }
    });
  };

  requestCode = num => {
    let msg = {
      err: false,
      msg: '',
      name: ''
    };
    if(num == 90003){
      msg.msg = '创建套餐成功'
      message.success('创建表单成功')
      const timer = setTimeout(() => this.props.success(),1200)
    }else{
      msg.err = true;
    }
    
    if(num == 90014){
      msg.msg = '提前开播时间超过直播参数限制的最大值'
      msg.name = 'start_ahead_time'
    }else if(num == 90016){
      msg.msg = '延长直播时间超过直播参数限制的最大值'
      msg.name = 'extent_live_time'
    }else if(num == 90018){
      msg.msg = '单场人数超过直播参数限制的最大值'
      msg.name = 'single_num'
    }else if(num = 90019){
      msg.msg = '回放存储超过直播参数限制的最大值'
      msg.name = 'playback_store'
    }

    if(msg.err){
      this.setError(msg.name,msg.msg)
      message.error(msg.msg);
    }
  }



  filterDate = (data = {}) => {
    

    const is_active = this.getStatus(data.is_active);//开启状态
    const limit_number = this.getStatus(data.limit_number);//场次数
    const is_expiration = this.getStatus(data.expiration_time);//有效期限
    const time_limit = this.getStatus(data.time_limit);//可开播时间

    if(typeof time_limit.status == 'undefined') time_limit.status = 1;

    let financialObj = Object.assign({ ...data }, {
      is_active: +is_active.status ? 0 : 1,
      is_number_limit: +limit_number.status,
      limit_number: limit_number.value || 0,
      is_expiration: +is_expiration.status,
      expiration_time: is_expiration.value ? is_expiration.value.value : 1,
      expiration_time_unit: is_expiration.value != undefined ? is_expiration.value.unit : 1,
      is_time_limit: +(time_limit.status),
      time_limit: time_limit.value ? JSON.stringify(time_limit.value.map(item => {
        const { startDate, endDate, startTime, endTime, weekList } = item;
        let compareTime = [startTime, endTime].map((item, index) => item.split(":").reduce((a, t, i) => a + t * [60 * 60, 60, 1][i], 0))

        if (startDate && endDate && compareTime[0] < compareTime[1]) {
          return {
            startTime: `${startDate} ${startTime}`,
            endTime: `${endDate} ${endTime}`,
            week: weekList.filter(w => w.isCheck).map(i => i.value)
          }
        }
      }).filter(item => item)) : '',
      single_duration: 3
    })
    
    return financialObj;
    

  }

  getStatus(status) {
    if (status == 0 || status.status == 0 || status.status == '') {
      return { status: 0 };
    } else {
      return {
        ...status
      }
    }
  }


  handleCollectInputDate = (name, data) => {
    if (typeof data == 'string' && !data) {
      const timer = setTimeout(() => {
        this.setError(name, '表框内容不可为空')
        clearTimeout(timer)
      }, 1000 / 60)
    }
    
    if(name == 'selling_price' || name == 'suggested_price' || name == 'playback_store' || name == 'single_num' || name == 'package_name' || name == 'extent_live_time'){
      this.props.form.setFieldsValue({ [name]: data })
    } else if(!/object/.test(typeof this.props.form.getFieldValue(name))) {
      this.props.form.setFieldsValue({ [name]: {...data,status: '1'} })
    } else {
      this.props.form.setFieldsValue({ [name]: { ...(this.props.form.getFieldValue(name) || {}), ...data,status: '1' } })
    }
    this.canSend()

  }

  handleSelectChange = (data = {}) => {
    const key = Object.keys(data)[0];
   
    let obj = { ...this.props.form.getFieldValue(key), ...data[key] };
    
    this.props.form.setFieldsValue({ [key]: obj })
    let { handleCollectInputDate, state: { list, isEditPage } } = this;
    
    const msg = this.props.form.getFieldValue(key)
    if (key == 'limit_number') {
      list['temp1'][2] = {
        ...list['temp1'][2],
        option: { ...(list['temp1'][2].option || {}), initialValue: obj },
        content: (<RadioGroup
          isHide={true}
          name="limit_number"
          handleSelectChange={this.handleSelectChange}
          selectStatus={this.getStatus(data[key]).status}
          edit={
            (<><InputNumber
              min={1}
              disabled={!(+this.getStatus(data[key]).status)}
              style={{ width: '176px',marginRight: '10px',textAlign: 'center' }}
              name="limit_number"
              placeholder="请输入场次数"
              defaultValue={'1'}
              onChange={e => this.handleShowInputChange('limit_number', e)} />场 </>)
          }
        />)
      }
      this.setState({ list: { ...list } })
    } else if (key == 'expiration_time') {

      list['temp1'][5] = {
        ...list['temp1'][5],
        option: { ...(list['temp1'][5].option || {}), initialValue: obj },
        content: (<RadioGroup
          isDisableInput={this.isDisableInput}
          isHide={true}
          name="expiration_time"
          selectStatus={this.getStatus(data[key]).status}
          handleSelectChange={this.handleSelectChange}
          edit={<UnitInput
            disabled={!+this.getStatus(data[key]).status}
            style={{ width: '75px' }}
            name="expiration_time"
            selectWidth="60px"
            setError={this.setError}
            getUnitMsg={msg => handleCollectInputDate('expiration_time', msg)}
            selectList={[{ value: 1, content: '年' }, { value: 2, content: '月' }, { value: 3, content: '日' }]}
            selectDefaultValue={1}
            onChange={e => this.handleShowInputChange('expiration_time', e.target.value)}
          />}
        />)
      }
      this.setState({ list: { ...list } })
    }
    this.canSend()
  }

  handleShowInputChange = (name, value = undefined) => {
    const data = this.props.form.getFieldValue(name)
    
    if (data) {
      this.handleSelectChange({ [name]: { ...data, value,status: '1' } })
      // //console(222,{ ...data, value,status: '1' })
    }
    this.canSend()

  }

  canSend = () => {
    let canSend = true;
    
    const { package_name,is_number_limit,limit_number,suggested_price,selling_price,is_expiration,single_duration,single_num,is_time_limit,time_limit,start_ahead_time,extent_live_time,playback_store } = this.filterDate(this.props.form.getFieldsValue());

    if(package_name != this.package_name){
      canSend = false;
    }
    if(is_number_limit == 1 && limit_number == 0){
      canSend = false;
    }
    if(suggested_price == undefined){
      canSend = false;
    }
    if(selling_price == undefined){
      canSend = false;
    }
    if(is_time_limit == 1 && time_limit == ''){
      canSend = false;
    }
    if(document.querySelector(".playback_store input").value == ''){
      canSend = false;
    }
    if(!single_num){
      canSend = false;
    }
    if(is_expiration == 1 && document.querySelector("input[name=expiration_time]").value == ''){
      canSend = false;
    }
    this.setState({canSend})
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
                        <Form.Item label={l.label} key={l.name}>
                          {getFieldDecorator(l.name || 'UnHasName', l.option || {})(l.content || <></>)}
                        </Form.Item>
                      );
                    })
                  }
                </div>
              );
            })
          }
          <Divider className={style.divider} />

          <Form.Item wrapperCol={{ span: 12, offset: 2 }}>
            <Button type="primary" disabled={!this.state.canSend} onClick={this.handleSubmit} style={{marginLeft: 16}}>
              创建
            </Button>
            <Link to="/financialManagement/list">
              <Button type="primary" ghost style={{ marginLeft: '50px' }}>
                取消
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
