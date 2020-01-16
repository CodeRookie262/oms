import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styles from './operation.less';

class Operation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { index, id, edit = () => { }, discord = () => { } } = this.props;
    return (
      <div className="operation">
        <span
          className={styles.edit}
          onClick={() => edit(id, index)}>
          <Link to={'/financialManagement/edit/' + id} style={{ color: 'inherit' }}>编辑</Link>
        </span>
        <span className={styles.divide}> | </span>
        <span
          onClick={() => discord(id, index)}
          className={styles.remove}>删除</span>
      </div>
    );
  }
}

export default Operation;
