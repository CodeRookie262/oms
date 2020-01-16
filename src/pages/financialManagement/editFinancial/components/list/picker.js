import React, { Component } from 'react';
import { Form, Select, Input, Button, Radio, Icon, DatePicker, TimePicker, Checkbox } from 'antd'; import moment from 'moment';
import 'moment/locale/zh-cn';
import styles from './picker.less'

moment.locale('zh-cn');

const { RangePicker } = DatePicker;
const { Group } = Checkbox;

const PickerIcon = {
	fontSize: '18px',
	marginLeft: '4px',
	fontWidth: 'bold',
	cursor: 'pointer'
}

const fillZero = n => n > 9 ? n : `0${n}`;


function createDate(dateObj) {
	let currentDate = new Date();

	return {
		key: currentDate.getTime().toString(16),
		// startDate: currentDate.toLocaleDateString(),
		// endDate: currentDate.toLocaleDateString(),
		startDate: '',
		endDate: '',
		error: false,
		// startTime: `${fillZero(currentDate.getHours())}:${fillZero(currentDate.getMinutes())}:${currentDate.getSeconds()}`,
		startTime: "00:00:00",
		endTime: '23:59:59',
		weekList: ['一', '二', '三', '四', '五', '六', '日'].map((w, i) => ({ isCheck: 1, value: `星期${w}`, index: i, disabled: false })),
		...(dateObj || {})
	}

}

