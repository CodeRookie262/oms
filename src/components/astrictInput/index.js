import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
@connect(({ }) => ({}))
class AstrictInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: 0
    }
  }
  componentDidMount() {
    if (this.props.data) {
      this.setState({
        words: this.props.data.length
      })
    }
  }
  render() {
    return (
      <div className={styles.inputContainer} style={this.props.style || {}}>
        <input
          className={styles.inputChange}
          style={{ border: 'none', outline: 'none' }}
          type="text"
          placeholder={this.props.placeholder ? this.props.placeholder : ''}
          onInput={this.props.onInput ? (e) => {
            e.persist()
            if (e.target.value.length > this.props.total) {
              e.target.value = e.target.value.substring(0, this.props.total)
              return
            }

            this.props.onInput(e.target.value)
            this.setState({
              words: e.target.value.length
            })
          } : null}
          onChange={this.props.onChange ||(() => {})}
          defaultValue={this.props.data ? this.props.data : ''}
        />
        {this.props.total && <span style={{ coloe: '#bfc6d0' }}>
          {this.state.words}
          /
          {this.props.total}
        </span>}
      </div>
    )
  }
}
export default AstrictInput;