export default class Picker extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	list: [createDate()],
		// 	maxLen: 5
		// }

		// console.log(this.props.pickTime, 'pickerTime的属性继承制999')
		let propTime = (this.props.pickTime || []).map((item, index) => {
			let start = item.startTime.split(" ");
			let end = item.endTime.split(" ");
			let weekList = ['一', '二', '三', '四', '五', '六', '日'].map((day, weekIndex) => {
				let isCheck = item.week.includes('星期' + day);
				// console.log()
				let curDay = { value: `星期${day}`, index: weekIndex, disabled: false, isCheck }
				return curDay;
			});

			let checkDay = weekList.filter(item => item.isCheck);
			if (checkDay.length == 1) {
				checkDay[0].disabled = true;
			}

			return {
				key: (Date.now() + parseInt(Math.random() * 1000)).toString(16),
				startDate: start[0],
				startTime: start[1],
				endDate: end[0],
				endTime: end[1],
				weekList
			}
		})

		this.state = {
			list: [...(propTime || [])].length > 0 ? [...(propTime || [])] : [createDate()],
			maxLen: 5
		}

		// console.log(propTime, '处理过的')
	}

	// 添加日期列表
	addPicker = (isGetError) => {
		// isGetError 表示是否就单纯就行调试排错即可
		const { list, maxLen } = this.state;
		const preList = list[list.length - 1];

		let { startDate, endDate, startTime, endTime } = preList;//上一个时间列表信息
		let compareTime = [startTime, endTime].map((item, index) => item.split(":").reduce((a, t, i) => a + t * [60 * 60, 60, 1][i], 0))
		// console.log(compareTime, '对比时间')
		// 流程判断,在增加列表的时候,得判断是个列表的状态是否符合状态,是的话同意增加,反之拒绝
		if (!(preList.startDate && preList.endDate)) {
			preList.error = true;
			// console.log(555)
			this.props.setError(this.props.name, '请选择日期')
		} else if (!(startTime && endTime)) {
			preList.error = true;
			this.props.setError(this.props.name, '请选择时间')
		} else if (compareTime[0] > compareTime[1]) {
			preList.error = true;
			// console.log(666)
			this.props.setError(this.props.name, '开始时间大于结束时间');
		} else if (!isGetError) {
			// console.log(isGetError, 999)
			preList.error = false;
			if (list.length > maxLen - 1) return alert('超出条数')
			list.push(createDate())
		}

		this.setState(list)
	}

	// 删除日期列表
	deletePicker = (index) => {
		const { list } = this.state;
		list.splice(index, 1)
		this.setState({ list })
	}


	handleData(time) {
		if (!time) {
			return false
		} else {
			// 大于当前日期不能选 time > moment()
			// 小于当前日期不能选 time < moment().subtract(1, "days")
			// 只能选前7后7 time < moment().subtract(7, "days") || time > moment().add(7, 'd')
			// return time < moment().subtract(7, "days") || time > moment().add(7, 'd')
			return time < moment().subtract(1, "days")
		}
	}

	dataPickerChange = (date, index) => {
		const { list } = this.state;
		// Object.assign(list[index], date)
		const { startDate, startTime, endDate, endTime } = { ...(list[index]), ...date };
		// console.log(list[index], '当前修改的时间', '需要修改的数据体', { ...(list[index]), ...date })
		// list[index] = 
		list[index] = { ...(list[index]), ...date }
		// console.log('======', startTime, endTime, '======')
		// console.log('修改后的时间体', list[index])
		let compareTime = [startTime, endTime].map((item, index) => item.split(":").reduce((a, t, i) => a + t * [60 * 60, 60, 1][i], 0))
		// console.log(compareTime, '对比时间')
		if ((compareTime[0] > compareTime[1])) {
			// console.log('error: 开始时间不能大于结束时间')
			// list[index].error = true;
			// this.addPicker(true)
			// console.log((compareTime[0] > compareTime[1]))
			const timer = setTimeout(() => {
				this.addPicker(true);
				clearTimeout(timer)
			}, 1000 / 60)
		} else {
			list[index].error = false;
		}

		// this.props.setError(this.props.name, '开始时间大于结束时间')

		this.setState({ list: [...list] }, this.props.getDateList.bind(null, list))
		// console.log(this.state)

	}

	// 周列表限制器
	handleWeekListChange = (selectWeekList, index, status) => {
		const { list } = this.state;
		selectWeekList.weekList[index].isCheck = +status.target.checked;
		let surplusCheckBox = selectWeekList.weekList.filter(b => b.isCheck)

		if (surplusCheckBox.length == 1) {
			surplusCheckBox.pop().disabled = true;
		} else {
			surplusCheckBox.forEach(i => i.disabled = false)
		}
		this.setState({ list }, this.props.getDateList.bind(null, list))

	}

	render() {
		const { dataPickerChange, addPicker, deletePicker, handleWeekListChange } = this;
		const { list, maxLen } = this.state;

		return (
			<ul style={{ margin: 0, padding: 0 }}>
				{
					list.map((item, index) => {
						return (
							<li style={{ width: '660px' }} key={item.key} className={item.error ? styles.date_picker_error : styles.date_picker_ok}>
								<span>
									<RangePicker
										disabledDate={this.handleData}
										defaultValue={(item.startDate && item.endDate) ? [moment(item.startDate, 'YYYY/MM/DD'), moment(item.endDate, 'YYYY/MM/DD')] : []}
										onChange={(_, [startDate, endDate]) => dataPickerChange({ startDate, endDate }, index)} />
								</span>

								<span className={styles.pickerLeft}>
									<TimePicker
										defaultValue={moment(item.startTime, 'HH:mm:ss')}
										className={styles.picker}
										onChange={(_, date) => dataPickerChange({ startTime: date }, index)} /> ~ <TimePicker
										defaultValue={moment(item.endTime, 'HH:mm:ss')}
										className={styles.picker}
										onChange={(_, date) => dataPickerChange({ endTime: date }, index)} /></span>
								<span>
									{index <= (list.length - 1) && (list.length > 1) && <Icon type="delete" style={PickerIcon} onClick={() => deletePicker(index)} />}
									{index == (list.length - 1) && (list.length < maxLen) && <Icon type="plus-circle" style={PickerIcon} onClick={addPicker.bind(this, false)} />}
									<br />{
										item.weekList.map((selectBox, boxIndex) => {
											return (
												<span key={boxIndex}>
													<Checkbox
														defaultChecked={selectBox.isCheck}
														disabled={selectBox.disabled}
														style={{ margin: '0 4px 0 10px' }}
														onChange={(e) => { handleWeekListChange(item, boxIndex, e) }}
													/>
													<span>{selectBox.value}</span>
												</span>);
										})
									}
								</span>
							</li>
						);
					})
				}
			</ul>
		);
	}
}